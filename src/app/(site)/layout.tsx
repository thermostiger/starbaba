import AnnouncementBar from '@/components/common/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* <AnnouncementBar /> */}
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
