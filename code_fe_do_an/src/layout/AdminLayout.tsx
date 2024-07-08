import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  BookOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hook/AuthContext";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const AdminLayout = ({ children }) => {
  const auth = useAuth()
  const {handleLogout} = auth
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ maxWidth: "300px", width: "300px", minWidth: "300px" }}
      >
        <div className="demo-logo-vertical" style={{ padding: "30px" }}>
          <h1
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            FPT Nihongo Dekiru
          </h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin/user-management">User</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<BookOutlined />} title="Course">
            <Menu.Item key="3" icon={<PlusOutlined />}>
              <Link to="/admin/course-management/manage">Manage</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              <Link to="/admin/course-management/create">Create</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="logout"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
