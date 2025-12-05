import {request} from '@/axios/request'

const base_url = 'http://localhost:3000' + '/api/locations'

export const _requestListLocation = () => request<any>('get', base_url + '/list-location')



