import { useRef } from 'react';
import StyledNewsletter from './StyledNewsletter'
import { IoIosArrowForward } from "react-icons/io";
import jsonp from 'jsonp';
import { Bounce, ToastContainer, toast } from 'react-toastify';

export const Newsletter = () => {
  const ref = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = 'https://explicitcrea.us9.list-manage.com/subscribe/post?u=227922741cdd155ab57d86702&amp;id=5a45e7b932&amp;f_id=000928e1f0';
    const email = e.target.Email.value
    const name = e.target.name.value
    if(name === ""){
      jsonp(`${url}&EMAIL=${email}`, { param: 'c' }, (_, data) => {
        const { msg, result } = data
        console.log(msg, result)
      });
    }
    toast.success("Votre e-mail a été envoyé avec succès!" , {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })
    ref.current.value = "";
  }

  return (
    <StyledNewsletter>
        <h1>
            Sois tenu au courant de toutes les actualités !
        </h1>
        <form onSubmit={handleSubmit}>
            <input className='email' ref={ref} type="email" name="Email" placeholder="Entre ton e-mail !"  required/>
            <input className='name' type="text" name="name" />
            <button><IoIosArrowForward /></button>
        </form>
        <ToastContainer/>
    </StyledNewsletter>
  )
}
