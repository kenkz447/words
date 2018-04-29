import { expect } from 'chai'
import mongoose from 'mongoose'

import { wordFields, wordCreate, wordGet, wordDelete, wordUpdate } from './Word'

import { openConnection } from 'src/mongoose/openConnection'
import { mongoDbAddress } from '/config'

const testUser = {
	id: 1
}

let testCreateWord = {
	source: 'hello',
	translated: 'xin chào',
	board: 'x',
	user: testUser.id
}

describe('Mongoose: Word', () => {
	before(async function () {
		await openConnection({ mongoDbAddress })
	})
	after(function () {
		mongoose.connection.close()
	})

	it('Should have an "source" field of type [function: String]', () => {
		expect(wordFields).to.have.property('source')
		expect(typeof wordFields.source).equals('function')
	})
	it('Should have an "translated" field of type [function: String]', () => {
		expect(wordFields).to.have.property('translated')
		expect(typeof wordFields.translated).equals('function')
	})
	it('Should have an "board" field of type [function: String]', () => {
		expect(wordFields).to.have.property('board')
		expect(typeof wordFields.board).equals('function')
	})
	it('Should have an "user" field of type [function: String]', () => {
		expect(wordFields).to.have.property('user')
		expect(typeof wordFields.user).equals('function')
	})
	it('Should create word function working correctly', (done) => {
		wordCreate(testCreateWord)
			.then((newWord) => {
				if (newWord) {
					return done()
				}
				throw new Error('Create failed.')
			})
			.catch((error) => done(error))
	})
	it('Should update word function working correctly', (done) => {
		wordGet(testCreateWord).then(result => {
			wordUpdate({ ...result, translated: 'chào' })
				.then((word) => {
					if (word && word.name === result.name) {
						return done()
					}
					throw new Error('Update failed.')
				})
				.catch(done)
		})
	})
	it('Should get and delete word function working correctly', (done) => {
		wordGet(testCreateWord).then(result => {
			const word = result[0]
			wordDelete(word)
				.then(done).catch(done)
		})
	})
})