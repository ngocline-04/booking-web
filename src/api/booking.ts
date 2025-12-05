import { request } from "@/axios/request";

const BASE_URL = "http://localhost:3000/api/booking";

// 🟩 Tạo booking – cần token
export const createBooking = (data: {
  id_field: any,
  time: any,
  hour: any,
  date: any,
  id_schedule: any
}) => {
  return request("post", `${BASE_URL}/create`, data);
};

export const getMyBookings = () => {
  return request("get", BASE_URL + "/list-booking");
};
