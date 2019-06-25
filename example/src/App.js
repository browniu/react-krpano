import React, {Component} from 'react'

import Krpano from 'react-krpano'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popState: false
    }
    this.hooks = {
      pop: (e) => this.pop(e)
    }
  }

  render() {
    return (
      <div>
        <div className={'panel'}>
          {this.state.popState &&
          <div className={['popup', this.state.popState === 2 ? 'popup_second' : ''].join(' ')} onClick={() => {
            if (this.state.popState === 2) this.setState({popState: false})
          }}>
            {this.state.popState === 1 && <div className={'popup_main'}>
              <div className={'popup_button'} onClick={() => {
                window.location = 'https://jx3.xoyo.com/'
              }}/>
              <div className={'popup_close'} onClick={() => {
                this.setState({popState: false})
              }}/>
            </div>}
          </div>}
        </div>
        <Krpano xml='krpano/tour.xml' hooks={this.hooks} mounted={this.mounted} loading={{info: '资源配置中'}} groy={true} dev={false}/>
      </div>
    )
  }

  componentDidMount() {
    this.preload()
  }

  pop(e) {
    console.log('test function from user', e)
    this.setState({
      popState: e
    })
  }

  preload() {
    let list = [
      'http://jx3.xoyo.com/zt/2019/06/17/pop/big.png',
      'https://jx3.xoyo.com/zt/2019/06/17/operate/assets/images/book.dfe45355.png'
    ]
    list.map(e => {
      let dom = document.createElement('img')
      dom.src = e
    })
  }

  next() {
    window.krpano.call('loadscene(scene_test2,null,MERGE,BLEND(1.0, easeInCubic))')
  }

  mounted() {
    console.log('krpano is ready')
  }
}
