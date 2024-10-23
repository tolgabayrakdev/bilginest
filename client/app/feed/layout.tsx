import AuthProvider from "@/providers/auth-provider"

export default function IndexLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <AuthProvider>
                {children}
            </AuthProvider>
        </section>
    )
}