import { docs } from '@/.source/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

export function getPageImage(page: any) {
  const slugs = page.slugs || [];
  return {
    segments: [...slugs, 'image.png'],
    url: `/og/docs/${slugs.join('/')}/image.png`,
  };
}

export async function getLLMText(page: any) {
  const content = typeof page.data.body === 'string' ? page.data.body : '';
  return `# ${page.data.title}\n\n${page.data.description ?? ''}\n\n${content}`;
}
