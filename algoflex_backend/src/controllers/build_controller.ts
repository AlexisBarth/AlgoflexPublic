import * as express from 'express';
import { BaseController } from './base_controller';
import Docker, { Container } from 'dockerode';

const parseImage = 'algoflex/parse:0.5';
const compileImage = 'algoflex/compile:0.3';
const executeImage = 'algoflex/execute:0.3';

export class BuildController extends BaseController {

    constructor(){
        super();
    }

    protected async executeImpl(req: express.Request, res: express.Response): Promise<void | any> {
        const docker = new Docker({socketPath: '/var/run/docker.sock'});

        let commonVolume : Docker.Volume;
        let parseContainer : Docker.Container;
        let compileContainer : Docker.Container;
        let executeContainer : Docker.Container;
        let resultat = '';

        docker.createVolume({
            Name: "test",
            Driver: "local"})
            .then((volume : Docker.Volume) => {
                commonVolume =  volume;
                docker.createContainer({
                    Image: parseImage,
                    Cmd : ["python", "parserEasy.py", req.body.code],
                    HostConfig: {
                        Binds: [ volume.name + ":/volume/test"]
                    }
                }).then(async (container : Docker.Container) => {
                    parseContainer = container;
                    await parseContainer.start();
                    return await parseContainer.wait();
                }).then(() => {
                    docker.createContainer({
                        Image: compileImage,
                        HostConfig: {
                            Binds: [ volume.name + ":/volume/test"]
                        }
                    }).then(async (container : Docker.Container) => {
                        compileContainer = container;
                        await compileContainer.start();
                        return await compileContainer.wait();
                    }).then(() => {
                        docker.createContainer({
                            Image: executeImage,
                            HostConfig: {
                                Binds: [ volume.name + ":/volume/test"]
                            }
                        }).then(async (container : Docker.Container) => {
                            executeContainer = container;
                            executeContainer.attach({
                                stream: true,
                                stdout: true,
                                stderr: true
                            }, (err, stream) => {
                                if(stream !== undefined){
                                    stream.on('data', data => {
                                        resultat += data;
                                    });
                                }
                            });
                            await executeContainer.start();
                            return await executeContainer.wait();
                    }).then(() => {
                        this.ok<any>(res, resultat);
                    });
                });
            });
        });
    }
}