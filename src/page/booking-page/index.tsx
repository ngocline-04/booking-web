import { cover_home, yard } from "@/assets/image";
import MyDatePicker from "@/components/basic/date-picker";
import { Button, Col, Form, Modal, Row, Select } from "antd";
import { memo } from "react";
import { useBookingPage } from "./hooks/useBookingPage";
import { ItemField } from "@/components/item-field";
import { ImageSvgLocal } from "@/baseComponent/ImageSvgLocal";
import { LoginModal } from "../login/login";
import { RegisterModal } from "../register/register";
import dayjs from "dayjs";
import { formatMoney } from "@/utils";
import { useSelector } from "react-redux";
import { getUserInfo } from "@/store/login";

const Component = () => {
  const {
    options,
    formDate,
    getListFieldsByKey,
    data,
    getFieldId,
    isOpenDetail,
    record,
    onCancelDetail,
    isLogin,
    isRegister,
    _openRegister,
    onCancelRegister,
    onCancelLogin,
    onBooking,
    booking,
    onCreate
  } = useBookingPage();

  const { userInfo } = useSelector(getUserInfo);

  return (
    <div className="block-content bg-color-50">
      <div>
        <img
          src={cover_home}
          alt=""
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className="flex justify-center py-32">
        <div
          className="flex flex-col w-2/3 shadow-down-xs p-24 shadow-color-300 rounded-radius-xxxl ml-24"
          style={{ backgroundColor: "#E6F4F1" }}
        >
          <div className="text-24 font-medium">Tìm kiếm sân trống!</div>
          <Form
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            form={formDate}
            onFinish={getListFieldsByKey}
          >
            <Row gutter={24} className="mt-24">
              <Col span={12}>
                <Form.Item name={"date"}>
                  <MyDatePicker
                    placeholder="Chọn Ngày"
                    className="w-full h-44 border-none rounded-radius-xl"
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={"time"}>
                  <Select
                    size="large"
                    showSearch
                    allowClear
                    optionFilterProp="label"
                    options={options}
                    placeholder="Chọn Giờ"
                    className="custom-select"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item className="flex justify-center">
              <Button
                type="text"
                htmlType="submit"
                className="text-color-50 rounded-radius-m font-semibold h-40"
                style={{ backgroundColor: "#008000", width: 150 }}
              >
                Tìm sân
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {booking ? (
        <div className="flex items-stretch">
          <div className="flex justify-between w-1/2 m-24">
            <div className="flex items-stretch">
              <div className="w-1/2">
                {[record]?.length
                  ? [record].map((el: any, index: number) => (
                      <ItemField key={index} item={el} onClick={() => {}} />
                    ))
                  : null}
              </div>
              <div className="">
                {/*gio*/}
                <div className="flex items-center">
                  <div
                    className="rounded-radius-m p-4 ml-16"
                    style={{ backgroundColor: "#E6F4F1" }}
                  >
                    Khung giờ
                  </div>
                  <div className="ml-8">
                    {dayjs(record?.time_from, "HH:mm:ss").format("HH:mm")} -{" "}
                    {dayjs(record?.time_to, "HH:mm:ss").format("HH:mm")}
                  </div>
                </div>
                {/*loai*/}
                <div className="">
                  <div className="items-center flex justify-center aspect-square ml-16 bg-color-200 border-weight-l border-success-700 rounded-radius-m mt-32">
                    <div className="font-semibold">
                      {record?.field_type_name}
                    </div>
                  </div>
                  <div className="items-center flex justify-center ml-16 mt-4 uppercase font-semibold">
                    {formatMoney(record?.price_per_hour)}đ/h
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col w-1/2 bg-color-200 rounded-radius-m m-24 p-16">
            <div>
              <div className="font-semibold">
                Khách hàng: {userInfo?.username}
              </div>
              <div className="font-semibold">Sân: {record?.field_name}</div>
              <div className="font-semibold">
                Đơn giá: {formatMoney(record?.price_per_hour)}đ/h
              </div>
              <div className="font-semibold">
                Giờ đặt: {dayjs().format("DD/MM/YYYY HH:mm:ss")}
              </div>
            </div>
            <Button
            className="h-40 text-color-50 font-medium mt-16"
            style={{ backgroundColor: "#0056BD" }}
            type="text"
            onClick={onCreate}
          >
            Đặt sân
          </Button>
          </div>
          
        </div>
      ) : (
        <div className="p-24 overflow-y-auto grid grid-cols-4 gap-24 pb-32">
          {data?.length
            ? data.map((el: any, index: number) => (
                <ItemField
                  key={index}
                  item={el}
                  onClick={() => getFieldId(el)}
                  className="mb-32"
                />
              ))
            : null}
        </div>
      )}
      <Modal
        open={isOpenDetail}
        onCancel={onCancelDetail}
        footer={null}
        title={"Chi tiết"}
        width={800}
      >
        <div className="flex items-stretch mt-24">
          <div className="flex flex-col justify-between">
            <img
              src={yard}
              alt=""
              style={{
                borderRadius: 16,
                height: 196,
              }}
            />
            <Button
              className="h-40 w-full text-color-50 font-medium mt-16"
              style={{ backgroundColor: "#0056BD" }}
              type="text"
              onClick={onBooking}
            >
              Đặt Sân
            </Button>
          </div>
          <div className="ml-16">
            <div className="font-semibold text-18">{record?.name}</div>
            <div className="text-color-600 mt-4">{record?.sport_type_name}</div>
            <div className="flex items-center mt-4">
              <ImageSvgLocal name="ic_star" width={16} />
              <div className="font-medium ml-4">4.0 (175)</div>
              <div className="text-color-600">~{record?.location_name}</div>
            </div>
            <div className="my-24">{record?.description}</div>
            <div className="flex items-center overflow-y-auto">
              {[1, 2].map(() => (
                <div className="mr-24 shadow-down-xs shadow-color-200 border-weight-s border-color-300 p-8 rounded-radius-l">
                  <div className="ml-8">
                    <div className="font-medium">Alex Sandre</div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((el) => (
                        <ImageSvgLocal name="ic_star" width={12} />
                      ))}
                    </div>
                    <div className="mt-24 text-color-700">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      <LoginModal
        open={isLogin}
        onCancel={onCancelLogin}
        onAnotherClick={_openRegister}
      />
      <RegisterModal open={isRegister} onCancel={onCancelRegister} />
    </div>
  );
};

export const BookingPage = memo(Component);
