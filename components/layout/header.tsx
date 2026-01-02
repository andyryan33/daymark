'use client';

import { Avatar } from "@heroui/react";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="text-lg font-semibold tracking-wide">
            Daymark
        </div>
        <Avatar
            name="A"
            size="sm"
            className="cursor-pointer"
        />
    </header>
  );
}