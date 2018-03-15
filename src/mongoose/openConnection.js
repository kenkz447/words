import mongoose from 'mongoose'

export function openConnection(options) {
    const { mongoDbAddress } = options

    const promise = new Promise((reslove, reject) => {
        mongoose.connect(mongoDbAddress)
        const db = mongoose.connection

        db.on('error', () => {
            console.error('FAILED: to connect to mongoose.')
        })

        db.once('open', () => {
            console.log('DONE: Connected to mongoose.')
        })
    })

    return promise
}