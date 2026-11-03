import { useEffect, useState } from 'react';
import { draftKey, emptyDraft, parseDraft } from './projectBrief';
import { estimateFromSearch, formatRange } from '../pricing/estimate';

export default function useProjectDraft(search) {
  const [form, setForm] = useState({ ...emptyDraft });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let draft = { ...emptyDraft };
    try {
      draft = parseDraft(localStorage.getItem(draftKey));
    } catch {
      /* O formulário funciona sem armazenamento. */
    }
    const params = new URLSearchParams(search);
    if (params.has('plano')) {
      const estimate = estimateFromSearch(search);
      const previousDetails = draft.details.startsWith('Tenho interesse no plano ')
        ? draft.details.split('\n\n').slice(1).join('\n\n')
        : draft.details;
      draft = {
        ...draft,
        service: estimate.plan.service,
        budget: formatRange(estimate),
        details:
          `Tenho interesse no plano ${estimate.plan.name}.${estimate.extraPages ? ` Páginas adicionais: ${estimate.extraPages}.` : ''}\n\n${previousDetails}`.trim(),
      };
    } else if (
      params.get('servico') &&
      ['website', 'redesign', 'store', 'other'].includes(params.get('servico'))
    ) {
      draft.service = params.get('servico');
    }
    setForm(draft);
    setReady(true);
  }, [search]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify(form));
    } catch {
      /* Não impede a preparação do email. */
    }
  }, [form, ready]);

  const update = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  return { form, update };
}
