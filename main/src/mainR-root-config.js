import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return import(/* webpackIgnore: true */ name);
  },
});

// Kiểm tra token trước khi đăng ký ứng dụng
function checkAuth() {
  const token = localStorage.getItem("token"); // hoặc sessionStorage, cookie
  const isAuthenticated = !!token; // Kiểm tra token có tồn tại và hợp lệ

  // Nếu không có token và không ở trang account, chuyển hướng đến trang account
  if (!isAuthenticated && window.location.pathname !== "/account") {
    window.history.pushState({}, "", "/account");
  }

  // Nếu có token và đang ở trang account, chuyển hướng về trang chủ
  if (isAuthenticated && window.location.pathname === "/account") {
    window.history.pushState({}, "", "/");
  }
}

// Kiểm tra auth khi khởi tạo
checkAuth();

// Kiểm tra auth mỗi khi route thay đổi
window.addEventListener("single-spa:routing-event", checkAuth);

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();

start();
