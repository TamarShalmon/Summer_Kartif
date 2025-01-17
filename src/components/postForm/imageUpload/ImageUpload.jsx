import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import styles from './ImageUpload.module.css';

const ImageUpload = ({ 
  images, 
  setImages, 
  mainImageIndex, 
  setMainImageIndex 
}) => {
  const handleImageUpload = (result) => {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const public_id = info.public_id;
      setImages(prev => [...prev, { url, public_id }]);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (mainImageIndex === index) {
      setMainImageIndex(0);
    } else if (mainImageIndex > index) {
      setMainImageIndex(prev => prev - 1);
    }
  };

  return (
    <div className={styles.imageUploadSection}>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleImageUpload}
        className={styles.uploadButton}
      >
        <strong>צרפו תמונות</strong>
        <span> (עד 10mb לכל תמונה) </span>
      </CldUploadButton>

      <div className={styles.imagePreviewContainer}>
        {images.map((image, index) => (
          <div 
            key={image.public_id || index} 
            className={`${styles.imagePreview} ${index === mainImageIndex ? styles.mainImage : ''}`}
          >
            <Image src={image.url} alt="" width={100} height={100} />
            <div className={styles.imageControls}>
              <button 
                className={styles.removeButton}
                onClick={() => removeImage(index)}
              >
                מחק
              </button>
              <button 
                className={`${styles.mainButton} ${index === mainImageIndex ? styles.isMain : ''}`}
                onClick={() => setMainImageIndex(index)} 
                disabled={index === mainImageIndex}
              >
                {index === mainImageIndex ? 'תמונה ראשית' : 'הגדר כראשית'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;