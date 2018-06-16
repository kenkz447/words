import mongoose from 'mongoose'

import { applyPagination } from '@/mongoose/utilities'

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

export function boadFindOne(args) {
	return Board.findOne(args).exec()
}

export function boardGet(args) {
	return applyPagination(Board, args)
}

export function boardCreate(props) {
	const newBoard = new Board(props)
	return new Promise((resolve, reject) => {
		newBoard.save((error, result) => {
			error ? reject(error) : resolve(result)
		})
	})
}

export async function boardUpdate(props) {
	return new Promise((resolve, reject) => {
		const boardsByUser = Board.where('user').equals(props.user)
		boardsByUser.findOneAndUpdate({ _id: props._id }, (error, result) => {
			error ? reject(error) : resolve(result)
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