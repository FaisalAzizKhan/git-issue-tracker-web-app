// src/Layout/MainLayout/MainLayout.tsx

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
// import Topbar from "../Topbar/Topbar";
// import Sidebar from "../Sidebar/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  pageTitle?: string; // New optional pageTitle prop
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageTitle }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#F6F7F9";
  }, []);

  return (
    <div className="min-h-screen flex bg-[#F6F7F9] overflow-x-hidden">
      <div className="hidden lg:block fixed top-0 left-0 h-screen z-20 px-4">
        {/* <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} /> */}
      </div>

      <div
        className={
          "flex flex-col flex-1 w-full " + (isVisible ? "ml-[200px]" : "ml-[55px]")
        }
      >
        <div
          className={
            "fixed top-0 right-0 z-30 px-4 " +
            (isVisible ? "left-[200px]" : "left-[56px]")
          }
        >
          <div className="flex items-center gap-4 pl-4">
            <div className="flex-grow">
              {/* <Topbar dynamicTitle={pageTitle} /> */}
            </div>
          </div>
        </div>

        <main className="flex-grow pt-28 px-4 sm:px-6 lg:px-8 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
