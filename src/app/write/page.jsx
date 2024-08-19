"use client"
import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary"
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-fredoka',
})


const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");


  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");


  const [images, setImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    const uploadToCloudinary = async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset"); // Set your upload preset


      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Use your Cloudinary cloud name
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setMedia(data.secure_url);
      } catch (error) {
        console.error("Error uploading to Cloudinary", error);
      }
    };


    if (file) {
      uploadToCloudinary();
    }
  }, [file]);


  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }


  if (status === "unauthenticated") {
    router.push("/");
    router.refresh("/");
  }


  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");


  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc: value,
          mainImage: images[mainImageIndex]?.url,
          additionalImages: images.map(img => img.url),
          slug: title,
          catSlug: catSlug || "לאכול בחוץ", // If not selected, choose the general category
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Post created:", data);  // Log the response
      router.push(`/posts/${data.slug}`);
      router.refresh("/")

    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

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



  const setMainImage = (index) => {
    setMainImageIndex(index);
  };


  console.log(title)
  return (
    <div className={fredoka.className}>
    <div className={styles.container}>
      <input
        type="text"
        placeholder="תנו כותרת"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="בריכות">בריכות</option>
        <option value="מעיינות">מעיינות</option>
        <option value="אטרקציות">אטרקציות</option>
        <option value="קטיף">קטיף</option>
        <option value="לאכול בחוץ">לאכול בחוץ</option>
        <option value="תערוכות">תערוכות</option>
        <option value="מסלולים">מסלולים</option>

      </select>
      <div className={styles.editor}>

        <textarea
          className={styles.textArea}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="על מה תמליצו?"
        />

      </div>


      <div className={styles.imageUploadSection}>
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleImageUpload}
          className={styles.uploadButton}
        >
          צרפו תמונות
        </CldUploadButton>


        <div className={styles.imagePreviewContainer}>
          {images.map((image, index) => (
            <div key={image.public_id} className={styles.imagePreview}>
              <Image src={image.url} alt="" width={100} height={100} />
              <button onClick={() => removeImage(index)}>מחק</button>
              <button onClick={() => setMainImage(index)} disabled={index === mainImageIndex}>
                {index === mainImageIndex ? 'תמונה ראשית ' : 'הגדר כראשית'}
              </button>
            </div>
          ))}
        </div>
      </div>


      <button className={styles.publish} onClick={handleSubmit}>
        פרסם המלצה
      </button>
    </div>
    </div>

  );
};

export default WritePage;
