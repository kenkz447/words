import mongoose from 'mongoose'

export function openConnection(options) {
    const { mongoDbAddress } = options

    const promise = new Promise((reslove, reject) => {
        mongoose.connect(mongoDbAddress)
        const db = mongoose.connection

        db.on('error', reject)
        db.once('open', reslove)
    })

    return promise
}