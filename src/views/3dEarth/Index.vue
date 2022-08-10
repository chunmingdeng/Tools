<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue';
import 'echarts-gl';

/*
   图中相关城市经纬度,根据你的需求添加数据
   关于国家的经纬度，可以用首都的经纬度或者其他城市的经纬度
   */
var geoCoordMap: any = {
  '南宁': [108.479, 23.1152, 0],
  '广州': [113.5107, 23.2196, 0],
  '重庆': [107.7539, 30.1904, 0],
  '芬兰': [24.909912, 60.169095, 0],
  '美国': [-100.696295, 33.679979, 0],
  '日本': [139.710164, 35.706962, 0],
  '韩国': [126.979208, 37.53875, 0],
  '瑞士': [7.445147, 46.956241, 0],
  '东南亚': [117.53244, 5.300343, 0],
  '澳大利亚': [135.193845, -25.304039, 0],
  '德国': [13.402393, 52.518569, 0],
  '英国': [-0.126608, 51.208425, 0],
  '加拿大': [-102.646409, 59.994255, 0]
};

/* 
    记录下起点城市和终点城市的名称，以及权重
    数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
 */

var CQData = [
  [{ name: '重庆' }, { name: "英国", value: 70 }]
];

var GZData = [
  [{ name: '广州' }, { name: "日本", value: 30 }],
];

var NNData = [
  [{ name: '南宁' }, { name: "加拿大", value: 80 }],
  [{ name: '南宁' }, { name: "美国", value: 100 }],
  [{ name: '南宁' }, { name: "澳大利亚", value: 95 }],
  [{ name: '南宁' }, { name: "瑞士", value: 50 }]
];

var convertData = function (data: any) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i] as any;
    var fromCoord = geoCoordMap[dataItem[1].name];
    var toCoord = geoCoordMap[dataItem[0].name];
    if (fromCoord && toCoord) {
      res.push([fromCoord, toCoord])
    }
  }
  console.log(res)
  return res;
}

var series: Array<any> = [];// 3D飞线
var dser = [];  // 2D散点坐标
//TODO====  添加的坐标文本没有展示？
[['重庆', CQData], ['广州', GZData], ['南宁', NNData]].forEach(function (item: any, i) {
  dser.push({
    type: 'scatter3D',
    coordinateSystem: 'globe',
    zlevel: 3,
    rippleEffect: {
      brushType: 'stroke'
    },
    label: {
      fontSize: 24,
      show: true,
      position: 'right',
      formatter: '{b}',
      textStyle: {
        color: '#dc6b82'
      }
    },
    itemStyle: {
      color: '#f1c40f'
    },
    data: item[1].map(function (dataItem: any) {
      return {
        name: dataItem[1].name,
        value: geoCoordMap[dataItem[1].name],
        symbolSize: dataItem[1].value / 4
      };
    })
  }, {
    type: 'scatter3D',
    coordinateSystem: 'globe',
    zlevel: 3,
    rippleEffect: {
      brushType: 'stroke'
    },
    label: {
      show: true,
      position: 'left',
      fontSize: 18,
      formatter: '{b}',
      textStyle: {
        color: '#dc6b82'
      }
    },
    itemStyle: {
      color: '#f1c40f'
    },
    data: [{
      name: item[0],
      value: geoCoordMap[item[0]],
      symbolSize: parseInt(Math.random() * 20 + 10),
      label: {
        normal: {
          position: 'right'
        }
      }
    }]
  })
  series.push({
    type: 'lines3D',
    effect: {
      show: true,
      period: 3,//速度
      trailLength: 0.1//尾部阴影          
    },
    lineStyle: {//航线的视图效果
      color: '#9ae5fc',
      width: 1,
      opacity: 0.6
    },
    data: convertData(item[1])// 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
  })
});
series.push(...dser)


const option = {
  backgroundColor: '#000',
  globe: {
    baseTexture: '/eath/eath02.jpg', // 球面基础贴图
    // heightTexture: '/eath/eath01.jpg', // 深度信息，利用图片的颜色
    environment: '/eath/starfield.jpg', // 背景星空
    displacementScale: 0.1,
    shading: 'lambert',
    light: {
      ambient: {
        intensity: 0.1
      },
      main: {
        intensity: 1.5
      }
    },
    layers: [
      {
        type: 'blend',
        blendTo: 'emission',
        texture: '/eath/night.jpg'
      },
      {
        type: 'overlay',
        texture: '/eath/clouds.png',
        shading: 'lambert',
        distance: 5
      }
    ]
  },
  // series: []
  series: series
};

onMounted(() => {
  var chartDom = document.getElementById('container');
  var myChart = echarts.init(chartDom as any, 'dark');
  option && myChart.setOption(option);
})

</script>

<template>
  <div id="container" style="height: 800px; width: 1400px;"></div>
</template>

<style lang="less">
</style>