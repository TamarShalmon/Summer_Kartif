"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Fredoka } from 'next/font/google';
import styles from "./editPost.module.css";
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
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");

    // Lists data
    const [categoryList, setCategoryList] = useState([]);
    const [regionList, setRegionList] = useState([]);
    const [professionalList, setProfessionalList] = useState([]);

    // Images state
    const [imageList, setImageList] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);

    // UI state
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Professional fields
    const [selectedProfessional, setSelectedProfessional] = useState("");
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
        setPostTitle(post.title || "");
        setPostContent(post.desc || "");
        setSelectedCategory(post.catSlug || "");
        setSelectedRegion(post.region || "");
        setImageList(post.additionalImages?.map(url => ({ url })) || []);
        setMainImageIndex(post.mainImageIndex || 0);
        setSelectedProfessional(post.professional || "");
        setEntryFee(post.entryFee || "");
        setParking(post.parking || "");
        setShadedSeating(post.shadedSeating || "");
        setWaterDepth(post.waterDepth || "");
        setRecommendedGear(post.recommendedGear || "");
        setDifficulty(post.difficulty || "");
        setDuration(post.duration || "");
        setSeason(post.season || "");
        setServiceType(post.serviceType || "");
        setServiceCost(post.serviceCost || "");
        setContactDetails(post.contactDetails || "");
    }, [post]);

    // Fetch all required data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, regionsRes, professionalsRes] = await Promise.all([
                    fetch("/api/categories"),
                    fetch("/api/regions"),
                    fetch("/api/professionals")
                ]);

                if (!categoriesRes.ok || !regionsRes.ok || !professionalsRes.ok) {
                    throw new Error("Failed to fetch data");
                }

                const [categoriesData, regionsData, professionalsData] = await Promise.all([
                    categoriesRes.json(),
                    regionsRes.json(),
                    professionalsRes.json()
                ]);

                setCategoryList(categoriesData);
                setRegionList(regionsData);
                setProfessionalList(professionalsData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("אירעה שגיאה בטעינת הנתונים");
            }
        };

        fetchData();
    }, []);

    if (status === "loading") {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (status === "unauthenticated") {
        router.push("/");
        router.refresh("/");
    }

    const validateForm = () => {
        if (!postTitle.trim()) {
            setError("** יש להזין כותרת");
            return false;
        }
        if (!selectedCategory) {
            setError("** יש לבחור קטגוריה");
            return false;
        }
        if (!postContent.trim()) {
            setError("** יש להזין תוכן");
            return false;
        }
        if (!selectedRegion) {
            setError("** יש לבחור אזור");
            return false;
        }
        if (selectedCategory === "בעלי מקצוע" && !selectedProfessional) {
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
                title: postTitle,
                desc: postContent,
                mainImage: imageList[mainImageIndex]?.url,
                additionalImages: imageList.map(img => img.url),
                catSlug: selectedCategory,
                region: selectedRegion,
                professional: selectedCategory === "בעלי מקצוע" ? selectedProfessional : undefined,
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
                    onChange={(e) => setPostTitle(e.target.value)}
                    value={postTitle}
                />

                <select
                    className={styles.select}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                    required
                >
                    <option value="">בחרו קטגוריה</option>
                    {categoryList?.map((category) => (
                        <option key={category.slug} value={category.slug}>
                            {category.title}
                        </option>
                    ))}
                </select>

                <select
                    className={styles.select}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    value={selectedRegion}
                    required
                >
                    <option value="">בחרו אזור</option>
                    {regionList?.map((region) => (
                        <option key={region.id} value={region.title}>
                            {region.title}
                        </option>
                    ))}
                </select>

                <CategoryFields
                    catSlug={selectedCategory}
                    selectedProfessional={selectedProfessional}
                    setSelectedProfessional={setSelectedProfessional}
                    professionalList={professionalList}
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
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="על מה תמליצו?"
                    />
                </div>

                <ImageUpload
                    images={imageList}
                    setImages={setImageList}
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