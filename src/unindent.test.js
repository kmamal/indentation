const { test } = require('@kmamal/testing')
const { unindent } = require('./unindent')

test("unindent", (t) => {
	t.equal(
		unindent(`

			foo

			bar

		`),
		'foo\n\nbar\n',
	)
})
