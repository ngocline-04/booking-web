import { request } from "@/axios/request";

const base_url = "http://localhost:3000" + "/api/schedules";

export const _requestListSchedule = () => request<any>("get", base_url + '/schedule/list')
