'use client'
import UserTemplate from "@/components/templates/user/userTemplate";
import React from "react";
import { useParams } from "next/navigation";

function User() {
  const { id } = useParams<{ id: string }>();
  return <UserTemplate id={id} />;
}

export default User;
