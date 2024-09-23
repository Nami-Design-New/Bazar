import { useTranslation } from "react-i18next";
import useGetSettings from "../hooks/settings/useGetSettings";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import SectionHeader from "../ui/layout/SectionHeader";
import { renderHTML } from "../utils/helpers";

function Privacy() {
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
            {settings && settings?.privacy ? (
              <div dangerouslySetInnerHTML={renderHTML(settings?.privacy)} />
            ) : (
              <EmptyData minHeight="300px">{t("errorOccurs")}</EmptyData>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Privacy;
