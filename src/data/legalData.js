import { COMPANY_INFO } from './distributionData';

export const LEGAL_POLICIES = {
  terms: {
    id: 'terms',
    title: 'Commercial Terms & Wholesale Supply Conditions',
    shortTitle: 'Terms & Conditions',
    badge: 'B2B COMMERCIAL CONTRACT',
    effectiveDate: 'November 1, 2024',
    lastUpdated: 'November 16, 2026',
    description: 'Statutory wholesale trading terms governing all purchase orders, consignments, credit lines, and distribution agreements between Malabar Prime Distributions and verified commercial retail partners.',
    sections: [
      {
        number: '01',
        heading: 'Commercial Scope & Agreement to Terms',
        content: `These Commercial Terms of Wholesale Supply ("Terms") constitute a legally binding agreement between Malabar Prime Distributions ("Distributor", "Company", "We", "Us"), operating from ${COMPANY_INFO.address || 'Central Master Depot'}, holding FSSAI License No. ${COMPANY_INFO.fssaiNumber || 'Not Available'} and GSTIN ${COMPANY_INFO.gstNumber || 'Not Available'}, and the purchasing retail entity, supermarket chain, hypermarket, or commercial kitchen ("Buyer", "Partner", "You"). 

By placing a Purchase Order (PO), submitting a digital Request for Quotation (RFQ), accepting a consignment, or signing a distribution agreement, the Buyer unconditionally agrees to be bound by these Terms to the exclusion of any conflicting buyer terms.`
      },
      {
        number: '02',
        heading: 'B2B Eligibility & Statutory KYC Verification',
        content: `Consignments are supplied exclusively on a business-to-business (B2B) wholesale basis. Retailers must complete our commercial verification process before supply initiation, providing:
1. Valid Goods and Services Tax Identification Number (GSTIN).
2. Food Safety and Standards Authority of India (FSSAI) state or central retail license.
3. Verified physical commercial store address and primary trade contacts.
4. PAN card of the proprietor, partnership firm, or incorporated company.

We reserve the strict right to suspend, cancel, or refuse consignment supply to any entity failing statutory KYC validation or engaging in unauthorized sub-channel distribution.`
      },
      {
        number: '03',
        heading: 'Wholesale Pricing, Price Bulletins & Tax Invoicing',
        content: `All prices quoted on our digital portal, official PDF price schedules, and WhatsApp quotations are wholesale trade prices in Indian Rupees (INR) exclusive of applicable Goods and Services Tax (GST) unless explicitly noted as MRP inclusive.

1. Price Adjustments: Due to global commodity cycles, raw harvest yields, and manufacturer revisions, prices are subject to periodic updates. Confirmed Purchase Orders with issued Proforma Invoices remain price-locked for 72 hours.
2. Statutory Tax Invoicing: Every delivery is accompanied by an authenticated Tax Invoice compliant with Section 31 of the CGST Act, 2017, along with an electronically generated E-Way Bill for consignments exceeding statutory thresholds.
3. Tier Volume Slabs: Volume rebate incentives (typically 4% to 12%) apply only when individual SKU carton thresholds are fulfilled within a single delivery consignment.`
      },
      {
        number: '04',
        heading: 'Purchase Orders, Minimum Order Quantities (MOQ) & Dispatch',
        content: `1. Minimum Order Quantity (MOQ): Standard wholesale dispatch requires a minimum of 5 to 20 Master Cartons per order, depending on SKU tier (Chocolates, Beverages, Juices, Snacks, or Natural Water).
2. Order Transmission: Orders must be submitted via our official digital trade desk, WhatsApp sales portal, or authorized territory sales representative.
3. Lead Times: Confirmed consignments are staged for dispatch from our nearest regional temperature-controlled hub (Kozhikode, Kochi, Kannur, Wayanad) within 4 to 24 hours of PO confirmation.`
      },
      {
        number: '05',
        heading: 'Commercial Payment Terms, Billing & Credit Facility',
        content: `1. Default Terms: Unless a credit line has been formally sanctioned, wholesale consignments operate on 100% advance RTGS/NEFT payment, Immediate Bank Transfer, or pre-approved Cash on Delivery (COD) against authenticated delivery receipt.
2. Verified Credit Facility: Retail supermarkets with a minimum 6-month proven track record and trade references may apply for our 15-day or 30-day revolving credit line subject to credit evaluation and signed security instruments.
3. Overdue Accounts: Payments delayed beyond agreed credit maturity accrue commercial interest at 18% per annum calculated daily until full settlement. Future consignment shipments will be placed on immediate administrative hold until overdue ledgers are cleared.`
      },
      {
        number: '06',
        heading: 'Delivery, Risk of Loss & Inspection Protocol',
        content: `1. Transfer of Risk: Risk of loss and physical damage to goods passes to the Buyer upon safe offloading and physical delivery at the Buyer's designated store receiving dock.
2. Mandatory Inspection: Buyer receiving staff must physically inspect external carton seals, pallet integrity, temperature readings for cold-chain items, and verified batch numbers before endorsing the physical or digital Proof of Delivery (POD).
3. Delivery Discrepancies: Any outer carton damage, shortage, or tamper seal violation must be immediately recorded on the delivery challan copy signed by the carrier driver.`
      },
      {
        number: '07',
        heading: 'Legal Metrology, Barcode Mandate & Shelf-Life Protocol',
        content: `1. Legal Metrology: All consumer master packs and inner units are strictly compliant with the Legal Metrology (Packaged Commodities) Rules, 2011, featuring genuine manufacturer MRP stamps, net quantity declarations, manufacture dates, and GS1 EAN-13 barcodes.
2. FIFO / FEFO Mandate: We strictly enforce First-In-First-Out (FIFO) and First-Expiry-First-Out (FEFO) warehouse rotation. Consignments are dispatched with a minimum remaining shelf life of 70% to 85% of total manufacturer shelf life, unless explicitly ordered as a short-dated promotional clearance lot.`
      },
      {
        number: '08',
        heading: 'Limitation of Liability & Force Majeure',
        content: `1. Liability Cap: Under no circumstances shall Malabar Prime Distributions be liable for indirect, incidental, punitive, or consequential damages, including loss of retail profits, store downtime, or customer claims. Our total aggregate liability under any order is strictly limited to the invoiced net amount paid for the specific affected goods.
2. Force Majeure: Neither party shall be held liable for supply delays or failures resulting from acts of God, extreme floods, landslides in Western Ghat transport routes, state highway bandhs, strikes, national grid failures, or governmental embargoes.`
      },
      {
        number: '09',
        heading: 'Governing Law & Legal Jurisdiction',
        content: `These Terms and all commercial wholesale transactions shall be governed by, construed, and enforced in accordance with the laws of the Republic of India. In the event of any commercial dispute, difference, or claim arising out of or related to these Terms, the civil courts in Kozhikode (Calicut), Kerala, shall hold sole and exclusive territorial jurisdiction.`
      }
    ]
  },

  privacy: {
    id: 'privacy',
    title: 'Trade Privacy & B2B Information Protection Policy',
    shortTitle: 'Privacy Policy',
    badge: 'CONFIDENTIALITY PROTOCOL',
    effectiveDate: 'November 1, 2024',
    lastUpdated: 'November 16, 2026',
    description: 'How Malabar Prime Distributions collects, safeguards, and processes commercial retail partner data, purchase volumes, and trade desk communications under the Information Technology Act, 2000.',
    sections: [
      {
        number: '01',
        heading: 'Commitment to Trade & Partner Confidentiality',
        content: `Malabar Prime Distributions respects the privacy and proprietary business information of every supermarket operator, retail buyer, supplier, and distributor in our network. This Privacy Policy details our operational practices regarding data collected through our digital catalog, RFQ cart, commercial onboarding portal, and direct WhatsApp trade desk.`
      },
      {
        number: '02',
        heading: 'Commercial Information We Collect',
        content: `In the course of business transactions and commercial onboarding, we collect:
1. Business Profile: Registered business name, trade name, commercial store physical address, city, district, state, and pin code.
2. Statutory Registrations: Valid GSTIN, FSSAI license certificates, and PAN credentials.
3. Trade Contacts: Primary purchase manager names, phone numbers, mobile WhatsApp contact numbers, and official procurement email addresses.
4. Transactional Data: Purchase orders, requested SKU volumes, quotation histories, consignment delivery receipts, and billing ledgers.
5. Technical Data: Browser user-agent, IP address, and session timestamps used solely for security and portal stability.`
      },
      {
        number: '03',
        heading: 'Strict Non-Disclosure of Retail Volume & Pricing Data',
        content: `We recognize that your purchase volumes, store turnover, and customized volume rebate slabs represent critical competitive trade secrets. 

We maintain a strict Non-Disclosure Policy:
1. Your individual store order quantities and purchase history are NEVER sold, rented, shared, or disclosed to competing supermarkets, retail chains, or third-party marketers.
2. Custom volume pricing negotiated with our commercial desk remains strictly confidential between your enterprise and our management.
3. Manufacturer reporting is conducted solely on an aggregated, anonymized territorial basis to verify regional allocation without revealing individual store profitability.`
      },
      {
        number: '04',
        heading: 'How We Utilize Your Trade Information',
        content: `Your business information is strictly utilized to:
1. Process, confirm, dispatch, and track wholesale consignments and pallet deliveries.
2. Issue legally compliant GST tax invoices, delivery challans, and E-Way bills.
3. Transmit weekly commodity price adjustments, seasonal harvest alerts, and container arrival notices (opt-out available anytime).
4. Conduct internal credit evaluations for revolving 15-day / 30-day payment accounts.
5. Provide prompt customer service and dedicated account manager support via our trade desk.`
      },
      {
        number: '05',
        heading: 'Logistics Data Sharing with Fleet Carriers',
        content: `To ensure seamless 24 to 48-hour delivery, we share necessary delivery logistics data (store address, receiving dock contact, delivery time window, and invoice challan) with our internal GPS reefer drivers and contracted dedicated logistics carriers. All carriers are bound by strict delivery confidentiality agreements.`
      },
      {
        number: '06',
        heading: 'Data Security & Retention Standards',
        content: `We implement modern technical and administrative safeguards to protect your business records, including 256-bit SSL encryption in transit, restricted role-based internal admin access, and tamper-evident database storage. Statutory billing records and GST transaction ledgers are retained for the statutory period mandated under the Central Goods and Services Tax Act (currently 7 years).`
      },
      {
        number: '07',
        heading: 'Contacting Our Privacy & Compliance Officer',
        content: `If you have any questions, need to update your store credentials, or wish to manage your trade desk communication preferences, contact our Compliance Officer at:
- Email: ${COMPANY_INFO.email}
- Hotline: ${COMPANY_INFO.phone}
- Central Logistics Hub: ${COMPANY_INFO.address}`
      }
    ]
  },

  refund: {
    id: 'refund',
    title: 'Wholesale Refund, Return & Damaged Goods SLA',
    shortTitle: 'Refund & Return Policy',
    badge: 'QUALITY & TRANSIT SLA',
    effectiveDate: 'November 1, 2024',
    lastUpdated: 'November 16, 2026',
    description: 'Clear, transparent B2B protocols for reporting transit damage, temperature-excursion claims, verified factory defects, short shipments, and issuing commercial Credit Notes (CN).',
    sections: [
      {
        number: '01',
        heading: 'Quality Protocol & Factory-Direct Guarantee',
        content: `Malabar Prime Distributions operates under certified ISO 22000:2018 food safety and HACCP cold-chain protocols. Every consignment dispatched from our central depots has undergone inward batch inspection, moisture testing, and sealed pallet verification. We stand 100% behind the authenticity, expiry integrity, and packaging standards of every wholesale SKU supplied.`
      },
      {
        number: '02',
        heading: '48-Hour Inspection Window & Damage Claim SLA',
        content: `To claim any credit or replacement for damaged, leaking, defective, or incorrect items, retail receiving staff must adhere to our 48-Hour Claim Window:
1. Initial Recording: Visible carton damage, seal breaks, or pallet crush must be noted immediately on the physical delivery challan or carrier consignment note (POD).
2. Photo / Video Verification: Clear photographic evidence of the damaged master cartons, inner unit barcodes, and outer batch coding must be transmitted to our WhatsApp Claims Desk (${COMPANY_INFO.whatsapp}) or email (${COMPANY_INFO.email}) within 48 hours of delivery.
3. Claims submitted after 48 hours of offloading cannot be accepted due to retail store storage variables beyond our temperature control.`
      },
      {
        number: '03',
        heading: 'Cold-Chain & Temperature Excursion Protocol',
        content: `For temperature-sensitive lines (Chocolates, Premium Dairy Beverages, and Chilled Juices):
1. Reefer Temperature Check: Consignments must be inspected upon carrier arrival. Drivers maintain continuous digital temperature data logs (2°C - 8°C or 16°C - 20°C for confectionery).
2. Melt / Blooming Claims: Any temperature excursion occurring during vehicle transit that causes chocolate bloom, heat melting, or container puffing will be replaced in full or credited upon driver endorsement and inspection verification.`
      },
      {
        number: '04',
        heading: 'Short Shipments & Carton Discrepancies',
        content: `In the rare event of a carton discrepancy between the E-Way bill invoice and physical pallet counts:
1. The receiving store supervisor and carrier driver must mutually sign a Shortage Memo stating the exact missing SKU count.
2. A revised GST Credit Note (CN) will be generated within 24 hours to reduce the payable invoice balance, or the missing cartons will be dispatched on the next scheduled route without extra freight charges.`
      },
      {
        number: '05',
        heading: 'Commercial Credit Note (CN) vs. Cash Refund',
        content: `As an authorized B2B wholesale network:
1. Credit Notes (CN): Approved claims are resolved primarily through authenticated GST Credit Notes issued in accordance with GST rules. The credit note balance is automatically credited to your trade ledger and deducted from your subsequent purchase order.
2. Direct Bank Refund: For cash-advance buyers or closed accounts, refunds are processed via NEFT/RTGS to the verified registered bank account of the business within 3 to 5 business days of claim approval.`
      },
      {
        number: '06',
        heading: 'Non-Returnable Consignments & Exceptions',
        content: `The following goods cannot be returned or credited:
1. Master cartons that have been cut, stripped of barcodes, or stored in improper retail ambient conditions (e.g. exposed to direct sunlight, high humidity, or pest infestation).
2. SKUs ordered as special custom consignments or non-standard seasonal volume pre-orders.
3. Expiry claims arising from slow retail off-take within the store where the product was delivered with standard 70%+ remaining shelf life.
4. Goods that have been marked, tagged, or priced with store retail price stickers.`
      }
    ]
  },

  shipping: {
    id: 'shipping',
    title: 'Wholesale Delivery, Reefer Transit & Logistics Protocol',
    shortTitle: 'Shipping & Logistics Policy',
    badge: 'COLD-CHAIN DISPATCH PROTOCOL',
    effectiveDate: 'November 1, 2024',
    lastUpdated: 'November 16, 2026',
    description: 'Detailed logistics standards covering our 32+ GPS-monitored reefer fleet, warehouse staging, 24 to 48-hour delivery SLAs, and store dock receiving protocols.',
    sections: [
      {
        number: '01',
        heading: 'South India Logistics Network & Regional Hubs',
        content: `Malabar Prime Distributions operates a multi-compartment fleet of 32+ GPS-equipped reefer and container trucks. Consignments are dispatched directly from our regional staging hubs:
1. Kozhikode Central Mega Depot (HQ): Serving Northern & Central Kerala and Western Tamil Nadu corridors.
2. Kochi Logistics Hub (Aluva): Serving Central and Southern Kerala modern trade stores.
3. Kannur Depot: Serving Malabar coast, Kasaragod, and Southern Karnataka borders.
4. Wayanad Processing Hub: Serving hill tract plantation and specialty dry consignments.`
      },
      {
        number: '02',
        heading: 'Store Delivery Turnaround SLA (24 to 48 Hours)',
        content: `1. Tier-1 Commercial Cities (Kozhikode, Kochi, Kannur, Thrissur, Palakkad, Coimbatore): Scheduled replenishment within 24 to 36 hours of Purchase Order confirmation.
2. Tier-2 Regional Centers & Extended Routes: Delivery fulfilled within 36 to 48 hours according to scheduled weekly route cadence.
3. Emergency Stockout Support: Verified supermarket partners can request expedited Saturday replenishment during peak festive seasons (Onam, Eid, Diwali, New Year).`
      },
      {
        number: '03',
        heading: 'Multi-Temperature Reefer Vehicle Integrity',
        content: `Our vehicles feature insulated multi-temperature partitioned compartments:
1. Confectionery & Chocolate Storage: Maintained continuously at 16°C to 20°C with automated humidity control to prevent sugar or fat blooming.
2. Ambient Dry Packs (Snacks, Juices, Bottled Water, Grains): Clean, dust-proof, ventilated transit on heavy-duty wooden and HDPE export pallets.
3. GPS Telemetry Tracking: Central dispatch monitors vehicle route progress and internal cargo temperatures in real time.`
      },
      {
        number: '04',
        heading: 'Store Receiving Dock & Demurrage Terms',
        content: `1. Offloading Readiness: The Buyer must ensure their receiving bay and warehouse staff are available during confirmed delivery windows.
2. Vehicle Detention: To maintain route accuracy for downstream supermarkets, vehicle unloading time is standardly capped at 45 minutes for partial consignments and 90 minutes for full-truck consignments. Unjustified vehicle detentions beyond 2 hours may incur demurrage charges at ₹350 per hour.`
      }
    ]
  },

  compliance: {
    id: 'compliance',
    title: 'Statutory Assurance, FSSAI & Food Safety Policy',
    shortTitle: 'Statutory Compliance',
    badge: 'REGULATORY CERTIFICATIONS',
    effectiveDate: 'November 1, 2024',
    lastUpdated: 'November 16, 2026',
    description: 'Our complete statutory certifications, legal metrology registrations, FSSAI license parameters, and quality governance standards.',
    sections: [
      {
        number: '01',
        heading: 'Food Safety and Standards Authority of India (FSSAI)',
        content: `Malabar Prime Distributions operates strictly under valid Central / State FSSAI licensing under the Food Safety and Standards Act, 2006 (License: ${COMPANY_INFO.fssaiNumber || 'Not Available'}). 

Our operations strictly enforce:
1. Inward lot spectrometry and visual hygiene testing on every arriving manufacturer shipment.
2. Segregated palletized warehousing avoiding cross-contamination between spices, confectionery, and chemical household cleaners.
3. Mandatory hygiene protocols, periodic pest management by certified agencies, and automated temperature logging.`
      },
      {
        number: '02',
        heading: 'Goods and Services Tax (GST) & E-Way Bill Compliance',
        content: `Operating under verified GST registration (GSTIN: ${COMPANY_INFO.gstNumber || 'Not Available'}), our accounting engine provides 100% statutory input tax credit (ITC) compliance for retail supermarket accounts:
1. Every delivery carries an invoice with compliant HSN codes, correct CGST/SGST/IGST breakdown, and active E-Way Bill numbers.
2. B2B invoices are uploaded to the GST portal in real-time, ensuring seamless GSTR-2B reflection for your monthly tax filings.`
      },
      {
        number: '03',
        heading: 'Food Safety & HACCP Cold Chain Management',
        content: `Our central logistics facilities maintain certified Food Safety Management System standards. We adhere to Hazard Analysis Critical Control Point (HACCP) standards across storage, pallet wrapping, cold-chain temperature monitoring, and dispatch verification.`
      },
      {
        number: '04',
        heading: 'Legal Metrology (Packaged Commodities) Standards',
        content: `All products supplied feature manufacturer-certified packaging compliant with the Legal Metrology Act, 2009 and Packaged Commodities Rules, 2011:
1. Genuine Maximum Retail Price (MRP) inclusively printed with month/year of manufacture and batch codes.
2. Clear net quantity, customer care contact details, and manufacturer origin labels on every retail carton and unit.`
      }
    ]
  }
};
