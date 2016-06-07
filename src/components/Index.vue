<template>
<div class="index-view">
  <h1>MangaVue</h1>
  <p>developed by <a href="https://github.com/exoticknight">exoticknight</a></p>
  <div class="pure-menu">
    <h2 class="pure-menu-heading">漫画列表</h2>
    <ul class="pure-menu-list">
      <li class="pure-menu-item" v-for="book in books" >
        <a class="pure-menu-link" v-link="{ name: 'book', params: {book: book.id} }">{{ book.name }}</a>
      </li>
    </ul>
  </div>
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