"use client"

import React, { useEffect } from 'react'
import { SaveButton } from './SubmitButtons'
import { Textarea } from '@/components/ui/textarea'
import { updateSubDescription } from '../actions'
import { useFormState } from 'react-dom'
import { useToast } from '@/components/ui/use-toast'


interface iAppProps {
        subName: string,
        description: string | null | undefined
    } 

    const initialState = {
        status: '',
        message: ''
    }
const SubDescriptionForm = ({subName, description}: iAppProps) => {
    const [state, formAction] = useFormState(updateSubDescription, initialState)
    const {toast} = useToast()

    useEffect(() => {
      if(state.status === 'green') {
        toast({
          title: 'Sucesso',
          description: state.message
        })
      } else if(state.status === 'error') {
        toast({
          title: 'Erro',
          description: state.message,
          variant: 'destructive'
        })
      }
    }, [state])
  return (
    <form action={formAction} className='mt-3'>
    <input type="hidden" name='subName' value={subName} />
    <Textarea placeholder='Create your description for this subreddit' maxLength={100} name='description' defaultValue={description ?? undefined}/>
    <SaveButton/>
  </form>
  )
}

export default SubDescriptionForm
