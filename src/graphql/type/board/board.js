import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLID
} from 'graphql/type'

import { boardCreate, boardDelete, boardGet, boardUpdate } from '/src/mongoose'
import { getProjection } from '/src/graphql/utilities'

const boardFields = {
	_id: {
		type: GraphQLID,
		description: 'The id of the board.'
	},
	name: {
		type: GraphQLString
	},
	langNative: {
		type: GraphQLString
	},
	langTarget: {
		type: GraphQLString
	},
	topic: {
		type: GraphQLString
	},
	user: {
		type: GraphQLID
	}
}

export const boardType = new GraphQLObjectType({
	name: 'board',
	description: 'Board item',
	fields: boardFields
})

export const boardQuery = {
	type: new GraphQLList(boardType),
	args: boardFields,
	resolve: (root, fields, context, fieldASTs) => {
		const userId = context.user.id
		const projections = getProjection(fieldASTs)
		return boardGet({...fields, user: userId}, projections)
	}
}

export const boardMuation = {
	boardCreate: {
		type: boardType,
		args: {
			name: boardFields.name,
			langNative: boardFields.langNative,
			langTarget: boardFields.langTarget,
			topic: boardFields.topic
		},
		resolve: boardCreate
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
		resolve: boardUpdate
	},
	boardDelete: {
		type: boardType,
		args: {
			_id: boardFields._id
		},
		resolve: boardDelete
	}
}