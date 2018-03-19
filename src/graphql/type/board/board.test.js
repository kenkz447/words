import {
	GraphQLString,
	GraphQLID
} from 'graphql/type'

import { expect } from 'chai'
import { boardType } from './board'

describe('GraphQL: User', () => {
	const boardTypeFields = boardType.getFields()

	it('Should have an "_id" field of type ID', () => {
		expect(boardTypeFields).to.have.property('_id')
		expect(boardTypeFields._id.type).to.deep.equals(GraphQLID)
	})
	it('Should have an "langNative" field of type String', () => {
		expect(boardTypeFields).to.have.property('langNative')
		expect(boardTypeFields.langNative.type).to.deep.equals(GraphQLString)
	})
	it('Should have an "langTarget" field of type String', () => {
		expect(boardTypeFields).to.have.property('langTarget')
		expect(boardTypeFields.langTarget.type).to.deep.equals(GraphQLString)
	})
	it('Should have an "topic" field of type String', () => {
		expect(boardTypeFields).to.have.property('topic')
		expect(boardTypeFields.topic.type).to.deep.equals(GraphQLString)
	})
	it('Should have an "user" field of type String', () => {
		expect(boardTypeFields).to.have.property('user')
		expect(boardTypeFields.user.type).to.deep.equals(GraphQLID)
	})
})