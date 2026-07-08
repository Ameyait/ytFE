import axios from "axios";
import { useEffect, useState } from "react";

export const useList = (category, config = {}) => {
    // Safely parse if analytics configuration is true
    const isAnalytics = config.isAnalytics || false;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        open: false,
        message: "",
    });
    
    const [page, setPage] = useState(1);
    // CRITICAL: Set high ceiling ceiling limit directly if initialization config matches analytics mode
    const [limit, setLimit] = useState(isAnalytics ? 2000 : 30);
    
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [lastUpadte, setLastUpdate] = useState("");
    
    const url = "http://13.234.115.183:8000/";

    const displayVideos = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${url}videos`, {
                params: {
                    category,
                    page,
                    limit, // Passes 2000 to return all 52 entries in one round-trip
                },
            });
            const response = res.data;
            setData(response.videos || []);
            setTotal(response.total || 0);
            setPage(response.page || 1);
            setLimit(response.limit || 30);
            setTotalPages(response.total_pages || 0);
            setHasNext(response.has_next || false);
            setHasPrevious(response.has_previous || false);
            setLastUpdate(response.last_refreshed || "");
        } catch (err) {
            console.error("API error fetching records: ", err);
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
                    message: "Scraping started successfully. Videos will be updated in approximately 5 minutes.",
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
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        displayVideos();
    }, [page, limit, category]);

    return {
        data,
        loading,
        loadScrap,
        displayVideos,
        toast,
        page,
        setPage,
        total,
        limit,
        totalPages,
        hasNext,
        hasPrevious,
        lastUpadte,
        
    };
};