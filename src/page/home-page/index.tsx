import { cover_home, ic_partner, yard } from "@/assets/image";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
} from "antd";
import React, { memo } from "react";
import "./index.css";
import { useHome } from "./hooks/useHome";
import { ImageSvgLocal } from "@/baseComponent/ImageSvgLocal";
import { ItemField } from "@/components/item-field";
import MyDatePicker from "@/components/basic/date-picker";
import { LoginModal } from "../login/login";
import { RegisterModal } from "../register/register";
import dayjs from "dayjs";

const Component = () => {
  const {
    isModalField,
    isModalLocation,
    _toggleSportToggle,
    toggle,
    data,
    _selectSport,
    typeSport,
    openModalFieldType,
    openModalLocation,
    onCancelFieldType,
    onCancelLocation,
    typeField,
    typeLocation,
    setTypeField,
    setTypeLocation,
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
    onCancelLogin,
    _openRegister,
    onCancelRegister,
    onNavigateBooking,
    onBooking,
  } = useHome();

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

      <section id="select_bar">
        <div className="p-24 flex items-center">
          <div className="flex items-center">
            <Switch
              checkedChildren="Thể thao"
              defaultChecked
              checked={toggle}
              onChange={_toggleSportToggle}
              className="big-switch"
              style={{
                backgroundColor: toggle ? "#0056BD" : "#D8DCE3",
              }}
            />
            {toggle ? (
              <div className="flex items-center">
                {data?.length &&
                  data.map((el: any) => (
                    <div
                      onClick={() => _selectSport(el)}
                      style={{
                        backgroundColor:
                          typeSport?.id == el?.id ? "#E6F4F1" : "transparent",
                      }}
                      className="flex flex-col items-center p-8 ml-40 justify-center rounded-radius-m"
                    >
                      <img
                        src={el?.icon}
                        alt=""
                        style={{
                          height: "40px",
                          width: "40px",
                        }}
                      />
                      <div className="mt-8">{el?.description}</div>
                    </div>
                  ))}
              </div>
            ) : (
              <Form
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                className="px-16 mt-24"
                form={form}
              >
                <Row>
                  <Form.Item name={"search"}>
                    <Input
                      placeholder="Tìm kiếm theo tên sân"
                      className="h-40 w-[300px]"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      className="h-40 ml-16"
                      type="primary"
                      style={{ backgroundColor: "#0056BD", borderRadius: 24 }}
                      onClick={() => {}}
                    >
                      Tìm kiếm
                    </Button>
                  </Form.Item>
                </Row>
              </Form>
            )}
          </div>

          <div className="ml-48">
            <Button
              className="rounded-radius-xxxl border-link-700 px-60 py-4 font-medium text-14"
              type="default"
              onClick={openModalFieldType}
            >
              Loại sân
            </Button>
            <Button
              className="rounded-radius-xxxl border-link-700 px-60 py-4 font-medium text-14 ml-40"
              type="default"
              onClick={openModalLocation}
            >
              Địa điểm
            </Button>
          </div>
        </div>
      </section>

      <section id="body">
        <div className="p-24 overflow-x-auto flex gap-12">
          {fields?.length
            ? fields?.map((el: any, index: number) => (
                <ItemField
                  className="w-1/4 relative"
                  style={{ width: "100%" }}
                  key={index}
                  item={el}
                  onClick={() => getFieldId(el?.id)}
                />
              ))
            : null}
        </div>
      </section>

      <section id="banner">
        <div className="p-24 flex items-stretch mt-32">
          <div
            className="flex justify-between w-1/3 shadow-down-xs p-24 shadow-color-300 rounded-radius-xxxl"
            style={{ backgroundColor: "#0056BD" }}
          >
            <div>
              <div className="break-words text-24 w-full text-color-50 font-medium">
                Đặt sân - Chơi thể thao - Tăng cường sức khoẻ
              </div>
              <div className="flex items-center mt-24">
                <div className="text-16 text-color-50 mr-8">Đặt sân ngay</div>
                <ImageSvgLocal name="ic_right_arrow" width={16} />
              </div>
            </div>
            <img
              src={ic_partner}
              alt=""
              style={{ height: 150, objectFit: "contain" }}
            />
          </div>
          {/* Khối 2 */}
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
              onFinish={onNavigateBooking}
            >
              <Row gutter={24} className="mt-24">
                <Col span={12}>
                  <Form.Item
                    name={"date"}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value) {
                            return Promise.reject(
                              new Error("Vui lòng chọn ngày để tìm sân")
                            );
                          } else if (
                            value &&
                            dayjs(value).isAfter(dayjs(), "day")
                          ) {
                            return Promise.reject(
                              new Error("Không chọn ngày quá khứ")
                            );
                          } else {
                            return Promise.resolve();
                          }
                        },
                      }),
                    ]}
                  >
                    <MyDatePicker
                      placeholder="Chọn Ngày"
                      className="w-full h-44 border-none rounded-radius-xl"
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"time"}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value) {
                            return Promise.reject(
                              new Error("Vui lòng chọn giờ để tìm sân")
                            );
                          } else {
                            return Promise.resolve();
                          }
                        },
                      }),
                    ]}
                  >
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
      </section>

      <Modal
        footer={null}
        open={isModalField}
        onCancel={onCancelFieldType}
        title="Chọn loại sân"
        bodyStyle={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {fieldTypeData?.map((el: any, index: number) => (
          <div
            key={index}
            className="flex items-center border-b-weight-s border-b-color-500 py-16 justify-between"
          >
            <div className="ml-4 text-color-700">{el?.name}</div>

            <Radio
              checked={typeField?.id === el.id}
              onChange={() => {
                setTypeField(el);
                onCancelFieldType();
              }}
            />
          </div>
        ))}
      </Modal>
      <Modal
        footer={null}
        open={isModalLocation}
        onCancel={onCancelLocation}
        title="Chọn địa điểm"
        bodyStyle={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {location?.map((el: any, index: number) => (
          <div
            key={index}
            className="flex items-center border-b-weight-s border-b-color-500 py-16 justify-between"
          >
            <div className="flex items-center">
              <ImageSvgLocal name="ic_location" width={16} />
              <div className="ml-4 text-color-700">{el?.name}</div>
            </div>
            <Radio
              checked={typeLocation?.id === el.id}
              onChange={() => {
                setTypeLocation(el);
                onCancelLocation();
              }}
            />
          </div>
        ))}
      </Modal>
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

export const HomePage = memo(Component);
