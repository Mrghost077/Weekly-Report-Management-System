import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";

// --- small inline icons (no extra dependency needed) ---
const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M3 6.5h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m3.5 7 8.5 6 8.5-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="1.5" />
    <path d="M7.5 10.5V7.8a4.5 4.5 0 0 1 9 0v2.7" strokeLinecap="round" />
  </svg>
);

const EyeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);

const EyeOffIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M3 3l18 18" strokeLinecap="round" />
    <path d="M10.6 5.7A10.6 10.6 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a15.6 15.6 0 0 1-4.2 4.8M6.3 7.3A15.7 15.7 0 0 0 2 12s3.6 6.5 10 6.5c1.4 0 2.7-.3 3.8-.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.5 10a2.6 2.6 0 0 0 3.6 3.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M12 3.5 2 20h20L12 3.5Z" strokeLinejoin="round" />
    <path d="M12 10v4.5" strokeLinecap="round" />
    <circle cx="12" cy="17.2" r="0.4" fill="currentColor" />
  </svg>
);

// Get the current week
function getCurrentWeekInfo(today = new Date()) {
  const start = new Date(today);
  const dayOfWeek = start.getDay() || 7; // Sunday (0) -> 7
  start.setDate(start.getDate() - dayOfWeek + 1); // back up to Monday
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 4); // Friday

  const oneJan = new Date(today.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((today - oneJan) / 86400000 + oneJan.getDay() + 1) / 7
  );

  const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return {
    weekNumber,
    range: `${fmt(start)} – ${fmt(end)}`,
  };
}

//  signature element: a live-looking weekly report preview 
function ReportPreview() {
  const { weekNumber, range } = getCurrentWeekInfo();

  const rows = [
    { label: "Reports submitted", value: "9 / 11", width: "82%" },
    { label: "Compliance rate", value: "82%", width: "82%" },
    { label: "Open blockers", value: "5", width: "38%" },
  ];

  return (
    <div className="relative w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-sm">
      <div className="flex items-start justify-between border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-300/80">
            Week {weekNumber}
          </p>
          <p className="mt-1 font-serif text-lg text-white/90">{range}</p>
        </div>
        <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-amber-200">
          2 pending
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] text-white/60">
              <span>{row.label}</span>
              <span className="text-white/85">{row.value}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-300 transition-all duration-1000 ease-out"
                style={{ width: row.width }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 border-t border-white/10 pt-4 text-[13px] leading-relaxed text-white/50">
        Filterable by team member, project, and date range on the manager dashboard.
      </p>
    </div>
  );
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    setAuthError("");

    try {
      const response = await authService.login(data);
      login(response);

      if (response.user.role === "MANAGER") {
        navigate("/manager");
      } else {
        navigate("/member");
      }
    } catch (error) {
      console.error(error);
      setAuthError(
        error?.response?.data?.message ||
          "We couldn't sign you in. Check your email and password and try again."
      );
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#F4F5F2] lg:grid-cols-2">
      {/* LEFT: form panel */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          {/* mark */}
          <div className="mb-8 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1B2430] font-serif text-base text-teal-300">
              W
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#5B6472]">
              Weekly Report Manager
            </span>
          </div>

          <h1 className="font-serif text-[32px] leading-tight text-[#1B2430]">
            Welcome back
          </h1>
          <p className="mt-2 text-[15px] text-[#5B6472]">
            Sign in to view and generate your team's reports.
          </p>

          {authError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-2.5 rounded-lg border border-[#E7B98B] bg-[#FBF1E6] px-3.5 py-3 text-[13px] text-[#8A4B12]"
            >
              <AlertIcon className="mt-0.5 h-4 w-4 flex-none" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[13px] font-medium text-[#1B2430]"
              >
                Email address
              </label>
              <div className="relative">
                <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B9199]" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-3.5 text-[15px] text-[#1B2430] placeholder:text-[#A6ABB2] outline-none transition focus:ring-2 focus:ring-offset-0 ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-[#DADFDA] focus:border-[#2F6F5E] focus:ring-[#2F6F5E]/20"
                  }`}
                  {...register("email", {
                    required: "Enter your email address.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address.",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p role="alert" className="mt-1.5 text-[13px] text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-[13px] font-medium text-[#1B2430]">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-[13px] font-medium text-[#2F6F5E] hover:text-[#255A4C] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <LockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B9199]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  aria-invalid={errors.password ? "true" : "false"}
                  className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-11 text-[15px] text-[#1B2430] placeholder:text-[#A6ABB2] outline-none transition focus:ring-2 focus:ring-offset-0 ${
                    errors.password
                      ? "border-red-300 focus:ring-red-200"
                      : "border-[#DADFDA] focus:border-[#2F6F5E] focus:ring-[#2F6F5E]/20"
                  }`}
                  {...register("password", {
                    required: "Enter your password.",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters.",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B9199] hover:text-[#1B2430] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6F5E]/30 rounded"
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p role="alert" className="mt-1.5 text-[13px] text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* remember me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember"
                type="checkbox"
                {...register("remember")}
                className="h-4 w-4 rounded border-[#DADFDA] text-[#2F6F5E] focus:ring-[#2F6F5E]/30"
              />
              <label htmlFor="remember" className="text-[13px] text-[#5B6472]">
                Keep me signed in on this device
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1B2430] py-2.75 text-[15px] font-medium text-white transition hover:bg-[#243040] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6F5E] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4Z" />
                </svg>
              )}
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-7 text-[13px] text-[#8B9199]">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-[#2F6F5E] hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>

      {/* RIGHT: brand + signature preview panel */}
      <div className="relative hidden overflow-hidden bg-[#141C29] lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="relative z-10 px-10">
          <p className="mb-8 max-w-sm font-serif text-[26px] leading-snug text-white/90">
            One fixed report format, submitted weekly.
          </p>
          <ReportPreview />
        </div>
      </div>
    </div>
  );
}

export default Login;