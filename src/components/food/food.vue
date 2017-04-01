<template>
  <transition name="move">
    <div v-show="showFoodDetail" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back">
            <i class="icon-arrow_left"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
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
      }
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
      transition all 0.4s linear
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
</style>
