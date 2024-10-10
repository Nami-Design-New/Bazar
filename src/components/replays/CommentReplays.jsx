import ReplayCard from "../../ui/cards/ReplayCard";
import useGetReplays from "../../hooks/useGetReplays";
import { useTranslation } from "react-i18next";

function CommentReplays({ comment }) {
  const { t } = useTranslation();
  const {
    isLoading: replaysLoading,
    data: replays,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetReplays(comment?.id);

  const allReplays = replays?.pages?.flatMap((page) => page.data) || [];

  return (
    <ul className="comments-replays">
      {allReplays && allReplays?.length > 0 && (
        <>
          {allReplays?.map((replay) => (
            <li key={replay?.id}>
              <ReplayCard targetComment={replay} />
            </li>
          ))}
          {hasNextPage ? (
            <li className="d-flex align-items-center justify-content-center">
              <span
                className="show-more"
                onClick={() => {
                  if (!isFetchingNextPage && hasNextPage) {
                    fetchNextPage();
                  }
                }}
              >
                {isFetchingNextPage ? (
                  <i className="fa-light fa-loader fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-chevrons-down"></i>
                )}
                {t("showMore")}
              </span>
            </li>
          ) : null}
        </>
      )}
    </ul>
  );
}

export default CommentReplays;

/*
import ReplayCard from "../../ui/cards/ReplayCard";
import useGetReplays from "../../hooks/useGetReplays";
import DataLoader from "../../ui/DataLoader";

function CommentReplays({ comment }) {
  const {
    isLoading: replaysLoading,
    data: replays,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetReplays(comment?.id);

  return (replaysLoading || isFetching) && replays?.data?.length < 5 ? (
    <DataLoader />
  ) : (
    <ul>
      {replays?.data &&
        replays?.data?.length > 0 &&
        replays?.data?.map((replay) => (
          <li key={replay?.id}>
            <ReplayCard targetComment={replay} />
          </li>
        ))}
      <span
        onClick={() => {
          if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
          }
        }}
      >
        load
      </span>
    </ul>
  );
}

export default CommentReplays;

*/
