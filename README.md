# react-krpano

> krpano in react

[![NPM](https://img.shields.io/npm/v/react-krpano.svg)](https://www.npmjs.com/package/react-krpano) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-krpano
```

## Usage

```jsx
import React, { Component } from 'react'

import Krpano from 'react-krpano'

class Example extends Component {
  render () {
    return (
        <Krpano xml='vtour/tour.xml' hooks={this.hooks} mounted={this.mounted}/>
    )
  }
}
```

## License

MIT © [browniu](https://github.com/browniu)
