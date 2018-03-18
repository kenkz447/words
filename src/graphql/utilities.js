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