import {
  ChartBarIcon, ClockIcon, DotsHorizontalIcon,
  SearchIcon, HomeIcon, CollectionIcon
} from "@heroicons/react/solid";
import Image from "next/image"
import Link from "next/link";

function Sidebar( {light} ) {
  return (
    <section className="fixed top-0 z-40 flex flex-col p-4 items-center shadow-lg bg-gray-900 w-[70px] h-screen space-y-8">
      <Image
        src="https://media.discordapp.net/attachments/898544585167482891/900083852658225172/image0.png"
        width={56}
        height={56}
        objectFit="contain"
      />
      <div className="flex flex-col space-y-8">

        <div className="group">
          <Link href="/">
            <HomeIcon className={"sidebarIcon" + " " + ((light === 0) ? "text-white" : "")} />
          </Link>
          <span className="sidebarTooltip group-hover:scale-100">
            Home
          </span>
        </div>

        <div className="group">
          <Link href="/search">
            <SearchIcon className={"sidebarIcon" + " " + ((light === 1) ? "text-white" : "")} />
          </Link>
          <span className="sidebarTooltip group-hover:scale-100">
            Search
          </span>
        </div>

        <div className="group">
          <Link href="/recents">
            <ClockIcon className={"sidebarIcon" + " " + ((light === 3) ? "text-white" : "")} />
          </Link>
          <span className="sidebarTooltip group-hover:scale-100">
            Recently Played
          </span>
        </div>

        <div className="group">
          <Link href="/recommendations">
            <CollectionIcon className={"sidebarIcon" + " " + ((light === 4) ? "text-white" : "")} />
          </Link>
          <span className="sidebarTooltip group-hover:scale-100">
            Explore
          </span>
        </div>

        <div className="group">
          <Link href="/playlist">
            <ChartBarIcon className={"sidebarIcon" + " " + ((light === 5) ? "text-white" : "")} />
          </Link>
          <span className="sidebarTooltip group-hover:scale-100">
            Playlist
          </span>
        </div>

        <div className="group">
          <Link href={"https://github.com/appleswiggy"}>
            <DotsHorizontalIcon className={"sidebarIcon" + " " + ((light === 6) ? "text-white" : "")} />
          </Link>
          <span className="sidebarTooltip group-hover:scale-100">
            More
          </span>
        </div>
        
      </div>
    </section>
  )
}


export default Sidebar;