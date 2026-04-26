import { supabase } from './supabase.ts'

// ---Create---
export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('Error signing up: ', error.message);
    }
    return data;
}

// ---Read---
export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Error signing in: ', error.message);
    }
    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error signing out: ', error.message);
        return false;
    }
    return true;
}

export async function getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
        console.error('Error getting session: ', error?.message);
    }
    return session;
}

export function subscribeToRecoveryEvents(callback: (hasAccess: boolean) => void) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
            callback(!!session?.user);
        }
    });
    return subscription;
}

// ---Update---
export async function updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
        password
    });

    if (error) {
        console.error('Error updating password: ', error.message);
    }
    return data;
}

export async function sendPasswordResetLink(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password'
    });

    if (error) {
        console.error('Error sending password reset link: ', error.message);
    }
    return data;
}

// ---Delete---
export async function deleteUser() {
    const { data: deleted, error } = await supabase.functions.invoke('deleteUser');

    if (error) {
        console.error('Error deleting user: ', error.message);
    }
    return deleted;
}
