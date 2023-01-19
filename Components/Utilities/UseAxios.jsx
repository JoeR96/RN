import { useState, useEffect } from 'react';
import axios from 'axios';
export const url = 'https://d089-82-9-227-227.eu.ngrok.io/'
// 'https://operation-stacked-1.q950dfmr3n82u.eu-west-2.cs.amazonlightsail.com';

axios.defaults.baseURL = 'https://d089-82-9-227-227.eu.ngrok.io/';

const useAxios = ({ url, method, body = null, headers = null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](url, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                setResponse(res.data);
                console.log(res)
                console.log('hi')
            })
            .catch((err) => {
                setError(err);
                console.log(err)
            })
            .finally(() => {
                setloading(false);

            });
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default useAxios;