import express from 'express';
import { verifyToken } from '../middlewares/verify-token';
import { ResearchController } from '../controllers/research-controller';

const router = express.Router();
const researchController = new ResearchController();

router.post('/', verifyToken, researchController.createResearch);
router.get('/', verifyToken, researchController.listResearch);
router.get('/:id', verifyToken, researchController.showResearch);
router.delete('/:id', verifyToken, researchController.deleteResearch);
router.put('/:id', verifyToken, researchController.updateResearch);

export default router;