
**DEPRECATED** See https://theme-ui.com

# typography-mdx

Create [MDX][] components from [Typography.js][] themes

```sh
npm i typography-mdx
```

```jsx
import React from 'react'
import typographyMDX from 'typography-mdx'
import { MDXProvider } from '@mdx-js/tag'
import { GoogleFont } from 'react-typography'
import wordpress2016 from 'typography-theme-wordpress-2016'
import Doc from './doc.mdx'

export default props => {
  const { Root, typography, ...components } = typographyMDX(wordpress2016)

  return (
    <MDXProvider components={components}>
      <GoogleFont typography={typography} />
      <Root>
        <Doc />
      </Root>
    </MDXProvider>
  )
}
```

[mdx]: https://mdxjs.com
[typography.js]: https://github.com/KyleAMathews/typography.js
