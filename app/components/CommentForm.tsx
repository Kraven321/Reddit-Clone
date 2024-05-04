"use client"

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButtons";
import { createComment } from "../actions";
import { useRef } from "react";

interface iAppProps {
    postId: string
}

export function CommentForm ({postId}: iAppProps) {
    const ref = useRef<HTMLFormElement>(null) // vai servir pra resetar o input do comentario após o envio do formulario
    return (
        <form className="mt-5" action={async (formData) => {
            await createComment(formData)
            ref.current?.reset()
        }}
        ref={ref}
        >
            <input type="hidden" name="postId" value={postId} />
            <Label>Comment right here</Label>
            <Textarea placeholder="what are your thoughts" name="comment" className="w-full mt-1 mb-2"/>
            <SubmitButton text="Comment"/>
        </form>
    )
}