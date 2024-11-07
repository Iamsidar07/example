"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

const NUM_OF_ITEMS_IN_ONE_PAGE = 10;

const Pagnination = ({ storyIds }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentStories, setCurrentStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startIndex = (currentPageNumber - 1) * NUM_OF_ITEMS_IN_ONE_PAGE;
  const endIndex = currentPageNumber * NUM_OF_ITEMS_IN_ONE_PAGE;

  const numOfPage = useMemo(
    () => Math.ceil(storyIds.length / NUM_OF_ITEMS_IN_ONE_PAGE),
    [storyIds],
  );

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const storyPromises = storyIds
          .slice(startIndex, endIndex)
          .map(async (id) => {
            const res = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
            );
            return await res.json();
          });
        const stories = await Promise.all(storyPromises);
        setCurrentStories(stories);
      } catch (e) {
        console.log(e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStories();
  }, [storyIds, startIndex, endIndex]);

  return (
    <div className="flex flex-col gap-2">
      {isLoading && "Loading"}
      {error && <p className="text-red-500">error</p>}
      {currentStories &&
        !isLoading &&
        currentStories.map((s) => (
          <div key={s.id}>
            <Link href={s.url}>
              <h2 className="text-xl font-semibold">
                {s.title}{" "}
                <span className="opacity-65">({new URL(s.url).host})</span>
              </h2>
            </Link>
            <p className="text-opacity-65 text-zinc-300">
              {s.score} points by {s.by}{" "}
              {new Date(s.time).toLocaleString("en-US", {
                day: "2-digit",
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
        ))}
      <div className="flex items-center gap-2 flex-wrap mt-12">
        {new Array(numOfPage).fill(0).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPageNumber(i + 1)}
            className={`border w-12 border-zinc-800 cursor-pointer ${
              currentPageNumber === i + 1 ? "bg-orange-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagnination;
