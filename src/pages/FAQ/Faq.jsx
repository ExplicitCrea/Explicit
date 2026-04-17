import { useTranslation } from 'react-i18next';
import { Accordion } from '../../components/Accordion/Accordion'; 
import { AccordionFaq } from './../../utils/Faq/AccordionFaq';
import StyledFaq from './StyledFaq';

export const Faq = () => {
  const {i18n} = useTranslation();
  let l = i18n.language;
  if(l == 'fr') {
    l = 'fr-FR';
  }
  return (
    <StyledFaq>
      <div className='wrapper'>
        {AccordionFaq[l].map((item, index) => <Accordion key={index} title={item.title} content={item.content} />)}
        <div className='background-filter'/>
      </div>
    </StyledFaq>
  )
}