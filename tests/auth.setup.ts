import { env } from '../env';
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Email').fill((env.E2E_EMAIL ?? '') as string);
  await page
    .getByPlaceholder('Password')
    .fill((env.E2E_PASSWORD ?? '') as string);

  await page.getByRole('button', { name: 'Login with credentials' }).click();

  await page.waitForURL('/');
  await expect(page.getByText('Select your calendar')).toBeVisible();

  await page.context().storageState({ path: authFile });
});
