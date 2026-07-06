import axios from "axios"
import { useEffect, useState } from "react"


export const useList = (category) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const url = "http://13.234.115.183/:8000/"
  const displayVideos = async () => {
    try {
      const resp = await axios.get(`${url}videos`, {
        params: {
          category,
          page,
          limit,
        }
      })
      console.log(resp.data)
      setData(resp.data.videos);
    } catch (err) {
      console.log(err);
    }
  }
  const loadScrap = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`${url}scrape`);

      if (res.data.success) {
        setToast({
          open: true,
          message:
            "✅ Scraping started successfully. Videos will be updated in approximately 5 minutes."

        })

      }
      setTimeout(() => {
        setToast({
          open: false,
          message: "",
        })
      }, 5000)
      // Reload videos after scraping
      await displayVideos();


    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    displayVideos()
  }, [page])
  return {
    data,
    loading,
    loadScrap,
    toast,
    page,
    setPage,
    total,
    limit,
  }
}
