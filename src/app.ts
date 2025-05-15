
import express, {NextFunction} from 'express'
import http from 'http'



export const app = express()


const port = 3000
const server = http.createServer(app)

app.set('port', port)



app.get('/ping', (req: express.Request, res: express.Response): void => {

    res.send('pong')
})


app.use((req: express.Request, res: express.Response, next: any): void => {
    res.status(404).send('No content found')
})

app.use((err: any, req: express.Request, res: express.Response, next: any): void => {

    res.status(err.status || 500).send(err.message || err)
})

server.listen(port, () => {

    console.log('Server running on port ' + port)
})
