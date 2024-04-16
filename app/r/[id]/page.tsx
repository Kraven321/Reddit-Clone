import { updateSubDescription } from '@/app/actions'
import SubDescriptionForm from '@/app/components/SubDescriptionForm'
import { SaveButton, SubmitButton } from '@/app/components/SubmitButtons'
import prisma from '@/app/lib/db'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Cake } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getData (name: string) {
  const data = await prisma.subreddit.findUnique({
    where: {
      name: name
    },
    select: {
      name: true,
      createdAt: true,
      description: true,
      userId: true
    }
  })

  return data
  }

const SubRedditPage = async ({params}: {params: {id: string}}) => {
  const data = await getData(params.id)
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  return (
    <div className='max-w-[1200px] mx-auto flex gap-x-20' mt-4>
    <div className='w-[65%] flex flex-col gap-y-5'>
        <h1>Hello from the subreddit post</h1>
    </div>

    <div className='w-[35%]'>
    <Card>
        <div className='bg-muted p-4 font-semibold'>
            About Community
        </div>

        <div className='p-4'>
        <div className='flex items-center gap-x-3'>
            <Image src={`https://avatar.vercel.sh/galegão`} width={60} height={60} alt='subreddit' className='rounded-full h-16 w-16'/>
            <Link href={`/r/${data?.name}`} className='font-medium'>r/{data?.name}</Link>
        </div>
        {user?.id === data?.userId ? (
         <SubDescriptionForm subName={params.id} description={data?.description}/>
        ) : (
        <p className='text-sm font-normal text-secondary-foreground mt-2'>{data?.description}</p>
        )}

          <div className='flex items-center gap-x-2 mt-4'>
            <Cake className='h-5 w-5 text-muted-foreground'/>
              <p className='text-muted-foreground font-medium text-sm'>Criado: {data?.createdAt ? data.createdAt.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
              }) : ''}</p>
          </div>

          <Separator className='my-5'/>
          <Button asChild className='rounded-full w-full'>
              <Link href={user?.id ? `/r/${data?.name}/create` : '/api/auth/login'}>Criar Post</Link>
          </Button>
        </div>
    </Card>
    </div>
    </div>
  )
}

export default SubRedditPage
