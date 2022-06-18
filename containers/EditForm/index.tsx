import React, { useState } from 'react'
import Button from '../../components/Button'
import { colorTemplate } from '../../untils/contants'
import styles from './editForm.module.scss'

interface EditFormProps {
  setShowEditForm?: Function,
  previewUrl: String,
  removedUrl: String
}

const EditForm: React.FC<EditFormProps> = ({ setShowEditForm, previewUrl, removedUrl }) => {
  const [originalMode, setOriginalMode] = useState<boolean>(false)
  const [transformedMode, setTransformedMode] = useState<boolean>(true)
  const [bgOptions, setBgOptions] = useState<string>('image')
  const [bgColor, setBgColor] = useState<string>('')

  const closeEditForm = () => {
    if(setShowEditForm) {
      setShowEditForm(false)
    }
  }

  const toggleMode = () => {
    setOriginalMode(!originalMode)
    setTransformedMode(!transformedMode)
  }

  const toggleImg = () => {
    if(originalMode) {
      return previewUrl
    } else {
      return removedUrl
    }
  }

  const updateBG = (color: string) => {
    setBgColor(color)
  }

  const downLoad = () => {
    const image = document.getElementById("preview_img") as any

    const toDataURL = (image: any) => {
        const canvas = document.createElement('canvas') as any
        const ctx = canvas.getContext('2d')
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight

        if (bgColor) {
          ctx.fillStyle = bgColor
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
        ctx.drawImage(image, 0, 0)
        const dataURL = canvas.toDataURL()

        //DOWNLOAD
        const link = document.createElement('a');
        link.download = 'change_bg.png';
        link.href = dataURL
        link.click()
    }
    if (image.complete) toDataURL(image)
    else image.onload = toDataURL
  }

  return (
    <div className={styles.edit}>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <div className={styles.tabs}>
            <div className={`${styles.tab} ${originalMode && styles.active}`} onClick={toggleMode}>
              Original
            </div>
            <div className={`${styles.tab} ${transformedMode && styles.active}`} onClick={toggleMode}>
              Transformed
            </div>
          </div>
          <div className={styles.preview}>
            <img 
              src={'' + toggleImg()} alt="preview images" 
              style={{backgroundColor: bgColor, backgroundImage: bgColor && 'none'}}
              className={`${transformedMode && styles.transform}`}
              id='preview_img' />
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
              className={`${styles.option} ${bgOptions === 'image' && styles.active}`}
              onClick={() => setBgOptions('image')}
            >
              Image
            </div>
            <div 
              className={`${styles.option} ${bgOptions === 'color' && styles.active}`}
              onClick={() => setBgOptions('color')}
            >
              Color
            </div>
          </div>
          <div className={styles.features}>
            {
              bgOptions === 'color' ? 
              <div className={styles.colors}>
                {
                  colorTemplate.map((background) =>
                    <div 
                      className={styles.color} key={background.color}
                      onClick={() => updateBG(background.color)}
                    >
                      <img 
                        src={'' + removedUrl} alt="remove background color" 
                        style={{backgroundColor: background.color}}
                      />
                    </div>
                  )
                }
              </div>
              :
              <h1>Image</h1>
            }
          </div>
        </div>
        <div className={styles.close} onClick={closeEditForm}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
            <path fill="var(--primary)" d="M10.243.343L6 4.586 1.757.343A1 1 0 00.343 1.757L4.586 6 .343 10.243a1 1 0 001.414 1.414L6 7.414l4.243 4.243a1 1 0 001.414-1.414L7.414 6l4.243-4.243A1 1 0 1010.243.343z">
            </path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default EditForm