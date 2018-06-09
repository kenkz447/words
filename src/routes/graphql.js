import graphqlHTTP from 'express-graphql'
import { schema } from '@/graphql'

export function registerGraphQLRoute(app) {
	app.use('/graphql', graphqlHTTP((request, response) => {
		const context = {
			user: request.user
		}
		return ({ schema, context })
	}))
}