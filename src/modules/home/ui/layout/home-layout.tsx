import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import HomeNavbar from "../components/home-nabar";
import HomeSideBar from "@/modules/home-sidebar";

interface LayoutProps {
  children: React.ReactNode;
}
const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <HomeSideBar />
          <main className="flex-1 overflow-y-auto"> {children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HomeLayout;
