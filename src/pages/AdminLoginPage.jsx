import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Building2,
  FileText,
  Sparkles
} from 'lucide-react';
import { dataService, ADMIN_CREDENTIALS } from '../services/dataService';
import BrandWordmark from '../components/BrandWordmark';

export default function AdminLoginPage({ onLoginSuccess, onNavigatePublic }) {
  const [email, setEmail] = useState(ADMIN_CREDENTIALS.email);
  const [password, setPassword] = useState(ADMIN_CREDENTIALS.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = dataService.login(email, password);
      setIsLoading(false);

      if (result.success) {
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        } else {
          window.history.pushState(null, '', '/admin');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      } else {
        setError(result.message || 'Invalid credentials. Please verify your email and password.');
      }
    }, 400);
  };

  const fillDemoCredentials = () => {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#101010] text-[#F5F0E6] flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#101010] relative overflow-hidden">
      
      {/* Background Subtle Luxury Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="relative z-10 border-b border-[#343434] py-4 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#101010] p-1 border border-[#D4AF37] flex items-center justify-center overflow-hidden">
            <img src="/images/logo.png" alt="Malabar Prime Logo" className="w-full h-full object-cover" />
          </div>
          <BrandWordmark heightClass="h-5 sm:h-6" />
        </div>

        <button
          onClick={() => {
            if (onNavigatePublic) onNavigatePublic('home');
            else {
              window.history.pushState(null, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          className="text-xs font-mono font-bold text-[#F5F0E6]/70 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
        >
          <span>Return to Public Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-[#181818] border-2 border-[#D4AF37]/40 rounded-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-sm relative">
          
          {/* Top Gold Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono font-bold tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CENTRAL TRADE DESK BACKEND</span>
            </div>
            <span className="text-[10px] font-mono text-[#F5F0E6]/50">v2.4 SECURE</span>
          </div>

          <div className="mb-6">
            <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white mb-2">
              Administrator Login
            </h1>
            <p className="text-xs text-[#F5F0E6]/70 leading-relaxed font-medium">
              Access the Malabar Prime unified commercial console to manage partner applications, trade RFQs, FMCG catalog, assurance compliance, and PDF invoices.
            </p>
          </div>

          {/* Quick Demo Credentials Info Pill */}
          <div className="mb-6 p-3.5 bg-[#101010] border border-[#D4AF37]/30 rounded-xl flex items-center justify-between gap-3">
            <div className="text-[11px] font-mono space-y-0.5">
              <div className="text-[#F5F0E6]/60">Authorized Admin Email:</div>
              <div className="text-[#D4AF37] font-bold">malabarprime.co@gmail.com</div>
              <div className="text-[#F5F0E6]/60 pt-0.5">Password: <span className="text-white font-bold">password123</span></div>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] rounded text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 flex-shrink-0 transition-colors shadow"
              title="Click to fill configured admin credentials"
            >
              <Sparkles className="w-3 h-3" />
              <span>Auto Fill</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3.5 bg-red-950/80 border border-red-500/60 rounded-xl flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F5F0E6]/50">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="malabarprime.co@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#101010] border border-[#343434] focus:border-[#D4AF37] rounded-xl text-white font-mono text-xs focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono font-bold uppercase text-[#D4AF37]">
                  Master Secret Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-mono text-[#F5F0E6]/50 hover:text-[#D4AF37] flex items-center gap-1"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3 h-3" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3" />
                      <span>Show</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F5F0E6]/50">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#101010] border border-[#343434] focus:border-[#D4AF37] rounded-xl text-white font-mono text-xs focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#f3d36b] hover:from-[#c29e2f] hover:to-[#D4AF37] text-[#101010] font-black uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#101010] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#101010]" />
                  <span>Authenticate &amp; Launch Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-[#101010] group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Statutory Verification Footer */}
          <div className="mt-8 pt-6 border-t border-[#343434]/80 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-[#F5F0E6]/50">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
              FSSAI: 11322001000845
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
              GST: 32AAECM4912L1ZT
            </span>
            <span>ISO 22000:2018</span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#343434] py-4 px-6 text-center text-xs font-mono text-[#F5F0E6]/40">
        Malabar Prime Food Distributions &bull; Central Operational Node &bull; Confidential &amp; Proprietary
      </footer>

    </div>
  );
}

