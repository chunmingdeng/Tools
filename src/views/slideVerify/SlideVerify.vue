<script setup lang="ts">
  import SlideVerify from './index'
  let ins01 = new SlideVerify('slide-verify01', {
    height: 200,
    width: 260,
    clipWidth: 150,
  });
  ins01.on('valid', (v: any) => {
    console.log('valid value', v)
    if(!v) ins01.reload();
  })
</script>
  
<template>
  <div id="slide-verify01" style="height: 300px; width: 500px; position: relative; display: flex; justify-content: center; align-items: center;">
  </div>
</template>