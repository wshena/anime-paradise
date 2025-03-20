'use client'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { Box, Center, Flex, Grid, Heading, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../loader/SkeletonLoader';
import EpisodeCard from '../cards/EpisodeCard';
import { setAnimeEpisodeServer } from '@/redux/slice/animeSlice';

type ServerProps = {
  serverName: string;
  serverId: number;
}

interface ServerListProps {
  episodeId: string;
  episodeNo: number;
  sub?: ServerProps[],
  dub?: ServerProps[],
  raw?: ServerProps[],
}

const ServerList = ({ label, category, servers }: {
  label: string;
  category: 'sub' | 'dub';
  servers: ServerProps[] | undefined;
}) => {
  const dispatch = useAppDispatch();
  const { animeEpisodeServer } = useAppSelector((state: RootState) => state.anime);

  useEffect(() => {
    if (category === 'sub' && servers && servers.length > 0) {
      dispatch(setAnimeEpisodeServer({
        category: 'sub',
        serverName: servers[0].serverName
      }));
    }
  }, [dispatch, servers, category]);

  const handleChooseServer = (serverName: string) => {
    dispatch(setAnimeEpisodeServer({ category, serverName }));
  };

  return (
    <Flex flexDirection={{base:'column', md:'row'}} alignItems={{base:'start', md:'center'}} gap="15px">
      <Heading as="span" fontSize={{base:'.9rem', md:'1rem'}}>{label}: </Heading>
      <Flex alignItems="center" gap="15px">
        {servers?.map((item) => (
          <button
            key={item.serverId}
            onClick={() => handleChooseServer(item.serverName)}
            className="cursor-pointer"
          >
            <Heading
              as="span"
              padding=".7rem"
              borderRadius="5px"
              border="1px solid gray"
              fontSize={{base:'.9rem', md:'1rem'}}
              backgroundColor={
                (item.serverName === animeEpisodeServer?.serverName && category === animeEpisodeServer?.category)
                  ? 'rgb(255, 100, 10)'
                  : 'none'
              }
            >
              {item.serverName}
            </Heading>
          </button>
        ))}
      </Flex>
    </Flex>
  );
};

const WatchEpisodeList = ({episodeId, serverList}:{episodeId:string, serverList:ServerListProps}) => {
  const {animeEpisodeList, animeEpisodeCover} = useAppSelector((state:RootState) => state.anime);

  const [visibleCount, setVisibleCount] = useState(10)
  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 5)
  }

  console.log(animeEpisodeList);
  console.log(serverList);

  return (
    <Stack alignItems={'center'} width={'100%'} gap={{base:'20px', lg:'30px'}}>
      <Center width={'100%'}>
        <Stack alignItems={'center'} gap={'10px'}>
          <Heading as={'span'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.3rem', lg:'1.3rem'}}>Server</Heading>
          <Stack direction={{base:'column', md:'row'}} gap={'25px'} width={'100%'}>
            <ServerList label='Sub' category='sub' servers={serverList?.sub} />
            <ServerList label='Dub' category='dub' servers={serverList?.dub} />
          </Stack>
        </Stack>
      </Center>
      <Stack width={'100%'} gap={'20px'}>
        <Heading
          as={'h1'}
          fontWeight={'bold'}
          textTransform={'capitalize'}
          fontSize={{ base: '1rem', md: '2rem', lg: '2rem' }}
          fontStyle={'italic'}
        >
          All Episodes - ({animeEpisodeList?.totalEpisode} Episodes)
        </Heading>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }}
          gap={{ base: '15px', md: '20px' }}
          width={{ base: '100%', xl: '100%' }}
        >
          {!animeEpisodeList ? (
            <>
              {Array.from({length:8}).map((_, idx:number) => (
                <SkeletonLoader dimension={{
                  width: { base: '250px', md: '300px', lg: '280px', xl: '300px' },
                  height: { base: '100px', md: '150px' }
                }} />
              ))}
            </>
          ) : (
            <>
              {animeEpisodeList?.episodes?.slice(0, visibleCount).map((item: any) => (
                <EpisodeCard key={item?.episodeId} data={{
                  episode: item,
                  image: animeEpisodeCover
                }} />
              ))}
            </>
          )}
        </Grid>
        {/* Jika jumlah data lebih banyak dari visibleCount, tampilkan tombol Show More */}
        {animeEpisodeList?.episodes?.length > visibleCount && (
          <Center width={'100%'}>
            <button onClick={handleShowMore} className='cursor-pointer w-[80%]'>
              <Heading
                as="span"
                display="block"
                fontSize={{ base: '.9rem', md: '1rem' }}
                textTransform="capitalize"
                rounded="5px"
                padding={'.6rem'}
                width={'100%'}
                border={'1px solid gray'}
                _hover={{ bg: 'rgb(255, 100, 10)', border:'1px solid rgb(255, 100, 10)' }}
                className='transition-all duration-300 ease-in-out'
              >
                show more
              </Heading>
            </button>
          </Center>
        )}
      </Stack>
    </Stack>
  )
}

export default WatchEpisodeList