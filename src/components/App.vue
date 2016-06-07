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
  float left
  position relative
  left 50%
  #app
    position relative
    left -50%
</style>
