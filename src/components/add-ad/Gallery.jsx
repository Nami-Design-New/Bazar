import { useState } from "react";

function Gallery({ formData, setFormData, setForm }) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleImagesChange = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages]
    }));
  };

  const handleRemoveImage = (index, image) => {
    if (image.id) {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
        delete_images: [...prevState.delete_images, image.id]
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index)
      }));
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    const audioChunks = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorderInstance = new MediaRecorder(stream, {
        mimeType: "audio/webm"
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
          audio: audioBlob
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

  return (
    <div className="row w-100">
      {/* main image */}
      <div className="col-lg-6 col-12 p-2">
        <div className="input-field">
          <label htmlFor="certificate-image">الصورة الرئيسية</label>
          <label className="video_upload">
            <input
              type="file"
              id="cover"
              accept="image/*"
              name="cover"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  cover: e.target.files[0]
                }))
              }
            />
            {formData?.cover ? (
              <img
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                src={URL.createObjectURL(formData?.cover)}
                alt="upload"
              />
            ) : (
              <img src="/images/gallery.svg" alt="upload" />
            )}
          </label>
        </div>
      </div>
      {/* video */}
      <div className="col-lg-6 col-12 p-2">
        <div className="input-field">
          <label htmlFor="certificate-image">
            فيديو الاعلان <span>( الحد الأقصى 10 MB )</span>
          </label>

          <label className="video_upload">
            <input
              type="file"
              id="video"
              accept="video/*"
              name="video"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  video: e.target.files[0]
                }))
              }
            />
            {formData.video ? (
              <video
                src={URL.createObjectURL(formData.video)}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img src="/images/video.svg" alt="upload" />
            )}
          </label>
        </div>
      </div>
      {/* images */}
      <div className="col-12 p-2">
        <div className="input-field">
          <label htmlFor="certificate-image">
            صور الاعلان <span>( الحد الأقصى 10 صور )</span>
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
          <label htmlFor="audio">الوصف الصوتى للإعلان</label>
          <div className="d-flex gap-3 align-items-center">
            <div
              className="record_btn"
              onClick={isRecording ? stopRecording : startRecording}
            >
              <img
                src={
                  isRecording ? "/images/stop.svg" : "/images/record.svg"
                }
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
                  setFormData((prev) => ({ ...prev, audio: null }))
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
            <i className="fa-regular fa-angle-right"></i> السابق
          </button>
          <button
            className="wizard_btn next"
            onClick={(e) => {
              e.preventDefault();
              setForm("pricing-contact");
            }}
          >
            التالى <i className="fa-regular fa-angle-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
