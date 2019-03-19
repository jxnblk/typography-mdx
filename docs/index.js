import React, { useState, useMemo } from 'react'
import { MDXProvider } from '@mdx-js/tag'
import lawton from 'typography-theme-lawton'
import { GoogleFont } from 'react-typography'
import styled from '@emotion/styled'
import typographyMDX from '../src'
import Tenets from './tenets.md'
import { themes } from './themes'

const Container = styled.div({
  maxWidth: 768,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: 32,
})

export default props => {
  const [ name, setName ] = useState('lawton')
  const components = useMemo(() => {
    const theme = themes[name] || themes.lawton
    return typographyMDX(theme)
  }, [ name ])
  const {
    Root,
    typography,
  } = components

  return (
    <>
      <GoogleFont typography={typography} />
      <MDXProvider components={components}>
        <Root>
          <div>
            <label htmlFor='theme'>Theme</label>
            <select
              name='theme'
              id='theme'
              value={name}
              onChange={e => {
                setName(e.target.value)
              }}
            >
              {Object.keys(themes).map(name => (
                <option
                  key={name}
                  label={name}
                  value={name}
                />
              ))}
            </select>
          </div>
          <Container>
            <Tenets />
          </Container>
        </Root>
      </MDXProvider>
    </>
  )
}
