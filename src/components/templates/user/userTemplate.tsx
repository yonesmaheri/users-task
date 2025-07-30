"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useGetUser, useUpdateUser } from "@/services/users";
import ScaleLoader from "react-spinners/ScaleLoader";
import { DeleteUser } from "./deleteUser";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateUser } from "@/lib/features/userSlice";
import Link from "next/link";

type UserFormValues = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

function UserTemplate({ id }: { id: string }) {
  const router = useRouter();
  const { data: userData, isFetching } = useGetUser(Number(id));
  const { mutate, isPending } = useUpdateUser();
  const form = useForm<UserFormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });
  const dispatch = useDispatch();

  function onSubmit(values: any) {
    mutate(
      {
        id: values.id,
        data: {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
        },
      },
      {
        onSuccess: () => {
          dispatch(updateUser(values));
          form.reset();
          router.push("/dashboard");
        },
      }
    );
  }

  useEffect(() => {
    if (userData?.data) {
      form.reset({
        id: +id,
        first_name: userData.data.first_name || "",
        last_name: userData.data.last_name || "",
        email: userData.data.email || "",
      });
    }
  }, [userData, form.reset, id, form]);

  return (
    <div className="w-full mx-auto">
      <Link href={"/dashboard"} className="">
        <Button variant={"outline"}>بازگشت به صفحه قبل</Button>
      </Link>
      {isFetching ? (
        <div className="w-full flex-col flex-center">
          <div>درحال دریافت اطلاعات</div>
          <ScaleLoader color="black" height={15} width={2} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6 mt-6"
          >
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={userData?.data.avatar}
                alt={`${userData?.data.firstName} ${userData?.data.lastName}`}
              />
              <AvatarFallback>
                {userData?.data.firstName ? userData.data.firstName[0] : ""}
                {userData?.data.lastName ? userData.data.lastName[0] : ""}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام خانوادگی</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div
                  className="sm:col-span-2"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ایمیل</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>
              <motion.div
                className="flex flex-col gap-4 lg:flex-row items-center justify-between mt-6"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-blue-400 hover:bg-blue-500 mt-4 w-full sm:w-auto"
                >
                  {isPending ? (
                    <ScaleLoader color="white" height={15} width={2} />
                  ) : (
                    "ذخیره"
                  )}
                </Button>
                <DeleteUser
                  id={Number(id)}
                  name={`${userData?.data.first_name} ${userData?.data.last_name}`}
                />
              </motion.div>
            </motion.form>
          </Form>
        </motion.div>
      )}
    </div>
  );
}

export default UserTemplate;
