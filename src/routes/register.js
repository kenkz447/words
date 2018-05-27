import { check, validationResult } from 'express-validator/check'

import { registerPath } from '/config'
import { userGet, userCreate } from '/src/mongoose'

const bodyCheckers = [
	check('username', 'Username must be at least 6 chars.')
		.trim().isLength({ min: 6 })
		.custom(async (username) => {
			try {
				const users = await userGet({ username })
				if (users.length) {
					throw new Error('usename is already in use.')
				}
			} catch (error) {
				throw new Error(error)
			}
		}),
	check('email', 'Must be an email')
		.trim().isEmail()
		.custom(async (email) => {
			try {
				const users = await userGet({ email })
				if (users.length) {
					throw new Error('This email is already in use.')
				}
			} catch (error) {
				throw new Error(error)
			}
		}),
	check('password', 'Passwords must be at least 6 chars long.')
		.isLength({ min: 6 })
]

async function registerHandler(request, response) {
	const validation = validationResult(request)
	const isBodyValid = validation.isEmpty()
	if (!isBodyValid) {
		const errors = validation.mapped()
		return response.status(422).json({ errors })
	}

	const { username, email, password } = request.body

	try {
		await userCreate({ username, email, password })
		return response.status(201).json({
			username,
			email
		})
	} catch (error) {
		return response.status(201).text(error)
	}
}

export function registerRegisterRoute(app) {
	app.post(registerPath, bodyCheckers, registerHandler)
}