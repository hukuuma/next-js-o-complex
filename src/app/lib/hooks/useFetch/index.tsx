"use client";
import { useState, useEffect } from "react";
import axios from 'axios';

type Props = {
  url: string,
  config?: any;
}

const useFetch = ({ url, config}: Props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      axios.get(url, config)
        .then((res) => setData(res.data))
        .catch((err) => {
          console.error(err);
          setError(err as any);
        })
  }, [url, config]);

  return [data, error];
};

export default useFetch;