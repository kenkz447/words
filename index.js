import express from 'express'
import bodyParser from 'body-parser'

import { openConnection } from '/src/mongoose'
import { JwtFactory } from '/src/app'
import {
	registerGetJWTRoute,
	registerGraphQLRoute,
	registerRegisterRoute
} from '/src/routes'

import { mongoDbAddress, getJWTPath, registerPath } from '/config'

async function doConnect() {
	try {
		await openConnection({ mongoDbAddress })
		console.log('DONE: Connected to mongoose.')
	} catch (error) {
		console.error('ERROR: to connect to mongoose.')
	}
}

function doCreateApp() {
	const app = express()

	const jwtMiddleware = JwtFactory.create()

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))
		.use(bodyParser.json())
		.use(jwtMiddleware.unless({ path: [getJWTPath, registerPath] }))

	registerGraphQLRoute(app)
	registerGetJWTRoute(app)
	registerRegisterRoute(app)

	app.listen(process.env.PORT || 3000, () => {
		console.log('INFO: Express server is running.')
	})
}

(function () {
	doConnect()
	doCreateApp()
})()
