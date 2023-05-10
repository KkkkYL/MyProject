<template>
  <div class="card bg-white py-3 mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i  :class="`icon-${icon} ml-3 iconfont`" style="font-weight: 600;"></i>
      <div class="fs-xl flex-1 px-2 text-black">{{title}}</div>
      <i class="iconfont icon-menu mr-3" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    title:{ type:String, require:true },
    icon:{ type:String, require:true },
    plain:{ type:Boolean }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/variables';
.card{
  .card-header{
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>