import express from 'express'
const router = express.Router()

import { BuildController } from '../controllers/build_controller';
const buildController = new BuildController()

router.post('/build', (req, res) => buildController.execute(req, res));

export default router;