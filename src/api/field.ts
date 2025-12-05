import { request } from "@/axios/request";
import dayjs from "dayjs";

const base_url = "http://localhost:3000" + "/api/fields";

export const _requestFieldType = () => request("get", base_url + "/field-type");

export const _requestListField = (params: {
  search?: string;
  page?: number;
  limit?: number;
  id_type_field?: number;
  id_type_sport?: number;
  id_location?: number;
}) => {
  const { search, page, limit, id_type_field, id_type_sport, id_location } =
    params;
  return request(
    "get",
    base_url +
      "/list_fields" +
      `?search=${search || ""}&page=${page}&limit=${limit}&id_type_field=${
        id_type_field || null
      }&id_type_sport=${id_type_sport || null}&id_location=${
        id_location || null
      }`
  );
};

export const _requestFieldById = (id: string | number) =>
  request<any>("get", base_url + `/detail_field/${id}`);

export const _requestFieldAvailable = (params: {
  date: string;
  id_schedule: string;
}) =>
  request<any>(
    "get",
    base_url +
      `/list_available?date=${
        params?.date ? dayjs(params?.date).format("YYYY-MM-DD") : params?.date
      }&id_schedule=${params?.id_schedule}`
  );
