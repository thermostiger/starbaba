import UserSidebar from '@/components/user/UserSidebar';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <UserSidebar />
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
