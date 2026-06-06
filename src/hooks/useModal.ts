import { useCallback, useState } from 'react';

export function useModal<T = null>() {
    const [data, setData] = useState<T | null>(null);

    const open = useCallback((payload: T) => setData(payload), []);
    const close = useCallback(() => setData(null), []);
    const isOpen = data !== null;

    return { isOpen, data, open, close };
}
