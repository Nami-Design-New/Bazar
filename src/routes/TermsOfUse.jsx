import { useTranslation } from "react-i18next";
import DataLoader from "../ui/DataLoader";
import SectionHeader from "../ui/layout/SectionHeader";
import useGetSettings from "../hooks/settings/useGetSettings";
import { renderHTML } from "../utils/helpers";
import EmptyData from "../ui/EmptyData";

function TermsOfUse() {
  const { t } = useTranslation();
  const { isLoading: settingsLoading, data: settings } = useGetSettings();

  return (
    <>
      <SectionHeader />
      {settingsLoading ? (
        <DataLoader minHeight="200px" />
      ) : (
        <section className="about">
          <div className="container">
            {settings && settings?.terms ? (
              <div dangerouslySetInnerHTML={renderHTML(settings?.terms)} />
            ) : (
              <EmptyData minHeight="300px">{t("errorOccurs")}</EmptyData>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default TermsOfUse;
