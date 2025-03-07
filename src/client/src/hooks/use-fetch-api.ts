import { useState, useEffect } from "react";

interface FetchOptions extends RequestInit {
    token?: string;
}

// This is endlessly regenerating, as the dependancy list is getting updated as the options object getting passed
// Is getting regenerated/reset triggering the useEffect again
const useFetchApi = <T,>(url: string, options?: FetchOptions, useToken: boolean = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const headers = new Headers(options?.headers || {});

                if (useToken) {
                    const token = options?.token || localStorage.getItem("nutrifit-token");
                    if (token) headers.append("Authorization", `Bearer ${token}`);
                }

                const response = await fetch(url, {
                    ...options,
                    headers,
                });

                if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

                const json = await response.json();
                setData(json);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    });

    return { data, loading, error };
};

export default useFetchApi;
