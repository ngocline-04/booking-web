import { login } from "@/api/login";
import FloatInput from "@/components/float-input";
import { setUserInfo } from "@/store/login";
import { Button, Form, Modal } from "antd";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const LoginModal = (props: {
  open: boolean;
  onCancel: () => void;
  onAnotherClick: () => void;
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onLogin = useCallback(async () => {
    try {
      const values = form.getFieldsValue();
      const res = await login({
        email: values?.name,
        password: values?.password,
      }) as any;
      if(res?.user){
        dispatch(setUserInfo({...res?.user}))
        localStorage.setItem("token", res?.token);
      }else{
        toast.error('Đăng nhập không thành công')
      }
    } catch (error) {}finally{
      props?.onCancel && props?.onCancel()
    }
  }, []);
  return (
    <Modal footer={null} open={props?.open} onCancel={props?.onCancel}>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        className="px-32"
        onFinish={onLogin}
      >
        <div className="p-16 flex justify-center">
          <div className="text-24" style={{ fontWeight: "bold" }}>
            Đăng nhập
          </div>
        </div>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Tên đăng nhập.",
            },
          ]}
        >
          <FloatInput
            label="Tên đăng nhập"
            placeholder="Tên đăng nhập"
            name="name"
          />
        </Form.Item>
        <Form.Item
          name="password"
          //label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Mật khẩu",
            },
          ]}
        >
          <FloatInput
            label="Mật khẩu"
            placeholder="Mật khẩu"
            name="password"
            password
          />
          {/* <Input.Password className="h-40" /> */}
        </Form.Item>
        <Form.Item>
          <Button
            className="w-full h-40"
            style={{ backgroundColor: "#146AAB" }}
            htmlType="submit"
            type="primary"
            onClick={() => {}}
          >
            Đăng nhập
          </Button>
          <div className="flex justify-end">
            <Button
              type="text"
              className="flex justify-end mt-8 text-link-700 p-0"
              onClick={props?.onAnotherClick}
            >
              Đăng ký?
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
