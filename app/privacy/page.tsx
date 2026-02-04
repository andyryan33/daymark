export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] selection:bg-[#708ea5]/20">
            <main className="mx-auto max-w-3xl px-6 py-20">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter text-[#708ea5]">
                        Privacy Policy
                    </h1>
                    <p className="mt-6 text-neutral-500 max-w-xl mx-auto leading-relaxed">
                        Daymark is designed to be calm, personal, and respectful of your data.
                    </p>
                </header>

                <section className="space-y-12 text-sm leading-relaxed text-neutral-600">
                    <Block title="What Daymark Is">
                        Daymark is a personal journaling application designed to help you record daily emotions
                        and reflect on your journey over time.
                    </Block>

                    <Block title="Information We Collect">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Basic account information provided during sign-in (such as name and email)</li>
                            <li>Journal entries, mood selections, and notes you choose to create</li>
                            <li>A single functional cookie used to remember your local timezone</li>
                        </ul>
                    </Block>

                    <Block title="How Your Information Is Used">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>To authenticate your account</li>
                            <li>To ensure entries align with your local day</li>
                            <li>To provide the core functionality of the app</li>
                        </ul>
                    </Block>

                    <Block title="Cookies">
                        Daymark uses one functional cookie to remember your local timezone. It is not used for
                        analytics, advertising, or tracking.
                    </Block>

                    <Block title="Data Sharing">
                        Daymark does not sell, rent, or share your personal data with third parties.
                    </Block>

                    <Block title="Third-Party Services">
                        Authentication and data storage are provided through trusted services such as Google
                        Sign-In and Supabase, which may process data according to their own privacy policies.
                    </Block>

                    <Block title="Data Control & Deletion">
                        You may request deletion of your account and associated data at any time by contacting
                        the email address below.
                    </Block>

                    <Block title="Contact">
                        Questions about this policy can be sent to{" "}
                        <a
                            href="mailto:andyryan33@gmail.com"
                            className="font-medium text-[#708ea5] underline-offset-4 hover:underline"
                        >
                            andyryan33@gmail.com
                        </a>
                        .
                    </Block>
                </section>

                <footer className="mt-24 text-center text-[10px] uppercase tracking-widest text-neutral-400">
                    © {new Date().getFullYear()} daymark
                </footer>
            </main>
        </div>
    );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-800">
                {title}
            </h2>
            <div>{children}</div>
        </div>
    );
}