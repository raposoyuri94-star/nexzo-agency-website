import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseDraft,
  emptyDraft,
  createEmailLinks,
} from '../../src/features/contact/projectBrief.js';

test('recupera de rascunhos inválidos e migra os serviços anteriores', () => {
  for (const input of ['invalid', 'null', '[]', '"texto"'])
    assert.deepEqual(parseDraft(input), emptyDraft);
  const migrated = parseDraft(
    JSON.stringify({ name: 'Ana', service: 'A website redesign', email: 123 }),
  );
  assert.equal(migrated.service, 'redesign');
  assert.equal(migrated.name, 'Ana');
  assert.equal(migrated.email, '');
});

test('preserva acentos e caracteres especiais sem alterar o destinatário', () => {
  const form = {
    name: '  Ana & Luís  ',
    email: 'ana@example.com',
    service: 'website',
    budget: '25 000 MT',
    details: 'Uma loja de café & chá.\nCom catálogo e contactos.',
  };
  const links = createEmailLinks(form, 'nexzoagency@gmail.com');
  const mailto = new URL(links.email);
  const gmail = new URL(links.gmail);
  assert.equal(mailto.pathname, 'nexzoagency@gmail.com');
  assert.equal(mailto.searchParams.get('subject'), 'Pedido de projeto de Ana & Luís');
  assert.match(mailto.searchParams.get('body'), /café & chá/);
  assert.equal(gmail.searchParams.get('to'), 'nexzoagency@gmail.com');
  assert.equal(gmail.searchParams.get('body'), mailto.searchParams.get('body'));
});
