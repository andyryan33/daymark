import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = () =>
    createBrowserClient(
        supabaseUrl!,
        supabaseKey!,
);

export async function signInWithGoogle() {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
        redirectTo: `${location.origin}/auth/callback`,
        },
    });
}