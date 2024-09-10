"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h2>Something went wrong!</h2>
      <button
        className="bg-red-400 p-2 mt-2 rounded-lg"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
