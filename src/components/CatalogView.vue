<template>
<div class="catalog-view">
<h2>目录</h2>
<div v-for="item in catalog" v-if="!$loadingAsyncData">
  <a v-link="{ name: 'book.page', params: { book: $route.params.book, page: item.value } }">{{ item.text }}</a>
</div>
<div v-if="$loadingAsyncData" class="loading">Loading...</div>
</div>
</template>

<script>
import store from '../store'

export default {

  name: 'CatalogView',

  props: {
    pageCount: Number
  },

  data () {
    return {
      catalog: []
    }
  },

  route: {
    data ({ to }) {
      const bookID = to.params.book
      return store.fetchCatalog( bookID ).then( catalog => {
        return {
          catalog
        }
      })
    }
  }
}
</script>

<style lang="stylus">
</style>