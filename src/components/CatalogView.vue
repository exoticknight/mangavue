<template>
<div class="catalog-view">
<h2>Catalog</h2>
<div v-for="item in catalog">
  <a v-link="$route.path + '/page/' + item.value">{{ item.text }}</a>
</div>
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