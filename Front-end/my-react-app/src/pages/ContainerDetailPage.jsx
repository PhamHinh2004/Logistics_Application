import { useState } from "react";
import { Box, Calendar, Weight, Building2, Palette, Ruler } from "lucide-react";

export default function ContainerDetailPage({ container, onClose, onConfirm }) {
    const [activeImg, setActiveImg] = useState(0);

    if (!container) return null;
    const utilization =
        Math.round(
            (container.tareWeightKg /
                container.maxWeightKg) * 100
        );
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-[1200px] h-[92vh] overflow-hidden">
                <div className="grid grid-cols-5 h-full">
                    {/* LEFT */}
                    <div className="col-span-2 bg-slate-100 p-6 overflow-y-auto">
                        <div className="rounded-3xl overflow-hidden h-[430px] bg-white">
                            <img src={container.images?.[activeImg]} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex gap-3 mt-5 overflow-x-auto">
                            {container.images?.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition
                                        ${activeImg === i ? "border-blue-500" : "border-transparent"}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* RIGHT */}
                      <div className="col-span-3 p-10 overflow-y-auto min-h-0">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-4xl font-bold">
                                    {container.containerNumber}
                                </h1>
                                <p className="text-slate-500 mt-2">
                                    {container.containerType}
                                    &nbsp;•
                                    &nbsp;
                                    {container.sizeFt}
                                </p>
                                <p className="text-slate-400">
                                    ISO {container.isoCode}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200"
                            >
                                ✕
                            </button>
                        </div>
                        {/* STATUS */}
                        <div className="mt-8 flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <p className="font-semibold">
                                {container.status}
                            </p>
                        </div>
                        {/* PROGRESS */}
                        <div className="mt-8">
                            <div className="flex justify-between mb-2">
                                <p className="text-sm text-slate-500">
                                    Container Utilization
                                </p>
                                <p className="font-semibold">
                                    {utilization}%
                                </p>
                            </div>
                            <div className="h-3 rounded-full bg-slate-200">
                                <div
                                    style={{
                                        width: `${utilization}%`
                                    }}
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                                />
                            </div>
                        </div>
                        {/* INFO */}
                        <div className="grid grid-cols-2 gap-5 mt-10">
                            <InfoCard
                                icon={<Weight size={18} />}
                                title="Max Weight"
                                value={`${container.maxWeightKg.toLocaleString()} kg`}
                            />
                            <InfoCard
                                icon={<Box size={18} />}
                                title="Tare Weight"
                                value={`${container.tareWeightKg.toLocaleString()} kg`}
                            />
                            <InfoCard
                                icon={<Building2 size={18} />}
                                title="Owner"
                                value={container.ownerCompany}
                            />
                            <InfoCard
                                icon={<Palette size={18} />}
                                title="Color"
                                value={container.color}
                            />
                            <InfoCard
                                icon={<Calendar size={18} />}
                                title="Manufacture"
                                value={new Date(container.manufactureDate).toLocaleDateString()}
                            />
                            <InfoCard
                                icon={<Ruler size={18} />}
                                title="Inspection"
                                value={new Date(container.inspectionExpiry).toLocaleDateString()}
                            />
                        </div>
                        <div className="flex justify-end gap-4 mt-12">
                            <button
                                onClick={onClose}
                                className="px-7 py-3 rounded-xl border border-slate-300 hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => onConfirm(container)}
                                className="px-8 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
                            >
                                Select Container
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoCard({ icon, title, value }) {
    return (
        <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 text-slate-500">
                {icon}
                <p className="text-xs uppercase tracking-wide">
                    {title}
                </p>
            </div>
            <p className="mt-3 text-lg font-semibold">
                {value}
            </p>
        </div>
    )
}