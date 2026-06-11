'use client';
import React from 'react';
import Link from 'next/link';
import { FiSearch, FiArrowUpRight, FiPackage, FiGrid, FiLayers } from 'react-icons/fi';

const SectionLabel = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-1.5 px-3 pt-3 pb-1.5">
    <Icon size={10} className="text-[#860000]" />
    <span className="text-[9px] font-bold text-[#860000] uppercase tracking-[0.12em]">{label}</span>
  </div>
);

const SearchDropdown = ({ query, results, isSearching, onClose, onViewAll }) => {
  const hasProducts = results?.products?.length > 0;
  const hasCategories = results?.categories?.length > 0;
  const hasSubcategories = results?.subcategories?.length > 0;
  const hasAny = hasProducts || hasCategories || hasSubcategories;

  return (
    <div className="absolute top-[calc(100%+8px)] left-0 w-[360px] bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 z-50">

      {/* Loading */}
      {isSearching && (
        <div className="flex items-center gap-3 px-4 py-5">
          <div className="w-4 h-4 border-2 border-[#860000] border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="text-xs text-gray-400">Searching for &ldquo;{query}&rdquo;...</span>
        </div>
      )}

      {/* Results */}
      {!isSearching && results && (
        <>
          {/* No results */}
          {!hasAny && (
            <div className="flex flex-col items-center py-8 gap-2">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F1] flex items-center justify-center">
                <FiSearch size={16} className="text-[#860000]/50" />
              </div>
              <p className="text-xs font-semibold text-gray-700">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-[11px] text-gray-400">Try searching with different keywords</p>
            </div>
          )}

          {/* Products */}
          {hasProducts && (
            <div>
              <SectionLabel icon={FiPackage} label="Products" />
              {results.products.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 hover:bg-[#FAF6F1] transition-colors group ${i < results.products.length - 1 ? '' : ''}`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F5F0EC] shrink-0 border border-gray-100">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiPackage size={14} className="text-[#860000]/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-gray-800 truncate group-hover:text-[#860000] transition-colors leading-tight">{p.name}</p>
                    {(p.size || p.gsm) && (
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                        {[p.size, p.gsm && `${p.gsm} GSM`].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                  <FiArrowUpRight size={12} className="text-gray-300 group-hover:text-[#860000] transition-all shrink-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          )}

          {/* Categories */}
          {hasCategories && (
            <div className={hasProducts ? 'border-t border-gray-100' : ''}>
              <SectionLabel icon={FiGrid} label="Categories" />
              {results.categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/products?category=${c.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#FAF6F1] transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#860000]/10 flex items-center justify-center shrink-0">
                    <FiGrid size={11} className="text-[#860000]" />
                  </div>
                  <span className="text-[12px] font-medium text-gray-800 flex-1 group-hover:text-[#860000] transition-colors">{c.name}</span>
                  <FiArrowUpRight size={12} className="text-gray-300 group-hover:text-[#860000] transition-all shrink-0" />
                </Link>
              ))}
            </div>
          )}

          {/* Collections */}
          {hasSubcategories && (
            <div className={(hasProducts || hasCategories) ? 'border-t border-gray-100' : ''}>
              <SectionLabel icon={FiLayers} label="Collections" />
              {results.subcategories.map((s) => (
                <Link
                  key={s.id}
                  href={`/products?category=${s.categoryId}&subcategory=${s.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#FAF6F1] transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#860000]/10 flex items-center justify-center shrink-0">
                    <FiLayers size={11} className="text-[#860000]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[12px] font-medium text-gray-800 group-hover:text-[#860000] transition-colors">{s.name}</span>
                    {s.categoryName && (
                      <span className="text-[10px] text-gray-400 ml-1.5">in {s.categoryName}</span>
                    )}
                  </div>
                  <FiArrowUpRight size={12} className="text-gray-300 group-hover:text-[#860000] transition-all shrink-0" />
                </Link>
              ))}
            </div>
          )}

          {/* Footer CTA */}
          {hasAny && (
            <div className="border-t border-gray-100 p-2">
              <button
                onClick={onViewAll}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#860000] text-white hover:bg-[#6d0000] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <FiSearch size={12} />
                  <span className="text-[11px] font-semibold">View all results for &ldquo;{query}&rdquo;</span>
                </div>
                <FiArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchDropdown;
