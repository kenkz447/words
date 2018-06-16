import {
	GraphQLString,
	GraphQLID
} from 'graphql/type'

import { expect } from 'chai'
import { userNodeType } from './user'

describe('GraphQL: User', () => {
	const userTypeFields = userNodeType.getFields()

	it('Should have an "_id" field of type ID', () => {
		expect(userTypeFields).to.have.property('_id')
		expect(userTypeFields._id.type).to.deep.equals(GraphQLID)
	})
	it('Should have an "username" field of type String', () => {
		expect(userTypeFields).to.have.property('username')
		expect(userTypeFields.username.type).to.deep.equals(GraphQLString)
	})
	it('Should have an "email" field of type String', () => {
		expect(userTypeFields).to.have.property('email')
		expect(userTypeFields.email.type).to.deep.equals(GraphQLString)
	})
	it('Should have an "password" field of type String', () => {
		expect(userTypeFields).to.have.property('password')
		expect(userTypeFields.password.type).to.deep.equals(GraphQLString)
	})
})