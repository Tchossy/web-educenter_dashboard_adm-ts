import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Lock,
  GraduationCap,
  ChartNoAxesCombined,
  LibraryBig,
  CircleCheckBig,
  BookOpenCheck,
  BookMarked,
  CalendarDays
} from 'lucide-react'
import { PiExamBold } from 'react-icons/pi'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import { FaRegFilePdf } from 'react-icons/fa6'
import AccordionSidBar from '../accordion/AccordionSidBar'
import { routsNameMain } from '../../data/routsName'
import { AppContext } from '../../provider/AppProvider'

export const Slide = () => {
  const { menuIsVisible } = useContext(AppContext)

  const dash = [
    {
      label: 'Inicial',
      icon: <LayoutDashboard size={18} />,
      to: routsNameMain.home,
      notification: 0,
      accordion: false
    },
    {
      label: 'Administradores',
      icon: <Lock className="text-xs" size={18} />,
      to: routsNameMain.admin,

      // subMenus: [
      //   {
      //     label: 'statistic',
      //     icon: <LayoutDashboard size={18} />,
      //     to: routsNameMain.home,
      //     notification: 0
      //   }
      // ],

      notification: 0,
      accordion: false
    },
    {
      label: 'Professores',
      icon: <LiaChalkboardTeacherSolid className="text-xs" size={18} />,
      to: routsNameMain.professor,

      notification: 0,
      accordion: false
    },
    {
      label: 'Estudantes',
      icon: <GraduationCap className="text-xs" size={18} />,
      to: routsNameMain.student,

      notification: 0,
      accordion: false
    },
    {
      label: 'Cursos',
      icon: <LibraryBig className="text-xs" size={18} />,
      to: routsNameMain.course,

      notification: 0,
      accordion: false
    },
    {
      label: 'Módulos',
      icon: <BookMarked className="text-xs" size={18} />,
      to: routsNameMain.module,

      notification: 0,
      accordion: false
    },
    {
      label: 'Exames',
      icon: <PiExamBold className="text-xs" size={18} />,
      to: routsNameMain.exam.index as any,

      notification: 0,
      accordion: false
    },
    {
      label: 'Resultados',
      icon: <ChartNoAxesCombined className="text-xs" size={18} />,
      to: routsNameMain.exam.result,

      notification: 0,
      accordion: false
    },
    {
      label: 'Tarefas',
      icon: <BookOpenCheck className="text-xs" size={18} />,
      to: routsNameMain.task.index as any,

      // subMenus: [
      //   {
      //     label: 'statistic',
      //     icon: <LayoutDashboard size={18} />,
      //     to: routsNameMain.home,
      //     notification: 0
      //   }
      // ],

      notification: 0,
      accordion: false
    },
    {
      label: 'Submissões',
      icon: <CircleCheckBig className="text-xs" size={18} />,
      to: routsNameMain.task.result,

      notification: 0,
      accordion: false
    },
    {
      label: 'Desempenho',
      icon: <CalendarDays className="text-xs" size={18} />,
      to: routsNameMain.performance.index,

      notification: 0,
      accordion: false
    },
    {
      label: 'Materiais',
      icon: <FaRegFilePdf className="text-xs" size={18} />,
      to: routsNameMain.material,

      notification: 0,
      accordion: false
    }
  ]

  const mapLinks = dash.map((item, index) => {
    return (
      <>
        {item.accordion && <AccordionSidBar items={item} />}
        {!item.accordion && (
          <Link
            key={index}
            to={item.to}
            className="w-full py-2 px-3 flex items-center justify-between gap-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md transition-all duration-200 hover:pl-3  "
          >
            <div className="flex flex-row items-center justify-start gap-3 ">
              <span>{item.icon}</span>

              <span
                className={`${!menuIsVisible && 'hidden'} group-hover:flex`}
              >
                {item.label}
              </span>
            </div>

            {item.notification != 0 && (
              <span className="w-6 h-6 text-black text-xs p-2 flex flex-row items-center justify-center rounded-full bg-blue-200">
                {item.notification}
              </span>
            )}
          </Link>
        )}
      </>
    )
  })

  return (
    <>
      <nav
        className={`fixed z-10 left-0 h-screen group w-64 ${
          menuIsVisible ? 'w-64' : 'w-[3.6rem] '
        } overflow-auto transition-all duration-300 hover:w-64 `}
      >
        {/* Container */}
        <div
          className={`w-full h-full py-4 bg-light dark:bg-dark flex flex-col items-start justify-start gap-1 shadow-3xl border-r-[1px] border-gray-200 dark:border-gray-600 transition-all duration-300 
          ${menuIsVisible ? 'px-3' : 'px-2'}
           `}
        >
          {/* SLinkContainer */}
          {mapLinks}
        </div>
      </nav>
    </>
  )
}
