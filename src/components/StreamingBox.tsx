"use client";

import React, { useEffect, useState } from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";

import { GetAnimeStreamingResource } from "@/utils/fetcher";

import HlsPlayer from "@/components/HlsPlayer";
import SkeletonLoader from "./loader/SkeletonLoader";
import { addToHistory } from "@/redux/slice/history";

const StreamingBox = ({ episodeId }: { episodeId: string }) => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state:RootState) => state.auth);
  const { animeEpisodeServer, animeEpisodeList, currentPlayAnime } = useAppSelector((state: RootState) => state.anime);
  
  const [streamingResource, setStreamingResource] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const currentEpisode = animeEpisodeList?.episodes?.find((item:any) => item?.episodeId === episodeId);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await GetAnimeStreamingResource({
          id: episodeId,
          server: animeEpisodeServer?.serverName === "vidsrc" 
            ? "vidstreaming" 
            : animeEpisodeServer?.serverName,
          category: animeEpisodeServer?.category,
        });
        setStreamingResource(res);
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchResource();
  }, [episodeId, animeEpisodeServer]);

  const videoUrl = streamingResource?.sources[0]?.url; // HLS .m3u8 link
  const tracks = streamingResource?.tracks;
  
  useEffect(() => {
    if (user) {
      dispatch(addToHistory({
        userId: user?.id,
        anime: {
          id: currentPlayAnime?.id,
          title: currentPlayAnime?.title,
          slug: currentPlayAnime?.slug,
          cover: currentPlayAnime?.cover,
          episode: currentEpisode
        }
      }))
    }
  }, [user, currentEpisode, currentPlayAnime]);

  return (
    <Stack width={'100%'} alignItems={'center'} gap={'20px'}>
      <Stack alignItems={'center'} gap={'-10px'}>
        <Heading as={'h1'} fontSize={{base:'1rem', md:'1.3rem', lg:'1.5rem'}}>You are watching <Heading as={'span'} color={'rgb(255, 100, 10)'} fontWeight={'bold'}>Episode {currentEpisode?.episodeNo}</Heading></Heading>
        <Heading as={'h2'} fontWeight={'bold'} fontSize={{base:'.9rem', md:'1rem', lg:'1rem'}} color={'gray.500'}>{currentEpisode?.name} - <a href={`/anime/${currentPlayAnime?.id}/${currentPlayAnime?.slug}`}> <Heading as={'span'} _hover={{color: 'rgb(255, 100, 10)'}}>{currentPlayAnime?.title}</Heading> </a> </Heading>
      </Stack>
      <Box width="100%" height={{ base: "250px", md: "300px", lg: "350px", xl:'400px', "2xl":'500px' }}>
        {loading || !videoUrl ? (
          <SkeletonLoader dimension={{
            width: '100%',
            height: { base: "200px", md: "300px", lg: "350px" }
          }} />
        ) : (
          <HlsPlayer
            src={videoUrl}
            tracks={tracks}
            autoPlay
            controls
            width="100%"
            height="100%"
          />
        )}
      </Box>
    </Stack>
  );
};

export default StreamingBox;
