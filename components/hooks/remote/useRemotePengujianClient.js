import { useInfiniteQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemotePengujianClient = ({
  page,
  limit,
  category,
  tempat_pengujian,
  search,
}) => {
  const uri = `/pengujian/client`;

  const { data, ...others } = useInfiniteQuery(
    ['pengujian', page, limit, category, tempat_pengujian, search],
    ({ pageParam = 1 }) =>
      postFetcher(uri, {
        page: pageParam,
        limit,
        search,
        filter: {
          category,
          tempat_pengujian,
        },
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        if (allPages.length < lastPage.totalPages) {
          return lastPage.data?.length !== 0 ? nextPage : undefined;
        }
      },
    }
  );

  return { data, ...others };
};

export default useRemotePengujianClient;
