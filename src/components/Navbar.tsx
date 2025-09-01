import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { BookMarkIcon, MenuIcon, SearchIcon, UserIcon } from '@/icons'
import { HeaderNavigation } from '@/consts'
import ContentContainer from './containers/ContentContainer'
import ButtonIcon from './buttons/ButtonIcon'

type IconButtonProps = {
  id: string,
  link: string,
  icon: React.ReactNode
}

const IconButton:IconButtonProps[] = [
  {
    id: 'search-button',
    link: '/search',
    icon: <SearchIcon size={20} classname='text-white' />
  },
  {
    id: 'bookmark-button',
    link: '/list/bookmark',
    icon: <BookMarkIcon size={20} classname='text-white' />
  },
]

const Navbar = () => {
  return (
    <header className='fixed z-50 top-0 left-0 w-full bg-navbar-gray text-white'>
      <ContentContainer>
        <div className="flex items-center justify-between">
          {/* left side */}
          <div className="flex items-center gap-5">
            <Logo />

            {/* desktop navigation */}
            <nav aria-label='Main Navigation'>
              <ul className='hidden md:flex items-center gap-5'>
                {HeaderNavigation?.map((item:{label:string, link:string}) => (
                  <li key={item.link}>
                    <Link
                      href={item.link} 
                      className='capitalize text-sm md:text-md text-gray-300 hover:text-gray-100 transition-colors duration-300 ease-in-out' aria-label={`Navigate to ${item.link}`}
                      title={item.label}
                      scroll
                      prefetch={false}
                      itemProp='url'
                    >
                      <span aria-label='name'>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* right side */}
          <ul className="flex items-center gap-0 md:gap-3">
            {IconButton?.map((item:IconButtonProps) => (
              <li key={item.id}>
                <Link href={item.link} title={item.id} aria-label={item.id} itemProp='url'>
                  <ButtonIcon icon={item.icon} classname="cursor-pointer p-4 hover:bg-gray-600 transition-colors duration-300 ease-in-out" />
                </Link>
              </li>
            ))}

            {/* user profile button for desktop */}
            <ButtonIcon icon={<UserIcon size={20} classname='text-white' />} classname="hidden md:block cursor-pointer p-4 hover:bg-gray-600 transition-colors duration-300 ease-in-out" />

            {/* mobile menu button */}
            <ButtonIcon icon={<MenuIcon size={20} classname='text-white' />} classname="block md:hidden cursor-pointer p-4 hover:bg-gray-600 transition-colors duration-300 ease-in-out" />
          </ul>
        </div>
      </ContentContainer>
    </header>
  )
}

export default Navbar