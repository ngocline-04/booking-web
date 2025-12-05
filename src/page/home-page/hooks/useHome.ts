import {
  _requestFieldById,
  _requestFieldType,
  _requestListField,
} from "@/api/field";
import { _requestListLocation } from "@/api/location";
import { _requestListSchedule } from "@/api/schedule";
import { _requestListSport } from "@/api/sport";
import {
  ic_badminton,
  ic_basketball,
  ic_football,
  ic_pickleball,
  ic_tennis,
  ic_volleyball,
} from "@/assets/image";
import { Form } from "antd";
import dayjs from "dayjs";
import { get } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHome = () => {
  const [toggle, setToggle] = useState(true);
  const [isModalLocation, setIsModalLocation] = useState(false);
  const [isModalField, setIsModalField] = useState(false);

  const [data, setData] = useState<any>([]);
  const [typeSport, setTypeSport] = useState<any>();
  const [typeLocation, setTypeLocation] = useState<any>();
  const [typeField, setTypeField] = useState<any>();

  const [location, setLocation] = useState<any>([]);
  const [fieldTypeData, setFieldTypeData] = useState<any>([]);
  const [fields, setFields] = useState<any>([]);

  const [form] = Form.useForm();
  const [options, setOptions] = useState<any>([]);
  const [formDate] = Form.useForm();

  const [record, setRecord] = useState<any>();
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const navigate = useNavigate();

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

  const iconSport = {
    1: ic_football,
    2: ic_tennis,
    3: ic_badminton,
    4: ic_basketball,
    5: ic_volleyball,
    6: ic_pickleball,
  };

  const getListSport = useCallback(async () => {
    const res = await _requestListSport();
    const data = get(res, "data", []);

    const result = data?.map((el: any) => ({
      ...el,
      icon: iconSport?.[el?.id as keyof typeof iconSport],
    }));

    setData(result);
  }, []);

  useEffect(() => {
    getListSport();
  }, []);

  const getListLocations = useCallback(async () => {
    const res = await _requestListLocation();
    const data = get(res, "data");

    setLocation(data);
  }, []);

  useEffect(() => {
    getListLocations();
  }, []);

  const getListFieldType = useCallback(async () => {
    const res = await _requestFieldType();
    const data = get(res, "data");

    setFieldTypeData(data);
  }, []);

  useEffect(() => {
    getListFieldType();
  }, []);

  const _toggleSportToggle = useCallback((value: boolean) => {
    setToggle(value);
  }, []);

  const _selectSport = (value: any) => {
    setTypeSport(value);
  };

  const openModalLocation = () => {
    setIsModalLocation(true);
  };

  const onCancelLocation = () => {
    setIsModalLocation(false);
  };

  const openModalFieldType = () => {
    setIsModalField(true);
  };

  const onCancelFieldType = () => {
    setIsModalField(false);
  };

  const getListFields = useCallback(async () => {
    const value = form.getFieldValue("search");
    const res = await _requestListField({
      page: 1,
      limit: 6,
      id_location: typeLocation?.id,
      id_type_sport: typeSport?.id,
      id_type_field: typeField?.id,
      search: value,
    });

    const data = get(res, "data", []);
    setFields(data);
  }, []);

  useEffect(() => {
    getListFields();
  }, []);

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

  useEffect(() => {
    getListSchedule();
  }, []);

  const getFieldId = useCallback(async (id: string | number) => {
    const res = await _requestFieldById(id);

    const data = get(res, "data") as any;
    if (data?.id) {
      setIsOpenDetail(true);
      setRecord(data);
    }
  }, []);

  const onCancelDetail = () => {
    setIsOpenDetail(false);
  };

  const onNavigateBooking = useCallback(() => {
    const data = formDate.getFieldsValue();

    navigate(`/booking-page?date=${dayjs(data?.date).format('YYYY-MM-DD')}&id_schedule=${data?.time}`);
  }, [formDate]);

  return {
    _toggleSportToggle,
    toggle,
    isModalField,
    isModalLocation,
    data,
    typeSport,
    _selectSport,
    openModalFieldType,
    openModalLocation,
    onCancelFieldType,
    onCancelLocation,
    setTypeField,
    setTypeLocation,
    typeField,
    typeLocation,
    location,
    fieldTypeData,
    form,
    fields,
    options,
    formDate,
    getFieldId,
    record,
    isOpenDetail,
    onCancelDetail,
    isLogin,
    isRegister,
    _openLogin,
    onCancelLogin,
    _openRegister,
    onCancelRegister,
    navigate,
    onNavigateBooking,
  };
};
