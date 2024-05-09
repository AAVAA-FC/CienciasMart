import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import HeaderBuyer from "../HeaderBuyer/HeaderBuyer";
import "./HomeBuyer.css";


function HomeBuyer(){
    return(
       <>
          <HeaderBuyer></HeaderBuyer>
          <FeaturedProducts></FeaturedProducts>
       </>
    );
}

export default HomeBuyer;