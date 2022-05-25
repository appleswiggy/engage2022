import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  SearchIcon,
  HomeIcon,
  HeartIcon,
  CollectionIcon
} from "@heroicons/react/solid";
import Image from "next/image"

function Sidebar() {
  return (
    <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-gray-900 w-[70px] h-screen space-y-8">
      <Image
        src="https://rb.gy/xkacau"
        width={56}
        height={56}
        objectFit="contain"
      />
      <div className="flex flex-col space-y-8">
        <div className="group">
          <HomeIcon className="sidebarIcon" />
          <span className="sidebarTooltip group-hover:scale-100">
            Home
          </span>
        </div>
        <div className="group">
          <SearchIcon className="sidebarIcon" />
          <span className="sidebarTooltip group-hover:scale-100">
            Search
          </span>
        </div>
        <div className="group">
          <HeartIcon className="sidebarIcon" />
          <span className="sidebarTooltip group-hover:scale-100">
            Liked songs
          </span>
        </div>
        <div className="group">
          <ClockIcon className="sidebarIcon" />
          <span className="sidebarTooltip group-hover:scale-100">
            Recently Played
          </span>
        </div>
        <div className="group">
          <CollectionIcon className="sidebarIcon" />
          <span className="sidebarTooltip group-hover:scale-100">
            Explore
          </span>
        </div>
        <div className="group">
          <ChartBarIcon className="sidebarIcon" />
          <span className="sidebarTooltip group-hover:scale-100">
            Playlist
          </span>
        </div>
        <div className="group">
          <DotsHorizontalIcon className="sidebarIcon" />
          <span className="sidebarTooltip group-hover:scale-100">
            More
          </span>
        </div>
      </div>
    </section>
  )
}


export default Sidebar;