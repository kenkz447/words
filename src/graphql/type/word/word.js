import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLID,
	GraphQLNonNull
} from 'graphql/type'

import { wordCreate, wordDelete, wordGet, wordUpdate } from '@/mongoose'
import { getProjection } from '@/graphql/utilities'

const wordFields = {
	_id: {
		type: GraphQLID,
		description: 'The id of the word.'
	},
	source: {
		type: new GraphQLNonNull(GraphQLString)
	},
	translated: {
		type: GraphQLString
	},
	board: {
		type: new GraphQLNonNull(GraphQLID)
	},
	user: {
		type: new GraphQLNonNull(GraphQLID)
	}
}

export const wordType = new GraphQLObjectType({
	name: 'word',
	description: 'Word item',
	fields: wordFields
})

export const wordQuery = {
	type: new GraphQLList(wordType),
	args: {
		_id: wordFields._id,
		board: wordFields.board
	},
	resolve: (root, fields, context, fieldASTs) => {
		const userId = context.user.id
		const projections = getProjection(fieldASTs)
		return wordGet({ ...fields, user: userId }, projections)
	}
}

export const wordMutation = {
	wordCreate: {
		type: wordType,
		args: {
			source: wordFields.source,
			translated: wordFields.translated,
			board: wordFields.board
		},
		resolve: (root, vars, context) => {
			return wordCreate({ ...vars, user: context.user.id })
		}
	},
	wordUpdate: {
		type: wordType,
		args: {
			_id: wordFields._id,
			source: wordFields.source,
			translated: wordFields.translated,
			board: wordFields.board
		},
		resolve: (root, vars, context) => {
			return wordUpdate({ ...vars, user: context.user.id })
		}
	},
	wordDelete: {
		type: wordType,
		args: {
			_id: wordFields._id
		},
		resolve: (root, vars, context) => {
			return wordDelete(vars)
		}
	}
}