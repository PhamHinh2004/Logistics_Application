import { useState } from "react";
import Navigation from "../components/Navigation";
// ─── Design tokens ───────────────────────────────────────────────────────────
const C = {
  dark: "#1a1f1a",
  green: "#3a4f38",
  greenLt: "#e8efe6",
  greenMd: "#4d6649",
  white: "#ffffff",
  offWhite: "#f7f8f5",
  text: "#1a1f1a",
  muted: "#6b7468",
  border: "#dde3d8",
};

const SERVICES = [
  { icon: "🚀", title: "Express Shipping", desc: "Guaranteed next-day delivery for urgent cargo with real-time tracking and priority handling." },
  { icon: "🚪", title: "Door-to-Door Delivery", desc: "Seamless pickup and drop-off services directly from sender to recipient, no hassle required." },
  { icon: "📦", title: "Packaging & Crating", desc: "Professional-grade packaging solutions designed to protect your goods throughout the journey." },
  { icon: "🌍", title: "International Shipping", desc: "Worldwide freight solutions covering 120+ countries with full customs clearance support." },
  { icon: "🛒", title: "E-commerce Shipping", desc: "Integrated logistics for online stores — automated labels, bulk dispatch, and returns handling." },
  { icon: "⏱️", title: "Time-Sensitive Deliveries", desc: "Precision scheduling for pharmaceuticals, events, and high-value goods where timing is critical." },
];

const BENEFITS = [
  { n: "01", label: "Reliable and Timely Deliveries" },
  { n: "02", label: "Cost-Effective Solutions" },
  { n: "03", label: "Eco-Friendly Initiatives" },
  { n: "04", label: "Dedicated Customer Support" },
];

const TESTIMONIALS = [
  {
    company: "Squarespace",
    logo: "◻",
    quote: "OceanWings has transformed our shipping operations. Their professionalism and reliability exceeded every expectation. I highly recommend OceanWings for anyone looking for reliable and seamless shipping solutions.",
    name: "Andrew Fisher",
    role: "CEO · Squarespace",
    avatar: "AF",
  },
  {
    company: "Docufyn",
    logo: "◈",
    quote: "As the CFO of Docufyn Farms, I can confidently say that OceanWings logistics is our go-to freight forwarding partner. Their expertise in handling perishable goods and delicate produce has been instrumental in maintaining the freshness and quality of our products during transportation.",
    name: "Robert Thompson",
    role: "CFO · Docufyn Farms",
    avatar: "RT",
  },
  {
    company: "attentive",
    logo: "◉",
    quote: "Their reliability, competitive price, and expertise in managing complex international shipments has been invaluable. As the CEO, I am thoroughly impressed with OceanWings' commitment to excellence and professionalism.",
    name: "Lisa Rodriguez",
    role: "CEO · attentive",
    avatar: "LR",
  },
];

// ─── Reusable tiny components ─────────────────────────────────────────────────
function Tag({ children }) {
  return (
    <span style={{
      fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em",
      textTransform: "uppercase", color: C.greenMd,
      display: "block", marginBottom: "10px",
    }}>{children}</span>
  );
}


// ─── Main component ───────────────────────────────────────────────────────────
export default function LandingPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", color: C.text, backgroundColor: C.white }}>

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <Navigation /> 

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px 6% 60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "40px", backgroundColor: C.white, minHeight: "480px",
      }}>
        {/* Left */}
        <div style={{ flex: "0 0 46%" }}>
          <h1 style={{
            fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
            fontWeight: 800, lineHeight: 1.15,
            color: C.dark, margin: "0 0 36px",
            letterSpacing: "-0.03em",
          }}>
            Where <em style={{ fontStyle: "italic", color: C.green }}>Quality</em> and<br />
            Security Converge for<br />
            Peace of Mind
          </h1>

          {/* Shipment search card */}
          <div style={{
            backgroundColor: C.offWhite, border: `1px solid ${C.border}`,
            borderRadius: "10px", padding: "20px 22px",
            maxWidth: "380px",
          }}>
            <InputField icon="📍" placeholder="From your location" value={from} onChange={setFrom} />
            <div style={{ height: "10px" }} />
            <InputField icon="📍" placeholder="To destination" value={to} onChange={setTo} />
            <button style={{ marginTop: "14px", width: "100%", textAlign: "center" }}>Order Directions</button>
          </div>
        </div>

        {/* Right — placeholder image */}
        <div style={{ flex: "0 0 48%", display: "flex", justifyContent: "center" }}>
          <img
            src="https://i.postimg.cc/mrPCn8K2/premium-photo-1682144324433-ae1ee89a0238.avif"
            alt="Shipping container"
            style={{ width: "100%", maxWidth: "520px", borderRadius: "12px", objectFit: "cover" }}
          />
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────── */}
      <section style={{
        borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
        padding: "40px 6%",
        display: "flex", justifyContent: "center", gap: "80px", flexWrap: "wrap",
      }}>
        {[
          { value: "100%", label: "Customer Satisfaction", icon: "⭐" },
          { value: "24/7", label: "Reliability", icon: "🔄" },
          { value: "32+", label: "Branch Total", icon: "🏢" },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "26px", marginBottom: "6px" }}>{s.icon}</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: C.dark }}>{s.value}</div>
            <div style={{ fontSize: "13px", color: C.muted, marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── About / Journey ────────────────────────────────────────── */}
      <section style={{
        padding: "80px 6%",
        display: "flex", alignItems: "center", gap: "60px",
        backgroundColor: C.white,
      }}>
        <div style={{ flex: "0 0 42%" }}>
          <img
            src="https://i.postimg.cc/g0x87N1M/truck3.avif"
            alt="Truck on the road"
            style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Tag>Elevating the Future</Tag>
          <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            The Journey of<br />OceanWings Starts Here
          </h2>
          <p style={{ fontSize: "15px", color: C.muted, lineHeight: 1.8, maxWidth: "480px", margin: "0 0 28px" }}>
            Welcome to OceanWings, where innovation, dedication, and passion converge to create a transformative experience.
            We are a cutting-edge company with an absolute commitment to revolutionizing the shipping industry.
            Our journey began with a vision to make a lasting impact, and today, we stand tall as trailblazers in our field.
          </p>
          <button variant="outline">Read More</button>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────── */}
      <section style={{ padding: "80px 6%", backgroundColor: C.offWhite }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <Tag>Our Service</Tag>
          <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>
            Where Your Satisfaction<br />is Our Top Priority
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}>
          {SERVICES.map(s => (
            <div key={s.title} style={{
              backgroundColor: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: "10px",
              padding: "26px 24px",
              transition: "box-shadow 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(58,79,56,0.10)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ fontSize: "24px", marginBottom: "14px" }}>{s.icon}</div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits ───────────────────────────────────────────────── */}
      <section style={{
        padding: "80px 6%",
        display: "flex", alignItems: "center", gap: "60px",
        backgroundColor: C.white,
      }}>
        <div style={{ flex: 1 }}>
          <Tag>Benefit's</Tag>
          <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 36px", letterSpacing: "-0.02em" }}>
            Effortless Shipping Solutions<br />for Seamless Deliveries
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
            {BENEFITS.map(b => (
              <li key={b.n} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  backgroundColor: C.greenLt, color: C.greenMd,
                  fontSize: "11px", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>{b.n}</span>
                <span style={{ fontSize: "15px", fontWeight: 500 }}>{b.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: "0 0 44%" }}>
          <img
            src="https://i.postimg.cc/TPKgsCBD/truck2.avif"
            alt="Delivery van"
            style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }}
          />
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────── */}
      <section style={{ padding: "80px 6%", backgroundColor: C.offWhite }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <Tag>Testimonials</Tag>
          <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>
            Customer Experiences that<br />Inspire Trust
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "36px" }}>
          {TESTIMONIALS.map(t => (
            <div key={t.company} style={{
              backgroundColor: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: "10px",
              padding: "26px 24px",
            }}>
              <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "14px", color: C.dark }}>
                {t.logo} {t.company}
              </div>
              <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.75, margin: "0 0 20px" }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  backgroundColor: C.greenLt, color: C.greenMd,
                  fontSize: "12px", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: "12px", color: C.muted }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button variant="outline">View All</button>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: C.green,
        padding: "80px 6%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "40px", flexWrap: "wrap",
      }}>
        <div style={{ flex: "0 0 44%" }}>
          <img
            src="https://i.postimg.cc/k5kVV9Gf/thumb16.jpg"
            alt="Global reach"
            style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 800, color: C.white,
            lineHeight: 1.2, margin: "0 0 20px", letterSpacing: "-0.02em",
          }}>
            Global Reach,<br />Reliable Deliveries.
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, margin: "0 0 32px", maxWidth: "420px" }}>
            Experience the convenience of our top-rated shipping services. From domestic to international, we provide secure and timely shipping solutions tailored to your needs.
          </p>
          <button style={{
            padding: "13px 28px", fontSize: "14px", fontWeight: 600,
            border: "none", borderRadius: "6px", cursor: "pointer",
            backgroundColor: C.white, color: C.green,
            transition: "opacity 0.18s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Start Shipping Today
          </button>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: C.dark, color: "#94a3a8", padding: "60px 6% 28px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "40px",
          paddingBottom: "40px",
          borderBottom: "1px solid #2a2f2a",
        }}>
          {/* Brand */}
          <div>
            <div style={{ fontWeight: 800, fontSize: "18px", color: C.white, marginBottom: "14px" }}>OceanWings</div>
            <p style={{ fontSize: "13px", lineHeight: 1.75, maxWidth: "220px", margin: "0 0 24px" }}>
              Experience the convenience of our top-rated shipping partner.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["f", "t", "in", "yt"].map(s => (
                <a key={s} href="#" style={{
                  width: "30px", height: "30px", borderRadius: "4px",
                  backgroundColor: "#2a2f2a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: 700, color: "#94a3a8",
                  textDecoration: "none",
                }}>{s}</a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {[
            { heading: "Service", links: ["About Us", "Features", "Security"] },
            { heading: "Resource", links: ["Documentation", "Blog", "Pricing"] },
            { heading: "Company", links: ["Careers", "News", "Contact"] },
          ].map(col => (
            <div key={col.heading}>
              <h4 style={{
                fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", color: C.white, margin: "0 0 16px",
              }}>{col.heading}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: "13px", color: "#94a3a8", textDecoration: "none" }}
                      onMouseEnter={e => e.target.style.color = C.white}
                      onMouseLeave={e => e.target.style.color = "#94a3a8"}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          paddingTop: "20px",
          fontSize: "12px", color: "#4a5568",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px",
        }}>
          <span>© 2025 OceanWings. All Rights Reserved.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Terms of Service", "Privacy Policy"].map(t => (
              <a key={t} href="#" style={{ color: "#4a5568", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "#94a3a8"}
                onMouseLeave={e => e.target.style.color = "#4a5568"}
              >{t}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Helper ──────────────────────────────────────────────────────────────────
function InputField({ icon, placeholder, value, onChange }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      backgroundColor: "#fff", border: `1px solid ${C.border}`,
      borderRadius: "6px", padding: "10px 14px",
    }}>
      <span style={{ fontSize: "16px" }}>{icon}</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          border: "none", outline: "none",
          fontSize: "13.5px", color: C.text, width: "100%",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}