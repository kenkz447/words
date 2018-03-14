import mongoose from 'mongoose'

export function initConnection(options) {
    const { mongoDbAddress } = options

    mongoose.connect(mongoDbAddress)
    const db = mongoose.connection

    db.on('error', () => {
        console.error('FAILED: to connect to mongoose.')
    })

    db.once('open', () => {
        console.log('DONE: Connected to mongoose.')
    })
}