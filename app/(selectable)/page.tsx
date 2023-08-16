import { cn } from '@/lib/utils';
import { CornerRightUp } from 'lucide-react';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main
      className={cn(
        caveat.className,
        'mt-2 flex items-center justify-center text-4xl text-gray-400',
      )}
    >
      <h1>Select your calendar</h1>
      <CornerRightUp />
    </main>
  );
}
