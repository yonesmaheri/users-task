"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import Logout from "./logout";
import { Button } from "../../ui/button";
import { ChevronDown, KeyRound, Settings, UserPen } from "lucide-react";

// -------------------------------

export function Header() {

  return (
    <header className="sticky top-0 border-b border-dashed border-blue-300 bg-white z-50  px-6 backdrop-blur-xl">
      {/* === Title */}
      <div className="flex justify-between mx-auto h-20 w-full max-w-[1280px] items-center">
        <h1 className="text-lg font-bold">پنل کاربران</h1>

        {/* === Profile-Dropdown */}
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              className="h-10 cursor-pointer text-[0.8rem]"
            >
              <span>یونس ماهری</span>
              <ChevronDown color="#63b3ed"/>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="min-w-40 font-medium"
          >
            <DropdownMenuItem>
              <UserPen color="#63b3ed"/>
              <span>پروفایل کاربری</span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <KeyRound color="#63b3ed"/>
              <span>تغییر گذرواژه</span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings color="#63b3ed"/>
              <span>تنظیمات</span>
            </DropdownMenuItem>

            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
