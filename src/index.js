import React, {Component} from 'react'
import styles from './styles.css'
import vtour from './vtour/tour'
export default class ExampleComponent extends Component {

  render() {
    return (
      <div className={styles.krpano}>
        <div id="krpano" className={styles.core}/>
      </div>
    )
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.init(this.props.xml)
  }

  init(xml) {
    embedpano({xml: xml, target: "krpano", html5: "only"});
  }

}
