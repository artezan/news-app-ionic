import React from 'react';
import { useState, useEffect } from 'react';
import { API_URL } from '../helpers/url-api';
import { TopHeadlines } from '../models/TopHeadlines.model';

export function useSearchService({ q = '' }) {
  const [data, setData] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL.HEADLINES}?q=${q}`, {
          headers: {
            Authorization: 'Bearer 5b2a52979c0c431a848140aa9b061a90'
          }
        });
        const data = await response.json();
        console.log(data);
        setLoading(false);
        setData(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    if (q !== '' && q !== undefined) {
      fetchUrl();
    }
  }, [q]);
  return { data, loading, error };
}
