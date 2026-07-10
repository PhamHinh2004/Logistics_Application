import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export default function LocationPickerInput({ value, onChange, placeholder }) {
    const [keyword, setKeyword] = useState(value?.address || "");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (keyword.length < 3) {
            setResults([]);
            return;
        }
        const timer = setTimeout(() => search(keyword), 500);
        return () => clearTimeout(timer);
    }, [keyword]);

    async function search(text) {
        try {
            const res = await fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
                    text
                )}&apiKey=${API_KEY}&filter=countrycode:vn&limit=5`
            );
            const data = await res.json();
            setResults(
                (data.features || []).map((f) => ({
                    id: f.properties.place_id,
                    address: f.properties.formatted,
                    lat: f.properties.lat,
                    lng: f.properties.lon,
                }))
            );
        } catch (err) {
            console.error("Geocode search failed:", err);
            setResults([]);
        }
    }

    function select(place) {
        setKeyword(place.address);
        setResults([]);
        onChange(place);
    }

    return (
        <div className="relative">
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={placeholder || "Tìm địa điểm..."}
                className="w-full border rounded-xl px-4 py-3"
            />
            {results.length > 0 && (
                <div className="absolute z-[1000] left-0 right-0 bg-white border rounded-xl shadow-xl mt-2 overflow-hidden">
                    {results.map((place) => (
                        <button
                            key={place.id}
                            type="button"
                            onClick={() => select(place)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b last:border-none"
                        >
                            {place.address}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
