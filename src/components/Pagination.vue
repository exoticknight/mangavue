<template>
<div class="pagination" v-show="count > 0">
  <div class="pure-form">
    <button class="pure-button nav-prev" v-if="current > 1" @click="onPrevButtonClick">上页</button>
      <select class="pure-input-1-5" v-model="current" @change="onCurrentPageChanged">
        <option v-for="page in pages" :value="page">
        第 {{ page }} 页
        </option>
      </select>
    <button class="pure-button nav-next" v-if="current < count" @click="onNextButtonClick">下页</button>
  </div>
</div>
</template>

<script>
export default {

  name: 'Pagination',

  props: {
    count: Number,
    current: Number
  },

  computed: {
    pages: function () {
      return Array.from( new Array( this.count ), ( _, i ) => i + 1 )
    }
  },

  methods: {
    onPrevButtonClick () {
      this.$dispatch( 'navigate', this.current - 1 )
    },

    onNextButtonClick () {
      this.$dispatch( 'navigate', this.current + 1 )
    },

    onCurrentPageChanged () {
      this.$dispatch( 'navigate', this.current )
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination
  text-align center
</style>