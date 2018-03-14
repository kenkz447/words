'use strict'

import mongoose from 'mongoose'
import passwordHash from 'password-hash'

const { Schema } = mongoose

const fields = {
    id: String,
    username: String,
    password: String
}

const options = { collection: 'Users' }

const userSchema = new Schema(fields, options)

export const User = mongoose.model('User', userSchema)

//#region User utilities
function createUser({ username, password }) {
    const hashedPassword = passwordHash.generate(password);

    return new User({
        username,
        password: hashedPassword
    })
}

function saveNewUserToDb(newUser) {
    return new Promise(async(resolve, reject) => {
        try {
            const result = await newUser.save()
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}
//#endregion

export function userGet(props, projections) {
    return new Promise((resolve, reject) => {
        const params = {}
        for (const fieldKey in props) {
            if (props.hasOwnProperty(fieldKey))
                params[fieldKey] = props[fieldKey]
        }

        User.find(params, projections, (error, users) => {
            error ? reject(error) : resolve(users)
        })
    })
}

export function userAdd(root, props) {
    const newUser = createUser(props)
    return saveNewUserToDb(newUser)
}

export function userRemove(root, props) {
    return new Promise(async(resolve, reject) => {
        const target = User.findById(props._id)
        target.remove((errors) => {
            errors ? reject(errors) : resolve()
        })
    })
}