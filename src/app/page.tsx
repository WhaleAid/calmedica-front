"use client"

import SideBar from "@/components/SideBar";

export default function Home() {
  return (
      <main className="flex min-h-screen h-full flex-col items-center p-16 relative">
        <div className="w-full dark:bg-gray-800 bg-white rounded-xl shadow-md m-auto transition-all xl:h-screen-minus h-full">
          <SideBar />
        </div>
      </main>
  );
}
