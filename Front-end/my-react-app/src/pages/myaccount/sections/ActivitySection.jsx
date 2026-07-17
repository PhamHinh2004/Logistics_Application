import { useState } from "react";
import SectionCard from "../components/SectionCard.jsx";


function fmt(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ActivitySection({ account }) {
  const items = [
    { action: "Đăng nhập thành công", time: "Hôm nay, 08:42", icon: "🔐", color: "text-green-600" },
    { action: "Cập nhật thông tin công ty", time: "20/06/2025", icon: "✏️", color: "text-blue-600" },
    { action: "Đổi mật khẩu", time: "15/03/2025", icon: "🔑", color: "text-amber-600" },
    { action: "Tạo tài khoản", time: fmt(account.created_at), icon: "🎉", color: "text-purple-600" },
  ];
  return (
    <SectionCard title="Lịch sử hoạt động" description="Các hoạt động gần đây trên tài khoản">
      <div className="flex flex-col gap-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-base flex-shrink-0">
              {item.icon}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${item.color}`}>{item.action}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
