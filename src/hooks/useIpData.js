import { useEffect, useMemo, useState } from "react";

const empty = {
  ip: "",
  city: "",
  region: "",
  country_name: "",
  postal: "",
  time_zone: { abbr: "", offset: "" },
  asn: { name: "" },
  latitude: 0,
  longitude: 0,
};

export default function useIpData(ipQuery) {
  const [data, setData] = useState(empty);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_IPDATA_KEY;

  const endpoint = useMemo(() => {
    const ip = ipQuery?.ip?.trim() || "";
    // اگر ip خالی باشه، ipdata آی‌پی کاربر رو برمی‌گردونه
    return `https://api.ipdata.co/${ip}?api-key=5487fe827551d1c9bfba54537f7d2b3a3b93ae4c1fa946dea43a417b`;
  }, [ipQuery, API_KEY]);

  useEffect(() => {
    if (!API_KEY) {
      console.warn("Missing VITE_IPDATA_KEY in .env.local");
    }
    let ignore = false;
    setLoading(true);

    fetch(endpoint)
      .then((r) => r.json())
      .then((json) => {
        if (ignore) return;

        // اگر خطا داشت
        if (!json || json.message === "Invalid API key") {
          setData(empty);
          return;
        }

        setData({
          ip: json.ip || "",
          city: json.city || "",
          region: json.region || "",
          country_name: json.country_name || "",
          postal: json.postal || "",
          time_zone: {
            abbr: json.time_zone?.abbr || json.time_zone?.name || "",
            offset: json.time_zone?.offset || "",
          },
          asn: { name: json.asn?.name || json.asn?.domain || "" },
          latitude: json.latitude || 0,
          longitude: json.longitude || 0,
        });
      })
      .catch(() => setData(empty))
      .finally(() => setLoading(false));

    return () => {
      ignore = true;
    };
  }, [endpoint, API_KEY]);

  const center =
    data.latitude && data.longitude ? [data.latitude, data.longitude] : null;

  return { data, isLoading: loading, center };
}
