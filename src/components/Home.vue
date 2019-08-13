<template>
  <div
    class="home"
    @scroll="onScrollChange"
    ref="home"
  >
    <!-- 头部导航栏 -->
    <navigation-bar
      :isDefault="false"
      :navBarStyle="navBarStyle"
    >
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlot.leftIcon">
      </template>
      <template v-slot:nav-center>
        <search
          :bgColor="navBarCurrentSlot.search.bgColor"
          :hintColor="navBarCurrentSlot.search.hintColor"
          :icon="navBarCurrentSlot.search.icon"
        ></search>
      </template>
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlot.rightIcon">
      </template>
    </navigation-bar>
    <div class="home-content-wrapper">
      <!-- swiper -->
      <div
        ref="swiperWrapper"
        class="swiper-content"
      >
        <my-swiper
          :swiperImgs="swiperImgs"
          :height="swiperHeight"
        ></my-swiper>
      </div>
      <!-- 导航图标 -->
      <mode-options></mode-options>
      <!-- 限时秒杀 -->
      <seconds :dataSource="secondsDatas"></seconds>
      <!-- 活动 -->
      <activity>
        <div class="activity-818-title">
          <img
            v-if="activityDatas[0]"
            :src="activityDatas[0].icon"
            alt=""
          >
        </div>
        <div class="activity-818-item">
          <img
            v-for="(item, index) in activityDatas2"
            :key="index"
            :src="item.icon"
            alt=""
          >
        </div>
      </activity>
      <!-- 商品列表 -->
      <goods
        :layoutType="'3'"
        :isScroll="false"
      ></goods>
    </div>
  </div>
</template>

<script>
import mySwiper from '@c/common/MySwiper'
import activity from '@c/currency/Activity'
import navigationBar from '@c/currency/NavigationBar'
import modeOptions from '@c/currency/ModeOptions'
import seconds from '@c/currency/Seconds'
import goods from '@c/goods/Goods.vue'
import search from '@c/currency/Search.vue'

export default {
  data () {
    return {
      navBarSlotData: {
        normal: {
          leftIcon: require('@img/more-white.svg'),
          search: {
            bgColor: '#ffffff',
            hintColor: '#999999',
            icon: require('@img/search.svg')
          },
          rightIcon: require('@img/message-white.svg')
        },
        highlight: {
          leftIcon: require('@img/more.svg'),
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#ffffff',
            icon: require('@img/search-white.svg')
          },
          rightIcon: require('@img/message.svg')
        }
      },
      swiperHeight: '184px',
      swiperDatas: [],
      activityDatas: [],
      secondsDatas: [],
      activityDatas2: [{
        id: '1',
        icon: require('@img/activity/activity-01.webp')
      },
      {
        id: '2',
        icon: require('@img/activity/activity-02.webp')
      },
      {
        id: '3',
        icon: require('@img/activity/activity-03.webp')
      },
      {
        id: '4',
        icon: require('@img/activity/activity-04.webp')
      }],
      navBarCurrentSlot: {},
      /**
       * 此处仅涉及图片展示，父子组件交互会在购物车的时候讲解
       */
      // 顶部样式
      navBarStyle: {
        backgroundColor: '',
        position: 'fixed',
      },
      // 滚动值
      scrollTopValue: -1,
      ANCHOR_SCROLL_TOP: 160
    }
  },
  components: {
    mySwiper, activity, modeOptions, seconds, goods, navigationBar, search
  },
  computed: {
    swiperImgs () {
      return this.swiperDatas.map(item => item.icon)
    }
  },
  methods: {
    initData () {
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys'),
        this.$http.get('/seconds'),
      ]).then(this.$http.spread((swiperDatas, activityDatas, secondsDatas) => {
        this.swiperDatas = swiperDatas.list;
        this.activityDatas = activityDatas.list;
        this.secondsDatas = secondsDatas.list;
      }))
    },
    initSwiper () {
      this.$refs.swiperWrapper.style.height = this.swiperHeight;
    },
    onScrollChange (event) {
      this.scrollTopValue = event.target.scrollTop;
      let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
      opacity = opacity > 1 ? 1 : opacity;
      if (opacity === 1) {
        this.navBarCurrentSlot = this.navBarSlotData.highlight;
      } else {
        this.navBarCurrentSlot = this.navBarSlotData.normal;
      }
      this.navBarStyle.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')';
    }
  },
  created () {
    this.navBarCurrentSlot = this.navBarSlotData.normal;
    this.initData();
  },
  mounted() {
    this.initSwiper();
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  &-content-wrapper {
    height: 100%;
    .swiper-content {
      background-color: $bgColor;
    }
    // 520 活动
    .activity-818-title {
      background-color: #f5f5f5;
      margin-top: px2rem(5);
      box-sizing: border-box;
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);
      font-size: 0;
      img {
        display: inline-block;
        width: 100%;
      }
    }
    .activity-818-item {
      background-color: #f5f5f5;
      font-size: 0;
      img {
        display: inline-block;
        width: 50%;
      }
    }
    // 拼购节
    .activity-ping-gou-jie {
      background-color: white;
      margin-top: $marginSize;
      img {
        width: 100%;
      }
    }
  }
}
</style>