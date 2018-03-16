import graphqlHTTP from 'express-graphql'
import { schema } from '/src/graphql'

export function registerGraphQLRoute(app) {
    app.use('/graphql', graphqlHTTP((request, response) => {
        return {
            schema
        }
    }))
}