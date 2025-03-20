"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Center, Heading, Stack } from "@chakra-ui/react";
import Image from "next/image";

const Days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const date = new Date();
    const currentDay = Days[date.getDay()];
    router.replace(`/schedule/${currentDay}`);
  }, [router]);

  return (
    <Center width={'100%'} height={'100vh'}>
      <Stack alignItems={'center'} gap={'15px'}>
        <Image src={'/image/auth-hime.png'} alt='yuzu' width={300} height={200} className=''/>
        <Stack gap={{base:'-20px', md:'-10px'}} alignItems={'center'}>
          <Heading as={'h1'} color={'white'} fontWeight={'bold'} fontSize={{base:'.8rem', md:'1.3rem'}}>Redirecting, please wait kindly...</Heading>
        </Stack>
      </Stack>
    </Center>
  )
}
