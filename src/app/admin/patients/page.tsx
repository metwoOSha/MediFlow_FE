import FilterBar from '@/base/Patients/FilterBar/FilterBar';
import MainLayout from '@/layout/MainLayout/MainLayout';

export default function page() {
    return (
        <MainLayout FilterBar={<FilterBar />}>
            <div>123</div>
        </MainLayout>
    );
}
