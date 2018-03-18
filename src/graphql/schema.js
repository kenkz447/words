import {
	GraphQLObjectType,
	GraphQLSchema
} from 'graphql/type'

import {
	userQuery, userMuation,
	boardQuery, boardMuation
} from './type'

const rootQuery = new GraphQLObjectType({
	name: 'query',
	fields: {
		users: userQuery,
		boards: boardQuery
	}
})

export const rootMutation = new GraphQLObjectType({
	name: 'mutation',
	fields: () => ({
		...userMuation,
		...boardMuation
	})
})

export const schema = new GraphQLSchema({
	query: rootQuery,
	mutation: rootMutation
})