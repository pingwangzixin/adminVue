import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/crazy-ea/room/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}


export const searchPoi = (keyword) => {
  return request({
    url: '/api/crazy-ea/room/searchPoi',
    method: 'get',
    params: {
      keyword: keyword
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/crazy-ea/room/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/crazy-ea/room/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/crazy-ea/room/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/crazy-ea/room/submit',
    method: 'post',
    data: row
  })
}

