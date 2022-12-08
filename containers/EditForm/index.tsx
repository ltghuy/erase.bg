import React, { useState } from "react";
import { colorTemplate, backgroundTemplate } from "../../untils/contants";
import { getDate } from "../../untils/date";
import Button from "../../components/Button";
import UploadIcon from '../../public/images/upload-image.svg';
import styles from "./editForm.module.scss";

interface EditFormProps {
  setShowEditForm?: (show: boolean) => void;
  previewUrl: String;
  removedUrl: String;
}
interface BackdropItem {
  id: number;
  src: String;
}

const EditForm: React.FC<EditFormProps> = ({
  setShowEditForm,
  previewUrl,
  removedUrl,
}) => {
  const [originalMode, setOriginalMode] = useState<boolean>(false);
  const [transformedMode, setTransformedMode] = useState<boolean>(true);
  const [bgOptions, setBgOptions] = useState<"color" | "image">("image");
  const [bgColor, setBgColor] = useState<string>("");
  const [bgImg, setBgImg] = useState<string>("");
  const [backdropList, setBackdropList] = useState<BackdropItem[]>([]);

  const closeEditForm = () => {
    if (setShowEditForm) {
      setShowEditForm(false);
    }
  };

  const toggleMode = () => {
    setOriginalMode(!originalMode);
    setTransformedMode(!transformedMode);
  };

  const toggleImg = () => {
    if (originalMode) {
      return previewUrl;
    } else {
      return removedUrl;
    }
  };

  const updateBgColor = (color: string) => {
    setBgColor(color);
    setBgImg("");
  };

  const updateBackdrops = (backdrop: BackdropItem[]) => {
    setBackdropList(backdrop);
  };

  const downLoad = () => {
    const image = document.getElementById("preview_img") as any;

    const toDataURL = (image: any) => {
      const canvas = document.createElement("canvas") as any;
      const ctx = canvas.getContext("2d");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      if (bgColor) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
      }

      if (bgImg) {
        const background = document.createElement("img") as any;
        background.src = bgImg;
        background.setAttribute(
          "style",
          "width: 100%; height: 100%; object-fit: cover;"
        );
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
      }

      const dataURL = canvas.toDataURL();

      //DOWNLOAD
      const link = document.createElement("a");
      link.download = `${getDate()}.png`;
      link.href = dataURL;
      link.click();
    };
    if (image.complete) toDataURL(image);
    else image.onload = toDataURL;
  };

  const handleFileOpen = () => {
    const input = document.createElement('input') as HTMLInputElement;
    input.type = 'file';
    input.onchange = function (e: any) {
      const url = URL.createObjectURL(e.target.files[0]);
      setBgImg("" + url);
      setBgColor("");
    }
    input.click();
  }

  return (
    <div className={styles.edit}>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <div className={styles.tabs}>
            <div
              className={`${styles.tab} ${originalMode && styles.active}`}
              onClick={toggleMode}
            >
              Original
            </div>
            <div
              className={`${styles.tab} ${transformedMode && styles.active}`}
              onClick={toggleMode}
            >
              Transformed
            </div>
          </div>
          <div className={styles.preview}>
            <img
              src={"" + toggleImg()}
              alt="preview images"
              style={{
                backgroundColor: bgColor,
                backgroundImage: bgImg ? `url(${bgImg}` : "none",
              }}
              id="preview_img"
            />
          </div>
          <div className={styles.download}>
            <Button handClick={downLoad} downLoad>
              <img src="/images/download.svg" alt="download icon" />
              Download
            </Button>
          </div>
        </div>
        <div className={styles.backgrounds}>
          <div className={styles.options}>
            <div
              className={`${styles.option} ${bgOptions === "image" && styles.active
                }`}
              onClick={() => setBgOptions("image")}
            >
              Image
            </div>
            <div
              className={`${styles.option} ${bgOptions === "color" && styles.active
                }`}
              onClick={() => setBgOptions("color")}
            >
              Color
            </div>
          </div>
          <div className={styles.features}>
            {bgOptions === "color" ? (
              <div className={styles.colors}>
                <div className={styles.colors__picker}>
                  <img src="/images/color-picker.svg" alt="color picker" />
                  <input
                    type="color"
                    onChange={(e: any) => {
                      updateBgColor(e.target.value);
                    }}
                  />
                </div>
                {colorTemplate.map((background) => (
                  <div
                    className={styles.color}
                    key={background.color}
                    onClick={() => updateBgColor(background.color)}
                  >
                    <img
                      src={"" + removedUrl}
                      alt="remove background color"
                      style={{ backgroundColor: background.color }}
                    />
                  </div>
                ))}
              </div>
            ) : 
            (
              <div className={styles.backdrops}>
                <div className={styles.upload_image} onClick={handleFileOpen}>
                  <UploadIcon />
                </div>
                {backgroundTemplate.map((background) => (
                  <div className={styles.item} key={background.id}>
                    <img src={background.thumnail} alt="backdrops option" />
                    <div
                      className={styles.title}
                      onClick={() =>
                        updateBackdrops(background.childrens as BackdropItem[])
                      }
                    >
                      {background.title}
                    </div>
                  </div>
                ))}
                {backdropList.length > 0 && (
                  <>
                    <button
                      className={styles.back}
                      onClick={() => setBackdropList([])}
                    >
                      Back
                    </button>
                    <div className={styles.backdrops__list}>
                      {backdropList.map((backdrop) => (
                        <div
                          className={styles.backdrops__item}
                          key={backdrop.id}
                          onClick={() => {
                            setBgImg("" + backdrop.src);
                            setBgColor("");
                          }}
                        >
                          <img
                            src={"" + removedUrl}
                            style={{ backgroundImage: `url(${backdrop.src})` }}
                            alt="backdrops option"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.close} onClick={closeEditForm}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
    </div>
  );
};

export default EditForm;
