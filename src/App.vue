<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <p>|</p>
      <router-link to="/about">About</router-link>
    </div>
    <router-view dataView="true">children</router-view>
  </div>
</template>
<script>
export default {
  name: "APP",
  data() {
    return {
      obj: {
        name: 'wang.haoyu'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this)
    }, 1000)
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
