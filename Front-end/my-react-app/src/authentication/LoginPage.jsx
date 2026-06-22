import { useState, useEffect } from "react";

// ─── SVG Illustration (reuse warehouse) ──────────────────────────────────────
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
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [exitedusername, setExitedUsername] = useState({ valid: null, message: "" });
  const [existedPassword, setExistedPassword] = useState({ valid: null, message: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const checkUsernameAvailability = async (username) => {
    if (username.trim() === "") {
      setExitedUsername({ valid: null, message: "Vui lòng nhập username" });
      return;
    } // Skip empty username

    const url = `http://localhost:9000/account/check-username?username=${encodeURIComponent(username)}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (!data.response) {
          setExitedUsername({
            valid: false,
            message: " ❌ Username không tồn tại",
          });
        } else {
          setExitedUsername({
            valid: true,
            message: " ✅ Username đã tồn tại",
          });
        }
        console.log(`Username "${username}" availability:`, data.response);
      }
    } catch (error) {
      setExitedUsername({
        valid: false,
        message: "Không thể kiểm tra username",
      });
    }
  };

  useEffect(() => {
    checkUsernameAvailability(form.username);
  }, [form.username]);

  
    

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));



  const handleSignIn = async (payload) => {
    setLoading(true);
    setApiError("");
    setExitedUsername({ valid: null, message: "" });
    setExistedPassword({ valid: null, message: "" });
    
    const url  = "http://localhost:9000/account/auth/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Đăng nhập thành công!");
      } else {
        const errorData = await response.json();
        setApiError(errorData.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      setApiError("Không thể kết nối đến server!");
    }
  };

  const handleSubmit = async () => {
    if(form.password.trim() === ""){
      setExistedPassword({ valid: false, message: "Vui lòng nhập password" });
      return;
    }
    const payload = {
      username: form.username.trim(),
      password: form.password,
    };
    handleSignIn(payload);

    // Giả lập API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#e8e8ec] flex items-center justify-center p-6 font-sans">
      <div className="flex w-full max-w-[920px] rounded-2xl overflow-hidden
                      shadow-[0_8px_48px_rgba(0,0,0,0.10)]">

        {/* ── Left illustration ── */}
        <div className="hidden md:flex flex-[1.1] bg-gradient-to-br from-[#e4e4e8]
                        to-[#d4d4d8] items-center justify-center p-10">
          <WarehouseIllustration />
        </div>

        {/* ── Right form ── */}
        <div className="flex-1 bg-[#f4f4f6] px-10 py-10 flex flex-col justify-center
                        min-w-[300px]">

          {/* Header */}
          <h1 className="text-[32px] font-normal text-gray-800 mb-2 tracking-tight">
            Sign in
          </h1>
          <p className="text-[13px] text-gray-400 leading-relaxed mb-7">
            Welcome back to logistics supply chain platform.<br />
            Sign in to continue your experience.
          </p>

          {/* API error banner */}
          {apiError && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200
                            rounded-xl px-4 py-3 mb-4">
              <svg className="w-4 h-4 text-red-500 flex-shrink-0" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-[13px] text-red-600">{apiError}</span>
            </div>
          )}

          {/* username */}
          <Field label="E-mail" error={errors.username}>
            <input
              type="username"
              value={form.username}
              onChange={set("username")}
              placeholder="your username"
              className={`w-full h-12 rounded-xl px-3.5 text-sm text-gray-700 outline-none
                          transition-all focus:ring-2 focus:ring-blue-700
                          ${exitedusername.valid === false
                  ? "bg-red-50 border border-red-400"
                  : "bg-[#eaeaec] border border-transparent"}`}
            />
            {exitedusername.message && (
              <p className={`text-xs mt-1.5 ${
                exitedusername.valid === false ? "text-red-500" : "text-green-500"
              }`}>
                {exitedusername.message}
              </p>
            )}
          </Field>

          {/* Password */}
          <Field label="Password" error={errors.password}>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={set("password")}
                placeholder="Nhập mật khẩu"
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

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between mb-6">
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setRemember((v) => !v)}>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center
                               flex-shrink-0 transition-colors
                               ${remember ? "bg-blue-800" : "bg-gray-300"}`}>
                {remember && (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 11 11" fill="none">
                    <polyline points="1.5,5.5 4.5,8.5 9.5,2.5" stroke="white"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-[13px] text-gray-400">Ghi nhớ đăng nhập</span>
            </div>
            <a href="#" className="text-[13px] text-blue-800 hover:underline font-medium">
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3.5 bg-blue-800 hover:bg-blue-900 disabled:bg-blue-400
                       active:scale-[0.98] text-white rounded-xl text-[15px] font-medium
                       tracking-wide transition-all flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83
                           M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Đang đăng nhập...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[12px] text-gray-300">hoặc đăng nhập bằng</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2.5 h-11 rounded-xl
                               bg-[#eaeaec] hover:bg-gray-200 transition-colors text-[13px]
                               text-gray-600 font-medium border border-transparent
                               hover:border-gray-300">
              {/* Google icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92
                  c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77
                  c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84
                  C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43
                  .35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22
                  .81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15
                  C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84
                  c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            <button className="flex items-center justify-center gap-2.5 h-11 rounded-xl
                               bg-[#eaeaec] hover:bg-gray-200 transition-colors text-[13px]
                               text-gray-600 font-medium border border-transparent
                               hover:border-gray-300">
              {/* GitHub icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205
                  11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724
                  -4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7
                  c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236
                  1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605
                  -2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22
                  -.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267
                  1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23
                  3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22
                  0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015
                  2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24
                  12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center mt-6 text-[13px] text-gray-400">
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-blue-800 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;