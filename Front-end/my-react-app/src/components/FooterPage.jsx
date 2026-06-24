export default function FooterPage() {
    return (
        <>
            {/* Footer */}
            <footer style={{ backgroundColor: "#0f172a", color: "#cbd5e1", padding: "3rem 6rem 1.5rem" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    gap: "2.5rem",
                    paddingBottom: "2.5rem",
                    borderBottom: "1px solid #1e293b",
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                            <div style={{
                                width: "32px", height: "32px", borderRadius: "50%",
                                backgroundColor: "#1a56db", display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="5" fill="#fff" />
                                    <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2.5" fill="none" />
                                </svg>
                            </div>
                            <span style={{ fontWeight: 700, fontSize: "16px", color: "#fff" }}>UI/UX Logistics</span>
                        </div>
                        <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#94a3b8", maxWidth: "240px" }}>
                            Connecting businesses worldwide with fast, reliable, and transparent freight solutions.
                        </p>
                        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                            {["facebook", "twitter", "linkedin", "instagram"].map((s) => (
                                <a key={s} href="#" style={{
                                    width: "32px", height: "32px", borderRadius: "50%",
                                    backgroundColor: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#94a3b8", textDecoration: "none", fontSize: "13px", fontWeight: 600,
                                }}>
                                    {s[0].toUpperCase()}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {[
                        { heading: "Company", links: ["About Us", "Careers", "News", "Partners"] },
                        { heading: "Services", links: ["Core Capacity", "Metro Logistics", "Clearance Route", "Warehousing"] },
                        { heading: "Support", links: ["Help Center", "Contact Us", "Track Order", "Privacy Policy"] },
                    ].map((col) => (
                        <div key={col.heading}>
                            <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                {col.heading}
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                                            onMouseEnter={e => e.target.style.color = "#fff"}
                                            onMouseLeave={e => e.target.style.color = "#94a3b8"}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                    paddingTop: "1.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#475569",
                    flexWrap: "wrap",
                    gap: "8px",
                }}>
                    <span>© 2025 UI/UX Logistics. All rights reserved.</span>
                    <div style={{ display: "flex", gap: "20px" }}>
                        {["Terms of Service", "Privacy Policy", "Cookie Settings"].map((t) => (
                            <a key={t} href="#" style={{ color: "#475569", textDecoration: "none" }}
                                onMouseEnter={e => e.target.style.color = "#94a3b8"}
                                onMouseLeave={e => e.target.style.color = "#475569"}
                            >
                                {t}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </>
    )
}
