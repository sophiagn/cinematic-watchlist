import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoginCard from '../components/auth/LoginCard';
import SignUpCard from '../components/auth/SignUpCard';
import ForgotPasswordCard from '../components/auth/ForgotPasswordCard';
import ResetPasswordCard from '../components/auth/ResetPasswordCard';
import '../styles/auth.css';

export default function Auth() {
    const [searchParams] = useSearchParams();
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const mode = searchParams.get('mode') || 'login';

    const renderCard = () => {
        switch (mode) {
            case 'signup':
                return <SignUpCard />;
            case 'forgot-password':
                return <ForgotPasswordCard />;
            case 'reset-password':
                return <ResetPasswordCard />;
            case 'login':
            default:
                return <LoginCard />;
        }
    };

    const handleCardAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
        if (e.animationName === 'cardGlowIn') {
            setIsInitialLoad(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-header">
                <div className="title">Velvet</div>
                <div className="tagline">Curate your perfect watch catalog.</div>
            </div>
            <div
                className={`auth-card-container${isInitialLoad ? ' initial-glow' : ''}`}
                onAnimationEnd={handleCardAnimationEnd}>
                    {renderCard()}
            </div>
        </div>
    );
}
