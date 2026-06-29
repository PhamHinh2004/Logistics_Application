import { useState } from "react";
import Navigation from "./Navigation";
import FooterPage from "./FooterPage";

const C = {
  green: "#3a4f38",
  greenMd: "#4d6649",
  greenLt: "#eaf0e5",
  white: "#ffffff",
  offWhite: "#f4f6f1",
  text: "var(--color-text-primary)",
  muted: "var(--color-text-secondary)",
  border: "var(--color-border-tertiary)",
  borderMd: "var(--color-border-secondary)",
};

const NAV_LINKS = ["How it works", "About us", "News", "Shipping"];

const INFO_CARDS = [
  { icon: "📞", label: "Phone", value: "0969880914\nMon–Fri, 8am–6pm" },
  { icon: "✉️", label: "Email", value: "devpoor44@gmail.com\nWe reply within 24h" },
  { icon: "📍", label: "Office", value: "Ho Chi Minh City, Vietnam" },
];

const CONTACT_ITEMS = [
  { icon: "📞", title: "0969880914", sub: "Available Monday to Friday\n8:00 AM – 6:00 PM PST" },
  { icon: "✉️", title: "devpoor44@gmail.com", sub: "Send us an email anytime.\nWe reply within one business day." },
  { icon: "📍", title: "Ho Chi Minh City, Vietnam", sub: "Ho Chi Minh City, Vietnam" },
];

const TOPICS = ["General inquiry", "Get a quote", "Track shipment", "Partnership", "Other"];

const SOCIALS = ["f", "t", "in", "ig"];

export default function ContactPage() {
  const [activeTopic, setActiveTopic] = useState("General inquiry");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", company: "", message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div style={{ fontFamily: "'Inter','Helvetica Neue',sans-serif", color: C.text, backgroundColor: C.white }}>

      {/* ── Navbar ── */}
      <Navigation />
      {/* ── Hero ── */}
      <section style={{
        backgroundColor: C.offWhite,
        padding: "60px 6% 50px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: "40px", flexWrap: "wrap",
      }}>
        <div style={{ flex: "0 0 38%" }}>
          <div style={{
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: C.greenMd, marginBottom: "14px",
          }}>Get in touch</div>
          <h1 style={{
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800,
            lineHeight: 1.2, letterSpacing: "-0.03em", margin: "0 0 16px",
          }}>
            We'd love to<br />hear from you
          </h1>
          <p style={{ fontSize: "15px", color: C.muted, lineHeight: 1.75, maxWidth: "340px" }}>
            Whether you have a question about shipping rates, need a custom quote,
            or want to partner with us — our team is ready to help.
          </p>
        </div>

        <div style={{ flex: 1, display: "flex", gap: "16px" }}>
          {INFO_CARDS.map((c) => (
            <div key={c.label} style={{
              flex: 1, backgroundColor: C.white,
              border: `0.5px solid ${C.border}`,
              borderRadius: "12px", padding: "22px 18px",
              display: "flex", flexDirection: "column", gap: "10px",
            }}>
              <span style={{ fontSize: "22px" }}>{c.icon}</span>
              <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted }}>
                {c.label}
              </div>
              <div style={{ fontSize: "13px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{c.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Body: left panel + form ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.55fr" }}>

        {/* Left panel */}
        <div style={{
          backgroundColor: C.green,
          padding: "52px 44px",
          display: "flex", flexDirection: "column", gap: "32px",
        }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: C.white, marginBottom: "8px" }}>
              Contact information
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
              Fill out the form and our team will get back to you within 24 hours.
            </div>
          </div>

          {CONTACT_ITEMS.map((item) => (
            <div key={item.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "17px", flexShrink: 0,
              }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: C.white, marginBottom: "4px" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "auto", paddingTop: "8px" }}>
            {SOCIALS.map((s) => (
              <button key={s} style={{
                width: "32px", height: "32px", borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "none", cursor: "pointer",
                fontSize: "12px", fontWeight: 700, color: C.white,
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Form panel */}
        <div style={{ backgroundColor: C.white, padding: "52px 48px" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>Send us a message</div>
          <div style={{ fontSize: "13px", color: C.muted, marginBottom: "28px", lineHeight: 1.6 }}>
            Tell us what you need and we'll find the right solution for your business.
          </div>

          {/* Topic chips */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              fontSize: "11px", fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.07em", color: C.muted, marginBottom: "10px",
            }}>Topic</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {TOPICS.map((t) => (
                <button key={t} onClick={() => setActiveTopic(t)} style={{
                  padding: "6px 14px", fontSize: "12.5px",
                  borderRadius: "999px", cursor: "pointer",
                  border: `0.5px solid ${activeTopic === t ? C.green : C.borderMd}`,
                  backgroundColor: activeTopic === t ? C.green : "transparent",
                  color: activeTopic === t ? C.white : C.muted,
                  transition: "all 0.15s",
                }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <Field label="First name" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} />
            <Field label="Last name" name="lastName" placeholder="Smith" value={form.lastName} onChange={handleChange} />
          </div>

          {/* Email + Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <Field label="Email" name="email" type="email" placeholder="john@company.com" value={form.email} onChange={handleChange} />
            <Field label="Phone (optional)" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
          </div>

          {/* Company */}
          <div style={{ marginBottom: "16px" }}>
            <Field label="Company" name="company" placeholder="Your company name" value={form.company} onChange={handleChange} />
          </div>

          {/* Message */}
          <div style={{ marginBottom: "28px" }}>
            <FieldLabel>Message</FieldLabel>
            <textarea
              name="message"
              placeholder="Tell us more about your shipping needs..."
              value={form.message}
              onChange={handleChange}
              style={{
                width: "100%", minHeight: "110px",
                fontSize: "13.5px", color: C.text,
                border: `0.5px solid ${C.borderMd}`,
                borderRadius: "8px", padding: "10px 13px",
                outline: "none", resize: "vertical",
                fontFamily: "inherit", lineHeight: 1.6,
                backgroundColor: C.white,
              }}
            />
          </div>

          {/* Submit row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <p style={{ fontSize: "12px", color: C.muted, maxWidth: "260px", lineHeight: 1.55, margin: 0 }}>
              By submitting this form you agree to our{" "}
              <a href="#" style={{ color: C.greenMd, textDecoration: "none" }}>Privacy Policy</a> and{" "}
              <a href="#" style={{ color: C.greenMd, textDecoration: "none" }}>Terms of Service</a>.
            </p>
            <button onClick={handleSubmit} style={{
              padding: "11px 28px", fontSize: "14px", fontWeight: 600,
              backgroundColor: sent ? "#2d6a2d" : C.green,
              color: C.white, border: "none", borderRadius: "6px",
              cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
              transition: "background 0.2s",
            }}>
              {sent ? "✓ Sent!" : "Send message →"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Map strip ── */}
      <div style={{ width: "100%", height: "450px", overflow: "hidden" }} >
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15669.304344510247!2d106.94766635!3d10.93872195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174e0d39a5cc479%3A0x14ea83a0ee43da91!2zTmjDoCBUaOG7nSBHacOhbyBY4bupIFBow7ogU8ahbg!5e0!3m2!1svi!2s!4v1782387752750!5m2!1svi!2s"
            width="100%"
            height="450"
            style={{ border: 0 , padding: "10px", margin: "0px"}}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin">
          </iframe>
      </div>
      {/* ── Footer ── */}
      <FooterPage />
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <div style={{
      fontSize: "11px", fontWeight: 600,
      textTransform: "uppercase", letterSpacing: "0.07em",
      color: "var(--color-text-secondary)", marginBottom: "6px",
    }}>{children}</div>
  );
}

function Field({ label, name, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type} name={name} placeholder={placeholder}
        value={value} onChange={onChange}
        style={{
          width: "100%", fontSize: "13.5px",
          color: "var(--color-text-primary)",
          border: "0.5px solid var(--color-border-secondary)",
          borderRadius: "8px", padding: "10px 13px",
          outline: "none", fontFamily: "inherit",
          backgroundColor: "white",
        }}
      />
    </div>
  );
}