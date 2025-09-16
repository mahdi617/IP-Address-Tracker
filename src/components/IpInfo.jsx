import useIpData from "../hooks/useIpData.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function IpInfo({ ipQuery }) {
  const { data, isLoading } = useIpData(ipQuery);

  let location = `${data.city}, ${data.region}, ${data.country_name} ${
    data.postal || ""
  }`
    .split(",")
    .filter((x) => x && x.trim() !== "undefined")
    .join(",");

  return (
    <div className="ip-info">
      <div className="info-block">
        <h3>IP ADDRESS</h3>
        <p>{data?.ip || <Skeleton width={160} />}</p>
      </div>

      <div className="info-block">
        <h3>LOCATION</h3>
        <p>{isLoading ? <Skeleton width={200} /> : location || "-"}</p>
      </div>

      <div className="info-block">
        <h3>TIMEZONE</h3>
        <p>
          {data?.time_zone?.abbr} {data?.time_zone?.offset}
        </p>
      </div>

      <div className="info-block">
        <h3>ISP</h3>
        <p>{data?.asn?.name || "-"}</p>
      </div>
    </div>
  );
}
