"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAddUser } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { addUser } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";

type Props = {
  handleCloseDialog: () => void;
};

const formSchema = z.object({
  username: z.string().min(1, "نام کاربر الزامی است"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export const CreateUserForm = ({ handleCloseDialog }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useAddUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess(data) {
        dispatch(addUser({ id: data.id, ...data }));
        handleCloseDialog();
        form.reset();
        toast.success("کاربر با موفقیت اضافه شد");
        queryClient.refetchQueries({
          queryKey: ["users"],
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام کاربر :</FormLabel>
              <FormControl>
                <Input {...field} placeholder="نام کاربر" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ایمیل کاربر :</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ایمیل کاربر" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور :</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder="رمز عبور" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="secondary"
          disabled={isPending}
          className="relative mt-6 h-10 rounded-md bg-blue-400 hover:bg-blue-500 px-6 text-white"
        >
          {isPending ? (
            <span className="absolute inset-0 flex-center">
              <ScaleLoader color="white" height={15} width={2} />
            </span>
          ) : (
            "افزودن کاربر"
          )}
        </Button>
      </form>
    </Form>
  );
};
