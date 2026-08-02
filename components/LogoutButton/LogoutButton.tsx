"use client";

import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function LogoutButton() {

    const router = useRouter();

    async function handleLogout() {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        router.replace('/login');
    }
    
  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>Wyloguj</Button>
  );
}