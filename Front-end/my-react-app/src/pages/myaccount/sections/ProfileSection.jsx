import { useState } from "react";
import Avatar from "../components/Avatar.jsx";
import Field from "../components/Field.jsx";
import Value from "../components/Value.jsx";
const ROLE_STYLE = {
    Admin: "bg-purple-100 text-purple-700 border-purple-200",
    Sales: "bg-blue-100 text-blue-700 border-blue-200",
    Dispatcher: "bg-amber-100 text-amber-700 border-amber-200",
    Driver: "bg-green-100 text-green-700 border-green-200",
};
const STATUS_STYLE = {
    Active: "bg-green-500",
    Inactive: "bg-red-500",
    InActive: "bg-red-500",
};
function fmt(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}
export default function ProfileSection({ account, onSave }) {
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({ fullName: account.fullName, phone: account.phone });
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => { setLoading(false); setEdit(false); onSave?.({ ...account, ...form }); }, 900);
    };
    const f = k => v => setForm(p => ({ ...p, [k]: v }));

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">Thông tin cá nhân</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Tên hiển thị và thông tin liên hệ cơ bản</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-5 mb-6">
                <Avatar name={account.fullName} size={14} />
                <div>
                    <p className="text-base font-bold text-gray-900">{account.fullName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">@{account.username}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${ROLE_STYLE[account.role?.name] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                            {account.role?.name || "No Role"}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-gray-500">
                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLE[account.statusAccount] || "bg-gray-500"}`} />
                            {account.statusAccount || "Unknown"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <Field label="Username">
                    <Value>@{account.username}</Value>
                </Field>
                <Field label="Email">
                    <Value>{account.email}</Value>
                </Field>
                <Field label="Ngày tạo tài khoản" value={fmt(account.created_at)} />
                <Field label="Cập nhật lần cuối" value={fmt(account.updated_at)} />
            </div>
        </div >
    );
}
