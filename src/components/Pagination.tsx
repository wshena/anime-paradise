"use client"

import {
  ButtonGroup,
  IconButton,
  type IconButtonProps,
  Pagination,
  usePaginationContext,
  useBreakpointValue
} from "@chakra-ui/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { useEffect, useState } from "react"

const PaginationLink = (
  props: IconButtonProps & { page?: "prev" | "next" | number },
) => {
  const { page, ...rest } = props
  const pagination = usePaginationContext()
  const searchParams = useSearchParams()
  
  const pageValue = () => {
    if (page === "prev") return pagination.previousPage || pagination.currentPage
    if (page === "next") return pagination.nextPage || pagination.currentPage
    return page || 1
  }
  
  // Dapatkan parameter URL saat ini dengan pengecekan null
  const currentParams = new URLSearchParams(searchParams?.toString() || '')
  
  // Perbarui parameter 'page' dengan pengecekan tambahan
  const pageVal = pageValue()
  if (pageVal !== null && pageVal !== undefined) {
    currentParams.set('page', pageVal.toString())
  } else {
    currentParams.set('page', '1') // Default ke halaman 1
  }
  
  return (
    <IconButton asChild {...rest}>
      <a href={`?${currentParams.toString()}`}>{props.children}</a>
    </IconButton>
  )
}


const CustomPagination = ({count, pageSize, defaultPage}:{count:number, pageSize:number, defaultPage:number}) => {
  const siblingCountValue = useBreakpointValue({ base: 0, md: 2 });
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(defaultPage);
  
  // Mengambil halaman dari URL saat component dirender
  useEffect(() => {
    const pageFromUrl = Number(searchParams?.get('page')) || defaultPage;
    setCurrentPage(pageFromUrl);
  }, [searchParams, defaultPage]);

  return (
    <Pagination.Root 
      count={count} 
      pageSize={pageSize} 
      page={currentPage} // Gunakan currentPage daripada defaultPage
      siblingCount={siblingCountValue}
    >
      <ButtonGroup variant="plain" size="sm">
        <PaginationLink page="prev">
          <HiChevronLeft color="white"/>
        </PaginationLink>

        <Pagination.Context>
          {({ pages }) =>
            pages.map((page, index) =>
              page.type === "page" ? (
                <Pagination.Item
                  asChild
                  key={index}
                  {...page}
                  color="white"
                  _selected={{ bg: "rgb(255, 100, 10)" }}
                  cursor="pointer"
                  paddingX=".5rem"
                  paddingY=".1rem"
                  _hover={{ bg: "rgb(255, 100, 10)" }}
                  borderRadius="5px"
                >
                  {/* Buat URL dengan menyimpan parameter lain */}
                  {(() => {
                    const params = new URLSearchParams(searchParams?.toString() || '')
                    params.set('page', page.value.toString())
                    return <Link href={`?${params.toString()}`}>{page.value}</Link>
                  })()}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index} color={'white'}>
                  <span>...</span>
                </Pagination.Ellipsis>
              )
            )
          }
        </Pagination.Context>

        <PaginationLink page="next">
          <HiChevronRight color="white" />
        </PaginationLink>
      </ButtonGroup>
    </Pagination.Root>
  )
}

export default CustomPagination