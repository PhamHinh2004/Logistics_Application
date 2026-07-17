import { useState, useEffect } from "react";
import Field from "../components/Field.jsx";
import EditableInput from "../components/EditableInput.jsx";
import Value from "../components/Value.jsx";
import SaveBtn from "../components/SaveBtn.jsx";
import SectionCard from "../components/SectionCard.jsx";


function fmt(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function CompanySection({ customer, onSave }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    company_name: customer.companyName || "",
    tax_code: customer.taxCode || "",
    contact_name: customer.contactName || "",
    contact_email: customer.contactEmail || "",
    address: customer.address || "",
    note: customer.note || "",
    created_at: customer.updated_At || "",
  });
  const [loading, setLoading] = useState(false);

  // Keep form fields in sync when customer prop is loaded asynchronously
  useEffect(() => {
    if (customer) {
      setForm({
        company_name: customer.companyName || "",
        tax_code: customer.taxCode || "",
        contact_name: customer.contactName || "",
        contact_email: customer.contactEmail || "",
        address: customer.address || "",
        note: customer.note || "",
        created_at: customer.updated_At || "",
      });
    }
  }, [customer]);

  const updateCustomerAPI = async (updatedCustomer) => {
    try {
      const token = localStorage.getItem("token");
      const userId = customer.userId || localStorage.getItem("id");
      if (!userId) {
        console.error("No userId found for updating customer");
        return null;
      }
      const response = await fetch(`http://localhost:9001/api/v1/customers/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCustomer),
      }); 
      if (response.ok) {
        const data = await response.json();
        if (data.status === "success" && data.response) {
          return data.response;
        }
      }
      return null;
    }
    catch (error) {
      console.error("Error updating customer:", error);
      return null;
    }
  };


  const handleSave = async () => {
    setLoading(true);
    try {
      const requestPayload = {
        companyName: form.company_name,
        contactName: form.contact_name,
        contactEmail: form.contact_email,
        address: form.address,
        note: form.note,
        gender: customer.gender || "OTHER",
      };

      const updatedResponse = await updateCustomerAPI(requestPayload);
      if (updatedResponse) {
        onSave?.(updatedResponse);
        setEdit(false);
      } else {
        alert("Cập nhật thông tin công ty thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin!");
    } finally {
      setLoading(false);
    }
  };
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  return (
    <SectionCard
      title="Thông tin công ty"
      description="Thông tin doanh nghiệp dùng cho hóa đơn và hợp đồng"
      action={
        edit
          ? <SaveBtn onClick={handleSave} loading={loading} />
          : <button onClick={() => setEdit(true)}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800
                         border border-gray-200 hover:border-gray-300 rounded-lg transition-all">
            Chỉnh sửa
          </button>
      }
    >
      <div className="grid grid-cols-2 gap-5">
        <Field label="Tên công ty">
          {edit ? <EditableInput value={form.company_name} onChange={f("company_name")} /> : <Value>{customer.companyName}</Value>}
        </Field>
        <Field label="Mã số thuế">
          {edit ? <EditableInput value={form.tax_code} onChange={f("tax_code")} /> : <Value>{customer.taxCode}</Value>}
        </Field>
        <Field label="Người liên hệ">
          {edit ? <EditableInput value={form.contact_name} onChange={f("contact_name")} /> : <Value>{customer.contactName}</Value>}
        </Field>
        <Field label="Email liên hệ">
          {edit ? <EditableInput value={form.contact_email} onChange={f("contact_email")} type="email" /> : <Value>{customer.contactEmail}</Value>}
        </Field>
        <div className="col-span-2">
          <Field label="Địa chỉ">
            {edit ? <EditableInput value={form.address} onChange={f("address")} /> : <Value>{customer.address}</Value>}
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Ghi chú">
            {edit
              ? <textarea value={form.note} onChange={e => f("note")(e.target.value)}
                rows={3}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5
                             text-sm text-gray-900 placeholder:text-gray-400 resize-none
                             focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all" />
              : <Value>{customer.note}</Value>
            }
          </Field>
        </div>
        {/* <Field label="Ngày tạo" value={fmt(customer.created_at)} /> */}
      </div>
    </SectionCard>
  );
}