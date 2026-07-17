import { useState, useEffect } from "react";
import { useAuth } from "../../context/Authcontext";
// ─── Mock data (thay bằng API call thực tế) ───────────────────────────────────

import ProfileSection from "./sections/ProfileSection.jsx";
import CompanySection from "./sections/CompanySection.jsx";
import ActivitySection from "./sections/ActivitySection.jsx";
import Avatar from "./components/Avatar.jsx";
import Field from "./components/Field.jsx";
import Value from "./components/Value.jsx";
import EditableInput from "./components/EditableInput.jsx";
import SaveBtn from "./components/SaveBtn.jsx";
import SectionCard from "./components/SectionCard.jsx";
import Navigation from "../../components/Navigation.jsx";

const form_customer = {
  id: "",
  companyName: "",
  taxCode: "",
  contactName: "",
  contactEmail: "",
  address: "",
  note: "",
  updated_At: "",
};

const STATUS_STYLE = {
  Active: "bg-green-500",
  Inactive: "bg-red-500",
  InActive: "bg-red-500",
};

// ─── Sidebar nav ──────────────────────────────────────────────────────────────
const NAV = [
  { id: "profile", icon: "👤", label: "Hồ sơ cá nhân" },
  { id: "company", icon: "🏢", label: "Thông tin công ty" },
];


// ─── Main ─────────────────────────────────────────────────────────────────────
export default function MyAccount() {
  const [tab, setTab] = useState("profile");
  const [account, setAccount] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    statusAccount: "",
    provider: "",
    providerId: "",
    createCustomer: "",
    role: {
      id: "",
      name: "",
      roleOptions: "",
      description: ""
    },
    active: false
  });
  const [customer, setCustomer] = useState(form_customer);

  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const userId = localStorage.getItem("id");
  console.log("refreshToken:", refreshToken);
  console.log("userId:", userId);
  console.log("token:", token);
  const { user, login, logout, loading, refreshAuthToken } = useAuth();

  const fetchAccountData = async () => {
    try {
      const response = await fetch(`http://localhost:9000/account`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, try to refresh
          await refreshAuthToken();
          // Retry fetching account data after refreshing token
          return fetchAccountData();
        } else {
          throw new Error('Failed to fetch account data');
        }
      }
      const data = await response.json();
      setAccount(data.response);
      console.log("Account data fetched:", data.response);
      if (data.response && data.response.id) {
        fetchCustomerData(data.response.id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchCustomerData = async (accId) => {
    const targetUserId = accId || userId;
    if (!targetUserId) return;
    try {
      const response = await fetch(`http://localhost:9001/api/v1/customers/${targetUserId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch customer data');
      const data = await response.json();
      setCustomer(data.response);
      console.log("Customer data fetched:", data.response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Top bar ── */}
      <Navigation />

      <div className="flex flex-1 max-w-6xl mx-auto w-full gap-0 px-6 py-8">

        {/* ── Sidebar ── */}
        <div className="w-56 flex-shrink-0 mr-8">
          {/* User summary */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 flex flex-col items-center text-center">
            <Avatar name={account.username} size={14} />
            <p className="text-sm font-bold text-gray-900 mt-3">{account.username}</p>
            <p className="text-xs text-gray-500 mt-0.5">@{account.username}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLE[account.statusAccount]}`} />
              <span className="text-xs text-gray-500">{account.statusAccount}</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {NAV.map(n => (
              <button key={n.id} onClick={() => setTab(n.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${tab === n.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 border border-transparent"
                  }`}>
                <span className="text-base">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>

          {/* Danger zone */}
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-xs font-semibold text-red-500 mb-1">Vùng nguy hiểm</p>
            <p className="text-[10px] text-red-500 mb-3">Hành động không thể hoàn tác</p>
            <button className="w-full text-xs font-medium text-red-500 hover:text-red-300 border border-red-200 hover:border-red-300 rounded-lg py-1.5 transition-all">
              Vô hiệu hóa tài khoản
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {tab === "profile" && <ProfileSection account={account} onSave={setAccount} />}
          {tab === "company" && <CompanySection customer={customer} onSave={c => setCustomer(p => ({ ...p, ...c }))} />}

        </div>
      </div>
    </div>
  );
}