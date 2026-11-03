import { pricingPlans, pricingExtras } from '../../data/pricing.js';

export function formatMoney(value) {
  return `${new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 0, useGrouping: 'always' }).format(value)} MT`;
}

export function formatRange({ min, max }) {
  return `${formatMoney(min)} a ${formatMoney(max)}`;
}

export function estimateProject({ planId = 'institucional', extraPages = 0 } = {}) {
  const plan = pricingPlans.find(({ id }) => id === planId) || pricingPlans[1];
  const number = Number(extraPages);
  const pages = !Number.isFinite(number) ? 0 : Math.max(0, Math.min(10, Math.trunc(number)));
  return {
    plan,
    extraPages: pages,
    min: plan.min + pages * pricingExtras.extraPage.min,
    max: plan.max + pages * pricingExtras.extraPage.max,
  };
}

export function estimateFromSearch(search) {
  const params = new URLSearchParams(search);
  return estimateProject({
    planId: params.get('plano') || 'institucional',
    extraPages: params.get('paginas') || 0,
  });
}

export function estimateContactUrl(estimate) {
  const params = new URLSearchParams({
    plano: estimate.plan.id,
    paginas: String(estimate.extraPages),
  });
  return `/contacto?${params}`;
}
