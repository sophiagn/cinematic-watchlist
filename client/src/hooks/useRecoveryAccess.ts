import { useEffect, useState } from 'react';
import { getCurrentSession, subscribeToRecoveryEvents } from '../services/userService';

export function useRecoveryAccess() {
    const [isCheckingAccess, setIsCheckingAccess] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    async function checkAccess(mounted: boolean) {
        const session = await getCurrentSession();
        if (!mounted) return;
        setHasAccess(!!session?.user);
        setIsCheckingAccess(false);
    }

    useEffect(() => {
        let mounted = true;

        checkAccess(mounted);

        const subscription = subscribeToRecoveryEvents((nextHasAccess) => {
            if (!mounted) return;
            setHasAccess(nextHasAccess);
            setIsCheckingAccess(false);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return { isCheckingAccess, hasAccess };
}
