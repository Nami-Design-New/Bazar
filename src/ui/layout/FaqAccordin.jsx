import { Accordion, Tab, Tabs } from "react-bootstrap";
import useFaq from "../../hooks/useFaq";
import DataLoader from "../DataLoader";
import EmptyData from "../EmptyData";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function FaqAccordin() {
  const { t } = useTranslation();
  const { isLoading: faqsLoading, data: faqs } = useFaq();
  const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    if (!faqsLoading) {
      setActiveTab(faqs?.data?.[0]?.title);
    }
  }, [faqs?.data, faqsLoading]);

  return faqsLoading ? (
    <DataLoader minHeight="200px" />
  ) : faqs?.data && faqs?.data?.length > 0 ? (
    <div className="faqs-accordin">
      <div className="container">
        <div className="tabs-section">
          <Tabs
            defaultActiveKey={activeTab}
            id="uncontrolled-tab-example"
            className="mb-3 tab"
            transition
          >
            {faqs?.data?.map((faq) => (
              <Tab eventKey="home" title={faq?.title} key={faq?.title}>
                {faq?.faq && faq?.faq?.length > 0 ? (
                  <Accordion defaultActiveKey={faq?.faq?.[0]?.id}>
                    {faq?.faq?.map((item) => (
                      <Accordion.Item eventKey={item?.id} key={item?.id}>
                        <Accordion.Header>{item?.question}</Accordion.Header>
                        <Accordion.Body>
                          <p>{item?.answer}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                ) : (
                  <EmptyData minHeight="300px">{t("noFaqsAbout")} {faq?.title}</EmptyData>
                )}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  ) : (
    <EmptyData minHeight="300px">{t("noFaqs")}</EmptyData>
  );
}

export default FaqAccordin;
