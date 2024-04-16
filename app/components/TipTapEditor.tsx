"use client"

import { Button } from "@/components/ui/button"
import {Editor, EditorContent, JSONContent, useEditor} from "@tiptap/react"
import Starterkit from "@tiptap/starter-kit"

export const MenuBar = ({editor} : {editor: Editor | null}) => {
    if(!editor) return null

    return (
        <div className="flex flex-wrap gap-5 mt-5">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "secondary"}
      >
        Bold
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "secondary"}
      >
        Italic
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "secondary"}
      >
        Strike
      </Button>
        </div>
        
    )
}


export const TipTapEditor = ({json, setJson}: {json: JSONContent | null, setJson: any}) => {
    const editor = useEditor({
        extensions: [Starterkit],
        content: json ?? '<p>Hello World!</p>',
        editorProps: {
            attributes: {
                class: 'prose',
            },
        },
        onUpdate: ({editor}) => {
        const json = editor.getJSON()
        setJson(json)
        }
    })
    return (
        <div>
            <MenuBar editor={editor}/>
            <EditorContent editor={editor} className="rounded-lg border p-2 min-h-[150px] mt-2"/>
        </div>
    )
}