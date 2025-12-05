import {request} from '@/axios/request'

const base_url = 'http://localhost:3000' + '/api/auth'

export const register = async (data: {username: string, email: string, password: string}) => {
  return request("post",base_url + "/register", data);
};

export const login = async (data: {email: string, password: string}) => {
  return request("post",base_url + "/login", data);
};




