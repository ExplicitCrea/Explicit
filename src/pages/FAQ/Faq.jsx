import { useTranslation } from 'react-i18next';
import { Accordion } from '../../components/Accordion/Accordion'; 
import { AccordionFaq } from './../../utils/Faq/AccordionFaq';
import StyledFaq from './StyledFaq';

export const Faq = () => {
  const {i18n} = useTranslation();
  return (
    <StyledFaq>
      <div className='wrapper'>
        {i18n.language === 'en' ?
          AccordionFaq.en.map((item, index) => <Accordion key={index} title={item.title} content={item.content} />)
          :
          AccordionFaq.fr.map((item, index) => <Accordion key={index} title={item.title} content={item.content} />)
        }
        <div className='background-filter'/>
      </div>
    </StyledFaq>
  )
}



