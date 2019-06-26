import React, {Component} from 'react'
import Krpano from 'react-krpano'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popState: false,
      eyes: false,
      eyeMode: false
    }
    this.hooks = {
      pop: (e) => this.pop(e),
      eyeMode: () => { this.setState({eyes: true}) }
    }
  }

  render() {
    return (
      <div>
        <div className={'panel'}>
          {this.state.eyes && <button className={'eyes'} onClick={() => this.eyeModeSwitch()}>心眼模式</button>}
          {this.state.popState &&
          <div className={['popup', this.state.popState === 2 ? 'popup_second' : ''].join(' ')} onClick={() => {
            if (this.state.popState === 2) this.setState({popState: false})
          }}>
            {this.state.popState === 1 && <div className={'popup_main'}>
              <div className={'popup_button'} onClick={() => {
                window.location = 'https://jx3.xoyo.com/'
              }} />
              <div className={'popup_close'} onClick={() => {
                this.setState({popState: false})
              }} />
            </div>}
          </div>}
        </div>
        <Krpano xml='krpano/tour.xml' hooks={this.hooks} mounted={this.mounted} loading={{info: '资源配置中'}} groy={true} dev={false} />
      </div>
    )
  }

  pop(e) {
    this.setState({
      popState: e
    })
  }

  eyeModeSwitch() {
    let vl = window.krpano.get('view.vlookat')
    let hl = window.krpano.get('view.hlookat')
    if (this.state.eyeMode) window.krpano.call('loadscene(scene_inside,null,MERGE,BLEND(1.0, easeInCubic));')
    else window.krpano.call('loadscene(scene_inside_eye,null,MERGE,BLEND(1.0, easeInCubic));')
    setTimeout(() => {
      window.krpano.set('view.hlookat', hl)
      window.krpano.set('view.vlookat', vl)
    }, 50)
    this.setState({eyeMode: !this.state.eyeMode})
  }

  next = () => {
    window.krpano.call('loadscene(scene_test2,null,MERGE,BLEND(1.0, easeInCubic))')
  };

  mounted = () => {
    console.log('krpano is ready')
  };
}
