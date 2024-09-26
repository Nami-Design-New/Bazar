import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import SectionHeader from "./../ui/layout/SectionHeader";
import axios from "./../utils/axios";

function Contact() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function highlight(e) {
    e.target.previousElementSibling.classList.add("h");
  }

  function dehighlight(e) {
    if (e.target.value === "") {
      e.target.previousElementSibling.classList.remove("h");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/contact_us", formData);
      if (res.data.code === 200) {
        toast.success(t("messageSentSuccessfuly"));
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      }
    } catch (error) {
      toast.error(t("errorContacted"));
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SectionHeader />
      <section className="contact_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 p-2">
              <div className="contact_info">
                <h3> {t("contact.keepinTouch")} </h3>
                <img src="/images/contact-ill.svg" alt="contact" />
              </div>
            </div>
            <div className="col-lg-8 p-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="inputfield">
                    <label htmlFor="name">{t("contact.name")}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <span className="highlight"></span>
                  </div>

                  <div className="inputfield">
                    <label htmlFor="email">{t("contact.email")}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                    />
                    <span className="highlight"></span>
                  </div>
                </div>

                <div className="form-group">
                  <div className="inputfield">
                    <label htmlFor="phone">{t("contact.phone")}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                    />
                    <span className="highlight"></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="inputfield">
                    <label htmlFor="message" className="message-label">
                      {t("contact.message")}
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                    ></textarea>
                    <span className="highlight"></span>
                  </div>
                </div>
                <button type="submit" className="customBtn" disabled={loading}>
                  {t("contact.send")}{" "}
                  {loading && <i className="fa fa-spinner fa-spin"></i>}
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
