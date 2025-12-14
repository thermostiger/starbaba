'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import TextAlign from '@tiptap/extension-text-align'
import { FontFamily } from '@tiptap/extension-font-family'

interface TiptapEditorProps {
    content: string
    onChange: (content: string) => void
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const [uploading, setUploading] = useState(false)
    const [uploadingVideo, setUploadingVideo] = useState(false)

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
            }),
            Link.configure({
                openOnClick: false,
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            TextStyle,
            Color,
            Underline,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            FontFamily,
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none min-h-[200px] px-4 py-2',
            },
        },
    })

    if (!editor) {
        return null
    }

    const addImage = async () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'

        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (!file) return

            try {
                setUploading(true)

                // Upload to S3 via our API
                const formData = new FormData()
                formData.append('file', file)

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || 'Upload failed')
                }

                const result = await response.json()
                console.log('Upload result:', result)
                console.log('Image URL:', result.url)

                if (result.url) {
                    console.log('Inserting image with URL:', result.url)
                    editor.chain().focus().setImage({ src: result.url }).run()
                } else {
                    alert('图片上传失败：无法获取图片URL')
                }
            } catch (error) {
                console.error('Image upload error:', error)
                alert('图片上传失败：' + (error as Error).message)
            } finally {
                setUploading(false)
            }
        }

        input.click()
    }

    const addVideo = async () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'video/*'

        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (!file) return

            try {
                setUploadingVideo(true)

                // Upload to S3 via our API
                const formData = new FormData()
                formData.append('file', file)

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || 'Upload failed')
                }

                const result = await response.json()
                console.log('Video upload result:', result)

                if (result.url) {
                    // Insert video as HTML
                    const videoHtml = `<video controls width="100%" style="max-width: 640px;"><source src="${result.url}" type="${result.type}">Your browser does not support the video tag.</video>`
                    editor.chain().focus().insertContent(videoHtml).run()
                } else {
                    alert('视频上传失败：无法获取视频URL')
                }
            } catch (error) {
                console.error('Video upload error:', error)
                alert('视频上传失败：' + (error as Error).message)
            } finally {
                setUploadingVideo(false)
            }
        }

        input.click()
    }

    const addLink = () => {
        const url = window.prompt('请输入链接URL:')
        if (url) {
            editor.chain().focus().setLink({ href: url }).run()
        }
    }

    return (
        <div className="border border-gray-300 rounded-lg">
            {/* Toolbar */}
            <div className="border-b border-gray-300 p-2 flex flex-wrap gap-2 bg-gray-50">
                {/* Heading Selector */}
                <select
                    onChange={(e) => {
                        const value = e.target.value
                        if (value === 'p') {
                            editor.chain().focus().setParagraph().run()
                        } else {
                            const level = parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6
                            editor.chain().focus().setHeading({ level }).run()
                        }
                    }}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    value={
                        editor.isActive('heading', { level: 1 }) ? '1' :
                            editor.isActive('heading', { level: 2 }) ? '2' :
                                editor.isActive('heading', { level: 3 }) ? '3' :
                                    editor.isActive('heading', { level: 4 }) ? '4' :
                                        editor.isActive('heading', { level: 5 }) ? '5' :
                                            editor.isActive('heading', { level: 6 }) ? '6' : 'p'
                    }
                >
                    <option value="p">正文</option>
                    <option value="1">H₁ 一级标题</option>
                    <option value="2">H₂ 二级标题</option>
                    <option value="3">H₃ 三级标题</option>
                    <option value="4">H₄ 四级标题</option>
                    <option value="5">H₅ 五级标题</option>
                    <option value="6">H₆ 六级标题</option>
                </select>

                <div className="w-px h-6 bg-gray-300" />

                {/* Text Styling */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
                    title="粗体"
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
                    title="斜体"
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-300' : ''}`}
                    title="下划线"
                >
                    <u>U</u>
                </button>

                <div className="w-px h-6 bg-gray-300" />

                {/* Text Color */}
                <input
                    type="color"
                    onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
                    className="w-8 h-8 rounded cursor-pointer"
                    title="字体颜色"
                />

                <div className="w-px h-6 bg-gray-300" />

                {/* Lists */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
                    title="无序列表"
                >
                    • 列表
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
                    title="有序列表"
                >
                    1. 列表
                </button>

                <div className="w-px h-6 bg-gray-300" />

                {/* Text Alignment */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''}`}
                    title="左对齐"
                >
                    ⬅
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''}`}
                    title="居中对齐"
                >
                    ↔
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''}`}
                    title="右对齐"
                >
                    ➡
                </button>

                <div className="w-px h-6 bg-gray-300" />

                {/* Media */}
                <button
                    type="button"
                    onClick={addImage}
                    disabled={uploading}
                    className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
                    title="插入图片"
                >
                    {uploading ? '上传中...' : '🖼️ 图片'}
                </button>
                <button
                    type="button"
                    onClick={addVideo}
                    disabled={uploadingVideo}
                    className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
                    title="插入视频"
                >
                    {uploadingVideo ? '上传中...' : '🎬 视频'}
                </button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    )
}
