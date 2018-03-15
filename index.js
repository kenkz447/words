import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'

import { schema } from '/src/graphql'
import { openConnection } from '/src/mongoose'
import { mongoDbAddress } from '/config'

async function doConnect() {
    try {
        await openConnection({ mongoDbAddress })
        console.log('DONE: Connected to mongoose.')
    } catch {
        console.error(': to connect to mongoose.')
    }
}

function doCreateApp() {
    const app = express()

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
        .use(bodyParser.json())

    .use('/graphql', graphqlHTTP(req => ({
        schema
    })))

    .listen(3000, () => {
        console.log("INFO: Express server is running.")
    })
}

(function() {
    doConnect()
    doCreateApp()
})()