<template>
  <transition name="move">
    <div v-show="showFoodDetail"
         class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hideFoodDetail">
            <i class="icon-arrow_left"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">
            {{food.name}}
          </div>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="food-rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old"
                  v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy"></div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';

export default {
  props: {
    food: Object
  },
  data() {
    return {
      showFoodDetail: false
    };
  },
  methods: {
    showFood() {
      this.showFoodDetail = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hideFoodDetail() {
      this.showFoodDetail = false;
    }
  },
  components: {
    cartcontrol
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .food
    position fixed
    top 0
    left 0
    bottom 48px
    width 100%
    background-color #fff
    z-index 30
    &.move-enter-active,&.move-leave-active
      transition all 0.3s linear
      transform translate3d(0, 0, 0)
    &.move-enter,&.move-leave-active
      transform translate3d(100%, 0, 0)
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_left
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      padding 18px
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        line-height 10px
        height 10px
        font-size 0
        .sell-count, .food-rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          font-size 12px
      .price
        font-weight 700
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)


</style>
