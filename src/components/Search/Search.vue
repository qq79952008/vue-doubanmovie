<template>
  <div class="search">
    <div class="btn">
      <span v-show="isHome">
        <a href="#">豆瓣电影</a>
      </span>
      <span v-show="!isHome" class="icon-back" @click="goHome"></span>
    </div>
    <div class="searchbox">
      <span class="icon-search"></span>
      <input type="text" placeholder="搜索电影、演员、导演" ref="searchInput" @keyup.enter="submit">
      <button @click="submit">搜索</button>
    </div>
    <transition name="searchresult">
      <div class="searchresult" v-show="showSearchResult">
        <ul class="resultlist" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
        infinite-scroll-distance="100"
        infinite-scroll-immediate-check="false"
        >
          <li v-show="!searchResult.length && !loading" class="noSearchResult">无搜索结果</li>
          <li v-show="searchResult.length" class="resultTitle">搜索{{searchValue}}的结果</li>
          <li class="resultitem" v-for="(item,index) in searchResult" :key="index"
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
          <li class="more_loading">
            <mt-spinner type="snake" color="#26A2FF" :size="20" v-show="loading&&!allLoad"></mt-spinner>
            <span v-show="loadError">加载失败，请重新加载</span>
            <span v-show="allLoad">已全部加载</span>
          </li>
        </ul>
        <div class="closeresult" @click="closeResult">
          关闭
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Star from '../Star/Star'
export default {
  computed: {
    ...mapState([
      'isHome',
      'showSearchResult'
    ])
  },
  components: {
    Star
  },
  data () {
    return {
      searchResult: [],
      searchValue: '',
      startNum: 0,
      loading: false,
      allLoad: false,
      loadError: false
    }
  },
  methods: {
    goHome () {
      this.$store.commit('setisHome', true)
      this.$router.push({path: '/'})
    },
    submit () {
      this.startNum = 0
      if (this.$refs.searchInput.value.trim() === '') {
        return
      }
      this.searchResult = []
      this.loading = true
      this.searchValue = this.$refs.searchInput.value
      this.$refs.searchInput.value = ''
      this.getSearchData(this.searchValue, this.startNum).then((res) => {
        this.searchResult = this.searchResult.concat(res.data.subjects)
        this.$store.commit('setshowSearchResult', true)
        this.loading = false
      })
    },
    closeResult () {
      this.$store.commit('setshowSearchResult', false)
    },
    getSearchData (value, startNum) {
      return new Promise((resolve, reject) => {
        this.axios.get('https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/search?count=12&q=' + value + '&start=' + startNum).then((res) => {
          this.loadError = false
          resolve(res)
        }).catch(() => {
          this.loading = false
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
      let wait = function (time) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true)
          }, time)
        })
      }
      let w = wait(2500)
      Promise.all([w, this.getSearchData(this.searchValue, this.startNum)]).then((result) => {
        if (result[0] === true) {
          this.searchResult = this.searchResult.concat(result[1].data.subjects)
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.searchresult-enter-active{
  animation: resultanimate 1s;
}
.searchresult-leave-active{
  animation: resultanimate 1s reverse;
}
.search{
  background: rgb(38,162,255);
  display: flex;
  width: 100%;
  justify-content: center;
  align-items:center;
  height:40px;
  position: fixed;
  .btn{
    color: #fff;
    font-size: 22px;
    line-height: 40px;
    span{
      margin: 0 5px;
      cursor: pointer;
    }
    a{
      color: #fff;
      text-decoration: none;
    }
  }
  .searchbox{
    flex: 1;
    width: 70%;
    height: 30px;
    display: flex;
    justify-content: center;
    position: relative;
    margin: 0 10px;
    .icon-search{
      position: absolute;
      left: 5px;
      top: 6px;
    }
    input{
      font-size: 14px;
      padding: 2px 0 2px 22px;
      width: 90%;
      height: 26px;
      border-radius: 5px 0 0 5px;
      outline: none;
      border: none;
      line-height: 30px;
    }
    button{
      min-width: 40px;
      border-radius: 0 5px 5px 0;
      border: none;
      color: #fff;
      background: #2087d4;
      line-height: 30px;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .searchresult{
    position: absolute;
    width: 100%;
    height: 80vh;
    background: #eee;
    top: 40px;
    padding: 0 0 40px 0;
    display: flex;
    flex-direction: column;
    list-style: none;
    .noSearchResult,.resultTitle{
      font-size: 18px;
      width: 100%;
      text-align: center;
    }
    .closeresult{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: rgb(38,162,255);
      color: #fff;
      cursor: pointer;
    }
    .more_loading{
      display: flex;
      justify-content: center;
      height: 40px;
    }
    .resultlist{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      overflow: auto;
      .resultitem{
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
@keyframes resultanimate{
  0%{height: 0px}
  100%{height: 500px;}
}

</style>
