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

  // Number of records per page
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

    console.log("Fetching Page:", page);

    const { data: response } = await axios.get(`${url}videos`, {
      params: {
        category,
        page,
        limit,
      },
    });

    console.log("API Response:", response);
    console.log("Videos:", response.videos.length);

   setData(response.videos ?? []);
setTotal(response.total ?? 0);

const currentPage = response.filters_applied?.page || page;
const currentLimit = response.filters_applied?.limit || limit;

const pages = Math.ceil((response.total || 0) / currentLimit);

setPage(currentPage);
setTotalPages(pages);
setHasNext(currentPage < pages);
setHasPrevious(currentPage > 1);

setLastUpdate(response.last_refreshed ?? "");

console.log("Current Page:", currentPage);
console.log("Total Pages:", pages);
console.log("Has Next:", currentPage < pages);
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