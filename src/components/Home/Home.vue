<template>
  <div class="home">
    <div class="linkdiv">
      <router-link class="link" to="/home/hot">正在热映</router-link>
      <router-link class="link" to="/home/assortment">分类</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.home{
  padding: 40px 0 0 0;
  .linkdiv{
    display: flex;
    .link{
      flex: 1;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      font-weight: bold;
      text-decoration: none;
      color: rgb(38,162,255);
      padding: 5px 0;
    }
    .router-link-active{
      border-bottom:1px solid rgb(38,162,255);
    }
  }
}
</style>
