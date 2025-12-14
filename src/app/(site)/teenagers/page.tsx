import ResourceGrid from '@/components/resources/ResourceGrid'

export const metadata = {
    title: '青少年英语 - 星爸英语',
    description: '适合13-18岁青少年的英语进阶资源',
}

export default function TeenagersPage() {
    return (
        <ResourceGrid
            assignedPage="青少年英语"
            title="青少年英语进阶"
            subtitle="适合13-18岁青少年的英语进阶资源"
            gradientFrom="from-green-100"
            gradientTo="to-emerald-100"
        />
    )
}
