import { QueryCursor, Model } from 'mongoose'
import { GraphQlPagination, Edge, convertNodeToCursor } from '@/graphql'

export async function getEdges(queryCursor: QueryCursor, after: string, first: number) {
	try {
		const edges: Array<Edge> = []

		let count = 0

		let nextNode = await queryCursor.next()
		while (nextNode) {
			edges.push({
				node: nextNode,
				cursor: convertNodeToCursor(nextNode)
			})
			count++
			const canGetMore = Boolean(count < first)
			if (canGetMore) {
				nextNode = await queryCursor.next()
			} else {
				nextNode = null
			}
		}
		return edges
	} catch (error) {
		throw new Error(error)
	}
}

export async function getPageInfo(queryCursor: QueryCursor, edges: Edge[], first: number) {
	try {
		let hasNextPage = false
		if (edges.length === first) {
			const nextNode = await queryCursor.next()
			if (nextNode) {
				hasNextPage = true
			}
		}

		const firstItemOfResult = edges[0]
		const lastItemOfResult = edges[edges.length - 1]

		return {
			startCursor: firstItemOfResult && firstItemOfResult.cursor,
			endCursor: lastItemOfResult && lastItemOfResult.cursor,
			hasNextPage: hasNextPage
		}
	} catch (error) {
		throw new Error(error)
	}
}

interface ApplyPaginationProps {
	Model: Model,
	first: number,
	after: string
}

export async function applyPagination<T>(props: ApplyPaginationProps) {
	try {
		const { Model, after, first } = props
		let query
		if (after) {
			query = Model.find({ _id: { $lt: after } })
		} else {
			query = Model.where()
		}

		query = query.sort({ _id: -1 }).limit(first)
		const queryCursor = query.cursor()

		const edges = await getEdges(queryCursor, after, first)
		const pageInfo = await getPageInfo(queryCursor, edges, first)

		const pagination: GraphQlPagination<T> = {
			totalCount: Model.count(),
			edges: edges,
			pageInfo: pageInfo
		}

		return pagination
	} catch (error) {
		throw new Error(error)
	}
}