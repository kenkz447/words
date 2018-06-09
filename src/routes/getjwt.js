import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { check, validationResult } from 'express-validator/check'

import { appSecret, getJWTPath } from '@/config'

import { userGet } from '@/mongoose'

const bodyCheckers = [
	check('email', 'Email not exist.').exists(),
	check('password', 'Password not exist.').exists()
]

function genToken(tokenData) {
	const tokenOptions = { expiresIn: '30 days' }
	const token = jsonwebtoken.sign(tokenData, appSecret, tokenOptions)
	return token
}

async function loginHandler(request, response) {
	const validation = validationResult(request)
	const isBodyValid = validation.isEmpty()
	if (!isBodyValid) {
		const errors = validation.mapped()
		return response.status(422).json({ errors })
	}

	const { email, password } = request.body

	const users = await userGet({ email })

	if (!users.length) {
		return response.sendStatus(404)
	}

	const currentUser = users[0]

	const isPasswordMath = await bcrypt.compare(password, currentUser.password)

	if (!isPasswordMath) {
		return response.sendStatus(422)
	}

	const token = genToken({ id: currentUser.id })
	return response.json({ token })
}

export function registerGetJWTRoute(app) {
	app.post(getJWTPath, bodyCheckers, loginHandler)
}