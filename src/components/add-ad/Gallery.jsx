import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function Gallery({ formData, setFormData, setForm }) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const { t } = useTranslation();

  const handleImagesChange = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  const handleRemoveImage = (index, image) => {
    if (image.id) {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
        delete_images: [...prevState.delete_images, image.id],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
      }));
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    const audioChunks = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorderInstance = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderInstance.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorderInstance.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/m4a" });

        setFormData((prevState) => ({
          ...prevState,
          audio: audioBlob,
          delete_audio: 0,
        }));

        mediaRecorderInstance.stream.getTracks().forEach((track) => {
          track.stop();
        });

        setIsRecording(false);
      };

      mediaRecorderInstance.start();
      setMediaRecorder(mediaRecorderInstance);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
  };

  const handleGetNextPage = (e) => {
    e.preventDefault();
    if (formData?.images?.length > 0) {
      if (!formData?.video) {
        setForm("pricing-contact");
      } else {
        if (formData?.cover) {
          setForm("pricing-contact");
        } else {
          toast.error(t("fillAllRequiredFields"));
        }
      }
    } else {
      toast.error(t("fillAllRequiredFields"));
    }
  };

  return (
    <div className="row w-100">
      {/* main image */}
      <div className="col-lg-6 col-12 p-2">
        <div className="input-field">
          <label htmlFor="certificate-image" className="label-with-hint">
            {t("ads.main_imageHint")}{" "}
            <span>( {t("ads.main_imageHintDescription")} )</span>
          </label>
          <label className="video_upload">
            <input
              type="file"
              id="cover"
              accept="image/*"
              name="cover"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  cover: e.target.files[0],
                }))
              }
            />
            {formData?.cover ? (
              <>
                <img
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  src={
                    formData?.cover?.type?.startsWith("image")
                      ? URL.createObjectURL(formData?.cover)
                      : formData?.cover
                  }
                  alt="upload"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData({
                      ...formData,
                      cover: "",
                    });
                  }}
                >
                  <i className="fa-light fa-xmark"></i>
                </button>
              </>
            ) : (
              <img src="/images/gallery.svg" alt="upload" />
            )}
          </label>
        </div>
      </div>
      {/* video */}
      <div className="col-lg-6 col-12 p-2">
        <div className="input-field">
          <label htmlFor="certificate-image" className="label-with-hint">
            {t("ads.video")} <span>{t("ads.videoHint")}</span>
          </label>

          <label className="video_upload">
            <input
              type="file"
              id="video"
              accept="video/*"
              name="video"
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  video: e.target.files[0],
                  delete_video: 0,
                }));
              }}
            />
            {formData.video ? (
              <>
                <video
                  src={
                    formData.video?.type?.startsWith("video")
                      ? URL.createObjectURL(formData.video)
                      : formData.video
                  }
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    setFormData({
                      ...formData,
                      delete_video: 1,
                      video: "",
                      cover: "",
                    });
                  }}
                >
                  <i className="fa-light fa-xmark"></i>
                </button>
              </>
            ) : (
              <img src="/images/video.svg" alt="upload" />
            )}
          </label>
        </div>
      </div>
      {/* images */}
      <div className="col-12 p-2">
        <div className="input-field">
          <label htmlFor="certificate-image" className="label-with-hint">
            {t("ads.images")} <span>{t("ads.imagesHint")}</span>
          </label>
          <div className="images_grid_upload">
            <div className="file_upload">
              <label htmlFor="file_upload">
                <input
                  type="file"
                  id="file_upload"
                  accept="image/*"
                  name="images"
                  multiple
                  onChange={handleImagesChange}
                />
                <img src="/images/gallery.svg" alt="upload" />
                <div className="file_upload_dimensions"></div>
              </label>
            </div>
            {formData?.images && (
              <>
                {formData?.images?.map((image, index) => (
                  <div className="uploaded_file" key={index}>
                    <img
                      src={
                        image?.type?.startsWith("image/")
                          ? URL.createObjectURL(image)
                          : image?.image
                      }
                      alt="file"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveImage(index, image);
                      }}
                    >
                      <i className="fa-light fa-xmark"></i>
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {/* audio */}
      <div className="col-12 p-2">
        <div className="input-field">
          <label htmlFor="audio">{t("ads.audio")}</label>
          <div className="d-flex gap-3 align-items-center">
            <div
              className="record_btn"
              onClick={isRecording ? stopRecording : startRecording}
            >
              <img
                src={isRecording ? "/images/stop.svg" : "/images/record.svg"}
                alt="record"
              />
            </div>
            {formData.audio && (
              <audio
                src={URL.createObjectURL(formData.audio)}
                controls
                className="w-100"
              />
            )}
            {formData.audio && (
              <div
                className="delete_btn"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    audio: "",
                    delete_audio: 1,
                  }))
                }
              >
                <i className="fa-light fa-trash"></i>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ** */}
      <div className="col-12 p-2">
        <div className="btns">
          <button
            className="wizard_btn prev"
            onClick={(e) => {
              e.preventDefault();
              setForm("location");
            }}
          >
            <i className="fa-regular fa-angle-right"></i> {t("ads.previous")}
          </button>
          <button className="wizard_btn next" onClick={handleGetNextPage}>
            {t("ads.next")} <i className="fa-regular fa-angle-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
