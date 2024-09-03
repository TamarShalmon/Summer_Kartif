"use client"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "./regionFilter.module.css";

const RegionFilter = ({ initialRegion }) => {
  const [region, setRegion] = useState(initialRegion || "");
  const [regions, setRegions] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Fetch regions from your API or use a predefined list
    setRegions([
        "צפון-גולן", 
        "צפון-גליל", 
        "מרכז", 
        "דרום", 
        "ירושלים והסביבה"]);
  }, []);

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
    const query = search ? `?${search}` : "";
    
    router.push(`${window.location.pathname}${query}`);
  };

  return (
    <div className={styles.filterContainer}>
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
    </div>
  );
};

export default RegionFilter;