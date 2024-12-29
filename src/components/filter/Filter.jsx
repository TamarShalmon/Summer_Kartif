"use client"
import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "./filter.module.css";
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-fredoka',
});

const Filter = ({ initialRegion, initialProfessional, cat }) => {
    const [region, setRegion] = useState(initialRegion || "");
    const [professional, setProfessional] = useState(initialProfessional || "");

    const router = useRouter();
    const searchParams = useSearchParams();

    const professionals = [
        "חשמלאי",
        "נגר",
        "הנדימן",
        "טכנאי מחשבים",
        "עורך דין",
        "רופא",
    ];

    const regions = [
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
    ];

    const handleRegionChange = (e) => {
        const newRegion = e.target.value;
        setRegion(newRegion);

        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (newRegion) {
            current.set("region", newRegion);
        } else {
            current.delete("region");
        }

        const search = current.toString();
        router.push(`${window.location.pathname}?${search}`);
    };

    const handleProfessionalChange = (e) => {
        const newProfessional = e.target.value;
        setProfessional(newProfessional);

        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (newProfessional) {
            current.set("professional", newProfessional);
        } else {
            current.delete("professional");
        }

        const search = current.toString();
        router.push(`${window.location.pathname}?${search}`);
    };

    return (
        <div className={fredoka.className}>

            <div className={styles.filterContainer}>
                {cat === "בעלי מקצוע" ? (
                    <>
                        <select
                            value={professional}
                            onChange={handleProfessionalChange}
                            className={styles.select}
                        >
                            <option value="">כל המקצועות</option>
                            {professionals.map((pro) => (
                                <option key={pro} value={pro}>
                                    {pro}
                                </option>
                            ))}
                        </select>

                        <select
                            value={region}
                            onChange={handleRegionChange}
                            className={styles.select}
                        >
                            <option value="">כל האזורים</option>
                            {regions.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </>
                ) : (
                    <select
                        value={region}
                        onChange={handleRegionChange}
                        className={styles.select}
                    >
                        <option value="">כל האזורים</option>
                        {regions.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                )}

            </div>
        </div >
    );
};

export default Filter;