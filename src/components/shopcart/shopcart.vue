<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="des">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
    	<transition-group name="drop">
    	<div v-for="ball in balls" v-show="ball.show" class="ball" :key="ball">
    		<div class="inner"></div>
    	</div>
    	</transition-group>
    </div>
    <!-- <transition name="fold"> -->
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty">清空</span>
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
    <!-- </transition> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'component/cartcontrol/cartcontrol.vue'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 8,
              count: 1
            }
          ]
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
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        if(!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        return show
      }
    },
    methods: {
      drop(el) {
        console.log(el)
      },
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.shopcart
	  position: fixed
	  left: 0
	  bottom: 0
	  z-index: 50
	  width: 100%
	  height: 48px
	  .content
	    display: flex
	    background: #141d27
	    height: 48px
	    font-size: 0
	    color: rgba(255,255,255,.4)
	    .content-left
	      flex: 1
	      .logo-wrapper
	        display: inline-block
	        position: relative
	        top: -10px
	        margin: 0 12px
	        padding: 6px
	        width: 56px
	        height: 56px
	        box-sizing: border-box
	        vertical-align: top
	        border-radius: 50%
	        background: #141d27
	        .num
	          position: absolute
	          top: 0
	          right: 0
	          width: 24px
	          height: 16px
	          line-height: 16px
	          text-align: center
	          border-radius: 16px
	          font-size: 9px
	          font-weight: 700
	          color: #fff
	          background: rgb(240,20,20)
	          box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
	        .logo
	          height: 100%
	          width: 100%
	          border-radius: 50%
	          background: #2b343c
	          text-align: center
	          &.highlight
	            background: rgb(0,160,220)
	          .icon-shopping_cart
	            font-size: 24px
	            color: #80858a
	            line-height: 44px
	            &.highlight
	              color: #fff
	      .price
	        display: inline-block
	        vertical-align: top
	        margin-top: 12px
	        line-height: 24px
	        padding-right: 12px
	        box-sizing: border-box
	        border-right: 1px solid rgba(255,255,255,.1)
	        font-size: 16px
	        font-weight: 700
	        &.highlight
	          color: #fff
	      .des
	        display: inline-block
	        vertical-align: top
	        line-height: 24px
	        margin: 12px 0 0 12px
	        font-size: 10px
	        color: rgba(255,255,255,.4)
	    .content-right
	      flex: 0 0 105px
	      width: 105px
	      .pay
	        height: 48px
	        line-height: 48px
	        text-height: center
	        font-size: 12px
	        font-weight: 700
	        background: #2b333b
	        text-align: center
	        &.not-enough
	          background: #2b333b
	        &.enough
	          background: #00b43c
	          color: #fff
	  .ball-container
	    .ball
	      position: fixed
	      left: 32px
	      bottom:22px
	      z-index:200
	      &.drop-transition
	        transition: all 0.4s
	        .inner
	          width:16px
	          height:16px
	          border-radius:50%
	          background: rgb(0,160,220)
	          transition: all 0.4s linear
</style>
