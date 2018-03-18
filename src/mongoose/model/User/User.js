import mongoose from 'mongoose'
import { hashPassword } from '/src/utilities'

const { Schema } = mongoose

const fields = {
	id: String,
	username: String,
	email: String,
	password: String
}

const options = { collection: 'Users' }

const userSchema = new Schema(fields, options)

export const User = mongoose.model('User', userSchema)

// #region User utilities
async function createUser(props) {
	const { username, email, password } = props
	const hashedPassword = await hashPassword(password)

	return new User({
		username,
		email,
		password: hashedPassword
	})
}

function saveNewUserToDb(newUser) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await newUser.save()
			resolve(result)
		} catch (error) {
			reject(error)
		}
	})
}
// #endregion

export function userGet(props, projections) {
	return new Promise((resolve, reject) => {
		const params = {}
		for (const fieldKey in props) { params[fieldKey] = props[fieldKey] }

		User.find(params, projections, (error, users) => {
			error ? reject(error) : resolve(users)
		})
	})
}

export async function userCreate(props) {
	const newUser = await createUser(props)
	return saveNewUserToDb(newUser)
}

export function userDelete(props) {
	return new Promise(async (resolve, reject) => {
		const target = User.findById(props._id)
		target.remove((errors) => {
			errors ? reject(errors) : resolve()
		})
	})
}