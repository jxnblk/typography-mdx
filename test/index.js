import test from 'ava'
import lawton from 'typography-theme-lawton'
import createComponents from '../src'

test('returns components', t => {
  const components = createComponents(lawton)
  t.is(typeof components, 'object')
  t.is(typeof components.h1, 'function')
})
