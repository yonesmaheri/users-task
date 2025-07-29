"use client";

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

import { useState } from "react";
import { OctagonAlert, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteUser } from "@/services/users";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  name: string;
};

// ---------------------------------

export function DeleteUser({ id, name }: Props) {
  const [isOpen, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          <Trash2 size={20} color="#ff7b7b" />
          <span>حذف کاربر</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        dir="rtl"
        aria-describedby={undefined}
        className="max-w-[28rem]"
      >
        <DialogTitle className="text-base ">
          آیا از حذف این کاربر اطمینان دارید ؟
        </DialogTitle>

        <div className="flex items-center gap-1 text-sm font-medium ">
          <span>نام کاربر :</span>
          <span>{name}</span>
        </div>

        <p className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-zinc-400">
          <OctagonAlert size={18} />
          لطفا با اطمینان کامل اقدام فرمایید , این عملیات برگشت پذیر نمیباشد .
        </p>

        <div className="mt-4 grid h-10 grid-cols-2 gap-4 text-sm font-medium text-white">
          <button
            className="relative cursor-pointer rounded-md bg-red-500/80 outline-none"
            onClick={() => {
              mutate(id, {
                onSuccess: () => {
                  setOpen(false);
                  toast.success("کاربر با موفقیت حذف شد");
                  queryClient.refetchQueries({
                    queryKey: ["users"],
                  }); 
                  router.push("/dashboard");
                },
              });
            }}
          >
            {isPending ? (
              <ScaleLoader color="white" height={15} width={2} />
            ) : (
              "حذف"
            )}
          </button>

          <DialogClose className="cursor-pointer rounded-md bg-zinc-900">
            انصراف
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
