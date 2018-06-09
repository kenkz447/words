import { GraphQLNonNull } from 'graphql/type'

export function fieldCreate(type: any, notNULL: boolean) {
	return {
		type: notNULL ? new GraphQLNonNull(type) : type
	}
}

/**
 * Generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @param  {Array<string>} excludes
 * @return {Project}
 */
export function getProjection(fieldASTs, excludes) {
	const fieldNode = fieldASTs.fieldNodes[0]
	return fieldNode.selectionSet.selections.reduce((projections, selection) => {
		if (excludes && !excludes.includes(selection.name.value)) {
			projections[selection.name.value] = true
		}
		return projections
	}, {})
}