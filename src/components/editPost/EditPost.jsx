"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Fredoka } from 'next/font/google';
import styles from "./editPost.module.css";
import { regions } from '../../constants/data';
import CategoryFields from '../../components/categoryFields/CategoryFields';
import ImageUpload from '../../components/imageUpload/ImageUpload';

const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-fredoka',
});

const EditPost = ({ post }) => {
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

    // Initialize form with post data
    useEffect(() => {
        setTitle(post.title || "");
        setValue(post.desc || "");
        setCatSlug(post.catSlug || "");
        setRegion(post.region || "");
        setImages(post.additionalImages?.map(url => ({ url })) || []);
        setMainImageIndex(post.mainImageIndex || 0);
        setProfessional(post.professional || "");
        setEntryFee(post.entryFee || "");
        setParking(post.parking || "");
        setShadedSeating(post.shadedSeating || "");
        setWaterDepth(post.waterDepth || "");
        setRecommendedGear(post.recommendedGear || "");
        setDifficulty(post.difficulty || "");
        setDuration(post.duration || "");
        setSeason(post.season || "");
        setServiceCost(post.serviceCost || "");
        setServiceType(post.serviceType || "");
        setContactDetails(post.contactDetails || "");
    }, [post]);

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
                catSlug,
                region,
                professional: catSlug === "בעלי מקצוע" ? professional : undefined,
                postId: post.id,
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

            const res = await fetch(`/api/posts/${post.slug}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setSuccessMessage("ההמלצה מתעדכנת, אנא המתן");
            // console.log("Post updated:", data);
            router.push(`/posts/${data.slug}`);
            router.refresh();

        } catch (error) {
            console.error("Error updating post:", error);
            setError("אירעה שגיאה בעת עדכון הפוסט. נא לנסות שוב.");
        }
    };

    const handleCancel = () => {
        router.push("/userDashboard");
    };

    return (
        <div className={fredoka.className}>
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="תנו כותרת"
                    className={styles.input}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <select
                    className={styles.select}
                    onChange={(e) => setCatSlug(e.target.value)}
                    value={catSlug}
                    required
                >
                    <option value="">בחר קטגוריה</option>
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
                    <option value="">בחר אזור</option>
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

                <div className={styles.buttonContainer}>
                    <button className={styles.publish} onClick={handleSubmit}>
                        עדכן המלצה
                    </button>
                    <button className={styles.cancel} onClick={handleCancel}>
                        ביטול עריכה
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPost;