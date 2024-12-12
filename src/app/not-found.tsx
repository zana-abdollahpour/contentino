import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <div className="mb-8 mt-4 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row-reverse">
        <h1>Sorry, this page doesn&apos;t exist :(</h1>

        <Link href="/">
          <Button>
            <ChevronLeft />
            Go back home
          </Button>
        </Link>
      </div>
      <Image src="/robot.png" alt="sad robot" width={360} height={360} />
    </>
  );
}
