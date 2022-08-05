<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import * as echarts from 'echarts';
import { stringify } from 'querystring';
import { add } from 'lodash';

interface ICurrentMap {
  name: string;
  adcode: number;
  child: number;
}
type nullable<T> = null|T;
let chart = reactive({
  ins: null as any,
  currentMap: null as unknown as Array<ICurrentMap>, // 当前地图的name，adcode数据
  parent: [] as any
})
onMounted(() => {
  chart.ins = echarts.init(document.getElementById('chart') as any);
  chart.ins.on('click', (p:any) => {
    console.log(p)
    let address = chart.currentMap.filter((e:any) => e.name == p.name)[0];
    if (chart.parent.length && address.adcode == chart.parent[chart.parent.length - 1].adcode) return;
    chart.parent.push(address);
    reloadMap(address);
  })
  chart.ins.on('contextmenu', (p:any) => {
    window.event?.preventDefault();
    chart.parent.splice(-1, 1)[0];
    let address = chart.parent[chart.parent.length - 1]
    reloadMap(address);
  })
  
  reloadMap(undefined);
})

const loadAllCountry = () => {
  fetch('/all_country.json').then(r => r.json()).then(data => {
    setTimeout(() => chart.ins.hideLoading(), 500)
    chart.currentMap = data.features.map((e:any) => ({
      name: e.properties.name, 
      adcode: e.properties.adcode, 
      child: e.properties.childrenNum,
      ...e
    }))
    console.log(chart.currentMap)
    echarts.registerMap('map0', data)
    chart.ins.setOption({
      series: [
        {
          name: '全国地图',
          type: 'map',
          map: 'map0',
          selectedMode: false, // 不让单独选中
          roam: true, // 开始鼠标事件，scale缩放、move移动
          // 图形上的文本标签
          label: {
            show: true,
            color: "#000a3c",
          },
          // 地图样式
          itemStyle: {
            // 区域样式
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 3,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(223, 231, 242, 1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(2, 99, 206, 1)", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
            borderWidth: 1, // 边框大小
            borderColor: "rgba(104, 152, 190, 1)", // 边框样式
            shadowColor: "rgba(128, 217, 248, 1)", // 阴影颜色
            shadowOffsetX: -2, // 阴影水平方向上的偏移距离
            shadowOffsetY: 2, // 阴影垂直方向上的偏移距离
            shadowBlur: 10, // 文字块的背景阴影长度
          },
          // 选中状态下样式
          emphasis: {
            label: {
              color: "#ffffff",
            },
            itemStyle: {
              areaColor: "#a5d4fe",
            },
          },
        },

      ]
    });
  });
}
const loadMapByCode = (address: any) => {
  console.log(address)
  fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${address.adcode}${address.child>0?"_full":""}.json`).then(r => r.json()).then(data => {
    setTimeout(() => chart.ins.hideLoading(), 500)
    chart.currentMap = data.features.map((e:any) => ({
      name: e.properties.name, 
      adcode: e.properties.adcode, 
      child: e.properties.childrenNum,
      ...e,
    }))
    echarts.registerMap(`map${address.adcode}`, data)
    chart.ins.setOption({
      series: [
        {
          name: `${address.name}`,
          type: 'map',
          map: `map${address.adcode}`,
          selectedMode: false, // 不让单独选中
          roam: true, // 开始鼠标事件，scale缩放、move移动
          center: address.properties.center //拖拽后，下钻上钻也能保持地图居中显示
        },

      ]
    });
  });
}
const reloadMap = (address:any) => {
  chart.ins.showLoading();
  if (!address) {
    loadAllCountry()
  } else {
    loadMapByCode(address);
  }
  
}
</script>

<template>
<div>mapDrill
  <div id="chart" style="width: 100%; height: 800px;"></div>
</div>
</template>