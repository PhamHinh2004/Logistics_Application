const CATEGORIES = [
  { id: "dry", icon: "📦", name: "Bách hóa", desc: "Hàng khô thông thường", sizes: ["20DC", "40DC", "40HC", "45HC"], color: "#1a3a6b" },
  { id: "bulk", icon: "⚙️", name: "Hàng rời", desc: "Ngũ cốc, khoáng sản", sizes: ["20DC", "40DC"], color: "#8d6e00" },
  { id: "spec", icon: "🔧", name: "Chuyên dụng", desc: "Thiết bị đặc biệt", sizes: ["20DC", "40DC", "40HC"], color: "#37474f" },
  { id: "reefer", icon: "❄️", name: "Bảo ôn lạnh", desc: "Thực phẩm, dược phẩm", sizes: ["20DC", "40DC", "40HC"], color: "#c8dce8" },
  { id: "opentop", icon: "🔓", name: "Hở mái", desc: "Hàng quá khổ chiều cao", sizes: ["20DC", "40DC"], color: "#6d4c41" },
  { id: "flat", icon: "📐", name: "Mặt bằng", desc: "Máy móc, cấu kiện lớn", sizes: ["20DC", "40DC"], color: "#546e00" },
  { id: "tank", icon: "🛢️", name: "Bồn", desc: "Chất lỏng, khí hóa lỏng", sizes: ["20DC", "40DC"], color: "#b0bec5" },
];

const SIZES = {
  "20DC": { label: "20' DC", L: 2.0, W: 1.0, H: 1.05, vol: "33 m³", gw: "24,000 kg", teu: 1, htype: "Tiêu chuẩn" },
  "40DC": { label: "40' DC", L: 3.8, W: 1.0, H: 1.05, vol: "67 m³", gw: "30,480 kg", teu: 2, htype: "Tiêu chuẩn" },
  "40HC": { label: "40' HC", L: 3.8, W: 1.0, H: 1.25, vol: "76 m³", gw: "32,000 kg", teu: 2, htype: "High Cube" },
  "45HC": { label: "45' HC", L: 4.2, W: 1.0, H: 1.25, vol: "86 m³", gw: "32,500 kg", teu: 2.25, htype: "High Cube" }
};

const CONTAINER_SIZES = {
  "dry": ["20DC", "40DC", "40HC", "45HC"],
  "bulk": ["20DC", "40DC"],
  "spec": ["20DC", "40DC", "40HC"],
  "reefer": ["20DC", "40DC", "40HC"],
  "opentop": ["20DC", "40DC"],
  "flat": ["20DC", "40DC"],
  "tank": ["20DC", "40DC"]
}
const PRESET_COLORS = [
  { hex:"#1a3a6b", name:"Navy" },
  { hex:"#c0392b", name:"Đỏ" },
  { hex:"#e67e22", name:"Cam" },
  { hex:"#27ae60", name:"Xanh lá" },
  { hex:"#f1c40f", name:"Vàng" },
  { hex:"#95a5a6", name:"Xám" },
  { hex:"#2c3e50", name:"Đen" },
  { hex:"#8e44ad", name:"Tím" },
  { hex:"#16a085", name:"Ngọc" },
  { hex:"#f5f5f5", name:"Trắng" },
];
export const OWNER_COMPANIES = {
  dry: [
{
      id: "internal",
      name: "Logistics Application",
      type: "internal"
    },
    {
      id: "maersk",
      name: "Maersk",
      type: "shipping-line"
    },
    {
      id: "msc",
      name: "MSC",
      type: "shipping-line"
    },
    {
      id: "cma",
      name: "CMA CGM",
      type: "shipping-line"
    },
    {
      id: "cosco",
      name: "COSCO Shipping",
      type: "shipping-line"
    }
  ],

  bulk: [
    {
      id: "internal",
      name: "Logistics Application",
      type: "internal"
    },
    {
      id: "oldendorff",
      name: "Oldendorff Carriers",
      type: "bulk-carriers"
    },
    {
      id: "pacific-basin",
      name: "Pacific Basin",
      type: "bulk-carriers"
    }
  ],

  spec: [
    {
      id: "internal",
      name: "Logistics Application",
      type: "internal"
    },
    {
      id: "hapag",
      name: "Hapag-Lloyd",
      type: "shipping-line"
    },
    {
      id: "one",
      name: "ONE",
      type: "shipping-line"
    }
  ],

  reefer: [
    {
      id: "internal",
      name: "Logistics Application",
      type: "internal"
    },
    {
      id: "maersk",
      name: "Maersk",
      type: "shipping-line"
    },
    {
      id: "cma",
      name: "CMA CGM",
      type: "shipping-line"
    },
    {
      id: "seatrade",
      name: "Seatrade",
      type: "reefer-specialist"
    }
  ],

  opentop: [
    {
      id: "internal",
      name: "Logistics Application",
      type: "internal"
    },
    {
      id: "cosco",
      name: "COSCO Shipping",
      type: "shipping-line"
    },
    {
      id: "evergreen",
      name: "Evergreen",
      type: "shipping-line"
    }
  ],

  flat: [
    {
      id: "internal",
      name: "Logistics Application",
      type: "internal"
    },
    {
      id: "msc",
      name: "MSC",
      type: "shipping-line"
    },
    {
      id: "hapag",
      name: "Hapag-Lloyd",
      type: "shipping-line"
    },
    {
      id: "one",
      name: "ONE",
      type: "shipping-line"
    }
  ],

  tank: [
    {
      id: "internal",
      name: "Logistics Application",
      type: "internal"
    },
    {
      id: "stolt",
      name: "Stolt Tank Containers",
      type: "tank-operator"
    },
    {
      id: "hoyer",
      name: "HOYER",
      type: "tank-operator"
    },
    {
      id: "bertschi",
      name: "Bertschi",
      type: "tank-operator"
    }
  ]
};

export default {
  CATEGORIES,
  SIZES,
  PRESET_COLORS, 
  CONTAINER_SIZES,
  OWNER_COMPANIES
};