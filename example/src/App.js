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
      eyeMode: () => { this.setState({eyes: !this.state.eyes}) }
    }
  }

  render() {
    return (
      <div>
        <div className={'panel'}>
          <div className="test">
            <button onClick={() => {
              window.krpano.set('hotspot[spot3].visible', 'false')
              window.krpano.set('hotspot[spot3x].visible', 'true')
            }}>动态更新热点
            </button>
            <button onClick={() => this.lockView()}>锁定视角
            </button>
            <button onClick={() => this.unlockView()}>解锁视角
            </button>
          </div>

          {this.state.eyes &&
          <div className={['eyes', this.state.eyeMode ? 'act' : ''].join(' ')} onClick={() => this.eyeModeSwitch()} />}
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
        <Krpano hooks={this.hooks} dev={true} />
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

  lockView() {
    window.krpano.hooks.lockView('h')
    // let vl = window.krpano.get('view.vlookat')
    // let hl = window.krpano.get('view.hlookat')
    // window.krpano.set('view.vlookatmin', vl)
    // window.krpano.set('view.vlookatmax', vl)
    // window.krpano.set('view.hlookatmin', hl)
    // window.krpano.set('view.hlookatmax', hl)
    // window.krpano.set('view.limitview', 'lookat')
  }

  unlockView() {
    window.krpano.set('view.limitview', 'auto')
  }

  mounted = () => {
    console.log('krpano is ready')
  };
}
