import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLBoolean,
	GraphQLInt,
	GraphQLID,
	GraphQLList
} from 'graphql'

export interface GraphQLPageArgs {
	first: number,
	after: string
}

export interface Edge<T> {
	node: T,
	cursor: string
}

export interface GraphQlPagination<T> {
	totalCount: number,
	edges: Edge<T>[],
	pageInfo: {
		startCursor: string,
		endCursor: string,
		hasNextPage: boolean
	}
}

export const graphQLPageArgs = {
	first: {
		type: GraphQLInt,
		description: 'Limits the number of results returned in the page. Defaults to 20.'
	},
	after: {
		type: GraphQLID,
		description: 'The cursor value of an item returned in previous page. An alternative to in integer offset.'
	}
}

export function edge(itemType) {
	return new GraphQLObjectType({
		name: 'Edge',
		description: 'Generic edge to allow cursors',
		fields: () => ({
			node: { type: itemType },
			cursor: { type: GraphQLString }
		})
	})
}

export const GraphQLPageInfo = new GraphQLObjectType({
	name: 'GraphQLPageInfo',
	description: 'Information about current page',
	fields: () => ({
		startCursor: { type: GraphQLString },
		endCursor: { type: GraphQLString },
		hasPrevousPage: { type: GraphQLBoolean },
		hasNextPage: { type: GraphQLBoolean }
	})
})

export function graphQLPage(itemType) {
	const itemEdge = edge(itemType)
	return new GraphQLObjectType({
		name: 'GraphQLPage',
		fields: () => ({
			totalCount: { type: GraphQLInt },
			edges: { type: new GraphQLList(itemEdge) },
			pageInfo: { type: GraphQLPageInfo }
		})
	})
}

export function convertNodeToCursor(node): string {
	return node._id
}

export function convertCursorToNodeId(cursor: string): string {
	return cursor
}