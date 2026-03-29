import { supabase } from './supabase.ts'

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

export async function deleteUser() {
    const { data: deleted, error } = await supabase.functions.invoke('deleteUser');

    if (error) {
        console.error('Error deleting user: ', error.message);
    }
    return deleted;
}

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
