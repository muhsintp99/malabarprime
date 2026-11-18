export const COMPANY_INFO = {
  name: 'Malabar Prime Distributions',
  tagline: 'Premier FMCG, Grocery & Food Distribution Network',
  subtext: 'Connecting 30+ leading consumer brands with 1,450+ supermarkets, grocery stores, and institutional kitchens across Kerala, Karnataka, and Tamil Nadu.',
  phone: '',
  whatsapp: '',
  email: '',
  salesEmail: '',
  address: '',
  fssaiNumber: '',
  gstNumber: '',
  isoCert: '',
  established: '2012'
};

export const DISTRIBUTION_STATS = [
  { value: '1,450+', label: 'Active Retail Partners', sub: 'Supermarkets, hypermarkets & grocers' },
  { value: '350+', label: 'FMCG & Food SKUs', sub: 'Direct from authorized manufacturers' },
  { value: '45,000', label: 'Sq. Ft. Warehousing', sub: 'Climate controlled & dry storage' },
  { value: '48 Hrs', label: 'Delivery Turnaround', sub: 'Scheduled daily & bi-weekly replenishment' },
  { value: '99.4%', label: 'Order Fulfillment Rate', sub: 'Zero-spill cold chain & dry transit' },
  { value: '32+', label: 'GPS Fleet Vehicles', sub: 'Multi-temperature reefer & container trucks' }
];

export const WAREHOUSE_HUBS = [
  {
    id: 'wh-kozhikode',
    name: 'Kozhikode Central Mega Depot (HQ)',
    city: 'Kozhikode, Kerala',
    capacity: '22,000 Sq. Ft.',
    features: ['Multi-tier dry pallet racking', 'Automated inventory WMS', 'Direct NH-66 highway access'],
    coverage: 'Kozhikode, Malappuram, Wayanad',
    dispatchTime: 'Same-Day / Next-Day Delivery'
  },
  {
    id: 'wh-kochi',
    name: 'Kochi Reefer & Cold Chain Depot',
    city: 'Aluva, Ernakulam, Kerala',
    capacity: '12,000 Sq. Ft.',
    features: ['-18°C to +4°C cold rooms', 'Temperature logging telemetry', 'FMCG Modern Trade cross-dock'],
    coverage: 'Ernakulam, Thrissur, Kottayam, Alappuzha',
    dispatchTime: '24-Hour Express Fulfillment'
  },
  {
    id: 'wh-kannur',
    name: 'Kannur Northern Regional Hub',
    city: 'Kannur, Kerala',
    capacity: '8,000 Sq. Ft.',
    features: ['Fast-moving consumer goods transit', 'Dedicated spice & grain quarantine', 'Local fleet depot'],
    coverage: 'Kannur, Kasaragod, Coorg border',
    dispatchTime: 'Scheduled Alternate-Day Delivery'
  },
  {
    id: 'wh-coimbatore',
    name: 'Coimbatore Interstate Transit Hub',
    city: 'Coimbatore, Tamil Nadu',
    capacity: '9,500 Sq. Ft.',
    features: ['Interstate manufacturer receiving', 'Pallet consolidation hub', 'Bulk freight handling'],
    coverage: 'Palakkad, Coimbatore, Tirupur, Nilgiris',
    dispatchTime: 'Next-Day Interstate Cross-Dock'
  }
];

export const PARTNER_BRANDS = [
  { name: 'Malabar Prime Heritage', type: 'Signature Brand', tier: 'Exclusive Master Distributor' },
  { name: 'Royal Malabar Harvest', type: 'Rice & Grains', tier: 'Authorized Regional Distributor' },
  { name: 'Malabar PureGold Oils', type: 'Oils & Ghee', tier: 'Exclusive C&F Agent' },
  { name: 'Calicut Heritage Snacks', type: 'Packaged Foods', tier: 'Sole Distribution Partner' },
  { name: 'Nilgiri Tea & Coffee Estates', type: 'Beverages', tier: 'Authorized Wholesale Partner' },
  { name: 'Amma Malabar Pickles', type: 'Condiments', tier: 'Exclusive Regional Partner' }
];

export const LOGISTICS_WORKFLOW = [
  {
    step: '01',
    title: 'Order Placement & RFQ',
    desc: 'Retailers and wholesalers submit purchase orders via our portal, WhatsApp B2B channel, or through assigned field sales reps.'
  },
  {
    step: '02',
    title: 'WMS Batching & Pick-Pack',
    desc: 'Warehouse Management System automatically creates pick waves, inspects batch expiration/FSSAI dates, and wraps pallets.'
  },
  {
    step: '03',
    title: 'Cold-Chain & Reefer Loading',
    desc: 'Products are loaded onto GPS-tracked multi-temperature reefer or dry container vehicles with electronic seals.'
  },
  {
    step: '04',
    title: 'Store-Door Delivery & Invoicing',
    desc: 'Fulfillment within 24-48 hours with digital delivery Challan, GST invoice, and direct stock unloading at your retail store.'
  }
];

export const CERTIFICATIONS = [];

export const FAQS = [
  {
    q: 'What is the Minimum Order Quantity (MOQ) for wholesale delivery?',
    a: 'MOQs vary by SKU category (typically 3 to 10 master cartons per line item). For combined store delivery, our minimum consolidated delivery order value is ₹15,000 within primary delivery zones.'
  },
  {
    q: 'How fast can our supermarket or retail outlet receive stock?',
    a: 'Orders placed before 2:00 PM are processed and dispatched for Next-Day delivery across Kozhikode, Malappuram, and Ernakulam hubs. Regional routes are served on scheduled 48-hour delivery cycles.'
  },
  {
    q: 'Do you offer credit terms for registered retailers and supermarkets?',
    a: 'Yes. After an initial 3 cash/advance orders and completion of our partner credit verification (GST, trade references, and PDCs), we offer flexible 14 to 30 days credit terms.'
  },
  {
    q: 'Can we request customized samples or private label supply?',
    a: 'Yes, for institutional Horeca chains, export houses, and supermarket house brands, we provide sample packs and custom packaging configurations upon request.'
  }
];

