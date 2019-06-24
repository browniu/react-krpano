# react-krpano

/> krpano in react/

[![NPM](https://img.shields.io/npm/v/react-krpano.svg)](https://www.npmjs.com/package/react-krpano) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 安装 Install
```bash
npm install --save react-krpano
```
or
```bash
yarn add react-krpano
```

## 依赖 Dependency
* A Krpano player globally referenced by `<script>`

```html
<script src="vtour/tour.js"></script>
```

* A krpano config file `tour.xml`

## 使用 Usage
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

## 通信 Communication
### Xml => React Example

#### 无参数 No-Params 
```xml
<hotspot name="spot1" style="hotspot_style" ath="177.199" atv="15.974" onclick="jscall(krpano.hooks.test())" />
```

#### 携带参数 Params 
```xml
<hotspot name="spot1" style="hotspot_style" ath="177.199" atv="15.974" onclick="noParam()" />

<action name="param">
  jscall(calc('krpano.hooks.param("' + scene[get(xml.scene)].name + '")'));
</action>
```

```jsx
this.hooks = {
	noParam:()=>this.noParam()
  param: (e) => this.param(e)
}
```

### React => Xml Example

##### `Get` 获取当前视角
```javascript
console.log(window.krpano.get("view.vlookat"),window.krpano.get("view.hlookat"));
```
##### `Call` 切换视图
```javascript
window.krpano.call("loadscene(scene_test2,null,MERGE,BLEND(1.0, easeInCubic))");
```

## Props
|Name|Description|Example|
|:--|:--|:--|
|`xml`|配置文件 Krpano configuration XML path|`krpano.xml`|
|`hooks`| 提供给`Krpano` 调用的方法 An object that will be attached to the `krpano` instance |`{foo:()=>this.foo()}`|
|`mounted`| 资源加载完毕的回调函数 ||




## License

MIT © [browniu](https://github.com/browniu)
