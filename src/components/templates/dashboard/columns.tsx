"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionColumn } from "./actionColumn";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "first_name",
    header: "نام",
  },
  {
    accessorKey: "last_name",
    header: "نام خانوادگی",
  },
  {
    accessorKey: "email",
    header: "ایمیل",
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionColumn row={row} />;
    },
  },
];
