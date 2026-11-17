import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  Award, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageSquare,
  Building2,
  ExternalLink,
  ChevronRight,
  Clock,
  MapPin,
  Lock
} from 'lucide-react';
import { LEGAL_POLICIES } from '../data/legalData';
import { COMPANY_INFO } from '../data/distributionData';
import { dataService } from '../services/dataService';

const POLICY_ICONS = {
  terms: FileText,
  privacy: Lock,
  refund: RotateCcw,
  shipping: Truck,
  compliance: ShieldCheck
};

export default function LegalPage({ initialPolicy = 'terms', onNavigate }) {
  const [policies, setPolicies] = useState(() => dataService.getPolicies());
  const [activeTab, setActiveTab] = useState(initialPolicy);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setPolicies(dataService.getPolicies());
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (initialPolicy && policies[initialPolicy]) {
      setActiveTab(initialPolicy);
    }
  }, [initialPolicy, policies]);

  const currentPolicy = policies[activeTab] || policies.terms || Object.values(policies)[0] || LEGAL_POLICIES.terms;
  const ActiveIcon = POLICY_ICONS[activeTab] || FileText;

  const handleTabChange = (key) => {
    setActiveTab(key);
    // Update clean URL without reload
    const cleanUrl = key === 'terms' ? '/terms' : (key === 'privacy' ? '/privacy' : (key === 'refund' ? '/refund' : (key === 'shipping' ? '/shipping' : `/${key}`)));
    if (window.location.pathname !== cleanUrl) {
      window.history.pushState(null, '', cleanUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full bg-[#F5F0E6] text-[#101010] min-h-screen">
      
      {/* Top Breadcrumb & Page Header */}
      <section className="border-b border-[#101010] py-12 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#343434] mb-4">
            <button 
              onClick={() => onNavigate ? onNavigate('home') : (window.location.pathname = '/')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#343434]/40" />
            <span className="text-[#101010] font-bold">Legal &amp; Statutory Compliance</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#343434]/40" />
            <span className="text-[#D4AF37] font-bold">{currentPolicy.shortTitle}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
                {currentPolicy.badge}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-[#101010] leading-tight mb-3">
                {currentPolicy.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#343434] leading-relaxed font-medium">
                {currentPolicy.description}
              </p>
            </div>

            {/* Quick Document Actions (Print / Copy Link) */}
            <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded bg-white hover:bg-[#F5F0E6] text-[#101010] border border-[#101010] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                title="Print official policy document"
              >
                <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Print Document</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] border border-[#101010] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                title="Copy direct document URL"
              >
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Link'}</span>
              </button>
            </div>
          </div>

          {/* Document Metadata Strip */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[#343434] mt-6 pt-4 border-t border-[#101010]/15">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Effective: <strong>{currentPolicy.effectiveDate}</strong></span>
            </div>
            <span>•</span>
            <div>
              <span>Last Revised: <strong>{currentPolicy.lastUpdated}</strong></span>
            </div>
            <span>•</span>
            <div className="text-[#101010] font-bold">
              <span>Jurisdiction: Kozhikode (Calicut), Kerala, India</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Legal Content & Interactive Navigation Hub */}
      <section className="py-12 px-4 sm:px-8 lg:px-12 w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Policy Tabs */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white border border-[#101010] rounded-xl p-4 shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-3 px-2">
                LEGAL DIRECTORY
              </span>

              <nav className="space-y-1.5">
                {Object.keys(policies).map((key) => {
                  const policy = policies[key];
                  const Icon = POLICY_ICONS[key] || FileText;
                  const isActive = activeTab === key;

                  return (
                    <button
                      key={key}
                      onClick={() => handleTabChange(key)}
                      className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#101010] text-[#D4AF37] shadow-sm ring-1 ring-[#101010]'
                          : 'bg-[#F5F0E6]/50 hover:bg-[#F5F0E6] text-[#101010]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-[#343434] group-hover:text-[#101010]'}`} />
                        <span className="font-editorial text-sm">{policy.shortTitle}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-0.5 text-[#D4AF37]' : 'opacity-40 group-hover:opacity-100'}`} />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Statutory Compliance Summary Card */}
            <div className="bg-[#101010] text-[#F5F0E6] border border-[#343434] rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Registrations</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#343434]">
                  <span className="text-[#F5F0E6]/60">FSSAI Central Lic:</span>
                  <strong className="text-[#D4AF37]">{COMPANY_INFO.fssaiNumber}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#343434]">
                  <span className="text-[#F5F0E6]/60">GSTIN / State:</span>
                  <strong className="text-white">{COMPANY_INFO.gstNumber}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#343434]">
                  <span className="text-[#F5F0E6]/60">Food Safety Cert:</span>
                  <strong className="text-white">{COMPANY_INFO.isoCert}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#F5F0E6]/60">Headquarters:</span>
                  <strong className="text-[#F5F0E6]">Kozhikode, Kerala</strong>
                </div>
              </div>
            </div>

            {/* Direct Trade Desk Support Card */}
            <div className="bg-white border border-[#101010] rounded-xl p-5 shadow-sm space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block">
                COMPLIANCE &amp; CLAIMS DESK
              </span>
              <p className="text-xs text-[#343434] font-medium leading-relaxed">
                For damage claims, GST credit notes, or contract clarifications:
              </p>
              <div className="space-y-2 text-xs font-bold">
                <a 
                  href={`tel:${COMPANY_INFO.phone}`} 
                  className="flex items-center gap-2 text-[#101010] hover:text-[#D4AF37] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className="flex items-center gap-2 text-[#101010] hover:text-[#D4AF37] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
                <a 
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Malabar%20Prime%2C%20inquiry%20regarding%20commercial%20policies.`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#101010] hover:text-[#D4AF37] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>WhatsApp Claims Hotline</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Complete Legal Policy Clauses */}
          <main className="lg:col-span-8 bg-white border border-[#101010] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Header of Active Document */}
            <div className="pb-6 border-b border-[#101010]/20 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#101010] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-sm">
                <ActiveIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
                  OFFICIAL COMMERCIAL POLICY &bull; SECTION {currentPolicy.id.toUpperCase()}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-black text-[#101010]">
                  {currentPolicy.title}
                </h2>
              </div>
            </div>

            {/* Document Body Sections */}
            <div className="space-y-8">
              {currentPolicy.sections.map((section, idx) => (
                <article key={idx} className="space-y-2.5 pb-6 border-b border-[#101010]/10 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded bg-[#F5F0E6] border border-[#101010]/30 text-[#101010] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {section.number}
                    </span>
                    <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#101010]">
                      {section.heading}
                    </h3>
                  </div>

                  <div className="pl-10 text-xs sm:text-sm text-[#343434] leading-relaxed font-medium space-y-2 whitespace-pre-line">
                    {section.content}
                  </div>
                </article>
              ))}
            </div>

            {/* Closing Attestation Strip */}
            <div className="pt-6 border-t border-[#101010] bg-[#F5F0E6] p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#101010]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Authorized Commercial Wholesale Policy</span>
              </div>
              <p className="text-xs text-[#343434] leading-relaxed font-medium">
                Issued and maintained under the authority of the Board of Directors, <strong>Malabar Prime Distributions</strong>, NH-66 Logistics Corridor, Ramanattukara, Kozhikode, Kerala 673633. For customized distributor agreements or master supply contracts, contact our commercial trade desk directly.
              </p>
            </div>

          </main>

        </div>
      </section>

    </div>
  );
}
