<template>
  <swiper :options="swiperOption">
    <swiper-slide
      v-for="(page, index) of dataSource"
      :key="index"
    >
      <div class="mode-options">
        <div
          class="mode-options-item"
          v-for="(item, index) in page"
          :key="index"
          @click="onItemClick"
        >
          <img
            class="mode-options-item-icon"
            :src="item.icon"
            alt=""
            srcset=""
          >
          <p class="mode-options-item-title">{{item.title}}</p>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>


<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data: function () {
    return {
      swiperOption: {
        autoplay: false
      },
      dataSource: [[{
        id: '1',
        icon: require('@img/modeoptions/baokuishouji.webp'),
        title: '爆款手机'
      },
      {
        id: '2',
        icon: require('@img/modeoptions/bingtuan.webp'),
        title: '拼团购'
      },
      {
        id: '3',
        icon: require('@img/modeoptions/chaoshi.webp'),
        title: '苏宁超市'
      },
      {
        id: '4',
        icon: require('@img/modeoptions/muyingwanju.webp'),
        title: '母婴玩具'
      },
      {
        id: '5',
        icon: require('@img/modeoptions/shenghuojiadian.webp'),
        title: '生活电器'
      },
      {
        id: '6',
        icon: require('@img/modeoptions/pingtuan.png'),
        title: '签到有礼'
      },
      {
        id: '7',
        icon: require('@img/modeoptions/choujiang.png'),
        title: '购物有奖'
      },
      {
        id: '8',
        icon: require('@img/modeoptions/xianshiqianggou.webp'),
        title: '限时抢购'
      },
      {
        id: '9',
        icon: require('@img/modeoptions/zhuanqian.webp'),
        title: '赚钱'
      },
      {
        id: '10',
        icon: require('@img/modeoptions/suningshenxian.webp'),
        title: '苏宁生鲜'
      },

      ], [
        {
          id: '12',
          icon: require('@img/modeoptions/baokuishouji.webp'),
          title: '爆款手机'
        },
        {
          id: '13',
          icon: require('@img/modeoptions/bingtuan.webp'),
          title: '拼团购'
        },
        {
          id: '14',
          icon: require('@img/modeoptions/chaoshi.webp'),
          title: '苏宁超市'
        }, {
          id: '15',
          icon: require('@img/modeoptions/youhuijuan.png'),
          title: '优惠卷'
        }
      ]
      ],
    }
  },
  components: {
    swiper, swiperSlide
  },
  methods: {
    onItemClick: function () {
      this.$router.push({
        name: 'goodsList',
        params: {
          'routerType': 'push'
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.mode-options {
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding-bottom: px2rem(14);

  &-item {
    width: 20%;
    text-align: center;
    margin-top: px2rem(10);
    &-icon {
      width: px2rem(40);
      height: px2rem(40);
    }

    &-title {
      font-size: $minInfoSize;
      margin-top: px2rem(6);
    }
  }
}
</style>
