import Link from 'next/link'
import RedditText from '../../public/logo-name.svg'
import RedditMobile from '../../public/reddit-full.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import UserDropdown from './UserDropdown'


const Navbar = async () => {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  return (
   <nav className='h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between'>
    <Link href="/" className='flex gap-x-3 items-center'>
    <Image src={RedditMobile} alt='logo' className='h-10 w-fit' priority/>
    <Image priority src={RedditText} alt='logo maior' className='h-9 w-fit hidden lg:block'/>
    </Link>

    <div className='flex items-center gap-x-4'>  
    <ThemeToggle/>
    {user ?(
      <UserDropdown userImage={user.picture}/>
    ) : (
      <div className='flex gap-x-4 items-center'>
      <Button variant="secondary" asChild>
    <RegisterLink>Sign Up</RegisterLink>
    </Button>
    <Button asChild>
    <LoginLink>Login</LoginLink>
    </Button>
      </div>
    )}
  
    </div>
   </nav>
  )
}

export default Navbar