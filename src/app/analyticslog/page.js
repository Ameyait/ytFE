import { useMemo, useState } from "react";
import { useList } from "../hooks/useList";

export const useAnalytics = (category) => {
  const {
    data,
    loading,
    toast,
    displayVideos,
    page,
    setPage,
    total, // This holds the true database total (e.g., 52)
    limit,
    totalPages,
    hasNext,
    hasPrevious,
    lastUpadte,
  } = useList(category);

  // Filter + ranking state
  const [rankMetric, setRankMetric] = useState("views"); // "views" | "likes"
  const [minViews, setMinViews] = useState(0);
  const [minLikes, setMinLikes] = useState(0);

  // Apply frontend filters to the current page data
  const filteredData = useMemo(() => {
    return (data || []).filter(
      (v) => (v.views || 0) >= minViews && (v.likes || 0) >= minLikes
    );
  }, [data, minViews, minLikes]);

  // Aggregate stats
  const totals = useMemo(() => {
    // FIX: Fallback to global total if filters aren't filtering out page items
    const totalVideos = minViews > 0 || minLikes > 0 ? filteredData.length : (total || filteredData.length);
    
    const totalViews = filteredData.reduce((s, v) => s + (v.views || 0), 0);
    const totalLikes = filteredData.reduce((s, v) => s + (v.likes || 0), 0);
    const totalComments = filteredData.reduce((s, v) => s + (v.comments || 0), 0);
    const avgViews = totalVideos ? Math.round(totalViews / totalVideos) : 0;
    
    return { totalVideos, totalViews, totalLikes, totalComments, avgViews };
  }, [filteredData, total, minViews, minLikes]);

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
    page,
    setPage,
    total,
    limit,
    totalPages,
    hasNext,
    hasPrevious,
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