"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, UserPlus } from "lucide-react";
import React, { useCallback, useState } from "react";
import { CreateUserForm } from "./addUserForm";

export function AddUser() {
  const [isOpen, setOpen] = useState(false);
  const handleCloseDialog = useCallback(() => setOpen(false), []);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="h-10 gap-1.5 text-[0.8rem]">
          <span>کاربر جدید</span>
          <Plus color="#63b3ed"/>
        </Button>
      </DialogTrigger>

      <DialogContent dir="rtl" className="max-w-[36rem] gap-6">
        <DialogHeader className="flex-row items-center justify-between border-b border-dashed pb-4">
          <DialogTitle className="flex items-center gap-2">
            <UserPlus size={20} color="#63b3ed"/>
            <span>اضافه کردن کاربر</span>
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>

          <DialogClose asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-sm bg-blue-400 hover:bg-blue-500">
              <Plus className="rotate-45 text-white" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <CreateUserForm handleCloseDialog={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}
