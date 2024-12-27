import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { getVideos } from '../controllers/youtube.controller.js';

const router = Router();

router.get("/youtube/:videoId", verifyToken,getVideos)

export default router;