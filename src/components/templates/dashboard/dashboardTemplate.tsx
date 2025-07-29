"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsers } from "@/lib/features/userSlice";  
import { useGetUsers } from "@/services/users";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/modules/table";
import { columns } from "./columns";
import { CustomPagination } from "@/components/modules/pagination";
import { AddUser } from "./addUser";
import { motion } from "framer-motion";

function DashboardTemplate() {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "7";

  const { data, isFetching, isError } = useGetUsers(+pageNumber, +per_page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) {
      dispatch(setUsers(data.data));
    }
  }, [data, dispatch]);

  return (
    <div dir="rtl">
      {isError ? (
        <></>
      ) : (
        <div className="w-full flex flex-col gap-4 overflow-hidden">
          <motion.div
            className="flex w-full items-center justify-between"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
              <span className="rounded bg-blue-400 px-2 py-1 text-white">
                راهنما
              </span>
              <span>:</span>
              <p className="text-medium">
                اطلاعات تمامی کاربرها در این لیست جمع آوری شده است. جهت مشاهده
                بیشتر و تغییرات روی دکمه "مشاهده" کلیک فرمایید.
              </p>
            </div>
            <AddUser />
          </motion.div>

          <DataTable
            columns={columns}
            data={data?.data}
            isPending={isFetching}
          />

          <div className="flex justify-end w-full">
            <CustomPagination pagesCount={data?.total_pages} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardTemplate;
