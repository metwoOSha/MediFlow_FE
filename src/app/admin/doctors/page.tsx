import { getDoctors } from '@/api/Doctors';
import { getSpecializations } from '@/api/Specializations';
import DoctorsList from '@/base/Doctors/DoctorsList/DoctorsList';
import FilterBar from '@/base/Doctors/FilterBar/FilterBar';
import PaginationClient from '@/components/PaginationClient/PaginationClient';
import MainLayout from '@/layout/MainLayout/MainLayout';

export default async function DoctorsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; specialization?: string; category?: string }>;
}) {
    const { page: pageParam, specialization, category } = await searchParams;
    const page = Number(pageParam) || 1;
    const limit = 8;

    const [data, specializations] = await Promise.all([
        getDoctors({
            limit,
            page,
            ...(specialization && { specialization }),
            ...(category && { category }),
        }),
        getSpecializations(),
    ]);

    return (
        <MainLayout
            FilterBar={<FilterBar specializations={specializations} />}
            pagination={<PaginationClient total={data.total} limit={limit} page={page} />}
        >
            <DoctorsList data={data} />
        </MainLayout>
    );
}
