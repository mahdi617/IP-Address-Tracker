import { useState } from "react";
import SearchInput from "./components/SearchInput.jsx";
import IpInfo from "./components/IpInfo.jsx";
import MapElement from "./components/MapElement.jsx";
import useWindowWidth from "./hooks/useWindowWidth.js";

import bgDesktop from "./assets/pattern-bg-desktop.png";
import bgMobile from "./assets/pattern-bg-mobile.png";

export default function App() {
  const isWide = useWindowWidth(650);
  const [ipQuery, setIpQuery] = useState({ ip: undefined, domain: "" });

  const handleSubmit = (ip) => setIpQuery((p) => ({ ...p, ip }));

  return (
    <main
      style={{
        backgroundImage: `url(${isWide ? bgDesktop : bgMobile})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <h1>IP Address Tracker</h1>
      <SearchInput onSubmit={handleSubmit} />
      <IpInfo ipQuery={ipQuery} />
      <MapElement ipQuery={ipQuery} />
    </main>
  );
}

