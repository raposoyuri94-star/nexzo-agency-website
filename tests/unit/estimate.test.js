import test from 'node:test';
import assert from 'node:assert/strict';
import {
  estimateProject,
  estimateFromSearch,
  estimateContactUrl,
} from '../../src/features/pricing/estimate.js';

test('soma apenas as páginas adicionais ao plano de site', () => {
  const result = estimateProject({ planId: 'institucional', extraPages: 2 });
  assert.equal(result.min, 30000);
  assert.equal(result.max, 54000);
});

test('ignora extras antigos que já não fazem parte da oferta', () => {
  const result = estimateFromSearch('plano=institucional&paginas=2&identidade=sim');
  assert.equal(result.min, 30000);
  assert.equal(result.max, 54000);
  assert.equal(result.extraPages, 2);
});

test('limita parâmetros inválidos de URLs', () => {
  assert.equal(estimateProject({ planId: 'inexistente', extraPages: -5 }).plan.id, 'institucional');
  assert.equal(estimateProject({ extraPages: 999 }).extraPages, 10);
  assert.equal(estimateProject({ extraPages: 'abc' }).extraPages, 0);
});

test('leva a estimativa para o contacto sem incluir dados pessoais no URL', () => {
  const original = estimateProject({ planId: 'loja', extraPages: 3 });
  const url = estimateContactUrl(original);
  const recovered = estimateFromSearch(url.split('?')[1]);
  assert.equal(recovered.min, original.min);
  assert.equal(recovered.max, original.max);
  assert.equal(recovered.plan.id, original.plan.id);
  assert.equal(new URLSearchParams(url.split('?')[1]).has('email'), false);
});
