import { AlignLeft, AlignRight, DoorOpen, User } from 'lucide-react'
import { useContext } from 'react'
import { AppContext } from '../../provider/AppProvider'
import { DropdownUser } from '../DropdownUser'
import { useAdminStore } from '../../stores/adminStore'
import DarkModeSwitcher from './DarkModeSwitcher'

export const Header = () => {
  const { currentAdminData, removeAdmin } = useAdminStore()

  const { menuIsVisible, setMenuIsVisible } = useContext(AppContext)

  const logOut = () => {
    removeAdmin()
  }

  const options = [
    {
      icon: <User />,
      label: `${currentAdminData?.first_name} ${currentAdminData?.last_name}`,
      onCLick: () => null
    },
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
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            <DropdownUser user={useInfo} options={options} />
          </div>
        </div>
      </header>
    </>
  )
}
