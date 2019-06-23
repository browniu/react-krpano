import React, {Component} from 'react'
import './styles.css'
import {CSSTransition} from 'react-transition-group'

export default class ExampleComponent extends Component {

  render() {
    return (
      <div className='krpano'>
        <CSSTransition
          in={!this.state.loaded}
          timeout={700}
          classNames='fade'
          unmountOnExit
        >
          <div className='krpano-loading'/>
        </CSSTransition>
        <div id="krpano" className='krpano-core'/>
      </div>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.init(this.props.xml)
  }

  init(xml) {
    let that = this;
    embedpano({
      xml: xml, target: "krpano", html5: "only", onready(krpano_interface) {
        that.ready();
        window.krpano = krpano_interface;
        krpano_interface.hooks = that.props.hooks;
      }
    });
  }

  ready() {
    this.props.mounted();
    setTimeout(()=>{
      this.setState({
        loaded: true
      })
    },1500)

  }

}
