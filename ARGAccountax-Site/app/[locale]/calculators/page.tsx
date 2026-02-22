import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CalculatorsPage({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/tools/income-tax-calculator`);
}
