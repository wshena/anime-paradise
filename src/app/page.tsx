import AnimeBigBanner from "@/components/AnimeBigBanner";
import ContentContainer from "@/components/containers/ContentContainer";
import { GetSeasonsNowList } from "@/functions/fetcher";

export default async function Home() {
  const list = await GetSeasonsNowList({limit:10});
  console.log(list)

  return (
    <main className="">
      {list ? (
        <AnimeBigBanner item={list?.data[0]} />
      ) : (
        <h1 className="text-lg">Hello</h1>
      )}
    </main>
  );
}