import { QueryCursor, Model } from 'mongoose'
import { GraphQlPagination, Edge, convertNodeToCursor, GraphQLPageArgs } from '@/graphql'

export async function getEdges(queryCursor: QueryCursor, graphQLPageArgs: GraphQLPageArgs) {
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
			const canGetMore = Boolean(count < graphQLPageArgs.first)
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

export async function applyPagination<T>(model: Model, graphQLPageArgs: GraphQLPageArgs) {
	try {
		const { after, first } = graphQLPageArgs
		let query
		if (after) {
			query = model.find({ _id: { $lt: after } })
		} else {
			query = model.where()
		}

		query = query.sort({ _id: -1 }).limit(first)
		const queryCursor = query.cursor()

		const edges = await getEdges(queryCursor, graphQLPageArgs)
		const pageInfo = await getPageInfo(queryCursor, edges, first)

		const pagination: GraphQlPagination<T> = {
			totalCount: model.count(),
			edges: edges,
			pageInfo: pageInfo
		}

		return pagination
	} catch (error) {
		throw new Error(error)
	}
}