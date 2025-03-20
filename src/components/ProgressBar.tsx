'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function ProgressBar() {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      NProgress.start()
      // Tambahkan delay 300ms sebelum selesai
      const timer = setTimeout(() => {
        NProgress.done()
      }, 300)
      prevPathname.current = pathname

      // Cleanup timer jika efek berjalan ulang
      return () => clearTimeout(timer)
    }
  }, [pathname])

  return null
}