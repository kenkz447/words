import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID
} from 'graphql/type'

import {
	graphQLPage,
	graphQLPageArgs,
	GraphQLPageArgs
} from '../pagination'

import { boardCreate, boardDelete, boardGet, boardUpdate, boadFindOne } from '@/mongoose'
import { fieldCreate } from '@/graphql/utilities'

export const boardNodeType = new GraphQLObjectType({
	name: 'BoardNode',
	fields: {
		_id: fieldCreate(GraphQLID),
		name: fieldCreate(GraphQLString, true),
		langNative: fieldCreate(GraphQLString, true),
		langTarget: fieldCreate(GraphQLString, true),
		topic: fieldCreate(GraphQLString, true),
		user: fieldCreate(GraphQLID, true)
	}
})

export const boardType = new GraphQLObjectType({
	name: 'Board',
	fields: {
		paginate: {
			type: graphQLPage(boardNodeType),
			args: graphQLPageArgs,
			resolve: (root, args: GraphQLPageArgs) => {
				return boardGet(args)
			}
		},
		getById: {
			type: boardNodeType,
			args: {
				_id: fieldCreate(GraphQLID, true)
			},
			resolve: (root, args: GraphQLPageArgs) => {
				return boadFindOne(args)
			}
		}
	}
})

export const boardQuery = {
	type: boardType,
	resolve: () => true
}

export const boardMutation = {
	boardCreate: {
		type: boardNodeType,
		args: {
			name: fieldCreate(GraphQLString, true),
			langNative: fieldCreate(GraphQLString, true),
			langTarget: fieldCreate(GraphQLString, true),
			topic: fieldCreate(GraphQLString, true)
		},
		resolve: (root, vars, context) => {
			return boardCreate({ ...vars, user: context.user.id })
		}
	},
	boardUpdate: {
		type: boardNodeType,
		args: {
			_id: fieldCreate(GraphQLID, true),
			name: fieldCreate(GraphQLString, true),
			langNative: fieldCreate(GraphQLString, true),
			langTarget: fieldCreate(GraphQLString, true),
			topic: fieldCreate(GraphQLString, true)
		},
		resolve: (root, args, context) => {
			return boardUpdate({ ...args, user: context.user.id })
		}
	},
	boardDelete: {
		type: boardNodeType,
		args: {
			_id: fieldCreate(GraphQLID, true)
		},
		resolve: boardDelete
	}
}