export const dynamic = 'force-dynamic';

import { getSpecializations } from '@/api/Specializations';
import FilterBar from '@/base/Specializations/FilterBar/FilterBar';
import SpecializationsList from '@/base/Specializations/SpecializationsList/SpecializationsList';
import MainLayout from '@/layout/MainLayout/MainLayout';

export default async function SpecializationsPage() {
    const data = await getSpecializations();
    return (
        <MainLayout FilterBar={<FilterBar />}>
            <SpecializationsList data={data} />
        </MainLayout>
    );
}
