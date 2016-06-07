<template>
<div class="book-view">
  <h1>{{ name }}</h1>
  <p>原作：{{ author }}</p>
  <p>翻译：{{ translator }}</p>
  <p class="book-discription">{{ discription }}</p>
  <router-view :page-count="pageCount"></router-view>
</div>
</template>

<script>
import store from '../store'

export default {

  name: 'BookView',

  data () {
    return {
      id: -1,
      name: '',
      pageCount: 0,
      author: '',
      translator: '',
      discription: ''
    }
  },

  route: {
    data ({ to }) {
      const bookID = to.params.book
      return store.fetchBook( bookID ).then( book => {
        return book
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.book-discription
  max-width 500px
</style>