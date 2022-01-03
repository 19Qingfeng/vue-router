<template>
  <div class="home">
    <h1>Home</h1>
    <router-link to="/a">a---a</router-link>
    <br />
    <router-link to="/b">b---b</router-link>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
