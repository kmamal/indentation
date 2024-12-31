
const PATTERN_STARTING = /^[ \t]*/u
const PATTERN_ENDING = /[ \t]*$/u
const PATTERN_BOTH = /^[ \t]*$/u

const unindent = (str, options = {}) => {
	const {
		trimLeadingNewlines = true,
		ensureTrailingNewline = true,
		trimTrailingWhitespace = true,
	} = options

	const lines = str.split('\n')

	const firstNonEmptyLineIndex = lines.findIndex(Boolean)
	if (firstNonEmptyLineIndex === -1) { return str }

	const [ indentation ] = lines[firstNonEmptyLineIndex].match(PATTERN_STARTING)
	if (indentation.includes(' ') && indentation.includes('\t')) { throw new Error("mixed indentation") }
	const depth = indentation.length

	const unindentedLines = new Array(lines.length)
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		let end = line.length

		if (trimTrailingWhitespace) {
			const [ trailingWhitespace ] = line.match(PATTERN_ENDING)
			if (trailingWhitespace.length > 0) {
				end = -trailingWhitespace.length
			}
		}

		const lineIndentation = line.slice(0, depth)
		if (!PATTERN_BOTH.test(lineIndentation)) {
			throw new Error("invalid indentation")
		}

		unindentedLines[i] = line.slice(depth, end)
	}

	if (trimLeadingNewlines) {
		while (unindentedLines[0].length === 0) { unindentedLines.shift() }
	}

	if (ensureTrailingNewline) {
		while (unindentedLines.at(-1).length === 0) { unindentedLines.pop() }
		if (unindentedLines.length > 0) { unindentedLines.push('') }
	}

	return unindentedLines.join('\n')
}

module.exports = { unindent }
