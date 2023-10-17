import { PageHeader } from "./layouts/PageHeader"
import { categories } from "./data/home"
import { CategoryPills } from "./compenents/CategoryPills"
import { useState } from "react"
import { videos } from "./data/home"
import { VideoGridItem } from "./compenents/VideoGridItem"
import { Sidebar } from "./layouts/Sidebar"
import { SidebarProvider } from "./contexts/SidebarContext"

export default function App() {

  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col dark:bg-[#0f0f0f]">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <Sidebar />
          <div className="overflow-x-hidden px-6 pb-4">
            <div className="sticky top-0 bg-white dark:bg-[#0f0f0f] z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory} />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map(video => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
