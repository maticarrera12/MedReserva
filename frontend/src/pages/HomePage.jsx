import BannerComponent from "../components/BannerComponent"
import HeaderComponent from "../components/HeaderComponent"
import SpecialityMenuComponent from "../components/SpecialityMenuComponent"
import TopDoctorsComponent from "../components/TopDoctorsComponent"

const HomePage = () => {
  return (
    <div>
      <HeaderComponent/>
      <SpecialityMenuComponent/>
      <TopDoctorsComponent/>
      <BannerComponent/>
    </div>
  )
}

export default HomePage