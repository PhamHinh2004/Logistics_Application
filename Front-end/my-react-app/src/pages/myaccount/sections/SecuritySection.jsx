import { useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import Label from "../components/Label.jsx";
import EditableInput from "../components/EditableInput.jsx";
import SaveBtn from "../components/SaveBtn.jsx";

export default function SecuritySection() {
  const [form, setForm] = useState({ current: "", newPw: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.newPw || !form.confirm) return setMsg({ type: "error", text: "Vui lòng điền đầy đủ mật khẩu mới." });
    if (form.newPw.length < 8) return setMsg({ type: "error", text: "Mật khẩu mới phải có tối thiểu 8 ký tự." });
    if (form.newPw !== form.confirm) return setMsg({ type: "error", text: "Mật khẩu xác nhận không khớp." });
    
    setLoading(true);
    setMsg(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:9000/account/update-password?newPassword=${encodeURIComponent(form.newPw)}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === "success") {
          setMsg({ type: "success", text: "Đổi mật khẩu thành công!" });
          setForm({ current: "", newPw: "", confirm: "" });
        } else {
          setMsg({ type: "error", text: data.message || "Đổi mật khẩu thất bại." });
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        setMsg({ type: "error", text: errData.message || "Đổi mật khẩu thất bại." });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMsg({ type: "error", text: "Không thể kết nối đến server!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard title="Bảo mật" description="Đổi mật khẩu tài khoản của bạn">
      <div className="max-w-sm flex flex-col gap-4">
        {msg && (
          <div className={`text-xs px-3 py-2 rounded-lg ${msg.type === "error" ? "bg-red-900/30 text-red-500 border border-red-200" : "bg-green-50 text-green-600 border border-green-200"}`}>
            {msg.text}
          </div>
        )}
        {/* Ô Mật khẩu hiện tại tạm thời giữ lại ở giao diện để đảm bảo thiết kế */}
        <div><Label>Mật khẩu hiện tại</Label><EditableInput value={form.current} onChange={f("current")} type="password" placeholder="••••••••" /></div>
        <div><Label>Mật khẩu mới</Label><EditableInput value={form.newPw} onChange={f("newPw")} type="password" placeholder="Tối thiểu 8 ký tự" /></div>
        <div><Label>Xác nhận mật khẩu mới</Label><EditableInput value={form.confirm} onChange={f("confirm")} type="password" placeholder="Nhập lại mật khẩu mới" /></div>
        <SaveBtn onClick={handleSave} loading={loading} />
      </div>
    </SectionCard>
  );
}