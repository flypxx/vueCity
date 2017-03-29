<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="listToggle">
        <div class="logo-wrapper">
          <div class="num" v-show="totalCount">
            {{totalCount}}
          </div>
          <div class="logo" :class="{'active':totalCount}">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price" :class="{'active':totalCount}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay"
             :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop"
                  v-for="ball in balls"
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @after-enter="afterEnter"
                  :key="ball.id">
        <div class="ball"
             v-show="ball.show">
          <div class="inner inner-hock"></div>
        </div>
      </transition>
    </div>
    <transition name="showCartList">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span clas="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import cartcontrol from 'components/cartcontrol/cartcontrol';
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false,
          id: 0
        },
        {
          show: false,
          id: 1
        },
        {
          show: false,
          id: 2
        },
        {
          show: false,
          id: 3
        },
        {
          show: false,
          id: 4
        }
      ],
      dropBalls: [],
      fold: true
    };
  },
  created() {
    this.$root.eventHub.$on('cart.add', this.drop);
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return `去结算`;
      }
    },
    payClass() {
      return this.totalPrice < this.minPrice ? 'not-enough' : 'enough';
    },
    listShow() {
      if (!this.selectFoods.length) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      return show;
    }
  },
  methods: {
    drop(el) {
      for (let i = 0, l = this.balls.length; i < l; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      const left = 22;
      const bottom = 48;
      let len = this.balls.length;
      while (len--) {
        let ball = this.balls[len];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - left;
          let y = -(window.innerHeight - rect.top - bottom);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.querySelector('.inner-hock');
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el) {
      el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.querySelector('.inner-hock');
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    listToggle() {
      if (!this.selectFoods.length) {
        return;
      }
      this.fold = !this.fold;
    }
  },
  components: {
    cartcontrol
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background-color #141d27
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        font-size 0
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          vertical-align top
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background-color #141d27
          .num
            position absolute
            top: 0;
            right 0
            width 24px
            height 16px
            line-height: 16px;
            text-align center
            font-size: 9px;
            border-radius: 16px;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
            font-weight: 700;
            color: white;
            background-color: rgb(240, 20, 20);
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background-color #2b343c
            line-height 44px
            font-size 24px
            color #80858a
            &.active
              background: rgb(0, 160, 220);
              color: #fff
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          padding-right 12px
          line-height 24px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.active
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          &.not-enough
            background-color #2b333b
          &.enough
            background-color #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 100
        &.drop-enter,&.drop-enter-active
          transition all .4s cubic-bezier(0.49,-0.29,0.75,0.41)
          .inner
            width 16px
            height 16px
            border-radius 50%
            background-color rgb(0, 160, 220)
            transition all .4s linear
    .shopcart-list
      position absolute
      top 0
      left 0
      width 100%
      transform translate3d(0, -100%, 0)
      background #fff
      z-index -1
      &.showCartList-enter-active,&.showCartList-leave-active
        transition all 0.4
      &.showCartList-enter,&.showCartList-leave-active
        transform translate3d(0, 0, 0)

</style>
