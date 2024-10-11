"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DisplayGames from "@/components/DisplayGames";

const SearchResults = () => {
    const searchParams = useSearchParams(); // Use searchParams for query parameters
    const query = searchParams.get("query") || false; // Get the query from the URL

    return (
        <main className="flex min-h-screen flex-col p-24 prose prose-invert lg:prose-xl max-w-full">
            <h3 className="text-white mt-7">
                Search Results for:
                {query ? ` ${query}` : " No query provided"}
            </h3>
            <Suspense fallback={<p>Loading search results...</p>}>
                <DisplayGames
                    cardsPerPage={12}
                    search={encodeURIComponent(query)}
                />
            </Suspense>
        </main>
    );
};

export default SearchResults;
