import React, {Component} from 'react'

import Krpano from 'react-krpano'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.hooks = {
      test: () => this.test()
    }
  }

  render() {
    return (
      <div>
        <div className="panel">
          <button onClick={() => this.next()}>下一个场景
          </button>
        </div>
        <Krpano xml='krpano/tour.xml' hooks={this.hooks} mounted={this.mounted} />
      </div>
    )
  }

  test() {
    console.log('test function from user')
  }

  next() {
    window.krpano.call("loadscene(scene_test2,null,MERGE,BLEND(1.0, easeInCubic))");
  }

  mounted() {
    console.log('krpano is ready')
  }
}
