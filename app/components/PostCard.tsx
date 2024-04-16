import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface iAppProps {
    title : string,
    jsonContent: any,
    id: string,
    subName: string,
    userName: string,
    imageString: string | null
}


const PostCard = ({title, jsonContent, id, subName, userName, imageString}: iAppProps) => {
  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
        <form>
            <Button variant='outline' size='sm'>
                <ArrowUp className="h-4 w-4"/>
            </Button>
        </form>
        0
        <form>
            <Button variant='outline' size='sm'>
                <ArrowDown className="h-4 w-4"/>
            </Button>
        </form>
      </div>

      <div>
        <div className="flex items-center gap-x-2 p-2">
            <Link href={`/r/${subName}`} className="font-semibold text-xs">r/{subName}</Link>
            <p className="text-xs text-muted-foreground">Posted by: <span className="hover:text-primary cursor-pointer">u/kraven</span></p>
        </div>

        <div className="px-2">
        <Link href='/'>
        <h1 className="font-medium mt-1 text-lg">{title}</h1>
        </Link>
        </div>

        <div className="max-h-[300px] overflow-hidden">
          {imageString &&(
            <Image src={imageString} alt='post image' width={600} height={300} className="w-full h-full"/>
          )}
        </div>

        <div className="m-3">
          <div className="flex items-center gap-x-1">
            <MessageCircle className="h-4 w-4 text-muted-foreground"/>
            <p className="text-muted-foregrund font-medium text-xs">31 comments</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PostCard
