'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  clientType: string;
  message: string;
  consent: boolean;
  website: string; // honeypot
}

export default function ContactForm() {
  const t = useTranslations('Contact.form');
  const [state, setState] = useState<FormState>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    clientType: '',
    message: '',
    consent: false,
    website: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');
      setState('success');
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="material-symbols-outlined text-[#15803d] text-[32px]">check_circle</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('successTitle')}</h3>
        <p className="text-slate-600">{t('successMessage')}</p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border-slate-300 border px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent placeholder:text-slate-400 bg-white';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Honeypot — visually hidden, never shown to real users */}
      <div
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
      >
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="name">
            {t('name')}
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder={t('namePlaceholder')}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={t('emailPlaceholder')}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="clientType">
          {t('clientType')}
        </label>
        <select
          id="clientType"
          name="clientType"
          required
          value={formData.clientType}
          onChange={handleChange}
          className={inputClass}
        >
          <option disabled value="">{t('clientTypePlaceholder')}</option>
          <option value="personal">{t('clientTypeOptions.personal')}</option>
          <option value="selfEmployed">{t('clientTypeOptions.selfEmployed')}</option>
          <option value="corporate">{t('clientTypeOptions.corporate')}</option>
          <option value="notSure">{t('clientTypeOptions.notSure')}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="phone">
          {t('phone')}
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t('phonePlaceholder')}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="message">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder={t('messagePlaceholder')}
          className={inputClass}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          name="consent"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 rounded text-[#15803d] focus:ring-[#15803d] accent-[#15803d]"
        />
        <label htmlFor="consent" className="text-xs text-slate-500 leading-relaxed">
          {t('consent')}
        </label>
      </div>

      {state === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {t('errorMessage')}
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full bg-[#15803d] hover:bg-[#166534] text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{state === 'submitting' ? t('submitting') : t('submit')}</span>
        {state !== 'submitting' && (
          <span className="material-symbols-outlined text-[18px]">send</span>
        )}
      </button>

    </form>
  );
}
