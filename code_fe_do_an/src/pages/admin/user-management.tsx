import React, { useEffect, useState } from "react";
import {
  Select,
  Space,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Spin,
} from "antd";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

interface User {
  id: number;
  userName: string;
  email: string;
  phone: string;
  campus: string;
  name?: string;
  password?: string;
  phoneNumber?: string;
  isActive?: boolean;
}

const UserDefaultData: User = {
  id: 0,
  userName: "",
  email: "",
  phone: "",
  campus: "",
};

interface ModalEditProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data: User | null;
  setReload: (reload: boolean) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setReload,
}) => {
  const [userData, setUserData] = useState<User>(UserDefaultData);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setUserData({
        id: data.id,
        name: data.name || "",
        userName: data.userName,
        password: "",
        email: data.email,
        phoneNumber: data.phoneNumber || "",
        campus: data.campus,
        isActive: data.isActive,
      });
    }
  }, [data]);

  const handleUpdateUserData = async () => {
    if (
      !userData.userName ||
      !userData.name ||
      !userData.email ||
      !userData.phoneNumber ||
      !userData.password
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(userData.phoneNumber)) {
      alert("Phone number is invalid");
      return;
    }

    try {
      const endpoint = data
        ? `/User/UpdateUser/${data.id}`
        : "/User/CreateUser";
      const response = await axios[data ? "put" : "post"](endpoint, userData);

      if (response.status === 200 && response.data.isSucceed) {
        alert(data ? "Update successful" : "Create successful");
        setReload(true);
        setIsModalOpen(false);
      } else {
        alert("Operation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title={data ? "Update User" : "Create User"}
      visible={isModalOpen}
      onOk={handleUpdateUserData}
      onCancel={handleCancel}
    >
      <Form style={{ maxWidth: 600 }} layout="vertical" autoComplete="off">
        <Form.Item label="User Name">
          <Input
            value={userData.userName}
            onChange={handleChangeInput}
            name="userName"
          />
        </Form.Item>

        <Form.Item label="Name">
          <Input
            value={userData.name}
            onChange={handleChangeInput}
            name="name"
          />
        </Form.Item>

        <Form.Item label="Campus">
          <Select
            onChange={(value) => setUserData({ ...userData, campus: value })}
            value={userData.campus}
          >
            <Select.Option value="HN">HN</Select.Option>
            <Select.Option value="HCM">HCM</Select.Option>
            <Select.Option value="CT">CT</Select.Option>
            <Select.Option value="DN">DN</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Email">
          <Input
            value={userData.email}
            onChange={handleChangeInput}
            name="email"
          />
        </Form.Item>

        <Form.Item label="Phone Number">
          <Input
            value={userData.phoneNumber}
            onChange={handleChangeInput}
            name="phoneNumber"
          />
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password
            value={userData.password}
            onChange={handleChangeInput}
            name="password"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UserManagementPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);

  const handleDeleteUser = async (id: number) => {};

  const columns = [
    {
      title: "Id",
      dataIndex: "account_id",
      key: "account_id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string) => (
        <img
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          src={
            text ||
            "https://png.pngtree.com/png-clipart/20190902/original/pngtree-cute-girl-avatar-element-icon-png-image_4393286.jpg"
          }
          alt="avatar"
        />
      ),
    },
    {
      title: "User Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text: string) => <p style={{ fontWeight: "bold" }}>{text}</p>,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Role",
      dataIndex: "role_id",
      key: "role_id",
      render: (roleId: number) => {
        const bgColor =
          roleId === 1
            ? "cyan"
            : roleId === 2
            ? "green"
            : roleId === 3
            ? "volcano"
            : roleId === 4
            ? "magenta"
            : "";
        const content =
          roleId === 1
            ? "Admin"
            : roleId === 2
            ? "Content manager"
            : roleId === 3
            ? "Content creator"
            : roleId === 4
            ? "User"
            : "";
        return (
          <Tag color={bgColor} key={roleId}>
            {content}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status_id",
      key: "status_id",
      render: (roleId: number) => {
        const bgColor =
          roleId === 1
            ? "cyan"
            : roleId === 2
            ? "green"
            : roleId === 3
            ? "volcano"
            : roleId === 4
            ? "magenta"
            : roleId === 5
            ? "magenta"
            : "";
        const content =
          roleId === 1
            ? "Pending"
            : roleId === 2
            ? "active"
            : roleId === 3
            ? "deactive"
            : roleId === 4
            ? "done"
            : roleId === 5
            ? "undone"
            : "";
        return (
          <Tag
            color={bgColor}
            key={roleId}
            style={{ textTransform: "capitalize" }}
          >
            {content}
          </Tag>
        );
      },
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <Space size="middle">
          <a
            onClick={() => {
              setIsModalOpen(true);
              setSelectedItem(record);
            }}
          >
            <AiOutlineEdit style={{ fontSize: "20px", color: "orange" }} />
          </a>

          <a onClick={() => handleDeleteUser(record.id)}>
            <AiOutlineDelete style={{ fontSize: "20px", color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];

  const handleFetchData = async () => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }
      const request = await axios.get("/account", {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      if (response.statusCode === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (reload) {
      handleFetchData();
      setReload(false);
    }
  }, [reload]);

  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setSelectedItem(null);
        }}
        type="primary"
        style={{ marginBottom: "1%" }}
      >
        Create User
      </Button>
      <Table
        loading={reload}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 8, pageSizeOptions: [10, 20, 50, 100] }}
      />
      <ModalEdit
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={selectedItem}
        setReload={setReload}
      />
      
    </>
  );
};

export default UserManagementPage;
