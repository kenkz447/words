import {
	GraphQLObjectType,
	GraphQLSchema
} from 'graphql/type'

import { userQuery, userMuation } from './type'

const rootQuery = new GraphQLObjectType({
	name: 'query',
	fields: {
		users: userQuery
	}
})

export const rootMutation = new GraphQLObjectType({
	name: 'mutation',
	fields: () => ({
		...userMuation
	})
})

export const schema = new GraphQLSchema({
	query: rootQuery,
	mutation: rootMutation
})