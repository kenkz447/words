import mongoose from 'mongoose'
const { Schema } = mongoose

export const wordFields = {
	source: String,
	translated: String,
	board: String,
	user: String
}

const options = { collection: 'Words' }

const wordSchema = new Schema(wordFields, options)

export const Word = mongoose.model('Word', wordSchema)

export function wordGet(props, projections) {
	return new Promise((resolve, reject) => {
		const params = {}
		for (const fieldKey in props) {
			params[fieldKey] = props[fieldKey]
		}
		Word.find(params, projections, (error, words) => {
			error ? reject(error) : resolve(words)
		})
	})
}

export function wordCreate(props) {
	const newWord = new Word(props)
	return new Promise((resolve, reject) => {
		newWord.save((error, result) => {
			error ? reject(error) : resolve(result)
		})
	})
}

export function wordUpdate(props) {
	const wordEntity = Word.findById(props._id)
	return new Promise((resolve, reject) => {
		wordEntity.update(props, (error, result) => {
			error ? reject(error) : resolve(props)
		})
	})
}

export function wordDelete(props) {
	return new Promise(async (resolve, reject) => {
		const callBack = (errors, result) => {
			errors ? reject(errors) : resolve()
		}
		if (props._id !== null) {
			Word.findByIdAndRemove(props._id, callBack)
		} else {
			Word.findOneAndRemove(props, callBack)
		}
	})
}