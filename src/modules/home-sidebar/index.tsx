import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import React from "react";
import MainSection from "../home/ui/components/main-section";
import { Separator } from "@/components/ui/separator";
import PersonalSection from "../home/ui/components/personal-section";

const HomeSideBar = () => {
  return (
    <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
};

export default HomeSideBar;
