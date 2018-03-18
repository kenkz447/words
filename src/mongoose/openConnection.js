import mongoose from 'mongoose'

export function openConnection (options) {
	const { mongoDbAddress } = options

	const promise = new Promise((resolve, reject) => {
		mongoose.connect(mongoDbAddress)
		const db = mongoose.connection

		db.on('error', reject)
		db.once('open', resolve)
	})

	return promise
}