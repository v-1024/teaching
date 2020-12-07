<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
  export default {
    mounted() {
      if (sessionStorage.getItem('parent_index')==null && sessionStorage.getItem('child_index')==null){
        sessionStorage.setItem('parent_index', '1');
        sessionStorage.setItem('child_index', '1');
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>