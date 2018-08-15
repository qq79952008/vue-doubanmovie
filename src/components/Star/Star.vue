<template>
  <div class="star">
    <div class="score_star" :style="{width: score*10+'%'}"></div>
  </div>
</template>

<script>
export default {
  props: ['score']
}
</script>

<style lang="less" scoped>
.star{
  width: 50px;
  height: 8px;
  background: url('./rating-0_w50.png') no-repeat;
  .score_star{
    width: 100%;
    height: 100%;
    background: url('./rating-5_w50.png') no-repeat;
  }
}
</style>
