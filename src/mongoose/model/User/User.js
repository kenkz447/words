import mongoose from 'mongoose'
import { hashPassword } from '@/utilities'

import { GraphQLPageArgs } from '@/graphql'
import { applyPagination } from '../../utilities'

export interface User {
	_id: string,
	username: string,
	email: string,
	password: string
}

export const userModelFields = {
	username: String,
	email: String,
	password: String
}

const { Schema } = mongoose

const userSchema = new Schema(userModelFields, {
	collection: 'users'
})

export const UserModel = mongoose.model('User', userSchema)

// #region User utilities
async function createUser(props) {
	const { username, email, password } = props
	const hashedPassword = await hashPassword(password)
	return new UserModel({
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

export async function userGet(args: GraphQLPageArgs, projections) {
	try {
		const page = await applyPagination(UserModel, args)
		return page
	} catch (error) {
		throw new Error(error)
	}
}

export async function userCreate(props) {
	const newUser = await createUser(props)
	return saveNewUserToDb(newUser)
}

export function userDelete(props) {
	return new Promise(async (resolve, reject) => {
		const callBack = (errors, result) => {
			errors ? reject(errors) : resolve()
		}
		if (props._id !== null) {
			UserModel.findByIdAndRemove(props._id, callBack)
		} else {
			UserModel.findOneAndRemove(props, callBack)
		}
	})
}