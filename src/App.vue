<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
}
#app::-webkit-scrollbar {
  width: 3px;
  height: 6px;
}
#app::-webkit-scrollbar-thumb {
  background: rgba(49 52 52 / 0.5);
  border-radius: 5px;
}
#app::-webkit-scrollbar-track {
  background: none;
  border-radius: 5px;
}
</style>
