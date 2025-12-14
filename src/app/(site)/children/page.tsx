import ResourceGrid from '@/components/resources/ResourceGrid'

export const metadata = {
    title: '少儿英语 - 星爸英语',
    description: '适合7-12岁少儿的英语学习资源',
}

export default function ChildrenPage() {
    return (
        <ResourceGrid
            assignedPage="少儿英语"
            title="少儿英语基础"
            subtitle="适合7-12岁少儿的英语学习资源"
            gradientFrom="from-blue-100"
            gradientTo="to-cyan-100"
        />
    )
}
