'use client'
import Link from 'next/link';


export function Sidebar() {

  return (
    <div className="fixed top-20 bottom-0 w-60 border-l border-dashed border-blue-300">
      <div className="grid gap-4 p-8 pr-0">
        <Link
          href="/dashboard"
          className="flex-center text-sm h-14 flex-1 rounded-lg border border-dashed border-blue-300 font-semibold"
        >
          کاربران
        </Link>

        {/* {general.sidebar?.map((item) => {
          if (is_superuser || groups.includes(item.title)) {
            return (
              <Link
                key={item.href}
                href={`/dashboard/${item.href}`}
                className="flex-center text-sm h-14 flex-1 rounded-lg border border-dashed border-zinc-700 bg-white/[0.02] font-semibold text-white/80 outline-offset-4 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.title}
              </Link>
            );
          }
          return null;
        })} */}
      </div>
    </div>
  );
}
