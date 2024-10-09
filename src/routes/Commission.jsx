import { useSelector } from "react-redux";
import SectionHeader from "../ui/layout/SectionHeader";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import { useTranslation } from "react-i18next";
import useCommissionAds from "../hooks/ads/useCommissionAds";
import CommsisionAdCard from "../ui/cards/CommsisionAdCard";
import useGetSettings from "../hooks/settings/useGetSettings";
import { useEffect, useState } from "react";
import SubmitButton from "../ui/form-elements/SubmitButton";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import CommissionWalletModal from "../ui/modals/CommissionWalletModal";
import { useQueryClient } from "@tanstack/react-query";
import ChargeModal from "../ui/modals/ChargeModal";
import OrderModal from "../ui/modals/OrderModal";
import { useNavigate } from "react-router-dom";

function Commission() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);
  const { isLoading: adsLoading, data: ads } = useCommissionAds(user?.id);
  const { isLoading: settingsLoading, data: settings } = useGetSettings();
  const [selectedAds, setSelectedAds] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [totalCost, setTotalCost] = useState(0);
  const [showConfirmPayModel, setShowConfirmPayModel] = useState(false);
  const [showChargeModel, setShowChargeModel] = useState(false);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    const newCost = ads?.data?.reduce((acc, ad) => {
      let newPrice = 0;
      if (selectedAds?.includes(ad?.id)) {
        newPrice = (settings?.commission_percentage * 100) / ad?.price;
      }
      return acc + newPrice;
    }, 0);
    setTotalCost(newCost);

    return () => {
      setTotalCost(0);
    };
  }, [ads?.data, selectedAds, settings?.commission_percentage]);

  useEffect(() => {
    if (ads?.data && ads?.data?.length > 0) {
      setSelectedAds(ads?.data?.map((ad) => ad?.id));
    }
  }, [ads]);

  function handleChange(id) {
    const newAds = [...selectedAds];

    if (selectedAds?.length > 0) {
      if (newAds.includes(id)) {
        newAds.splice(newAds.indexOf(id), 1);
        setSelectedAds(newAds);
      } else {
        newAds.push(id);
        setSelectedAds(newAds);
      }
    } else {
      newAds?.push(id);
      setSelectedAds(newAds);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedAds) {
      toast.error(t("commissions.fillAllFields"));
      setLoading(false);
      return;
    }
    if (!paymentMethod || !selectedAds?.length) {
      toast.error(t("commissions.fillAllFields"));
      setLoading(false);
      return;
    } else {
      if (paymentMethod === "online") {
        if (user?.wallet >= totalCost) {
          setShowConfirmPayModel(true);
        } else {
          setShowChargeModel(true);
        }
        setLoading(false);
      } else if (paymentMethod === "wallet") {
        setShowModal(true);
        setLoading(false);
      }
    }
  };

  const handlePayCommission = async () => {
    setPayLoading(true);
    try {
      await axios.post(
        "/user/finish_commission",
        {
          ids: selectedAds,
          payment_method: paymentMethod,
        },
        {
          onSuccess: (res) => {
            if (res?.data?.code !== 200 || res?.data?.code !== 201)
              throw new Error(res?.message);
            else {
              toast.success(t("commissions.success"));
              setLoading(false);
              queryClient.invalidateQueries["commissionAds"];
              navigate("/profile");
            }
          },
        }
      );
    } catch (err) {
      setPayLoading(false);
      toast.error(t("commissions.failed"));
      throw new Error(err.message);
    } finally {
      setPayLoading(false);
      setLoading(false);
    }
  };

  return (
    <>
      <SectionHeader />
      {adsLoading || settingsLoading ? (
        <DataLoader minHeight="200px" />
      ) : (
        <div className="commission-page">
          <div className="container">
            <div className="row">
              {ads?.data && ads?.data?.length > 0 ? (
                <form className="form col-12" onSubmit={handleSubmit}>
                  <div className="form-header-image">
                    <img src="/images/commission-1.svg" alt="commission" />
                  </div>
                  <div className="form-body">
                    <div className="row">
                      <div className="col-lg-6 col-12 d-flex flex-column gap-3">
                        <div className="sub-title">
                          <h5>{t("commissions.ads")}</h5>
                          <p>{t("commissions.selectAdsSubtitle")}</p>
                        </div>
                        {ads?.data?.map(
                          (ad) =>
                            !ad?.Commission && (
                              <CommsisionAdCard
                                key={ad?.id}
                                ad={ad}
                                selectedAds={selectedAds}
                                onChange={handleChange}
                                commissionPrecentage={
                                  settings?.commission_percentage
                                }
                              />
                            )
                        )}
                      </div>
                      <div
                        className="col-lg-6 col-12 d-flex flex-column"
                        style={{ gap: "24px" }}
                      >
                        <div className="info-item">
                          <div className="title">
                            {t("commissions.appPrecentage")}:
                          </div>
                          <div className="value">
                            {settings?.commission_percentage / 100}%
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="input-field">
                            <label htmlFor="paymentMethod">
                              {t("commissions.paymentMethod")}
                            </label>
                            <div className="radios">
                              <label htmlFor="online">
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  id="online"
                                  value="online"
                                  checked={paymentMethod === "online"}
                                  onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                  }
                                />

                                <span className="label-content">
                                  <i className="fa-regular fa-globe"></i>{" "}
                                  {t("commissions.online")}
                                </span>
                              </label>
                              <label htmlFor="wallet">
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  id="wallet"
                                  value="wallet"
                                  checked={paymentMethod === "wallet"}
                                  onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                  }
                                />
                                <span className="label-content">
                                  <i className="fa-regular fa-building-columns"></i>
                                  {t("commissions.wallet")}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 total-details">
                          <h6>
                            {t("commissions.totalHeading")}{" "}
                            <span>{totalCost?.toFixed(2)}</span>
                          </h6>
                          <div className="details-item">
                            <div className="title"></div>
                          </div>
                        </div>
                        <div className="col-12">
                          <SubmitButton
                            name={t("commissions.payNow")}
                            loading={loading}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <EmptyData minHeight="300px">
                  {t("commissions.noAds")}
                </EmptyData>
              )}
            </div>
          </div>
        </div>
      )}
      <CommissionWalletModal
        showModal={showModal}
        setShowModal={setShowModal}
        ids={selectedAds}
        price={totalCost}
      />
      <ChargeModal
        cartTotalPrice={totalCost}
        showModal={showChargeModel}
        setShowModal={setShowChargeModel}
        title={t("cart.charge")}
      />
      <OrderModal
        setShowModal={setShowConfirmPayModel}
        showModal={showConfirmPayModel}
        ballance={user?.wallet}
        cartTotalPrice={totalCost}
        eventFunction={handlePayCommission}
        loading={payLoading}
        buttonTitle={t("payNow")}
      />
    </>
  );
}

export default Commission;
