import Pagnination from "./Pagnination"

const STORIES_ENDPOINT = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
const EATCH_STORIES = `https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty`
export default async function Home() {
  const res = await fetch(STORIES_ENDPOINT)
  const data = await res.json()
  console.log("data", data)
  const stories = data?.map(async(id)=>{
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    const story = await res.json()
    return story.title
  })
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* {stories?.slice(0,10).map((s)=><p key={s.id}>{s}</p>)} */}
      {
        stories &&

      <Pagnination stories={stories || []}/>
      }
          </div>
  );
}
