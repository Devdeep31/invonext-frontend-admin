import { useState, useEffect } from 'react'
import axios from 'axios';
import { myAxios } from '../services/Helper';

export default function usePost(url, post_data) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await myAxios.post(url, post_data);
            console.log('[response]', response)
            if (response.status === 200) {
                setData(response.data);
            } else {
                setError('Failed to push data');
            }
            setLoading(false);
        })()

    }, [url])

    return [data, error, loading];
}
