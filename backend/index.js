const express = require('express');
const { writeFileSync, readFileSync } = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const { createServer } = require('https');
const fs = require('fs')

const app = express()
const corsOptions = {
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions));
require('dotenv').config()
app.use(bodyParser.json())
const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem'), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'), 'utf-8')
  };
const httpsServer = createServer(options, app);
const expressWs = require('express-ws')(app, httpsServer);
const aWss = expressWs.getWss()

app.ws('/', (ws, req) => {
    console.log('connection is established')
    // ws.send('Connection is established')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                conectionHandler(ws, msg)
                break
            case 'draw':
                broadcastDraw(msg)
                break
        }
    })
})

const conectionHandler = (ws, msg) => {
    broadcastConnection(msg)
}

const broadcastDraw = (msg) => {
    aWss.clients.forEach((elem) => {
        elem.send(JSON.stringify(msg))
    })
}
const broadcastConnection = (msg) => {
    aWss.clients.forEach((elem) => {
        elem.send(JSON.stringify({
            username: msg.username,
            type: 'connection'
        }))
    })
}

app.get('/image', (req, res) => {
    try {
        const file = readFileSync(path.resolve(__dirname, 'canvas'))
        const data = file.toString()
        return res.json(data)
    } catch(err) {
        console.log(err)
        res.status(500)
    }
})

app.post('/image', (req, res) => {
    try {
        const data = req.body.img
        writeFileSync(path.resolve(__dirname, 'canvas'), data)
        return res.status(200).json()
    } catch(err) {
        console.log(err)
        res.status(500)
    }
})

httpsServer.listen(process.env.PORT || 4000, "0.0.0.0", () => {
    console.log('Server started')
})