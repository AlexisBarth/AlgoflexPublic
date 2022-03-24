import slugify from 'slugify';

interface SlugifyOptions {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
}

export function customSlugify(value: string, options?: SlugifyOptions) {
  return slugify(value, {
    lower: true,
    ...options,
  });
}
