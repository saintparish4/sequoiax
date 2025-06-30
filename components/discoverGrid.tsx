// components/DiscoverGrid.tsx
"use client";

import useSWRInfinite from "swr/infinite";

type Listing = {
  id: string;
  name: string;
  price: number;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DiscoverGrid() {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (pageIndex) => `/api/marketplace?page=${pageIndex + 1}`,
    fetcher
  );

  const listings = data ? data.flat() : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Discover</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {listings.map((item: Listing) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-900 dark:text-white font-medium">{item.name}</p>
            <p className="text-gray-600 dark:text-gray-300">${item.price.toLocaleString()}</p>
            {/* add image, link, etc. */}
          </div>
        ))}
      </div>
      <button
        onClick={() => setSize(size + 1)}
        disabled={isLoading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading…" : "Load more"}
      </button>
    </div>
  );
}
