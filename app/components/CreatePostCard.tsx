import { Card } from '@/components/ui/card'
import Image from 'next/image'
import pfp from '../../public/pfp.png'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { ImageDown, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CreatePostCard = () => {
  return (
    <div>
      <Card className='px-4 py-2 flex items-center gap-x-4'>
        <Image src={pfp} alt='pfp' className='w-fit h-12'/>
        <Link href='/r/kraven/create' className='w-full'>
        <Input placeholder='create your post'/>
        </Link>

        <div className='flex items-center gap-x-4'>
          <Button size='icon' variant='outline' asChild >
            <Link href='/r/kraven/create'>
            <ImageDown className='w-4 h-4'/>
            </Link>
          </Button>
          <Button asChild variant='outline' size='icon'>
            <Link href='/r/kraven/create'>
            <Link2 className='w-4 h-4'/>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CreatePostCard
