import { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQList({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  const id = useId();
  return <div className="faq-list">{items.map((item, index) => {
    const open = openIndex === index;
    return <div className="faq-item" key={item.question}>
      <h3><button type="button" aria-expanded={open} aria-controls={`${id}-${index}`} onClick={() => setOpenIndex(open ? null : index)}>{item.question}{open ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}</button></h3>
      <div id={`${id}-${index}`} hidden={!open}><p>{item.answer}</p></div>
    </div>;
  })}</div>;
}
