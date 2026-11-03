import { pricingPlans, pricingExtras } from '../../data/pricing.js';

export function formatMoney(value) {
  return `${new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 0, useGrouping: 'always' }).format(value)} MT`;
}

export function formatRange({ min, max }) {
  return `${formatMoney(min)} a ${formatMoney(max)}`;
}

export function estimateProject({ planId = 'institucional', extraPages = 0, identity = false } = {}) {
  const plan = pricingPlans.find(({ id }) => id === planId) || pricingPlans[1];
  const number = Number(extraPages);
  const pages = plan.id === 'identidade' || !Number.isFinite(number) ? 0 : Math.max(0, Math.min(10, Math.trunc(number)));
  const addIdentity = plan.id !== 'identidade' && identity === true;
  const identityPlan = pricingPlans.find(({ id }) => id === 'identidade');
  return {
    plan, extraPages: pages, identity: addIdentity,
    min: plan.min + pages * pricingExtras.extraPage.min + (addIdentity ? identityPlan.min : 0),
    max: plan.max + pages * pricingExtras.extraPage.max + (addIdentity ? identityPlan.max : 0),
  };
}

export function estimateFromSearch(search) {
  const params = new URLSearchParams(search);
  return estimateProject({ planId: params.get('plano') || 'institucional', extraPages: params.get('paginas') || 0, identity: params.get('identidade') === 'sim' });
}

export function estimateContactUrl(estimate) {
  const params = new URLSearchParams({ plano: estimate.plan.id, paginas: String(estimate.extraPages), identidade: estimate.identity ? 'sim' : 'nao' });
  return `/contacto?${params}`;
}
