import { register } from "@/api/login";
import FloatInput from "@/components/float-input";
import { Button, Form, Modal } from "antd";
import React, { useCallback } from "react";
import { toast } from "react-toastify";

export const RegisterModal = (props: {
  open?: boolean;
  onCancel?: () => void;
  onAnotherClick?: () => void;
}) => {
  const [form] = Form.useForm();

  const onRegister = useCallback(async () => {
    try {
      const values = form.getFieldsValue();
      const res = (await register({
        username: values?.name,
        email: values?.email,
        password: values?.password,
      })) as any;
      if (!res?.user)  {
      }else{
        toast.success('Đăng ký thành công')
      }
    } catch (error) {
    } finally {
      props?.onCancel && props?.onCancel();
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
        onFinish={onRegister}
      >
        <div className="p-16 flex justify-center">
          <div className="text-24" style={{ fontWeight: "bold" }}>
            Đăng ký
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
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Email.",
            },
          ]}
        >
          <FloatInput label="Email" placeholder="Nhập Email" name="email" />
        </Form.Item>
        <Form.Item
          name="password"
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
        </Form.Item>
        <Form.Item
          name="re-password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Mật khẩu",
            },
          ]}
        >
          <FloatInput
            label="Nhập lại Mật khẩu"
            placeholder="Mật khẩu"
            name="re-password"
            password
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="w-full h-40"
            style={{ backgroundColor: "#146AAB" }}
            htmlType="submit"
            type="primary"
            onClick={() => {}}
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
