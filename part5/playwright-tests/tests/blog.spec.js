const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helpers');

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
    });
    await page.goto('/');
    await loginWith(page, 'mluukkai', 'salainen');
  });

  test('a new blog can be created', async ({ page }) => {
    await createBlog(page, {
      title: 'Playwright Blog',
      author: 'Playwright',
      url: 'http://example.com'
    });
    await expect(page.getByText('Playwright Blog')).toBeVisible();
  });

  test('a blog can be liked', async ({ page }) => {
    await createBlog(page, {
      title: 'Likeable Blog',
      author: 'Author',
      url: 'http://like.com'
    });
    await page.getByText('view').click();
    await page.getByRole('button', { name: 'like' }).click();
    await expect(page.getByText('likes 1')).toBeVisible();
  });

  test('creator can delete blog', async ({ page }) => {
    await createBlog(page, {
      title: 'Deletable Blog',
      author: 'Author',
      url: 'http://delete.com'
    });
    await page.getByText('view').click();
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'remove' }).click();
    await expect(page.getByText('Deletable Blog')).not.toBeVisible();
  });

  test('only creator sees delete button', async ({ page, request, context }) => {
    await createBlog(page, {
      title: 'Private Blog',
      author: 'Author',
      url: 'http://private.com'
    });

    // Cerrar sesión
    await page.getByRole('button', { name: 'logout' }).click();

    // Crear otro usuario y loguearse
    await request.post('/api/users', {
      data: {
        username: 'otheruser',
        name: 'Other User',
        password: 'password123',
      }
    });

    await loginWith(page, 'otheruser', 'password123');
    await page.getByText('view').click();

    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible();
  });

  test('blogs are ordered by likes', async ({ page }) => {
    const blogs = [
      { title: 'Least liked', author: 'A', url: 'http://a.com' },
      { title: 'Most liked', author: 'B', url: 'http://b.com' },
      { title: 'Middle liked', author: 'C', url: 'http://c.com' },
    ];

    for (let blog of blogs) await createBlog(page, blog);

    // Like manually
    const titles = ['Most liked', 'Middle liked'];
    for (let i = 0; i < titles.length; i++) {
      await page.getByText(titles[i]).getByText('view').click();
    }

    const like = async (title, times) => {
      for (let i = 0; i < times; i++) {
        await page.getByText(title).getByRole('button', { name: 'like' }).click();
      }
    };

    await like('Most liked', 3);
    await like('Middle liked', 2);

    const blogTitles = await page.locator('.blog').allTextContents();
    expect(blogTitles[0]).toContain('Most liked');
    expect(blogTitles[1]).toContain('Middle liked');
    expect(blogTitles[2]).toContain('Least liked');
  });
});
