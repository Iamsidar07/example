"use client";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";
import { useState, useMemo } from "react";

const NUM_OF_ITEMS_IN_ONE_PAGE = 10;

const Pagnination = ({ storyIds }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const startIndex = (currentPageNumber - 1) * NUM_OF_ITEMS_IN_ONE_PAGE;
  const endIndex = currentPageNumber * NUM_OF_ITEMS_IN_ONE_PAGE;

  const numOfPage = useMemo(
    () => Math.ceil(storyIds.length / NUM_OF_ITEMS_IN_ONE_PAGE),
    [storyIds],
  );

  const queries = useQueries({
    queries: storyIds.slice(startIndex, endIndex).map((id) => ({
      queryKey: ["story", id],
      queryFn: async () => {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
        );
        if (!res.ok) throw new Error("Failed to fetch story");
        return await res.json();
      },
      staleTime: Infinity,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  return (
    <div className="flex flex-col gap-2">
      {isLoading &&
        new Array(10).fill(0).map((_, i) => (
          <div key={i}>
            <div className="w-full h-8 bg-zinc-800 animate-pulse rounded" />
            <div className="sm:w-1/3 h-6 bg-zinc-900 animate-pulse mt-1 rounded" />
          </div>
        ))}
      {isError && (
        <p className="text-red-500 text-center text-lg">
          Something went wrong! 🌭
        </p>
      )}
      {queries &&
        !isLoading &&
        queries.map((result) => {
          const s = result.data;
          if (!s) return null;
          return (
            <div key={s.id}>
              <Link href={s.url || "#"}>
                <h2 className="text-xl font-semibold">
                  {s.title}{" "}
                  <span className="opacity-65">
                    ({new URL(s.url || "https://example.com").host})
                  </span>
                </h2>
              </Link>
              <p className="text-opacity-65 text-zinc-300">
                {s.score} points by {s.by} on{" "}
                {new Date(s.time).toLocaleString("en-US", {
                  day: "2-digit",
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          );
        })}
      <div className="flex items-center gap-2 flex-wrap mt-12">
        {new Array(numOfPage).fill(0).map((_, i) => (
          <button
            disabled={isLoading}
            key={i}
            onClick={() => setCurrentPageNumber(i + 1)}
            className={`border w-12 border-zinc-800 cursor-pointer disabled:opacity-65 hover:bg-zinc-900 ${
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
