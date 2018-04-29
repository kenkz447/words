import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLID,
	GraphQLNonNull
} from 'graphql/type'

import { boardCreate, boardDelete, boardGet, boardUpdate } from '/src/mongoose'
import { getProjection } from '/src/graphql/utilities'

const boardFields = {
	_id: {
		type: GraphQLID,
		description: 'The id of the board.'
	},
	name: {
		type: new GraphQLNonNull(GraphQLString)
	},
	langNative: {
		type: new GraphQLNonNull(GraphQLString)
	},
	langTarget: {
		type: new GraphQLNonNull(GraphQLString)
	},
	topic: {
		type: new GraphQLNonNull(GraphQLString)
	},
	user: {
		type: new GraphQLNonNull(GraphQLID)
	}
}

export const boardType = new GraphQLObjectType({
	name: 'board',
	description: 'Board item',
	fields: boardFields
})

export const boardQuery = {
	type: new GraphQLList(boardType),
	args: {
		_id: boardFields._id
	},
	resolve: (root, fields, context, fieldASTs) => {
		const userId = context.user.id
		const projections = getProjection(fieldASTs)
		return boardGet({ ...fields, user: userId }, projections)
	}
}

export const boardMutation = {
	boardCreate: {
		type: boardType,
		args: {
			name: boardFields.name,
			langNative: boardFields.langNative,
			langTarget: boardFields.langTarget,
			topic: boardFields.topic
		},
		resolve: (root, vars, context) => {
			return boardCreate({ ...vars, user: context.user.id })
		}
	},
	boardUpdate: {
		type: boardType,
		args: {
			_id: boardFields._id,
			name: boardFields.name,
			langNative: boardFields.langNative,
			langTarget: boardFields.langTarget,
			topic: boardFields.topic
		},
		resolve: (root, vars, context) => {
			return boardUpdate({ ...vars, user: context.user.id })
		}
	},
	boardDelete: {
		type: boardType,
		args: {
			_id: boardFields._id
		},
		resolve: boardDelete
	}
}