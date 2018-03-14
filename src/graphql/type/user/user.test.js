'use strict'

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

import { expect } from 'chai'
import { userType } from './user'

describe('User', () => {
    it('Should have an "id" field of type ID', () => {
        expect(userType.getFields()).to.have.property('id');
        expect(userType.getFields().id.type).to.deep.equals(GraphQLID);
    })
    it('Should have an "username" field of type String', () => {
        expect(userType.getFields()).to.have.property('username');
        expect(userType.getFields().username.type).to.deep.equals(GraphQLString);
    })
    it('Should have an "password" field of type String', () => {
        expect(userType.getFields()).to.have.property('password');
        expect(userType.getFields().password.type).to.deep.equals(GraphQLString);
    })
})