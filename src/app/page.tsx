import { GetSeasonsNowList } from "@/functions/fetcher";
import AnimeBigBannerCaruosel from "@/components/carousel/AnimeBigBannerCarousel";

export default async function Home() {
  const seasonNowList = await GetSeasonsNowList({limit:10});

  return (
    <main className="">      
      <AnimeBigBannerCaruosel itemArray={seasonNowList?.data} />
    </main>
  );
}