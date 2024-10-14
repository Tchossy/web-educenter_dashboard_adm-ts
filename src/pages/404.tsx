import Aos from 'aos'
import { useEffect } from 'react'

function FourOhFour() {
  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])

  return (
    <>
      <h1>FourOhFour</h1>
    </>
  )
}

export default FourOhFour
