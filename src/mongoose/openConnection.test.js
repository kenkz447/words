import { expect } from 'chai'
import mongoose from 'mongoose'

import { mongoDbAddress } from '/config'
import { openConnection } from './openConnection'

describe('Mongoose connection', () => {
	it('Should have "mongoDbAddress" (database address) exported from configuration file', () => {
		expect(mongoDbAddress).is.not.undefined
	})
	it('Should have function to connect server named "openConnection"', () => {
		expect(openConnection).is.not.undefined
	})
	it('Should open connection', function (done) {
		openConnection({ mongoDbAddress }).then(() => {
			mongoose.connection.close(done)
		}).catch((error) => {
			done(error)
		})
	})
})
