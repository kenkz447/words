import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLID
} from 'graphql/type'

import { userCreate, userDelete, userGet } from '/src/mongoose'
import { getProjection } from '/src/graphql/utilities'

const fields = {
	_id: {
		type: GraphQLID,
		description: 'The id of the user.'
	},
	username: {
		type: GraphQLString,
		description: 'The name of the user.'
	},
	email: {
		type: GraphQLString,
		description: 'The email of the user.'
	},
	password: {
		type: GraphQLString,
		description: 'The password of the user.'
	}
}

export const userType = new GraphQLObjectType({
	name: 'user',
	description: 'User item',
	fields: fields
})

export const userQuery = {
	type: new GraphQLList(userType),
	args: fields,
	resolve: (root, fields, source, fieldASTs) => {
		const excludes = ['password']
		const projections = getProjection(fieldASTs, excludes)
		return userGet(fields, projections)
	}
}

export const userMuation = {
	userCreate: {
		type: userType,
		args: {
			username: fields.username,
			email: fields.email,
			password: fields.password
		},
		resolve: (root, vars, context) => {
			return userCreate(vars)
		}
	},
	userDelete: {
		type: userType,
		args: {
			_id: fields._id
		},
		resolve: (root, vars, context) => {
			return userDelete(vars)
		}
	}
}