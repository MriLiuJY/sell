<template>
  <transition name="move">
  <div v-show="showFlag" class="food">
  	<p class="p">w shi food</p>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.food{
	  position: fixed
	  left: 0
	  top: 0
	  bottom: 48px
	  z-index: 30
	  width: 100%
	  background: #fff}
    &.move-transition{
      transition: all 0.2s linear
      transform: translate3d(0, 0, 0)}
    &.move-enter, &.move-leave{
      transform: translate3d(100%, 0, 0)
    }
      
</style>
