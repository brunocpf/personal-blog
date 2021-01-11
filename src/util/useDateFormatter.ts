import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useDateFormatter = () => {
  const { locale } = useRouter();

  return useMemo(() => new Intl.DateTimeFormat(locale).format, [locale]);
};

export default useDateFormatter;
