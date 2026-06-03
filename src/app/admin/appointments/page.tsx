import FilterBar from '@/base/Appointments/FilterBar/FilterBar';
import MainLayout from '@/layout/MainLayout/MainLayout';

export default function page() {
    return <MainLayout FilterBar={<FilterBar />}>123</MainLayout>;
}
