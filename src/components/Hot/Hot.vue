<template>
  <div class="hot">
    <div class="title">
      {{hotTitle}}
    </div>
    <div class="scroll">
      <ul class="hotlist" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
      infinite-scroll-distance="200"
      infinite-scroll-immediate-check="true"
      >
        <li class="hotitem" v-for="(item,index) in showHotlist" :key="index"
          @click="goDetail"
          :data-id="item.id"
          :data-imageurl="item.images.small"
        >
          <img :src="item.images.small" alt="">
          <div class="score" v-show="item.rating.average">
            <Star :score="item.rating.average"/>
            <div class="score_num">
              {{item.rating.average}}
            </div>
          </div>
          <div class="noscore" v-show="!item.rating.average">
              暂无评分
          </div>
          <p class="item_title">
            {{item.title}}
          </p>
        </li>
      </ul>
      <div class="more_loading">
        <mt-spinner type="snake" color="#26A2FF" :size="20" v-show="loading&&!allLoad"></mt-spinner>
        <span v-show="loadError">加载失败，请重新加载</span>
        <span v-show="allLoad">已全部加载</span>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../Star/Star'
export default {
  components: {
    Star
  },
  created () {
    this.getHotData(this.startNum).then((res) => {
      this.hotTitle = res.data.title
      this.showHotlist = this.showHotlist.concat(res.data.subjects)
    })
  },
  data () {
    return {
      showHotlist: [],
      hotTitle: '',
      loading: false,
      startNum: 0,
      allLoad: false,
      loadError: false
    }
  },
  methods: {
    getHotData (startNum) {
      return new Promise((resolve, reject) => {
        this.axios.get('https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/in_theaters?count=12&start=' + startNum).then((res) => {
          this.loadError = false
          resolve(res)
        }).catch((err) => {
          console.log(err)
          this.loadError = true
        })
      })
    },
    goDetail (e) {
      this.$store.commit('setisHome', false)
      this.$store.commit('setshowSearchResult', false)
      this.$router.push({name: 'Detail', params: { movieId: e.currentTarget.dataset.id }})
    },
    loadMore () {
      if (this.allLoad) {
        return
      }
      this.loading = true
      this.startNum += 12
      if (this.startNum >= 36) {
        this.allLoad = true
        return
      }
      this.getHotData(this.startNum).then((res) => {
        this.showHotlist = this.showHotlist.concat(res.data.subjects)
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hot{
  .title{
    color: #888;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .scroll{
    height: 800px;
    .more_loading{
      display: flex;
      justify-content: center;
      height: 50px;
    }
    .hotlist{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      .hotitem{
        width: 33%;
        height: 190px;
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img{
          width: 80%;
          height: 80%;
        }
        .score{
          display: flex;
          width: 80%;
          justify-content: space-around;
          align-items: center;
        }
        .item_title{
          text-align: center;
          width: 100%;
          font-size: 14px;
          white-space: nowrap;
          text-overflow:ellipsis;
          overflow: hidden;
        }
        .score,.noscore{
          font-size: 12px;
        }
      }
    }
  }
}
</style>
