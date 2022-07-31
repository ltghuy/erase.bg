import React, { useState, useRef } from "react";
import Button from "../../components/Button";
import { previewList } from "../../untils/contants";
import Loading from "../../components/Loading";

import axios from "axios";
import styles from "./upload_form.module.scss";
import EditForm from "../EditForm";

const UploadForm = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [removedUrl, setRemovedUrl] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const haveResponeRef = useRef<any>(null);

  const handleTryPreview = (img: any) => {
    setPreviewUrl(img.preview);
    setShowPreview(true);
    setShowLoading(true);

    const body = {
      image_url: img.preview,
    };
    axios({
      method: "post",
      url: "https://api.baseline.is/v1/background-remover/",
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    })
      .then(function (response) {
        //handle success
        setShowLoading(false);
        if (haveResponeRef && haveResponeRef.current) {
          haveResponeRef.current.classList.add("show");
        }

        const removed_image = document.getElementById("removed_image") as any;
        removed_image.setAttribute(
          "src",
          "data:image/jpg;base64," + response.data.content
        );
        setRemovedUrl(removed_image.src);
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const getBase64 = (file: any) =>
    new Promise(function (resolve, reject) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImportFile = (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image_file", file);

    getBase64(file)
      .then((result: any) => {
        setPreviewUrl(result);
      })
      .catch((e) => console.log(e));

    setPreviewUrl(e.target.files[0].name);
    setShowPreview(true);
    setShowLoading(true);

    axios({
      method: "post",
      url: "https://api.baseline.is/v1/background-remover/",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    })
      .then(function (response) {
        //handle success
        setShowLoading(false);
        if (haveResponeRef && haveResponeRef.current) {
          haveResponeRef.current.classList.add("show");
        }

        const removed_image = document.getElementById("removed_image") as any;
        removed_image.setAttribute(
          "src",
          "data:image/jpg;base64," + response.data.content
        );
        setRemovedUrl(removed_image.src);
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  const downloadImg = (e: any) => {
    e.preventDefault();
    const downloadLink = document.createElement("a");
    downloadLink.href = removedUrl;
    downloadLink.download = "remove_background.png";
    downloadLink.click();
  };

  return (
    <div className={styles.upload}>
      {!showPreview && (
        <h1 className={styles.upload__heading}>
          Upload an image to remove background
        </h1>
      )}
      <div className={styles.upload__form}>
        <div className={styles.upload__btn}>
          <Button size="large" handleRemove={handleImportFile}>
            <img
              src="/images/upload.svg"
              alt="icon"
              className={styles.btn_icon}
            />
            Upload Image
          </Button>
        </div>
        <p style={{ padding: "12px" }}>
          or drop image anywhere (upto resolution 5,000 x 5,000 px)
        </p>
        <p>
          Paste image or <a href="/">URL</a> <span>Ctrl</span> + <span>V</span>
        </p>
        <p className={styles.upload__format}>
          Supported formats: <span>png</span> <span>jpeg</span> <span>jpg</span>{" "}
          <span>webp</span>
        </p>
      </div>
      {!showPreview && (
        <>
          <h3 style={{ margin: "40px 0px 20px" }}>No Image?</h3>
          <p>Try one of these</p>
          <div className={styles.upload__test}>
            {previewList.map((img) => {
              return (
                <img
                  src={img.src}
                  key={img.id}
                  onClick={() => handleTryPreview(img)}
                />
              );
            })}
          </div>
        </>
      )}
      {showPreview && (
        <div className={styles.upload__preview}>
          <div className={styles.content} ref={haveResponeRef}>
            <div className={styles.wrapper}>
              <div className={styles.photo}>
                <div className={styles.top}>
                  <h3>Original</h3>
                </div>
                <div className={styles.image}>
                  <img
                    src={localStorage.getItem("sourceImg") || previewUrl}
                    alt="original photos"
                  />
                </div>
              </div>
              <div className={`${styles.photo} ${styles.removed}`}>
                <div className={styles.top}>
                  <h3>Background Removed</h3>
                  <div
                    className={styles.edit_btn}
                    onClick={() => setShowEditForm(true)}
                  >
                    <img src="/images/edit.svg" alt="edit icon" />
                    Edit
                  </div>
                </div>
                <div className={styles.image}>
                  <img
                    src=""
                    alt="background removed photos"
                    id="removed_image"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "30px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Button size="medium" handClick={downloadImg} downLoad>
                Download Image
              </Button>
              <div
                className={styles.mobile_edit_btn}
                onClick={() => setShowEditForm(true)}
              >
                <img src="/images/edit.svg" alt="edit icon" />
                Edit
              </div>
            </div>
            <div className={styles.close} onClick={handleClosePreview}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  fill="var(--primary)"
                  d="M10.243.343L6 4.586 1.757.343A1 1 0 00.343 1.757L4.586 6 .343 10.243a1 1 0 001.414 1.414L6 7.414l4.243 4.243a1 1 0 001.414-1.414L7.414 6l4.243-4.243A1 1 0 1010.243.343z"
                ></path>
              </svg>
            </div>
          </div>
          {showLoading && <Loading />}
          {showEditForm && (
            <EditForm
              setShowEditForm={setShowEditForm}
              previewUrl={previewUrl}
              removedUrl={removedUrl}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
