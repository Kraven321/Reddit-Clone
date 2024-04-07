'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { updateUserName } from "../actions"
import { SubmitButton } from "./SubmitButtons"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"


const initalState = {
  message: "",
  status: "",
}

const SettingsForm = ({username}: {username: string | null | undefined}) => {
  const [state, formAction] = useFormState(updateUserName, initalState)
const {toast} = useToast()

  useEffect(() => {
    if(state?.status === "green") {
      toast({
        title:"Success",
        description: state.message
      })
    }else if(state?.status === 'error') {
      toast({
        title:"Error",
        description: state.message,
        variant:"destructive"
      })
    }
  }, [state, toast])
  return (
    <form action={formAction}>
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>

        <Separator className="my-4"/>
        <Label className="text-lg">Username</Label>
        <p className="text-muted-foreground">In this Settings page you can change your username</p>

        <Input defaultValue={username ?? undefined} name="username" required className="mt-2" min={2} maxLength={21}/>

        <div className="w-full flex mt-5 gap-x-5 justify-end">
        <Button asChild type="button" variant="secondary"><Link href="/">Cancel</Link></Button>

        <SubmitButton/>
      </div>
    </form>
  )
}

export default SettingsForm
