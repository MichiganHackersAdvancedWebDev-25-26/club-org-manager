import { Feature } from "@/components/ui/feature";
import Link from 'next/link';

export default function FaqPage() {
  return (
    <main className=" flex-vertical min-h-screen bg-background text-foreground">
      <div className="flex justify-center gap-4 items-center">
        <Feature />
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/" className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium">
          Back 
        </Link>
      </div>
    </main>

    
  );
}
