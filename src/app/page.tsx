import ContentContainer from "@/components/containers/ContentContainer";
import { GetSeasonsNowList } from "@/functions/fetcher";

export default async function Home() {
  const list = await GetSeasonsNowList({limit:10});
  console.log(list)

  return (
    <main className="py-30">
      <ContentContainer>
        <h1 className="text-lg">Hello</h1>
      </ContentContainer>
    </main>
  );
}