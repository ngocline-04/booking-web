import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  theme as antTheme,
  Menu,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
import ReactSvg from "@/assets/logo/logo-sport.png";
import { useEffect, useState, useCallback } from "react";
import { decodeToken } from "@/utils";
import { CalendarFilled, PoweroffOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, setUserInfo } from "@/store/login";
import { ImageSvgLocal } from "@/baseComponent/ImageSvgLocal";
import FloatInput from "@/components/float-input";
import { LoginModal } from "../login/login";
import { RegisterModal } from "../register/register";
// import { logoutService } from "@/api/login";
// import { isPermited } from "@/utils/common";
// import { ROLE } from "@/constant";
// import { _requestDetailUser } from "@/api/user";

const { Sider, Content, Header } = Layout;

function Nav() {
  const { userInfo } = useSelector(getUserInfo);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setRegister] = useState(false);

  const dispatch = useDispatch();

  const _openLogin = useCallback(() => {
    setIsLogin(true);
  }, []);

  const onCancelLogin = () => {
    setIsLogin(false);
  };

  const _openRegister = () => {
    setIsLogin(false);
    setRegister(true);
  };

  console.log(isRegister);
  const onCancelRegister = () => {
    setRegister(false);
  };

  useEffect(() => {
    //const token = localStorage.getItem("token");
    //const result = decodeToken(token!);
    // dispatch(
    //   setUserInfo({
    //     name: result?.preferred_username,
    //     fullName: result?.given_name,
    //     email: result?.email,
    //     role: result?.realm_access?.roles,
    //   })
    // );
  }, []);

  const tokenAntd = antTheme.useToken();
  const location = useLocation();
  const navigate = useNavigate();

  const items: any[] = [];

  const onMenuClick = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const rootKey = `/${location.pathname.split("/")[1]}`;
    setOpenKeys([rootKey]);
  }, [location.pathname]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };
  const getDetailUser = React.useCallback(async () => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   const result = decodeToken(token!);
    //   try {
    //     const response = (await _requestDetailUser({
    //       userName: result?.preferred_username,
    //     })) as any;
    //     if (response?.user?.status != "ACTIVE") {
    //       navigate("/error");
    //       return;
    //     }
    //   } catch (error) {
    //     navigate("/error");
    //   }
    // }
  }, []);

  useEffect(() => {
    // getDetailUser();
  }, [getDetailUser]);
  return (
    <Layout style={{ height: "100%" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0056BD",
        }}
      >
        <div className="logo" style={{ width: 200 }}>
          <img
            src={ReactSvg}
            alt=""
            style={{
              marginRight: "20px",
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        {userInfo?.username ? (
          <div className="flex items-center">
            <Button onClick={() => navigate('/booking-list')} icon={<CalendarFilled/>} className="text-14 text-color-100 mr-16" type="text">Lịch đã đặt</Button>
            <div className="text-14 text-color-100 border-weight-m w-[100px] rounded-radius-m border-color-50 h-40 text-center flex justify-center items-center">
            {userInfo?.username}
          </div>
          </div>
        ) : (
          <Button
            className="text-14 text-color-100 border-weight-m border-color-50"
            type="text"
            onClick={_openLogin}
          >
            Đăng nhập
          </Button>
        )}
      </Header>
      {/* <Layout> */}
      <Layout>
        <Content
          style={{
            padding: 0,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      {/* </Layout> */}
      {/* <Layout>
        <Sider style={{ backgroundColor: tokenAntd.token.colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={(e) => onMenuClick(e.key)}
            items={items}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout> */}
      <LoginModal
        open={isLogin}
        onCancel={onCancelLogin}
        onAnotherClick={_openRegister}
      />
      <RegisterModal open={isRegister} onCancel={onCancelRegister} />
    </Layout>
  );
}
export default Nav;
