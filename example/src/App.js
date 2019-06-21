import React, {Component} from 'react'

import Krpano from 'react-krpano'

export default class App extends Component {
  render() {
    return (
      <div>
        <Krpano xml='vtour/tour.xml'/>
      </div>
    )
  }
}
