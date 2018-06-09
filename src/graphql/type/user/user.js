
import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID
} from 'graphql/type'

import { userCreate, userDelete, userGet } from '@/mongoose'

import {
	graphQLPage,
	graphQLPageArgs,
	GraphQLPageArgs
} from '../pagination'

import { fieldCreate } from '../../utilities'

export const userType = new GraphQLObjectType({
	name: 'user',
	description: 'User item',
	fields: {
		_id: fieldCreate(GraphQLID),
		username: fieldCreate(GraphQLString),
		email: fieldCreate(GraphQLString)
	}
})

export const userQuery = {
	type: graphQLPage(userType),
	args: graphQLPageArgs,
	resolve: (root, args: GraphQLPageArgs, context, fieldASTs) => {
		return userGet(args)
	}
}

export const userMuation = {
	userCreate: {
		type: userType,
		args: {
			username: fieldCreate(GraphQLString, true),
			email: fieldCreate(GraphQLString, true),
			password: fieldCreate(GraphQLString, true)
		},
		resolve: (root, vars, context) => {
			return userCreate(vars)
		}
	},
	userDelete: {
		type: userType,
		args: {
			_id: fieldCreate(GraphQLID, true)
		},
		resolve: (root, vars, context) => {
			return userDelete(vars)
		}
	}
}