<template>
<div class="index-view">
  <h1>MangaVue</h1>
  <a v-for="book in books" v-link="{ name: 'book', params: {book: book.id} }">{{ book.name }}</a>
</div>
</template>

<script>
import store from '../store'

export default {

  name: 'Index',

  data () {
    return {
      books: []
    }
  },

  route: {
    data () {
      return store.fetchBookIndex().then( books => {
        return {
          books
        };
      })
    }
  }
}
</script>

<style lang="stylus">
</style>