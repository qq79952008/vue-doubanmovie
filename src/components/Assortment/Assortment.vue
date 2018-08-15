<template>
  <div class="assoprtment">
    <div class="title">
      选影视
    </div>
    <div class="tags">
      <ul class="typetags">
        <li @click="changeTypeTag" :class="[typeTag === item ? 'activetag' : '']" v-for="(item,index) in typeTags" :key="index" :data-tag="item">{{item}}</li>
      </ul>
      <ul class="areatags">
        <li @click="changeAreaTag" :class="[areaTag === item ? 'activetag' : '']" v-for="(item,index) in areaTags" :key="index" :data-tag="item">{{item}}</li>
      </ul>
      <ul class="featuretags">
        <li @click="changeFeatureTag" :class="[featureTag === item ? 'activetag' : '']" v-for="(item,index) in featureTags" :key="index" :data-tag="item">{{item}}</li>
      </ul>
    </div>
    <div class="scroll">
      <ul class="assoprtmentlist" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
      infinite-scroll-distance="100"
      infinite-scroll-immediate-check="false"
      >
        <li class="assoprtmentitem" v-for="(item,index) in showassoprtmentlist" :key="index"
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
  data () {
    return {
      typeTags: ['剧情', '喜剧', '动作', '爱情', '科幻', '悬疑', '惊悚', '恐怖', '犯罪', '音乐', '奇幻', '冒险', '灾难'],
      areaTags: ['中国', '美国', '香港', '日本', '韩国', '英国', '法国', '德国', '意大利'],
      featureTags: ['经典', '青春', '文艺', '搞笑', '励志', '魔幻', '感人', '女性'],
      typeTag: '剧情',
      areaTag: '中国',
      featureTag: '经典',
      tagValue: '剧情,中国,经典',
      showassoprtmentlist: [],
      loading: false,
      startNum: 0,
      allLoad: false,
      loadError: false
    }
  },
  created () {
    this.getAssortData(this.tagValue, this.startNum).then((res) => {
      console.log(res.data.subjects)
      this.showassoprtmentlist = res.data.subjects
    })
  },
  methods: {
    getAssortData (value, startNum) {
      return new Promise((resolve, reject) => {
        this.axios.get('https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/search?count=12&tag=' + value + '&start=' + startNum).then((res) => {
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
      this.$router.push({name: 'Detail', params: { movieId: e.currentTarget.dataset.id }})
    },
    changeTypeTag (e) {
      this.typeTag = e.currentTarget.dataset.tag
      this.changeTagValue()
    },
    changeAreaTag (e) {
      this.areaTag = e.currentTarget.dataset.tag
      this.changeTagValue()
    },
    changeFeatureTag (e) {
      this.featureTag = e.currentTarget.dataset.tag
      this.changeTagValue()
    },
    changeTagValue () {
      let type = ''
      let area = ''
      let feature = ''
      this.tagValue = type + ',' + area + ',' + feature
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
      Promise.all([w, this.getAssortData(this.tagValue, this.startNum)]).then((result) => {
        if (result[0] === true) {
          this.showassoprtmentlist = this.showassoprtmentlist.concat(result[1].data.subjects)
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.assoprtment{
  .title{
    color: #888;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .typetags,.areatags,.featuretags{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    border-bottom: 1px solid #ccc;
    padding: 5px;
    li{
      padding: 5px;
      cursor: pointer;
    }
    .activetag{
      background: rgb(38,162,255);
      color: #fff;
    }
  }
  .scroll{
    height: 800px;
    .more_loading{
      display: flex;
      justify-content: center;
      height: 50px;
    }
    .assoprtmentlist{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      .assoprtmentitem{
        width: 33%;
        height: 190px;
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
