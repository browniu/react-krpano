# react-krpano

> VR全景渲染组件

[![NPM](https://img.shields.io/npm/v/react-krpano.svg)](https://www.npmjs.com/package/react-krpano) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## [demo](https://browniu.github.io/react-krpano/)

![demo](https://browniu-wx-1257187612.cos.ap-shanghai.myqcloud.com/GitHub/kp.gif)

## 安装 Install

```bash
npm install --save react-krpano
```

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

## 依赖 Dependency

- [krpano 官方文档](https://krpano.com/docu/)

- 渲染引擎 A Krpano player globally referenced by `<script>` :

  ```html
  <script src="krpano/tour.js"></script>
  ```

- [配置文件包](https://github.com/browniu/react-krpano/tree/develop)

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

### 热点相关

#### 添加热点

```xml
<!-- tour.xml -->
<scene>
...
  <!-- 内联属性 -->
  <hotspot name="spot0" ath="177.199" atv="0" url="style/hotspot2.png" scale="0.5"></hotspot>
...
  <!-- 外部属性 -->
  <hotspot name="spot1" style="hotspot_style" ath="177.199" atv="15.974" onclick="loadscene(other_scene,null,MERGE,BLEND(1.0, easeInCubic))" />
...
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

| Name         | Description                   |
| ------------ | ----------------------------- |
| url          | 热点图源                      |
| distorted    | 跟随缩放                      |
| onover       | 鼠标悬浮回调                  |
| onout        | 鼠标离开回调                  |
| style        | 外部属性（在style.xml中定义） |
| ath          | 水平坐标                      |
| atv          | 垂直坐标                      |
| alpha        | 透明度                        |
| visible      | 可见性（不可见时不可用）      |
| height/width | 热点尺寸（需要携带单位）      |

#### 动态热点

```xml
<!-- style/style.xml -->
<krpano>
...
  <style name="hotspot_style_anime" url="hotspot_anime.png" scale="0.5" edge="top" distorted="true" onloaded="do_crop_animation(128, 128, 60);" />
...
<action name="do_crop_animation" scope="local" args="framewidth, frameheight, framerate">
  calc(local.xframes, (caller.imagewidth /framewidth) BOR 0);
  calc(local.frames, xframes * ((caller.imageheight / frameheight) BOR 0));
  def(local.frame, integer, 0);
  calc(caller.crop, '0|0|' + framewidth + '|' + frameheight);
  setinterval(calc('crop_anim_' + caller.name), calc(1.0 / framerate),
  if(caller.loaded,
  inc(frame);
  if(frame GE frames, if(caller.onlastframe !== null, callwith(caller, onlastframe() ) ); set(frame,0); );
  mod(xpos, frame, xframes);
  div(ypos, frame, xframes);
  Math.floor(ypos);
  mul(xpos, framewidth);
  mul(ypos, frameheight);
  calc(caller.crop, xpos + '|' + ypos + '|' + framewidth + '|' + frameheight);
  ,
  clearinterval(calc('crop_anim_' + caller.name));
  );
  );
</action>
</krpano>
```

`do_crop_animation`参数：（帧宽度，帧高度，帧率）

#### 热点标题

```xml
<!-- tour.xml -->
<scene>
...
  <hotspot name="spot" style="hotspot_style" ath="177.199" atv="15.974" title="旋转三角" />
...
</scene>
```

```xml
<!-- style/tour.xml -->
<krpano>
...
<style name="hotspot_style" url="hotspot_anime.png" scale="1" edge="top" distorted="true" onloaded="add_all_the_time_tooltip();" />
...
<action name="add_all_the_time_tooltip">
  txtadd(tooltipname, 'tooltip_', get(name));
  addplugin(get(tooltipname));
  txtadd(plugin[get(tooltipname)].parent, 'hotspot[', get(name), ']');
  set(plugin[get(tooltipname)].url,'%SWFPATH%/plugins/textfield.swf');
  set(plugin[get(tooltipname)].align,center);
  set(plugin[get(tooltipname)].edge,bottom);
  set(plugin[get(tooltipname)].x,0);
  set(plugin[get(tooltipname)].y,0);
  set(plugin[get(tooltipname)].autowidth,true);
  set(plugin[get(tooltipname)].autoheight,true);
  set(plugin[get(tooltipname)].vcenter,true);
  set(plugin[get(tooltipname)].background,false);
  set(plugin[get(tooltipname)].backgroundcolor,0x000000);
  set(plugin[get(tooltipname)].roundedge,5);
  set(plugin[get(tooltipname)].backgroundalpha,0.25);
  set(plugin[get(tooltipname)].padding,5);
  set(plugin[get(tooltipname)].border,false);
  set(plugin[get(tooltipname)].glow,0);
  set(plugin[get(tooltipname)].glowcolor,0xFFFFFF);
  set(plugin[get(tooltipname)].css,'text-align:center; color:#000000; font-family:MicrosoftYahei; font-weight:lighter;  font-size:12px; transform:scale(.7) translateY(15px)');
  if(device.mobile,set(plugin[get(tooltipname)].css,'text-align:center; color:#FFFFFF; font-family:MicrosoftYahei; font-weight:bold; font-size:24px;');
  );
  set(plugin[get(tooltipname)].textshadow,0);
  set(plugin[get(tooltipname)].textshadowrange,6.0);
  set(plugin[get(tooltipname)].textshadowangle,90);
  if(title == '' OR title === null,
  copy(plugin[get(tooltipname)].html,scene[get(linkedscene)].title),
  copy(plugin[get(tooltipname)].html,title)
  );
  set(plugin[get(tooltipname)].enabled,false);
</action>
</krpano>
```

#### 全局热点

在`scene`之外且携带`keep="true"`属性的热点会被作为全局热点始终保留

```jsx
<!-- tour.xml -->
<krpano>
...
  <hotspot keep="true" name="spot0" ath="177.199" atv="0" url="style/hotspot.png" ></hotspot>
...
</krpano>
```



### 调整缩放范围

`view`的`fov`属性控制缩放，同时需要关闭`pixelzoom` 相关属性

```xml
<!-- tour.xml -->
<scene>
  ...
  	<view fovtype="MFOV" fov="100.000"fovmin="110" fovmax="120" limitview="auto"/>
  ...
</scene>
```
### 限制视角

`view`的`fov`属性控制缩放(单位%)

```xml
<scene>
  ...
  	 <view  vlookat="0" vlookatmax="0" vlookatmin="0"  limitview="lookat"  />
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

### 锁定视角

| Name | Description          |
| ---- | -------------------- |
| h    | 锁定垂直视角         |
| v    | 锁定水平视角         |
| null | 无参数时默认全部锁定 |

```javascript
window.krpano.hooks.lockView('h')
```

### [移镜入场](https://github.com/browniu/react-krpano/blob/master/example/public/krpano/style/style.xml)

```xml
<!-- style/style.xml -->
<krpano>
...
<camera_move_config enable="true" fov="100" angle="60" call="lockView()" />
...
</krpano>
```

| Name  | Description                           |
| ----- | ------------------------------------- |
| fov   | 初始景深                              |
| angle | 视角偏移                              |
| call  | 回调函数（须在hooks中注册过才能调用） |

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



## Q&A 常见问题

#### 缩放视角失真

需要设置禁用用户缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1,user-scalable=no">
```

#### 热点控制

##### 显示隐藏

```javascript
window.krpano.set('hotspot[spot3].visible','true') //display
window.krpano.set('hotspot[spot3].alpha','0') //opacity
```

##### 更新样式

设置两个样式不同但位置重合的热点，同时切换显示/隐藏状态，达到切换样式的目的：

```xml
<hotspot name="spot3" style="hotspot_style_anime_2" ath="16.92924" atv="7.66196" onclick="jscall(krpano.hooks.pop(2))" />
<hotspot name="spot3x" visible="false" style="hotspot_style_anime_3" ath="16.92924" atv="7.66196" onclick="jscall(krpano.hooks.pop(2))" />
```

```javascript
window.krpano.set('hotspot[spot3].visible','true')
window.krpano.set('hotspot[spot3].visible','false')
```

##### 更新图源

```xml
<hotspot name="spot0" ath="177.199" atv="0" url="style/hotspot2.png" scale="0.5"></hotspot>
```

更新的图源必须是绝对路径：

```javascript
window.krpano.set('hotspot[spot0].url','http://localhost:3000/krpano/style/hotspot.png')
```

### 场景失控

查看是否 `name`属性与其他同一级元素重合，同一级别下`name`具有唯一性

## Update 更新日志

### 0.0.7

* 新增移镜入场效果
* 内置多维锁定/解锁视角方法

### 0.0.6

* 优化内部逻辑，提高稳定性
* 文档补充
* **注意** 调整了参数`loading`的属性

## License

MIT © [browniu](https://github.com/browniu)
