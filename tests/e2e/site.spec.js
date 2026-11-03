import { test, expect } from '@playwright/test';

test('as páginas têm conteúdo próprio e carregam diretamente', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const [route, title] of [
    ['/', 'Nexzo'],
    ['/projetos', 'Projetos'],
    ['/servicos', 'Serviços'],
    ['/precos', 'Preços'],
    ['/estudio', 'estúdio'],
    ['/contacto', 'Contacto'],
    ['/privacidade', 'Privacidade'],
    ['/projetos/morrow-coffee', 'Morrow Coffee'],
    ['/projetos/hair-kulture', 'Hair Kulture'],
  ]) {
    const response = await page.goto(route);
    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(new RegExp(title));
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('main')).not.toContainText(
      /Identidade visual|logótipo|tipografia|guia de marca/i,
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  expect(errors).toEqual([]);
});

test('o Instagram usa apenas o ícone e o perfil correto', async ({ page }) => {
  await page.goto('/contacto');
  const links = page.getByRole('link', { name: /Instagram da Nexzo/ });
  await expect(links).toHaveCount(2);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', 'https://www.instagram.com/nexzo_agency/');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link.locator('svg')).toHaveClass(/lucide-instagram/);
    expect((await link.innerText()).trim()).toBe('');
  }
  await expect(page.locator('svg[class*=arrow], a[href*=github]')).toHaveCount(0);
});

test('navega para projetos reais e usa histórico do navegador', async ({ page }) => {
  await page.goto('/projetos');
  await page.getByRole('button', { name: 'Lojas online', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  await page.locator('.project-card').first().click();
  await expect(page).toHaveURL(/\/projetos\/morrow-coffee$/);
  await page.getByRole('button', { name: 'Detalhes do site' }).click();
  await expect(page.locator('.project-gallery img')).toHaveAttribute(
    'src',
    '/images/projects/morrow-detail.jpg',
  );
  await page.goBack();
  await expect(page).toHaveURL(/\/projetos$/);
  await page.goForward();
  await expect(page.getByRole('heading', { name: 'Morrow Coffee', exact: true })).toBeVisible();
});

test('a estimativa chega preenchida ao pedido de orçamento', async ({ page }) => {
  await page.goto('/precos');
  await page.getByLabel('Tipo de projeto').selectOption('institucional');
  await page.getByLabel('Páginas adicionais').selectOption('2');
  await expect(page.getByLabel('Incluir identidade visual')).toHaveCount(0);
  await expect(page.locator('.estimate-total strong')).toContainText(/30\s*000 MT a 54\s*000 MT/);
  await page.getByRole('link', { name: 'Pedir um orçamento', exact: true }).click();
  await expect(page).toHaveURL(/\/contacto\?/);
  await expect(page.getByLabel('O que tem em mente?')).toHaveValue('website');
  await expect(page.getByLabel('Investimento previsto')).toHaveValue(/30\s*000 MT a 54\s*000 MT/);
  await expect(page.getByLabel('Conte-nos um pouco sobre o projeto')).toHaveValue(
    /Páginas adicionais: 2/,
  );
  await page.goto('/precos');
  await page.getByLabel('Tipo de projeto').selectOption('loja');
  await page.getByRole('link', { name: 'Pedir um orçamento', exact: true }).click();
  await expect(page.getByLabel('Conte-nos um pouco sobre o projeto')).toHaveValue(
    'Tenho interesse no plano Loja online.',
  );
});

test('prepara o email sem o enviar e permite descarregar o resumo', async ({ page }) => {
  await page.goto('/contacto');
  await page.getByLabel('O seu nome').fill('Ana & Luís');
  await page.getByLabel('Endereço de email').fill('ana@example.com');
  await page
    .getByLabel('Conte-nos um pouco sobre o projeto')
    .fill('Um site para o nosso café, com ementa e contactos.');
  await page.getByRole('button', { name: 'Preparar email', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('A mensagem ainda não foi enviada.');
  const mailto = new URL(
    await page.getByRole('link', { name: 'Abrir aplicação de email' }).getAttribute('href'),
  );
  expect(mailto.pathname).toBe('nexzoagency@gmail.com');
  expect(mailto.searchParams.get('subject')).toBe('Pedido de projeto de Ana & Luís');
  const gmail = new URL(
    await page.getByRole('link', { name: /Abrir no Gmail/ }).getAttribute('href'),
  );
  expect(gmail.searchParams.get('to')).toBe('nexzoagency@gmail.com');
  expect(gmail.searchParams.get('body')).toBe(mailto.searchParams.get('body'));
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Guardar uma cópia', exact: true }).click();
  expect((await download).suggestedFilename()).toBe('nexzo-resumo-do-projeto.txt');
  await page.goto('/privacidade');
  await page.getByRole('button', { name: 'Apagar o meu rascunho' }).click();
  expect(await page.evaluate(() => localStorage.getItem('nexzo-project-draft'))).toBeNull();
});

test('as páginas pré-renderizadas são legíveis sem JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    for (const suffix of ['', '/']) {
      await page.goto(`http://127.0.0.1:4173/precos${suffix}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        /Consulte as estimativas em MZN para sites e lojas online/,
      );
      await expect(
        page.getByRole('heading', { name: 'Site institucional', exact: true }),
      ).toBeVisible();
      await page.goto(`http://127.0.0.1:4173/projetos/hair-kulture${suffix}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        /Uma loja de demonstração para perucas e tissagens/,
      );
      await expect(page.getByRole('heading', { name: 'Hair Kulture', exact: true })).toBeVisible();
    }
  } finally {
    await context.close();
  }
});

test('a navegação móvel fecha com Escape e os URLs desconhecidos têm saída', async ({
  page,
}, info) => {
  await page.goto('/');
  if (info.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Abrir navegação' }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Abrir navegação' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    await page.getByRole('button', { name: 'Abrir navegação' }).click();
    await page
      .locator('#main-navigation')
      .getByRole('link', { name: 'Preços', exact: true })
      .click();
    await expect(page).toHaveURL(/\/precos$/);
  }
  await page.goto('/pagina-inexistente');
  await expect(page.getByRole('heading', { name: 'Este endereço não existe' })).toBeVisible();
  await page.getByRole('link', { name: 'Voltar ao início', exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
});
