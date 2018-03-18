import { expect } from 'chai'
import mongoose from 'mongoose'

import { fields, boardCreate, boardGet, boardDelete } from './Board'

import { openConnection } from 'src/mongoose/openConnection'
import { mongoDbAddress } from '/config'

const board = {
	name: 'test_board',
	langNative: 'vi',
	langTarget: 'en',
	topic: 'common',
	user: 'user_id'
}

describe('Mongoose: Board', () => {
	before(async function () {
		await openConnection({ mongoDbAddress })
	})
	after(function () {
		mongoose.connection.close()
	})

	it('Should have an "name" field of type [function: String]', () => {
		expect(fields).to.have.property('name')
		expect(typeof fields.name).equals('function')
	})
	it('Should have an "langNative" field of type [function: String]', () => {
		expect(fields).to.have.property('langNative')
		expect(typeof fields.langNative).equals('function')
	})
	it('Should have an "langTarget" field of type [function: String]', () => {
		expect(fields).to.have.property('langTarget')
		expect(typeof fields.langTarget).equals('function')
	})
	it('Should have an "topic" field of type [function: String]', () => {
		expect(fields).to.have.property('topic')
		expect(typeof fields.topic).equals('function')
	})
	it('Should have an "user" field of type [function: String]', () => {
		expect(fields).to.have.property('user')
		expect(typeof fields.user).equals('function')
	})
	it('Should create board function working correctly', (done) => {
		boardCreate(undefined, board)
			.then((newBoard) => {
				if (newBoard) {
					return done()
				}
				throw new Error('Create failed.')
			})
			.catch((error) => done(error))
	})
	it('Should get and delete board function working correctly', (done) => {
		boardGet(board).then(result => {
			if (result.length) {
				const board = result[0]
				boardDelete(undefined, board)
					.then(done)
			} else {
				throw new Error('Found no board!')
			}
		}).catch(error => {
			done(error)
		})
	})
})