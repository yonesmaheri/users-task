import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserPen } from "lucide-react";
import React from "react";
import Link from "next/link";
import { DeleteUser } from "./deleteUser";

export function ActionColumn({ row }: { row: any }) {
  return (
    <div className="ml-10 text-left">
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger className="" asChild>
          <Button variant="ghost" className="h-8 w-8 cursor-pointer p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={10} className="min-w-40">
          <DropdownMenuLabel className="flex items-center gap-1 text-[0.8rem]">
            {row.original.first_name} {row.original.last_name}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link
              href={`/dashboard/users/${row.original.id}`}
              className="flex items-center gap-2"
            >
              <UserPen size={20} color="#63b3ed" />
              <span>مشاهده جزئیات</span>
            </Link>
          </DropdownMenuItem>

          <DeleteUser id={row.original.id} name={`${row.original.first_name} ${row.original.last_name}`} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
