import { useState, useEffect } from "react";

interface FetchOptions extends RequestInit {
    token?: string;
}

const useFetchWithAuth = <T,>(url: string, options?: FetchOptions) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = options?.token || localStorage.getItem("nutrifit-token");
                const headers = new Headers(options?.headers || {});
                if (token) headers.append("Authorization", `Bearer ${token}`);

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
    }, [url, options]);

    return { data, loading, error };
};

export default useFetchWithAuth;
