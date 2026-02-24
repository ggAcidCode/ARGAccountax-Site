import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/blog';

const baseUrl = 'https://taxraj.com';
const coreRoutes = ['', '/contact', '/deadlines', '/resources', '/tools', '/tools/income-tax-calculator', '/tools/rrsp-estimator'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const locales = ['en', 'ta'];
  const blogSlugs = getAllSlugs();

  // Core routes
  for (const route of coreRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ta: `${baseUrl}/ta${route}`,
          },
        },
      });
    }
  }

  // Blog routes
  for (const slug of blogSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${slug}`,
            ta: `${baseUrl}/ta/blog/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
