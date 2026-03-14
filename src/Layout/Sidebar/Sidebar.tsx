import { MdDashboard } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { GoTasklist } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";

export const SideBar = () => {
  const location = useLocation();


  const sideBarItems = [
    { name: "Dashboard", icon: MdDashboard, link: "/app/dashboard" },
    { name: "Issues", icon: GoTasklist, link: "/app/issues" },
    { name: "Projects", icon: GoProjectSymlink },
    { name: "Teams", icon: GoPeople },
    { name: "Settings", icon: IoSettingsOutline },
  ];

  return (
    <div className=" flex flex-col justify-between h-[95%] py-2 px-2 border-blue-300  border-2 rounded-lg bg-gradient-to-r from-blue-200 from-10% via-gray-200 via-30% to-gray-300 to-90%">
      <div>
        {sideBarItems.map((item) => (
          <Link
            to={item.link || "#"}
            key={item.name}
            className={
              `flex items-center gap-4 p-3 rounded-lg cursor-pointer  ` +
              (location.pathname
                .toLowerCase()
                .includes(item.link?.toLowerCase() as string)
                ? "bg-blue-400 "
                : "")
            }
          >
            <item.icon className="text-xl" />
            {<span>{item.name}</span>}
          </Link>
        ))}
      </div>

      <div
        onClick={() =>
          console.log("Logout", location.pathname.toLowerCase().split("/")[2])
        }
        className=" flex items-center gap-4 p-3 rounded-lg   cursor-pointer"
      >
        <CgLogOut />
        Logout
      </div>
    </div>
  );
};
