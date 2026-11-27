const products = ['all', 'apples', 'oranges', 'grapes'] as const;
export function validProduct(value: string | null): typeof products[number] {
  return products.find((product) => product === value) ?? 'all';
}

export function buildInquiry(data: FormData) {
  const field = (name: string) => String(data.get(name) ?? '').trim();
  const name = field('name'); const business = field('business'); const email = field('email');
  const country = field('country'); const message = field('message');
  if (!name || name.length > 100 || !business || business.length > 140 || !country || country.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || message.length < 20 || message.length > 1200 || field('consent') !== 'on') throw new Error('Invalid inquiry');
  const types = ['General inquiry', 'Exporter introduction', 'Wholesale buyer inquiry', 'Business partnership'];
  const type = types.includes(field('type')) ? field('type') : types[0];
  const product = validProduct(field('product'));
  const body = `Name: ${name}\nBusiness: ${business}\nEmail: ${email}\nCountry: ${country}\nProduct: ${product === 'all' ? 'Multiple / to discuss' : product}\n\n${message}\n\nThis is an inquiry, not a confirmed order.`;
  return `mailto:contact@slickk.online?subject=${encodeURIComponent(`SLICKK — ${type}`)}&body=${encodeURIComponent(body)}`;
}
