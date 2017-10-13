'use strict'

const h = require('snabbdom/h').default
const snabby = require('snabby')
const test = require('tape')

const ids = require('../../lib/ids')

const tree1 = h('svg', {xmlns: 'http://www.w3.org/2000/svg'}, [
	h('defs', [ // must ignore defs
		h('path', {id: 'foo', d: 'M10 10 h10'})
	]),
	h('g', [
		h('g', {id: 'bar'}, [
			h('circle', {r: '10', cx: '10', cy: '10'})
		]),
		h('path', {id: 'baz', d: 'M10 10 h10'})
	])
])

const tree2 = snabby `
<svg xmlns="http://www.w3.org/2000/svg">
	<path id="foo" d="M10 10 h10" />
</svg>`

test('lib/ids', (t) => {
	t.plan(2)

	t.deepEqual(ids(tree1).sort(), ['bar', 'baz'])
	t.deepEqual(ids(tree2).sort(), ['foo'])
})
