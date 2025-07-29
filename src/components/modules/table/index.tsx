"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { OctagonAlert } from "lucide-react";
import { LoadingStructure } from "../loading";
import { motion, AnimatePresence } from "framer-motion";

interface DataTableProps<TData, TValue> {
  data: TData[];
  isPending: boolean;
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  data,
  columns,
  isPending,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getRowId: (row: any) => row.id.toString(),
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <>
      {isPending ? (
        <LoadingStructure />
      ) : (
        <div
          className={`rounded-lg border${
            isAnimating ? " overflow-hidden" : ""
          }`}
        >
          <Table className="font-medium">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="h-14 text-right">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              <AnimatePresence>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, idx, arr) => (
                    <motion.tr
                      key={row.id}
                      className="h-14 text-center"
                      data-state={row.getIsSelected() && "selected"}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      onAnimationComplete={() => {
                        if (idx === arr.length - 1) setIsAnimating(false);
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-40 text-center text-[0.8rem] text-zinc-400"
                    >
                      <div className="flex-center gap-2">
                        <OctagonAlert size={18} />
                        <span>نتیجه ای برای اطلاعات مشتریان یافت نشد ...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
