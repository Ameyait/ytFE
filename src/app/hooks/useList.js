import axios from "axios";
import { useEffect, useState } from "react";

export const useList = (category) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        open: false,
        message: "",
    });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const url = "http://13.234.115.183:8000/";
    const displayVideos = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${url}videos`, {
                params: {
                    category,
                    page,
                    limit,
                },
            });
            const response = res.data;
            setData(response.videos);
            setTotal(response.total);
            setPage(response.page);
            setLimit(response.limit);
            setTotalPages(response.total_pages);
            setHasNext(response.has_next);
            setHasPrevious(response.has_previous);
        } catch (err) {
            console.log(err);
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
            console.log(err);
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
        loadScrap,
        displayVideos, // <-- add this
        toast,
        page,
        setPage,
        total,
        limit,
        totalPages,
        hasNext,
        hasPrevious,

    };
};