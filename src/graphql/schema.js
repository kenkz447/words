import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID
} from 'graphql/type'

import { userType, userQuery, userMuation } from './type'

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