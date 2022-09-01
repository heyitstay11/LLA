import { Router } from 'express';
import authRouter from './auth.js';

const router = Router();

router.get('/', (_, res) => {
    res.send('Hello from API');
})

// forward /auth request to authRouter
router.use('/auth', authRouter);

export default router;