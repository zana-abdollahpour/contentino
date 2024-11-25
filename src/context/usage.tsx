"use client";

import { useState, useContext, useEffect, createContext } from "react";
import { useUser } from "@clerk/nextjs";

import { usageCount } from "@/actions/ai";

interface UsageContextType {
  count: number;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [count, setCount] = useState(0);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    const fetchUsage = async () => {
      const res = await usageCount(email!);
      setCount(res);
    };

    if (email) fetchUsage();
  }, [email]);

  return (
    <UsageContext.Provider value={{ count }}>{children}</UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context === null)
    throw new Error("useUsage must be used inside UsageProvider");

  return context;
};
