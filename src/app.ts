
import express, {NextFunction} from 'express'
import http from 'http'
import morganMiddleware from '@classes/morganMiddleware'
import {requestIdCreaterMiddleware} from '@classes/requestIdCreaterMiddleware'
import Logger from '@classes/Logger'
import fs from 'fs'
import {router as indexRouter} from '@routes/index'

export const app = express()


const port = 3000
const server = http.createServer(app)

app.set('port', port)
app.use(morganMiddleware)

app.use(requestIdCreaterMiddleware)


function versionMiddleware(req: express.Request, res: express.Response, next: NextFunction) {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
    res.setHeader('VERSION', packageJson.version)
    next()
}

app.use(versionMiddleware)

app.use('/', requestIdCreaterMiddleware, indexRouter)




app.use((req: express.Request, res: express.Response, next: any): void => {
    res.status(404).send('No content found')
})

app.use((err: any, req: express.Request, res: express.Response, next: any): void => {

    res.status(err.status || 500).send(err.message || err)
})

server.listen(port, () => {

    Logger.info('Server running on port ' + port)
})
