import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Fit the map to show both markers + the route line
function FitBounds({ points }) {
    const map = useMap();

    useEffect(() => {
        if (points.length < 2) return;
        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, { padding: [40, 40] });
        const timer = setTimeout(() => map.invalidateSize(), 100);
        return () => clearTimeout(timer);
    }, [points, map]);

    return null;
}

/**
 * origin / destination: { lat, lng, address }
 * onRouteChange(routeInfo): called with { distanceKm, durationMin } once the route is fetched,
 * so the parent can save it into the QuotationItem (distant field).
 */
export default function RouteMap({ origin, destination, onRouteChange }) {
    const [route, setRoute] = useState(null); // { coords: [[lat,lng],...], distanceKm, durationMin }
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!origin?.lat || !destination?.lat) {
            setRoute(null);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setError(null);

        const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (cancelled) return;
                if (!data.routes?.length) {
                    setError("Không tìm được tuyến đường giữa 2 điểm này.");
                    setRoute(null);
                    return;
                }
                const r = data.routes[0];
                const coords = r.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
                const distanceKm = r.distance / 1000;
                const durationMin = r.duration / 60;
                setRoute({ coords, distanceKm, durationMin });
                onRouteChange?.({ distanceKm, durationMin });
            })
            .catch((err) => {
                if (cancelled) return;
                console.error("Routing failed:", err);
                setError("Không thể tính tuyến đường lúc này.");
                setRoute(null);
            })
            .finally(() => !cancelled && setLoading(false));

        return () => {
            cancelled = true;
        };
    }, [origin?.lat, origin?.lng, destination?.lat, destination?.lng]);

    if (!origin?.lat || !destination?.lat) {
        return (
            <div className="h-80 rounded-xl border flex items-center justify-center bg-[#FAFAF9]">
                <span className="text-gray-500 text-center px-4 text-[13px]">
                    Chọn cả điểm lấy hàng và điểm giao hàng để xem tuyến đường
                </span>
            </div>
        );
    }

    const points = route
        ? route.coords
        : [
              [origin.lat, origin.lng],
              [destination.lat, destination.lng],
          ];

    return (
        <div className="space-y-2">
            <div className="relative w-full overflow-hidden rounded-xl border" style={{ height: "320px" }}>
                <MapContainer
                    center={[origin.lat, origin.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="w-full h-full"
                    style={{ height: "100%", width: "100%" }}
                >
                    <FitBounds points={points} />
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[origin.lat, origin.lng]} />
                    <Marker position={[destination.lat, destination.lng]} />
                    {route && (
                        <Polyline
                            positions={route.coords}
                            pathOptions={{ color: "#6C5CE7", weight: 4, opacity: 0.85 }}
                        />
                    )}
                </MapContainer>
            </div>

            {/* Distance / duration badge — this is what was missing before */}
            <div className="flex items-center gap-4 text-[13px] px-1">
                {loading && <span className="text-gray-500">Đang tính tuyến đường...</span>}
                {error && <span className="text-red-500">{error}</span>}
                {route && !loading && (
                    <>
                        <span className="flex items-center gap-1.5 font-medium">
                            📏 {route.distanceKm.toFixed(1)} km
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500">
                            ⏱ ~{Math.round(route.durationMin)} phút di chuyển
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
