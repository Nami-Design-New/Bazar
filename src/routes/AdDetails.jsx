import AdDetailsSlider from "../features/ad-details/AdDetailsSlider";
import avatar from "../assets/images/user-1.png";
import { Link } from "react-router-dom";

function AdDetails() {
  return (
    <section className="itemDetails">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 d-flex flex-column gap-4 p-0 pb-3 p-md-3">
            <AdDetailsSlider />

            <div className="priceInfo">
              <div className="price">
                <span> $1,200 </span>
              </div>
              <button className="favorite ">
                <img src="img/icons/heart.svg" alt="" />
              </button>
              <div className="actions">
                <a href="listing.html" className="category">
                  <img src="img/categories/icon (1).svg" alt="" />
                  Electronics
                </a>
                <div className="share">
                  <span className="ps-2 text-capitalize fw-bold">share :</span>
                  <a
                    href="#!"
                    className="twitter"
                    data-bs-toggle="tooltip"
                    title=" twitter "
                  >
                    <img src="img/icons/twitter.svg" alt="" />
                  </a>
                  <a
                    href="#!"
                    className="whatsapp"
                    data-bs-toggle="tooltip"
                    title="  whatsapp "
                  >
                    <img src="img/icons/whatsapp.svg" alt="" />
                  </a>
                  <a
                    href="#!"
                    className="instagram"
                    data-bs-toggle="tooltip"
                    title=" instagram "
                  >
                    <img src="img/icons/instagram.svg" alt="" />
                  </a>
                  <a
                    href="#!"
                    className="facebook"
                    data-bs-toggle="tooltip"
                    title=" facebook "
                  >
                    <img src="img/icons/facebook.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>

            <div className="itemInfo">
              <h3 className="title">Apple MacBook Air (2023) Apple M2 Chip</h3>

              <div className="itemBottom">
                <a href="#!" className="location">
                  <img src="img/icons/location.svg" alt="" />
                  <span> USA, California </span>
                </a>
                <div className="time">
                  <img src="img/icons/clock.svg" alt="" /> 1h ago
                </div>
                <div className="views">
                  <img src="img/icons/eye.svg" alt="" /> 1.2k
                </div>
              </div>
              <p className="description">
                The Apple MacBook Air 13.6-Inch laptop is powered by the new M2
                chip. It is loaded with 8GB RAM and 256GB SSD. The MacBook Air
                features a brilliant Retina display, a FaceTime HD camera, and
                studio‑quality mics. It comes with the same compact design but
                now it supports up to 20 hours of battery life and an active
                cooling system to sustain enhanced performance. macOS and M2
                work together to bring more speed and responsiveness to all your
                go‑to apps. The Apple MacBook Air comes with active cooling that
                sustains blazing‑fast performance.
              </p>
              <div className="instructions">
                <span> Used </span>
                <span> Shipping </span>
                <span> Firm price </span>
              </div>
            </div>

            <div className="itemDetailsBox">
              <h4 className="title">Key Features</h4>
              <ul>
                <li>
                  <span>MPN</span>
                  <p> MLY33LL/A / MLY33ZP/A</p>
                </li>
                <li>
                  <span>Model</span>
                  <p> MacBook Air (2022) M2 Chip Model</p>
                </li>
                <li>
                  <span>Processor</span>
                  <p>
                    Apple M2 chip, 8-core CPU with 4 performance cores and 4
                    efficiency cores
                  </p>
                </li>
                <li>
                  <span>RAM</span>
                  <p> 8GB, Storage: 256GB SSD</p>
                </li>
                <li>
                  <span>Display</span>
                  <p> 13.6 Liquid Retina display (2560 x 1664)</p>
                </li>
                <li>
                  <span>Features</span>
                  <p> Backlit Magic Keyboard and the Touch ID</p>
                </li>
                <li>
                  <span>Processor Brand</span>
                  <p> Apple</p>
                </li>
                <li>
                  <span>Processor Model</span>
                  <p> M2 Chip</p>
                </li>
              </ul>
            </div>

            <div className="itemDetailsBox">
              <h4 className="title">Extra Features</h4>
              <div className="features">
                <span> Airbag </span>
                <span> ABS </span>
                <span> Air Condioning </span>
                <span> AM/FM Radio </span>
                <span> EBD </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 p-0 p-md-3">
            <div className="advertiserDetails">
              <Link to="/profile/1" className="advertiser">
                <img src={avatar} loading="lazy" alt="" />
                <h3 className="name"> Mahmoud Elkomy </h3>
              </Link>

              <span className="date"> Member S. Nov 24, 2020 </span>
              <div className="contact">
                <a href="chats.html" className="chat">
                  <img src="img/icons/chat.svg" alt="" />
                  <span> chat </span>
                </a>
                <a href="#!" className="call">
                  <img src="img/icons/call.svg" alt="" />
                  <span> call </span>
                </a>
              </div>
            </div>

            <div className="itemDetailsBox">
              <h4 className="title"> Your safety matters to us </h4>
              <ul>
                <li>
                  <p>
                    Meet the seller in a public place such as the metro, malls,
                    or gas stations
                  </p>
                </li>
                <li>
                  <p>
                    Take someone with you when you go to meet the seller or
                    buyer
                  </p>
                </li>
                <li>
                  <p>
                    Inspect the product carefully before you buy and make sure
                    that its price is appropriate
                  </p>
                </li>
                <li>
                  <p>
                    Do not pay or transfer money unless you have inspected the
                    product properly
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdDetails;
