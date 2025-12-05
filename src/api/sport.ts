import {request} from '@/axios/request'

const base_url = 'http://localhost:3000'

export const _requestListSport = () => request<any>('get', base_url + '/api/fields/list/sport_type')
