<script setup lang="ts">
import SideMenu from './components/SideMenu.vue'
</script>

<template>
  <el-container id="top-container">
    <el-aside width="200px">
      <SideMenu />
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
#top-container {
  height: 100%;
}
</style>
