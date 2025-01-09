import styles from './CategoryFields.module.css';

const CategoryFields = ({
    catSlug,
    // Professional fields
    selectedProfessional,
    setSelectedProfessional,
    professionalList,
    serviceType,
    setServiceType,
    serviceCost,
    setServiceCost,
    contactDetails,
    setContactDetails,

    // Activity details
    season,
    setSeason,
    waterDepth,
    setWaterDepth,
    shadedSeating,
    setShadedSeating,
    recommendedGear,
    setRecommendedGear,
    entryFee,
    setEntryFee,
    parking,
    setParking,
    difficulty,
    setDifficulty,
    duration,
    setDuration,
}) => {
    const renderField = (placeholder, value, onChange) => (
        <input
            className={styles.select}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );

    const fields = {
        "בעלי מקצוע": () => (
            <>
                <select
                    className={styles.select}
                    onChange={(e) => setSelectedProfessional(e.target.value)}
                    value={selectedProfessional}
                    required
                >
                    <option value="">בחר בעל מקצוע</option>
                    {professionalList?.map((professional) => (
                        <option key={professional.id} value={professional.title}>
                            {professional.title}
                        </option>
                    ))}
                </select>
                {renderField("סוג השירות שקיבלתם", serviceType, setServiceType)}
                {renderField("פרטי קשר, טלפון/אתר", contactDetails, setContactDetails)}
                {renderField("עלות השירות", serviceCost, setServiceCost)}
            </>
        ),
        "מעיינות": () => (
            <>
                {renderField("באיזו עונה טיילתם?", season, setSeason)}
                {renderField("מה עומק המים?", waterDepth, setWaterDepth)}
                {renderField("האם יש מקומות ישיבה מוצלים?", shadedSeating, setShadedSeating)}
                {renderField("איזה ציוד הייתם ממליצים להביא?", recommendedGear, setRecommendedGear)}
                {renderField("כניסה בתשלום? כמה?", entryFee, setEntryFee)}
                {renderField("הסדרי חניה", parking, setParking)}
            </>
        ),
        "מסלולי טיול": () => (
            <>
                {renderField("דרגת קושי, מתאים למשפחות?", difficulty, setDifficulty)}
                {renderField("משך המסלול", duration, setDuration)}
                {renderField("באיזו עונה טיילתם?", season, setSeason)}
                {renderField("איזה ציוד הייתם ממליצים להביא?", recommendedGear, setRecommendedGear)}
                {renderField("הכניסה בתשלום? כמה?", entryFee, setEntryFee)}
                {renderField("הסדרי חניה", parking, setParking)}
            </>
        ),
        "תערוכות": () => (
            <>
                {renderField("לאיזה טווח גילאים מתאים?", difficulty, setDifficulty)}
                {renderField("כניסה בתשלום? כמה?", entryFee, setEntryFee)}
                {renderField("הסדרי חניה", parking, setParking)}
            </>
        ),
        "אטרקציות": () => (
            <>
                {renderField("לאיזה טווח גילאים מתאים?", difficulty, setDifficulty)}
                {renderField("כניסה בתשלום? כמה?", entryFee, setEntryFee)}
                {renderField("הסדרי חניה", parking, setParking)}
            </>
        ),
        "קטיף": () => (
            <>
                {renderField("באיזו עונה טיילתם?", season, setSeason)}
                {renderField("כניסה בתשלום? כמה?", entryFee, setEntryFee)}
                {renderField("הסדרי חניה", parking, setParking)}
            </>
        )
    };

    return fields[catSlug] ? fields[catSlug]() : null;
};

export default CategoryFields;