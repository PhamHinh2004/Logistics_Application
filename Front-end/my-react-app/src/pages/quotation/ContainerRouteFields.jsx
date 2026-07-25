import LocationPickerInput from "./LocationPickerInput";
import RouteMap from "../RouteMap";
import { Calendar } from "lucide-react";
// Inside your container item block (replaces the old grid-cols-2 with 2 separate maps)
export default function ContainerRouteFields({ it, idx, updateItem }) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="text-[12px] text-[#9CA3AF] mb-2 block">📍 Điểm lấy hàng</span>
                    <LocationPickerInput
                        value={it.pickup_location}
                        onChange={(location) => updateItem(idx, "pickup_location", location)}
                        placeholder="Điểm lấy hàng"
                    />
                </div>

                <div>
                    <span className="text-[12px] text-[#9CA3AF] mb-2 block">📍 Điểm giao hàng</span>
                    <LocationPickerInput
                        value={it.delivery_location}
                        onChange={(location) => updateItem(idx, "delivery_location", location)}
                        placeholder="Điểm giao hàng"
                    />
                </div>
            </div>

            {/* One shared map for both points — shows the route line + real km, not 2 disconnected maps */}
            <RouteMap
                origin={it.pickup_location}
                destination={it.delivery_location}
                onRouteChange={({ distanceKm }) => updateItem(idx, "distant", distanceKm)}
            />
        </div>
    );
}