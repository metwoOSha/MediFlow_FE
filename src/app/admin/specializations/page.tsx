import FilterBar from '@/base/Specializations/FilterBar/FilterBar';
import SpecializationsList from '@/base/Specializations/SpecializationsList/SpecializationsList';
import MainLayout from '@/layout/MainLayout/MainLayout';

export default function page() {
    return (
        <MainLayout FilterBar={<FilterBar />}>
            <SpecializationsList />
        </MainLayout>
    );
}
