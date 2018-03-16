import { check, validationResult } from 'express-validator/check'

import { registerPath } from '/config'
import { userGet, userCreate } from '/src/mongoose'

const bodyCheckers = [
    check('username', 'Username must be at least 6 chars.')
        .trim().isLength({ min: 6 })
        .custom(async (username) => {
            try {
                const users = await userGet({ username })
                if (users.length)
                    throw new Error('usename is already in use.')
            } catch (error) {
                throw new Error(error)
            }
        }),
    check('email')
        .isEmail().withMessage('Must be an email')
        .trim().normalizeEmail()
        .custom(async (email) => {
            try {
                const users = await userGet({ email })
                if (users.length)
                    throw new Error('This email is already in use.')
            } catch (error) {
                throw new Error(error)
            }
        }),
    check('password', 'Passwords must be at least 6 chars long.')
        .isLength({ min: 6 })
]

async function registerHandler(request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() })
    }

    const { username, email, password } = request.body

    try {
        const newUser = await userCreate({ username, email, password })
        return response.status(201).json(newUser)
    } catch (error) {
        return response.status(201).text(error)
    }
}

export function registerRegisterRoute(app) {
    app.post(registerPath, bodyCheckers, registerHandler)
}