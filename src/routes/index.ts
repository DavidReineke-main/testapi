import express, {Router} from 'express'



export const router = Router()

const data = [{"id":1,"first_name":"Veda","last_name":"Cormode","email":"vcormode0@exblog.jp","gender":"Female","ip_address":"28.219.239.84"},
    {"id":2,"first_name":"Pris","last_name":"Brennon","email":"pbrennon1@linkedin.com","gender":"Female","ip_address":"110.246.167.50"},
    {"id":3,"first_name":"Chev","last_name":"Vodden","email":"cvodden2@hatena.ne.jp","gender":"Male","ip_address":"126.12.224.74"},
    {"id":4,"first_name":"Artie","last_name":"Garett","email":"agarett3@eventbrite.com","gender":"Male","ip_address":"234.57.192.51"},
    {"id":5,"first_name":"Cosimo","last_name":"Cradoc","email":"ccradoc4@addtoany.com","gender":"Male","ip_address":"90.59.226.222"},
    {"id":6,"first_name":"Bondon","last_name":"Whartonby","email":"bwhartonby5@bravesites.com","gender":"Male","ip_address":"115.117.144.207"},
    {"id":7,"first_name":"Simona","last_name":"Monget","email":"smonget6@istockphoto.com","gender":"Female","ip_address":"195.58.57.229"},
    {"id":8,"first_name":"Kandace","last_name":"Mynett","email":"kmynett7@cbc.ca","gender":"Female","ip_address":"90.213.233.212"},
    {"id":9,"first_name":"Walt","last_name":"Heale","email":"wheale8@yolasite.com","gender":"Genderfluid","ip_address":"85.67.138.138"},
    {"id":10,"first_name":"Wendell","last_name":"Mongain","email":"wmongain9@studiopress.com","gender":"Male","ip_address":"2.147.222.97"}]


router.get('/ping', (req: express.Request, res: express.Response): void => {

    res.send('pong')
})


router.get('/data/:id', (req: express.Request, res: express.Response): void => {

    console.log('Here')
    // @ts-ignore
    res.send(data[req.params.id])
})

router.post('/data', (req: express.Request, res: express.Response): void => {
    console.log(req.body)


    res.send(data[req.body.id])
})

router.all('/*', (req: express.Request, res: express.Response): void => {
    console.log(req.body)
    console.log(req.headers)
    console.log(req.query)
    console.log(req.method)


    res.status(201).send(data[1])
})