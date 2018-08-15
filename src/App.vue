<template>
  <div id="app">
    <Search/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Search from './components/Search/Search'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
export default {
  name: 'App',
  components: {
    Search,
    Home,
    Detail
  }
}
</script>

<style>

</style>
