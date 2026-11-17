import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  RotateCcw,
  Layers,
  ArrowUpDown,
  Flame, 
  Wheat, 
  Droplet, 
  Package, 
  Coffee, 
  Nut, 
  Utensils
} from 'lucide-react';
import { CATEGORIES as FALLBACK_CATEGORIES, PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';
import { dataService } from '../services/dataService';
import ProductCard from './ProductCard';
import ScrollReveal from './ScrollReveal';

const CATEGORY_ICONS = {
  Grid: Grid,
  Flame: Flame,
  Wheat: Wheat,
  Droplet: Droplet,
  Package: Package,
  Coffee: Coffee,
  Nut: Nut,
  Utensils: Utensils
};

export default function ProductCatalog({ 
  onQuickView, 
  onAddToRfq, 
  rfqItems = [],
  activeCategory,
  onSelectCategory
}) {
  const [productList, setProductList] = useState(() => dataService.getProducts());
  const [categoryList, setCategoryList] = useState(() => dataService.getCategories());

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setProductList(dataService.getProducts());
      setCategoryList(dataService.getCategories());
    });
    return unsub;
  }, []);

  const [internalCategory, setInternalCategory] = useState('all');
  const selectedCategory = activeCategory !== undefined ? activeCategory : internalCategory;
  const setSelectedCategory = onSelectCategory || setInternalCategory;
  const [searchQuery, setSearchQuery] = useState('');
  const [stockOnly, setStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = useMemo(() => {
    return productList.filter(product => {
      if (selectedCategory !== 'all') {
        const prodCat = (product.category || '').toLowerCase().trim();
        const selCat = (selectedCategory || '').toLowerCase().trim();
        const prodSlug = prodCat.replace(/[\s_]+/g, '-');
        const selSlug = selCat.replace(/[\s_]+/g, '-');
        const matches = prodCat === selCat || prodSlug === selSlug || prodCat.includes(selCat) || selCat.includes(prodCat);
        if (!matches) {
          return false;
        }
      }
      if (stockOnly && product.stockStatus !== 'In Stock') {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.origin.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
      return 0;
    });
  }, [selectedCategory, searchQuery, stockOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setStockOnly(false);
    setSortBy('featured');
  };

  return (
    <section id="products" className="bg-[#F5F0E6] text-[#101010] border-b border-[#101010] py-16 w-full">
      {/* Full width container */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#101010] gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#343434] block mb-1">
                COMMERCIAL PRICE SCHEDULE &amp; SKUs
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#101010]">
                Wholesale Master Catalog
              </h2>
              <p className="text-xs text-[#343434] mt-1 font-medium max-w-xl">
                Authorized FMCG consignments direct from factory with legal metrology barcodes, FSSAI certificates, and tiered volume incentives.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono font-bold text-[#101010] bg-white border border-[#101010] px-3.5 py-1.5 rounded">
              <span>SHOWING: <strong className="text-[#D4AF37] font-black">{filteredProducts.length}</strong> WHOLESALE ITEMS</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Controls Bar */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white border border-[#101010] p-4 sm:p-5 mb-8 space-y-4 shadow-sm">
            
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              
              {/* Search Input */}
              <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 text-[#343434] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, SKU (e.g. MP-TGSE), brand, spice..."
                  className="w-full pl-10 pr-12 py-2.5 rounded bg-[#F5F0E6] border border-[#101010] text-xs text-[#101010] placeholder-[#343434] outline-none font-medium focus:bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-[#343434] hover:text-[#101010]"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Quick Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end text-xs font-bold">
                
                <label className="flex items-center gap-2 cursor-pointer bg-[#F5F0E6] border border-[#101010] px-3 py-2 rounded text-[#101010] hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    checked={stockOnly}
                    onChange={(e) => setStockOnly(e.target.checked)}
                    className="rounded text-[#101010] focus:ring-0 border-[#101010] w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-mono uppercase">In Stock Only</span>
                </label>

                <div className="flex items-center gap-1.5 bg-[#F5F0E6] border border-[#101010] px-3 py-1.5 rounded text-[#101010]">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#343434]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-mono text-xs text-[#101010] outline-none cursor-pointer uppercase"
                  >
                    <option value="featured">Featured First</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="brand">Brand</option>
                  </select>
                </div>

                {/* View Switcher: Grid vs Table */}
                <div className="flex items-center bg-[#F5F0E6] border border-[#101010] p-1 rounded">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-[#101010] text-[#F5F0E6]' : 'text-[#343434] hover:text-[#101010]'
                    }`}
                    aria-label="Grid layout"
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'table' ? 'bg-[#101010] text-[#F5F0E6]' : 'text-[#343434] hover:text-[#101010]'
                    }`}
                    aria-label="Table layout"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>

                {(searchQuery || selectedCategory !== 'all' || stockOnly) && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-[#343434] hover:text-[#101010] px-2 py-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="text-[11px] font-mono uppercase">Reset</span>
                  </button>
                )}

              </div>

            </div>

            {/* Category Horizontal Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[#101010]/15">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border border-[#101010] ${
                  selectedCategory === 'all'
                    ? 'bg-[#D4AF37] text-[#101010] shadow-sm'
                    : 'bg-[#F5F0E6] hover:bg-white text-[#101010]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All Products</span>
              </button>
              {categoryList.map(category => {
                const Icon = CATEGORY_ICONS[category.icon] || Grid;
                const isSelected = selectedCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border border-[#101010] ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#101010] shadow-sm'
                        : 'bg-[#F5F0E6] hover:bg-white text-[#101010]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </ScrollReveal>

        {/* Dynamic Display: Grid View with Cascading Scroll Animation or Compact Table */}
        {filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => {
                const rfqItem = rfqItems.find(item => item.product.id === product.id);
                return (
                  <ScrollReveal key={product.id} delay={(idx % 4) * 80} direction="up" className="h-full">
                    <ProductCard
                      product={product}
                      onQuickView={onQuickView}
                      onAddToRfq={onAddToRfq}
                      currentRfqQuantity={rfqItem ? rfqItem.quantity : 0}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            /* Table View */
            <div className="bg-white border border-[#101010] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#101010] text-[#F5F0E6] text-[10px] font-mono uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Product &amp; Origin</th>
                      <th className="p-3.5">SKU Code</th>
                      <th className="p-3.5">Master Packaging</th>
                      <th className="p-3.5">Min Order (MOQ)</th>
                      <th className="p-3.5">Wholesale Slab</th>
                      <th className="p-3.5 text-right">Direct Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#101010]/20">
                    {filteredProducts.map((product, idx) => (
                      <tr 
                        key={product.id} 
                        className={`hover:bg-[#D4AF37]/10 transition-colors cursor-pointer ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F0E6]/40'
                        }`}
                        onClick={() => onQuickView(product)}
                      >
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-12 h-12 object-cover rounded border border-[#101010]"
                            />
                            <div>
                              <span className="text-[9px] font-mono font-bold uppercase text-[#343434]">{product.brand}</span>
                              <h4 className="font-editorial font-bold text-sm text-[#101010]">{product.name}</h4>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-[#101010]">
                          {product.sku}
                        </td>
                        <td className="p-3.5 text-[#343434] font-medium">
                          {product.packSize}
                        </td>
                        <td className="p-3.5 text-[#343434] font-medium">
                          {product.moq}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-[#101010] bg-[#D4AF37]/10">
                          {product.wholesaleRange}
                        </td>
                        <td className="p-3.5 text-right" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => onAddToRfq(product, 1)}
                            className="px-3 py-1.5 bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] text-xs font-bold uppercase tracking-wider rounded border border-[#101010] transition-colors"
                          >
                            + Add Case
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : productList.length === 0 ? (
          <div className="bg-white border border-[#101010] p-12 text-center max-w-md mx-auto space-y-3 rounded-lg shadow-sm">
            <Package className="w-12 h-12 text-[#D4AF37] mx-auto opacity-70" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block">
              STATUS: NOT FOUND
            </span>
            <h3 className="font-editorial text-xl font-bold text-[#101010]">No Products Found</h3>
            <p className="text-xs text-[#343434] leading-relaxed">
              No commodities are currently listed in this catalog section. Please check back shortly.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-[#101010] p-12 text-center max-w-md mx-auto space-y-4">
            <h3 className="font-editorial text-xl font-bold text-[#101010]">No commodities match your query</h3>
            <p className="text-xs text-[#343434]">
              No SKUs matched "{searchQuery}". Try selecting another category or resetting filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#D4AF37] text-[#101010] border border-[#101010] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#b39023] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
