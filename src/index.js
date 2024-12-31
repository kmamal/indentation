
const PATTERN = /^[ \t]*/gu

const unindent = (str, options = {}) => {
	const {
		trimLeadingNewlines = true,
		ensureTrailingNewline = true,
	} = options

	const lines = str.split('\n')

	const firstNonEmptyLineIndex = lines.findIndex(Boolean)
	if (firstNonEmptyLineIndex === -1) { return str }

	const [ indentation ] = lines[firstNonEmptyLineIndex].match(PATTERN)
	const indentationLength = indentation.length

	const unindentedLines = new Array(lines.length)
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		unindentedLines[i] = line.startsWith(indentation)
			? line.slice(indentationLength)
			: line
	}

	if (trimLeadingNewlines) {
		while (unindentedLines[0].length === 0) { unindentedLines.shift() }
	}

	if (ensureTrailingNewline) {
		if (unindentedLines.length === 0) { return '' }
		if (unindentedLines.at(-1).length !== 0) {
			unindentedLines.push('')
		}
	}

	return unindentedLines.join('\n')
}

module.exports = { unindent }
