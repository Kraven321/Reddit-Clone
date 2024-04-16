"use client"

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React, { useState } from 'react'
import pfp from '../../../../public/pfp.png'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Text, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TipTapEditor } from '@/app/components/TipTapEditor'
import { SubmitButton } from '@/app/components/SubmitButtons'
import { UploadDropzone } from '@/app/components/Uploadthing'
import { createPost } from '@/app/actions'
import { JSONContent } from '@tiptap/react'


const rules = [
    {
        id: 1,
        text:"Remember the human"
    },
    {
        id: 2,
        text:"Behave like you would in real life"
    },
    {
        id:3,
        text: "Look for the original source of content"
    },
    {
        id:4,
        text: "Be kind and generous"
    },
    {
        id:5,
        text: "read the community guideline"
    }
    
]
const CreatePostPage = ({params} : {params: {id:string}}) => {
    const [imageUrl, setImageUrl] = useState<null | string>(null)
    const [json, setJson] = useState<null | JSONContent>(null)
    const [title, setTitle] = useState('')

    const createPostReddit = createPost.bind(null, {jsonContent: json})
  return (
    <div className='max-w-[1000px] mx-auto flex gap-x-10 mt-4'>
      <div className='w-[65%] flex flex-col gap-y-5'>
        <h1 className='font-semibold'>Subreddit: <Link className='text-primary' href={`/r/${params.id}`}>r/{params.id}</Link></h1>
        <Tabs defaultValue='post' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='post'><Text className='h-4 w-4 mr-2'/>Post</TabsTrigger>
        <TabsTrigger value='image'><Video className='h-4 w-4 mr-2'/>Image & Video</TabsTrigger>
        </TabsList>
        <TabsContent value='post'>
        <Card>
            <form action={createPostReddit}>
                <input type='hidden' name='imageUrl' value={imageUrl ?? undefined}/>
                <input type="hidden" name='subName' value={params.id} />
                <CardHeader>
                    <Label>Title</Label>
                    <Input required name='title' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>

                    <TipTapEditor setJson={setJson} json={json}/>
                </CardHeader>
                <CardFooter>
                    <SubmitButton text='Criar Post'/>
                </CardFooter>
            </form>
        </Card>
        </TabsContent>
        <TabsContent value='image'>
            <Card>
                <CardHeader>
                   {imageUrl === null ? (
                    <UploadDropzone endpoint='imageUploader' 
                    className='ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary'
                    onUploadError={(error : Error) =>(
                     alert('Error')
                    )}
                    onClientUploadComplete={(res) =>(
                     setImageUrl(res[0].url)
                    )}
                    />
                   ) : (
                    <Image src={imageUrl} alt='image Uploaded' width={500} height={400} className='h-80 rounded-lg w-full object-contain'/>
                   )}
                </CardHeader>
            </Card>
        </TabsContent>
        </Tabs>
      </div>

      <div className='w-[35%]'>
        <Card className='flex flex-col p-4'>
            <div className='flex items-center gap-x-2'>
                <Image src={pfp} alt='pfp' className='h-10 w-10'/>
                <h1 className='font-medium'>Post pra Reddit</h1>
            </div>
            <Separator className='mt-2'/>

            <div className='flex flex-col gap-y-5 mt-5'>
                {rules.map((item)=>(
                    <div key={item.id}>
                        <p className='font-medium text-sm'>{item.id}. {item.text}</p>
                        <Separator className='mt-2'/>
                    </div>
                ))}
            </div>
        </Card>
      </div>
    </div>
  )
}

export default CreatePostPage
