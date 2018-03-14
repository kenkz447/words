import mongoose from 'mongoose'

export function initConnection(options) {
    const { connectionAddress } = options

    mongoose.connect(connectionAddress)
    const db = mongoose.connection

    db.on('error', () => {
        console.error('FAILED to connect to mongoose')
    })

    db.once('open', () => {
        console.log('Connected to mongoose')
    })
}