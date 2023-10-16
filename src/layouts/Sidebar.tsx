import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react"
import { Children, ElementType, ReactNode, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Button, buttonStyles } from "../compenents/Button"
import { playlists, subscriptions } from "../data/sidebar"
import { useSidebarContext } from "../contexts/SidebarContext"
import { PageHeaderFirstSection } from "./PageHeader"


export function Sidebar() {
    const { isLargeOpen, isSmallOpen, close } = useSidebarContext()
    return (
        <>

            <aside className={`flex-col items-center gap-6 px-1 ${isLargeOpen ? "lg:hidden" : "md:flex"} md:flex hidden `}>

                <SmallSidebarItem Icon={Home} title="Home" url="/" />
                <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
                <SmallSidebarItem
                    Icon={Clapperboard}
                    title="Subscriptions"
                    url="/subscriptions"
                />
                <SmallSidebarItem Icon={Library} title="Library" url="/library" />

            </aside>

            {isSmallOpen && (
                <div
                    onClick={close}
                    className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
                />
            )}

            <aside className={`bg-white z-[999] w-58 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 transition-transform duration-700 ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex bg-white max-h-screen translate-x-0" : "-translate-x-full lg:translate-x-0"} `}>


                <div className="lg:hidden sticky top-0 pt-2 pb-4 px-2 bg-white">
                    <PageHeaderFirstSection />
                </div>

                <LargeSidebarSection>
                    <LargeSidebarItem IconOrImgUrl={Home} title="Home" url="/" isActive />
                    <LargeSidebarItem IconOrImgUrl={Repeat} title="Shorts" url="/shorts" />
                    <LargeSidebarItem IconOrImgUrl={Clapperboard}
                        title="Subscriptions"
                        url="/subscriptions" />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection
                    visibleItemCount={5}
                >
                    <LargeSidebarItem IconOrImgUrl={Library} title="Library" url="/library" />

                    <LargeSidebarItem
                        IconOrImgUrl={History}
                        title="History"
                        url="/history"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={PlaySquare}
                        title="Your Videos"
                        url="/your-videos"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={Clock}
                        title="Watch Later"
                        url="/playlist?list=WL"
                    />
                    {playlists.map(playlist => (
                        <LargeSidebarItem
                            key={playlist.id}
                            IconOrImgUrl={ListVideo}
                            title={playlist.name}
                            url={`/playlist?list=${playlist.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />

                <LargeSidebarSection title="Subscriptions">
                    {subscriptions.map(subscription => (
                        <LargeSidebarItem
                            key={subscription.id}
                            IconOrImgUrl={subscription.imgUrl}
                            title={subscription.channelName}
                            url={`/@${subscription.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem
                        IconOrImgUrl={Flame}
                        title="Trending"
                        url="/trending"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={ShoppingBag}
                        title="Shopping"
                        url="/shopping"
                    />
                    <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
                    <LargeSidebarItem
                        IconOrImgUrl={Film}
                        title="Movies & TV"
                        url="/movies-tv"
                    />
                    <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
                    <LargeSidebarItem
                        IconOrImgUrl={Gamepad2}
                        title="Gaming"
                        url="/gaming"
                    />
                    <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
                    <LargeSidebarItem
                        IconOrImgUrl={Trophy}
                        title="Sports"
                        url="/sports"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={Lightbulb}
                        title="Learning"
                        url="/learning"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={Shirt}
                        title="Fashion & Beauty"
                        url="/fashion-beauty"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={Podcast}
                        title="Podcasts"
                        url="/podcasts"
                    />
                </LargeSidebarSection>


            </aside>

        </>
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
}

function SmallSidebarItem({
    Icon,
    title,
    url
}: SmallSidebarItemProps) {
    return (
        <a href={url} className="flex flex-col items-center">
            <Icon className="h-6 w-6" />
            <div className="text-xs">{title}</div>
        </a>
    )
}

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({
    children,
    title,
    visibleItemCount = Number.POSITIVE_INFINITY
}: LargeSidebarSectionProps) {

    const [isExpanded, setIsExpanded] = useState(false)

    const childrenArray = Children.toArray(children).flat()
    const showMore = childrenArray.length > visibleItemCount

    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)

    return (
        <div>
            {title &&
                <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
            {visibleChildren}
            {showMore &&
                <Button
                    onClick={() => setIsExpanded(e => !e)}
                    variant="ghost" className="w-full flex items-center rounded-lg gap-4 p-3 text-sm">
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}

                    {isExpanded ? "Show less" : "Show more"}

                </Button>}

        </div>
    )

}

type LargeSidebarItemProps = {
    IconOrImgUrl: ElementType | string
    title: string
    url: string
    isActive?: boolean
}

function LargeSidebarItem({
    IconOrImgUrl,
    title,
    url,
    isActive = false
}: LargeSidebarItemProps) {
    return (
        <a href={url}
            className={twMerge(
                buttonStyles({ variant: "ghost" }),
                `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
                }`
            )}
        >
            {typeof IconOrImgUrl == "string" ?

                <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" /> : (
                    <IconOrImgUrl className="h-6 w-6" />
                )}

            <div className="text-sm">{title}</div>
        </a>
    )
}