"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { getQueries, type QueryResponse } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import QueryTable from "@/components/table/query-table";

export default function HistoryPage() {
  const [queries, setQueries] = useState<QueryResponse[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [perPage] = useState(10);
  const [page, setPage] = useState(1);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    const fetchQueries = async () => {
      setLoading(true);
      try {
        const res = await getQueries(email, perPage, page);
        setQueries((curQueries) => [...curQueries, ...(res.queries || [])]);
        setTotalPages(res.totalPages!);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (page === 1 && email) fetchQueries();
  }, [page, email, perPage]);

  return (
    <>
      <div className="mb-5 flex w-full flex-col items-center justify-center rounded-lg bg-secondary py-5">
        <h1 className="text-xl">History</h1>
        <p className="text-sm text-gray-500">Your previous search history</p>
      </div>

      {!queries.length ? (
        !loading ? (
          <p>No queries in your history</p>
        ) : (
          <div className="mt-16 flex items-center justify-center">
            <Loader className="mx-2 h-8 w-8 animate-spin lg:h-12 lg:w-12" />
          </div>
        )
      ) : (
        <>
          <div className="flex flex-col justify-center rounded-lg p-5">
            <QueryTable queries={queries} />
          </div>

          <div className="my-5 text-center">
            {page < totalPages && (
              <Button
                disabled={loading}
                onClick={() => setPage((cur) => cur + 1)}
              >
                {loading ? (
                  <Loader className="mx-2 animate-spin" />
                ) : (
                  "Load more"
                )}
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
}
