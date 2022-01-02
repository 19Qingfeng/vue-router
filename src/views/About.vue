<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ obj.a }}</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Abount",
  data() {
    return {
      obj: {
        name: 'wang.haoyu'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.obj.a = 3
    }, 1000)
  }
}
</script>
