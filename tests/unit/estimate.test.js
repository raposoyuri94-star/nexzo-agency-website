import test from 'node:test';
import assert from 'node:assert/strict';
import { estimateProject, estimateFromSearch, estimateContactUrl } from '../../src/features/pricing/estimate.js';

test('soma páginas e identidade sem misturar valores mensais', () => {
  const result = estimateProject({ planId: 'institucional', extraPages: 2, identity: true });
  assert.equal(result.min, 38000);
  assert.equal(result.max, 72000);
});

test('não duplica identidade nem acrescenta páginas num projeto de marca', () => {
  const result = estimateProject({ planId: 'identidade', extraPages: 10, identity: true });
  assert.equal(result.min, 8000);
  assert.equal(result.max, 18000);
  assert.equal(result.extraPages, 0);
  assert.equal(result.identity, false);
});

test('limita parâmetros inválidos de URLs', () => {
  assert.equal(estimateProject({ planId: 'inexistente', extraPages: -5 }).plan.id, 'institucional');
  assert.equal(estimateProject({ extraPages: 999 }).extraPages, 10);
  assert.equal(estimateProject({ extraPages: 'abc' }).extraPages, 0);
});

test('leva a estimativa para o contacto sem incluir dados pessoais no URL', () => {
  const original = estimateProject({ planId: 'loja', extraPages: 3, identity: true });
  const url = estimateContactUrl(original);
  const recovered = estimateFromSearch(url.split('?')[1]);
  assert.equal(recovered.min, original.min);
  assert.equal(recovered.max, original.max);
  assert.equal(recovered.plan.id, original.plan.id);
  assert.equal(new URLSearchParams(url.split('?')[1]).has('email'), false);
});
