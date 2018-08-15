<template>
  <div class="detail">
    <div class="more_loading" v-show="loading">
        <mt-spinner type="snake" color="#26A2FF" :size="20"></mt-spinner>
    </div>
    <div class="error"  v-show="getError">
          <span v-show="getError">数据加载失败</span>
          <mt-button type="primary" size="small" @click="goHome" plain>请点击请返回首页</mt-button>
        </div>
    <div class="detailinfo" v-show="movieData.show">
      <div class="movieimg">
        <img :src="movieData.imageurl" alt="">
      </div>
      <div class="detailtitle">
        {{movieData.title}}
      </div>
      <div class="detaildirector">
        <span> 导演：</span>
      {{movieData.directors}}
      </div>
      <div class="detailcasts">
        <span> 演员：</span>
        {{movieData.casts}}
      </div>
      <div class="detailabstract">
        <span> 简介：</span>
        {{movieData.abs}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isHome: false,
      getError: false,
      loading: false,
      movieData: {
        show: false,
        imageurl: '',
        title: '',
        directors: '',
        casts: '',
        abs: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
    // 通过 `vm` 访问组件实例
      vm.movieData = {
        show: false,
        imageurl: '',
        title: '',
        directors: '',
        casts: '',
        abs: ''
      }
      if (!vm.$route.params.movieId) {
        vm.loading = false
        vm.getError = true
        return
      }
      vm.loading = true
      let getData = function () {
        return new Promise((resolve, reject) => {
          vm.axios.get('https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/subject/' + vm.$route.params.movieId).then((res) => {
            resolve(res)
          }).catch((err) => {
            console.log(err)
            vm.loading = false
            vm.getError = true
          })
        })
      }
      let gd1 = getData()
      gd1.then((resolve) => {
        vm.movieData.show = true
        vm.movieData.imageurl = resolve.data.images.large
        vm.movieData.title = resolve.data.original_title
        for (let item of resolve.data.directors) {
          if (resolve.data.directors.indexOf(item) === 0) {
            vm.movieData.directors = item.name
          } else {
            vm.movieData.directors = vm.movieData.directors + '/' + item.name
          }
        }
        for (let item of resolve.data.casts) {
          if (resolve.data.casts.indexOf(item) === 0) {
            vm.movieData.casts = item.name
          } else {
            vm.movieData.casts = vm.movieData.casts + '/' + item.name
          }
        }
        vm.movieData.abs = resolve.data.summary
        vm.loading = false
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
  },
  created () {
  },
  methods: {
    goHome () {
      this.getError = false
      this.loading = false
      this.$store.commit('setisHome', true)
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="less" scoped>
.detail{
  padding: 40px 0 0 0;
  div{
    text-align: center;
    margin: 10px 0;
    span{
      font-weight: bold;
    }
  }
  .more_loading{
    display: flex;
    justify-content: center;
  }
  .movieimg{
    display: flex;
    justify-content: center;
    img{
      height: 100%;
    }
  }
  .detailtitle{
    font-size: 30px;
    font-weight: bold;
  }
  .detailabstract{
    margin: 10px;
    overflow: hidden;
  }
}
</style>
