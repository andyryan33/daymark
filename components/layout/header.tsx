'use client';

import { Avatar } from "@heroui/react";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-[#FAFAFA]">
            <div className="text-lg font-semibold tracking-wide text-gray-700">
                <a href="/">daymark</a>
            </div>
            <div className="text-lg font-semibold tracking-wide text-gray-700">
                <a href="/home/history">history</a>
            </div>
            <Avatar
                name="A"
                size="sm"
                className="cursor-pointer"
            />
        </header>
    );
}