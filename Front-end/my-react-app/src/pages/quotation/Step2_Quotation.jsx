import ContainerRouteFields from "./ContainerRouteFields";
import { Calendar } from "lucide-react";

export default function Step2_Quotation({ step, handleUpdateStep, items, setItems, updateItem, emptyItem, setStep2Valid, count }) {
    setStep2Valid(items.every(
        (it) => it.pickup_location?.address && it.delivery_location?.address && it.pickup_date
    ));
    return (
        <div>
            {step === 2 && (
                <div className="space-y-4">
                    <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-medium">
                        Tuyến đường — theo {count} container đã khai báo
                    </p>
                    {items.map((it, idx) => (
                        <div key={idx} className="border border-[#EAEAEA] rounded-xl bg-[#FAFAF9] p-5 space-y-4">
                            <p className="text-[12px] font-mono text-[#9CA3AF] flex items-center gap-2">
                                Container #{idx + 1}
                                <span className="text-[#B0B4BC]">· {it.container_type} {it.size_ft.replace("Size", "")}</span>
                            </p>

                            <ContainerRouteFields it={it} idx={idx} updateItem={updateItem} />

                            <div className="grid grid-cols-2 gap-4">
                                <label className="block">
                                    <span className="text-[12px] text-[#9CA3AF] flex items-center gap-1.5 mb-1.5"><Calendar size={13} /> Ngày lấy hàng</span>
                                    <input
                                        type="date"
                                        value={it.pickup_date}
                                        onChange={(e) => updateItem(idx, "pickup_date", e.target.value)}
                                        className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#6C5CE7]"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-[12px] text-[#9CA3AF] mb-1.5 block">Ghi chú thêm</span>
                                    <input
                                        value={it.notes}
                                        onChange={(e) => updateItem(idx, "notes", e.target.value)}
                                        placeholder="Yêu cầu bảo quản lạnh -18°C..."
                                        className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#6C5CE7] placeholder:text-[#B0B4BC]"
                                    />
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}