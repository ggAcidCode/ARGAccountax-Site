'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

// 2025 Federal tax brackets (after basic personal amount is applied separately)
const FEDERAL_BRACKETS = [
  { min: 0, max: 57375, rate: 0.15 },
  { min: 57375, max: 114750, rate: 0.205 },
  { min: 114750, max: 158468, rate: 0.26 },
  { min: 158468, max: 221708, rate: 0.29 },
  { min: 221708, max: Infinity, rate: 0.33 },
];

// 2025 Ontario provincial tax brackets
const ONTARIO_BRACKETS = [
  { min: 0, max: 52886, rate: 0.0505 },
  { min: 52886, max: 105775, rate: 0.0915 },
  { min: 105775, max: 150000, rate: 0.1116 },
  { min: 150000, max: 220000, rate: 0.1216 },
  { min: 220000, max: Infinity, rate: 0.1316 },
];

// 2025 basic personal amounts (non-refundable tax credits at lowest rate)
const FEDERAL_BPA = 16129;
const ONTARIO_BPA = 12399;
const FEDERAL_BPA_CREDIT = FEDERAL_BPA * 0.15;
const ONTARIO_BPA_CREDIT = ONTARIO_BPA * 0.0505;

function calcBracketTax(income: number, brackets: typeof FEDERAL_BRACKETS): number {
  let tax = 0;
  for (const { min, max, rate } of brackets) {
    if (income <= min) break;
    tax += (Math.min(income, max) - min) * rate;
  }
  return tax;
}

function getMarginalRate(income: number): { federal: number; ontario: number; combined: number } {
  const fed = FEDERAL_BRACKETS.findLast((b) => income > b.min)?.rate ?? 0;
  const ont = ONTARIO_BRACKETS.findLast((b) => income > b.min)?.rate ?? 0;
  return { federal: fed, ontario: ont, combined: fed + ont };
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

export default function PersonalTaxCalc() {
  const t = useTranslations('Calculators.personalTax');

  const [income, setIncome] = useState('');
  const [rrsp, setRrsp] = useState('');

  const results = useMemo(() => {
    const gross = parseFloat(income) || 0;
    if (gross <= 0) return null;

    // RRSP limited to 18% of prior year earned income (we approximate here)
    const rrspDeduction = Math.min(parseFloat(rrsp) || 0, gross * 0.18);
    const taxableIncome = Math.max(0, gross - rrspDeduction);

    const federalTax = Math.max(0, calcBracketTax(taxableIncome, FEDERAL_BRACKETS) - FEDERAL_BPA_CREDIT);
    const ontarioTax = Math.max(0, calcBracketTax(taxableIncome, ONTARIO_BRACKETS) - ONTARIO_BPA_CREDIT);
    const totalTax = federalTax + ontarioTax;
    const afterTax = gross - totalTax;
    const avgRate = totalTax / gross;
    const marginal = getMarginalRate(taxableIncome);

    return { federalTax, ontarioTax, totalTax, afterTax, avgRate, marginal, taxableIncome, rrspDeduction };
  }, [income, rrsp]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-6">
      <h2 className="text-xl font-bold text-slate-900 mb-2 font-heading">{t('title')}</h2>
      <p className="text-sm text-slate-500 mb-8">2025 tax year · Federal + Ontario</p>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t('incomeLabel')}
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
            <input
              type="number"
              min="0"
              max="10000000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder={t('incomePlaceholder')}
              className="w-full border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t('rrspLabel')}
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
            <input
              type="number"
              min="0"
              value={rrsp}
              onChange={(e) => setRrsp(e.target.value)}
              placeholder={t('rrspPlaceholder')}
              className="w-full border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {results ? (
        <div className="space-y-4">
          {/* Main tax breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard label={t('federalTax')} value={fmt(results.federalTax)} />
            <ResultCard label={t('ontarioTax')} value={fmt(results.ontarioTax)} />
            <ResultCard
              label={t('totalTax')}
              value={fmt(results.totalTax)}
              sub={`${pct(results.avgRate)} ${t('averageRate')}`}
              highlight
            />
          </div>

          {/* Secondary metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard label={t('afterTax')} value={fmt(results.afterTax)} />
            <ResultCard
              label={t('marginalRate')}
              value={pct(results.marginal.combined)}
              sub={`Federal ${pct(results.marginal.federal)} + Ontario ${pct(results.marginal.ontario)}`}
            />
          </div>

          {/* RRSP savings callout */}
          {results.rrspDeduction > 0 && (
            <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl px-5 py-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#15803d] text-[20px] mt-0.5">savings</span>
              <div>
                <p className="text-sm font-medium text-[#166534]">
                  RRSP deduction of {fmt(results.rrspDeduction)} applied — taxable income reduced to {fmt(results.taxableIncome)}.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-400">
          <span className="material-symbols-outlined text-[48px] block mb-3">calculate</span>
          <p className="text-sm">{t('enterIncome')}</p>
        </div>
      )}
    </div>
  );
}

function ResultCard({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 ${
        highlight
          ? 'bg-[#f0fdf4] border border-[#dcfce7]'
          : 'bg-slate-50 border border-slate-100'
      }`}
    >
      <div className={`text-xs font-semibold mb-1 ${highlight ? 'text-[#15803d]' : 'text-slate-500'}`}>
        {label}
      </div>
      <div className={`text-2xl font-bold ${highlight ? 'text-[#15803d]' : 'text-slate-900'}`}>
        {value}
      </div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
}
