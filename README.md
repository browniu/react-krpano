# react-krpano

> krpano in react

[![NPM](https://img.shields.io/npm/v/react-krpano.svg)](https://www.npmjs.com/package/react-krpano) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 安装 Install
```bash
npm install --save react-krpano
```
## 依赖 Dependency
* 需要引入渲染引擎 A Krpano player globally referenced by `<script>` :

```html
<script src="vtour/tour.js"></script>
```

* 需要配置文件 A krpano config file `tour.xml`

  复制`example/krpano` 配置目录，替换/编辑其中`tour.xml`

## 使用 Usage
```jsx
import React, { Component } from 'react'

import Krpano from 'react-krpano'

class Example extends Component {
  render () {
    return (
        <Krpano xml='krpano/tour.xml' hooks={this.hooks} mounted={this.mounted} />
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
|Name|Description|Defalt|Example|
|:--|:--|---|:--|
|`xml`|配置文件 Krpano configuration XML path|krpano/tour.xml|`tour.xml`|
|`hooks`| 提供给`Krpano` 调用的方法 An object that will be attached to the `krpano` instance |null|`{foo:()=>this.foo()}`|
|`mounted`| 资源加载完毕的回调函数 |null|{this.mounted}|




## License

MIT © [browniu](https://github.com/browniu)
