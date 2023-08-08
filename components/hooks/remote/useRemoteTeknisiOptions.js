import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteTeknisiOptions = () => {
  const uri = `/teknisi/all`;

  const { data, ...others } = useQuery(['teknisi'], () => postFetcher(uri));

  const newData = data?.data?.map((item) => ({
    label: item.full_name,
    value: item.id,
  }));

  return { data: newData, ...others };
};

export default useRemoteTeknisiOptions;
