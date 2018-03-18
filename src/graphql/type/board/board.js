import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLID
} from 'graphql/type'

import { boardCreate, boardDelete, boardGet, boardUpdate } from '/src/mongoose'
import { getProjection } from '/src/graphql/utilities'

const fields = {
	id: {
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
		type: GraphQLString
	}
}

export const boardType = new GraphQLObjectType({
	name: 'board',
	description: 'Board item',
	fields: fields
})

export const boardQuery = {
	type: new GraphQLList(boardType),
	args: fields,
	resolve: (root, fields, source, fieldASTs) => {
		const projections = getProjection(fieldASTs)
		return boardGet(fields, projections)
	}
}

export const boardMuation = {
	boardCreate: {
		type: boardType,
		args: {
			name: fields.name,
			langNative: fields.langNative,
			langTarget: fields.langTarget,
			topic: fields.topic
		},
		resolve: boardCreate
	},
	boardUpdate: {
		type: boardType,
		args: {
			name: fields.name,
			langNative: fields.langNative,
			langTarget: fields.langTarget,
			topic: fields.topic
		},
		resolve: boardUpdate
	},
	boardDelete: {
		type: boardType,
		args: {
			id: fields.id
		},
		resolve: boardDelete
	}
}