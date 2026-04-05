import { useEffect, useState } from 'react';

export const useDebounce = <T>(q: T, delay: number = 500) => {
    const [debounceQ, setDebounceQ] = useState<T>(q);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceQ(q), delay);

        return () => clearTimeout(handler);
    }, [q, delay]);

    return debounceQ;
}
