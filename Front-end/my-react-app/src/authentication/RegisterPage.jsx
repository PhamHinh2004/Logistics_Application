import { useState, useEffect } from 'react'


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
    const [submitted, setSubmitted] = useState(false);
    const[showPass, setShowPass] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordStatus, setPasswordStatus] = useState({
        valid: false,
        message: "Password phải từ 8 đến 20 ký tự",
    });
    const [usernameStatus, setUsernameStatus] = useState({
        valid: false,
        message: "Username không được để trống",
    });
    const [emailStatus, setEmailStatus] = useState({
        valid: false,
        message: "Email không được để trống",
    });
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [confirmPassError, setConfirmPassError] = useState({
        valid: null,
        message: "",
    });
    const [payload, setPayload] = useState({
        username: "",
        email: "",
        password: "",
        roles: null,
    });
    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });


    const checkUsernameAvailability = async (username) => {
        if (!username.trim()) {
            setUsernameStatus({ valid: null, message: "" });
            return;
        } // Skip empty username

        const url = `http://localhost:9000/account/check-username?username=${encodeURIComponent(username)}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (!data.response) {
                    setUsernameStatus({
                        valid: true,
                        message: "✅ Username hợp lệ",
                    });
                } else {
                    setUsernameStatus({
                        valid: false,
                        message: "❌ Username đã tồn tại",
                    });
                }
                console.log(`Username "${username}" availability:`, data.response);
            }
        } catch (error) {
            setUsernameStatus({
                valid: false,
                message: "Không thể kiểm tra username",
            });
        }
    };

    const checkEmailAvailability = async (email) => {
        if (!email.trim()) {
            setEmailStatus({ valid: null, message: "" });
            return;
        }
        const url = `http://localhost:9000/account/check-email?email=${encodeURIComponent(email)}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (!data.response) {
                    setEmailStatus({
                        valid: true,
                        message: "✅ Email hợp lệ",
                    });
                }
                else {
                    setEmailStatus({
                        valid: false,
                        message: "❌ Email đã tồn tại",
                    });
                }
                console.log(`Email "${email}" availability:`, data.response);
            }
        } catch (error) {
            setEmailStatus({
                valid: false,
                message: "Không thể kiểm tra email",
            });
        }
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (!confirmPassword) {
            setConfirmPassError({ valid: null, message: "" });
            return;
        }
        if (confirmPassword !== form.password) {
            setConfirmPassError({
                valid: false,
                message: "❌ Mật khẩu xác nhận không khớp",
            });
        } else {
            setConfirmPassError({
                valid: true,
                message: "✅ Mật khẩu xác nhận hợp lệ",
            });
        }
    };
    // ─── Validation ───────────────────────────────────────────────────────────────
    const validate = ({ field }) => {
        switch (field) {
            case "username":
                if (!form.username.trim()) setUsernameStatus({ valid: false, message: "Username không được để trống" });
                else if (form.username.trim().length < 3) setUsernameStatus({ valid: false, message: "Tối thiểu 3 ký tự!" });
                else if (form.username.trim().length > 20) setUsernameStatus({ valid: false, message: "Tối đa 20 ký tự!" });
                else checkUsernameAvailability(form.username);
                break;
            case "email":
                if (!form.email.trim()) setEmailStatus({ valid: false, message: "Email không được để trống" });
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) setEmailStatus({ valid: false, message: "Email không đúng định dạng!" });
                else checkEmailAvailability(form.email);
                break;
            case "password":
                if (!form.password) setPasswordStatus({ valid: false, message: "Password không được để trống" });
                else if (form.password.length < 8) setPasswordStatus({ valid: false, message: "Tối thiểu 8 ký tự!" });
                else if (form.password.length > 20) setPasswordStatus({ valid: false, message: "Tối đa 20 ký tự!" });
                else setPasswordStatus({ valid: true, message: "✅ Password hợp lệ" });
                break;
            // Add more cases for other fields as needed
        }
    };
    const addAccount = async (payload) => {
        try {
            const response = await fetch("http://localhost:9000/account/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                console.log("Account created successfully");
            } else {
                console.error("Failed to create account");
            }
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };


    useEffect(() => {
        if (touched.username) {
            validate({ field: "username" });
        }
    }, [form.username, touched.username]);

    useEffect(() => {
        if (touched.email) {
            validate({ field: "email" });
        }
    }, [form.email, touched.email]);

    useEffect(() => {
        if (touched.password) {
            validate({ field: "password" });
        }
    }, [form.password, touched.password]);

    useEffect(() => {
        validateConfirmPassword(form.confirmPassword);
    }, [form.confirmPassword, form.password]);

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


        // Payload match AccountSignUp DTO
        const payload = {
            username: form.username.trim(),
            email: form.email.trim(),
            password: form.password,
            role: form.role || "user",
        };
        addAccount(payload);
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
                    <Field label="Username">
                        <input
                            type="text"
                            value={form.username}
                            onChange={set("username")}
                            placeholder="Tối thiểu 3, tối đa 20 ký tự"
                            onBlur={() =>
                                setTouched(prev => ({
                                    ...prev,
                                    username: true
                                }))
                            }
                            className={`w-full h-12 rounded-xl px-3.5 text-sm outline-none transition-all focus:ring-2
                                ${usernameStatus.valid === true
                                    ? "bg-green-50 border border-green-500 focus:ring-green-500"
                                    : usernameStatus.valid === false
                                        ? "bg-red-50 border border-red-500 focus:ring-red-500"
                                        : "bg-[#eaeaec] border border-transparent focus:ring-blue-700"
                                }`}
                            required
                        />
                        {usernameStatus.message && (
                            <p
                                className={`mt-1 text-sm ${usernameStatus.valid
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {usernameStatus.message}
                            </p>
                        )}
                    </Field>

                    {/* Email */}
                    <Field label="E-mail">
                        <input
                            type="email"
                            value={form.email}
                            onChange={set("email")}
                            placeholder="yourname@email.com"
                            onBlur={() =>
                                setTouched(prev => ({
                                    ...prev,
                                    email: true
                                }))
                            }
                            className={`w-full h-12 rounded-xl px-3.5 text-sm text-gray-700 outline-none
                          transition-all focus:ring-2 focus:ring-blue-700
                            ${emailStatus.valid === true
                                    ? "bg-green-50 border border-green-500 focus:ring-green-500"
                                    : emailStatus.valid === false
                                        ? "bg-red-50 border border-red-500 focus:ring-red-500"
                                        : "bg-[#eaeaec] border border-transparent focus:ring-blue-700"
                                }`}
                        />
                        {emailStatus.message && (
                            <p
                                className={`mt-1 text-sm ${emailStatus.valid
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {emailStatus.message}
                            </p>
                        )}
                    </Field>

                    {/* Password */}
                    <Field label="Password" >
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                value={form.password}
                                onChange={set("password")}
                                placeholder="8–20 ký tự"
                                onBlur={() =>
                                    setTouched(prev => ({
                                        ...prev,
                                        password: true
                                    }))
                                }
                                className={`w-full h-12 rounded-xl px-3.5 pr-11 text-sm text-gray-700
                            outline-none transition-all focus:ring-2 focus:ring-blue-700
                            ${passwordStatus.valid === true
                                        ? "bg-green-50 border border-green-500 focus:ring-green-500"
                                        : passwordStatus.valid === false
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
                        {passwordStatus.message && (
                            <p
                                className={`mt-1 text-sm ${passwordStatus.valid
                                    ? "text-green-600"
                                    : "text-red-600"}`}>
                                {passwordStatus.message}
                            </p>
                        )}
                    </Field>

                    {/* Confirm Password */}
                    <Field label="Xác nhận mật khẩu">
                        <div className="relative">
                            <input
                                type={showConfirmPass ? "text" : "password"}
                                value={form.confirmPassword}
                                onChange={set("confirmPassword")}
                                placeholder="8–20 ký tự"
                                className={`w-full h-12 rounded-xl px-3.5 pr-11 text-sm text-gray-700
                            outline-none transition-all focus:ring-2 focus:ring-blue-700
                            ${confirmPassError.valid === false
                                        ? "bg-red-50 border border-red-400"
                                        : confirmPassError.valid === true
                                            ? "bg-green-50 border border-green-500 focus:ring-green-500"
                                            : "bg-[#eaeaec] border border-transparent"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPass((v) => !v)}
                                aria-label="toggle password"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                           hover:text-gray-600 transition-colors">
                                <EyeIcon open={showConfirmPass} />
                            </button>
                        </div>
                        {confirmPassError.message && (
                            <p
                                className={`mt-1 text-sm ${confirmPassError.valid
                                    ? "text-green-600"
                                    : "text-red-600"}`}>
                                {confirmPassError.message}
                            </p>
                        )}
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
                        {agreed === false && (
                            <p className="text-xs text-red-500 mt-1.5">
                                Vui lòng đồng ý điều khoản!
                            </p>
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
                        <a href="/login" className="text-blue-800 font-medium hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;