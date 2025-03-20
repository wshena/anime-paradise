import React from 'react'
import { Stack } from '@chakra-ui/react';

import { GetAnimeEpisodesServer } from '@/utils/fetcher';

import WatchEpisodeList from '@/components/listItems/WatchEpisodeList';
import ContentWrapper from '@/components/wrapper/ContentWrapper';
import MainWrapper from '@/components/wrapper/MainWrapper';
import StreamingBox from '@/components/StreamingBox';

const page = async ({ params, searchParams }: { params: any, searchParams: any }) => {
  const { id } = params;
  const episodeParam = searchParams.ep;
  
  // episode id dari anime-api
  const episodeId = `${id}?ep=${episodeParam}`;

  const episodeServerList = await GetAnimeEpisodesServer({
    id: episodeId
  });

  console.log(episodeServerList);
  
  return (
    <MainWrapper>
      <ContentWrapper>
        <Stack alignItems={'start'} width={'100%'} gap={{base:'20px', md:'35px'}} paddingY={{ base: '30px', md: '50px' }}>
          <StreamingBox episodeId={episodeId} />
          <WatchEpisodeList episodeId={episodeId} serverList={episodeServerList} />
        </Stack>
      </ContentWrapper>
    </MainWrapper>
  )
}

export default page