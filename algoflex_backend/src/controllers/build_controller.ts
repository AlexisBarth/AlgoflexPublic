import * as express from 'express';
import Docker from 'dockerode';
import { BaseController } from './base_controller';
import crypto from 'crypto'

const parseImage = 'algoflex/parse:1.0';
const compileImage = 'algoflex/compile:1.0';
const executeImage = 'algoflex/execute:1.0';

export class BuildController extends BaseController{

    constructor(){
        super();
    }

    public async executeImpl(req: express.Request, res: express.Response) {

        const dockerInstance = new Docker({socketPath: '/var/run/docker.sock'});

        let commonVolume : Docker.Volume;
        let parseContainer : Docker.Container;
        let compileContainer : Docker.Container;
        let executeContainer : Docker.Container;
        const willBeExecuted = req.body['execute'];

        commonVolume = await dockerInstance.createVolume({
            Name: crypto.randomBytes(32).toString('hex'),
            Driver: "local"
        });

        const promiseParse = dockerInstance.createContainer({
            Image: parseImage,
            Cmd : ["python", "parserEasy.py", req.body['code']],
            HostConfig: {
                Binds: [ commonVolume.name + ":/volume/pcr"]
            }
        });

        const promiseCompile = dockerInstance.createContainer({
            Image: compileImage,
            HostConfig: {
                Binds: [ commonVolume.name + ":/volume/pcr"]
            },
            Tty: true
        });

        const promiseExecute = dockerInstance.createContainer({
            Image: executeImage,
            HostConfig: {
                Binds: [ commonVolume.name + ":/volume/pcr"]
            },
            Tty: true
        });

        parseContainer = await promiseParse;

        [compileContainer] = await Promise.all([promiseCompile, parseContainer.start()]);

        await parseContainer.wait();

        [executeContainer] = await Promise.all([promiseExecute, compileContainer.start()]);

        const asCompiled = (await compileContainer.wait())['StatusCode'] === 1 ? false : true;

        await parseContainer.remove();

        if(!willBeExecuted || !asCompiled){
            executeContainer.remove();
        }

        return this.ok<any>(res, {
            compileId: compileContainer.id,
            executeId: executeContainer.id,
            volumeId: commonVolume.name,
            asCompiled
        })
    }
}