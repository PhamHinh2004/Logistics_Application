import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
function OAuth2RedirectHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Lấy token từ URL query parameter (?token=...&refreshToken=...)
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const createdCustomer = searchParams.get("createdCustomer");
    const id = searchParams.get("id");

    if (token) {
      // Lưu token và refreshToken vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      console.log("Token lưu vào localStorage:", token);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // // Fetch account info with the obtained token
      // getAccountInfo(token).catch(err => console.error("Error fetching account info:", err));
      if (createdCustomer === "false") {
        navigate("/onboarding");
      }
      else {
        // Chuyển hướng người dùng đến trang chính hoặc trang mong muốn
        login({ name: "User" }, token, refreshToken); // Cập nhật thông tin người dùng trong context
        navigate("/");
      }
    } else {
      // Nếu không có token, quay về trang đăng nhập kèm thông báo lỗi
      navigate("/login?error=oauth2_failed");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-[#e8e8ec] flex flex-col items-center justify-center font-sans">
      <div className="bg-[#f4f4f6] p-8 rounded-2xl shadow-lg flex flex-col items-center gap-4">
        <svg className="w-12 h-12 text-blue-800 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-lg font-medium text-gray-700">Đang xử lý đăng nhập...</h3>
        <p className="text-sm text-gray-400">Vui lòng đợi trong giây lát</p>
      </div>
    </div>
  );
}

export default OAuth2RedirectHandler;
