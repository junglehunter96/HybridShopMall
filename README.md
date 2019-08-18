## Vue全家桶开发移动端电商webapp

[在线体验地址](http://junglehunter96.gitee.io)
移动端体验更佳 PC端请打开手机模式

打开方式:
```
git clone https://github.com/junglehunter96/HybridShopMall.git
npm install
npm run serve
```
然后就可以在本机预览和访问了

### 预览图
<figure>
<img width="33.33%" src="https://raw.githubusercontent.com/junglehunter96/imgStorage/note/img/20190818104540.png"/><img width="33.33%" src="https://raw.githubusercontent.com/junglehunter96/imgStorage/note/img/20190818104538.png"/><img width="33.33%" src="https://raw.githubusercontent.com/junglehunter96/imgStorage/note/img/20190818104539.png"/>
</figure>

<figure>
<img  width="33.33%" src="https://raw.githubusercontent.com/junglehunter96/imgStorage/note/img/20190818104537.png"/><img  width="33.33%" src="https://raw.githubusercontent.com/junglehunter96/imgStorage/note/img/20190818104536.png"/><img  width="33.33%" src="https://raw.githubusercontent.com/junglehunter96/imgStorage/note/img/20190818104535.png"/>
</figure>

<figure>
<img  width="33.33%" src="https://raw.githubusercontent.com/junglehunter96/imgStorage/note/img/20190818104534.png"/><img  width="33.33%" src="https://raw.githubusercontent.com/junglehunter96/imgStorage/note/img/20190818104533.png"/><img  width="33.33%" src="https://raw.githubusercontent.com/junglehunter96/imgStorage/note/img/20190818104532.png"/>
</figure>

<img  width="33.33%" src="https://raw.githubusercontent.com/junglehunter96/imgStorage/note/img/20190818104531.png"/>

项目介绍:
本项目参考了苏宁易购和京东商城的webapp界面进行开发,绝大多数UI由自己构建

### 要点总结

目录结构:
```
│  App.vue     //根目录
│  main.js    //项目入口
│  router.js  //路由配置
│  
├─assets      //静态资源
│  ├─img  
│  │          
│  └─styles
│          index.css
│          reset.css
│          resources.scss
│          transitons.css
│          
├─components    //组件目录 按照页面和功能划分
│  │  Home.vue
│  │  My.vue
│  │  Shopping.vue
│  │  
│  ├─common     //全局组件
│  │      MySwiper.vue
│  │      ToolBar.vue
│  │      
│  ├─currency   //通用组件
│  │      Activity.vue
│  │      CountDown.vue
│  │      ModeOptions.vue
│  │      NavigationBar.vue
│  │      Search.vue
│  │      Seconds.vue
│  │      
│  ├─goods    //购物车组件
│  │      Direct.vue
│  │      Goods.vue
│  │      GoodsNumberManager.vue
│  │      GoodsOptions.vue
│  │      NoHave.vue
│  │      
│  └─parallax //视差组件
│          Parallax.vue
│          
├─store   //模块化vuex
│  │  store.js
│  │  
│  └─goods
│          goods.js
│          
├─utils //工具类
│      axios.config.js
│      filters.js
│      IsIphoneX.js
│      md5.min.js
│      rem.js
│      
└─views   //视图组件
        Buy.vue
        GoodsDetails.vue
        GoodsList.vue
        Login.vue
        Main.vue
        Register.vue
```

基础组件:

 - 视差组件

``` vue
<template>
    <div class="parallax" @scroll="onScrollChange"> 
        <!-- 缓慢移动内容 -->
        <div class="parallax-slow" ref="slow" 
        :style="{top: slowTop}" >
            <slot name="parallax-slow"></slot>
        </div>
        <!-- 正常移动内容 -->
        <div class="parallax-content z-index-2" >
            <slot></slot>
        </div>
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            // 速度差
            SPEED_DIFF: 2,
            // 页面滚动距离
            parallaxScroll: 0,
        }
    },
    methods: {
        onScrollChange: function ($e) {
            this.parallaxScroll = $e.target.scrollTop;
            this.$emit('onScrollChange', this.parallaxScroll);
        }
    },
    computed: {
        /**
         * 返回 slow 距离顶部的距离
         */
        slowTop: function () {
            // 当前页面的滑动距离 / 速度差 = 该内容区实际应该滑动的距离
            // 当前页面的滑动距离 - 该内容区实际应该滑动的距离 = slow 距离顶部的距离
            return (this.parallaxScroll - (this.parallaxScroll / this.SPEED_DIFF)) + 'px';
        }
    }
}
</script>


<style lang="scss" scoped>
    .parallax {
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
        .parallax-slow {
            width: 100%;
            position: relative;
        }
        .parallax-content {
            height: 100%;
            position: relative;
        }
    }
</style>

```
- 虚拟任务栈和页面切换效果

```
<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="keepAliveNames">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'fold-left',
      keepAliveNames: [
        'shopmall'
      ]
    }
  },
  created: function () {
    window.nativeFunctionUserLogin = this.nativeFunctionUserLogin;
  },

  // vue监听路由对象$route的方法
  watch: {
    // watch $route 决定使用哪种过渡
    '$route' (to, from) {
      const routerType = to.params.routerType;
      
      if (routerType === 'push') {
        this.keepAliveNames.push(to.name);
        this.transitionName = 'fold-left';
      } else {
        this.keepAliveNames.pop();
        this.transitionName = 'fold-right';
      }
    }
  },
  methods: {
    /**
     * 提供给 Native 调用的方法。
     * 保存当前自动登录的用户名到 vuex。
     */
    // nativeFunctionUserLogin: function (username) {
    //    this.$store.commit('setUsername', username);
    // }
  }
};
</script>
<style lang="scss" scoped>
#app {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $bgColor;

  // push页面时：新页面的进入动画
  .fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: .4s;
  }
  // push页面时：老页面的退出动画
  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: .4s;
  }
  // push页面时：新页面的进入动画
  @keyframes fold-left-in {
    0% {
      transform: translate(100%, 0);
      /* visibility: visible; */
    }
    100% {
      transform: translate(0, 0);
    }
  }
  // push页面时：老页面的退出动画
  @keyframes fold-left-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
      /* visibility: hidden; */
    }
  }

  // 后退页面时：即将展示的页面动画
  .fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: .4s;
  }
  // 后退页面时：后退的页面执行的动画
  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: .4s;
  }
  // 后退页面时：即将展示的页面动画
  @keyframes fold-right-in{
    0% {
      width: 100%;
      transform: translate(-100%, 0);
      /* visibility: visible; */
    }
    100% {
      width: 100%;
      transform: translate(0, 0);
    }
  }
  // 后退页面时：后退的页面执行的动画
  @keyframes fold-right-out  {
    0% {
      width: 100%;
      transform: translate(0, 0);
    }
    100% {
      width: 100%;
      transform: translate(100%, 0);
      /* visibility: hidden; */
    }
  }
}
</style>

```
- 全局引入sass变量 避免css样式重复臃肿

```
chainWebpack: config => {
    //添加全局sass变量
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './src/assets/styles/resources.scss'
        })
        .end()
    })
  }
```

