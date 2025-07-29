'use client';

import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

// -------------------------------

export default function Logout() {
  const router = useRouter()
  return (
    <DropdownMenuItem
      onClick={() => {
        localStorage.removeItem('login_state');
        router.push('/')
      }}
    >
      <LogOut color="#ff7b7b"/>
      <span>خروج</span>
    </DropdownMenuItem>
  );
}
