import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import ToolsPreview from '@/components/home/ToolsPreview';
import CtaSection from '@/components/home/CtaSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ToolsPreview />
      <CtaSection />
    </>
  );
}
