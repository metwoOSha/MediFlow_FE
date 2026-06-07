import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import cls from '../page.module.css';

export default function AuthPage() {
    return (
        <main className={cls.page}>
            <LoginForm />
        </main>
    );
}
