import {
	GraphQLObjectType,
	GraphQLSchema
} from 'graphql/type'

import {
	userQuery, userMuation,
	boardQuery, boardMutation,
	wordQuery, wordMutation
} from './type'

const rootQuery = new GraphQLObjectType({
	name: 'query',
	fields: {
		users: userQuery,
		boards: boardQuery,
		words: wordQuery
	}
})

export const rootMutation = new GraphQLObjectType({
	name: 'mutation',
	fields: () => ({
		...userMuation,
		...boardMutation,
		...wordMutation
	})
})

export const schema = new GraphQLSchema({
	query: rootQuery,
	mutation: rootMutation
})