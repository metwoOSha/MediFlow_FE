import { BrandIcon } from '../Icons/Sidebar/BrandIcon';
import cls from './Brand.module.css';

export default function Brand() {
    return (
        <div className={cls.brand}>
            <div className={cls.brandIcon}>
                <BrandIcon color="#06122a" />
            </div>
            <div className={cls.brandTitle}>
                <span className={cls.brandName}>MediFlow</span>
                <span className={cls.brandSub}>Admin · v1</span>
            </div>
        </div>
    );
}
