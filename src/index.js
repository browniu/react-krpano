import React, {Component} from 'react'
import './styles.css'
import {CSSTransition} from 'react-transition-group'

export default class Krpano extends Component {
  render() {
    return (
      <div className='krpano'>
        {this.props.dev && <div className={'devTools'}>
          <button onClick={() => this.getPos()}>pos</button>
          <label style={{
            background: '#00000011',
            padding: '5px',
            marginLeft: '5px'
          }} className={'devTools_label'}>{this.state.pos[0]} {this.state.pos[1]}</label>
        </div>}
        <CSSTransition in={!this.state.loaded} timeout={700} classNames='fade' unmountOnExit>
          <div className='krpano-loading'><span>{this.props.loading}</span></div>
        </CSSTransition>
        <div className={'krpano-panel'}>
          {this.state.groyAble && this.props.groy &&
          <div className={['krpano-panel-groy', this.state.groy ? 'act' : ''].join(' ')} onClick={() => {
            this.setState({groy: !this.state.groy})
            window.krpano.call('switch(plugin[gyro].enabled);')
          }} />}
        </div>
        <div id='krpano' className='krpano-core' />
      </div>
    )
  }

  static defaultProps = {
    xml: 'krpano/tour.xml',
    hooks: {},
    loading: '资源配置中',
    groy: false,
    dev: false,
    mounted: undefined,
    lock: {
      v: false,
      h: false
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      pos: [0, 0],
      groy: true,
      groyAble: false
    }
    this.innerHooks = {
      lockView: (e) => this.lockView(e),
      unlockView: () => this.unlockView(),
      ready: () => this.ready()
    }
  }

  componentDidMount() {
    this.init(this.props.xml)
    this.groy()
  }

  init(xml) {
    let that = this
    let {embedpano} = window
    embedpano({
      xml: xml,
      target: 'krpano',
      html5: 'only',
      passQueryParameters: true,
      onready(krpano) {
        let hooks = Object.assign(that.props.hooks, that.innerHooks)
        console.log(hooks)
        if (!hooks.ready) hooks.ready = () => that.ready()
        krpano.hooks = hooks
        window.krpano = krpano
      }
    })
  }

  getPos() {
    let pos = [window.krpano.get('view.hlookat').toFixed(5), (window.krpano.get('view.vlookat') - 5).toFixed(5)]
    this.setState({
      pos: pos
    })
    console.log('POS:', pos)
  }

  ready() {
    setTimeout(() => {
      this.setState({
        loaded: true
      })
    }, 1500)
    // eslint-disable-next-line react/prop-types
    this.props.mounted()
  }

  lockView(target) {
    if (!target) {
      let vl = window.krpano.get('view.vlookat')
      window.krpano.set('view.vlookatmin', vl)
      window.krpano.set('view.vlookatmax', vl)
      let hl = window.krpano.get('view.hlookat')
      window.krpano.set('view.hlookatmin', hl)
      window.krpano.set('view.hlookatmax', hl)
    }
    if (/v/.test(target)) {
      let vl = window.krpano.get('view.vlookat')
      window.krpano.set('view.vlookatmin', vl)
      window.krpano.set('view.vlookatmax', vl)
    }
    if (/h/.test(target)) {
      let hl = window.krpano.get('view.hlookat')
      window.krpano.set('view.hlookatmin', hl)
      window.krpano.set('view.hlookatmax', hl)
    }
    window.krpano.set('view.limitview', 'lookat')
  }

  unlockView() {
    window.krpano.set('view.limitview', 'auto')
  }

  groy() {
    if (!this.props.groy) window.krpano.call('switch(plugin[gyro].enabled);')
    const handle = () => {
      this.setState({groyAble: true})
      window.removeEventListener('deviceorientation', handle)
    }
    window.addEventListener('deviceorientation', handle)
  }
}
