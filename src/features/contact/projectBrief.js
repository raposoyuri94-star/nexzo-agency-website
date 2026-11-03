import { serviceOptions } from '../../data/services.js';

export const draftKey = 'nexzo-project-draft';
export const emptyDraft = { name: '', email: '', service: 'website', budget: '', details: '' };
const legacyServices = { 'A new website': 'website', 'A website redesign': 'redesign', 'Brand identity': 'identity', 'Branding and a website': 'identity-website', 'Something else': 'other' };

export function parseDraft(serialized) {
  try {
    const stored = JSON.parse(serialized);
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return { ...emptyDraft };
    const draft = Object.fromEntries(Object.entries(emptyDraft).map(([key, fallback]) => [key, typeof stored[key] === 'string' ? stored[key] : fallback]));
    draft.service = legacyServices[draft.service] || draft.service;
    if (!serviceOptions.some(({ value }) => value === draft.service)) draft.service = 'website';
    return draft;
  } catch { return { ...emptyDraft }; }
}

export function createBrief(form) {
  const service = serviceOptions.find(({ value }) => value === form.service)?.label || 'Outro projeto';
  return `Nexzo\nResumo do projeto\n\nNome: ${form.name.trim()}\nEmail: ${form.email.trim()}\nProjeto: ${service}\nInvestimento previsto: ${form.budget.trim() || 'A definir'}\n\nSobre o projeto\n${form.details.trim()}\n`;
}

export function createEmailLinks(form, recipient) {
  const subject = `Pedido de projeto de ${form.name.trim()}`;
  const body = createBrief(form);
  return {
    email: `mailto:${recipient}?${new URLSearchParams({ subject, body })}`,
    gmail: `https://mail.google.com/mail/?${new URLSearchParams({ view: 'cm', fs: '1', to: recipient, su: subject, body })}`,
  };
}
