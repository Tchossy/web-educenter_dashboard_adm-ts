import { AlignLeft, AlignRight, DoorOpen } from 'lucide-react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../provider/AppProvider'
import { DropdownUser } from '../DropdownUser'
import { useAdminStore } from '../../stores/adminStore'

export const Header = () => {
  const { currentAdminData, removeAdmin } = useAdminStore()

  const { menuIsVisible, setMenuIsVisible, isDarkMode, setIsDarkMode } =
    useContext(AppContext)

  const logOut = () => {
    removeAdmin()
  }

  const options = [
    {
      icon: <DoorOpen />,
      label: 'Sair',
      onCLick: logOut
    }
  ]
  const useInfo = {
    photo: currentAdminData?.photo as string,
    name: `${currentAdminData?.first_name} ${currentAdminData?.last_name}`,
    function: 'Admin'
  }

  function toggleDark() {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <>
      <header className="fixed h-20 top-0 left-0 z-10 w-full font-semibold ">
        {/* Container */}
        <div className="h-20 py-4 px-4 bg-light dark:bg-dark flex items-center justify-between shadow-4xl border-b-[1px] border-gray-200 dark:border-gray-600 ">
          <div className="flex items-center justify-center gap-4">
            {/* Menu Button */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setMenuIsVisible(!menuIsVisible)}
                className="text-baseTxtDark dark:text-baseTxtLight"
              >
                {menuIsVisible && <AlignLeft />}
                {!menuIsVisible && <AlignRight />}
              </button>
            </div>

            <img src="/logo.png" alt="Logo" className="max-w-[10rem] " />
          </div>

          <div className="flex items-center justify-center gap-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={toggleDark}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>

            <DropdownUser user={useInfo} options={options} />
          </div>
        </div>
      </header>
    </>
  )
}
