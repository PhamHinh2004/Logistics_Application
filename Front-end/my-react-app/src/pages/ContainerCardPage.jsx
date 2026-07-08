import React from "react";
import {
    Truck,
    Weight,
    Palette,
    Building2,
    Ruler,
    Box,
} from "lucide-react";
import ContainerDetailPage from "./ContainerDetailPage";
const SIZE_LABEL = {
    "Size20ft": "20 FT",
    "Size40ft": "40 FT",
    "Size45ft": "45 FT",
    "Size45hc": "45 HC",
};
import { useState } from "react";

const STATUS_LABEL = {
    "AVAILABLE": {
        text: "Available",
        color: "bg-emerald-100 text-emerald-700",
    },
    "IN_TRANSIT": {
        text: "In Transit",
        color: "bg-amber-100 text-amber-700",
    },
    "MAINTENANCE": {
        text: "Maintenance",
        color: "bg-red-100 text-red-700",
    },
    "LOADED": {
        text: "Loaded",
        color: "bg-blue-100 text-blue-700",
    },
    "DAMAGED": {
        text: "Damaged",
        color: "bg-gray-100 text-gray-600",
    },
};

const TYPE_LABEL = {
    0: "Dry",
    1: "Reefer",
    2: "Open Top",
};

function formatKg(value) {
    return value ? `${value.toLocaleString()} kg` : "--";
}

export default function ContainerCard({ container, onView }) {
    const [showDetail, setShowDetail] = useState(false);
    const handleViewDetails = () => {
        setShowDetail(true);
        onView(container);
    }
    const status =
        STATUS_LABEL[container.status] ??
        {
            text: "--",
            color: "bg-gray-100 text-gray-600",
        };

    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 duration-300">

            {/* Image */}
            <div className="relative h-52 bg-slate-100 overflow-hidden">

                <img
                    src={container.images?.[0]}
                    alt={container.containerNumber}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                >
                    {status.text}
                </span>

                <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="font-bold text-xl tracking-wide">
                        {container.containerNumber}
                    </h2>

                    <p className="text-sm opacity-90">
                        {TYPE_LABEL[container.containerType]} •{" "}
                        {SIZE_LABEL[container.sizeFt]}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">

                <div className="grid grid-cols-2 gap-3">

                    <InfoItem
                        icon={<Box size={18} />}
                        label="ISO Code"
                        value={container.isoCode}
                    />

                    <InfoItem
                        icon={<Ruler size={18} />}
                        label="Size"
                        value={SIZE_LABEL[container.sizeFt]}
                    />

                    <InfoItem
                        icon={<Weight size={18} />}
                        label="Max Weight"
                        value={formatKg(container.maxWeightKg)}
                    />

                    <InfoItem
                        icon={<Truck size={18} />}
                        label="Tare"
                        value={formatKg(container.tareWeightKg)}
                    />

                </div>

                <div className="mt-5 border-t pt-4">

                    <div className="flex items-center gap-2 mb-3">

                        <Building2
                            size={18}
                            className="text-slate-500"
                        />

                        <div>
                            <p className="text-xs text-gray-400">
                                Owner
                            </p>

                            <p className="font-medium text-gray-800">
                                {container.ownerCompany}
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <Palette
                            size={18}
                            className="text-slate-500"
                        />

                        <div className="flex items-center gap-2">

                            <span
                                className="w-5 h-5 rounded-full border shadow-sm"
                                style={{
                                    backgroundColor: container.color,
                                }}
                            />

                            <span className="text-gray-700 font-medium">
                                {container.color}
                            </span>

                        </div>

                    </div>

                </div>

                <button
                    className="mt-6 w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-2.5 font-medium transition"
                    onClick={handleViewDetails}
                >
                    View Details
                </button>
                
            </div>
        </div>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="rounded-xl bg-slate-50 p-3">

            <div className="flex items-center gap-2 text-slate-500 mb-2">
                {icon}
                <span className="text-xs">{label}</span>
            </div>

            <div className="font-semibold text-slate-800 text-sm">
                {value}
            </div>

        </div>
    );
}