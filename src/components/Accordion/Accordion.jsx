import { useState } from 'react'
import StyledAccordion from './StyledAccordion'
import { IoIosArrowUp } from "react-icons/io";

export const Accordion = ({key, title, content}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <StyledAccordion key={key} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
            <div className='question-container'>
                <h3>{title}</h3>
                <IoIosArrowUp/>
            </div>
            <p>{content}</p>
        </StyledAccordion>
    )
}