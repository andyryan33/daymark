'use client';

import { Button } from "@heroui/react";
import { signInWithGoogle } from "@/lib/supabase/client";

export default function LoginPage() {
    return (
        <div>
            <Button onPress={signInWithGoogle}>
                Sign in with Google
            </Button>
        </div>
    );
}