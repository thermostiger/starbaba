import ResourceGrid from '@/components/resources/ResourceGrid'

export const metadata = {
    title: '幼儿英语 - 星爸英语',
    description: '适合3-6岁幼儿的英语启蒙资源',
}

export default function YoungChildrenPage() {
    return (
        <ResourceGrid
            assignedPage="幼儿英语"
            title="幼儿英语启蒙"
            subtitle="适合3-6岁幼儿的英语启蒙资源"
            gradientFrom="from-pink-100"
            gradientTo="to-purple-100"
        />
    )
}
