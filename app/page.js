import Pagnination from "./Pagnination";
const STORIES_ENDPOINT =
  "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
export default async function Home() {
  const res = await fetch(STORIES_ENDPOINT);
  const storyIds = await res.json();
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-5xl mx-auto">
      <Pagnination storyIds={storyIds || []} />
    </div>
  );
}
