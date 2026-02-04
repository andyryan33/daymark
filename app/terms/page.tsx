export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] selection:bg-[#708ea5]/20">
            <main className="mx-auto max-w-3xl px-6 py-20">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter text-[#708ea5]">
                        Terms of Service
                    </h1>
                    <p className="mt-6 text-neutral-500 max-w-xl mx-auto leading-relaxed">
                        A few ground rules to keep Daymark calm, respectful, and reliable.
                    </p>
                </header>

                <section className="space-y-12 text-sm leading-relaxed text-neutral-600">
                    <Block title="Acceptance of Terms">
                        By using Daymark, you agree to these terms. If you do not agree, please do not use the app.
                    </Block>

                    <Block title="Use of the App">
                        Daymark is provided for personal, non-commercial use. You are responsible for the content
                        you create within the app.
                    </Block>

                    <Block title="No Guarantees">
                        Daymark is provided “as is” without warranties of any kind. While care is taken to keep the
                        app reliable, uninterrupted service is not guaranteed.
                    </Block>

                    <Block title="Account Responsibility">
                        You are responsible for maintaining access to your account and securing the login method
                        you use.
                    </Block>

                    <Block title="Acceptable Use">
                        You agree not to misuse the app, attempt unauthorized access, or interfere with its operation.
                    </Block>

                    <Block title="Termination">
                        Access may be suspended or terminated if these terms are violated.
                    </Block>

                    <Block title="Changes">
                        These terms may be updated from time to time. Continued use of the app constitutes
                        acceptance of any changes.
                    </Block>

                    <Block title="Contact">
                        Questions about these terms can be sent to{" "}
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
