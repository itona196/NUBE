import { ImageResponse } from "next/og";

export const alt = "NUBE — Festival indépendant et studio artistique à Lausanne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "radial-gradient(circle at 82% 48%, #6f264e 0%, #170d16 35%, #08080a 72%)",
        color: "#f1efe9",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        padding: "76px 86px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
        <span style={{ color: "#ff66c4", fontSize: 24, fontWeight: 800, letterSpacing: 5 }}>
          FESTIVAL INDÉPENDANT · LAUSANNE
        </span>
        <strong style={{ fontSize: 118, fontWeight: 900, letterSpacing: -8, lineHeight: .92, marginTop: 34 }}>
          NUBE
        </strong>
        <span style={{ color: "#ff66c4", fontSize: 70, fontWeight: 400, letterSpacing: -4 }}>
          OPEN AIR.
        </span>
        <span style={{ color: "#d4ced5", fontSize: 28, lineHeight: 1.4, marginTop: 34 }}>
          Une scène. Plusieurs mondes.
        </span>
      </div>
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff66c4",
          borderRadius: 999,
          boxShadow: "0 0 70px rgba(255,102,196,.42), inset 0 0 45px rgba(255,102,196,.18)",
          display: "flex",
          height: 330,
          justifyContent: "center",
          width: 330,
        }}
      >
        <span style={{ color: "#ff66c4", fontSize: 92, fontWeight: 900, letterSpacing: -7 }}>N°</span>
      </div>
    </div>,
    size,
  );
}
