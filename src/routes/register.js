import { check, validationResult } from 'express-validator/check'

import { registerPath } from '/config'
import { userGet, userCreate } from '/src/mongoose'

const bodyCheckers = [
	check('username', 'Nhập tên hiển thị tối thiểu 3 ký tự')
		.trim().isLength({ min: 3 })
		.custom(async (username) => {
			try {
				const users = await userGet({ username })
				if (users.length) {
					throw 'Tên này đã được sử dụng'
				}
			} catch (error) {
				throw error
			}
		}),
	check('email', 'Vui lòng nhập email')
		.trim().isEmail()
		.custom(async (email) => {
			try {
				const users = await userGet({ email })
				if (users.length) {
					throw 'Email này đã được sử dụng'
				}
			} catch (error) {
				throw error
			}
		}),
	check('password', 'Mật khẩu tối thiểu 3 ký tự')
		.isLength({ min: 3 })
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