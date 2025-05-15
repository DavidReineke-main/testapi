import express, {Router} from 'express'



export const router = Router()

router.get('/ping', (req: express.Request, res: express.Response): void => {

    res.send('pong')
})
