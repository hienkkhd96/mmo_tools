import {useEffect, useState} from 'react';
import {platformAccountApi} from '../../api/platform-account';
import {useIsFocused} from '@react-navigation/native';
import {PLATFORM_TYPE} from '../../platform/type';
export const useFetchCountAccounts = () => {
  const [counts, setCounts] = useState<{
    [key in PLATFORM_TYPE]: number;
  }>({
    golike: 0,
    tds: 0,
    ttc: 0,
  });
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      const res = await platformAccountApi.countAccount();
      if (res.status === 200 && res?.data) {
        setCounts(res.data);
      }
    })();
  }, [isFocused]);
  return {
    counts,
  };
};
