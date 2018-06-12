import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} from 'graphql/type'

import { userCreate, userDelete, userGet } from '@/mongoose'

import {
    graphQLPage,
    graphQLPageArgs,
    GraphQLPageArgs
} from '../pagination'

import { fieldCreate } from '../../utilities'

export const userNodeType = new GraphQLObjectType({
    name: 'user',
    description: 'User item',
    fields: {
        _id: fieldCreate(GraphQLID),
        username: fieldCreate(GraphQLString),
        email: fieldCreate(GraphQLString)
    }
})

export const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        users: {
            type: graphQLPage(userNodeType),
            args: graphQLPageArgs,
            resolve: (root, args: GraphQLPageArgs, context, fieldASTs) => {
                return userGet(args)
            }
        }
    }
})

export const userQuery = {
    type: userType,
    resolve: () => true
}

export const userMuation = {
    userCreate: {
        type: userNodeType,
        args: {
            username: fieldCreate(GraphQLString, true),
            email: fieldCreate(GraphQLString, true),
            password: fieldCreate(GraphQLString, true)
        },
        resolve: (root, vars, context) => {
            return userCreate(vars)
        }
    },
    userDelete: {
        type: userNodeType,
        args: {
            _id: fieldCreate(GraphQLID, true)
        },
        resolve: (root, vars, context) => {
            return userDelete(vars)
        }
    }
}