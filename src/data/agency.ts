import { guides } from './guides';
import { enrichServicePages } from './v4';
export const brand = {
  name: 'Slickk Digital Solutions',
  url: 'https://slickk.online',
  email: 'contact@slickk.online',
  tagline: 'Design with purpose. Technology that works.',
  description: 'Slickk Digital Solutions is a Bangladesh-based creative technology studio for identity design, digital experiences, software, SEO and business automation.',
  location: 'Bangladesh',
  social: {
    facebook: '', instagram: '', linkedin: '', github: '', youtube: '', whatsapp: ''
  } as Record<string, string>,
};
export const mainNavigation = [
  { label: 'Services', href: '/services/' }, { label: 'About', href: '/about/' },
  { label: 'Portfolio', href: '/portfolio/' }, { label: 'Pricing', href: '/pricing/' },
  { label: 'Insights', href: '/insights/' }
];
export const services = [
  { slug: 'branding-graphic-design', name: 'Branding & Graphic Design', icon: '00', short: 'Memorable visual identities, logos, brochures and corporate materials.', description: 'Strategy-led identities, logo design, brand guidelines, corporate brochures, company profiles, catalogues, packaging and presentations.', bullets: ['Logo and brand identity systems', 'Corporate brochures and company profiles', 'Packaging, print and presentation design', 'Social campaigns and reusable creative assets'] },
  { slug: 'ai-automation', name: 'AI & Business Automation', icon: '07', short: 'Purposeful workflow automation with human oversight.', description: 'Explore practical AI-enabled assistants, reporting dashboards, customer-support workflows and secure integrations by consultation.', bullets: ['Automation opportunity discovery', 'Business chatbots and knowledge assistants', 'Document and reporting workflows', 'Privacy, testing and handover planning'] },
  { slug: 'software-development', name: 'Software Development', icon: '01', short: 'Smart systems tailored to real business workflows.', description: 'Plan and build custom business applications, automation, dashboards, internal tools and integrations.', bullets: ['Workflow discovery and technical planning', 'Custom business applications and dashboards', 'API integrations and process automation', 'Testing, documentation and maintenance'] },
  { slug: 'app-development', name: 'App Development', icon: '02', short: 'Mobile experiences designed around the people using them.', description: 'Plan Android-first and mobile web applications, with platform feasibility, testing and release responsibilities agreed before implementation.', bullets: ['Product discovery and prototypes', 'Platform feasibility and device coverage', 'Cross-platform engineering', 'Quality assurance and post-launch support'] },
  { slug: 'web-development', name: 'Web Development', icon: '03', short: 'Fast, accessible websites built to explain and convert.', description: 'Build company websites, landing pages, e-commerce storefronts and responsive web experiences.', bullets: ['Corporate and service websites', 'Landing pages and e-commerce planning', 'Responsive performance and accessibility', 'Maintenance and technical improvements'] },
  { slug: 'seo-services', name: 'Search Engine Optimization', icon: '04', short: 'Improve the technical and editorial foundations of search visibility.', description: 'Audit technical SEO, research relevant search intent, improve on-page content and measure organic performance.', bullets: ['Technical SEO audits and fixes', 'Keyword and search-intent research', 'On-page optimization and internal linking', 'Content planning and reporting'] },
  { slug: 'digital-marketing', name: 'Digital Marketing', icon: '05', short: 'Campaigns informed by business objectives, not vanity metrics.', description: 'Plan and manage digital campaigns, social content and performance reporting for relevant audiences.', bullets: ['Marketing strategy and audience discovery', 'Campaign creation and management', 'Social media planning', 'Lead funnel and performance reporting'] },
  { slug: 'content-creation', name: 'Content Creation', icon: '06', short: 'Creative content with a clear purpose and consistent brand voice.', description: 'Create copy, graphics, campaign assets, brand materials and production plans for short-form video.', bullets: ['Website and marketing copywriting', 'Brand and social graphics', 'Content calendars and campaign assets', 'Video concepts, editing and production planning'] },
] as const;
export const pricing = [
  { name: 'Logo Essentials', price: 'From ৳2,000', period: 'per project', description: 'Discovery, two initial concepts, two revision rounds and approved logo image exports; vector output if created.' },
  { name: 'Brand Identity', price: 'From ৳8,000', period: 'per project', description: 'Identity system, color and typography selection, basic brand guideline and practical branded templates.' },
  { name: 'Corporate Brochure', price: 'From ৳5,000', period: 'per project', description: 'Up to four pages using client-provided content, two revisions and a print-ready PDF.' },
  { name: 'Business Website', price: 'From ৳10,000', period: 'per project', description: 'Up to five responsive pages, contact experience, basic on-page SEO and deployment assistance; hosting and third-party charges separate.' },
  { name: 'Social Media Creative', price: 'From ৳5,000', period: '/month', description: 'Eight branded static creatives, basic captions, planned delivery and agreed revision rounds.' },
  { name: 'Growth & SEO', price: 'Custom quote', period: '', description: 'Scope-based technical SEO, local visibility, content strategy and reporting without promised rankings.' },
  { name: 'Custom Development', price: 'Custom quote', period: '', description: 'Web apps, mobile experiences, dashboards and automation proposed after requirements and security review.' },
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
const categoryTitles: Record<string, string> = {
  'web-development': 'Website Development for Businesses',
  'software-development': 'Custom Software Development',
  'app-development': 'Mobile App Development',
  'seo-services': 'SEO Services & Search Visibility',
  'digital-marketing': 'Digital Marketing for Businesses',
  'content-creation': 'Content Creation for Websites & Campaigns',
};
const categoryDescriptions: Record<string, string> = {
  'web-development': 'Plan a responsive business website, useful content and a clear inquiry path with SLICKK. Website work is scoped for businesses in Bangladesh and beyond.',
  'software-development': 'Explore custom software for business workflows, dashboards and secure integrations. SLICKK defines users, requirements and a written delivery scope first.',
  'app-development': 'Plan an Android or cross-platform app around real users, device needs and release responsibilities. Discuss mobile development with SLICKK in Bangladesh.',
  'seo-services': 'Review technical SEO, search intent, on-page content and internal links with SLICKK. Scope practical improvements without promised rankings.',
  'digital-marketing': 'Plan digital campaigns, social creative and measurement around a clear business objective. Discuss audience, channels and scope with SLICKK.',
  'content-creation': 'Prepare website copy, brand graphics and campaign content with a clear audience and approval process. Discuss formats and ownership with SLICKK.',
};
const servicePages: AgencyPage[] = services.map((service) => ({
  slug: service.slug, title: categoryTitles[service.slug] ?? service.name, label: 'Slickk services',
  intro: service.description,
  description: categoryDescriptions[service.slug] ?? service.name + ' from Slickk, a Bangladesh-based software development and digital growth agency. Explore our approach and request a project quote.',
  sections: [
    { title: 'What we can help with', text: service.short, items: service.bullets },
    { title: 'Our approach', text: 'We start with your objectives, audience, constraints and project scope. Then we agree on deliverables, review checkpoints and quality expectations before implementation.' },
    { title: 'Deliverables and pricing', text: 'Project scope, schedule, revisions, third-party costs and ongoing support are agreed in a written proposal. We do not promise outcomes beyond our control.' },
  ],
}));
export const agencyPages: AgencyPage[] = [
  { slug: 'about', title: 'About Slickk', label: 'Our story', intro: 'A Bangladesh-based technology and digital growth business, built to make better digital solutions more accessible.', description: 'Learn about Slickk, our mission, values and approach to software development and digital growth services in Bangladesh and beyond.',
    sections: [
      { title: 'Who we are', text: 'Slickk Digital Solutions is an independent practice led by a solo founder in Bangladesh. We combine focused visual design and practical technology for local and international inquiries. Project capabilities, availability and any specialist support are confirmed before work is accepted.' },
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
  { slug: 'privacy', title: 'Privacy Policy', label: 'Privacy and data handling', intro: 'How Slickk intends to handle information provided when you contact us.', description: 'How SLICKK handles secure inquiries, optional first-party analytics and data-handling requests.', legal: true,
    sections: [
      { title: 'Information you choose to provide', text: 'If you email Slickk, your email provider and ours process your message, reply details and the information you include. The secure inquiry form stores your name, email, optional company and phone, selected service, budget, timeline, reference link and message in a private Cloudflare D1 database. Your consent time and inquiry status are recorded. Authorized staff use a private inbox to respond.' },
      { title: 'Use of information', text: 'Inquiry information is used to respond, evaluate requested services and manage related communications. Avoid sharing payment card data or sensitive personal information in an initial message.' },
      { title: 'Technical services and analytics', text: 'Hosting and anti-abuse providers may process technical information needed to operate the site. Cloudflare Turnstile checks inquiry submissions for abuse. Temporary salted request hashes support rate limits; raw IP addresses are not stored in the inquiry database. Optional first-party analytics records daily page and action totals only after you choose Allow analytics. Counts contain no message contents, email addresses or visitor identifiers. Hosting and security providers may process IP addresses under their own policies.' },
      { title: 'Retention and rights', text: 'Inquiry correspondence is retained only as reasonably needed for the communication and business records, subject to applicable legal requirements. Contact contact@slickk.online to request access, correction or deletion where applicable.' },
      { title: 'Changes and contact', text: 'Updated notices will be published if collection, hosting or marketing practices change. Questions: contact@slickk.online.' },
    ] },
  { slug: 'terms', title: 'Terms of Service', label: 'Legal draft — review before publication', intro: 'General conditions for using this informational website.', description: 'Read the initial Slickk terms draft covering website content, project proposals and limitations.', legal: true,
    sections: [
      { title: 'Website information', text: 'Website content describes services that Slickk intends to offer. Availability, capabilities and pricing depend on project scope and written agreement. Website descriptions do not create a contract.' },
      { title: 'Quotes and engagement', text: 'Written agreements establish deliverables, intellectual property, payment terms, revisions, confidentiality, timelines and maintenance arrangements for commissioned services.' },
      { title: 'No guaranteed results', text: 'Slickk does not guarantee search rankings, advertising conversions, sales or third-party platform uptime. We aim to communicate relevant limitations and assumptions before engagement.' },
      { title: 'Use and ownership', text: 'Do not misuse the website or submit unlawful material. Website designs and content may not be reproduced without appropriate permission. Customer ownership is defined by each signed agreement.' },
      { title: 'Changes', text: 'These are preliminary terms pending legal and commercial review. Contact contact@slickk.online for questions.' },
    ] },
  { slug: 'cookies', title: 'Cookie Policy', label: 'Legal draft — review before publication', intro: 'An explanation of website cookies and optional tracking.', description: 'How SLICKK uses necessary security services and your optional first-party analytics preference.', legal: true,
    sections: [
      { title: 'Current website design', text: 'The public website is designed to work without optional tracking cookies. Hosting and security infrastructure may use necessary cookies or technical signals to protect service availability.' },
      { title: 'Optional first-party analytics', text: 'Optional first-party analytics is disabled until you choose Allow analytics. It records daily aggregate page and inquiry-action counts without visitor identifiers or contact/message data. The slickk-analytics preference in local browser storage remembers yes or no. Use Analytics preferences in the footer to change your choice; Necessary only stops future optional events. No advertising pixels are configured.' },
      { title: 'Your options', text: 'You can manage browser cookies and site permissions in your browser settings. For questions, write to contact@slickk.online.' },
    ] },
];
export type PortfolioConcept = { slug:string; title:string; discipline:string; eyebrow:string; summary:string; objective:string; deliverables:readonly string[]; note:string };
export const portfolioConcepts: readonly PortfolioConcept[] = [
  { slug:'identity-system', title:'An identity built to travel', discipline:'Branding', eyebrow:'Identity concept / self-initiated', summary:'A cohesive contemporary identity system for a fictional independent hospitality group.', objective:'Explore how distinctive color, typography and design tokens can carry across signage, stationery and digital touchpoints.', deliverables:['Logo exploration and identity system','Brand color and typography study','Stationery and mockups'], note:'Demonstration project. No commercial client or quantified result is claimed.' },
  { slug:'corporate-brochure', title:'Clarity on every page', discipline:'Brochure Design', eyebrow:'Brochure concept / self-initiated', summary:'An editorial four-page corporate brochure concept for a fictional professional services practice.', objective:'Show how a print-ready document could present complex services with elegant hierarchy and purposeful spacing.', deliverables:['Four-page editorial layout direction','Typography and visual hierarchy','Print production checklist'], note:'Visual concept only, not an actual commissioned or printed deliverable.' },
  { slug:'commerce-experience', title:'A cleaner path to purchase', discipline:'Website Development', eyebrow:'Commerce concept / self-initiated', summary:'A concept for a responsive digital storefront with thoughtful navigation and product storytelling.', objective:'Explore product discovery, mobile checkout patterns and a clear content architecture.', deliverables:['Responsive storefront wireframes','Product and category page direction','Performance and accessibility considerations'], note:'Proposed concept. Not a live shop and no conversion results are claimed.' },
  { slug:'operations-dashboard', title:'Information, made actionable', discipline:'Automation', eyebrow:'Software concept / self-initiated', summary:'A conceptual dashboard for internal workflow visibility, approvals and useful reporting.', objective:'Present complex operational information in a way that helps a team take the next action.', deliverables:['Dashboard interface study','Role-based workflow outline','Reporting data model sketch'], note:'Demonstration interface, not a shipped customer product.' },
  { slug:'social-campaign', title:'Creative with a purpose', discipline:'Digital Marketing', eyebrow:'Marketing concept / self-initiated', summary:'A coordinated visual campaign concept for a fictional local lifestyle brand.', objective:'Illustrate cohesive messaging across formats while maintaining identifiable campaign hierarchy.', deliverables:['Social creative direction','Caption and content themes','Channel adaptation concept'], note:'Self-initiated work. No advertising spend, reach or sales claims.' },
] as const;
export const detailedServices: AgencyPage[] = [
  { slug:'logo-design', title:'Professional Logo Design', label:'Branding & design', intro:'A recognizable visual signature, designed for a real audience and practical applications.', description:'Explore professional logo design services by Slickk Digital Solutions in Bangladesh, from concept exploration to approved files.', sections:[
    {title:'The challenge',text:'A logo should feel recognizable across storefronts, websites, packaging and smaller mobile displays. Good design starts by understanding the audience and competitive context.'},
    {title:'What we can deliver',text:'Discovery brief, concepts, refinement, version variations and final export formats agreed in writing.',items:['Initial concept exploration','Color and monochrome usage','PNG and JPG; vector file when created','Revision scope and use guidance']},
    {title:'Our design process',text:'Brief → references and strategic direction → concept review → refinement → approved export. Timelines depend on feedback and complexity.'},
    {title:'Pricing & next step',text:'Logo Essentials is an illustrative launch package from ৳2,000; the written proposal confirms deliverables, file formats and revision rounds.'}
  ]},
  { slug:'brochure-design', title:'Corporate Brochure Design', label:'Corporate design', intro:'Clear, carefully paced documents that explain your business and make a professional impression.', description:'Slickk corporate brochure design service in Bangladesh for company introductions, products and B2B communication.', sections:[
    {title:'Where brochures help',text:'Corporate introductions, trade discussions, sales meetings, proposals and event marketing often benefit from a coherent print or digital brochure.'},
    {title:'Deliverables',text:'Editorial layout, typography, content placement and print-ready PDF to an agreed page count.',items:['Company-provided copy and imagery','Up to four pages in the illustrative starter package','Two proposed revision rounds','Print-ready PDF and documented production assumptions']},
    {title:'Process',text:'Review content and audience, agree page architecture, design sample spreads, refine with feedback and prepare final files.'}
  ]},
  {slug:'brand-identity', title:'Brand Identity Systems', label:'Branding & design', intro:'Build a consistent recognizable brand across every relevant touchpoint.', description:'Brand identity systems, guidelines and reusable design assets by Slickk Digital Solutions.', sections:[
    {title:'Beyond a logo',text:'An identity includes colors, typography, tone, layouts, graphical language and usage rules that work together.'},
    {title:'Practical assets',text:'Depending on scope, deliver logo rules, palette, type selections, social layouts, stationery and starter guidelines.',items:['Brand discovery and positioning session','Visual direction and identity exploration','Guide PDF and reusable templates']},
    {title:'Collaboration',text:'We validate decisions against your communication needs and propose only the deliverables useful to your business.'}
  ]},
  {slug:'company-profile-design',title:'Company Profile Design',label:'Corporate design',intro:'Introduce your organization with a credible, structured company profile.',description:'Company profile design for Bangladesh businesses preparing proposals, tenders and B2B partnerships.',sections:[
    {title:'Business-first storytelling',text:'Organize capabilities, mission, business background and useful proof points into a clear narrative.'},
    {title:'Typical sections',text:'Company overview, services, process, industry coverage and contact details, with factual claims verified by the client.',items:['Content hierarchy and editorial design','Visual identity alignment','Digital PDF and optional print specifications']},
    {title:'Production',text:'A project plan includes content owner, review cycles, page count and file preparation.'}
  ]},
  {slug:'website-development',title:'Website Development',label:'Digital experiences',intro:'High-performance websites built around business goals, accessibility and clear messaging.',description:'Website development services in Bangladesh: company websites, e-commerce, landing pages and performance optimization.',sections:[
    {title:'Websites built to perform',text:'Scoping covers information architecture, responsive layouts, fast loading, content quality and contact journeys.'},
    {title:'Capabilities',text:'Corporate sites, landing pages, e-commerce options, redesigns and CMS integration by consultation.',items:['UI and content architecture','Responsive, accessible interfaces','SEO foundation and metadata','Deployment and handover planning']},
    {title:'Delivery process',text:'Discover → plan → design → build → QA → owner review → deployment. Hosting and third-party services are scoped separately.'}
  ]},
  {slug:'app-development',title:'App Design & Development',label:'Applications',intro:'Thoughtful mobile products and internal applications with clear user journeys.',description:'Android and cross-platform application development consultation from Slickk Digital Solutions.',sections:[
    {title:'Mobile with a purpose',text:'Identify important workflows, offline needs, integrations, onboarding and ongoing maintenance before engineering.'},
    {title:'Development options',text:'Android, cross-platform and business utility applications are evaluated case by case.',items:['Product discovery and interface flows','Prototype and architecture planning','Implementation and quality assurance','Release requirements and support review']},
    {title:'Responsible scoping',text:'Platform accounts, stores, third-party APIs and advanced integrations have separate cost and access requirements.'}
  ]},
  {slug:'digital-marketing',title:'Digital Marketing Services',label:'Digital growth',intro:'Purposeful campaigns, thoughtful creative and measurable reporting.',description:'Digital marketing in Bangladesh including social media management, campaign content, analytics and conversion planning.',sections:[
    {title:'Start with the objective',text:'Reach, qualified inquiries, retention and useful measurement require different campaign approaches.'},
    {title:'Our approach',text:'Discovery, audience research, messaging, content production, channel planning, reporting and iterative improvement.',items:['Social media content direction','Meta and Google Ads planning by consultation','Campaign visuals and landing pages','Reporting with clear caveats']},
    {title:'No guaranteed outcomes',text:'Platform rules, budgets, audiences and market conditions affect results. Advertising spend and provider fees are separate.'}
  ]},
  {slug:'seo',title:'SEO & Search Visibility',label:'Search strategy',intro:'Build a stronger foundation for discovery by the customers who matter.',description:'SEO services in Bangladesh: technical audits, on-page optimization, local visibility and search-intent research.',sections:[
    {title:'Technical foundations',text:'Audit crawlability, page hierarchy, metadata, internal linking, structured data and Core Web Vitals opportunities.'},
    {title:'Content and local relevance',text:'Map actual search intent to useful pages and improve clarity without keyword stuffing.',items:['Technical SEO recommendations','Local business visibility planning','Search intent and information architecture','Transparent measurement and next-step reporting']},
    {title:'Expectations',text:'No agency can guarantee a specific Google ranking, traffic level or conversion outcome.'}
  ]},
  {slug:'graphic-design',title:'Graphic Design Services',label:'Creative production',intro:'Clear visual communication for digital and print touchpoints.',description:'Graphic design agency services including stationery, packaging, product catalogues and social graphics by Slickk.',sections:[
    {title:'Designed for context',text:'Good creative balances brand recognition, legibility, practical dimensions and the place it will appear.'},
    {title:'Design applications',text:'Corporate presentations, annual report layouts, company profiles, packaging, flyers, posters and social assets.',items:['Social creative and infographics','Print-ready brochures and catalogues','Presentation, stationery and exhibition graphics']},
    {title:'Working agreement',text:'Each project defines file dimensions, output formats, source asset responsibilities, revisions and licensing.'}
  ]},
  {slug:'ai-automation',title:'AI Automation & Workflow Consulting',label:'Intelligent workflows',intro:'Explore practical automations without losing oversight of your data and processes.',description:'Slickk Digital Solutions AI business automation consultation: knowledge assistants, CRM workflows and reporting.',sections:[
    {title:'Appropriate automation',text:'Useful opportunities can include structured intake, document workflows, support drafting and reporting.'},
    {title:'Options by consultation',text:'Feasibility, security, human review and integration constraints are established before accepting work.',items:['Knowledge-base assistants and chatbots','Document processing and categorization','Lead qualification and workflow routing','Reporting dashboards and AI integration planning']},
    {title:'Risk and accountability',text:'Sensitive-data access, hallucination risks, costs and fallback behavior require documented controls and validation.'}
  ]},
];
agencyPages.push(
  {slug:'industries',title:'Industries We Serve',label:'Where we can help',intro:'From growing local businesses to complex B2B teams, digital solutions begin with real industry needs.',description:'Slickk Digital Solutions welcomes inquiries from retail, professional services, hospitality, education, logistics and other industries.',sections:[
    {title:'Professional services',text:'Clear company profiles, informative websites and useful lead-intake experiences.'},
    {title:'Retail and e-commerce',text:'Digital storefront concepts, product communication, performance and conversion planning.'},
    {title:'Education, hospitality and logistics',text:'Audience-specific websites, accessible content and practical operational workflows by consultation.'}
  ]},
  {slug:'process',title:'Our Process',label:'How we collaborate',intro:'A clear, documented journey from first conversation to reliable handover.',description:'Discover how Slickk Digital Solutions plans, designs, develops, tests and hands over digital projects.',sections:[
    {title:'01 — Discover',text:'Discuss the business outcome, audience, constraints, budget and existing assets before suggesting solutions.'},
    {title:'02 — Define',text:'Provide a written proposal with deliverables, ownership, revisions, schedule, payment assumptions and review gates.'},
    {title:'03 — Design & develop',text:'Produce agreed assets or working software, review progress against objectives and manage changes transparently.'},
    {title:'04 — Validate & hand over',text:'Run applicable functionality, accessibility, performance and security checks, document findings and provide agreed handover materials.'}
  ]},
  {slug:'insights',title:'Insights & Resources',label:'Practical knowledge',intro:'Useful starting points for building a more credible digital presence.',description:'Read introductory guides from Slickk Digital Solutions about business websites, branding and digital growth foundations.',sections:[
    {title:'What makes a business website credible?',text:'Begin with the customer question: what do you offer, who is it for, and how can someone ask about it? Use a distinct service page, readable navigation and a direct contact route. Check the site on a real phone, test the form and publish only proof you can support. A starting checklist: accurate contact details, HTTPS, clear pricing scope, helpful page titles, small images and keyboard access.'},
    {title:'A practical logo and branding brief',text:'Write down the audience, the problem your business solves and three qualities the identity should communicate. Collect examples to explain direction without copying them. List where the logo will appear: social avatar, invoice, website, packaging or signage. Confirm background variants, minimum sizes, file formats and who holds font or image licenses. Agree the selected concept, consolidated revision rounds and approval owner before production.'},
    {title:'Before you pay for SEO',text:'First check that important pages return HTTP 200, have one clear purpose and link from useful navigation. Confirm canonical URLs, sitemap access and helpful page titles. Use verified Search Console and Bing accounts to review indexing; a submitted sitemap does not guarantee inclusion. Separate delivered fixes from measured search results. Agree reporting dates, data sources and the page-to-keyword map, and reject guaranteed-ranking or purchased-link promises.'}
  ]},
  {slug:'request-quote',title:'Request a Project Quote',label:'Start a project',intro:'Share your goals, timeline and approximate budget, and we can discuss a realistic scope.',description:'Start an inquiry for graphic design, websites, branding, SEO and digital solutions at Slickk Digital Solutions.',sections:[
    {title:'Prepare your brief',text:'Include your company, target audience, deliverables, reference examples, desired timeframe and budget range. Do not share passwords or sensitive financial information.'},
    {title:'Send securely',text:'Use the contact page to prepare an email inquiry. Email draft mode requires your confirmation before sending. Automated submission is not claimed unless independently enabled and verified.'}
  ]}
);
export const caseStudyPaths = portfolioConcepts.map((p) => '/portfolio/' + p.slug + '/');
enrichServicePages([...servicePages, ...detailedServices]);
export const detailServicePaths = detailedServices.map((p) => '/services/' + p.slug + '/');
export const indexablePaths = [...guides.map(guide=>'/insights/'+guide.slug+'/'), '/', '/contact/', '/faq/', ...agencyPages.map((p) => '/' + p.slug + '/'), ...detailServicePaths, ...caseStudyPaths];
