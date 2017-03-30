<template>
  <div v-show="showFoodDetail" class="food"></div>
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
</style>
