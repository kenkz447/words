import { expect } from 'chai'
import mongoose from 'mongoose'

import { userModelFields, userCreate, userGet, userDelete } from './User'

import { openConnection } from 'src/mongoose/openConnection'
import { mongoDbAddress } from '@/config'

describe('Mongoose: User', () => {
	before(async function () {
		await openConnection({ mongoDbAddress })
	})
	after(function () {
		mongoose.connection.close()
	})

	it('Should have an "username" field of type [function: String]', () => {
		expect(userModelFields).to.have.property('username')
		expect(typeof userModelFields.username).equals('function')
	})
	it('Should have an "email" field of type [function: String]', () => {
		expect(userModelFields).to.have.property('email')
		expect(typeof userModelFields.username).equals('function')
	})
	it('Should have an "password" field of type [function: String]', () => {
		expect(userModelFields).to.have.property('password')
		expect(typeof userModelFields.password).equals('function')
	})
	it('Should create user function working correctly', (done) => {
		userCreate({ username: 'test_user', email: 'test_email@gmail.com', password: 'test_password' })
			.then((newUser) => {
				if (newUser) {
					return done()
				}
				throw new Error('Create failed.')
			})
			.catch((error) => done(error))
	})
	it('Should get and delete user function working correctly', (done) => {
		userGet({ username: 'test_user', email: 'test_email@gmail.com' })
			.then((result) => {
				if (result.length) {
					const user = result[0]
					if (user.username === 'test_user' && user.email === 'test_email@gmail.com') {
						userDelete({ _id: user._id })
						return done()
					}
				}
				throw new Error('Found no user!')
			})
			.catch((error) => done(error))
	})
})