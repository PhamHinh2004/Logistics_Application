import { useState, useEffect } from 'react'


// ─── Validation ───────────────────────────────────────────────────────────────
const validate = ({ username, email, password, roles }) => {
    const errors = {};
    if (!username.trim()) errors.username = "Username là bắt buộc!";
    else if (username.trim().length < 3) errors.username = "Tối thiểu 3 ký tự!";
    else if (username.trim().length > 20) errors.username = "Tối đa 20 ký tự!";

    if (!email.trim()) errors.email = "Email là bắt buộc!";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Email không đúng định dạng!";

    if (!password) errors.password = "Password là bắt buộc!";
    else if (password.length < 8) errors.password = "Tối thiểu 8 ký tự!";
    else if (password.length > 20) errors.password = "Tối đa 20 ký tự!";

    if (roles.size === 0) errors.roles = "Vui lòng chọn ít nhất một role!";
    return errors;
};

// ─── SVG Illustration ─────────────────────────────────────────────────────────
const WarehouseIllustration = () => (
    <svg viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-sm">
        <ellipse cx="170" cy="248" rx="140" ry="20" fill="#c8c8c8" opacity="0.35" />
        <polygon points="30,215 170,150 310,215 170,280" fill="#ddd" />
        <polygon points="30,215 170,150 170,280" fill="#d0d0d0" />
        <polygon points="310,215 170,150 170,280" fill="#c8c8c8" />
        <polygon points="30,148 30,215 170,280 170,213" fill="#e2e2e2" />
        <polygon points="310,148 310,215 170,280 170,213" fill="#d6d6d6" />
        <polygon points="30,148 170,85 310,148 170,213" fill="#ececec" />
        <polygon points="255,172 310,148 310,205 255,229" fill="#bbb" />
        <rect x="52" y="186" width="24" height="19" rx="2" fill="#3a6fd8" opacity="0.85" />
        <rect x="52" y="167" width="24" height="19" rx="2" fill="#4a7fea" opacity="0.85" />
        <polygon points="52,186 76,186 76,167 52,167" fill="#4a7fea" opacity="0.75" />
        <polygon points="52,186 52,167 43,173 43,192" fill="#2a55b8" opacity="0.85" />
        <rect x="52" y="205" width="24" height="19" rx="2" fill="#3a6fd8" opacity="0.85" />
        <polygon points="52,205 76,205 76,186 52,186" fill="#4a7fea" opacity="0.75" />
        <polygon points="52,205 52,186 43,192 43,211" fill="#2a55b8" opacity="0.85" />
        <rect x="88" y="208" width="30" height="13" rx="2" fill="#bbb" />
        <rect x="88" y="195" width="30" height="13" rx="2" fill="#ccc" />
        <rect x="88" y="182" width="30" height="13" rx="2" fill="#d8d8d8" />
        <rect x="138" y="202" width="38" height="24" rx="3" fill="#b0b0b0" />
        <rect x="138" y="195" width="15" height="13" rx="2" fill="#c0c0c0" />
        <rect x="176" y="214" width="22" height="3" rx="1" fill="#888" />
        <rect x="176" y="219" width="22" height="3" rx="1" fill="#888" />
        <circle cx="147" cy="228" r="5" fill="#888" />
        <circle cx="165" cy="228" r="5" fill="#888" />
        <rect x="220" y="170" width="64" height="45" rx="3" fill="#c8c8c8" />
        <rect x="284" y="174" width="30" height="37" rx="3" fill="#b8b8b8" />
        <rect x="288" y="178" width="22" height="13" rx="2" fill="#a8c8e8" opacity="0.75" />
        <circle cx="232" cy="217" r="6.5" fill="#888" />
        <circle cx="258" cy="217" r="6.5" fill="#888" />
        <circle cx="291" cy="217" r="6.5" fill="#888" />
        <line x1="220" y1="190" x2="284" y2="190" stroke="#bbb" strokeWidth="1" />
        <line x1="252" y1="170" x2="252" y2="215" stroke="#bbb" strokeWidth="1" />
        <rect x="208" y="192" width="15" height="13" rx="1" fill="#4a7fea" opacity="0.8" />
        <rect x="208" y="179" width="15" height="13" rx="1" fill="#5a8ffa" opacity="0.8" />
    </svg>
);

// ─── Eye icon ─────────────────────────────────────────────────────────────────
const EyeIcon = ({ open }) =>
    open ? (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    ) : (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
    return (
        <div className="mb-4">
            <label className="block text-[13px] text-gray-400 mb-1.5">{label}</label>
            {children}
            {error && (
                <p className="text-xs text-red-500 mt-1.5">{error}</p>
            )}
        </div>
    );
}

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState([]);


    const loadRoles = async () => {
        const url = 'http://localhost:9000/api/roles';
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const roleOptions = data.map((role) => {
                    const roleName = role.name.replace("ROLE_", "");

                    return {
                        value: roleName,
                        label: role.label || roleName,
                        icon: role.icon || "👤",
                    }; 
                });
                setRoles(roleOptions);
            } else {
                const errorData = await response.json();
                alert(errorData.message);
                console.error('Failed to fetch roles');
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    }

    const checkUsernameAvailability = async (username) => {
        if (!username.trim()) return; // Skip empty username

        const url = `http://localhost:9000/account/check-username?username=${encodeURIComponent(username)}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log(`Username "${username}" availability:`, data.available);
            }
        } catch (error) {
            console.error('Error checking username availability:', error);
        }   
    };

    useEffect(() => {
        loadRoles();
    },  []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            checkUsernameAvailability(username);
        }, 500); // Delay to avoid too many requests while typing
        return () => clearTimeout(delayDebounce);
    }, [username]);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        roles: new Set(),
    });

    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const set = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const toggleRole = (value) => {
        setForm((prev) => {
            const next = new Set(prev.roles);
            next.has(value) ? next.delete(value) : next.add(value);
            return { ...prev, roles: next };
        });
    };

    const handleSubmit = () => {
        const errs = validate(form);
        if (!agreed) errs.agreed = "Vui lòng đồng ý điều khoản!";
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        // Payload match AccountSignUp DTO
        const payload = {
            username: form.username.trim(),
            email: form.email.trim(),
            password: form.password,
            roles: form.roles.size > 0 ? [...form.roles] : null,
        };
        console.log("POST /api/auth/signup →", payload);
        setSubmitted(true);
    };

    // ── Success screen ──────────────────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="min-h-screen bg-[#e8e8ec] flex items-center justify-center p-8">
                <div className="bg-white rounded-2xl p-12 text-center max-w-sm w-full shadow-xl">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 text-3xl
                          flex items-center justify-center mx-auto mb-5">✓</div>
                    <h2 className="text-xl font-medium text-gray-800 mb-2">Tài khoản đã được tạo!</h2>
                    <p className="text-sm text-gray-400 mb-6">
                        Kiểm tra email để xác nhận tài khoản của bạn.
                    </p>
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setForm({ username: "", email: "", password: "", roles: new Set() });
                            setAgreed(false);
                            setErrors({});
                        }}
                        className="w-full h-12 bg-blue-800 hover:bg-blue-900 active:scale-[0.98]
                       text-white rounded-xl text-sm font-medium transition-all">
                        Đăng ký tài khoản khác
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#e8e8ec] flex items-center justify-center p-6
                    font-sans">
            <div className="flex w-full max-w-[920px] rounded-2xl overflow-hidden
                      shadow-[0_8px_48px_rgba(0,0,0,0.10)]">

                {/* Left — illustration */}
                <div className="hidden md:flex flex-[1.1] bg-gradient-to-br from-[#e4e4e8]
                        to-[#d4d4d8] items-center justify-center p-10">
                    <WarehouseIllustration />
                </div>

                {/* Right — form */}
                <div className="flex-1 bg-[#f4f4f6] px-10 py-8 flex flex-col justify-center
                        min-w-[300px]">

                    <h1 className="text-[32px] font-normal text-gray-800 mb-2 tracking-tight">
                        Sign up
                    </h1>
                    <p className="text-[13px] text-gray-400 leading-relaxed mb-6">
                        Welcome to logistics supply chain platform.<br />
                        Register as a member to experience.
                    </p>

                    {/* Username */}
                    <Field label="Username" error={errors.username}>
                        <input
                            type="text"
                            value={form.username}
                            onChange={set("username")}
                            placeholder="Tối thiểu 3, tối đa 20 ký tự"
                            className={`w-full h-12 rounded-xl px-3.5 text-sm text-gray-700 outline-none
                          transition-all focus:ring-2 focus:ring-blue-700
                          ${errors.username
                                    ? "bg-red-50 border border-red-400"
                                    : "bg-[#eaeaec] border border-transparent"}`}
                        />
                    </Field>

                    {/* Email */}
                    <Field label="E-mail" error={errors.email}>
                        <input
                            type="email"
                            value={form.email}
                            onChange={set("email")}
                            placeholder="yourname@email.com"
                            className={`w-full h-12 rounded-xl px-3.5 text-sm text-gray-700 outline-none
                          transition-all focus:ring-2 focus:ring-blue-700
                          ${errors.email
                                    ? "bg-red-50 border border-red-400"
                                    : "bg-[#eaeaec] border border-transparent"}`}
                        />
                    </Field>

                    {/* Password */}
                    <Field label="Password" error={errors.password}>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                value={form.password}
                                onChange={set("password")}
                                placeholder="8–20 ký tự"
                                className={`w-full h-12 rounded-xl px-3.5 pr-11 text-sm text-gray-700
                            outline-none transition-all focus:ring-2 focus:ring-blue-700
                            ${errors.password
                                        ? "bg-red-50 border border-red-400"
                                        : "bg-[#eaeaec] border border-transparent"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass((v) => !v)}
                                aria-label="toggle password"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                           hover:text-gray-600 transition-colors">
                                <EyeIcon open={showPass} />
                            </button>
                        </div>
                    </Field>

                    {/* Roles */}
                    <Field label="Vai trò" error={errors.roles}>
                        <div className="grid grid-cols-2 gap-2">
                            {roles.map((r) => {
                                const active = form.roles.has(r.value);
                                return (
                                    <button
                                        key={r.value}
                                        type="button"
                                        onClick={() => toggleRole(r.value)}
                                        className={`flex items-center gap-2 h-11 px-4 rounded-xl text-[13px]
                                font-medium border transition-all active:scale-[0.97]
                                ${active
                                                ? "bg-blue-800 text-white border-blue-800"
                                                : "bg-[#eaeaec] text-gray-500 border-transparent hover:bg-gray-200"}`}>
                                        <span className="text-base">{r.icon}</span>
                                        {r.label}
                                    </button>
                                );
                            })}
                        </div>
                    </Field>

                    {/* Terms */}
                    <div className="mb-5">
                        <div
                            className="flex items-center gap-2.5 cursor-pointer select-none"
                            onClick={() => setAgreed((v) => !v)}>
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center
                               flex-shrink-0 transition-colors
                               ${agreed ? "bg-blue-800" : "bg-gray-300"}`}>
                                {agreed && (
                                    <svg className="w-2.5 h-2.5" viewBox="0 0 11 11" fill="none">
                                        <polyline points="1.5,5.5 4.5,8.5 9.5,2.5" stroke="white"
                                            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-[13px] text-gray-400">
                                Tôi đồng ý với điều khoản dịch vụ
                            </span>
                        </div>
                        {errors.agreed && (
                            <p className="text-xs text-red-500 mt-1.5">{errors.agreed}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        className="w-full h-13 bg-blue-800 hover:bg-blue-900 active:scale-[0.98]
                       text-white rounded-xl text-[15px] font-medium tracking-wide
                       transition-all py-3.5">
                        Create Account
                    </button>

                    {/* Sign in link */}
                    <p className="text-center mt-5 text-[13px] text-gray-400">
                        Already a member?{" "}
                        <a href="#" className="text-blue-800 font-medium hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;