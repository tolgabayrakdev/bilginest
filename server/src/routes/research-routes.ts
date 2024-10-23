import express from 'express';
import { verifyToken } from '../middlewares/verify-token';
import { verifyValidate } from '../middlewares/verify-validate';
import { ResearchController } from '../controllers/research-controller';
import { createResearchSchema } from '../schemas/research-schema';



const router = express.Router();
const researchController = new ResearchController();

router.post('/', verifyToken, verifyValidate(createResearchSchema) ,researchController.createResearch);
router.get('/', verifyToken, researchController.listResearch);
router.get('/all', verifyToken, researchController.listAllResearch);
router.get('/:id', verifyToken, researchController.showResearch);
router.delete('/:id', verifyToken, researchController.deleteResearch);
router.put('/:id', verifyToken, researchController.updateResearch);

export default router;