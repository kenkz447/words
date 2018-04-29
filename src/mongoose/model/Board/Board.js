import mongoose from 'mongoose'
import { Word } from '../Word'

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

export function boardCreate(props) {
	const newBoard = new Board(props)
	return new Promise((resolve, reject) => {
		newBoard.save((error, result) => {
			error ? reject(error) : resolve(result)
		})
	})
}

export function boardUpdate(props) {
	const boardEntity = Board.findById(props._id)
	return new Promise((resolve, reject) => {
		boardEntity.update(props, (error) => {
			error ? reject(error) : resolve(props)
		})
	})
}

export function boardDelete(props) {
	return new Promise(async (resolve, reject) => {
		const callBack = (errors, result) => {
			if (errors) {
				return reject(errors)
			}
			Word.find({ board: props._id })
				.remove(() => resolve())
		}
		if (props._id !== null) {
			Board.findByIdAndRemove(props._id, callBack)
		} else {
			Board.findOneAndRemove(props, callBack)
		}
	})
}