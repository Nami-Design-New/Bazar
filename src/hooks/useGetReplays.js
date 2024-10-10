import { useInfiniteQuery } from "@tanstack/react-query";
import { getReplays } from "../services/apiComments";

function useGetReplays(id) {
  const pageSize = 5;
  const requestBody = {
    comment_id: id,
    skip: pageSize,
  };
  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["replays", id],
    queryFn: ({ pageParam = 1 }) =>
      getReplays({ ...requestBody, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      const isMore = lastPage.data.length >= pageSize;
      return isMore ? pages.length + 1 : undefined;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}

export default useGetReplays;

/*
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReplays } from "../services/apiComments";

function useGetReplays(id) {
  const pageSize = 5;
  const requestBody = {
    comment_id: id,
    skip: pageSize,
  };
  const queryKey = [
    "replays",
    {
      id,
      pageSize,
    },
  ];
  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      getReplays({ ...requestBody, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      const isMore = lastPage.data.length >= pageSize;
      return isMore ? pages.length + 1 : undefined;
    },
    retry: false,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}

export default useGetReplays;

*/
