"use client"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "./filter.module.css";
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-fredoka',
});

const Filter = ({ initialRegion, initialProfessional, cat }) => {
    // Selected values
    const [selectedRegion, setSelectedRegion] = useState(initialRegion || "");
    const [selectedProfessional, setSelectedProfessional] = useState(initialProfessional || "");
    
    // Data lists
    const [regionsList, setRegionsList] = useState([]);
    const [professionalsList, setProfessionalsList] = useState([]);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch regions
                const regionsRes = await fetch("/api/regions");
                if (!regionsRes.ok) {
                    throw new Error(`HTTP error! status: ${regionsRes.status}`);
                }
                const regionsData = await regionsRes.json();
                setRegionsList(regionsData);

                // Fetch professionals if needed
                if (cat === "בעלי מקצוע") {
                    const professionalsRes = await fetch("/api/professionals");
                    if (!professionalsRes.ok) {
                        throw new Error(`HTTP error! status: ${professionalsRes.status}`);
                    }
                    const professionalsData = await professionalsRes.json();
                    setProfessionalsList(professionalsData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [cat]);

    const handleRegionChange = (e) => {
        const newRegion = e.target.value;
        setSelectedRegion(newRegion);

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
        setSelectedProfessional(newProfessional);

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
                            value={selectedProfessional}
                            onChange={handleProfessionalChange}
                            className={styles.select}
                        >
                            <option value="">כל המקצועות</option>
                            {professionalsList.map((pro) => (
                                <option key={pro.id} value={pro.title}>
                                    {pro.title}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedRegion}
                            onChange={handleRegionChange}
                            className={styles.select}
                        >
                            <option value="">כל האזורים</option>
                            {regionsList.map((r) => (
                                <option key={r.id} value={r.title}>
                                    {r.title}
                                </option>
                            ))}
                        </select>
                    </>
                ) : (
                    <select
                        value={selectedRegion}
                        onChange={handleRegionChange}
                        className={styles.select}
                    >
                        <option value="">כל האזורים</option>
                        {regionsList.map((r) => (
                            <option key={r.id} value={r.title}>
                                {r.title}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
};

export default Filter;