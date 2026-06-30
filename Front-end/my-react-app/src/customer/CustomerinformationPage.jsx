import { useState, useEffect } from "react";

const FIELDS = [
  { name: "contactName",  label: "Contact Name",  type: "text",   placeholder: "Enter your contact name",  icon: (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
  )},
  { name: "contactEmail", label: "Contact Email", type: "email",  placeholder: "Enter your contact email", icon: (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
  )},
  { name: "companyName",  label: "Company Name",  type: "text",   placeholder: "Enter your company name",  icon: (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
  )},
  { name: "address",      label: "Address",       type: "text",   placeholder: "Enter your address",        icon: (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
  )},
  { name: "gender",       label: "Gender",        type: "select", options: ["", "Male", "Female", "Other"], icon: (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
  )},
];

export default function CustomerInformation({ onFinish }) {
  const [form, setForm] = useState({ contactName:"", contactEmail:"", companyName:"", address:"", role:"", gender:"", note:"" });
  const [customerRequest, setCustomerRequest] = useState({ contactName:"", contactEmail:"", companyName:"", address:"", note:"",gender:"", user_id: localStorage.getItem("id") });
  const [saved, setSaved] = useState(false);
  const set = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const [roles, setRoles] = useState([]);

  // Fetch roles from the backend when the component mounts
  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/roles");
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const data = await response.json();
      setRoles(data);
    }
    catch (error) {
      console.error("Error fetching roles:", error);
    }
  }
  
  const addCustomer = async () => {
    try {
      const response = await fetch("http://localhost:9001/api/v1/customers", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },  
        body: JSON.stringify(customerRequest)
      });
      if (!response.ok) {
        throw new Error("Failed to add customer");
      }
      const data = await response.json();
      console.log("Customer added successfully:", data);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const updateAccountForCustomer = async () => {
    try{
      const response = await fetch('http://localhost:9000/account/update-createdCustomer', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      })
    } catch (error) {
      console.error("Error updating customer account:", error);
    }
  };

  const updateAccountForRole = async () => {
    try{
      const response = await fetch(`http://localhost:9000/account/update-role?role=${form.role}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      })
    } catch (error) {
      console.error("Error updating role account:", error);
    }
  }


  useEffect(() => {
    fetchRoles();
  }, []);

  

  const submit = () => {
    setSaved(true);
    setCustomerRequest({
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      companyName: form.companyName,
      address: form.address,
      note: form.note,
      gender: form.gender,
      user_id: localStorage.getItem("id")
    });
    addCustomer();
    updateAccountForCustomer();
    updateAccountForRole();
    setTimeout(() => { setSaved(false); if (onFinish) onFinish(form); }, 2000);
  };

  const inputCls = "w-full h-11 pl-10 pr-4 text-sm text-gray-800 bg-white border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 placeholder:text-gray-300";

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Left panel: hero image ── */}
      <div className="hidden lg:flex w-[420px] xl:w-[480px] flex-shrink-0 relative">
        <img
          src="https://i.postimg.cc/ryZ0PnRj/artem-balashevsky-Zh-NYKwj-RMh4-unsplash.jpg"
          alt="Truck"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Brand */}
        <div className="absolute top-8 left-8">
          <span className="text-white font-bold text-xl tracking-tight">OceanWings</span>
        </div>
        {/* Bottom text */}
        <div className="absolute bottom-12 left-8 right-8">
          <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-2">Step 1 of 3</p>
          <h2 className="text-white text-3xl font-bold leading-tight mb-3">
            Tell us about<br />your business
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Fill in your details so we can personalize your logistics experience and get you started quickly.
          </p>
          {/* Progress dots */}
          <div className="flex gap-2 mt-6">
            <div className="w-8 h-1.5 rounded-full bg-indigo-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 overflow-y-auto">
        <div className="w-full max-w-xl">

          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-2">Customer Onboarding</p>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Customer Information</h1>
            <p className="text-sm text-gray-500">Please complete the form below to set up your account.</p>
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-6">

            {/* Contact Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </span>
                <input type="text" name="contactName" value={form.contactName} onChange={set} placeholder="Enter your contact name" className={inputCls} />
              </div>
            </div>

            {/* Contact Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span>
                <input type="email" name="contactEmail" value={form.contactEmail} onChange={set} placeholder="Enter your contact email" className={inputCls} />
              </div>
            </div>

            {/* Company Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </span>
                <input type="text" name="companyName" value={form.companyName} onChange={set} placeholder="Enter your company name" className={inputCls} />
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Gender</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </span>
                <select name="gender" value={form.gender} onChange={set} className={inputCls + " appearance-none cursor-pointer"}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Role */}
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Role / Chức vụ</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span>
                <select name="role" value={form.role} onChange={set} className={inputCls + " appearance-none cursor-pointer pr-10"}>
                  <option value="">Select role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {/* Chevron icon */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </span>
              </div>
            </div>

            {/* Address — full width */}
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </span>
                <input type="text" name="address" value={form.address} onChange={set} placeholder="Enter your full address" className={inputCls} />
              </div>
            </div>

            {/* Note — full width */}
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</label>
              <div className="relative">
                <span className="absolute left-3 top-3.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </span>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={set}
                  placeholder="Any additional notes or special requirements..."
                  rows={4}
                  className="w-full pl-10 pr-4 pt-3 pb-3 text-sm text-gray-800 bg-white border border-gray-200 rounded-xl outline-none resize-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 placeholder:text-gray-300 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mt-8 pt-6 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              All information is kept private and secure.
            </p>
            <button
              onClick={submit}
              className={`
                flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white
                shadow-lg transition-all duration-200 active:scale-95
                ${saved
                  ? "bg-emerald-500 shadow-emerald-200"
                  : "bg-indigo-500 hover:bg-indigo-600 shadow-indigo-200 hover:shadow-indigo-300"}
              `}
            >
              {saved ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  Saved!
                </>
              ) : (
                <>
                  Finish And Save
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}