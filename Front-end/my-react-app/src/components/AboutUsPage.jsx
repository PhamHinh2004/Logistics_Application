import { useState } from "react";
import Navigation from "./Navigation";
import FooterPage from "./FooterPage";
// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
    purple: "#6c5ce7",
    purpleLt: "#f0eeff",
    dark: "#0f0f1a",
    text: "#1a1a2e",
    muted: "#6b7280",
    border: "#e5e7eb",
    white: "#ffffff",
    offWhite: "#f9fafb",
    green: "#3a4f38",
};


const MVV = [
    {
        title: "Our Mission", 
        text: "We deliver dependable transport services that support growth, connect supply networks & move goods safely worldwide.",
        img: "https://i.postimg.cc/mDMkBjc3/69aaa76b69f2de8b09ab3c8f-1.webp",
    },
    {
        title: "Our Vision",
        text: "We are to build smarter logistics systems that increase efficiency, connect markets & move industries forward.",
        img: "https://i.postimg.cc/6QFqkgQm/69aaa76b9ec598a5ed68fe98-2.webp",
    },
    {
        title: "Our Core Values",
        text: "We provide irrefutable service that builds trust, supports partners & keeps goods moving smoothly.",
        img: "https://i.postimg.cc/fb1yGpbq/69aaa76ba7f2376d94212fb2-3.webp",
    },
];

const STATS = [
    { value: "25+", label: "Years of Experience", sub: "Decades of trusted logistics service" },
    { value: "15K+", label: "Successful Projects", sub: "Deliveries completed worldwide" },
];

const FAQS = [
    { q: "How do you Ensure Shipments Arrive Safely?", a: "We use state-of-the-art tracking, secure packaging standards, and verified carrier partnerships to ensure every shipment arrives in perfect condition." },
    { q: "Do You Support Long-Distance Deliveries?", a: "Absolutely. Our network spans 120+ countries, providing seamless long-distance and cross-border shipping solutions for businesses of all sizes." },
    { q: "Do You Provide Real-Time Shipment Tracking?", a: "Yes. Every shipment comes with a live tracking link so you and your customers can monitor progress 24/7 from pickup to delivery." },
    { q: "How are delivery routes optimized?", a: "We leverage AI-powered route optimization tools that factor in traffic, weather, and carrier availability to ensure the fastest, most cost-effective routes." },
    { q: "How can I Request a Shipping Quote?", a: "Simply fill in our Get a Quote form on the Contact page, or call our team directly. We respond with a tailored quote within 24 hours." },
];

// ─── Reusable ──────────────────────────────────────────────────────────────────
function Badge({ children, color = C.purple }) {
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase",
            color, border: `1px solid ${color}`,
            borderRadius: "999px", padding: "4px 12px",
        }}>✦ {children} ✦</span>
    );
}


// ─── FAQ item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{
            borderBottom: `1px solid ${C.border}`,
            padding: "18px 0",
        }}>
            <button onClick={() => setOpen(!open)} style={{
                width: "100%", textAlign: "left", background: "none",
                border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: "12px",
            }}>
                <span style={{ fontSize: "14.5px", fontWeight: 600, color: C.text }}>{q}</span>
                <span style={{
                    fontSize: "18px", color: C.purple, fontWeight: 300,
                    transition: "transform 0.2s",
                    transform: open ? "rotate(45deg)" : "rotate(0deg)",
                    flexShrink: 0,
                }}>+</span>
            </button>
            {open && (
                <p style={{
                    fontSize: "13.5px", color: C.muted, lineHeight: 1.75,
                    margin: "12px 0 0", maxWidth: "560px",
                }}>{a}</p>
            )}
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AboutUsPage() {
    return (
        <div style={{ fontFamily: "'Inter','Helvetica Neue',sans-serif", color: C.text, backgroundColor: C.white }}>

            {/* ── Navbar ── */}
            <Navigation />
            {/* ── Hero banner ── */}
            <section style={{ position: "relative", height: "340px", overflow: "hidden" }}>
                <img
                    src="https://i.postimg.cc/qqGgZ3Lj/premium-photo-1682144324433-ae1ee89a0238.avif"
                    alt="About Us hero"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(10,10,30,0.45) 0%, rgba(10,10,30,0.6) 100%)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: "10px",
                }}>
                    <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 900, color: C.white, letterSpacing: "-0.03em", margin: 0 }}>
                        ABOUT US
                    </h1>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        THIS IS ABOUT US
                    </p>
                </div>
            </section>

            {/* ── Mission / Vision / Values ── */}
            <section style={{ padding: "64px 6%", backgroundColor: C.white }}>
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                        <Badge color={C.purple}>Services</Badge>
                        <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", fontWeight: 800, margin: "12px 0 0", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                            Strategic Transport Solutions<br />Designed for Growth
                        </h2>
                    </div>
                    <button className="bg-[#242BF6] text-white px-6 py-2 rounded-lg hover:bg-[#050dae] hover:opacity-85 transition-all duration-200 text-sm font-semibold">
                        Discover more
                    </button>
                </div>

                {/* Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {MVV.map((item) => (
                        <div key={item.title} style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            gap: "24px",
                            border: `1px solid ${C.border}`,
                            borderRadius: "12px", padding: "20px 24px",
                            backgroundColor: C.white,
                            transition: "box-shadow 0.2s",
                        }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(108,92,231,0.10)"}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                        >
                            <div style={{ flex: "0 0 120px" }}>
                                <div style={{
                                    fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                                    letterSpacing: "0.08em", color: C.purple, marginBottom: "6px",
                                }}>{item.title}</div>
                            </div>
                            <p style={{ flex: 1, fontSize: "14px", color: C.muted, lineHeight: 1.7, margin: 0 }}>{item.text}</p>
                            <img
                                src={item.img}
                                alt={item.title}
                                style={{ width: "200px", height: "110px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-xl">
                <iframe
                    className="aspect-video w-full"
                    src="https://www.youtube.com/embed/DRZymVT5i6w"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {/* ── Stats + team ── */}
            <section style={{
                padding: "72px 6%",
                backgroundColor: C.white,
                display: "flex", alignItems: "center", gap: "60px", flexWrap: "wrap",
            }}>
                {/* Left text */}
                <div style={{ flex: 1, minWidth: "280px" }}>
                    <Badge color={C.purple}>Who we are</Badge>
                    <h2 style={{
                        fontSize: "clamp(1.5rem, 2.8vw, 2rem)", fontWeight: 800,
                        lineHeight: 1.25, margin: "14px 0 16px", letterSpacing: "-0.02em",
                    }}>
                        Professional Logistics Support<br />Built on Reliability
                    </h2>
                    <p style={{ fontSize: "14px", color: C.muted, lineHeight: 1.8, maxWidth: "440px", margin: "0 0 32px" }}>
                        Our team delivers reliable transport and logistics support, helping businesses move goods efficiently, build trust, and grow faster in competitive markets worldwide.
                    </p>

                    {/* Stats */}
                    <div style={{ display: "flex", gap: "48px", marginBottom: "32px" }}>
                        {STATS.map(s => (
                            <div key={s.label}>
                                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: C.purple, lineHeight: 1 }}>{s.value}</div>
                                <div style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginTop: "4px" }}>{s.label}</div>
                                <div style={{ fontSize: "12px", color: C.muted, marginTop: "2px" }}>{s.sub}</div>
                            </div>
                        ))}
                    </div>

                    <button>Join Our Team →</button>
                </div>

                {/* Right image */}
                <div style={{ flex: "0 0 44%" }}>
                    <img
                        src="https://i.postimg.cc/NfT108XL/3d-rendering-multimodal-transport-with-ship-trucks-planexaxa-37416-1752.avif"
                        alt="Team"
                        style={{ width: "100%", borderRadius: "14px", objectFit: "cover", display: "block" }}
                    />
                </div>
            </section>

            {/* ── FAQ ── */}
            <section style={{
                padding: "72px 6%",
                backgroundColor: C.offWhite,
                display: "flex", gap: "60px", flexWrap: "wrap",
            }}>
                {/* Left */}
                <div style={{ flex: "0 0 280px" }}>
                    <div style={{
                        fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
                        textTransform: "uppercase", color: C.muted, marginBottom: "10px",
                    }}>Simple Question</div>
                    <Badge color={C.purple}>FAQ</Badge>
                    <h2 style={{
                        fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", fontWeight: 800,
                        margin: "14px 0 16px", lineHeight: 1.25, letterSpacing: "-0.02em",
                    }}>
                        Reliable Answers for Your<br />Logistics Questions
                    </h2>
                    <p style={{ fontSize: "13.5px", color: C.muted, lineHeight: 1.75, marginBottom: "28px" }}>
                        Can't find what you're looking for? Our support team is always ready to assist.
                    </p>
                    <button>Find our support →</button>
                </div>

                {/* Right — accordion */}
                <div style={{ flex: 1, minWidth: "280px" }}>
                    {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
                </div>
            </section>
            <FooterPage />
        </div>
    );
}