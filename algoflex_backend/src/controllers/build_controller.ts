import * as express from 'express';
import { BaseController } from './base_controller';
import Docker from 'dockerode';

const parseImage = 'algoflex/parse:0.5';
const compileImage = 'algoflex/compile:0.3';
const executeImage = 'algoflex/execute:0.3';

export class BuildController extends BaseController {

    constructor(){
        super();
    }

    protected async executeImpl(req: express.Request, res: express.Response) {
        const docker = new Docker({socketPath: '/var/run/docker.sock'});

        let commonVolume : Docker.Volume;
        let parseContainer : Docker.Container;
        let compileContainer : Docker.Container;
        let executeContainer : Docker.Container;

        commonVolume = await docker.createVolume({
            Name: "test",
            Driver: "local"
        });

        const promiseParse = docker.createContainer({
            Image: parseImage,
            Cmd : ["python", "parserEasy.py", req.body.code],
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
            }
        });

        promiseExecute.then(async (container) =>
        container.attach(
        {
            stream: true,
            stdout: true,
            stderr: true
        }, (err, stream) => {
            stream?.on('data', (data) => {
                res.write(data);
            });

            stream?.on('end', () => {
                res.end();
              });
        }));

        parseContainer = await promiseParse;

        [compileContainer] = await Promise.all([promiseCompile, parseContainer.start(), parseContainer.wait()]);

        [executeContainer] = await Promise.all([promiseExecute, compileContainer.start(), compileContainer.wait()]);

        await Promise.all([executeContainer.start(), executeContainer.wait()]);

        await Promise.all([parseContainer.remove(), compileContainer.remove(), executeContainer.remove()]);

        await commonVolume.remove();
    }
}