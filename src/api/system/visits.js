import request from '@/router/axios';

// 获取IP流量统计数据
export const get = () => {
  return request({
    url: '/api/monitor/visits',
    method: 'get',
  })
}

// 记录访问，只有页面刷新或者第一次加载才会记录
export const count = () => {
  return request({
    url: '/api/monitor/visits',
    method: 'post'
  })
}

// 获取图表数据
export const getChartData = () => {
  return request({
    url: '/api/monitor/visits/chartData',
    method: 'get'
  })
}
