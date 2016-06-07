<template>
<div class="page-view">
  <div v-if="!$loadingAsyncData" class="page-content">
    <a v-link="{ name: 'book.catalog', params: { book: $route.params.book } }">返回目录</a>
    <div v-for="pic in content.pics">
      <h1 class="image-title">{{ pic.title }}</h1>
      <div class="image-content">
        <img :src="pic.path" alt="{{ pic.alt }}">
        <div class="translation-wrapper"
          v-for="area in pic.areas"
          v-bind:class="{ 'show-all': isShowAll }"
          v-bind:style="area.position">
          <div
            class="translation-content"
            v-bind:style="area.style">
            <p v-for="t in area.text.split('\n')">{{{ t | toHTML }}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="$loadingAsyncData" class="loading">Loading...</div>
  <button class="pure-button show-all-button" @click="toggleShow">切换所有翻译</button>
  <pagination :count="pageCount" :current="current" @navigate="gotoPage"></pagination>
</div>
</template>

<script>
/**
 * data = [
 *   {
 *     pics: [
 *       {
 *         title: String,
 *         path: String url of the image,
 *         alt: String alternate text for image,
 *         areas: [
 *           {
 *             shape: String,
 *             coords: Array<Number> coordinated of the area
 *           }
 *         ]
 *       },
 *       ...
 *     ]
 *   },
 *   ...
 * ]
 */
import Vue from 'vue'
import Pagination from './Pagination.vue'
import {router} from '../main.js'
import store from '../store'

Vue.filter( 'toHTML', function ( value ) {
  return value.replace( /\s/g, '&nbsp;' );
})

function transformContent ( content ) {
  return {
    pics: content.pics.map( ( pic ) => {
      return Object.assign(
        {},
        pic,
        {
          'areas': pic.areas.map( ( area ) => {
            return Object.assign(
              {},
              area,
              {
                'position': {
                  left: Math.min( area.coords[0], area.coords[2] ) + 'px',
                  top: Math.min( area.coords[1], area.coords[3] ) + 'px',
                  width: Math.abs( area.coords[2] - area.coords[0] ) + 'px',
                  height: Math.abs( area.coords[3] - area.coords[1] ) + 'px'
                },
                'style': Object.assign(
                  {},
                  pic.style,
                  area.boxStyle
                )
              }
            )
          })
        }
      )
    })
  }
}

export default {

  name: 'PageView',

  components: {
    Pagination
  },

  props: {
    pageCount: Number
  },

  data () {
    return {
      current: -1,
      content: {
        pics: []
      },
      isShowAll: false
    }
  },

  route: {
    data ({ to }) {
      const bookID = to.params.book
      const pageNumber = +to.params.page
      return store.fetchPageFromBook( pageNumber, bookID )
        .then( page => {
          return {
            current: pageNumber,
            content: transformContent( page )
          }
        })
    }
  },

  methods: {
    gotoPage ( page ) {
      router.go({ name: 'book.page', params: {page: page} })
    },

    toggleShow () {
      this.isShowAll = !this.isShowAll
    }
  }
}
</script>

<style lang="stylus" scoped>
.image-content
  position relative

.image-title
  text-align center

.translation-wrapper
  position absolute
  writing-mode horizontal-tb
  .translation-content
    width 100%
    height 100%
    box-sizing border-box
    visibility hidden
    background-color white
    writing-mode vertical-rl
    p
      margin 0
  &:hover, &.show-all
    .translation-content
      visibility visible
</style>