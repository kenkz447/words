import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'

import { schema } from '/src/graphql'
import { initConnection } from '/src/mongoose'
import { mongoDbAddress } from '/config'

initConnection({ mongoDbAddress })

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())

.use('/graphql', graphqlHTTP(req => ({
    schema
})))

.listen(3000, () => {
    console.log("Express server is running!")
})