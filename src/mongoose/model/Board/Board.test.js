import { expect } from 'chai'
import mongoose from 'mongoose'

import { boardFields, boardCreate, boardGet, boardDelete, boardUpdate } from './Board'

import { openConnection } from 'src/mongoose/openConnection'
import { mongoDbAddress } from '/config'

let testCreateBoard = {
	name: 'test_board',
	langNative: 'vi',
	langTarget: 'en',
	topic: 'common'
}

const testUser = {
	id: 1
}

describe('Mongoose: Board', () => {
	before(async function () {
		await openConnection({ mongoDbAddress })
	})
	after(function () {
		mongoose.connection.close()
	})

	it('Should have an "name" field of type [function: String]', () => {
		expect(boardFields).to.have.property('name')
		expect(typeof boardFields.name).equals('function')
	})
	it('Should have an "langNative" field of type [function: String]', () => {
		expect(boardFields).to.have.property('langNative')
		expect(typeof boardFields.langNative).equals('function')
	})
	it('Should have an "langTarget" field of type [function: String]', () => {
		expect(boardFields).to.have.property('langTarget')
		expect(typeof boardFields.langTarget).equals('function')
	})
	it('Should have an "topic" field of type [function: String]', () => {
		expect(boardFields).to.have.property('topic')
		expect(typeof boardFields.topic).equals('function')
	})
	it('Should have an "user" field of type [function: String]', () => {
		expect(boardFields).to.have.property('user')
		expect(typeof boardFields.user).equals('function')
	})
	it('Should create board function working correctly', (done) => {
		boardCreate(undefined, testCreateBoard, { user: testUser })
			.then((newBoard) => {
				if (newBoard) {
					return done()
				}
				throw new Error('Create failed.')
			})
			.catch((error) => done(error))
	})
	it('Should update board function working correctly', (done) => {
		boardGet(testCreateBoard).then(result => {
			boardUpdate(undefined, { ...result, name: 'update_name' }, { user: testUser })
				.then((board) => {
					if (board && board.name === result.name) {
						return done()
					}
					throw new Error('Update failed.')
				})
				.catch(done)
		})
	})
	it('Should get and delete board function working correctly', (done) => {
		boardGet(testCreateBoard).then(result => {
			const board = result[0]
			boardDelete(undefined, board)
				.then(done).catch(done)
		})
	})
})