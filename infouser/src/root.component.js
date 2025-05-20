import { useEffect, useState } from "react";
import logo from "./images/logo-evoerp.png";
import "regenerator-runtime/runtime";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";

export default function Root() {
  const [activeTab, setActiveTab] = useState("info");
  const [infoUser, setInfoUser] = useState();
  const [changePassword, setChangePassword] = useState({
    email: JSON.parse(localStorage.getItem("userLogin"))?.email,
    oldPassword: "",
    newPassword: "",
    submitNewPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    window.location.pathname = "/account";
    localStorage.clear();
  };

  const handleChangeValue = (value, key) => {
    setInfoUser((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleChangePassword = (value, key) => {
    setChangePassword((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmitInfoUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${infoUser?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoUser),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error("Thông tin không hợp lệ !");
      } else {
        toast.success("Cập nhật thông tin thành công !");
        localStorage.setItem("userLogin", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitChangePassword = async () => {
    if (changePassword.newPassword !== changePassword.submitNewPassword) {
      toast.error("Xác nhận mật khẩu không khớp !");
    } else {
      setIsLoading(true);
      try {
        delete changePassword.submitNewPassword;
        const response = await fetch(
          `http://localhost:3000/api/change-password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(changePassword),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          handleChangePassword("", "newPassword");
          handleChangePassword("", "oldPassword");
          handleChangePassword("", "submitNewPassword");
        }
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    setInfoUser(userLogin);
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex bg-gray-100 p-8 h-[calc(100vh-290px)]">
        <div className="w-80 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
            <img
              src={logo}
              alt="User"
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-lg font-semibold text-gray-800">
              {JSON.parse(localStorage.getItem("userLogin"))?.fullName}
            </span>
          </div>
          <ul className="space-y-2">
            {["info", "password", "logout"].map((tab) => (
              <li
                key={tab}
                className={`p-3 rounded-md font-medium cursor-pointer text-gray-600 hover:bg-indigo-700 hover:text-white ${
                  activeTab === tab ? "bg-indigo-700 text-white" : ""
                }`}
                onClick={() => {
                  if (tab === "logout") {
                    handleLogout();
                  } else {
                    setActiveTab(tab);
                  }
                }}
              >
                {tab === "info" && "Thông tin người dùng"}
                {tab === "password" && "Đổi mật khẩu"}
                {tab === "logout" && "Đăng xuất"}
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 ml-8">
          {activeTab === "info" && (
            <div className="bg-white py-6 px-10 rounded-lg shadow-md h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Thông tin người dùng
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    name="username"
                    placeholder="Họ và tên"
                    value={infoUser?.fullName}
                    onChange={(e) =>
                      handleChangeValue(e.currentTarget.value, "fullName")
                    }
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  />
                  <input
                    type="date"
                    name="birthday"
                    value={infoUser?.birthday}
                    onChange={(e) =>
                      handleChangeValue(e.currentTarget.value, "birthday")
                    }
                    placeholder="Ngày sinh"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input
                    type="number"
                    name="username"
                    placeholder="Số điện thoại"
                    value={infoUser?.phoneNumber}
                    onChange={(e) =>
                      handleChangeValue(e.currentTarget.value, "phoneNumber")
                    }
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={infoUser?.email}
                    onChange={(e) =>
                      handleChangeValue(e.currentTarget.value, "email")
                    }
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  />
                </div>
                <div className="flex gap-20">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="gender"
                        value="male"
                        className="form-checkbox h-5 w-5 text-indigo-700"
                        checked={infoUser?.male}
                        onChange={() => {
                          handleChangeValue(true, "male");
                          handleChangeValue(false, "female");
                        }}
                      />
                      <span className="ml-2">Nam</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="gender"
                        value="female"
                        checked={infoUser?.female}
                        onChange={() => {
                          handleChangeValue(true, "female");
                          handleChangeValue(false, "male");
                        }}
                        className="form-checkbox h-5 w-5 text-indigo-700"
                      />
                      <span className="ml-2">Nữ</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ"
                    value={infoUser?.address}
                    onChange={(e) =>
                      handleChangeValue(e.currentTarget.value, "address")
                    }
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="btn"
                    disabled={isLoading}
                    onClick={() => handleSubmitInfoUser()}
                  >
                    {isLoading ? "Đang xử lý..." : "Lưu thay đổi"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Đổi mật khẩu
              </h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={changePassword.oldPassword}
                    onChange={(e) =>
                      handleChangePassword(e.currentTarget.value, "oldPassword")
                    }
                    placeholder="Mật khẩu hiện tại"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={changePassword.newPassword}
                    onChange={(e) =>
                      handleChangePassword(e.currentTarget.value, "newPassword")
                    }
                    placeholder="Mật khẩu mới"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={changePassword.submitNewPassword}
                    onChange={(e) =>
                      handleChangePassword(
                        e.currentTarget.value,
                        "submitNewPassword"
                      )
                    }
                    placeholder="Xác nhận mật khẩu mới"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="btn"
                    disabled={isLoading}
                    onClick={() => handleSubmitChangePassword()}
                  >
                    {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
