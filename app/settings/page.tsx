import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "../lib/db"
import { redirect } from "next/navigation"
import SettingsForm from "../components/SettingsForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select:{
            userName: true
        }
    })

    return data;
}

const SettingsPage = async () => {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user) {
        return redirect("/api/auth/login")
    }

    const data = await getData(user.id)

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
      <SettingsForm username={data?.userName}/>

    </div>
  )
}

export default SettingsPage