import {
	GraphQLString,
	GraphQLID,
	GraphQLNonNull
} from 'graphql/type'

import { expect } from 'chai'
import { wordType } from './word'

describe('GraphQL: Board', () => {
	const wordTypeFields = wordType.getFields()

	it('Should have an "_id" field of type ID', () => {
		expect(wordTypeFields).to.have.property('_id')
		expect(wordTypeFields._id.type).to.deep.equals(GraphQLID)
	})
	it('Should have an "source" field of type String!', () => {
		expect(wordTypeFields).to.have.property('source')
		expect(wordTypeFields.source.type).to.deep.equals(new GraphQLNonNull(GraphQLString))
	})
	it('Should have an "translated" field of type String', () => {
		expect(wordTypeFields).to.have.property('translated')
		expect(wordTypeFields.translated.type).to.deep.equals(GraphQLString)
	})
	it('Should have an "board" field of type String!', () => {
		expect(wordTypeFields).to.have.property('board')
		expect(wordTypeFields.board.type).to.deep.equals(new GraphQLNonNull(GraphQLID))
	})
	it('Should have an "user" field of type String!', () => {
		expect(wordTypeFields).to.have.property('user')
		expect(wordTypeFields.user.type).to.deep.equals(new GraphQLNonNull(GraphQLID))
	})
})