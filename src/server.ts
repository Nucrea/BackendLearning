import bodyParser from 'body-parser'
import express from 'express'
import requestID from 'express-request-id'

export class Server {
    public async start() {
        //...
        const app = express()

        app.use(requestID())
        app.use(bodyParser.json())

        
    }
}