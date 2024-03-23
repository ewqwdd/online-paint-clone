const express = require('express');
const { writeFileSync, readFileSync } = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()
const expressWs = require('express-ws')(app);
app.use(cors());
const aWss = expressWs.getWss()
require('dotenv').config()

app.use(bodyParser.json())


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

app.listen(process.env.PORT, () => {
    console.log('Server started')
})