export interface Guide {
  slug: string;
  title: string;
  description: string;
  intro: string;
  date: string;
  readingTime: string;
  serviceSlug: string;
  serviceName: string;
  sections: { title: string; paragraphs: string[]; checklist?: string[] }[];
}

export const guides: Guide[] = [
  {
    slug: 'business-website-cost-bangladesh',
    title: 'What goes into a business website budget in Bangladesh?',
    description: 'Plan a business website budget around pages, content, functionality and ownership, with SLICKK’s BDT 10,000 starting package as a concrete example.',
    intro: 'A useful website quote explains what you receive, what you must provide and what happens after launch. Start with scope before comparing a price.',
    date: '2026-10-28', readingTime: '4 minute read', serviceSlug: 'website-development', serviceName: 'Business website development',
    sections: [
      { title: 'Start with one business outcome', paragraphs: [
        'Write down what a visitor should do after reading your website. A local service business may need a qualified inquiry. A supplier may need buyers to understand its range and request a quotation. These are different goals from taking payment, managing inventory or running a customer portal.',
        'Name one primary action and the information a visitor needs before taking it. This makes the page plan easier to agree and prevents a simple brochure website from quietly becoming a custom software project.'
      ] },
      { title: 'Understand the starting package', paragraphs: [
        'SLICKK’s Business Website package starts at BDT 10,000 per project. The published scope covers up to five responsive pages, a contact experience, basic on-page SEO and deployment assistance. Hosting and third-party charges are separate. This is SLICKK’s own starting package, not a measured average for the Bangladesh market.',
        'Five pages might mean Home, About, Services, Work and Contact. The final arrangement depends on your content. A product catalogue, multiple languages, account login, payments or a private dashboard needs its own review. The written proposal confirms deliverables, exclusions, revisions and the final price.'
      ] },
      { title: 'Separate content from functionality', paragraphs: [
        'Count both the pages and the work inside them. One page with supplied text and photographs differs from a page requiring interviews, original copy, illustrations and product research. Decide who provides the logo, approved company information, photography, service descriptions and legal wording.',
        'For each feature, describe the expected result. “Contact form” should explain the required fields, where inquiries are stored, who can read them and whether email notifications are included. Never assume that a visible form also includes a customer management system.'
      ], checklist: ['List required pages and their owner-approved content.', 'Separate launch essentials from later additions.', 'Confirm image licences and permission to publish client references.'] },
      { title: 'Budget for ownership after launch', paragraphs: [
        'Ask which accounts you will own and how you will receive the source files. Record domain renewal, hosting, paid services and any ongoing support separately from the build. A free service tier can have usage limits; it is not a promise of unlimited free operation.',
        'Agree who updates prices, checks inquiries and handles future changes. Ask what is covered when something breaks, how long any included support lasts and whether content updates cost extra. Keep recovery details in a secure place rather than inside public website files.'
      ] },
      { title: 'Compare proposals using the same brief', paragraphs: [
        'Send each provider the same page list, content status, features, target date and budget range. Compare what is included rather than just the headline amount. Ask for a realistic delivery sequence with an approval point before publication.',
        'Before accepting, confirm mobile usability, working links, form behavior and handover expectations. Basic on-page SEO can improve the foundations of a site; it does not guarantee rankings, traffic or sales. A clear scope gives both sides a practical definition of a finished website.'
      ] }
    ]
  },
  {
    slug: 'professional-brand-identity', title: 'How to brief a professional brand identity',
    description: 'Prepare a useful brand identity brief: audience, applications, feedback, file formats and the difference between a logo and a coordinated identity.',
    intro: 'A logo is one part of an identity. The useful question is how your business should look and communicate across the places customers encounter it.',
    date: '2026-10-28', readingTime: '4 minute read', serviceSlug: 'brand-identity', serviceName: 'Brand identity design',
    sections: [
      { title: 'Explain the business before the style', paragraphs: [
        'Start your brief with what you sell, who makes the buying decision and what customers need to understand. Include your approved business name, the language you use with customers and the situations where the identity will appear. Avoid asking a designer to infer these facts from a reference image.',
        'Describe a few useful qualities, such as practical, confident or welcoming, and explain why they fit. If you have existing materials, say what should remain recognisable and what causes problems. A redesign should have a reason beyond wanting something different.'
      ] },
      { title: 'Choose the scope you actually need', paragraphs: [
        'SLICKK’s Logo Essentials starts at BDT 2,000 and includes discovery, two initial concepts, two revision rounds and approved logo image exports; vector output is included when created. The Brand Identity package starts at BDT 8,000 and covers an identity system, colour and typography selection, a basic guideline and practical branded templates.',
        'A Corporate Brochure starts at BDT 5,000 for up to four pages using client-provided content, two revisions and a print-ready PDF. These are SLICKK starting packages, not market averages. Your written proposal should specify which applications and files are included; an identity package does not automatically include every brochure, website or social post.'
      ] },
      { title: 'Bring references with explanations', paragraphs: [
        'Collect a small set of references and annotate each one. You might like the spacing of one example, the restrained palette of another and the readability of a third. Explain the property you value instead of asking for a copy of an existing mark.',
        'Include practical constraints: a shop sign viewed from a distance, a small social avatar, monochrome invoice printing or text in more than one language. These applications help test a design against real use. Only provide assets you have permission to share and publish.'
      ], checklist: ['Business name, audience and positioning.', 'Priority applications and required languages.', 'Existing files, ownership information and useful references.'] },
      { title: 'Make feedback actionable', paragraphs: [
        'Choose one person to collect feedback and return a consolidated response. Connect comments to the brief: “The company name becomes hard to read at this size” is easier to act on than “make it premium.” Distinguish a factual correction from a personal preference.',
        'Agree how many concepts and revision rounds are included, and what happens when the direction changes after approval. Review the identity in realistic applications before approving it. A design that looks appealing on a large presentation may need adjustments for a small icon or printed document.'
      ] },
      { title: 'Plan a usable handover', paragraphs: [
        'Confirm the file formats, colour variations and usage notes before work begins. PNG can support a transparent background; JPEG is useful for a flattened image with a background. Ask explicitly about editable or vector files rather than assuming every image export can be resized indefinitely.',
        'The handover should explain the approved colours, typography and basic spacing rules within the agreed scope. Record any font or image licensing requirements. Store a clean master folder and use those approved files consistently when commissioning the next website, document or campaign.'
      ] }
    ]
  },
  {
    slug: 'software-project-brief', title: 'Write a software brief that a developer can estimate',
    description: 'Turn a business workflow into a practical software brief with users, data, permissions, acceptance checks and a manageable first release.',
    intro: 'You do not need technical specifications to start. You need a clear explanation of the work, the people doing it and the result you want to improve.',
    date: '2026-10-28', readingTime: '4 minute read', serviceSlug: 'software-development', serviceName: 'Custom software development',
    sections: [
      { title: 'Describe today’s workflow', paragraphs: [
        'Choose one real process and explain it from beginning to end. For example, an inquiry arrives, an employee records the request, a manager approves a quote and a customer receives the agreed details. Name the tools currently used and the points where people repeat work or lose information.',
        'Use an anonymised example to make the problem concrete. Avoid sending passwords or real customer records in an initial inquiry. A description of the fields and a fictional sample usually provides enough context for the first discussion.'
      ] },
      { title: 'Name the users and their permissions', paragraphs: [
        'List who will use the system and what each person can do. An administrator may manage users, while an employee can create records and a supervisor can approve them. Explain whether customers need an account or only receive a document.',
        'Also describe exceptions. Can an approved record be edited? Who can export information? What should happen when an employee leaves? These questions shape both the interface and the access controls, so they belong in the brief rather than being left until launch.'
      ] },
      { title: 'Define the smallest useful first release', paragraphs: [
        'Separate essential tasks from later improvements. A first release might let authorised staff create, find and update records with a clear status history. Automated messages, advanced reports and integrations can follow if the core workflow proves useful.',
        'Describe success in observable terms. “Staff can find an inquiry by reference number and see its latest status” is testable. “Make the business fully automated” is too broad to estimate. Agree a small set of acceptance checks that the owner can run before approving delivery.'
      ], checklist: ['User roles and allowed actions.', 'Required fields, statuses and search behavior.', 'Five essential tasks with an expected result for each.'] },
      { title: 'Identify dependencies and operating conditions', paragraphs: [
        'List any existing website, spreadsheet, accounting tool or external service the software must connect to. State whether an authorised API or export is available, who owns the account and whether the service has fees. An integration is a dependency to verify, not a feature to promise before access is reviewed.',
        'Explain where the software will be used: office computers, Android phones, a browser, unreliable connectivity or shared devices. If offline work is essential, say which tasks must work without a connection and how conflicts should be resolved when people reconnect.'
      ] },
      { title: 'Agree delivery and responsibility', paragraphs: [
        'Share a target date, budget range and the person who can answer questions. Ask for a proposal that separates discovery, development, review, deployment and ongoing support. Custom software is quoted after requirements and security review; a brochure website starting price is not a software estimate.',
        'Confirm source ownership, backups, account handover, data retention and responsibility for updates. Include a way to report defects and distinguish fixes from new features. Before publication, test the agreed tasks with realistic sample data and confirm that access restrictions work for every role. A good brief becomes a shared checklist for that review.'
      ] }
    ]
  }
];
