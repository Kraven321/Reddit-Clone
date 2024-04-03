import Link from 'next/link'
import RedditText from '../../public/logo-name.svg'
import RedditMobile from '../../public/reddit-full.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'


const Navbar = () => {
  return (
   <nav className='h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between'>
    <Link href="/" className='flex gap-x-3 items-center'>
    <Image src={RedditMobile} alt='logo' className='h-10 w-fit' priority/>
    <Image priority src={RedditText} alt='logo maior' className='h-9 w-fit hidden lg:block'/>
    </Link>

    <div className='flex items-center gap-x-4'>  
    <ThemeToggle/>
    <Button variant="secondary">Sign Up</Button>
    <Button>Log In</Button>
    </div>
   </nav>
  )
}

export default Navbar