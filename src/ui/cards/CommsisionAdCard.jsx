import { Link } from "react-router-dom";

function CommsisionAdCard({ ad, selectedAds, onChange, commissionPrecentage }) {
  return (
    <div className="bank-transfer-box">
      <input
        type="checkbox"
        name="commission_ads"
        id={ad?.id}
        value={ad?.id}
        checked={selectedAds?.includes(ad?.id)}
        onChange={(e) => {
          onChange(+e.target.value);
        }}
      />
      <label htmlFor={ad?.id}>
        <Link to={`/ad-details/${ad?.id}`} className="image-wrapper">
          {ad?.image?.image ? (
            <img src={ad?.image?.image} alt={ad?.name} />
          ) : (
            <i className="fa-sharp fa-regular fa-building-columns"></i>
          )}
        </Link>
        <div className="info-wrapper">
          <div className="title-wrapper d-flex align-items-center gap-2">
            {ad?.id && <h6>#{ad?.id}</h6>}
            {ad?.title && <h5>{ad?.title}</h5>}
          </div>
          {/* <div className="info-boxes-wrapper">
            {ad?.address && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span className="box-value">{ad?.address}</span>
              </div>
            )}
          </div> */}
        </div>
        <div className="commision-box">
          <span>قيمة العمولة:</span>
          {((commissionPrecentage * 100) / ad?.price).toFixed(2)}
        </div>
      </label>
    </div>
  );
}

export default CommsisionAdCard;
