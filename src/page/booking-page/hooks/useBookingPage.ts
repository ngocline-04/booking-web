import { createBooking } from "@/api/booking";
import { _requestFieldAvailable, _requestFieldById } from "@/api/field";
import { _requestListSchedule } from "@/api/schedule";
import { getUserInfo } from "@/store/login";
import { Form } from "antd";
import dayjs from "dayjs";
import { get, isEmpty } from "lodash";
import { useCallback, useEffect,  useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useBookingPage = () => {
  const [options, setOptions] = useState<any>([]);
  const [formDate] = Form.useForm();
  const [searchParams] = useSearchParams();

  const date = searchParams.get("date");
  const schedule = searchParams.get("id_schedule");
  const [data, setData] = useState([]);

  const [record, setRecord] = useState<any>();
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const { userInfo } = useSelector(getUserInfo);

  const [booking, setIsBooking] = useState(false);

  const _openLogin = useCallback(() => {
    setIsLogin(true);
    setIsOpenDetail(false);
  }, []);

  const onCancelLogin = () => {
    setIsLogin(false);
  };

  const _openRegister = () => {
    setIsLogin(false);
    setRegister(true);
  };

  const onCancelRegister = () => {
    setRegister(false);
  };
  const getListSchedule = useCallback(async () => {
    const res = await _requestListSchedule();
    const data = get(res, "schedules", []);

    const result = data.map((el: any) => ({
      ...el,
      label: `${el?.time_from} - ${el?.time_to}`,
      value: el?.id,
    }));

    setOptions(result);
  }, []);
console.log("options:", options);
console.log("schedule:", schedule);



  useEffect(() => {
    getListSchedule();
  }, []);

  useEffect(() => {
    formDate.setFieldsValue({
      ...(date && { date: dayjs(date) }),
      ...(schedule && {
        time: schedule,
      }),
    });
  }, [options, schedule]);
  const getListFieldsByKey = useCallback(async () => {
    try {
      const values = formDate.getFieldsValue();
      const res = (await _requestFieldAvailable({
        date: values?.date || "",
        id_schedule: values?.time || "",
      })) as any;
      setData(res?.data);
    } catch (error) {
    } finally {
      setIsBooking(false);
    }
  }, [formDate]);

  useEffect(() => {
    getListFieldsByKey();
  }, []);

  const getFieldId = useCallback(async (item: any) => {
    const res = await _requestFieldById(item?.field_id);

    const data = get(res, "data") as any;
    if (data?.id) {
      setIsOpenDetail(true);
      setRecord(item);
    }
  }, []);

  const onCancelDetail = () => {
    setIsOpenDetail(false);
  };

  const onBooking = useCallback(async () => {
    if (isEmpty(userInfo)) {
      _openLogin();
      return;
    }
    setIsBooking(true);
    onCancelDetail();
  }, [userInfo]);

  const onCreate = useCallback(async () => {
    try {
      const res = (await createBooking({
        id_field: record?.field_id,
        id_schedule: record?.schedule_for_field_id,
        hour: 2,
        time: dayjs().format("HH:mm"),
        date: dayjs().format("DD/MM/YYYY"),
      })) as any;
      if (res?.booking) {
        toast.success("Đặt lịch thành công");
        setIsBooking(false);
      }
    } catch (error) {}
  }, [record]);
  return {
    options,
    formDate,
    getListFieldsByKey,
    data,
    record,
    isOpenDetail,
    getFieldId,
    onCancelDetail,
    isLogin,
    _openLogin,
    isRegister,
    _openRegister,
    onCancelRegister,
    onCancelLogin,
    onBooking,
    setIsBooking,
    booking,
    onCreate,
  };
};
