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
    <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8">
      <Image
        src="https://rb.gy/xkacau"
        width={56}
        height={56}
        objectFit="contain"
      />
      <div className="flex flex-col space-y-8">
        <HomeIcon className="sidebarIcon" />
        <SearchIcon className="sidebarIcon" />
        <HeartIcon className="sidebarIcon" />
        <ClockIcon className="sidebarIcon" />
        <CollectionIcon className="sidebarIcon" />
        <ChartBarIcon className="sidebarIcon" />
        <DotsHorizontalIcon className="sidebarIcon" />
      </div>
    </section>
  )
}

export default Sidebar