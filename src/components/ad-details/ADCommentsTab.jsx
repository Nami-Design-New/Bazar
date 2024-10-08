import { useState } from "react";
import DataLoader from "../../ui/DataLoader";
import CreateCommentModal from "../../ui/modals/CreateCommentModal";
import { useTranslation } from "react-i18next";
import { IconCirclePlus } from "@tabler/icons-react";
import RateCard from "../../ui/cards/RateCard";
import CustomPagination from "../../ui/CustomPagination";

function ADCommentsTab({ ad, comments, commentsLoading, isMyAd }) {
  const { t } = useTranslation();

  const [showCommentModal, setShowCommentModal] = useState(false);

  return commentsLoading ? (
    <DataLoader minHeight="200px" />
  ) : (
    <>
      {!comments?.data && isMyAd ? null : (
        <div className="itemDetailsBox d-flex flex-column gap-2">
          <div className="w-100 d-flex align-items-center justify-content-end gap-2">
            <span
              className="custom-btn filled"
              style={{
                width: "unset !important",
                aspectRatio: " 1 / 1",
                cursor: "pointer",
              }}
              onClick={() => setShowCommentModal(true)}
            >
              <span
                className="d-flex align-items-center justify-content-center gap-2"
                style={{ padding: "8px 16px", whiteSpace: "nowrap" }}
              >
                <IconCirclePlus stroke={1.5} />
                {t("ads.addComment")}
              </span>
            </span>
          </div>

          {comments?.data?.map((comment) => (
            <RateCard key={comment?.id} rate={comment} />
          ))}
          {comments?.data && comments?.total > 10 && (
            <CustomPagination
              count={comments?.total}
              pageSize={5}
              param="comments-page"
            />
          )}
        </div>
      )}

      <CreateCommentModal
        id={ad?.data?.id}
        showModal={showCommentModal}
        setShowModal={setShowCommentModal}
      />
    </>
  );
}

export default ADCommentsTab;
