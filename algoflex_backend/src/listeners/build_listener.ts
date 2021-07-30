import * as express from 'express';
import Docker from 'dockerode';
import { Socket } from 'socket.io';
const ss = require('socket.io-stream');

const parseImage = 'algoflex/parse:0.3';
const compileImage = 'algoflex/compile:0.3';
const executeImage = 'algoflex/execute:0.3';

export class BuildListener {

    private _socket : Socket

    constructor(socket : Socket){
        this._socket = socket;
    }

    public async execute(data : string) {
        const docker = new Docker({socketPath: '/var/run/docker.sock'});

        let commonVolume : Docker.Volume;
        let parseContainer : Docker.Container;
        let compileContainer : Docker.Container;
        let executeContainer : Docker.Container;
        let streamExecute : NodeJS.ReadWriteStream;

        commonVolume = await docker.createVolume({
            Name: "test",
            Driver: "local"
        });

        const promiseParse = docker.createContainer({
            Image: parseImage,
            Cmd : ["python", "parserEasy.py", data],
            HostConfig: {
                Binds: [ commonVolume.name + ":/volume/test"]
            }
        });

        const promiseCompile = docker.createContainer({
            Image: compileImage,
            HostConfig: {
                Binds: [ commonVolume.name + ":/volume/test"]
            }
        });

        const promiseExecute = docker.createContainer({
            Image: executeImage,
            HostConfig: {
                Binds: [ commonVolume.name + ":/volume/test"]
            },
            Tty: true
        });

        parseContainer = await promiseParse;

        [compileContainer] = await Promise.all([promiseCompile, parseContainer.start(), parseContainer.wait()]);

        [executeContainer] = await Promise.all([promiseExecute, compileContainer.start(), compileContainer.wait()]);

        var consoleStream = ss.createStream();

        streamExecute = await executeContainer.attach(
        {
            stream: true,
            stdout: true,
            stderr: true
        });

        ss(this._socket).emit('console', consoleStream);
        streamExecute.pipe(consoleStream);

        await Promise.all([executeContainer.start(), executeContainer.wait()]);

        streamExecute.on('end', async () => {
            await Promise.all([parseContainer.remove(), compileContainer.remove(), executeContainer.remove()]);

            await commonVolume.remove();
        });
    }
}