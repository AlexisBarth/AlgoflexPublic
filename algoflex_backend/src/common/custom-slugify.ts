import slugify from 'slugify';

interface slugifyOptions {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
}

export function customSlugify(value: string, options?: slugifyOptions) {
  return slugify(value, {
    lower: true,
    ...options,
  });
}
