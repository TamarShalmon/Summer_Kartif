import { professionals } from '../../constants/data';
import styles from './CategoryFields.module.css';

const CategoryFields = ({
    catSlug,
    professional,
    setProfessional,
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
    contactDetails,
    setContactDetails,
    serviceType,
    setServiceType,
    serviceCost,
    setServiceCost
}) => {
    switch (catSlug) {
        case "בעלי מקצוע":
            return (
                <>
                    <select
                        className={styles.select}
                        onChange={(e) => setProfessional(e.target.value)}
                        value={professional}
                        required
                    >
                        <option value="">בחר בעל מקצוע</option>
                        {professionals.map((pro) => (
                            <option key={pro} value={pro}>
                                {pro}
                            </option>
                        ))}
                    </select>
                    <input className={styles.select} type="text" placeholder="סוג השירות שקיבלתם" value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
                    <input className={styles.select} type="text" placeholder="פרטי קשר, טלפון/אתר" value={contactDetails} onChange={(e) => setContactDetails(e.target.value)} />
                    <input className={styles.select} type="text" placeholder="עלות השירות" value={serviceCost} onChange={(e) => setServiceCost(e.target.value)} />
                </>
            );
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

export default CategoryFields;