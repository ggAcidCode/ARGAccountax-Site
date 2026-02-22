import type { MetadataRoute } from 'next';

const baseUrl = 'https://taxraj.com';
const routes = ['', '/contact', '/calculators', '/deadlines', '/resources', '/blog'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    entries.push({
      url: `${baseUrl}/en${route}`,
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

  return entries;
}
