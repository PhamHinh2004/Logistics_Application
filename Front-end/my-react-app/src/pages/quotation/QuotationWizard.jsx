import React, { useMemo, useState, useEffect } from "react";
import {Ship, Package, Calendar, Check, ChevronLeft, ChevronRight, Plus, Minus, FileText} from "lucide-react";
import CONTAINERS from "../../assets/containers";
import ContainerRouteFields from "./ContainerRouteFields";
import ErrorBoundary from "./ErrorBoundary";
import { useQuotation } from "../../context/QuotationContext"
import Step1_Quotation from "./Step1_Quotation";
import Step2_Quotation from "./Step2_Quotation";
import Step3_Quotation from "./Step3_Quotation";
const { CATEGORIES, SIZES, PRESET_COLORS, CONTAINER_SIZES, OWNER_COMPANIES } = CONTAINERS;
const STEPS = ["Hàng hoá", "Tuyến đường", "Xem lại & xác nhận"];

const emptyItem = () => ({
  container_type: CATEGORIES[0]?.id || "dry",
  size_ft: CATEGORIES[0]?.sizes?.[0] || "Size20ft",
  color: PRESET_COLORS[0]?.hex || "",
  weight: "",
  owner_company: "",
  pickup_location: { address: "", lat: null, lng: null },
  delivery_location: { address: "", lat: null, lng: null },
  distant: 0, // filled in by RouteMap once a route is calculated
  pickup_date: "",
  notes: "",
});

function QuotationWizardInner() {
  // const [step, setStep] = useState(0);
  const [cargoType, setCargoType] = useState("");
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([emptyItem()]);
  const [status, setStatus] = useState("DRAFT");
  const [customer, setCustomer] = useState({});
  const [step1Valid, setStep1Valid] = useState(false);
  const [step2Valid, setStep2Valid] = useState(false);
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const {step, handleUpdateStep} = useQuotation();


  const fetchCustomer = async () => {
    try {
      const response = await fetch(`http://localhost:9001/api/v1/customers/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch customer data");
      const data = await response.json();
      setCustomer(data.response || {});
    } catch (error) {
      console.error("Error fetching customer:", error);
      setCustomer({}); // keep it a safe object so customer.xxx never throws
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const setCountAndResize = (n) => {
    const next = Math.min(10, Math.max(1, n));
    setCount(next);
    setItems((prev) => {
      const copy = [...prev];
      while (copy.length < next) copy.push(emptyItem());
      while (copy.length > next) copy.pop();
      return copy;
    });
  };

  const updateItem = (idx, key, value) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, [key]: value } : it)));
  };

  // Use the REAL distance from RouteMap (it.distant, set via onRouteChange) when we have it.
  // Fall back to a rough weight-based estimate only if the route hasn't been calculated yet,
  // so step 3 never shows "0 km" just because of render timing.
  const priced = useMemo(
    () =>
      items.map((it) => {
        const w = Number(it.weight) || 0;
        const distant = it.distant > 0 ? it.distant : Math.round(50 + w * 0.01);
        const unit_price = Math.round(3200000 + w * 1800 + distant * 4500);
        return { ...it, distant, unit_price };
      }),
    [items]
  );

  const totalPrice = priced.reduce((s, it) => s + it.unit_price, 0);
  const basePrice = Math.round(totalPrice * 0.85);
  const quoteCode = "QT-2026-" + String(customer?.id || "0000").slice(-4).toUpperCase();





  const canNext = step === 1 ? step1Valid : step === 2 ? step2Valid : true;

  const fmt = (n) => n.toLocaleString("vi-VN") + " ₫";

  return (
    <div className="min-h-screen bg-white text-[#111318] font-[Inter]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Poppins', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Header */}
      <div className="border-b border-[#EAEAEA] px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 bg-[#F7F7F6]/95 backdrop-blur z-20">
        <div className="flex items-center gap-2">
          <Ship size={20} className="text-[#111318]" strokeWidth={1.75} />
          <span className="font-display text-[17px] font-bold tracking-tight">OceanWings</span>
        </div>
        <p className="text-[13px] text-[#6B7280] hidden sm:block">Yêu cầu báo giá vận chuyển</p>
        <div className="w-8 h-8 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center text-[13px] font-medium">
          U
        </div>
      </div>

      {/* Stepper */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-7">
        <div className="flex items-center">
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-mono border shrink-0 ${i < step
                      ? "bg-[#6C5CE7] border-[#6C5CE7] text-white"
                      : i === step
                        ? "border-[#6C5CE7] text-[#6C5CE7]"
                        : "border-[#E5E7EB] text-[#B0B4BC]"
                    }`}
                >
                  {i < step ? <Check size={13} /> : i + 1}
                </div>
                <span className={`text-[13px] hidden sm:block ${i === step ? "text-[#111318] font-medium" : "text-[#B0B4BC]"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${i < step ? "bg-[#6C5CE7]" : "bg-[#E5E7EB]"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-8 space-y-7 pb-32">
        {/* ---------------- STEP 1: Hàng hoá ---------------- */}
        <Step1_Quotation
          step={step}
          handleUpdateStep={handleUpdateStep}
          items={items}
          setItems={setItems}
          updateItem={updateItem}
          emptyItem={emptyItem}
          setStep1Valid={setStep1Valid}
        />

        {/* ---------------- STEP 2: Tuyến đường ---------------- */}
        <Step2_Quotation
          step={step}
          handleUpdateStep={handleUpdateStep}
          items={items}
          setItems={setItems}
          updateItem={updateItem}
          emptyItem={emptyItem}
          setStep2Valid={setStep2Valid}
          count={count}
        />

        {/* ---------------- STEP 3: Xem lại & xác nhận ---------------- */}
        {/* {step === 3 && (
          <>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 font-medium">Chi tiết từng container / giá</p>
              <div className="space-y-3">
                {priced.map((it, idx) => (
                  <div key={idx} className="border border-[#EAEAEA] rounded-xl bg-[#FAFAF9] p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#EAEAEA] flex items-center justify-center shrink-0">
                        <Package size={15} className="text-[#6C5CE7]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium">
                          {it.container_type} · {it.size_ft.replace("Size", "")}
                        </p>
                        <p className="text-[12px] text-[#9CA3AF] truncate">
                          {it.pickup_location?.address || "—"} → {it.delivery_location?.address || "—"}
                        </p>
                        <p className="text-[11px] font-mono text-[#B0B4BC]">
                          {Number(it.weight || 0).toLocaleString("vi-VN")} kg · {it.distant.toLocaleString("vi-VN")} km · {it.pickup_date}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[14px] shrink-0">{fmt(it.unit_price)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 font-medium">Thông tin báo giá</p>
              <div className="border border-[#6C5CE7]/30 rounded-xl bg-[#FAFAF9] divide-y divide-[#EAEAEA]">
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-[13px] text-[#9CA3AF] flex items-center gap-1.5"><FileText size={13} /> Mã báo giá</span>
                  <span className="font-mono text-[13px]">{quoteCode}</span>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-[13px] text-[#9CA3AF]">Loại hàng</span>
                  <span className="text-[13px]">{cargoType || "—"}</span>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-[13px] text-[#9CA3AF]">Giá cơ bản</span>
                  <span className="font-mono text-[14px]">{fmt(basePrice)}</span>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-[13px] text-[#9CA3AF]">Phụ phí ({items.length} container)</span>
                  <span className="font-mono text-[14px]">{fmt(totalPrice - basePrice)}</span>
                </div>
                <div className="flex items-center justify-between px-5 py-4 bg-white rounded-b-xl">
                  <span className="text-[14px] font-medium">Tổng cộng</span>
                  <span className="font-mono text-[20px] font-semibold text-[#6C5CE7]">{fmt(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-[12px] text-[#9CA3AF]">Trạng thái</span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${status === "AVAILABLE" || status === "DRAFT"
                        ? "border-[#B0B4BC] text-[#6B7280]"
                        : "border-[#6C5CE7] text-[#6C5CE7]"
                      }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            </div>
          </>
        )} */}
        <Step3_Quotation
          step={step}
          items={items}
          setItems={setItems}
          updateItem={updateItem}
          emptyItem={emptyItem}
          setStep3Valid={() => {}}
          quoteCode={quoteCode}
          cargoType={cargoType}
          basePrice={basePrice}
          totalPrice={totalPrice}
          status={status}
          priced={priced}
          fmt={fmt}
        />
      </div>

      {/* Sticky footer nav */}
      <div className="sticky bottom-0 border-t border-[#EAEAEA] bg-[#F7F7F6]/95 backdrop-blur px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => handleUpdateStep(step - 1)}
            disabled={step === 0}
            className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-[13px] text-[#4B5563] hover:border-[#C7C9D1] transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <ChevronLeft size={14} /> Quay lại
          </button>

          {step <= 2 ? (
            <button
              onClick={() => handleUpdateStep(step + 1)}
              disabled={!canNext}
              className="px-5 py-2.5 rounded-lg bg-[#6C5CE7] text-white text-[13px] font-medium hover:bg-[#5B4BD6] transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              Tiếp tục <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => setStatus("SENT")}
              disabled={status === "SENT"}
              className="px-5 py-2.5 rounded-lg bg-[#22A06B] text-white text-[13px] font-medium hover:bg-[#1C8A5C] transition disabled:opacity-60 flex items-center gap-1.5"
            >
              <Check size={15} /> {status === "SENT" ? "Đã gửi yêu cầu" : "Xác nhận & gửi báo giá"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Wrapping in ErrorBoundary so a future bug shows the real error message
// instead of a silent blank white screen — check the browser console too.
export default function QuotationWizard() {
  return (
    <ErrorBoundary>
      <QuotationWizardInner />
    </ErrorBoundary>
  );
}