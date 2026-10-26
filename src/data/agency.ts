export const brand = {
  name: 'Slickk',
  url: 'https://slickk.online',
  email: 'contact@slickk.online',
  tagline: 'Software. Creativity. Growth.',
  description: 'Slickk helps businesses build websites, custom software, mobile applications and effective digital growth campaigns.',
  location: 'Bangladesh',
  social: {
    facebook: '', instagram: '', linkedin: '', github: '', youtube: '', whatsapp: ''
  } as Record<string, string>,
};
export const mainNavigation = [
  { label: 'Services', href: '/services/' }, { label: 'About', href: '/about/' },
  { label: 'Portfolio', href: '/portfolio/' }, { label: 'Pricing', href: '/pricing/' },
  { label: 'FAQs', href: '/faq/' }
];
export const services = [
  { slug: 'software-development', name: 'Software Development', icon: '01', short: 'Smart systems tailored to real business workflows.', description: 'Plan and build custom business applications, automation, dashboards, internal tools and integrations.', bullets: ['Workflow discovery and technical planning', 'Custom business applications and dashboards', 'API integrations and process automation', 'Testing, documentation and maintenance'] },
  { slug: 'app-development', name: 'App Development', icon: '02', short: 'Mobile experiences designed around the people using them.', description: 'Design and develop Android, iOS and cross-platform apps, from discovery to testing and release planning.', bullets: ['Product discovery and prototypes', 'Android and iOS development options', 'Cross-platform engineering', 'Quality assurance and post-launch support'] },
  { slug: 'web-development', name: 'Web Development', icon: '03', short: 'Fast, accessible websites built to explain and convert.', description: 'Build company websites, landing pages, e-commerce storefronts and responsive web experiences.', bullets: ['Corporate and service websites', 'Landing pages and e-commerce planning', 'Responsive performance and accessibility', 'Maintenance and technical improvements'] },
  { slug: 'seo-services', name: 'Search Engine Optimization', icon: '04', short: 'Improve the technical and editorial foundations of search visibility.', description: 'Audit technical SEO, research relevant search intent, improve on-page content and measure organic performance.', bullets: ['Technical SEO audits and fixes', 'Keyword and search-intent research', 'On-page optimization and internal linking', 'Content planning and reporting'] },
  { slug: 'digital-marketing', name: 'Digital Marketing', icon: '05', short: 'Campaigns informed by business objectives, not vanity metrics.', description: 'Plan and manage digital campaigns, social content and performance reporting for relevant audiences.', bullets: ['Marketing strategy and audience discovery', 'Campaign creation and management', 'Social media planning', 'Lead funnel and performance reporting'] },
  { slug: 'content-creation', name: 'Content Creation', icon: '06', short: 'Creative content with a clear purpose and consistent brand voice.', description: 'Create copy, graphics, campaign assets, brand materials and production plans for short-form video.', bullets: ['Website and marketing copywriting', 'Brand and social graphics', 'Content calendars and campaign assets', 'Video concepts, editing and production planning'] },
] as const;
export const pricing = [
  { name: 'Business Website', price: 'From ৳25,000', period: 'per project', description: 'Scope-based company website package with responsive pages and essential on-page SEO.' },
  { name: 'Website Maintenance', price: 'From ৳5,000', period: '/month', description: 'Agreed maintenance hours, updates and site-health checks.' },
  { name: 'SEO Management', price: 'From ৳15,000', period: '/month', description: 'SEO priorities, technical improvements, content planning and reporting.' },
  { name: 'Digital Marketing', price: 'Custom quote', period: '', description: 'Campaign scope, platforms and creative deliverables priced after discovery.' },
  { name: 'Software Development', price: 'Custom quote', period: '', description: 'Based on requirements, integrations, complexity and delivery phases.' },
  { name: 'Mobile App Development', price: 'Custom quote', period: '', description: 'Quoted for platform, functionality, testing and maintenance requirements.' },
] as const;
export const faqs = [
  { question: 'What does Slickk help businesses with?', answer: 'We focus on websites, software, mobile applications, search visibility, digital marketing and creative content. We discuss the deliverables and practical constraints before confirming a project.' },
  { question: 'Do you work with clients outside Bangladesh?', answer: 'Slickk is based in Bangladesh and welcomes international inquiries. Availability, billing and project arrangements are discussed individually.' },
  { question: 'Are the listed prices final?', answer: 'No. Prices shown are provisional starting points in Bangladeshi taka. A written quote confirms scope, timeline and payment terms before work begins.' },
  { question: 'Can you guarantee a Google ranking or sales results?', answer: 'No. Search rankings, leads and commercial results depend on many factors outside any agency’s control. We can propose measurable work and reporting.' },
  { question: 'How do we begin?', answer: 'Describe your goals and requirements on our contact page or send an email. We can arrange a discovery conversation and propose a suitable next step.' },
] as const;
type Section = { title: string; text: string; items?: readonly string[] };
export type AgencyPage = { slug: string; title: string; label: string; intro: string; description: string; sections: Section[]; legal?: boolean };
const servicePages: AgencyPage[] = services.map((service) => ({
  slug: service.slug, title: service.name, label: 'Slickk services',
  intro: service.description,
  description: service.name + ' from Slickk, a Bangladesh-based software development and digital growth agency. Explore our approach and request a project quote.',
  sections: [
    { title: 'What we can help with', text: service.short, items: service.bullets },
    { title: 'Our approach', text: 'We start with your objectives, audience, constraints and project scope. Then we agree on deliverables, review checkpoints and quality expectations before implementation.' },
    { title: 'Deliverables and pricing', text: 'Project scope, schedule, revisions, third-party costs and ongoing support are agreed in a written proposal. We do not promise outcomes beyond our control.' },
  ],
}));
export const agencyPages: AgencyPage[] = [
  { slug: 'about', title: 'About Slickk', label: 'Our story', intro: 'A Bangladesh-based technology and digital growth business, built to make better digital solutions more accessible.', description: 'Learn about Slickk, our mission, values and approach to software development and digital growth services in Bangladesh and beyond.',
    sections: [
      { title: 'Who we are', text: 'Slickk is a new business in development, serving Bangladesh-based and international businesses. We focus on useful technology, clear communication and realistic project commitments.' },
      { title: 'Our mission', text: 'To make professional digital technology and growth solutions accessible to businesses of different sizes.' },
      { title: 'Our vision', text: 'To become a trusted international technology partner known for useful software, thoughtful design, and measurable business value.' },
      { title: 'How we work', text: 'We value transparency, innovation, reliability, continuous improvement and customer ownership. Client requirements and delivery terms are recorded before a project begins.' },
    ] },
  { slug: 'services', title: 'Our Services', label: 'What we do', intro: 'Practical digital solutions, from software and websites to search, campaigns and creative content.', description: 'Explore Slickk services: software development, app development, websites, SEO, digital marketing and creative content.',
    sections: [
      { title: 'Technology and growth', text: 'Choose a focused service or plan a coordinated project that combines development, discoverability and content.' },
      { title: 'A project starts with understanding', text: 'Tell us about your business, the problem, your timeline and constraints. We will discuss a suitable scope and proposal.' },
    ] },
  ...servicePages,
  { slug: 'portfolio', title: 'Portfolio & Demonstrations', label: 'Ideas in practice', intro: 'A transparent showcase of illustrative project concepts as Slickk develops its client portfolio.', description: 'Explore clearly labeled demonstration concepts for websites, software and digital campaigns at Slickk.',
    sections: [
      { title: 'Business website concept — demonstration', text: 'An illustrative responsive website concept for a professional service business. This is a proposed showcase format, not a claim of commissioned or completed client work.', items: ['Service-focused page hierarchy', 'Responsive landing page concept', 'Contact and conversion planning'] },
      { title: 'Operations dashboard concept — demonstration', text: 'A sample project brief outlining how a business dashboard could organize reports and internal workflows. This is not a deployed client product.', items: ['Role-based dashboard design idea', 'Workflow automation concept', 'Reporting and data quality plan'] },
      { title: 'Local SEO strategy concept — demonstration', text: 'An example roadmap covering website structure, page intent and technical improvements. Rankings and outcomes are not represented as real results.', items: ['Search-intent mapping', 'Technical checklist', 'Measurement plan'] },
    ] },
  { slug: 'pricing', title: 'Services & Pricing', label: 'Transparent starting points', intro: 'Clear starting prices for common services, with tailored quotes for projects that require discovery.', description: 'View Slickk provisional starting prices in BDT for business websites, SEO, website maintenance and custom development.',
    sections: [{ title: 'How quotes work', text: 'Prices are provisional starting points, not fixed offers or established market rates. Each proposal sets out scope, schedule, deliverables, payment terms, revisions and any extra third-party costs.' },
      { title: 'International projects', text: 'International inquiries receive individual written quotes. Currency and payment method will be confirmed before engagement.' }] },
  { slug: 'privacy', title: 'Privacy Policy', label: 'Legal draft — review before publication', intro: 'How Slickk intends to handle information provided when you contact us.', description: 'Read the draft Slickk privacy policy covering inquiries, optional measurement tools and data-handling requests.', legal: true,
    sections: [
      { title: 'Information you choose to provide', text: 'If you email Slickk, your email provider and ours process your message, reply details and the information you include. When a secure inquiry backend is configured, submitted name, email, company, service, budget range and message may be processed to respond to your request.' },
      { title: 'Use of information', text: 'Inquiry information is used to respond, evaluate requested services and manage related communications. Avoid sharing payment card data or sensitive personal information in an initial message.' },
      { title: 'Technical services and analytics', text: 'Hosting and anti-abuse providers may process technical information needed to operate the site. Analytics or advertising measurement should only be activated after review of applicable consent and privacy requirements; activation is not claimed here.' },
      { title: 'Retention and rights', text: 'Inquiry correspondence is retained only as reasonably needed for the communication and business records, subject to applicable legal requirements. Contact contact@slickk.online to request access, correction or deletion where applicable.' },
      { title: 'Changes and contact', text: 'This is an initial policy draft for review before launch. Updated terms will be published if the website’s collection, hosting or marketing practices change. Questions: contact@slickk.online.' },
    ] },
  { slug: 'terms', title: 'Terms of Service', label: 'Legal draft — review before publication', intro: 'General conditions for using this informational website.', description: 'Read the initial Slickk terms draft covering website content, project proposals and limitations.', legal: true,
    sections: [
      { title: 'Website information', text: 'Website content describes services that Slickk intends to offer. Availability, capabilities and pricing depend on project scope and written agreement. Website descriptions do not create a contract.' },
      { title: 'Quotes and engagement', text: 'Written agreements establish deliverables, intellectual property, payment terms, revisions, confidentiality, timelines and maintenance arrangements for commissioned services.' },
      { title: 'No guaranteed results', text: 'Slickk does not guarantee search rankings, advertising conversions, sales or third-party platform uptime. We aim to communicate relevant limitations and assumptions before engagement.' },
      { title: 'Use and ownership', text: 'Do not misuse the website or submit unlawful material. Website designs and content may not be reproduced without appropriate permission. Customer ownership is defined by each signed agreement.' },
      { title: 'Changes', text: 'These are preliminary terms pending legal and commercial review. Contact contact@slickk.online for questions.' },
    ] },
  { slug: 'cookies', title: 'Cookie Policy', label: 'Legal draft — review before publication', intro: 'An explanation of website cookies and optional tracking.', description: 'Slickk cookie policy draft for necessary hosting technologies and future optional analytics.', legal: true,
    sections: [
      { title: 'Current website design', text: 'The public website is designed to work without optional tracking cookies. Hosting and security infrastructure may use necessary cookies or technical signals to protect service availability.' },
      { title: 'Future analytics and marketing', text: 'If analytics or marketing tools are activated, this notice and any required consent controls must be updated before enabling optional tracking. We do not claim such tracking is currently active.' },
      { title: 'Your options', text: 'You can manage browser cookies and site permissions in your browser settings. For questions, write to contact@slickk.online.' },
    ] },
];
export const indexablePaths = ['/', '/contact/', '/faq/', ...agencyPages.map((p) => '/' + p.slug + '/')];
