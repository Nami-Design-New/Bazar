import SectionHeader from "./../ui/layout/SectionHeader";
import address from "../assets/images/c-location.svg";
import phone from "../assets/images/c-phone.svg";
import email from "../assets/images/c-email.svg";

function Contact() {
  function highlight(e) {
    e.target.previousElementSibling.classList.add("h");
  }

  function dehighlight(e) {
    e.target.previousElementSibling.classList.remove("h");
  }

  return (
    <>
      <SectionHeader />
      <section className="contact_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 p-2" data-aos="fade-up">
              <div className="contact_info">
                <h3> ابقى على تواصل معنا </h3>
                <ul>
                  <li className="field" data-aos="fade-up">
                    <div className="icon">
                      <img src={address} alt="address" />
                    </div>
                    <div className="text">
                      <h4> العنوان :</h4>
                      <a
                        target="_blank"
                        href="https://maps.app.goo.gl/9Mg14qzeZY9tq7oeA"
                      >
                        السلام المدينة المنورة السعودية
                      </a>
                    </div>
                  </li>
                  <li className="field" data-aos="fade-up">
                    <div className="icon">
                      <img src={email} alt="email" />
                    </div>
                    <div className="text">
                      <h4> البريد الالكتروني :</h4>
                      <a target="_blank" href="mailto:info@ditchIt.com">
                        info@bazar.com
                      </a>
                    </div>
                  </li>
                  <li className="field" data-aos="fade-up">
                    <div className="icon">
                      <img src={phone} alt="phone" />
                    </div>
                    <div className="text">
                      <h4> رقم الهاتف :</h4>
                      <a target="_blank" href="tel:+0123456789">
                        +0123456789
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 p-2" data-aos="fade-up">
              <form action="">
                <div className="form-group">
                  <div className="inputfield">
                    <label htmlFor="name">الإسم</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                    />
                    <span className="highlight"></span>
                  </div>

                  <div className="inputfield">
                    <label htmlFor="email">البريد الالكتروني</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                    />
                    <span className="highlight"></span>
                  </div>
                </div>

                <div className="form-group">
                  <div className="inputfield">
                    <label htmlFor="phone">رقم الهاتف</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                    />
                    <span className="highlight"></span>
                  </div>

                  <div className="inputfield">
                    <label htmlFor="subject">الموضوع</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                    />
                    <span className="highlight"></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="inputfield">
                    <label htmlFor="message" className="message-label">
                      رسالتك
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                    ></textarea>
                    <span className="highlight"></span>
                  </div>
                </div>

                <button type="submit" className="customBtn">
                  إرسال
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
