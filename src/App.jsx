import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROPERTIES = [
  {
    id: 1,
    title: "Serene Clifftop Villa",
    location: "Malibu, CA",
    price: 4850000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    type: "Villa",
    status: "For Sale",
    tag: "Featured",
    lat: 34.03,
    lng: -118.78,
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    desc: "Breathtaking ocean views from every room. Infinity pool, chef's kitchen, and floor-to-ceiling glass walls.",
    year: 2019,
    garage: 2,
    amenities: ["Pool", "Ocean View", "Smart Home", "Wine Cellar"],
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    location: "Manhattan, NY",
    price: 7200000,
    beds: 3,
    baths: 3,
    sqft: 3100,
    type: "Penthouse",
    status: "For Sale",
    tag: "New",
    lat: 40.75,
    lng: -73.98,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    desc: "Sky-high luxury in the heart of Manhattan. Private terrace, concierge service, and panoramic city views.",
    year: 2021,
    garage: 1,
    amenities: ["Terrace", "City View", "Concierge", "Gym"],
  },
  {
    id: 3,
    title: "Modern Forest Retreat",
    location: "Aspen, CO",
    price: 3100000,
    beds: 4,
    baths: 3,
    sqft: 3600,
    type: "House",
    status: "For Sale",
    tag: "Hot",
    lat: 39.19,
    lng: -106.82,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    desc: "Nestled among ancient pines. Radiant floor heating, stone fireplace, and a private hot tub overlooking the forest.",
    year: 2018,
    garage: 2,
    amenities: ["Hot Tub", "Mountain View", "Fireplace", "Ski Access"],
  },
  {
    id: 4,
    title: "Lakeside Contemporary",
    location: "Lake Tahoe, NV",
    price: 2750000,
    beds: 4,
    baths: 4,
    sqft: 3900,
    type: "House",
    status: "For Sale",
    tag: "",
    lat: 39.09,
    lng: -120.03,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    desc: "Direct lake access from a private dock. Open-plan living with walls of glass, sauna, and game room.",
    year: 2020,
    garage: 3,
    amenities: ["Dock", "Lake View", "Sauna", "Game Room"],
  },
  {
    id: 5,
    title: "Mediterranean Estate",
    location: "Miami Beach, FL",
    price: 5600000,
    beds: 6,
    baths: 5,
    sqft: 5500,
    type: "Villa",
    status: "For Sale",
    tag: "Featured",
    lat: 25.79,
    lng: -80.13,
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    desc: "Lush tropical landscaping surrounds this palatial estate. Resort-style pool, summer kitchen, and private beach access.",
    year: 2017,
    garage: 4,
    amenities: ["Beach Access", "Pool", "Summer Kitchen", "Gym"],
  },
  {
    id: 6,
    title: "Urban Loft Collection",
    location: "Chicago, IL",
    price: 1200000,
    beds: 2,
    baths: 2,
    sqft: 2100,
    type: "Loft",
    status: "For Rent",
    tag: "New",
    lat: 41.88,
    lng: -87.63,
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    desc: "Industrial-chic loft with exposed brick, 14-foot ceilings, and curated designer finishes throughout.",
    year: 2022,
    garage: 1,
    amenities: ["Rooftop", "City View", "Coworking", "Bike Storage"],
  },
  {
    id: 7,
    title: "Vineyard Estate",
    location: "Napa Valley, CA",
    price: 8900000,
    beds: 7,
    baths: 6,
    sqft: 7200,
    type: "Estate",
    status: "For Sale",
    tag: "Luxury",
    lat: 38.29,
    lng: -122.28,
    img: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800&q=80",
    desc: "Encompassing 12 acres of producing vineyard. Grand main house, guest cottage, cellar, and tasting room.",
    year: 2010,
    garage: 6,
    amenities: ["Vineyard", "Guest House", "Wine Cellar", "Pool"],
  },
  {
    id: 8,
    title: "Canyon Modern",
    location: "Sedona, AZ",
    price: 1950000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    type: "House",
    status: "For Sale",
    tag: "",
    lat: 34.86,
    lng: -111.79,
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    desc: "Carved into the red rock landscape. Passive solar design, outdoor kitchen, and meditation garden.",
    year: 2023,
    garage: 2,
    amenities: ["Canyon View", "Outdoor Kitchen", "Solar", "Garden"],
  },
];

const AGENT = {
  name: "Alexandra Voss",
  title: "Principal Broker",
  phone: "+1 (888) 555-0192",
  email: "alex@estatenova.com",
  img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
  listings: 47,
  sold: 312,
  years: 14,
};

const TESTIMONIALS = [
  {
    name: "James & Claire",
    text: "EstateNova found us our dream home in under 3 weeks. The filtering tools are incredible — we narrowed 500 listings down to our perfect match.",
    stars: 5,
    location: "Purchased in Malibu",
  },
  {
    name: "Dr. Sarah Okafor",
    text: "Sold my penthouse for 8% above asking price. The virtual tour feature alone brought in 12 serious buyers.",
    stars: 5,
    location: "Sold in Manhattan",
  },
  {
    name: "The Harrington Family",
    text: "Moving cross-country was daunting, but the interactive map and neighborhood insights made it feel effortless.",
    stars: 5,
    location: "Relocated to Aspen",
  },
];

const STATS = [
  { val: "2,400+", label: "Properties Listed" },
  { val: "$14B+", label: "Total Sales Volume" },
  { val: "98%", label: "Client Satisfaction" },
  { val: "32", label: "Cities Covered" },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
const fmt = (n) => "$" + n.toLocaleString();
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// ─── ICON SVGs ────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18 }) => {
  const icons = {
    bed: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M2 9V19M22 9V19M2 14H22M2 9C2 9 5 7 12 7S22 9 22 9" />
        <rect x="5" y="9" width="5" height="5" rx="1" />
      </svg>
    ),
    bath: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 12H20V17C20 18.1 19.1 19 18 19H6C4.9 19 4 18.1 4 17V12Z" />
        <path d="M4 12V6C4 4.9 4.9 4 6 4V4C7.1 4 8 4.9 8 6V12" />
        <circle cx="6" cy="4" r="0" />
      </svg>
    ),
    sqft: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9H21M9 3V21" />
      </svg>
    ),
    search: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21L16.65 16.65" />
      </svg>
    ),
    heart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    heartFill: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="#e63c3c"
        stroke="#e63c3c"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    close: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    filter: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
    map: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
    grid: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    list: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    star: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    phone: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    mail: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    arrow: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    share: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    check: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    slider: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
    garage: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 9L12 3L21 9V20C21 20.6 20.6 21 20 21H4C3.4 21 3 20.6 3 20V9Z" />
        <path d="M9 21V12H15V21" />
        <path d="M7 12H17M7 15H17" />
      </svg>
    ),
    chevron: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────
const Tag = ({ label }) => {
  const colors = {
    Featured: "#b8973a",
    New: "#2a7a4f",
    Hot: "#c44336",
    Luxury: "#7b3fbe",
  };
  if (!label) return null;
  return (
    <span
      style={{
        background: colors[label] || "#555",
        color: "#fff",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        padding: "3px 10px",
        borderRadius: 4,
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
};

const Stars = ({ n = 5 }) => (
  <span style={{ color: "#d4a017", display: "flex", gap: 2 }}>
    {Array.from({ length: n }).map((_, i) => (
      <Icon key={i} name="star" size={14} />
    ))}
  </span>
);

const Toast = ({ msg, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#1a1a2e",
        color: "#fff",
        padding: "14px 28px",
        borderRadius: 12,
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        zIndex: 9999,
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "slideUp 0.3s ease",
      }}
    >
      <span style={{ color: "#5cbf8a" }}>
        <Icon name="check" size={18} />
      </span>
      {msg}
    </div>
  );
};

// ─── PROPERTY CARD ────────────────────────────────────────────────────────────
const PropertyCard = ({ p, saved, onSave, onClick, view = "grid" }) => {
  const [hovered, setHovered] = useState(false);
  if (view === "list") {
    return (
      <div
        onClick={() => onClick(p)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          background: "#fff",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.12)"
            : "0 2px 12px rgba(0,0,0,0.06)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-2px)" : "none",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 280,
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={p.img}
            alt={p.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <Tag label={p.tag} />
          </div>
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: p.status === "For Sale" ? "#1a3a5c" : "#2a7a4f",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              letterSpacing: "0.06em",
            }}
          >
            {p.status}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    color: "#8a8fa8",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    margin: "0 0 6px",
                  }}
                >
                  {p.location}
                </p>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: 22,
                    fontFamily: "'Playfair Display', serif",
                    color: "#1a1a2e",
                  }}
                >
                  {p.title}
                </h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#1a3a5c",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {fmt(p.price)}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "#8a8fa8" }}>
                  {p.type}
                </p>
              </div>
            </div>
            <p
              style={{
                color: "#555",
                fontSize: 14,
                lineHeight: 1.6,
                margin: "12px 0",
              }}
            >
              {p.desc}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.amenities.map((a) => (
                <span
                  key={a}
                  style={{
                    background: "#f0f4ff",
                    color: "#3a5cbf",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 20,
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid #f0f0f5",
            }}
          >
            <div style={{ display: "flex", gap: 20 }}>
              {[
                ["bed", `${p.beds} Beds`],
                ["bath", `${p.baths} Baths`],
                ["sqft", `${p.sqft.toLocaleString()} sqft`],
                ["garage", `${p.garage} Garage`],
              ].map(([icon, label]) => (
                <span
                  key={icon}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    color: "#555",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "#8a8fa8" }}>
                    <Icon name={icon} size={16} />
                  </span>
                  {label}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave(p.id);
              }}
              style={{
                background: saved ? "#fff0f0" : "#f5f5f8",
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: saved ? "#e63c3c" : "#555",
                fontWeight: 600,
              }}
            >
              <Icon name={saved ? "heartFill" : "heart"} size={16} />
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick(p)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 16px 48px rgba(0,0,0,0.14)"
          : "0 2px 16px rgba(0,0,0,0.07)",
        cursor: "pointer",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "none",
      }}
    >
      <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
        <img
          src={p.img}
          alt={p.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(10,10,20,0.55))",
          }}
        />
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <Tag label={p.tag} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background:
              p.status === "For Sale"
                ? "rgba(26,58,92,0.92)"
                : "rgba(42,122,79,0.92)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: 20,
            backdropFilter: "blur(4px)",
            letterSpacing: "0.06em",
          }}
        >
          {p.status}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(p.id);
          }}
          style={{
            position: "absolute",
            bottom: 14,
            right: 14,
            background: "rgba(255,255,255,0.95)",
            border: "none",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.2s",
            transform: saved ? "scale(1.1)" : "scale(1)",
          }}
        >
          <Icon name={saved ? "heartFill" : "heart"} size={18} />
        </button>
        <div
          style={{ position: "absolute", bottom: 14, left: 14, color: "#fff" }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11,
              opacity: 0.85,
              letterSpacing: "0.08em",
            }}
          >
            {p.type.toUpperCase()}
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 22,
              fontWeight: 800,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {fmt(p.price)}
          </p>
        </div>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <p
          style={{
            margin: "0 0 4px",
            fontSize: 11,
            color: "#8a8fa8",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {p.location}
        </p>
        <h3
          style={{
            margin: "0 0 14px",
            fontSize: 17,
            fontFamily: "'Playfair Display', serif",
            color: "#1a1a2e",
            lineHeight: 1.3,
          }}
        >
          {p.title}
        </h3>
        <div
          style={{
            display: "flex",
            gap: 16,
            paddingTop: 14,
            borderTop: "1px solid #f0f0f5",
          }}
        >
          {[
            ["bed", p.beds + " Beds"],
            ["bath", p.baths + " Ba"],
            ["sqft", (p.sqft / 1000).toFixed(1) + "k sqft"],
          ].map(([icon, label]) => (
            <span
              key={icon}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: "#555",
                fontSize: 12,
              }}
            >
              <span style={{ color: "#9a9eb8" }}>
                <Icon name={icon} size={14} />
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MODAL ────────────────────────────────────────────────────────────────────
const Modal = ({ p, saved, onSave, onClose, onToast }) => {
  const [tab, setTab] = useState("overview");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    msg: `I'm interested in ${p.title}. Please contact me.`,
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setSent(true);
    onToast("Message sent! Agent will contact you shortly.");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,10,20,0.75)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 900,
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ position: "relative", height: 380 }}>
          <img
            src={p.img}
            alt={p.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(10,10,20,0.7) 100%)",
            }}
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
          >
            <Icon name="close" size={18} />
          </button>
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              display: "flex",
              gap: 8,
            }}
          >
            <Tag label={p.tag} />
            <span
              style={{
                background:
                  p.status === "For Sale"
                    ? "rgba(26,58,92,0.9)"
                    : "rgba(42,122,79,0.9)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 20,
                backdropFilter: "blur(4px)",
              }}
            >
              {p.status}
            </span>
          </div>
          <div style={{ position: "absolute", bottom: 24, left: 28 }}>
            <p
              style={{
                margin: "0 0 4px",
                color: "rgba(255,255,255,0.8)",
                fontSize: 13,
                letterSpacing: "0.08em",
              }}
            >
              {p.location}
            </p>
            <h2
              style={{
                margin: 0,
                color: "#fff",
                fontSize: 32,
                fontFamily: "'Playfair Display', serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              {p.title}
            </h2>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              textAlign: "right",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#fff",
                fontSize: 36,
                fontWeight: 800,
                fontFamily: "'Playfair Display', serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              }}
            >
              {fmt(p.price)}
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <button
                onClick={() => onSave(p.id)}
                style={{
                  background: saved
                    ? "rgba(230,60,60,0.9)"
                    : "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: saved ? "#fff" : "#333",
                }}
              >
                <Icon name={saved ? "heartFill" : "heart"} size={15} />
                {saved ? "Saved" : "Save"}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  onToast("Link copied to clipboard!");
                }}
                style={{
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                <Icon name="share" size={15} />
                Share
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: "0 28px" }}>
          <div
            style={{
              display: "flex",
              gap: 4,
              borderBottom: "1px solid #f0f0f5",
              marginBottom: 0,
            }}
          >
            {["overview", "details", "contact"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "16px 20px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  color: tab === t ? "#1a3a5c" : "#8a8fa8",
                  borderBottom:
                    tab === t ? "2px solid #1a3a5c" : "2px solid transparent",
                  textTransform: "capitalize",
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "28px" }}>
          {tab === "overview" && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                  marginBottom: 28,
                }}
              >
                {[
                  ["bed", "Bedrooms", p.beds],
                  ["bath", "Bathrooms", p.baths],
                  ["sqft", "Square Feet", p.sqft.toLocaleString()],
                  ["garage", "Garage", p.garage + " Car"],
                ].map(([icon, label, val]) => (
                  <div
                    key={icon}
                    style={{
                      background: "#f8f9ff",
                      borderRadius: 14,
                      padding: "18px 16px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#1a3a5c",
                        marginBottom: 8,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name={icon} size={22} />
                    </div>
                    <p
                      style={{
                        margin: "0 0 4px",
                        fontSize: 11,
                        color: "#8a8fa8",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 20,
                        fontWeight: 800,
                        color: "#1a1a2e",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {val}
                    </p>
                  </div>
                ))}
              </div>
              <h4
                style={{
                  margin: "0 0 12px",
                  color: "#1a1a2e",
                  fontSize: 16,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                About this property
              </h4>
              <p
                style={{
                  color: "#555",
                  lineHeight: 1.75,
                  fontSize: 15,
                  margin: "0 0 24px",
                }}
              >
                {p.desc}
              </p>
              <h4
                style={{
                  margin: "0 0 12px",
                  color: "#1a1a2e",
                  fontSize: 16,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Key Amenities
              </h4>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {p.amenities.map((a) => (
                  <span
                    key={a}
                    style={{
                      background: "#eef2ff",
                      color: "#3a5cbf",
                      fontSize: 13,
                      fontWeight: 600,
                      padding: "6px 16px",
                      borderRadius: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Icon name="check" size={13} />
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tab === "details" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              {[
                ["Property Type", p.type],
                ["Status", p.status],
                ["Year Built", p.year],
                ["Beds", p.beds],
                ["Baths", p.baths],
                ["Sqft", p.sqft.toLocaleString()],
                ["Garage", p.garage + " car(s)"],
                [
                  "Price/sqft",
                  "$" + Math.round(p.price / p.sqft).toLocaleString(),
                ],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    borderBottom: "1px solid #f5f5f8",
                  }}
                >
                  <span style={{ color: "#8a8fa8", fontSize: 14 }}>{k}</span>
                  <span
                    style={{ color: "#1a1a2e", fontWeight: 700, fontSize: 14 }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab === "contact" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 20,
                    padding: 20,
                    background: "#f8f9ff",
                    borderRadius: 16,
                  }}
                >
                  <img
                    src={AGENT.img}
                    alt={AGENT.name}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p
                      style={{
                        margin: "0 0 2px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        fontSize: 15,
                      }}
                    >
                      {AGENT.name}
                    </p>
                    <p
                      style={{
                        margin: "0 0 8px",
                        color: "#8a8fa8",
                        fontSize: 12,
                      }}
                    >
                      {AGENT.title}
                    </p>
                    <div style={{ display: "flex", gap: 10 }}>
                      <a
                        href={"tel:" + AGENT.phone}
                        style={{
                          color: "#1a3a5c",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 12,
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                      >
                        <Icon name="phone" size={13} />
                        {AGENT.phone}
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 12,
                  }}
                >
                  {[
                    ["Listings", AGENT.listings],
                    ["Sold", AGENT.sold],
                    ["Years", AGENT.years],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        textAlign: "center",
                        padding: "14px 10px",
                        background: "#f8f9ff",
                        borderRadius: 12,
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 2px",
                          fontSize: 22,
                          fontWeight: 800,
                          color: "#1a3a5c",
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        {v}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 11,
                          color: "#8a8fa8",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {k.toUpperCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "32px 20px" }}>
                    <div style={{ color: "#2a7a4f", marginBottom: 12 }}>
                      <Icon name="check" size={40} />
                    </div>
                    <h4
                      style={{
                        margin: "0 0 8px",
                        fontFamily: "'Playfair Display', serif",
                        color: "#1a1a2e",
                        fontSize: 20,
                      }}
                    >
                      Message Sent!
                    </h4>
                    <p style={{ color: "#8a8fa8", margin: 0 }}>
                      Alexandra will reach out to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 4px",
                        fontFamily: "'Playfair Display', serif",
                        color: "#1a1a2e",
                        fontSize: 18,
                      }}
                    >
                      Schedule a Viewing
                    </h4>
                    {[
                      ["Your Name", "name", "text"],
                      ["Email Address", "email", "email"],
                      ["Phone (optional)", "phone", "tel"],
                    ].map(([placeholder, key, type]) => (
                      <input
                        key={key}
                        type={type}
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [key]: e.target.value }))
                        }
                        style={{
                          padding: "12px 16px",
                          border: "1.5px solid #e8e8f0",
                          borderRadius: 10,
                          fontSize: 14,
                          outline: "none",
                          fontFamily: "inherit",
                          color: "#1a1a2e",
                        }}
                      />
                    ))}
                    <textarea
                      placeholder="Your message…"
                      value={form.msg}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, msg: e.target.value }))
                      }
                      rows={3}
                      style={{
                        padding: "12px 16px",
                        border: "1.5px solid #e8e8f0",
                        borderRadius: 10,
                        fontSize: 14,
                        resize: "none",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "#1a1a2e",
                      }}
                    />
                    <button
                      onClick={handleSubmit}
                      style={{
                        background: "#1a3a5c",
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "14px",
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Send Message <Icon name="arrow" size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── PRICE RANGE SLIDER ───────────────────────────────────────────────────────
const PriceSlider = ({ min, max, value, onChange }) => {
  const trackRef = useRef(null);
  const dragging = useRef(null);
  const pct = (v) => ((v - min) / (max - min)) * 100;
  const fromPct = (p) => Math.round(min + (p / 100) * (max - min));

  const handleMouseMove = useCallback(
    (e) => {
      if (!dragging.current || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const p = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
      const v = fromPct(p);
      if (dragging.current === "low")
        onChange([Math.min(v, value[1] - 100000), value[1]]);
      else onChange([value[0], Math.max(v, value[0] + 100000)]);
    },
    [value, min, max],
  );

  useEffect(() => {
    const up = () => (dragging.current = null);
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const lo = pct(value[0]),
    hi = pct(value[1]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1a3a5c" }}>
          {fmt(value[0])}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1a3a5c" }}>
          {fmt(value[1])}
        </span>
      </div>
      <div
        ref={trackRef}
        style={{
          position: "relative",
          height: 6,
          background: "#e8e8f0",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: lo + "%",
            width: hi - lo + "%",
            height: "100%",
            background: "#1a3a5c",
            borderRadius: 4,
          }}
        />
        {[
          ["low", lo],
          ["high", hi],
        ].map(([side, p]) => (
          <div
            key={side}
            onMouseDown={() => (dragging.current = side)}
            style={{
              position: "absolute",
              top: "50%",
              left: p + "%",
              transform: "translate(-50%,-50%)",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#1a3a5c",
              border: "3px solid #fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              cursor: "grab",
              zIndex: 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    type: "All",
    status: "All",
    minBeds: 0,
    priceRange: [0, 10000000],
  });
  const [sort, setSort] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [saved, setSaved] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [heroSearch, setHeroSearch] = useState("");

  const toggleSave = (id) => {
    setSaved((s) => {
      const n = new Set(s);
      if (n.has(id)) {
        n.delete(id);
        setToast("Removed from saved properties");
      } else {
        n.add(id);
        setToast("Saved to your favorites!");
      }
      return n;
    });
  };

  const filtered = PROPERTIES.filter((p) => {
    if (
      search &&
      !p.title.toLowerCase().includes(search.toLowerCase()) &&
      !p.location.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (filters.type !== "All" && p.type !== filters.type) return false;
    if (filters.status !== "All" && p.status !== filters.status) return false;
    if (p.beds < filters.minBeds) return false;
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1])
      return false;
    return true;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "newest") return b.year - a.year;
    return (b.tag ? 1 : 0) - (a.tag ? 1 : 0);
  });

  const savedProps = PROPERTIES.filter((p) => saved.has(p.id));

  // ── HOME PAGE ──
  if (page === "home")
    return (
      <div
        style={{
          fontFamily: "'Lato', sans-serif",
          color: "#1a1a2e",
          minHeight: "100vh",
          background: "#fff",
        }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400&family=Lato:wght@300;400;600;700;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f5f5f8; } ::-webkit-scrollbar-thumb { background: #c0c4d8; border-radius: 4px; }
        input:focus, textarea:focus, select:focus { border-color: #1a3a5c !important; box-shadow: 0 0 0 3px rgba(26,58,92,0.1) !important; }
      `}</style>

        {/* NAV */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "#1a3a5c",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              >
                <path d="M3 9L12 2L21 9V20C21 20.6 20.6 21 20 21H4C3.4 21 3 20.6 3 20V9Z" />
                <path d="M9 21V12H15V21" />
              </svg>
            </div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: "#1a1a2e",
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.02em",
              }}
            >
              EstateNova
            </span>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={() => setPage("saved")}
              style={{
                background: saved.size > 0 ? "#fff0f0" : "#f5f5f8",
                border: "none",
                borderRadius: 10,
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                color: saved.size > 0 ? "#e63c3c" : "#555",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon name="heart" size={16} />
              Saved {saved.size > 0 && `(${saved.size})`}
            </button>
            <button
              onClick={() => setPage("listings")}
              style={{
                background: "#1a3a5c",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "8px 20px",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              Browse Homes
            </button>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ position: "relative", height: 680, overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85"
            alt="hero"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, rgba(10,15,35,0.75) 0%, rgba(10,15,35,0.3) 60%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 80px",
            }}
          >
            <div style={{ animation: "fadeUp 0.8s ease both" }}>
              <p
                style={{
                  margin: "0 0 12px",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Premium Real Estate
              </p>
              <h1
                style={{
                  margin: "0 0 16px",
                  color: "#fff",
                  fontSize: 62,
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1.1,
                  fontWeight: 800,
                  maxWidth: 620,
                }}
              >
                Find Your
                <br />
                <em style={{ fontStyle: "italic", color: "#d4af6a" }}>
                  Perfect
                </em>{" "}
                Home
              </h1>
              <p
                style={{
                  margin: "0 0 40px",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 18,
                  maxWidth: 480,
                  lineHeight: 1.6,
                }}
              >
                Explore curated luxury properties across America's most
                desirable locations.
              </p>
            </div>
            {/* SEARCH BAR */}
            <div
              style={{
                animation: "fadeUp 0.8s 0.2s ease both",
                display: "flex",
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                maxWidth: 640,
                boxShadow: "0 16px 60px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 20px",
                  gap: 12,
                  borderRight: "1px solid #f0f0f5",
                }}
              >
                <span style={{ color: "#8a8fa8" }}>
                  <Icon name="search" size={20} />
                </span>
                <input
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearch(heroSearch);
                      setPage("listings");
                    }
                  }}
                  placeholder="City, neighborhood, or address…"
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: 15,
                    fontFamily: "inherit",
                    color: "#1a1a2e",
                    width: "100%",
                    padding: "18px 0",
                    background: "transparent",
                  }}
                />
              </div>
              <button
                onClick={() => {
                  setSearch(heroSearch);
                  setPage("listings");
                }}
                style={{
                  background: "#1a3a5c",
                  color: "#fff",
                  border: "none",
                  padding: "0 32px",
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Search <Icon name="arrow" size={16} />
              </button>
            </div>
            <div
              style={{
                animation: "fadeUp 0.8s 0.35s ease both",
                marginTop: 20,
                display: "flex",
                gap: 16,
              }}
            >
              {["Malibu", "Manhattan", "Aspen", "Miami"].map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSearch(city);
                    setPage("listings");
                  }}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#fff",
                    borderRadius: 20,
                    padding: "6px 18px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    transition: "background 0.2s",
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div
          style={{
            background: "#1a1a2e",
            padding: "32px 80px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {STATS.map(({ val, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#d4af6a",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {val}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* FEATURED */}
        <div style={{ padding: "80px 80px 60px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 40,
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 12,
                  color: "#8a8fa8",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Handpicked for You
              </p>
              <h2
                style={{
                  margin: 0,
                  fontSize: 40,
                  fontFamily: "'Playfair Display', serif",
                  color: "#1a1a2e",
                }}
              >
                Featured Properties
              </h2>
            </div>
            <button
              onClick={() => setPage("listings")}
              style={{
                background: "transparent",
                border: "2px solid #1a3a5c",
                color: "#1a3a5c",
                borderRadius: 10,
                padding: "10px 24px",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              View All <Icon name="arrow" size={15} />
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {PROPERTIES.filter(
              (p) => p.tag === "Featured" || p.tag === "Luxury",
            )
              .slice(0, 3)
              .map((p) => (
                <PropertyCard
                  key={p.id}
                  p={p}
                  saved={saved.has(p.id)}
                  onSave={toggleSave}
                  onClick={setSelected}
                />
              ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div style={{ background: "#f8f9ff", padding: "80px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p
              style={{
                margin: "0 0 8px",
                fontSize: 12,
                color: "#8a8fa8",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Client Stories
            </p>
            <h2
              style={{
                margin: 0,
                fontSize: 40,
                fontFamily: "'Playfair Display', serif",
                color: "#1a1a2e",
              }}
            >
              What Our Clients Say
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "32px 28px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <Stars n={t.stars} />
                <p
                  style={{
                    color: "#444",
                    lineHeight: 1.7,
                    fontSize: 15,
                    margin: "16px 0 24px",
                    fontStyle: "italic",
                  }}
                >
                  "{t.text}"
                </p>
                <div style={{ borderTop: "1px solid #f0f0f5", paddingTop: 16 }}>
                  <p
                    style={{
                      margin: "0 0 2px",
                      fontWeight: 700,
                      color: "#1a1a2e",
                      fontSize: 15,
                    }}
                  >
                    {t.name}
                  </p>
                  <p style={{ margin: 0, color: "#8a8fa8", fontSize: 13 }}>
                    {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            margin: "80px 80px",
            background: "linear-gradient(135deg, #1a1a2e 0%, #1a3a5c 100%)",
            borderRadius: 28,
            padding: "64px 80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -60,
              top: -60,
              width: 300,
              height: 300,
              background: "rgba(212,175,106,0.08)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 100,
              bottom: -80,
              width: 200,
              height: 200,
              background: "rgba(212,175,106,0.06)",
              borderRadius: "50%",
            }}
          />
          <div style={{ position: "relative" }}>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: 40,
                fontFamily: "'Playfair Display', serif",
                color: "#fff",
              }}
            >
              Ready to Find
              <br />
              Your Dream Home?
            </h2>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.65)",
                fontSize: 16,
                maxWidth: 380,
                lineHeight: 1.6,
              }}
            >
              Talk to our team of expert agents who are ready to guide you
              through every step of your journey.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, position: "relative" }}>
            <button
              onClick={() => setPage("listings")}
              style={{
                background: "#d4af6a",
                color: "#1a1a2e",
                border: "none",
                borderRadius: 12,
                padding: "16px 32px",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "0.04em",
              }}
            >
              Browse Properties
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 12,
                padding: "16px 32px",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Contact an Agent
            </button>
          </div>
        </div>

        <footer
          style={{
            background: "#1a1a2e",
            padding: "48px 80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                color: "#fff",
                fontWeight: 800,
              }}
            >
              EstateNova
            </p>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.4)",
                fontSize: 13,
              }}
            >
              © 2026 EstateNova. All rights reserved.
            </p>
          </div>
          <p
            style={{ margin: 0, color: "rgba(255,255,255,0.4)", fontSize: 13 }}
          >
            Premium Real Estate · Since 2012
          </p>
        </footer>

        {selected && (
          <Modal
            p={selected}
            saved={saved.has(selected.id)}
            onSave={toggleSave}
            onClose={() => setSelected(null)}
            onToast={setToast}
          />
        )}
        {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      </div>
    );

  // ── LISTINGS PAGE ──
  if (page === "listings")
    return (
      <div
        style={{
          fontFamily: "'Lato', sans-serif",
          color: "#1a1a2e",
          minHeight: "100vh",
          background: "#f8f9ff",
        }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400&family=Lato:wght@300;400;600;700;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f5f5f8; } ::-webkit-scrollbar-thumb { background: #c0c4d8; border-radius: 4px; }
        input:focus, textarea:focus, select:focus { border-color: #1a3a5c !important; box-shadow: 0 0 0 3px rgba(26,58,92,0.1) !important; }
      `}</style>

        <nav
          style={{
            background: "#fff",
            borderBottom: "1px solid #f0f0f5",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <button
            onClick={() => setPage("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: "#1a3a5c",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              >
                <path d="M3 9L12 2L21 9V20C21 20.6 20.6 21 20 21H4C3.4 21 3 20.6 3 20V9Z" />
                <path d="M9 21V12H15V21" />
              </svg>
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#1a1a2e",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              EstateNova
            </span>
          </button>
          <div style={{ flex: 1, maxWidth: 440, margin: "0 40px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f5f5f8",
                borderRadius: 10,
                padding: "0 14px",
                gap: 10,
              }}
            >
              <Icon name="search" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city or property name…"
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  padding: "10px 0",
                  fontSize: 14,
                  fontFamily: "inherit",
                  color: "#1a1a2e",
                  flex: 1,
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#8a8fa8",
                  }}
                >
                  <Icon name="close" size={16} />
                </button>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setPage("saved")}
              style={{
                background: saved.size > 0 ? "#fff0f0" : "#f5f5f8",
                border: "none",
                borderRadius: 10,
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                color: saved.size > 0 ? "#e63c3c" : "#555",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon name="heart" size={15} />
              Saved {saved.size > 0 && `(${saved.size})`}
            </button>
          </div>
        </nav>

        <div style={{ display: "flex" }}>
          {/* SIDEBAR */}
          <aside
            style={{
              width: 280,
              background: "#fff",
              borderRight: "1px solid #f0f0f5",
              padding: "24px",
              flexShrink: 0,
              minHeight: "calc(100vh - 64px)",
              position: "sticky",
              top: 64,
              maxHeight: "calc(100vh - 64px)",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#1a1a2e",
                }}
              >
                Filters
              </h3>
              <button
                onClick={() =>
                  setFilters({
                    type: "All",
                    status: "All",
                    minBeds: 0,
                    priceRange: [0, 10000000],
                  })
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#8a8fa8",
                  fontWeight: 600,
                }}
              >
                Reset
              </button>
            </div>

            {/* Price */}
            <div style={{ marginBottom: 28 }}>
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Price Range
              </p>
              <PriceSlider
                min={0}
                max={10000000}
                value={filters.priceRange}
                onChange={(v) => setFilters((f) => ({ ...f, priceRange: v }))}
              />
            </div>

            {/* Type */}
            <div style={{ marginBottom: 24 }}>
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Property Type
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["All", "House", "Villa", "Penthouse", "Loft", "Estate"].map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => setFilters((f) => ({ ...f, type: t }))}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 20,
                        border: "1.5px solid",
                        borderColor: filters.type === t ? "#1a3a5c" : "#e8e8f0",
                        background: filters.type === t ? "#1a3a5c" : "#fff",
                        color: filters.type === t ? "#fff" : "#555",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                    >
                      {t}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Status */}
            <div style={{ marginBottom: 24 }}>
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Status
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {["All", "For Sale", "For Rent"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilters((f) => ({ ...f, status: s }))}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      border: "1.5px solid",
                      borderColor: filters.status === s ? "#1a3a5c" : "#e8e8f0",
                      background: filters.status === s ? "#1a3a5c" : "#fff",
                      color: filters.status === s ? "#fff" : "#555",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      transition: "all 0.2s",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Beds */}
            <div style={{ marginBottom: 24 }}>
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Min. Bedrooms
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {[0, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFilters((f) => ({ ...f, minBeds: n }))}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      border: "1.5px solid",
                      borderColor:
                        filters.minBeds === n ? "#1a3a5c" : "#e8e8f0",
                      background: filters.minBeds === n ? "#1a3a5c" : "#fff",
                      color: filters.minBeds === n ? "#fff" : "#555",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 700,
                      transition: "all 0.2s",
                    }}
                  >
                    {n === 0 ? "Any" : n + "+"}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div
              style={{
                padding: "16px",
                background: "#f8f9ff",
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#1a3a5c",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {filtered.length}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "#8a8fa8",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                }}
              >
                PROPERTIES FOUND
              </p>
            </div>
          </aside>

          {/* MAIN */}
          <main style={{ flex: 1, padding: "24px 32px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: "0 0 4px",
                    fontSize: 22,
                    fontFamily: "'Playfair Display', serif",
                    color: "#1a1a2e",
                  }}
                >
                  {search ? `Results for "${search}"` : "All Properties"}
                </h2>
                <p style={{ margin: 0, color: "#8a8fa8", fontSize: 13 }}>
                  {filtered.length} properties found
                </p>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{
                    padding: "8px 14px",
                    border: "1.5px solid #e8e8f0",
                    borderRadius: 10,
                    fontSize: 13,
                    fontFamily: "inherit",
                    color: "#1a1a2e",
                    outline: "none",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <div
                  style={{
                    display: "flex",
                    background: "#f5f5f8",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  {[
                    ["grid", "grid"],
                    ["list", "list"],
                  ].map(([mode, icon]) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      style={{
                        padding: "8px 14px",
                        border: "none",
                        background:
                          viewMode === mode ? "#1a3a5c" : "transparent",
                        color: viewMode === mode ? "#fff" : "#8a8fa8",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <Icon name={icon} size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <p style={{ fontSize: 48, marginBottom: 16 }}>🏡</p>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#1a1a2e",
                    margin: "0 0 8px",
                    fontSize: 24,
                  }}
                >
                  No properties found
                </h3>
                <p style={{ color: "#8a8fa8" }}>
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 24,
                }}
              >
                {filtered.map((p) => (
                  <PropertyCard
                    key={p.id}
                    p={p}
                    saved={saved.has(p.id)}
                    onSave={toggleSave}
                    onClick={setSelected}
                    view="grid"
                  />
                ))}
              </div>
            ) : (
              <div>
                {filtered.map((p) => (
                  <PropertyCard
                    key={p.id}
                    p={p}
                    saved={saved.has(p.id)}
                    onSave={toggleSave}
                    onClick={setSelected}
                    view="list"
                  />
                ))}
              </div>
            )}
          </main>
        </div>

        {selected && (
          <Modal
            p={selected}
            saved={saved.has(selected.id)}
            onSave={toggleSave}
            onClose={() => setSelected(null)}
            onToast={setToast}
          />
        )}
        {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      </div>
    );

  // ── SAVED PAGE ──
  return (
    <div
      style={{
        fontFamily: "'Lato', sans-serif",
        color: "#1a1a2e",
        minHeight: "100vh",
        background: "#f8f9ff",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800&family=Lato:wght@300;400;600;700;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f5",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <button
          onClick={() => setPage("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "#1a3a5c",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
            >
              <path d="M3 9L12 2L21 9V20C21 20.6 20.6 21 20 21H4C3.4 21 3 20.6 3 20V9Z" />
              <path d="M9 21V12H15V21" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: "#1a1a2e",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            EstateNova
          </span>
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setPage("listings")}
            style={{
              background: "#f5f5f8",
              border: "none",
              borderRadius: 10,
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: "#555",
            }}
          >
            Browse Homes
          </button>
        </div>
      </nav>
      <div style={{ padding: "48px 80px" }}>
        <h2
          style={{
            margin: "0 0 8px",
            fontSize: 36,
            fontFamily: "'Playfair Display', serif",
            color: "#1a1a2e",
          }}
        >
          Saved Properties
        </h2>
        <p style={{ margin: "0 0 36px", color: "#8a8fa8" }}>
          {savedProps.length}{" "}
          {savedProps.length === 1 ? "property" : "properties"} saved
        </p>
        {savedProps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: 64, marginBottom: 16 }}>💫</p>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1a1a2e",
                margin: "0 0 8px",
                fontSize: 24,
              }}
            >
              No saved properties yet
            </h3>
            <p style={{ color: "#8a8fa8", marginBottom: 24 }}>
              Start browsing and save the homes you love.
            </p>
            <button
              onClick={() => setPage("listings")}
              style={{
                background: "#1a3a5c",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 28px",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {savedProps.map((p) => (
              <PropertyCard
                key={p.id}
                p={p}
                saved={true}
                onSave={toggleSave}
                onClick={setSelected}
              />
            ))}
          </div>
        )}
      </div>
      {selected && (
        <Modal
          p={selected}
          saved={saved.has(selected.id)}
          onSave={toggleSave}
          onClose={() => setSelected(null)}
          onToast={setToast}
        />
      )}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
