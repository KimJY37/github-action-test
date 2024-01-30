const body_parser = require('body-parser')
const helmet = require('helmet')
const logger = require('./winston')('index.js')

const express = require('express')
const app = express()
app.use(helmet())
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
const port = 8081

app.get('/', (req, res) => {
    res.send('Hello World!')
    logger.info('annyunghaseyo')
})

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`)
})
