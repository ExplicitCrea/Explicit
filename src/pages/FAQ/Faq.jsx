import { Accordion } from '../../components/Accordion/Accordion'; 
import { AccordionFaq } from './../../utils/Faq/AccordionFaq';
import StyledFaq from './StyledFaq';

export const Faq = () => {
  return (
    <StyledFaq>
      <div className='wrapper'>
        {
          AccordionFaq.map((item, index) => <Accordion key={index} title={item.title} content={item.content} />)
        }
        <div className='background-filter'/>
      </div>
    </StyledFaq>
  )
}



