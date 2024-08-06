"use client"
import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import { CldUploadButton } from "next-cloudinary"


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
  }


  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");


  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        mainImage: images[mainImageIndex]?.url,
        additionalImages: images.map(img => img.url),
        slug: slugify(title),
        catSlug: catSlug || "style", // If not selected, choose the general category
      }),
    });


    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
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



  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.editor}>

        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />

      </div>


      <div className={styles.imageUploadSection}>
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleImageUpload}
        >
          Upload Image
        </CldUploadButton>


        <div className={styles.imagePreviewContainer}>
          {images.map((image, index) => (
            <div key={image.public_id} className={styles.imagePreview}>
              <Image src={image.url} alt="" width={100} height={100} />
              <button onClick={() => removeImage(index)}>Remove</button>
              <button onClick={() => setMainImage(index)} disabled={index === mainImageIndex}>
                {index === mainImageIndex ? 'Main Image' : 'Set as Main'}
              </button>
            </div>
          ))}
        </div>
      </div>


      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;

