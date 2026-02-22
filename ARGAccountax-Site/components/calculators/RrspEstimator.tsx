'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

// 2025 RRSP annual contribution limit
const RRSP_ANNUAL_LIMIT = 32490;
const RRSP_RATE = 0.18;
const OVER_CONTRIBUTION_BUFFER = 2000;

// Approximate combined marginal rates for tax savings estimate
const MARGINAL_RATES = [
  { min: 0, max: 52886, rate: 0.2005 },
  { min: 52886, max: 57375, rate: 0.2415 },
  { min: 57375, max: 105775, rate: 0.2965 },
  { min: 105775, max: 114750, rate: 0.3148 },
  { min: 114750, max: 150000, rate: 0.3316 },
  { min: 150000, max: 158468, rate: 0.3716 },
  { min: 158468, max: 220000, rate: 0.4116 },
  { min: 220000, max: 221708, rate: 0.4616 },
  { min: 221708, max: Infinity, rate: 0.5353 },
];

function getMarginalRate(income: number): number {
  return MARGINAL_RATES.findLast((b) => income > b.min)?.rate ?? 0.2005;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

export default function RrspEstimator() {
  const t = useTranslations('Calculators.rrspEstimator');

  const [earnedIncome, setEarnedIncome] = useState('');
  const [pensionAdjustment, setPensionAdjustment] = useState('');
  const [carryForward, setCarryForward] = useState('');
  const [contributionsMade, setContributionsMade] = useState('');

  const results = useMemo(() => {
    const income = parseFloat(earnedIncome) || 0;
    if (income <= 0) return null;

    const pa = parseFloat(pensionAdjustment) || 0;
    const carry = parseFloat(carryForward) || 0;
    const made = parseFloat(contributionsMade) || 0;

    const newRoom = Math.min(income * RRSP_RATE, RRSP_ANNUAL_LIMIT);
    const totalRoom = Math.max(0, newRoom - pa + carry);
    const remaining = totalRoom - made;
    const overContribution = remaining < 0 ? Math.abs(remaining) : 0;
    const withinBuffer = overContribution > 0 && overContribution <= OVER_CONTRIBUTION_BUFFER;
    const overLimit = overContribution > OVER_CONTRIBUTION_BUFFER;
    const marginalRate = getMarginalRate(income);
    const maxDeductible = Math.min(made, totalRoom);
    const taxSavings = maxDeductible * marginalRate;

    return {
      newRoom,
      totalRoom,
      remaining,
      overContribution,
      withinBuffer,
      overLimit,
      marginalRate,
      taxSavings,
    };
  }, [earnedIncome, pensionAdjustment, carryForward, contributionsMade]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-6">
      <h2 className="text-xl font-bold text-slate-900 mb-2 font-heading">{t('title')}</h2>
      <p className="text-sm text-slate-500 mb-8">{t('subtitle')}</p>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <InputField
          label={t('earnedIncomeLabel')}
          placeholder={t('earnedIncomePlaceholder')}
          value={earnedIncome}
          onChange={setEarnedIncome}
        />
        <InputField
          label={t('pensionAdjustmentLabel')}
          placeholder={t('pensionAdjustmentPlaceholder')}
          value={pensionAdjustment}
          onChange={setPensionAdjustment}
        />
        <InputField
          label={t('carryForwardLabel')}
          placeholder={t('carryForwardPlaceholder')}
          value={carryForward}
          onChange={setCarryForward}
        />
        <InputField
          label={t('contributionsMadeLabel')}
          placeholder={t('contributionsMadePlaceholder')}
          value={contributionsMade}
          onChange={setContributionsMade}
        />
      </div>

      {/* Results */}
      {results ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard label={t('newRoom')} value={fmt(results.newRoom)} />
            <ResultCard label={t('totalRoom')} value={fmt(results.totalRoom)} highlight />
            <ResultCard
              label={t('remainingRoom')}
              value={fmt(Math.max(0, results.remaining))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard
              label={t('taxSavings')}
              value={fmt(results.taxSavings)}
              sub={`${t('atMarginalRate')} ${pct(results.marginalRate)}`}
              highlight
            />
            <ResultCard
              label={t('annualLimit')}
              value={fmt(RRSP_ANNUAL_LIMIT)}
              sub={t('annualLimitNote')}
            />
          </div>

          {/* Over-contribution warnings */}
          {results.withinBuffer && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 text-[20px] mt-0.5">warning</span>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  {t('bufferWarning', { amount: fmt(results.overContribution) })}
                </p>
              </div>
            </div>
          )}

          {results.overLimit && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-red-600 text-[20px] mt-0.5">error</span>
              <div>
                <p className="text-sm font-medium text-red-800">
                  {t('overContributionWarning', { amount: fmt(results.overContribution) })}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-400">
          <span className="material-symbols-outlined text-[48px] block mb-3">savings</span>
          <p className="text-sm">{t('enterIncome')}</p>
        </div>
      )}
    </div>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent"
        />
      </div>
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
