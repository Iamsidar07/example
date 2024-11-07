"use client";
import React, { useMemo, useState } from "react";
const NUM_OF_ITEMS_IN_ONE_PAGE = 10;
const Pagnination = ({ stories }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const numOfPage = useMemo(
    () => stories.length / NUM_OF_ITEMS_IN_ONE_PAGE,
    [stories],
  );
  return (
    <div className="pt-96">
      {stories
        ?.slice(
          (currentPageNumber - 1) * NUM_OF_ITEMS_IN_ONE_PAGE,
          currentPageNumber * NUM_OF_ITEMS_IN_ONE_PAGE,
        )
        .map((s) => (
          <p key={s.title}>{s.title}</p>
        ))}
      {new Array(numOfPage).fill(0).map((n, i) => (
        <button
          key={i}
          onClick={() => setCurrentPageNumber(i + 1)}
          className="border p-5"
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagnination;
