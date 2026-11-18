import React from 'react';

export default function MarqueeTicker() {
  const items = [
    { text: "MALABAR PRIME DISTRIBUTIONS", serif: true },
    { text: "1,450+ SUPERMARKETS SERVED", serif: false },
    { text: "24-48 HOUR STORE REPLENISHMENT", serif: false },
    { text: "100% GENUINE FACTORY BATCHES", serif: true },
    { text: "COLD-CHAIN REEFER LOGISTICS", serif: false },
    { text: "100% STATUTORY & REGULATORY COMPLIANT", serif: false },
    { text: "DIRECT PRODUCER WHOLESALE MARGINS", serif: true },
  ];

  return (
    <div className="bg-[#F5F0E6] border-y border-[#101010] py-3 overflow-hidden whitespace-nowrap select-none w-full">
      <div className="marquee-continuous flex items-center">
        {/* Render 2 identical continuous tracks for seamless infinite Right-to-Left scroll */}
        {[0, 1].map((setIdx) => (
          <div key={setIdx} className="flex items-center shrink-0">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center mx-5 sm:mx-7">
                <span className={item.serif ? 'font-editorial italic font-normal text-sm sm:text-base text-[#101010]' : 'font-sans font-black text-xs uppercase tracking-widest text-[#343434]'}>
                  {item.text}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] border border-[#101010] ml-6 sm:ml-8 flex-shrink-0"></span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
