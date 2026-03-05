<template>
  <div id="app">
    <nav class="app-nav">
      <img src="./assets/logo.png" class="logo">
      <router-link to="/">首页</router-link>
      <router-link to="/omron-axis">欧姆龙PLC 轴运动控制功能块</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}

.app-nav {
  background: #212121;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.app-nav .logo {
  height: 32px;
}

.app-nav a {
  color: #ccc;
  text-decoration: none;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s, color 0.15s;
}

.app-nav a:hover,
.app-nav a.router-link-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
}
</style>
