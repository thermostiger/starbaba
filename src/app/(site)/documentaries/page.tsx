import ResourceGrid from '@/components/resources/ResourceGrid'

export const metadata = {
    title: '原声科普 - 星爸英语',
    description: 'BBC自然纪录片、科学纪录片，英文原声，适合儿童英语学习',
}

export default function DocumentariesPage() {
    return (
        <ResourceGrid
            assignedPage="科普纪录片"
            title="原声科普纪录片"
            subtitle="精选BBC优质纪录片，开拓视野，提升听力"
            gradientFrom="from-emerald-100"
            gradientTo="to-teal-100"
        />
    )
}
