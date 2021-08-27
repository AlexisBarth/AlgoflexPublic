import express from 'express'
import { BuildController } from '../controllers/build_controller';
import { RunController } from '../controllers/run_controller';

const router = express.Router();

const buildController = new BuildController()
const runController = new RunController()

router.post('/build', (req, res) => buildController.execute(req, res));

router.post('/run', (req, res) => runController.execute(req, res));

export default router;