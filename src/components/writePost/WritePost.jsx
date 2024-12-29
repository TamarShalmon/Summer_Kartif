"use client"
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Fredoka } from 'next/font/google'
import CategoryFields from '../categoryFields/CategoryFields';
import ImageUpload from '../imageUpload/ImageUpload';
import { regions } from '../../constants/data';


const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-fredoka',
})

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  // Basic post data
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [region, setRegion] = useState("");

  // Images state
  const [images, setImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // UI state
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);

  // Professional fields
  const [professional, setProfessional] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [contactDetails, setContactDetails] = useState("");

  // Activity fields
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

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    router.refresh("/");
  }
  const validateForm = () => {
    if (!title.trim()) {
      setError("** יש להזין כותרת");
      return false;
    }
    if (!catSlug) {
      setError("** יש לבחור קטגוריה");
      return false;
    }
    if (!value.trim()) {
      setError("** יש להזין תוכן");
      return false;
    }
    if (!region) {
      setError("** יש לבחור אזור");
      return false;
    }
    if (catSlug === "בעלי מקצוע" && !professional) {
      setError("** יש לבחור בעל מקצוע");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    try {
      const postData = {
        title,
        desc: value,
        mainImage: images[mainImageIndex]?.url,
        additionalImages: images.map(img => img.url),
        slug: title,
        catSlug,
        region,
        professional: catSlug === "בעלי מקצוע" ? professional : undefined,
        entryFee,
        parking,
        shadedSeating,
        waterDepth,
        recommendedGear,
        difficulty,
        duration,
        season,
        contactDetails,
        serviceType,
        serviceCost,
      };

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setSuccessMessage("ההמלצה מתפרסמת, אנא המתן");
      router.push(`/posts/${data.slug}`);
      router.refresh();

    } catch (error) {
      console.error("Error creating post:", error);
      setError("אירעה שגיאה בעת יצירת הפוסט. נא לנסות שוב.");
    }
  };

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

        <CategoryFields
          catSlug={catSlug}
          professional={professional}
          setProfessional={setProfessional}
          season={season}
          setSeason={setSeason}
          waterDepth={waterDepth}
          setWaterDepth={setWaterDepth}
          shadedSeating={shadedSeating}
          setShadedSeating={setShadedSeating}
          recommendedGear={recommendedGear}
          setRecommendedGear={setRecommendedGear}
          entryFee={entryFee}
          setEntryFee={setEntryFee}
          parking={parking}
          setParking={setParking}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          duration={duration}
          setDuration={setDuration}
          contactDetails={contactDetails}
          setContactDetails={setContactDetails}
          serviceType={serviceType}
          setServiceType={setServiceType}
          serviceCost={serviceCost}
          setServiceCost={setServiceCost}
        />


        <div className={styles.editor}>
          <textarea
            className={styles.textArea}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="על מה תמליצו?"
          />
        </div>

        <ImageUpload
          images={images}
          setImages={setImages}
          mainImageIndex={mainImageIndex}
          setMainImageIndex={setMainImageIndex}
        />

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
