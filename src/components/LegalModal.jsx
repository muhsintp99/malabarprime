import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  Lock, 
  Printer, 
  ExternalLink,
  ChevronRight,
  Clock
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

export default function LegalModal({ 
  isOpen, 
  onClose, 
  initialPolicy = 'terms',
  onNavigate 
}) {
  const [policies, setPolicies] = useState(() => dataService.getPolicies());
  const [assurance, setAssurance] = useState(() => dataService.getAssurance());
  const [activeTab, setActiveTab] = useState(initialPolicy);

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setPolicies(dataService.getPolicies());
      setAssurance(dataService.getAssurance());
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (initialPolicy && policies[initialPolicy]) {
      setActiveTab(initialPolicy);
    }
  }, [initialPolicy, isOpen, policies]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPolicy = policies[activeTab] || policies.terms || Object.values(policies)[0] || LEGAL_POLICIES.terms;
  const ActiveIcon = POLICY_ICONS[activeTab] || FileText;

  const handlePrint = () => {
    window.print();
  };

  const handleOpenFullPage = () => {
    onClose();
    if (onNavigate) {
      onNavigate(activeTab);
    } else {
      window.location.pathname = `/${activeTab}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Main Modal Container */}
      <div 
        className="relative bg-white border-2 border-[#101010] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-[#F5F0E6] border-b border-[#101010] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#101010] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-sm">
              <ActiveIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block">
                {currentPolicy.badge}
              </span>
              <h3 className="font-editorial text-lg sm:text-2xl font-bold text-[#101010]">
                {currentPolicy.shortTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenFullPage}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-[#101010] hover:text-[#D4AF37] text-[#101010] border border-[#101010] text-[11px] font-mono font-bold uppercase transition-colors"
              title="Open full dedicated page"
            >
              <span>Full Page</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded bg-white hover:bg-black/10 text-[#101010] border border-[#101010] transition-colors"
              title="Print document"
            >
              <Printer className="w-4 h-4 text-[#343434]" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#101010] text-[#F5F0E6] hover:bg-[#343434] transition-colors ml-1"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher Bar */}
        <div className="bg-white border-b border-[#101010]/15 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
          {Object.keys(policies).map((key) => {
            const policy = policies[key];
            const Icon = POLICY_ICONS[key] || FileText;
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#101010] text-[#D4AF37] border-[#101010] shadow-sm'
                    : 'bg-[#F5F0E6] text-[#343434] border-transparent hover:border-[#101010]/30 hover:text-[#101010]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-[#343434]'}`} />
                <span>{policy.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-[#101010]">
          
          <div className="bg-[#F5F0E6] p-4 rounded-xl border border-[#101010]/15 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#343434]">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Effective Date: <strong>{currentPolicy.effectiveDate}</strong></span>
            </div>
            <div>
              <span>FSSAI: <strong>{assurance?.fssaiNumber || 'Not Available'}</strong> &bull; GSTIN: <strong>{assurance?.gstNumber || 'Not Available'}</strong></span>
            </div>
          </div>

          <div className="space-y-6">
            {currentPolicy.sections.map((section, idx) => (
              <div key={idx} className="space-y-2 pb-5 border-b border-[#101010]/10 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded bg-[#101010] text-[#D4AF37] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {section.number}
                  </span>
                  <h4 className="font-editorial text-base sm:text-lg font-bold text-[#101010]">
                    {section.heading}
                  </h4>
                </div>
                <div className="pl-8 text-xs sm:text-sm text-[#343434] leading-relaxed font-medium whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-[#F5F0E6] border-t border-[#101010] flex items-center justify-between text-xs font-mono">
          <span className="text-[#343434] text-[11px] truncate max-w-sm hidden sm:inline">
            Official B2B Wholesale Trading Policies &bull; Kozhikode, Kerala
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleOpenFullPage}
              className="text-[#101010] hover:text-[#D4AF37] font-bold text-xs uppercase underline underline-offset-4"
            >
              Open Dedicated Page
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#101010] text-[#F5F0E6] hover:bg-[#343434] rounded text-xs font-bold uppercase transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
