# react-krpano

> krpano in react

[![NPM](https://img.shields.io/npm/v/react-krpano.svg)](https://www.npmjs.com/package/react-krpano) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 安装 Install
```bash
npm install --save react-krpano
```
## 依赖 Dependency
* 渲染引擎 A Krpano player globally referenced by `<script>` :

```html
<script src="vtour/tour.js"></script>
```

* 配置文件 A krpano config file `tour.xml`

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
### Xml => React

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

### React => Xml

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
|`xml`|配置文件的路径|krpano/tour.xml|`tour.xml`|
|`hooks`| 提供给`Krpano` 调用的方法 |null|`{foo:()=>this.foo()}`|
|`mounted`| 资源加载完毕的回调函数 |null|{this.mounted}|
|Loading| 加载页配置 |Null|loading={{info: 'xixixi'}}|
|dev| 开发者模式 |false|true|

## Config (tour.xml)

### 新建场景

```xml
<krpano>
  <!-- 场景模块 -->
  <scene name="scene_name" title="scene_title" havevrimage="true" thumburl="scene_path/scene_thunb.jpg">
    <!-- 视窗配置 -->
		<view hlookat="177.349" vlookat="27.330" fovtype="MFOV" fov="120.000" maxpixelzoom="0" fovmin="100" fovmax="130" limitview="auto" />
    <!-- 预览配置 -->
    <preview url="scene_path/scene_preview.jpg" />
    <!-- 全景配置 -->
    <image type="CUBE" multires="true" tilesize="512" if="!webvr.isenabled">
			<level tiledimagewidth="1280" tiledimageheight="1280">
				<cube url="scene_path/%s/l2/%v/l2_%s_%v_%h.jpg" />
			</level>
			<level tiledimagewidth="640" tiledimageheight="640">
				<cube url="scene_path/%s/l1/%v/l1_%s_%v_%h.jpg" />
			</level>
		</image>
  </scene>
</krpano>
```

### 添加热点

```xml
<!-- tour.xml -->
<scene>
...
  <hotspot name="spot1" style="hotspot_style" ath="177.199" atv="15.974" onclick="loadscene(other_scene,null,MERGE,BLEND(1.0, easeInCubic))" />
</scene>
```

```xml
<!-- style/style.xml -->
<krpano>
...
<style name="hotspot_style" url="hotspot.png" scale="0.5" edge="top" distorted="true" onover="tween(scale,0.55);" onout="tween(scale,0.5);" />
...
</krpano>
```

### 动态热点

```xml
<!-- style/style.xml -->
<krpano>
...
  <style name="hotspot_style_anime" url="hotspot_anime.png" scale="0.5" edge="top" distorted="true" onover="tween(scale,0.55);" onout="tween(scale,0.5);" onloaded="do_crop_animation(128, 128, 60);add_all_the_time_tooltip();" />
...
</krpano>
```

### 调整缩放范围

`view`的`fov`属性控制缩放(单位%)

```xml
<scene>
  ...
  	<view fovtype="MFOV" fov="120.000"fovmin="100" fovmax="130"/>
  ...
</scene>
```

### 自动旋转

配置是否允许自动旋转视角

```xml
<!-- style/style.xml -->
<krpano>
...
<autorotate name="rotate" enabled="false" waittime="10.0" speed="1.0" horizon="0.0" tofov="360.0" />
...
</krpano>
```

### 星球入场

配置是否开启星球视角入场

```xml
<!-- style/style.xml -->
<krpano>
...
<planet_config enable="true" angle="120" during="1" />
...
</krpano>
```



## Q&A

* 缩放视角失真

  需要设置禁用用户缩放

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1,user-scalable=no">
  ```

  


## License

MIT © [browniu](https://github.com/browniu)
