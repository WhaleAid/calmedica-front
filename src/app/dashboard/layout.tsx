"use client"

import SideBar from "@/components/SideBar";

export default function DashboardLayout(props: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen h-full flex-col items-center p-16 relative overflow-hidden">
            <div className="w-full flex dark:bg-gray-800 bg-[#f7f5ff] rounded-xl shadow-md m-auto transition-all xl:h-screen-minus h-full">
                <SideBar />
                {props.children}
            </div>
        </main>
    )
}