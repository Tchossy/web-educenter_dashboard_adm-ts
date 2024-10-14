import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../provider/AppProvider'

interface AccordionItem {
  label: string
  icon?: JSX.Element
  to: string
  subMenus?: {
    label: string
    icon: JSX.Element
    to: string
    notification: number
  }[]

  accordion: boolean
  notification?: number
}

interface AccordionProps {
  items: AccordionItem
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const { menuIsVisible } = useContext(AppContext)
  const [activeIndex, setActiveIndex] = useState<boolean>(false)

  const toggleAccordion = () => {
    setActiveIndex(!activeIndex)
  }

  return (
    <div className="w-full">
      <div
        className="w-full py-2 px-3 flex items-center justify-between cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex flex-row items-center justify-start gap-2 ">
          {items.icon}
          <span className={`${!menuIsVisible && 'hidden'} group-hover:flex`}>
            {items.label}
          </span>
        </div>
        {activeIndex && <ChevronUp size={16} className="font-extrabold" />}
        {!activeIndex && <ChevronDown size={16} className="font-extrabold" />}
      </div>
      {activeIndex && (
        <>
          <nav className="">
            {items.subMenus?.map((link, linkIndex) => (
              <a
                href={link.to}
                key={linkIndex}
                className="w-full py-2 pl-10 pr-2 flex items-center justify-between cursor-pointer gap-2 hover:pl-3 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md transition-all duration-200 "
              >
                <div className="flex flex-row items-center justify-start gap-2 ">
                  <span
                    className={`${!menuIsVisible && 'hidden'} group-hover:flex`}
                  >
                    {link.label}
                  </span>
                </div>
                {link.notification != 0 && (
                  <span className="w-6 h-6 text-black text-xs p-2 flex flex-row items-center justify-center rounded-full bg-blue-200">
                    {link.notification}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </>
      )}
    </div>
  )
}

export default Accordion
