'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/Pagination/Pagination';

interface PaginationClientProps {
    total: number;
    limit: number;
    page: number;
}

export default function PaginationClient({ total, limit, page }: PaginationClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        router.push(`?${params.toString()}`);
    };

    return <Pagination total={total} limit={limit} page={page} onPageChange={handlePageChange} />;
}
