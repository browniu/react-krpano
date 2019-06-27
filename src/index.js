import React, {Component} from 'react'
import './styles.css'
import {CSSTransition} from 'react-transition-group'

export default class Krpano extends Component {
  render() {
    return (
      <div className='krpano'>
        {this.props.dev && <div className={'devTools'}>
          <button onClick={() => this.getPos()}>当前坐标</button>
          <label className={'devTools_label'}>{this.state.pos[0]} {this.state.pos[1]}</label>
        </div>}
        <CSSTransition in={!this.state.loaded} timeout={700} classNames='fade' unmountOnExit>
          <div className='krpano-loading'><span>{this.config.loading.info}</span></div>
        </CSSTransition>
        <div className={'krpano-panel'}>
          {this.state.groyAble && this.config.groy &&
          <div className={['krpano-panel-groy', this.state.groy ? 'act' : ''].join(' ')} onClick={() => {
            this.setState({groy: !this.state.groy})
            window.krpano.call('switch(plugin[gyro].enabled);')
          }} />}
        </div>
        <div id='krpano' className='krpano-core' />
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.config = {
      hooks: this.props.hooks ? this.props.hooks : {
        ready: () => {
          this.ready()
        }
      },
      loading: {
        info: this.props.loading ? this.props.loading.info : '资源配置中'
      },
      groy: this.props.groy
    }
    this.state = {
      loaded: false,
      pos: [0, 0],
      groy: true,
      groyAble: false
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
        let hooks = that.config.hooks
        if (!hooks.ready) hooks.ready = () => that.ready()
        window.krpano = krpano
        krpano.hooks = that.config.hooks
      }
    })
  }

  getPos() {
    this.setState({
      pos: [window.krpano.get('view.hlookat').toFixed(5), (window.krpano.get('view.vlookat') - 5).toFixed(5)]
    })
  }

  ready() {
    this.props.mounted()
    setTimeout(() => {
      this.setState({
        loaded: true
      })
    }, 1500)
  }

  groy() {
    if (!this.config.groy) window.krpano.call('switch(plugin[gyro].enabled);')
    const handle = () => {
      this.setState({groyAble: true})
      window.removeEventListener('deviceorientation', handle)
    }
    window.addEventListener('deviceorientation', handle)
  }
}