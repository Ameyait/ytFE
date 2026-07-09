import axios from "axios";
import { useEffect, useState } from "react";

export const useList = (category, config = {}) => {
  const isAnalytics = config.isAnalytics || false;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
  });

  const [page, setPage] = useState(1);

  // Records per page
  const limit = isAnalytics ? 2000 : 30;

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [lastUpadte, setLastUpdate] = useState("");

  const url = "http://13.234.115.183:8000/";

  const displayVideos = async () => {
    try {
      setLoading(true);

      const { data: response } = await axios.get(`${url}videos`, {
        params: {
          category,
          page,
          limit,
        },
      });

      setData(response.videos || []);

      const totalVideos = response.total || 0;

      setTotal(totalVideos);

      const pages = Math.max(1, Math.ceil(totalVideos / limit));

      setTotalPages(pages);

      setHasNext(page < pages);
      setHasPrevious(page > 1);

      setLastUpdate(response.last_refreshed || "");
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadScrap = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`${url}scrape`);

      if (res.data.success) {
        setToast({
          open: true,
          message:
            "Scraping started successfully. Videos will be updated in approximately 5 minutes.",
        });

        setTimeout(() => {
          setToast({
            open: false,
            message: "",
          });
        }, 5000);
      }

      displayVideos();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayVideos();
  }, [page, category]);

  return {
    data,
    loading,
    toast,

    page,
    setPage,

    total,
    totalPages,
    hasNext,
    hasPrevious,

    limit,
    lastUpadte,

    displayVideos,
    loadScrap,
  };
};