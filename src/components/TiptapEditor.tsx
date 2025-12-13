'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'

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
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            TextStyle,
            Color,
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
            <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-300' : ''}`}
                >
                    <s>S</s>
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}`}
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''}`}
                >
                    H3
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
                >
                    • 列表
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
                >
                    1. 列表
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                    type="button"
                    onClick={addLink}
                    className="px-3 py-1 rounded hover:bg-gray-200"
                >
                    🔗 链接
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    disabled={uploading}
                    className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? '上传中...' : '📷 上传图片'}
                </button>
                <button
                    type="button"
                    onClick={addVideo}
                    disabled={uploadingVideo}
                    className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploadingVideo ? '上传中...' : '🎬 上传视频'}
                </button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="bg-white" />
        </div>
    )
}
