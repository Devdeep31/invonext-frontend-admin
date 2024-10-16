import { useEffect, useState } from "react";
import { myAxios } from "../../services/Helper";


// function axiosPost(url, body) {
//     const token = localStorage.getItem('token');
//     try {
//         const response = myAxios.post(url, body, {

//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         return [response.data]
//     } catch (error) {
//         console.log(error);
//     }
// }

export default function usePost(url, post_data) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await myAxios.post(url, post_data,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
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