<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, RouteRecordRaw } from 'vue-router'
import { routes } from '../router/index'

const path = computed(() => useRoute().path);

function transList(s: Array<RouteRecordRaw>): any[] {
  let t = [] as any[];
  s.length && s.forEach(e => {
    if(e.path == '/') return;
    t.push({
      title: e?.meta?.name, 
      index: e.path,
      child: e.children ? transList(e.children) : []
    })
  });
  return t;
};
const menuList = transList(routes);
</script>

<template>
  <el-menu id="side-menu-container" router :default-active="path">
    <template v-for="menu in menuList">
      <el-sub-menu v-if="menu.child.length" :index="menu.index">
        <template #title>
          <span>{{menu.title}}</span>
        </template>
        <el-menu-item v-for="c in menu.child" :index="c.index">{{c.title}}{{c.index}}</el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="menu.index">{{menu.title}}</el-menu-item>
    </template>
  </el-menu>
</template>

<style lang="less">
#side-menu-container {
  height: 100%;
}
</style>