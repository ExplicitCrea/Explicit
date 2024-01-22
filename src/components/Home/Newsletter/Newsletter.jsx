import StyledNewsletter from './StyledNewsletter'
import { IoIosArrowForward } from "react-icons/io";

export const Newsletter = () => {
  return (
    <StyledNewsletter>
        <h1>
            Sois tenu au courant de toutes les actualités !
        </h1>
        <div>
            <input type="text" placeholder="Entre ton e-mail !" />
            <button><IoIosArrowForward /></button>
        </div>
    </StyledNewsletter>
  )
}
