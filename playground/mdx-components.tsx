import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

// Fumadocs exports an object with default MDX components; we coerce it to MDXComponents
// to satisfy Next/MDX typing when merging custom overrides.
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  const base = defaultMdxComponents as unknown as MDXComponents;
  return {
    ...base,
    ...components,
  };
}
