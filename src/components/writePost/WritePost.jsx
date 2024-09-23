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

  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  const [images, setImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const [categories, setCategories] = useState([]);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [region, setRegion] = useState("");
  const [regions, setRegions] = useState([]);

  const [entryFee, setEntryFee] = useState("");
  const [parking, setParking] = useState("");
  const [shadedSeating, setShadedSeating] = useState("");
  const [waterDepth, setWaterDepth] = useState("");
  const [recommendedGear, setRecommendedGear] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch regions or use a predefined list
    setRegions([
      "כרמי קטיף והסביבה 😎",
      "חרמון גולן ועמק החולה",
      "גליל עליון וגליל מערבי",
      "גליל תחתון",
      "חיפה והכרמל",
      "עמק יזרעאל ועמק המעיינות",
      "בנימין שומרון ובקעת הירדן",
      "השרון",
      "גוש דן ומישור החוף הדרומי",
      "ירושלים והסביבה",
      "מדבר יהודה וים המלח",
      "נגב",
      "מצפה רמון והערבה",
      "אילת",
    ]);
  }, []);

  useEffect(() => {
    const uploadToCloudinary = async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset");


      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
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
    setError("");
    setSuccessMessage("");

    if (!title.trim()) {
      setError("** יש להזין כותרת");
      return;
    }
    if (!catSlug) {
      setError("** יש לבחור קטגוריה");
      return;
    }
    if (!value.trim()) {
      setError("** יש להזין תוכן");
      return;
    }

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
          catSlug,
          region,
          entryFee,
          parking,
          shadedSeating,
          waterDepth,
          recommendedGear,
          difficulty,
          duration,
          season,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setSuccessMessage("ההמלצה מתפרסמת, אנא המתן");
      // console.log("Post created:", data);
      router.push(`/posts/${data.slug}`);
      router.refresh();


    } catch (error) {
      console.error("Error creating post:", error);
      setError("אירעה שגיאה בעת יצירת הפוסט. נא לנסות שוב.");
    }
  };

  const renderCategorySpecificFields = () => {
    switch (catSlug) {
      case "מעיינות":
        return (
          <>
            <input className={styles.select} type="text" placeholder="באיזו עונה טיילתם?" value={season} onChange={(e) => setSeason(e.target.value)} />
            <input className={styles.select} type="text" placeholder="מה עומק המים?" value={waterDepth} onChange={(e) => setWaterDepth(e.target.value)} />
            <input className={styles.select} type="text" placeholder="האם יש מקומות ישיבה מוצלים?" value={shadedSeating} onChange={(e) => setShadedSeating(e.target.value)} />
            <input className={styles.select} type="text" placeholder="איזה ציוד הייתם ממליצים להביא?" value={recommendedGear} onChange={(e) => setRecommendedGear(e.target.value)} />
            <input className={styles.select} type="text" placeholder="כניסה בתשלום? כמה?" value={entryFee} onChange={(e) => setEntryFee(e.target.value)} />
            <input className={styles.select} type="text" placeholder="הסדרי חניה" value={parking} onChange={(e) => setParking(e.target.value)} />
          </>
        );
      case "מסלולי טיול":
        return (
          <>
            <input className={styles.select} type="text" placeholder="דרגת קושי, מתאים למשפחות?" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
            <input className={styles.select} type="text" placeholder="משך המסלול" value={duration} onChange={(e) => setDuration(e.target.value)} />
            <input className={styles.select} type="text" placeholder="באיזו עונה טיילתם?" value={season} onChange={(e) => setSeason(e.target.value)} />
            <input className={styles.select} type="text" placeholder="איזה ציוד הייתם ממליצים להביא?" value={recommendedGear} onChange={(e) => setRecommendedGear(e.target.value)} />
            <input className={styles.select} type="text" placeholder="הכניסה בתשלום? כמה?" value={entryFee} onChange={(e) => setEntryFee(e.target.value)} />
            <input className={styles.select} type="text" placeholder="הסדרי חניה" value={parking} onChange={(e) => setParking(e.target.value)} />
          </>
        );
      case "תערוכות":
      case "אטרקציות":
        return (
          <>
            <input className={styles.select} type="text" placeholder="לאיזה טווח גילאים מתאים?" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
            <input className={styles.select} type="text" placeholder="כניסה בתשלום? כמה?" value={entryFee} onChange={(e) => setEntryFee(e.target.value)} />
            <input className={styles.select} type="text" placeholder="הסדרי חניה" value={parking} onChange={(e) => setParking(e.target.value)} />
          </>
        );
      case "קטיף":
        return (
          <>
            <input className={styles.select} type="text" placeholder="באיזו עונה טיילתם?" value={season} onChange={(e) => setSeason(e.target.value)} />
            <input className={styles.select} type="text" placeholder="כניסה בתשלום? כמה?" value={entryFee} onChange={(e) => setEntryFee(e.target.value)} />
            <input className={styles.select} type="text" placeholder="הסדרי חניה" value={parking} onChange={(e) => setParking(e.target.value)} />
          </>
        );
      default:
        return null;
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


  // console.log(title)


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
          value={catSlug}
          required
        >
          <option value="">בחרו קטגוריה</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.title}
            </option>
          ))}
        </select>


        <select
          className={styles.select}
          onChange={(e) => setRegion(e.target.value)}
          value={region}
          required
        >
          <option value="">בחרו אזור</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {renderCategorySpecificFields()}

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
            {<strong>צרפו תמונות</strong>}
            {<span> (עד 10mb לכל תמונה) </span>}
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

        {error && <div className={styles.error}>{error}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}

        <button className={styles.publish} onClick={handleSubmit}>
          פרסום המלצה
        </button>
      </div>
    </div>

  );
};

export default WritePage;
