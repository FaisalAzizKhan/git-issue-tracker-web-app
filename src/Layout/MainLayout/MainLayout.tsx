// src/Layout/MainLayout/MainLayout.tsx

import type { ReactNode } from "react";
import { useEffect } from "react";
import { SideBar } from "../Sidebar/Sidebar";


interface MainLayoutProps {
  children: ReactNode;
  pageTitle?: string;  
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
 

  useEffect(() => {
    document.body.style.backgroundColor = "#F6F7F9";
  }, []);

  return (
    <div className="min-h-screen flex bg-[#F6F7F9] overflow-x-hidden p-4">
      <div className="  h-screen top-5 left-5 fixed ">
        <SideBar  />
      </div>
      <div
        className={
          "flex flex-col flex-1  "  
        }
      >
        <div className="flex-grow ml-[140px]  ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
