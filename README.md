# react-krpano [demo](https://browniu.com/react-krpano/)

> krpano in react

[![NPM](https://img.shields.io/npm/v/react-krpano.svg)](https://www.npmjs.com/package/react-krpano) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 安装 Install

```bash
npm install --save react-krpano
```

## 依赖 Dependency
* 渲染引擎 A Krpano player globally referenced by `<script>` :

  ```html
  <script src="krpano/tour.js"></script>
  ```

* [配置文件包](https://github.com/browniu/react-krpano/tree/develop)


## 使用 Usage
```jsx
import React, { Component } from 'react'

import Krpano from 'react-krpano'

class Example extends Component {
  render () {
    return (
      <Krpano/>
    )
  }
}
```

## 开发流程 workflow 
1. 使用Krpano官方提供的[切片工具](https://krpano.com/)生成全景图分片(或者使用[精简包](https://github.com/browniu/react-krpano/tree/develop))
2. 下载[定制开发包](https://github.com/browniu/react-krpano/tree/develop)，将全景图分片包放入`krpano/pano/`
3. 安装并引入组件,`props`方式传入配置文件的路径
4. 对配置文件`krpano/tour.xml`进行二次开发

## 切图方式

### `MAKE VTOUR (VR-OPT) Droplet`（推荐）

普通加载，调用方式：
```xml
<!-- tour/xml -->
<scene name="scene_scene" title="scene" havevrimage="true" thumburl="panos/scene.tiles/thumb.jpg">
  <!-- ... -->
  <image>
    <cube url="panos/scene.tiles/pano_%s.jpg" />
  </image>
  <!-- ... -->
</scene>
```

### `MAKE VTOUR (NORMAL) Droplet`

多级加载，适用于对图片缩放效果要求较高的场景，调用方式：

```xml
<!-- tour/xml -->
<scene name="scene_scene" title="scene" havevrimage="true" thumburl="panos/scene.tiles/thumb.jpg">
  <!-- ... -->
  <image type="CUBE" multires="true" tilesize="512" if="!webvr.isenabled">
    <level tiledimagewidth="1280" tiledimageheight="1280">
      <cube url="panos/scene.tiles/%s/l2/%v/l2_%s_%v_%h.jpg" />
    </level>
    <level tiledimagewidth="640" tiledimageheight="640">
      <cube url="panos/scene.tiles/%s/l1/%v/l1_%s_%v_%h.jpg" />
    </level>
  </image>
  <!-- ... -->
</scene>
```

## 通信 Communication
### Xml => React (e.g.)

需要`props`传入所有回调函数

```jsx
constructor(props) {
  //...
  this.hooks = {
    noParam:()=>this.noParam()
    param: (e) => this.param(e)
  }
	//...
  render () {
    return (
      <Krpano xml='krpano/tour.xml' hooks={this.hooks} />
    )
  }
  //...
```
#### 无内部参数 No-Params 
```xml
<hotspot name="spot1" style="hotspot_style" ath="177.199" atv="15.974" onclick="jscall(krpano.hooks.test())" />
```

#### 携带内部参数 Params 
```xml
<hotspot name="spot1" style="hotspot_style" ath="177.199" atv="15.974" onclick="noParam()" />
<action name="param">
  jscall(calc('krpano.hooks.param("' + scene[get(xml.scene)].name + '")'));
</action>
```



### React => Xml (e.g.)

需要使用全局变量`window.krpano`

##### `Get` 方法
```javascript
window.krpano.get("view.vlookat"),window.krpano.get("view.hlookat")
```
##### `Call` 方法
```javascript
window.krpano.call("loadscene(scene_test2,null,MERGE,BLEND(1.0, easeInCubic))")
```
##### `Set` 方法
```javascript
window.krpano.set('view.vlookat', 0)
```

## Props 接口参数

|Name|Description|Defalt|Example|
|:--|:--|---|:--|
|`xml`|配置文件的路径|krpano/tour.xml|`tour.xml`|
|`hooks`| 提供给`Krpano` 调用的方法 |null|`{foo:()=>this.foo()}`|
|`mounted`| 资源加载完毕的回调函数 |null|{this.mounted}|
|Loading| 加载页文本配置 |Null|loading={'loading'}|
|dev| 开发者模式 |false|true|
|gray| 重力感应 |true|true|

## Config 配置文件

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
### 限制视角

`view`的`fov`属性控制缩放(单位%)

```xml
<scene>
  ...
  	 <view  vlookat="0" vlookatmax="0" vlookatmin="0"  limitview="lookat" />
  ...
</scene>
```
> 限制视角不要与行星入场混用

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

### 光晕

```xml
<!-- tour.xml -->
<krpano>
...
<krpano flare_dir="style/lensflare"/>
<include url="style/lensflare/core.xml" />
...
</krpano>
```

```xml
<!-- style/lensflare/lenflaresettings.xml -->
<krpano>
	<lensflares name="obj">
		<item name="name" ath="0" atv="0" scene="scene_name" typ="blinkstyle1" dust_effect="true"/>
	</lensflares>
</krpano>
```

### 控制方式

`drag | moveto`

```xml
<!-- style/style.xml -->
<krpano>
...
  <action name="control_startup" autorun="onstart">
    set(control.mouse, drag);
    set(control.touch, moveto);
  </action>
...
</krpano>
```

## Q&A

* 缩放视角失真

  需要设置禁用用户缩放

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1,user-scalable=no">
  ```

## Update

### 0.0.6

* 优化内部逻辑，提高稳定性
* 文档补充
* **注意** 调整了参数`loading`的属性

## License

MIT © [browniu](https://github.com/browniu)
