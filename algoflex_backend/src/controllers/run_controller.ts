import * as express from 'express';
import Docker from 'dockerode';
import { BaseController } from './base_controller';

export class RunController extends BaseController{

    constructor(){
        super();
    }

    public async executeImpl(req: express.Request, res: express.Response) {
        const dockerInstance = new Docker({socketPath: '/var/run/docker.sock'});
        const buildContainer = dockerInstance.getContainer(req.body['compileId'])
        buildContainer.remove();
        if(!req.body['asCompiled']){
            return this.ok<any>(res);
        }


        const executeContainer = dockerInstance.getContainer(req.body['executeId']);
        const commonVolume = dockerInstance.getVolume(req.body['volumeId']);

        await executeContainer.start();
        await executeContainer.wait();
        await executeContainer.remove();

        await commonVolume.remove();

        return this.ok<any>(res);
    }

}