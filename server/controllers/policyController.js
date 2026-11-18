import { getDb, saveDb } from '../models/db.js';

export const DEFAULT_POLICIES = {
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
        content: 'These Commercial Terms of Wholesale Supply ("Terms") constitute a legally binding agreement between Malabar Prime Distributions ("Distributor", "Company", "We", "Us") and the purchasing retail entity, supermarket chain, hypermarket, or commercial kitchen ("Buyer", "Partner", "You"). By placing a Purchase Order (PO), submitting a digital Request for Quotation (RFQ), accepting a consignment, or signing a distribution agreement, the Buyer unconditionally agrees to be bound by these Terms.'
      },
      {
        number: '02',
        heading: 'B2B Eligibility & Statutory KYC Verification',
        content: 'Consignments are supplied exclusively on a business-to-business (B2B) wholesale basis. Retailers must complete our commercial verification process before supply initiation, providing: 1. Valid GSTIN, 2. FSSAI state or central retail license, 3. Verified physical commercial store address, 4. Commercial PAN credentials.'
      },
      {
        number: '03',
        heading: 'Wholesale Pricing, Price Bulletins & Tax Invoicing',
        content: 'All prices quoted on our digital portal, official PDF price schedules, and WhatsApp quotations are wholesale trade prices in INR exclusive of applicable GST unless explicitly noted. Every delivery is accompanied by an authenticated Tax Invoice compliant with Section 31 of the CGST Act, 2017, and an electronically generated E-Way Bill.'
      },
      {
        number: '04',
        heading: 'Purchase Orders, Minimum Order Quantities (MOQ) & Dispatch',
        content: 'Minimum Order Quantity (MOQ) standardly requires 5 to 20 Master Cartons per order depending on SKU category. Confirmed consignments are staged for dispatch from our nearest regional temperature-controlled hub within 4 to 24 hours of PO confirmation.'
      },
      {
        number: '05',
        heading: 'Commercial Payment Terms, Billing & Credit Facility',
        content: 'Unless a credit line has been formally sanctioned, wholesale consignments operate on 100% advance RTGS/NEFT payment, Immediate Bank Transfer, or pre-approved Cash on Delivery (COD) against authenticated delivery receipt. Verified supermarket partners may apply for 15-day or 30-day revolving credit lines subject to credit clearance.'
      },
      {
        number: '06',
        heading: 'Delivery, Risk of Loss & Inspection Protocol',
        content: 'Risk of loss and physical damage to goods passes to the Buyer upon safe offloading at the Buyer designated receiving dock. Buyer receiving staff must physically inspect external carton seals, pallet integrity, and temperature readings before endorsing the Proof of Delivery (POD).'
      },
      {
        number: '07',
        heading: 'Legal Metrology, Barcode Mandate & Shelf-Life Protocol',
        content: 'All consumer master packs and inner units are strictly compliant with the Legal Metrology (Packaged Commodities) Rules, 2011, featuring genuine manufacturer MRP stamps and GS1 EAN-13 barcodes. Consignments are dispatched with a minimum remaining shelf life of 70% to 85%.'
      },
      {
        number: '08',
        heading: 'Limitation of Liability & Force Majeure',
        content: 'Under no circumstances shall Malabar Prime Distributions be liable for indirect, incidental, or consequential retail profit losses. Aggregate liability is strictly limited to the invoiced net amount paid for the specific affected goods.'
      },
      {
        number: '09',
        heading: 'Governing Law & Legal Jurisdiction',
        content: 'These Terms and wholesale transactions are governed in accordance with the laws of the Republic of India. In the event of any commercial dispute, the civil courts in Kozhikode (Calicut), Kerala, shall hold exclusive jurisdiction.'
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
        content: 'Malabar Prime Distributions respects the privacy and proprietary business information of every supermarket operator, retail buyer, and distributor in our network. This Policy details our operational practices regarding data collected through our digital catalog, RFQ cart, and trade desk.'
      },
      {
        number: '02',
        heading: 'Commercial Information We Collect',
        content: 'We collect registered business names, store addresses, GSTIN & FSSAI licenses, procurement manager contacts, purchase order quantities, quotation histories, and delivery receipts strictly for trade facilitation.'
      },
      {
        number: '03',
        heading: 'Strict Non-Disclosure of Retail Volume & Pricing Data',
        content: 'Your individual store order quantities, turnover, and negotiated volume pricing slabs are NEVER sold, rented, shared, or disclosed to competing supermarkets, retail chains, or third-party marketers.'
      },
      {
        number: '04',
        heading: 'Logistics Data Sharing with Fleet Carriers',
        content: 'Delivery logistics data (receiving dock address, contact name, delivery time window, and invoice challan) is shared only with our internal GPS reefer drivers and contracted dedicated logistics carriers under strict confidentiality agreements.'
      },
      {
        number: '05',
        heading: 'Data Security & Retention Standards',
        content: 'We implement 256-bit SSL encryption in transit, restricted role-based internal admin access, and tamper-evident database storage. Statutory billing ledgers are retained for 7 years as mandated by GST law.'
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
        content: 'Malabar Prime Distributions operates under certified ISO 22000:2018 food safety and HACCP cold-chain protocols. Every consignment undergoes batch inspection, moisture testing, and sealed pallet verification.'
      },
      {
        number: '02',
        heading: '48-Hour Inspection Window & Damage Claim SLA',
        content: 'To claim credit or replacement for damaged, leaking, or defective items, retail receiving staff must record damage on the delivery challan (POD) and submit photo/video evidence to our claims desk within 48 hours of offloading.'
      },
      {
        number: '03',
        heading: 'Cold-Chain & Temperature Excursion Protocol',
        content: 'Any temperature excursion during refrigerated vehicle transit causing chocolate bloom, heat melting, or container puffing will be replaced in full or credited upon driver endorsement and inspection verification.'
      },
      {
        number: '04',
        heading: 'Short Shipments & Carton Discrepancies',
        content: 'In the event of a carton shortage between the E-Way bill invoice and physical pallet counts, a mutually signed Shortage Memo will generate a revised GST Credit Note (CN) within 24 hours or prompt expedited route dispatch.'
      },
      {
        number: '05',
        heading: 'Commercial Credit Note (CN) vs. Direct Bank Refund',
        content: 'Approved wholesale claims are settled primarily via authenticated GST Credit Notes applied to your trade ledger against future purchase orders, or direct RTGS bank refund for closed accounts within 3 to 5 business days.'
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
        content: 'We operate a multi-compartment fleet of 32+ GPS-equipped reefer and container trucks dispatching daily from regional staging hubs: Kozhikode Central Mega Depot (HQ), Kochi Logistics Hub, Kannur Depot, and Wayanad Processing Hub.'
      },
      {
        number: '02',
        heading: 'Store Delivery Turnaround SLA (24 to 48 Hours)',
        content: 'Tier-1 commercial cities receive scheduled replenishment within 24 to 36 hours of PO confirmation. Extended regional routes are fulfilled within 36 to 48 hours on weekly route cadence.'
      },
      {
        number: '03',
        heading: 'Multi-Temperature Reefer Vehicle Integrity',
        content: 'Confectionery and chocolate lines are maintained continuously at 16°C to 20°C with automated humidity control. Ambient dry packs travel on heavy-duty export pallets with real-time GPS telemetry tracking.'
      },
      {
        number: '04',
        heading: 'Store Receiving Dock & Demurrage Terms',
        content: 'Buyers must ensure receiving dock staff are ready during confirmed delivery slots. Vehicle unloading time is standardly capped at 45 minutes for partial and 90 minutes for full-truck consignments.'
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
    description: 'Our complete statutory certifications, legal metrology registrations, FSSAI license parameters, and ISO 22000:2018 quality governance standards.',
    sections: [
      {
        number: '01',
        heading: 'Food Safety and Standards Authority of India (FSSAI)',
        content: 'We operate strictly under valid FSSAI Central/State statutory licensing enforcing inward lot spectrometry, segregated palletized warehousing, periodic pest control, and cold-chain logging.'
      },
      {
        number: '02',
        heading: 'Goods and Services Tax (GST) & E-Way Bill Compliance',
        content: 'Operating under verified GST registration, our billing engine provides 100% input tax credit (ITC) compliance with automated HSN itemization and E-Way bills uploaded directly to the GST portal.'
      },
      {
        number: '03',
        heading: 'Food Safety & Quality Management',
        content: 'Our logistics infrastructure maintains certified food safety and HACCP food hygiene protocols across handling, pallet wrapping, temperature monitoring, and vehicle dispatch.'
      },
      {
        number: '04',
        heading: 'Legal Metrology (Packaged Commodities) Standards',
        content: 'All consumer master cartons and inner packs carry compliant manufacturer MRP stamps, net quantity declarations, customer care details, and GS1 EAN-13 barcodes.'
      }
    ]
  }
};

export const policyController = {
  // GET all policies
  getPolicies: async (req, res) => {
    const db = getDb();
    if (!db.policies || Object.keys(db.policies).length === 0) {
      db.policies = { ...DEFAULT_POLICIES };
      saveDb(db);
    }
    return res.json(200, { success: true, data: db.policies });
  },

  // GET single policy by ID
  getPolicy: async (req, res, id) => {
    const db = getDb();
    const policies = db.policies || DEFAULT_POLICIES;
    const policy = policies[id];
    if (!policy) {
      return res.json(404, { success: false, message: `Policy '${id}' not found` });
    }
    return res.json(200, { success: true, data: policy });
  },

  // PUT update a policy by ID
  updatePolicy: async (req, res, id, body) => {
    const db = getDb();
    if (!db.policies) {
      db.policies = { ...DEFAULT_POLICIES };
    }
    const current = db.policies[id] || { id, title: body.title || id };
    db.policies[id] = {
      ...current,
      ...body,
      id, // enforce id
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      updatedAt: new Date().toISOString()
    };
    saveDb(db);
    return res.json(200, {
      success: true,
      message: `Policy '${id}' updated successfully`,
      data: db.policies[id]
    });
  },

  // POST create a new policy ("other", e.g. vendor agreement, anti-bribery, etc.)
  createPolicy: async (req, res, body) => {
    const db = getDb();
    if (!db.policies) {
      db.policies = { ...DEFAULT_POLICIES };
    }
    const rawId = (body.id || body.shortTitle || body.title || `policy-${Date.now()}`)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const id = rawId || `policy-${Date.now()}`;

    const newPolicy = {
      id,
      title: body.title || 'New Corporate Policy',
      shortTitle: body.shortTitle || body.title || 'Corporate Policy',
      badge: (body.badge || 'STATUTORY POLICY').toUpperCase(),
      effectiveDate: body.effectiveDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      description: body.description || 'Corporate policy governing Malabar Prime commercial operations.',
      sections: Array.isArray(body.sections) && body.sections.length > 0 ? body.sections : [
        {
          number: '01',
          heading: 'Scope & Application',
          content: 'Details and terms of this policy apply to all participating commercial entities and partners.'
        }
      ],
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    db.policies[id] = newPolicy;
    saveDb(db);

    return res.json(201, {
      success: true,
      message: `New policy '${newPolicy.title}' created successfully`,
      data: newPolicy
    });
  },

  // DELETE a custom policy
  deletePolicy: async (req, res, id) => {
    const db = getDb();
    if (!db.policies || !db.policies[id]) {
      return res.json(404, { success: false, message: `Policy '${id}' not found` });
    }
    const policyName = db.policies[id].title;
    delete db.policies[id];
    saveDb(db);
    return res.json(200, {
      success: true,
      message: `Policy '${policyName}' deleted successfully`
    });
  },

  // POST reset policies to default
  resetPolicies: async (req, res) => {
    const db = getDb();
    db.policies = { ...DEFAULT_POLICIES };
    saveDb(db);
    return res.json(200, {
      success: true,
      message: 'All policies have been reset to factory defaults',
      data: db.policies
    });
  }
};
