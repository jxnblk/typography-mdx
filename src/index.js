import styled from '@emotion/styled'
import Typography from 'typography'

const tags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'a',
  'img',
  'hr',
  'ul',
  'ol',
  'li',
  'p',
  'blockquote',
  'table',
  'th',
  'thead',
  'pre',
  'code',
  'b',
  'strong',
  'html',
  'body',
  // keys not currently handled
  // '@media only screen and (max-width:480px)',
  // 'dd',
  // 'dt',
  // 'hgroup',
  // 'figure',
  // 'address',
  // 'kbd',
  // 'samp',
  // 'abbr',
  // 'abbr[title]',
  // 'acronym',
  // 'form',
  // 'noscript',
  // 'iframe',
]

const nestedSelectors = {
  'ol li': 'ol',
  'ul li': 'ul',
  'li > ol': 'li',
  'li > ul': 'li',
  'blockquote *:last-child': 'blockquote',
  'li *:last-child': 'li',
  'p *:last-child': 'p',
  'li > p': 'li',
  'th:first-child': 'th',
  'td:first-child': 'td',
  'th:last-child': 'th',
  'td:last-child': 'td',
  'a:hover': 'a',
}

const root = {
  html: 'Root',
  body: 'Root',
}

export const toStylesObject = (theme) => {
  const typography = new Typography({
    ...theme,
    includeNormalize: false,
  })
  const json = typography.toJSON()
  const styles = {}

  // split selectors
  for (const key in json) {
    const selectors = key.split(',')
    if (selectors.length < 2) continue
    selectors.forEach(selector => {
      json[selector] = {
        ...(json[selector] || {}),
        ...json[key]
      }
    })
    delete json[key]
  }

  // create style objects for each component
  for (const key in json) {
    const nested = nestedSelectors[key]
    if (!tags.includes(key) && !nested) continue
    if (!nested) {
      styles[key] = json[key]
    } else if (styles[nested]) {
      const subkey = key.replace(nested, '&')
      styles[nested] = {
        ...styles[key],
        [subkey]: json[key]
      }
    }
  }
  return {
    typography,
    styles,
  }
}

export const createComponents = (theme = {}) => {
  const { typography, styles } = toStylesObject(theme)

  const components = {
    // pass typography object along
    typography,
  }

  // create styled components
  for (const key in styles) {
    if (root[key]) {
      // create a Root component in lieu of using html & body elements
      components.Root = styled(components.Root || 'div')(
        styles[key]
      )
    } else {
      components[key] = styled(components[key] || key)(styles[key])
    }
  }

  return components
}

export default createComponents
