import React from 'react'
import ContentContainer from './containers/ContentContainer'
import Logo from './Logo'
import { FooterNavigation, FooterParagraph } from '@/consts'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='py-10 text-white' style={{
      background: '#000 linear-gradient(180deg,#0000,#213944)'
    }}>
      <ContentContainer>
        <div className="flex flex-col gap-5 lg:gap-8 py-3">
          {/* nav links */}
          <nav aria-label='footer navigation'>
            <ul className="flex flex-col md:flex-row items-start md:justify-between gap-5 md:gap-0 lg:justify-normal lg:gap-20">
              {FooterNavigation?.map((item:Footer_Navigation) => (
                <div key={item.label} className="capitalize">
                  <h3 className="text-md font-semibold mb-5">{item.label}</h3>
                  <ul className="flex flex-col items-start gap-3">
                    {item.links.map((item:{label:string, link:string}) => (
                      <li key={item.link}>
                        <Link 
                          href={item.link} 
                          className='capitalize text-sm text-gray-300 hover:text-gray-100' aria-label={`Navigate to ${item.link}`}
                          title={item.label}
                          scroll
                          prefetch={false}
                          itemProp='url'
                        >
                          <span itemProp='name'>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </nav>

          {/* logo */}
          <div className="flex items-center justify-between py-5 border-t border-b border-t-gray-100 border-b-gray-100">
            <Logo />
            <span className="text-sm capitalize">powered by jikan API</span>
          </div>

          {/* brief description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-5">
            {FooterParagraph?.map((item:{id:number, content:string}) => (
              <p key={item.id} className="text-sm text-gray-100">{item.content}</p>
            ))}
          </div>
        </div>
      </ContentContainer>
    </footer>
  )
}

export default Footer