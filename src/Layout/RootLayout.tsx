import { Outlet } from 'react-router-dom'
import { Header } from '../components/main/Header'
import { useContext } from 'react'
import { AppContext } from '../provider/AppProvider'
import { Slide } from '../components/main/Slide'

function RootLayout() {
  const { menuIsVisible } = useContext(AppContext)

  // useEffect(() => {
  //   document.body.classList.toggle('bg-baseBgDark', isDarkMode)
  //   document.body.classList.toggle('bg-baseBgLight', !isDarkMode)
  // }, [isDarkMode])
  return (
    <>
      <div>
        <div className="w-full h-full text-baseTxtDark dark:text-baseTxtLight bg-baseBgLight dark:bg-baseBgDark">
          <Header />
          <div className="relative h-full z-0 mt-20 flex flex-row items-start justify-center">
            <Slide />
            <div
              className={`w-full h-full flex-1 p-8 transition-all duration-300 ${
                menuIsVisible ? 'ml-64' : 'ml-14'
              }`}
            >
              {/* Main */}
              <Outlet />

              {/* Footer */}
              <div className="flex flex-row justify-start items-center gap-2 mt-8 text-primary-200">
                <span className="opacity-60">Created by</span>
                <a
                  href="http://tchossysolution.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tchossy Solution
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RootLayout
