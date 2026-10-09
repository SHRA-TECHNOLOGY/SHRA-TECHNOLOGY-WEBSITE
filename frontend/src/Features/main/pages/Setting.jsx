import React,{useState} from 'react'
import CommonNavbar from '../components/Navbar/CommonNavbar'
import LeftPart from '../components/Settings/LeftPart'
import RightPart from '../components/Settings/RightPart'


const Setting = () => {

  const [activeBtn, setActiveBtn] = useState("Background")

  return (
    <>
      <CommonNavbar title={"Settings"} message={"Manage your account and preference."} />

      <div className="main-container">

        <LeftPart activeBtn={activeBtn} setActiveBtn={setActiveBtn}/>
        <RightPart activeBtn={activeBtn}/>

      </div>

    </>
  )
}

export default Setting
