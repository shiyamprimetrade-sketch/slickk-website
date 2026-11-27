export const site = {
  name: 'SLICKK',
  url: 'https://slickk.online',
  email: 'contact@slickk.online',
  tagline: 'Freshness Across Borders',
  description: 'Connecting international fresh-fruit sourcing opportunities with Bangladesh’s growing produce market.',
};

export const navigation = [
  ['About', '/about/'],
  ['Our products', '/products/'],
  ['Global sourcing', '/global-sourcing/'],
  ['Quality & logistics', '/quality-logistics/'],
] as const;

export const footerLinks = [
  ['Why SLICKK', '/why-slickk/'],
  ['For exporters', '/for-exporters/'],
  ['For wholesale buyers', '/for-buyers/'],
  ['Responsible sourcing', '/responsible-sourcing/'],
  ['FAQs', '/faq/'],
  ['Contact', '/contact/'],
  ['Privacy policy', '/privacy/'],
  ['Terms of use', '/terms/'],
] as const;

export function inquiryLink(subject: string, body = '') {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const products = [
  {
    id: 'apples', name: 'Fresh apples', short: 'Apples', hs: '0808.10', number: '01',
    description: 'Crisp texture. Distinct character. A versatile fruit for Bangladesh’s wholesale market.',
    detail: 'From sweet and aromatic to bright and tart, apple varieties offer different eating qualities. Fuji, Gala and Granny Smith are examples for discussion, not a list of stock held by SLICKK.',
    origin: 'China and South Africa are sourcing markets of interest. Origin, variety and harvest timing must be confirmed with each proposed supplier.',
    packaging: 'Discuss count size, fruit diameter, carton weight, trays and protective packing. Agree tolerances and labeling before an order is confirmed.',
    quality: 'Evaluate firmness, maturity, skin condition and visible damage. Storage and transport conditions should suit the selected variety and journey.',
    color: 'apple',
  },
  {
    id: 'oranges', name: 'Fresh oranges', short: 'Oranges', hs: '0805.10', number: '02',
    description: 'Bright citrus. Fresh possibilities. Sourcing conversations shaped around buyer requirements.',
    detail: 'Oranges differ in sweetness, acidity, juice content and peel characteristics. Navel and Valencia types are general examples; a quotation should identify the actual variety and grade.',
    origin: 'Egypt, South Africa and China are markets to explore. Supplier offers, export eligibility and seasonal availability need individual confirmation.',
    packaging: 'Specify size range, carton weight, ventilation, labeling and protection from compression. Packaging should support handling and the planned transport conditions.',
    quality: 'Review maturity, external appearance, damage and product specifications. Temperature and humidity planning should reflect the fruit and supplier guidance.',
    color: 'orange',
  },
  {
    id: 'grapes', name: 'Fresh grapes', short: 'Grapes', hs: '0806.10', number: '03',
    description: 'Delicate by nature. Considered at every step, from packhouse discussions to arrival planning.',
    detail: 'Green, red and dark grape varieties have different flavor, berry size and shelf-life characteristics. Seeded and seedless preferences should be stated at inquiry stage.',
    origin: 'China, South Africa and Egypt are sourcing targets. Specific varieties, export windows and offers depend on supplier confirmation.',
    packaging: 'Discuss punnets or bags, carton dimensions, net weight and ventilation. Agree any permitted packing treatments and required disclosures with qualified parties.',
    quality: 'Review berry firmness, stem condition, decay and damage. Grapes require careful cold-chain coordination; agree handling conditions and temperature records before shipment.',
    color: 'grape',
  },
] as const;

export const values = [
  ['Quality & freshness', 'Consider produce condition, handling and freshness from the first sourcing discussion through logistics planning.'],
  ['Integrity & transparency', 'Share accurate information, communicate clearly and make realistic commercial commitments.'],
  ['International collaboration', 'Develop constructive relationships between overseas exporters and buyers in Bangladesh.'],
  ['Customer focus', 'Start with the buyer’s specifications, quantities, packing preferences and commercial priorities.'],
  ['Responsible sourcing', 'Evaluate suppliers, seek traceability information and review documentation requirements.'],
  ['Continuous improvement', 'Use technology, commercial research and process review to improve sourcing decisions.'],
  ['Professional reliability', 'Value accountability, consistent communication and commitments that reflect confirmed information.'],
] as const;

export const mission = 'To connect Bangladesh’s fruit market with quality fresh produce from international sourcing markets through transparent communication, responsible sourcing and efficient import coordination.';
export const vision = 'To become a trusted name in Bangladesh’s fresh-fruit importing and wholesale supply industry by building strong international relationships, embracing modern technology and consistently prioritizing quality and reliability.';

export const markets = [
  { name: 'China', code: 'CN', position: 'china', text: 'Explore apple, citrus and grape sourcing opportunities. Confirm variety, packhouse information, export documentation and the commercial offer with each supplier.' },
  { name: 'South Africa', code: 'ZA', position: 'south-africa', text: 'Consider apple, citrus and grape opportunities in sourcing discussions. Align proposed harvest and shipping windows with buyer requirements and supplier availability.' },
  { name: 'Egypt', code: 'EG', position: 'egypt', text: 'Explore citrus and grape opportunities, with attention to specifications, packing, handling and the documentation required for a proposed shipment.' },
] as const;
