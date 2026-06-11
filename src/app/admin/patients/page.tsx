export const dynamic = 'force-dynamic';

import FilterBar from '@/base/Patients/FilterBar/FilterBar';
import PatientsList from '@/base/Patients/PatientsList/PatientsList';
import MainLayout from '@/layout/MainLayout/MainLayout';
import PaginationClient from '@/components/PaginationClient/PaginationClient';
import { getPatients } from '@/api/Patients';

const LIMIT = 10;

export default async function page({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
    const { page: pageParam, search } = await searchParams;
    const page = Math.max(1, Number(pageParam) || 1);

    const { patients, total } = await getPatients(page, LIMIT, search);

    return (
        <MainLayout FilterBar={<FilterBar />} pagination={<PaginationClient total={total} limit={LIMIT} page={page} />}>
            <PatientsList patients={patients} />
        </MainLayout>
    );
}
