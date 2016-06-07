<template>
<div id="wrapper">
  <div id="app">
    <router-view
      class="view"
      transition
      keep-alive
      transition-mode="out-in">
    </router-view>
  </div>
</div>
</template>

<style lang="stylus">
body
  font-family Helvetica, sans-serif

#wrapper
  text-align center
  #app
    display inline-block
    text-align left
</style>
