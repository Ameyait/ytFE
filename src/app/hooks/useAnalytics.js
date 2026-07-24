import { useMemo, useState, useEffect, useRef } from "react";
import axios from "axios";

export const useAnalytics = (category) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpadte, setLastUpdate] = useState("");
  const [toast, setToast] = useState({ open: false, message: "" });

  // Filter + ranking state
  const [rankMetric, setRankMetric] = useState("views"); // "views" | "likes"
  const [minViews, setMinViews] = useState(0);
  const [minLikes, setMinLikes] = useState(0);

  const url = "http://16.112.191.150:8000/";
  
  // Use a ref to cancel older out-of-order fetch cycles if the category changes mid-stream
  const fetchSessionRef = useRef(0);

 const displayVideos = async () => {
  const currentSession = ++fetchSessionRef.current;
  try {
    setLoading(true);
    let allVideos = [];
    let currentPage = 1;
    let hasNextPage = true;
    const currentLimit = 50; // Boosted to 50 to match your API's expected default limit

    while (hasNextPage) {
      if (currentSession !== fetchSessionRef.current) return;

      const res = await axios.get(`${url}videos`, {
        params: {
          category,
          page: currentPage,
          limit: currentLimit,
        },
      });

      const response = res.data;
      const pageVideos = response.videos || [];
      
      allVideos = [...allVideos, ...pageVideos];
      
      if (currentPage === 1) {
        setLastUpdate(response.last_refreshed || "");
      }

      // FIX: Calculate pagination accurately based on the backend "total" field
      const totalAvailable = response.total || 0;
      hasNextPage = allVideos.length < totalAvailable && pageVideos.length > 0;
      
      currentPage++;

      // Safety breaker
      if (currentPage > 20) break; 
    }

    if (currentSession === fetchSessionRef.current) {
      setData(allVideos);
    }
  } catch (err) {
    console.error("Analytics fetch error:", err);
  } finally {
    if (currentSession === fetchSessionRef.current) {
      setLoading(false);
    }
  }
};

  // Re-fetch everything cleanly whenever the category switches
  useEffect(() => {
    displayVideos();
  }, [category]);

  // Apply frontend filters to the loaded analytical dataset
  const filteredData = useMemo(() => {
    return (data || []).filter(
      (v) => (v.views || 0) >= minViews && (v.likes || 0) >= minLikes
    );
  }, [data, minViews, minLikes]);

  // Aggregate stats calculated dynamically from frontend data arrays
  const totals = useMemo(() => {
    const totalVideos = filteredData.length;
    
    const totalViews = filteredData.reduce((s, v) => s + (v.views || 0), 0);
    const totalLikes = filteredData.reduce((s, v) => s + (v.likes || 0), 0);
    const totalComments = filteredData.reduce((s, v) => s + (v.comments || 0), 0);
    
    const avgViews = totalVideos ? Math.round(totalViews / totalVideos) : 0;
    
    return { totalVideos, totalViews, totalLikes, totalComments, avgViews };
  }, [filteredData]);

  // Top 10 performance based accurately across the entire data chunk
  const topVideos = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => (b[rankMetric] || 0) - (a[rankMetric] || 0))
      .slice(0, 10);
  }, [filteredData, rankMetric]);

  const byCategory = useMemo(() => {
    const map = {};
    filteredData.forEach((v) => {
      const key = v.category || "Unknown";
      if (!map[key]) map[key] = { category: key, views: 0, likes: 0, count: 0 };
      map[key].views += v.views || 0;
      map[key].likes += v.likes || 0;
      map[key].count += 1;
    });
    return Object.values(map).sort((a, b) => b.views - a.views);
  }, [filteredData]);

  const byGroupCategory = useMemo(() => {
    const map = {};
    filteredData.forEach((v) => {
      const key = v.group_category || "Unknown";
      if (!map[key]) map[key] = { group: key, views: 0, likes: 0, count: 0 };
      map[key].views += v.views || 0;
      map[key].likes += v.likes || 0;
      map[key].count += 1;
    });
    return Object.values(map).sort((a, b) => b.views - a.views);
  }, [filteredData]);

  const byChannel = useMemo(() => {
    const map = {};
    filteredData.forEach((v) => {
      const key = v.channel || "Unknown";
      if (!map[key]) map[key] = { channel: key, views: 0, likes: 0, count: 0 };
      map[key].views += v.views || 0;
      map[key].likes += v.likes || 0;
      map[key].count += 1;
    });
    return Object.values(map).sort((a, b) => b.views - a.views);
  }, [filteredData]);

  const engagementRanked = useMemo(() => {
    return filteredData
      .filter((v) => v.views > 0)
      .map((v) => ({
        ...v,
        engagementRate: Number(((v.likes / v.views) * 1000).toFixed(2)),
      }))
      .sort((a, b) => b.engagementRate - a.engagementRate)
      .slice(0, 10);
  }, [filteredData]);

  const scatterData = useMemo(() => {
    return filteredData.map((v) => ({
      x: v.views || 0,
      y: v.likes || 0,
      title: v.title,
    }));
  }, [filteredData]);

  return {
    data,
    loading,
    toast,
    refetch: displayVideos,
    lastUpadte,
    rankMetric,
    setRankMetric,
    minViews,
    setMinViews,
    minLikes,
    setMinLikes,
    filteredData,
    totals,
    topVideos,
    byCategory,
    byGroupCategory,
    byChannel,
    engagementRanked,
    scatterData,
  };
};