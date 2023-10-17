import { useState, useRef, useEffect } from "react"
import { Button } from "./Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type CategoryPillsProps = {
    categories: string[]
    selectedCategory: string
    onSelect: (category: string) => void
}

const TRANSLATE_AMOUNT = 200


export function CategoryPills({
    categories,
    selectedCategory,
    onSelect,
}: CategoryPillsProps) {

    const [translate, setTranslate] = useState(0)
    const [isLeftVisible, setIsLeftVisible] = useState(false)
    const [isRightVisible, setIsRightVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current == null) return
    
        const observer = new ResizeObserver(entries => {
          const container = entries[0]?.target
          if (container == null) return
    
          setIsLeftVisible(translate > 0)
          setIsRightVisible(
            translate + container.clientWidth < container.scrollWidth
          )
        })
    
        observer.observe(containerRef.current)
    
        return () => {
          observer.disconnect()
        }
      }, [categories, translate])

    return (
        <div ref={containerRef} className="overflow-x-hidden h-11 relative ">
            <div 
            className="flex whitespace-nowrap gap-3 transition-transform w-[max-content] pt-1.5"
            style={{ transform: `translateX(-${translate}px)` }}>
                {categories.map(category => (
                    <Button
                        key={category}
                        onClick={() => onSelect(category)}
                        variant={selectedCategory === category ? "dark" : "default"}
                        className={`py-1 px-3 rounded-lg whitespace-nowrap ${selectedCategory === category ? "dark:bg-secondary dark:hover:bg-white dark:text-black" : "dark:bg-secondary-dark dark:hover:bg-secondary-dark-hover dark:text-[#f1f1f1]"}`}
                    >
                        {category}
                    </Button>
                ))}
            </div>
            {isLeftVisible && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white dark:from-[#0f0f0f] from-50% to-transparent w-24 h-full">
                <Button 
                size="icon" 
                variant="ghost" 
                className="h-11 aspect-square w-auto p-1.5 dark:text-[#f1f1f1] dark:hover:bg-secondary-dark"
                onClick={() => {
                    setTranslate(translate => {
                      const newTranslate = translate - TRANSLATE_AMOUNT
                      if (newTranslate <= 0) return 0
                      return newTranslate
                    })
                  }}
                  >
                    <ChevronLeft/>
                </Button>
            </div>
            )}
            {isRightVisible && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white dark:from-[#0f0f0f] from-50% to-transparent w-24 h-full flex justify-end">
                <Button 
                size="icon" 
                variant="ghost" 
                className="h-full aspect-square w-auto p-1.5 dark:text-[#f1f1f1] dark:hover:bg-secondary-dark"
                onClick={() => {
                    setTranslate(translate => {
                        if (containerRef.current == null) {
                          return translate
                        }
                        const newTranslate = translate + TRANSLATE_AMOUNT
                        const edge = containerRef.current.scrollWidth
                        const width = containerRef.current.clientWidth
                        if (newTranslate + width >= edge) {
                          return edge - width
                        }
                        return newTranslate
                      })
                  }}
                  >
                    <ChevronRight/>
                </Button>
            </div>
            )}
        </div>
    )
}