export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'chocolates', name: 'Chocolates', icon: 'Package' },
  { id: 'soft-drinks', name: 'Soft Drinks', icon: 'Droplet' },
  { id: 'juices', name: 'Juices', icon: 'Droplet' },
  { id: 'snacks', name: 'Snacks', icon: 'Package' },
  { id: 'bottled-water', name: 'Bottled Water', icon: 'Droplet' },
  { id: 'energy-drinks', name: 'Energy Drinks', icon: 'Flame' },
  { id: 'spices', name: 'Spices & Seasonings', icon: 'Flame' },
  { id: 'staples', name: 'Grains & Rice', icon: 'Wheat' },
  { id: 'oils', name: 'Cooking Oils & Ghee', icon: 'Droplet' }
];

export const PRODUCTS = [
  {
    id: 'mp-spc-01',
    name: 'Malabar Prime Royal Tellicherry Black Pepper (Garbled)',
    category: 'spices',
    brand: 'Malabar Prime Heritage',
    sku: 'MP-TGSE-500',
    packSize: '24 x 500g Pouches',
    netWeight: '12 kg / Master Carton',
    moq: '5 Master Cartons (120 units)',
    wholesaleRange: '₹380 - ₹410 / pack (Wholesale Tier)',
    shelfLife: '24 Months',
    origin: 'Wayanad, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    description: 'Directly sourced Extra Bold (TGSEB grade) garbled black pepper from the misty hills of Wayanad. Naturally sun-dried, sorted for maximum piperine content, and nitrogen flushed for aromatic preservation.',
    specifications: {
      moisture: 'Max 11.5%',
      piperine: 'Min 5.5%',
      bulkDensity: '580 g/L',
      storage: 'Cool, dry & ventilated ambient storage',
      palletConfig: '40 cartons / pallet (480 kg gross)'
    },
    tierDiscounts: [
      { range: '5 - 19 Cartons', discount: 'Standard Wholesale Rate' },
      { range: '20 - 49 Cartons', discount: '4.5% Volume Rebate' },
      { range: '50+ Cartons', discount: '8% Distributor Contract Rate' }
    ]
  },
  {
    id: 'mp-spc-02',
    name: 'Wayanad Grade-A Green Cardamom (8mm+ Jumbo Pods)',
    category: 'spices',
    brand: 'Malabar Prime Heritage',
    sku: 'MP-CRD-250',
    packSize: '40 x 250g Vacuum Sealed Jars',
    netWeight: '10 kg / Master Carton',
    moq: '3 Master Cartons (120 jars)',
    wholesaleRange: '₹620 - ₹660 / jar',
    shelfLife: '18 Months',
    origin: 'Idukki / Wayanad, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Export Quality',
    image: 'https://images.unsplash.com/photo-1608797178974-15b35a61dd78?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-picked 8mm+ emerald green cardamom pods with intense essential oil fragrance and rich seed count. Vacuum packed in food-grade Pet jars to retain green color and volatile aromatic oils.',
    specifications: {
      podSize: '8mm to 8.5mm Jumbo',
      volatileOil: 'Min 8.0%',
      moisture: 'Max 10%',
      storage: 'Dark, cool warehouse (under 24°C)',
      palletConfig: '48 cartons / pallet'
    },
    tierDiscounts: [
      { range: '3 - 9 Cartons', discount: 'Base Wholesale' },
      { range: '10 - 24 Cartons', discount: '5% Dealer Rebate' },
      { range: '25+ Cartons', discount: 'Special Horeca / Supermarket Slab' }
    ]
  },
  {
    id: 'mp-spc-03',
    name: 'Alleppey Finger Turmeric Powder (5% High Curcumin)',
    category: 'spices',
    brand: 'Malabar Spices Co.',
    sku: 'MP-TRM-1000',
    packSize: '20 x 1kg Zip-lock Kraft Pouches',
    netWeight: '20 kg / Master Carton',
    moq: '5 Master Cartons (100 kg)',
    wholesaleRange: '₹145 - ₹165 / kg',
    shelfLife: '24 Months',
    origin: 'Alappuzha, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'High Curcumin',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    description: 'Vibrant golden turmeric ground from Alleppey whole finger rhizomes renowned worldwide for high natural curcumin (minimum 5.0%). Free from artificial additives, starch, and lead chromate.',
    specifications: {
      curcumin: '5.2% Certified',
      meshSize: '80 Mesh Fine Grind',
      ashContent: 'Max 6.8%',
      storage: 'Ambient dry storage, keep away from direct sunlight',
      palletConfig: '36 cartons / pallet'
    },
    tierDiscounts: [
      { range: '5 - 15 Cartons', discount: 'Regular Wholesale' },
      { range: '16 - 35 Cartons', discount: '6% Wholesale Rebate' },
      { range: '36+ Cartons (Pallet)', discount: '10% Tier-1 Distributor' }
    ]
  },
  {
    id: 'mp-stp-01',
    name: 'Malabar Biryani Kaima / Jeerakasala Rice (Aged 18 Months)',
    category: 'staples',
    brand: 'Royal Malabar Harvest',
    sku: 'MP-KMA-10KG',
    packSize: '3 x 10kg Poly-Woven Bag with Handle',
    netWeight: '30 kg / Outer Bundle',
    moq: '10 Bundles (300 kg)',
    wholesaleRange: '₹1,020 - ₹1,120 / 10kg bag',
    shelfLife: '24 Months',
    origin: 'Wayanad Valley / Nilgiris',
    fssai: '11322001000845',
    stockStatus: 'High Demand',
    badge: 'Signature Grain',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    description: 'The royal short-grain aromatic rice indispensable for authentic Malabar Dum Biryani. Naturally aged for 18 months for non-sticky, fluffy texture with delicate aroma that absorbs ghee and rich gravies.',
    specifications: {
      grainLength: 'Short Aromatic (3.8 - 4.2mm)',
      brokenGrain: 'Max 2%',
      aging: '18 Months Naturally Cured',
      storage: 'Palletized, moisture-free warehouse',
      palletConfig: '25 bundles (750 kg) / pallet'
    },
    tierDiscounts: [
      { range: '10 - 29 Bundles', discount: 'Wholesale Standard' },
      { range: '30 - 74 Bundles', discount: '5% Horeca & Bulk Partner' },
      { range: '75+ Bundles (3 Pallets)', discount: 'Contract Bulk Rate' }
    ]
  },
  {
    id: 'mp-stp-02',
    name: 'Traditional Palakkadan Matta Rice (Double Boiled Long Grain)',
    category: 'staples',
    brand: 'Royal Malabar Harvest',
    sku: 'MP-MTA-25KG',
    packSize: '1 x 25kg Heavy Duty BOPP Bag',
    netWeight: '25 kg / Bag',
    moq: '20 Bags (500 kg)',
    wholesaleRange: '₹1,320 - ₹1,420 / 25kg bag',
    shelfLife: '12 Months',
    origin: 'Palakkad, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Daily Essential',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
    description: 'Nutritious red-pericarp Matta rice parboiled using indigenous methods to seal nutrients inside the kernel. Rich in dietary fiber, low glycemic index, and authentic earthen taste.',
    specifications: {
      type: 'Long Grain Double Boiled Red Matta',
      branRetained: 'Semi-polished (Nutrient Dense)',
      moisture: 'Max 12%',
      storage: 'Dry grain storage facility',
      palletConfig: '40 bags (1000 kg metric ton) / pallet'
    },
    tierDiscounts: [
      { range: '20 - 49 Bags', discount: 'Wholesale Base' },
      { range: '50 - 99 Bags', discount: '4% Volume Discount' },
      { range: '100+ Bags (Truckload fraction)', discount: '8% Superstockist Rate' }
    ]
  },
  {
    id: 'mp-oil-01',
    name: 'Cold-Pressed Virgin Coconut Oil (Centrifuge Cold Extracted)',
    category: 'oils',
    brand: 'Malabar PureGold',
    sku: 'MP-VCO-1000',
    packSize: '12 x 1 Litre Glass & Food-Grade Pet Bottles',
    netWeight: '11.5 kg / Master Carton',
    moq: '5 Master Cartons (60 Litres)',
    wholesaleRange: '₹340 - ₹385 / Litre',
    shelfLife: '18 Months',
    origin: 'Calicut Coconut Belt, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: '100% Pure Virgin',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    description: 'Cold extracted from fresh mature Malabar coconut milk within 4 hours of cracking without heat or chemical refining. Water-clear purity, delicate natural coconut aroma, zero cholesterol.',
    specifications: {
      freeFattyAcids: 'Max 0.1%',
      lauricAcid: 'Min 51.5%',
      processing: 'Cold centrifuge extraction (No Heat)',
      storage: 'Ambient cool temperature (solidifies < 24°C)',
      palletConfig: '50 cartons / pallet'
    },
    tierDiscounts: [
      { range: '5 - 19 Cartons', discount: 'Standard Wholesale' },
      { range: '20 - 49 Cartons', discount: '5.5% Retailer Incentive' },
      { range: '50+ Cartons', discount: '9% Supermarket Chain Slab' }
    ]
  },
  {
    id: 'mp-oil-02',
    name: 'Traditional Vedic Bilona A2 Desi Cow Ghee (Golden Granular)',
    category: 'oils',
    brand: 'Malabar PureGold',
    sku: 'MP-GHEE-500',
    packSize: '24 x 500ml Hexagonal Glass Jars',
    netWeight: '13.2 kg / Master Carton',
    moq: '4 Master Cartons (96 jars)',
    wholesaleRange: '₹470 - ₹520 / 500ml jar',
    shelfLife: '12 Months',
    origin: 'Malabar Dairy Cooperative Hub',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'A2 Vedic Bilona',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted cultured ghee prepared by traditional Bilona churning from curd of grass-fed indigenous cows. Rich golden granular (danedar) texture and deeply soothing authentic aroma.',
    specifications: {
      texture: 'Golden Granular Danedar',
      moisture: 'Max 0.25%',
      rmValue: 'Min 28.0',
      storage: 'Room temperature away from moisture',
      palletConfig: '40 cartons / pallet'
    },
    tierDiscounts: [
      { range: '4 - 15 Cartons', discount: 'Standard Wholesale' },
      { range: '16 - 35 Cartons', discount: '5% Partner Rebate' },
      { range: '36+ Cartons', discount: '8.5% Prime Partner Rate' }
    ]
  },
  {
    id: 'mp-pck-01',
    name: 'Malabar Crispy Yellow Banana Chips in Pure Coconut Oil',
    category: 'packaged',
    brand: 'Calicut Heritage Snacks',
    sku: 'MP-BCH-200',
    packSize: '50 x 200g Nitrogen Flushed Foil Pouches',
    netWeight: '10 kg / Master Carton',
    moq: '6 Master Cartons (300 pouches)',
    wholesaleRange: '₹72 - ₹85 / pouch',
    shelfLife: '6 Months',
    origin: 'Kozhikode, Kerala',
    fssai: '11322001000845',
    stockStatus: 'High Demand',
    badge: 'Fast Moving FMCG',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
    description: 'Wafer-thin Nendran raw plantains fried to golden crunch in 100% pure cold-pressed coconut oil, sprinkled with sea salt and subtle turmeric. Top retail shelf performer across supermarkets.',
    specifications: {
      oilType: '100% Pure Coconut Oil (Zero Palm Oil)',
      packaging: '3-layer metallized nitrogen barrier pouch',
      moisture: 'Under 2%',
      storage: 'Dry ambient retail storage',
      palletConfig: '35 cartons / pallet'
    },
    tierDiscounts: [
      { range: '6 - 20 Cartons', discount: 'Base FMCG Wholesale' },
      { range: '21 - 50 Cartons', discount: '6% Supermarket Margin Boost' },
      { range: '51+ Cartons', discount: '10% Regional Superstockist' }
    ]
  },
  {
    id: 'mp-pck-02',
    name: 'Kerala Spicy Jackfruit Chips (Chakka Varuthathu)',
    category: 'packaged',
    brand: 'Calicut Heritage Snacks',
    sku: 'MP-JCK-200',
    packSize: '40 x 200g Foil Pouches',
    netWeight: '8 kg / Master Carton',
    moq: '5 Master Cartons (200 pouches)',
    wholesaleRange: '₹88 - ₹98 / pouch',
    shelfLife: '6 Months',
    origin: 'Kozhikode, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Authentic Specialty',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp hand-cut firm raw jackfruit slices tossed in pure coconut oil and dusted with spicy Malabar red chilli and rock salt. Unique premium snack for gourmet grocers and department stores.',
    specifications: {
      baseFruit: 'Wayanad Raw Varikka Jackfruit',
      packaging: 'Moisture-proof nitrogen pack',
      shelfLifeDays: '180 Days',
      storage: 'Ambient dry storage',
      palletConfig: '40 cartons / pallet'
    },
    tierDiscounts: [
      { range: '5 - 15 Cartons', discount: 'Standard Wholesale' },
      { range: '16 - 35 Cartons', discount: '5% Retailer Margin' },
      { range: '36+ Cartons', discount: '8% Distributor Margin' }
    ]
  },
  {
    id: 'mp-bev-01',
    name: 'Wayanad High-Grown CTC Dust Tea (Strong Red Infusion)',
    category: 'beverages',
    brand: 'Nilgiri & Wayanad Estates',
    sku: 'MP-TEA-500',
    packSize: '30 x 500g Moisture Barrier Bags',
    netWeight: '15 kg / Master Carton',
    moq: '4 Master Cartons (120 units)',
    wholesaleRange: '₹140 - ₹165 / 500g unit',
    shelfLife: '18 Months',
    origin: 'Meppadi Hills, Wayanad',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Hotel & Chai Favourite',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    description: 'Strong, brisk, deep-amber infusion CTC dust tea blended specially for South Indian chai stalls, bakeries, hotels, and everyday household consumption. Fast dissolution and rich body.',
    specifications: {
      grade: 'CTC Super Red Dust (SRD)',
      infusionTime: 'Instant brisk color within 90 seconds',
      caffeine: 'Natural approx 3.2%',
      storage: 'Dry odor-free tea warehouse',
      palletConfig: '36 cartons / pallet'
    },
    tierDiscounts: [
      { range: '4 - 14 Cartons', discount: 'Standard Wholesale' },
      { range: '15 - 39 Cartons', discount: '6% Horeca Wholesale' },
      { range: '40+ Cartons', discount: '11% Institutional Deal' }
    ]
  },
  {
    id: 'mp-bev-02',
    name: 'Malabar Roasted Robusta & Arabica Coffee Powder (80:20 Chicory)',
    category: 'beverages',
    brand: 'Nilgiri & Wayanad Estates',
    sku: 'MP-COF-500',
    packSize: '24 x 500g Aroma-Lock Valve Pouches',
    netWeight: '12 kg / Master Carton',
    moq: '4 Master Cartons (96 packs)',
    wholesaleRange: '₹195 - ₹225 / 500g pack',
    shelfLife: '12 Months',
    origin: 'Wayanad & Coorg Estates',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Filter Coffee Blend',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    description: 'Slow-roasted shade-grown Wayanad Robusta and Arabica beans blended with 20% premium French chicory for the thick decoction essential to traditional South Indian filter coffee.',
    specifications: {
      blendRatio: '80% Plantation Coffee, 20% Roasted Chicory',
      grindProfile: 'Fine Filter Coffee Decoction Grind',
      packaging: 'Degassing one-way valve aluminum pouch',
      storage: 'Cool ambient shelf',
      palletConfig: '40 cartons / pallet'
    },
    tierDiscounts: [
      { range: '4 - 15 Cartons', discount: 'Standard Wholesale' },
      { range: '16 - 35 Cartons', discount: '5.5% Cafe & Retailer Slab' },
      { range: '36+ Cartons', discount: '9% Wholesale Contract' }
    ]
  },
  {
    id: 'mp-dry-01',
    name: 'W-240 Premium Whole Cashew Nuts (Export Grade)',
    category: 'dryfruits',
    brand: 'Malabar Prime Harvest',
    sku: 'MP-CSH-1000',
    packSize: '10 x 1kg Nitrogen Flushed Standup Pouches',
    netWeight: '10 kg / Master Carton (Tins also available)',
    moq: '5 Master Cartons (50 kg)',
    wholesaleRange: '₹740 - ₹810 / kg',
    shelfLife: '12 Months',
    origin: 'Kollam & Kannur Cashew Hubs',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Grade W-240 Jumbo',
    image: 'https://images.unsplash.com/photo-1536591375315-1b8368903277?auto=format&fit=crop&w=800&q=80',
    description: 'Evenly roasted or raw creamy whole cashews graded at 240 kernels per pound. Perfectly white whole kernels with buttery sweetness, ideal for premium dry fruit retailers and bakeries.',
    specifications: {
      grade: 'W-240 (220 to 240 kernels/lb)',
      brokenTolerance: 'Less than 1.5%',
      moisture: 'Max 4.5%',
      storage: 'Climate-controlled warehouse (18°C-22°C)',
      palletConfig: '45 cartons / pallet'
    },
    tierDiscounts: [
      { range: '5 - 15 Cartons', discount: 'Standard Dry Fruit Wholesale' },
      { range: '16 - 39 Cartons', discount: '4.5% Sweet/Bakery Slab' },
      { range: '40+ Cartons', discount: '7% Master Wholesaler Slab' }
    ]
  },
  {
    id: 'mp-sau-01',
    name: 'Malabar Traditional Tender Mango Pickle in Gingelly Oil',
    category: 'sauces',
    brand: 'Amma Malabar Pickles',
    sku: 'MP-PCK-MNG-1KG',
    packSize: '12 x 1kg Food Grade Sealed Buckets / Jars',
    netWeight: '12 kg / Master Carton',
    moq: '6 Master Cartons (72 jars)',
    wholesaleRange: '₹165 - ₹190 / 1kg jar',
    shelfLife: '18 Months',
    origin: 'Palakkad & Kozhikode',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Kerala Tradition',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    description: 'Whole baby mangoes cured in brine, marinated with freshly roasted mustard, fenugreek, fiery chilli powder, and tempered in pure cold-pressed gingelly (sesame) oil.',
    specifications: {
      curingMethod: 'Natural stone crock aging',
      oilBase: 'Cold-pressed gingelly oil',
      acidity: 'Natural citrus & brine cured',
      storage: 'Ambient dry storage',
      palletConfig: '40 cartons / pallet'
    },
    tierDiscounts: [
      { range: '6 - 20 Cartons', discount: 'Base Wholesale' },
      { range: '21 - 45 Cartons', discount: '6% Supermarket Margin' },
      { range: '46+ Cartons', discount: '9.5% Master Stockist' }
    ]
  },
  {
    id: 'mp-sau-02',
    name: 'Hot & Spicy Malabar Fish Curry Paste / Masala Base',
    category: 'sauces',
    brand: 'Amma Malabar Pickles',
    sku: 'MP-CUR-FSH-300',
    packSize: '36 x 300g Ready Gravy Retort Pouches',
    netWeight: '10.8 kg / Master Carton',
    moq: '5 Master Cartons (180 pouches)',
    wholesaleRange: '₹75 - ₹88 / pouch',
    shelfLife: '12 Months (Ambient Retort)',
    origin: 'Kozhikode, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Ready Cook',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic Kudampuli (Malabar Kokum/Tamarind), Kashmiri chilli, ginger, garlic, and shallot gravy base. Zero preservatives required thanks to advanced retort sterilization pouch technology.',
    specifications: {
      technology: 'Retort packaging (room temperature stable)',
      keyIngredients: 'Kudampuli, Shallots, Kashmiri Mirch, Curry Leaves',
      storage: 'No refrigeration needed before opening',
      palletConfig: '48 cartons / pallet'
    },
    tierDiscounts: [
      { range: '5 - 19 Cartons', discount: 'Standard Wholesale' },
      { range: '20 - 40 Cartons', discount: '5% Modern Trade Incentive' },
      { range: '41+ Cartons', discount: '8.5% Volume Tier' }
    ]
  },
  {
    id: 'mp-chk-01',
    name: 'Malabar Prime Artisan Dark Chocolate Bars (70% Single Origin)',
    category: 'chocolates',
    brand: 'Malabar Prime Confectionery',
    sku: 'MP-CHK-70-100',
    packSize: '48 x 100g Retail Display Box',
    netWeight: '4.8 kg / Master Carton',
    moq: '4 Master Cartons (192 bars)',
    wholesaleRange: '₹85 - ₹98 / bar (MRP ₹140)',
    shelfLife: '12 Months',
    origin: 'Idukki Cocoa Estates, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Premium Single Origin',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted with fermented Idukki cocoa beans, pure cocoa butter, and raw demerara sugar. Velvety mouthfeel with subtle notes of tropical fruit and caramel. Perfect for premium supermarkets and duty-free retail.',
    specifications: {
      cocoaSolids: '70% Min',
      cocoaButter: 'Pure unadulterated',
      storage: 'Climate-controlled 16-18°C',
      palletConfig: '60 cartons / pallet'
    },
    tierDiscounts: [
      { range: '4 - 15 Boxes', discount: 'Standard Wholesale Slab' },
      { range: '16 - 40 Boxes', discount: '5.5% Supermarket Margin' },
      { range: '41+ Boxes', discount: '9% Master Distributor Rate' }
    ]
  },
  {
    id: 'mp-chk-02',
    name: 'Roasted Almond & Sea Salt Milk Chocolate Couverture Pouch',
    category: 'chocolates',
    brand: 'Malabar Prime Confectionery',
    sku: 'MP-CHK-ALM-150',
    packSize: '36 x 150g Standup Zip Pouches',
    netWeight: '5.4 kg / Master Carton',
    moq: '5 Master Cartons (180 pouches)',
    wholesaleRange: '₹110 - ₹125 / pouch (MRP ₹180)',
    shelfLife: '12 Months',
    origin: 'Coimbatore & Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Fast Mover',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
    description: 'California roasted whole almonds drenched in rich 45% Swiss-style milk chocolate with a hint of artisanal sea salt flakes. High impulse checkout sales driver.',
    specifications: {
      nutContent: '22% Whole Roasted Almonds',
      storage: '18-20°C ambient cold storage',
      palletConfig: '54 cartons / pallet'
    },
    tierDiscounts: [
      { range: '5 - 20 Cartons', discount: 'Standard B2B Tier' },
      { range: '21+ Cartons', discount: '7% Volume Rebate' }
    ]
  },
  {
    id: 'mp-drk-01',
    name: 'Malabar Royal Sparkling Jeera Soda & Ginger Fizz',
    category: 'soft-drinks',
    brand: 'Malabar Beverages Co.',
    sku: 'MP-SOD-JRA-300',
    packSize: '24 x 300ml Slim Aluminum Cans',
    netWeight: '7.8 kg / Shrink Pack',
    moq: '10 Shrink Packs (240 cans)',
    wholesaleRange: '₹22 - ₹25 / can (MRP ₹40)',
    shelfLife: '9 Months',
    origin: 'Kochi, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Summer Bestseller',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic digestive soda infused with roasted cumin extracts, dry ginger, rock salt, and crisp carbonation. Traditional South Indian refreshing soda with premium modern packaging.',
    specifications: {
      carbonation: '3.8 Volumes CO2',
      packaging: '100% Recyclable sleek cans',
      storage: 'Ambient dry storage, serve chilled',
      palletConfig: '80 trays / pallet'
    },
    tierDiscounts: [
      { range: '10 - 49 Trays', discount: 'Base Modern Trade Slab' },
      { range: '50 - 150 Trays', discount: '6% Wholesale Bulk Slab' },
      { range: '150+ Trays', discount: '10% Regional Depot Rate' }
    ]
  },
  {
    id: 'mp-drk-02',
    name: 'Citrus Sparkle Natural Lemon & Mint Club Soda',
    category: 'soft-drinks',
    brand: 'Malabar Beverages Co.',
    sku: 'MP-SOD-LMN-330',
    packSize: '24 x 330ml Glass Bottles (Crowned)',
    netWeight: '13.5 kg / Plastic Crate',
    moq: '8 Crates (192 bottles)',
    wholesaleRange: '₹24 - ₹28 / bottle',
    shelfLife: '12 Months',
    origin: 'Aluva, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'HORECA Favorite',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp, extra-effervescent club soda infused with real lemon zest distillate and garden mint. Highly sought after by luxury hotels, cocktail bars, and premium supermarkets.',
    specifications: {
      fizzLevel: 'High effervescence',
      sugarContent: 'Zero Calorie / Sugar-Free',
      palletConfig: '40 crates / pallet'
    },
    tierDiscounts: [
      { range: '8 - 25 Crates', discount: 'Standard B2B Rate' },
      { range: '26+ Crates', discount: '7% Direct Depot Rebate' }
    ]
  },
  {
    id: 'mp-juc-01',
    name: 'Sun-Ripened Alphonso Mango & Passion Fruit Nectar',
    category: 'juices',
    brand: 'Tropic Prime Harvest',
    sku: 'MP-JUC-MNG-250',
    packSize: '24 x 250ml Glass Bottles',
    netWeight: '9.2 kg / Tray',
    moq: '6 Trays (144 bottles)',
    wholesaleRange: '₹32 - ₹36 / bottle (MRP ₹55)',
    shelfLife: '9 Months',
    origin: 'Ratnagiri & Kerala Sourcing',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: '100% Real Pulp',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    description: 'Thick, aromatic nectar pressed from authentic Alphonso mango puree blended with tangy Kerala passion fruit. Zero artificial colors, cold-sterilized for peak vitamin preservation.',
    specifications: {
      fruitPulp: '35% Minimum Fruit Content',
      brix: '14° Brix Natural sweetness',
      palletConfig: '72 trays / pallet'
    },
    tierDiscounts: [
      { range: '6 - 25 Trays', discount: 'Supermarket Wholesale' },
      { range: '26 - 60 Trays', discount: '5% Modern Trade Incentive' },
      { range: '61+ Trays', discount: '8.5% Stockist Rebate' }
    ]
  },
  {
    id: 'mp-juc-02',
    name: 'Wayanad Queen Pineapple Cold-Pressed Pure Juice',
    category: 'juices',
    brand: 'Tropic Prime Harvest',
    sku: 'MP-JUC-PIN-1000',
    packSize: '12 x 1 Litre Tetra Pak Cartons',
    netWeight: '12.6 kg / Master Carton',
    moq: '8 Cartons (96 litres)',
    wholesaleRange: '₹88 - ₹98 / litre (MRP ₹145)',
    shelfLife: '9 Months (Aseptic Tetra Pak)',
    origin: 'Vazhakulam & Wayanad, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'GI Tag Sourced',
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80',
    description: 'Pressed from famous GI-tagged Vazhakulam Queen Pineapples known for royal aroma and natural sweetness. Packaged in 6-layer aseptic cartons with screw cap.',
    specifications: {
      juiceContent: '100% Not-From-Concentrate (NFC)',
      addedSugar: '0% Added Sugar',
      palletConfig: '50 cartons / pallet'
    },
    tierDiscounts: [
      { range: '8 - 24 Cartons', discount: 'Regular Wholesale' },
      { range: '25+ Cartons', discount: '7% Volume Margin' }
    ]
  },
  {
    id: 'mp-snk-01',
    name: 'Traditional Malabar Nendran Banana Chips (Cold-Pressed Coconut Oil)',
    category: 'snacks',
    brand: 'Malabar Prime Crisps',
    sku: 'MP-SNK-BCH-200',
    packSize: '40 x 200g Nitrogen Flushed Foil Pouches',
    netWeight: '8.0 kg / Master Carton',
    moq: '5 Master Cartons (200 pouches)',
    wholesaleRange: '₹62 - ₹70 / pouch (MRP ₹110)',
    shelfLife: '6 Months',
    origin: 'Kozhikode & Thrissur, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Kerala Gold Standard',
    image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=800&q=80',
    description: 'Thinly sliced A-grade Nendran plantains fried exclusively in 100% pure cold-pressed coconut oil with mountain sea salt. Extra crunchy, non-greasy, nitrogen flushed for zero rancidity.',
    specifications: {
      oilUsed: '100% Pure Coconut Oil (Zero palm oil)',
      saltLevel: '1.2% Sea Salt',
      packaging: '3-ply metallic barrier pouch',
      palletConfig: '40 cartons / pallet'
    },
    tierDiscounts: [
      { range: '5 - 19 Cartons', discount: 'Base Modern Trade Tier' },
      { range: '20 - 49 Cartons', discount: '6% Supermarket Margin' },
      { range: '50+ Cartons', discount: '10% Distributor Wholesale Slab' }
    ]
  },
  {
    id: 'mp-snk-02',
    name: 'Roasted & Salted Jumbo Mangalore Cashew Kernels (W240)',
    category: 'snacks',
    brand: 'Malabar Prime Crisps',
    sku: 'MP-SNK-CSH-250',
    packSize: '24 x 250g Zip Standup Pouches',
    netWeight: '6.0 kg / Master Carton',
    moq: '4 Master Cartons (96 pouches)',
    wholesaleRange: '₹220 - ₹245 / pouch',
    shelfLife: '9 Months',
    origin: 'Mangalore & Kasaragod',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Jumbo W240 Grade',
    image: 'https://images.unsplash.com/photo-1536591375315-1b8368903277?auto=format&fit=crop&w=800&q=80',
    description: 'Evenly roasted jumbo W240 grade whole cashew nuts dusted with crushed Himalayan pink salt. Vacuum flushed with food grade nitrogen for year-round crunchiness.',
    specifications: {
      grade: 'W240 Whole Jumbo Kernels',
      roastProfile: 'Slow dry roasted (oil-free)',
      palletConfig: '60 cartons / pallet'
    },
    tierDiscounts: [
      { range: '4 - 15 Cartons', discount: 'Standard Wholesale' },
      { range: '16+ Cartons', discount: '6.5% Volume Margin' }
    ]
  },
  {
    id: 'mp-wtr-01',
    name: 'Malabar Mist Natural Mountain Spring Water (BPA-Free)',
    category: 'bottled-water',
    brand: 'Malabar Springs',
    sku: 'MP-WTR-500-24',
    packSize: '24 x 500ml Ergonomic PET Bottles',
    netWeight: '12.5 kg / Shrink Pack',
    moq: '15 Shrink Packs (360 bottles)',
    wholesaleRange: '₹9.50 - ₹11.50 / bottle (MRP ₹20)',
    shelfLife: '12 Months',
    origin: 'Wayanad Natural Spring Reserves',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'High Turnover',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: 'Sourced from protected subterranean aquifer springs in the Western Ghats. Multi-stage microfiltered, UV treated, and ozonated while retaining natural electrolytes and balanced minerals.',
    specifications: {
      tds: '120 - 160 ppm natural minerals',
      phLevel: 'Balanced 7.2 pH',
      bottleType: 'Recyclable food-grade PET (BPA-Free)',
      palletConfig: '64 packs / pallet'
    },
    tierDiscounts: [
      { range: '15 - 49 Packs', discount: 'Base Wholesale Slab' },
      { range: '50 - 150 Packs', discount: '8% High-Volume Grocery Slab' },
      { range: '151+ Packs', discount: '14% Full Truckload Depot Rate' }
    ]
  },
  {
    id: 'mp-wtr-02',
    name: 'Malabar Prime Alkaline pH 8.5+ Artesian Spring Water',
    category: 'bottled-water',
    brand: 'Malabar Springs',
    sku: 'MP-WTR-ALK-750',
    packSize: '12 x 750ml Premium Glass/Clear Fluted Bottles',
    netWeight: '9.8 kg / Carton Box',
    moq: '8 Cartons (96 bottles)',
    wholesaleRange: '₹38 - ₹45 / bottle (MRP ₹75)',
    shelfLife: '24 Months',
    origin: 'Idukki Highland Aquifers',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Alkaline pH 8.5+',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
    description: 'Naturally alkaline mineral water with natural electrolytes (Calcium, Magnesium, Potassium). Enhanced cellular hydration preferred by premium gyms, organic stores, and 5-star hospitality chains.',
    specifications: {
      phLevel: 'Naturally 8.5+ Alkaline',
      electrolytes: 'Calcium, Potassium, Silica, Magnesium',
      palletConfig: '60 cartons / pallet'
    },
    tierDiscounts: [
      { range: '8 - 24 Cartons', discount: 'Standard Wholesale Rate' },
      { range: '25+ Cartons', discount: '7% Hospitality & Modern Trade Rebate' }
    ]
  },
  {
    id: 'mp-eng-01',
    name: 'Volt Prime High-Performance Energy Drink (Taurine & B-Complex)',
    category: 'energy-drinks',
    brand: 'Volt Prime Energy',
    sku: 'MP-ENG-VLT-250',
    packSize: '24 x 250ml Matte Black Slim Cans',
    netWeight: '6.8 kg / Tray',
    moq: '6 Trays (144 cans)',
    wholesaleRange: '₹55 - ₹62 / can (MRP ₹110)',
    shelfLife: '18 Months',
    origin: 'Kochi Bottling Plant, Kerala',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'High Profit Margin',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    description: 'Carbonated functional energy drink formulated with natural caffeine from green coffee beans, taurine, inositol, and Vitamin B-complex. Delivers sustained alertness with zero crash.',
    specifications: {
      caffeine: '32 mg / 100ml regulated safe ceiling',
      vitamins: 'B3, B5, B6, B12 fortified',
      palletConfig: '90 trays / pallet'
    },
    tierDiscounts: [
      { range: '6 - 25 Trays', discount: 'Standard Retailer Margin (50% markup)' },
      { range: '26 - 60 Trays', discount: '6% Modern Trade Incentive' },
      { range: '61+ Trays', discount: '11% Master Distributor Slab' }
    ]
  },
  {
    id: 'mp-eng-02',
    name: 'Nitro Berry Electrolyte & Pre-Workout Energy Tonic',
    category: 'energy-drinks',
    brand: 'Volt Prime Energy',
    sku: 'MP-ENG-NTR-330',
    packSize: '24 x 330ml Aluminum Bottles (Resealable)',
    netWeight: '8.8 kg / Carton',
    moq: '5 Cartons (120 bottles)',
    wholesaleRange: '₹68 - ₹76 / bottle (MRP ₹135)',
    shelfLife: '18 Months',
    origin: 'Kochi Bottling Plant',
    fssai: '11322001000845',
    stockStatus: 'In Stock',
    badge: 'Resealable Cap',
    image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?auto=format&fit=crop&w=800&q=80',
    description: 'Wild berry infused sparkling energy tonic loaded with BCAAs, natural electrolytes, and Panax ginseng. Resealable twist-off aluminum bottle allows multi-serving on the go.',
    specifications: {
      activeIngredients: 'Panax Ginseng, BCAAs, Electrolytes',
      sugarFree: 'Low Calorie Stevia Sweetened',
      palletConfig: '65 cartons / pallet'
    },
    tierDiscounts: [
      { range: '5 - 20 Cartons', discount: 'Base Wholesale Slab' },
      { range: '21+ Cartons', discount: '7.5% Volume Tier' }
    ]
  }
];


