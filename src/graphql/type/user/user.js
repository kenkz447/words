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

import { User, userAdd, userRemove, userQuery } from '/src/mongoose'
import { getProjection } from '/src/graphql/utilities'

const fields = {
    _id: {
        type: GraphQLID,
        description: 'The id of the user.',
    },
    username: {
        type: GraphQLString,
        description: 'The name of the user.',
    },
    password: {
        type: GraphQLString,
        description: 'The password of the user.'
    }
}

export const userType = new GraphQLObjectType({
    name: 'user',
    description: 'User item',
    fields: fields
})

export const userQuery = {
    type: new GraphQLList(userType),
    args: fields,
    resolve: (root, fields, source, fieldASTs) => {
        const excludes = ['password']
        const projections = getProjection(fieldASTs, excludes)
        return userQuery(fields, projections)
    }
}

export const userMuation = {
    userAdd: {
        type: userType,
        args: {
            username: fields.username,
            password: fields.password
        },
        resolve: userAdd
    },
    userRemove: {
        type: userType,
        args: {
            _id: fields._id
        },
        resolve: userRemove
    }
}