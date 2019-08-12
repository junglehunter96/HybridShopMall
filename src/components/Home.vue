<template>
  <div class="home">
    <div class="home-content-wrapper">
      <!-- swiper -->
      <div ref="swiperWrapper" class="swiper-content">
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
        <div class="activity-520">
          <img
            v-for="(item, index) in activityDatas"
            :key="index"
            :src="item.icon"
            alt=""
          >
        </div>
      </activity>
    </div>
  </div>
</template>

<script>
import mySwiper from '@c/common/MySwiper'
import activity from '@c/currency/Activity'
import modeOptions from '@c/currency/ModeOptions'
import seconds from '@c/currency/Seconds'
export default {
  data () {
    return {
      swiperHeight: '184px',
      swiperDatas: [],
      activityDatas: [],
      secondsDatas: []
    }
  },
  components: {
    mySwiper, activity, modeOptions, seconds
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
      this.$refs.swiperWrapper.style.height=this.swiperHeight
    }
  },
  mounted () {
    this.initData();
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
    .activity-520 {
      background-color: #f5f5f5;
      margin-top: px2rem(10);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);

      img {
        display: inline-block;
        width: 100%;
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