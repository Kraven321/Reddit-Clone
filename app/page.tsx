import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from '../public/banner.png'
import HelloImage from '../public/hero-image.png'
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatePostCard from "./components/CreatePostCard";
import prisma from "./lib/db";
import PostCard from "./components/PostCard";
import { Suspense } from "react";
import Pagination from "./components/Pagination";
import {unstable_noStore as noStore} from "next/cache" //RESOLVEU O PROBLEMA DE PRERENDERING PAGE QUE O PRISMA CAUSA

async function getData(searchParams: string) {
  noStore();
 const [count, data] = await prisma.$transaction([
  prisma.post.count(),
   prisma.post.findMany({
    take: 10,
    skip: searchParams ? (Number(searchParams) - 1) * 10 : 0,
    select: {
      Vote: true,
      title: true,
      createdAt: true,
      textContent: true,
      id: true,
      imageString: true,
      Comment: {
        select: {
          id: true,

        }
      },
      User: {
        select: {
          userName: true
        }
      },
      subName: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  })
 ]);
  return {count, data}
}

export default function Home({searchParams} : {searchParams : {page: string}}) {
  return (
   <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
    <div className="w-[65%] flex flex-col gap-y-5">
    <CreatePostCard/>
    <Suspense fallback={<p>Opa, calma que ta carregando...</p>}>
    <ShowItems searchParams={searchParams}/>
    </Suspense>
    </div>
    <div className="w-[35%]">
    <Card>
      <Image alt="banner" src={Banner}/>
      <div className="p-2">
      <div className="flex items-center">
        <Image src={HelloImage} alt="hello image" className="w-10 h-16 -mt-6"/>
        <h1 className="font-medium pl-2">Home</h1>
      </div>
      <p className="text-sm text-muted-foreground pt-2">Your Home Reddit frontpage. Come here to check in with your favorite communities!</p>
      <Separator className="my-5"/>

      <div className="flex flex-col gap-y-3">
      <Button asChild variant={'secondary'}>
        <Link href='/r/kraven/create'>Create Post</Link>
      </Button>
      <Button asChild>
        <Link href='/r/create'>Create Community</Link>
      </Button>
      </div>
      </div>
    </Card>
    </div>
    
   </div>
  );
}

async function ShowItems ({searchParams} : {searchParams : {page: string}}) {
  const {count, data} = await getData(searchParams.page)
  return (
    <>
    {data.map((post)=>(
      <PostCard id={post.id} imageString={post.imageString} jsonContent={post.textContent} subName={post.subName as string} title={post.title} userName={post.User?.userName as string} key={post.id}
       voteCount={post.Vote.reduce((acc, vote)=>{
        if(vote.voteType === "UP") return acc + 1
        if(vote.voteType === "DOWN") return acc - 1

        return acc
      }, 0)}
      commentAmount={post.Comment.length}
      />
    ))}
    <Pagination totalPages={Math.ceil(count / 10)}/>
    </>
  )
}
