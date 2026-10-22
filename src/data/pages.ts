import { mission, vision, values } from './site';

export type Section = { title: string; text: string; items?: readonly string[] };
export type EditorialPage = { slug: string; eyebrow: string; title: string; intro: string; description: string; sections: Section[]; cta?: string };

export const editorialPages: EditorialPage[] = [
  {
    slug: 'about', eyebrow: 'A considered approach', title: 'Global perspective.\nBangladesh at heart.',
    intro: 'SLICKK is an international fresh-fruit sourcing and import-oriented business brand focused on the Bangladesh market.',
    description: 'Meet SLICKK: our mission, vision, values and approach to international fruit sourcing for Bangladesh.',
    sections: [
      { title: 'Built around better sourcing conversations', text: 'We welcome conversations with overseas fruit exporters and Bangladesh-based wholesale buyers. Our focus is apples, oranges and fresh grapes, with China, South Africa and Egypt as initial sourcing markets of interest. These priorities describe our direction; they do not imply existing supplier contracts or available stock.' },
      { title: 'Our mission', text: mission },
      { title: 'Our vision', text: vision },
      ...values.map(([title, text]) => ({ title, text })),
      { title: 'Research with a commercial purpose', text: 'Technology and procurement research help organize supplier information, compare specifications and prepare more focused questions. We distinguish market research from confirmed offers and verified shipment information. Long-term relationships begin with careful evaluation and clear expectations.' },
    ], cta: 'Start a conversation',
  },
  {
    slug: 'quality-logistics', eyebrow: 'Care beyond the harvest', title: 'Fresh produce.\nThoughtful coordination.',
    intro: 'Quality depends on details: the specification agreed, the packing chosen and the way a proposed shipment is handled.',
    description: 'Explore SLICKK’s quality-conscious approach to fresh-fruit specifications, packaging, cold-chain awareness and import planning.',
    sections: [
      { title: 'Begin with the specification', text: 'Discuss variety, grade, size, maturity, net weight and acceptable tolerances before commercial terms are settled. Photos and descriptions support discussion, but they do not replace an agreed inspection process.' },
      { title: 'Inspect with a clear purpose', text: 'Supplier evaluation should consider fruit condition, visible damage, packing quality and consistency with the agreed specification. Define inspection responsibilities, timing and the process for reporting discrepancies in writing.' },
      { title: 'Pack for the journey', text: 'Carton strength, ventilation, liners and protective materials should suit the product and transport plan. Labeling, lot identification and net weight details help maintain clarity throughout handling.' },
      { title: 'Keep temperature in the conversation', text: 'Fresh fruit has product-specific handling needs. Discuss pre-cooling, storage, transit conditions and temperature records with suppliers and qualified logistics providers. Plan transfer points carefully to reduce avoidable breaks in temperature management.' },
      { title: 'Coordinate before shipment', text: 'Agree responsibilities for freight, insurance, inspection, documentation and arrival arrangements. Confirm proposed lead times rather than treating estimates as guaranteed delivery dates.' },
      { title: 'Review documents and requirements', text: 'A proposed transaction may involve commercial invoices, packing lists, transport documents, origin information and phytosanitary or other certificates. Exact requirements depend on the product, origin and current rules. Confirm them with the relevant authorities and qualified customs professionals before shipment.' },
      { title: 'Make commitments realistic', text: 'SLICKK’s approach emphasizes planning and communication. This website does not claim certified facilities, inspection accreditation or guaranteed freshness outcomes. Product offers and service responsibilities require separate written confirmation.' },
    ], cta: 'Discuss your requirements',
  },
  {
    slug: 'why-slickk', eyebrow: 'Purpose in every detail', title: 'A focused partner\nfor your next conversation.',
    intro: 'Our intended differentiators are practical: a clear market focus, careful questions and professional communication.',
    description: 'Discover SLICKK’s Bangladesh market focus, quality-conscious sourcing priorities and partnership-oriented approach.',
    sections: [
      { title: 'International focus, local relevance', text: 'Our sourcing interests connect China, South Africa and Egypt with the needs of Bangladesh’s fresh-produce trade. Discussions begin with the product and market requirements that matter to each buyer.' },
      { title: 'Quality-conscious procurement', text: 'We encourage specifications that make quality expectations understandable: variety, grade, size, packaging, handling and documentation. Clear requirements create a better basis for comparing supplier proposals.' },
      { title: 'Communication that moves work forward', text: 'We aim to keep commercial conversations organized and responsive. Estimates, open questions and confirmed facts should remain distinct so both sides understand what still needs agreement.' },
      { title: 'Technology-informed awareness', text: 'Structured research supports sourcing decisions and helps compare information. Market observations are context, not proof of current inventory, prices or completed shipments.' },
      { title: 'Relationships with a longer view', text: 'Our objective is constructive collaboration with exporters and wholesale buyers. Responsible coordination, transparent information and realistic commitments are the principles we want those relationships to reflect.' },
    ], cta: 'Meet SLICKK by email',
  },
  {
    slug: 'for-exporters', eyebrow: 'For international exporters', title: 'Let’s explore\nthe Bangladesh market.',
    intro: 'Export apples, oranges or fresh grapes? Introduce your business and tell us about a potential sourcing opportunity.',
    description: 'Introduce your fruit export business to SLICKK. Share product specifications, origin, packaging and proposed commercial terms.',
    sections: [
      { title: 'An invitation to connect', text: 'SLICKK welcomes introductory inquiries from fruit exporters, particularly in China, South Africa and Egypt. An inquiry opens a discussion; it does not establish a supplier relationship or purchase commitment.' },
      { title: 'What to include', text: 'A useful introduction gives enough detail for an informed follow-up. Please share information you are authorized to disclose.', items: ['Company name, website, business contact and country of origin.', 'Product, variety, grade, size range and available harvest or packing window.', 'Packing format, carton net weight, labeling and minimum order quantity.', 'Indicative price, currency, proposed shipment terms and named place or port.', 'Estimated lead time, transport options and offer validity.', 'Relevant certificates, traceability information and document availability, where applicable.'] },
      { title: 'From introduction to evaluation', text: 'Product specifications, business information, documentation and proposed terms need review before a transaction can move forward. Any testing, inspection, export eligibility or certification claim should be supported by appropriate evidence.' },
      { title: 'Respect for commercial information', text: 'Do not send confidential customer lists, private personal details or banking information in an initial inquiry. Supplier information is not published on this website. Agree any confidentiality requirements directly before sharing sensitive material.' },
    ], cta: 'Email an exporter introduction',
  },
  {
    slug: 'for-buyers', eyebrow: 'For Bangladesh wholesale buyers', title: 'Your requirements.\nA clear starting point.',
    intro: 'Tell us what your business is looking for. A precise brief helps shape a useful sourcing discussion.',
    description: 'Send SLICKK a wholesale fruit inquiry for apples, oranges or grapes, with quantities, preferred origins and packing requirements.',
    sections: [
      { title: 'Start with the fruit', text: 'We welcome wholesale inquiries for apples, oranges and fresh grapes from Bangladesh-based businesses. Availability and supply arrangements must be checked individually; the website is not a live inventory catalog.' },
      { title: 'Prepare your inquiry', text: 'Include the details already known, and identify any preferences that are flexible.', items: ['Business name, contact name and email.', 'Product, preferred variety, grade and size.', 'Required quantity with an explicit unit, such as cartons or metric tonnes.', 'Preferred origin and any acceptable alternatives.', 'Packaging format and carton weight preferences.', 'Destination, requested timing and any documentation requirements.'] },
      { title: 'Discuss availability and quotations', text: 'A sourcing conversation may need further specifications and supplier checks. Any quotation should identify its currency, quantity, validity, packing, shipment terms and conditions. Prices and delivery dates are not guaranteed by this website.' },
      { title: 'Confirm before committing', text: 'An inquiry is not a confirmed order. Product availability, payment arrangements, responsibilities and delivery terms require separate written agreement between the relevant parties.' },
    ], cta: 'Email a wholesale inquiry',
  },
  {
    slug: 'responsible-sourcing', eyebrow: 'A responsible direction', title: 'Better questions.\nMore informed decisions.',
    intro: 'Responsible sourcing starts with knowing what needs to be checked, documented and agreed.',
    description: 'SLICKK’s sourcing principles cover supplier evaluation, traceability objectives, documentation awareness and responsible logistics planning.',
    sections: [
      { title: 'Assess the proposed supplier', text: 'Review business identity, product information, packing capabilities and supporting documents. Certification claims should be checked for issuer, validity and scope rather than accepted from a logo alone.' },
      { title: 'Make quality expectations explicit', text: 'Agree measurable product specifications and a process for inspecting and reporting discrepancies. Clear standards help reduce misunderstandings and avoidable waste.' },
      { title: 'Work toward traceability', text: 'Seek origin, packhouse, lot and packing-date information where applicable. Traceability is an objective to address in each sourcing discussion, not a claim that every proposed supply chain has already been audited.' },
      { title: 'Plan logistics responsibly', text: 'Suitable packing, careful handling and coordinated temperature management can support produce condition. Discuss practical measures with the parties responsible for storage and transport.' },
      { title: 'Keep documentation meaningful', text: 'Check that the documents supplied relate to the proposed goods and transaction. Exact import and export requirements need confirmation with the appropriate authorities and qualified advisers.' },
      { title: 'Improve through evidence', text: 'Record lessons from supplier evaluations and commercial discussions. SLICKK does not claim a certified sustainability program, independently audited supply chain or environmental performance figures.' },
    ], cta: 'Discuss a sourcing opportunity',
  },
  {
    slug: 'privacy', eyebrow: 'Website information', title: 'Privacy policy',
    intro: 'This notice explains how this website and email inquiry flow handle information.',
    description: 'Read how the SLICKK static website, Cloudflare hosting and email inquiries handle personal information.',
    sections: [
      { title: 'Information you choose to share', text: 'This website has no user accounts, checkout or server-side inquiry form. Email links open your own email application. The optional inquiry builder prepares a draft on your device and does not send its contents to SLICKK until you send the email. Draft entries are not saved by the website.' },
      { title: 'Contact inquiries', text: 'If you email contact@slickk.online, the correspondence may contain your name, business name, email address, country and message. SLICKK uses this information to consider and respond to your inquiry and manage related business discussions. Please avoid sending unnecessary sensitive information.' },
      { title: 'Hosting and email infrastructure', text: 'Cloudflare Pages delivers this website and may process connection information such as IP address, request details and security logs to provide its service. Incoming business email uses Cloudflare Email Routing and is forwarded to a private mailbox. Email providers process messages under their own terms and privacy notices. Infrastructure providers may process data in countries outside Bangladesh.' },
      { title: 'Analytics, cookies and browser storage', text: 'The website code does not install analytics, advertising pixels or tracking cookies, and does not use local storage. Fonts, scripts and images are served with the site. Cloudflare may apply infrastructure security measures under its own policies; hosting-level settings should be reviewed by the owner.' },
      { title: 'Retention and sharing', text: 'Inquiry correspondence is retained for the period needed to respond and manage the related discussion, subject to applicable recordkeeping requirements. There is no fixed automated deletion period for email. Information needed for a proposed transaction may be shared with relevant service providers or counterparties when appropriate; agree confidentiality requirements before sending sensitive material.' },
      { title: 'Security and your requests', text: 'HTTPS helps protect website traffic in transit, but no website or email channel can promise absolute security. For questions about your information, or a request for access, correction or deletion, email contact@slickk.online. Requests will be considered in light of applicable obligations and legitimate recordkeeping needs.' },
      { title: 'Changes to this notice', text: 'This notice should be reviewed when website features or data practices change. The current draft was prepared on 22 October 2026 and requires the owner’s review of actual business practices before publication.' },
    ],
  },
  {
    slug: 'terms', eyebrow: 'Website information', title: 'Terms of use',
    intro: 'Please read these terms when using the SLICKK website and making a business inquiry.',
    description: 'SLICKK website terms: informational content, acceptable use, product inquiries and separate written commercial agreements.',
    sections: [
      { title: 'Purpose of this website', text: 'SLICKK presents information about its international fresh-fruit sourcing interests and welcomes B2B inquiries. Website content is general information, not customs, legal or professional advice.' },
      { title: 'Product and market information', text: 'Product descriptions, example varieties, broad HS codes and sourcing markets provide context for discussion. They do not establish available stock, export eligibility, a supplier relationship, a price or a delivery commitment. Confirm detailed tariff classifications and requirements with qualified professionals.' },
      { title: 'Inquiries and commercial agreements', text: 'Sending an inquiry does not place or confirm an order and does not automatically create a contract. Any transaction requires separate agreement on product specifications, quantity, price, payment, inspection, shipment, responsibilities and other applicable commercial conditions.' },
      { title: 'Acceptable use', text: 'Use the website lawfully. Do not attempt unauthorized access, disrupt availability, introduce malicious code, impersonate another business or misuse contact details for unsolicited bulk messages.' },
      { title: 'Intellectual property', text: 'The website’s original branding, design and content are intended for SLICKK’s business use. Third-party material, if identified, remains subject to its respective rights and license. Do not imply endorsement or a commercial relationship without permission.' },
      { title: 'Availability and external links', text: 'Content and website availability may change. Information should be confirmed before commercial reliance. External websites, when linked, are controlled by their operators and have their own terms and privacy practices.' },
      { title: 'Questions and updates', text: 'Contact contact@slickk.online with website or commercial questions. These terms are a draft prepared on 22 October 2026 for owner review before publication. They do not select a legal jurisdiction, assert a registered corporate status or replace a transaction-specific contract.' },
    ],
  },
];

export const faqs = [
  ['Which products does SLICKK focus on?', 'Our initial categories are fresh apples, oranges and grapes. The product pages provide general sourcing information, not a list of stock.'],
  ['Which countries are sourcing targets?', 'China, South Africa and Egypt are initial markets of interest. These targets do not establish existing contracts or supplier partnerships.'],
  ['How do I make a wholesale inquiry?', 'Email contact@slickk.online with your business details, product specifications, quantity and unit, preferred origin, packaging and requested timing.'],
  ['Can international exporters contact SLICKK?', 'Yes. Share your business introduction, origin, products, grades, packing, minimum order quantity, proposed terms and relevant documentation.'],
  ['Are the products currently available?', 'Availability requires individual confirmation. This website does not show live stock, supplier offers or guaranteed supply.'],
  ['Where can I find prices or a quotation?', 'Request a discussion by email. Any quotation needs confirmed specifications, quantity, currency, validity and commercial terms. No prices are published here.'],
  ['Can I specify packaging?', 'Include your preferred format, carton weight, labeling and other packing requirements. Feasibility must be discussed with the proposed supplier.'],
  ['What documents are needed for importing fruit?', 'Requirements depend on the product, origin, destination and current rules. Confirm applicable documents and permissions with relevant authorities and qualified customs professionals before shipment.'],
  ['Does an inquiry confirm an order?', 'No. An inquiry starts a discussion. A transaction requires separate written agreement on specifications, price, payment, responsibilities and shipment terms.'],
  ['How should I contact the business?', 'Use contact@slickk.online. The inquiry builder opens an email draft in your own application; you must send it yourself. No response time is guaranteed.'],
  ['Does SLICKK accept international inquiries?', 'Yes. English is the website’s primary language. Include your country, business details and the purpose of your inquiry.'],
  ['What do the HS codes mean?', 'The displayed codes are broad product references: apples 0808.10, oranges 0805.10 and fresh grapes 0806.10. They are not national tariff advice; confirm the detailed classification separately.'],
] as const;
