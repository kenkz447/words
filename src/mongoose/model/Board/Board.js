import mongoose from 'mongoose'
const { Schema } = mongoose

export const boardFields = {
	name: String,
	langNative: String,
	langTarget: String,
	topic: String,
	score: String,
	user: String
}

const options = { collection: 'Boards' }

const boardSchema = new Schema(boardFields, options)

export const Board = mongoose.model('Board', boardSchema)

export function boardGet(props, projections) {
	return new Promise((resolve, reject) => {
		const params = {}
		for (const fieldKey in props) {
			params[fieldKey] = props[fieldKey]
		}
		Board.find(params, projections, (error, boards) => {
			error ? reject(error) : resolve(boards)
		})
	})
}

export function boardCreate(root, props, context) {
	const newBoard = new Board({ ...props, user: context.user.id })
	return new Promise((resolve, reject) => {
		newBoard.save((error, result) => {
			error ? reject(error) : resolve(result)
		})
	})
}

export function boardUpdate(root, props, context) {
	const boardEntity = Board.findById()
	return new Promise((resolve, reject) => {
		boardEntity.update({ ...props, user: context.user.id }, (error, result) => {
			error ? reject(error) : resolve(result)
		})
	})
}

export function boardDelete(root, props) {
	return new Promise(async (resolve, reject) => {
		const callBack = (errors, result) => {
			errors ? reject(errors) : resolve()
		}
		if (props._id !== null) {
			Board.findByIdAndRemove(props._id, callBack)
		} else {
			Board.findOneAndRemove(props, callBack)
		}
	})
}