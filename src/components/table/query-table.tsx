import Image from "next/image";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";

import { type QueryResponse } from "@/actions/ai";

const wordCount = (text: string) => text.split(" ").length;

interface QueryTableProps {
  queries: QueryResponse[];
}

export default function QueryTable({ queries }: QueryTableProps) {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Content copied to clipboard");
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
      else console.error(err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm dark:bg-gray-900">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">TEMPLATE</th>
            <th className="px-4 py-2 text-left">QUERY</th>
            <th className="px-4 py-2 text-left">DATE</th>
            <th className="px-4 py-2 text-left">WORDS</th>
            <th className="px-4 py-2 text-left">Copy</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100 dark:bg-gray-600">
              <td className="px-4 py-2">
                <div className="flex">
                  <Image
                    src={item.template.icon}
                    alt={`${item.template.name} icon`}
                    width={20}
                    height={20}
                  />
                  <div className="ml-2">{item.template.name}</div>
                </div>
              </td>
              <td className="line-clamp-2 px-4 py-2">{item.query}</td>
              <td className="px-4 py-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{wordCount(item.content || "")}</td>
              <td className="px-4 py-2">
                <button
                  type="button"
                  onClick={() => handleCopy(item.content || "")}
                  className="flex items-center"
                >
                  <Copy className="h-5 w-5 text-gray-500 dark:text-gray-300" />{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
