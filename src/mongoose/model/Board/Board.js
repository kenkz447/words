import mongoose from 'mongoose'
const { Schema } = mongoose

export const fields = {
	name: String,
	langNative: String,
	langTarget: String,
	topic: String,
	score: String,
	user: String
}

const options = { collection: 'Boards' }

const boardSchema = new Schema(fields, options)

export const Board = mongoose.model('Board', boardSchema)

// #region Board utilities
function saveNewBoardToDb(newBoard) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await newBoard.save()
			resolve(result)
		} catch (error) {
			reject(error)
		}
	})
}
// #endregion

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

export async function boardCreate(root, props) {
	const newBoard = new Board(props)
	return saveNewBoardToDb(newBoard)
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