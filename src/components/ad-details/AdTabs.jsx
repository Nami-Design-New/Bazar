import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ADAboutTab from "./ADAboutTab";
import ADCommentsTab from "./ADCommentsTab";
import ADRatesTab from "./ADRatesTab";

import useGetComments from "../../hooks/useGetComments";
import useGetRates from "../../hooks/useGetRates";
import { useParams, useSearchParams } from "react-router-dom";

function AdTabs({ ad, isMyAd }) {
  const { t } = useTranslation();
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const commentsPage = searchParams.get("comments-page")
    ? Number(searchParams.get("comments-page"))
    : 1;
  const ratesPage = searchParams.get("rates-page")
    ? Number(searchParams.get("rates-page"))
    : 2;

  const { isLoading: commentsLoading, data: comments } = useGetComments({
    id: id,
    page: commentsPage,
    skip: 5,
  });
  const { isLoading: ratesLoading, data: rates } = useGetRates({
    id: id,
    page: ratesPage,
    skip: 5,
  });

  return (
    <div className="tabs-section">
      <Tabs defaultActiveKey="aboutAd" id="uncontrolled-tab-example">
        <Tab eventKey="aboutAd" title={t("ads.aboutAd")}>
          <ADAboutTab ad={ad} />
        </Tab>

        <Tab
          eventKey="comments"
          title={`${t("ads.comments")} ${
            comments?.total ? "( " + comments?.total + " )" : ""
          }`}
        >
          <ADCommentsTab
            ad={ad}
            comments={comments}
            commentsLoading={commentsLoading}
            isMyAd={isMyAd}
          />
        </Tab>

        <Tab
          eventKey="rates"
          title={`${t("ads.rates")} ${
            rates?.total ? "( " + rates?.total + " )" : ""
          }`}
        >
          <ADRatesTab
            ad={ad}
            rates={rates}
            ratesLoading={ratesLoading}
            isMyAd={isMyAd}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdTabs;
