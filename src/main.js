import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import Index from './components/Index.vue'
import BookView from './components/BookView.vue'
import CatalogView from './components/CatalogView.vue'
import PageView from './components/PageView.vue'

// install router
Vue.use( Router )

export var router = new Router()

router.map({
  '/book/:book': {
    name: 'book',
    component: BookView,
    subRoutes: {
      '/': {
        name: 'book.catalog',
        component: CatalogView
      },
      '/page/:page': {
        name: 'book.page',
        component: PageView
      }
    }
  },

  '/': {
    name: 'index',
    component: Index
  }
})

router.redirect({
  '*': '/'
})

router.start( App, '#app' )