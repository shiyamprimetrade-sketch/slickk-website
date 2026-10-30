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
  sources?: { label: string; url: string }[];
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

guides.push(
  {slug:'business-tech-stack-starter-checklist',title:'Business tech stack starter checklist',description:'A practical checklist for choosing domain, email, website, customer records and automation tools without losing account ownership.',intro:'A useful stack starts with the work a business needs to do, the person who owns each account and a budget that remains understandable after launch.',date:'2026-10-30',readingTime:'5 minute read',serviceSlug:'software-development',serviceName:'Software development',sections:[
    {title:'Map the job before choosing brands',paragraphs:['List the tasks that must work on day one: receiving customer inquiries, sending email, publishing services, recording follow-up and collecting payment if relevant. Mark which tasks are essential and which are later improvements. A new tool should solve a named problem, not add another login to manage.','Record who performs each task, what data it uses and what failure would cost. A business with one owner may need a secure inbox and a simple website before it needs a CRM. A shop taking online payments has different requirements from a consultancy collecting quote requests.'],checklist:['One owner for each account and domain.','A written list of essential tasks and their users.','A clear budget for setup and recurring charges.']},
    {title:'Keep the domain and recovery under your control',paragraphs:['Use a domain registered in the business owner’s account. Keep registrar access, DNS records, renewal reminders and recovery methods documented. Give an agency only the access needed for a defined task, then review it at handover.','Separate domain ownership from hosting and mail. A website can move hosts while the same domain remains yours, but DNS changes can also interrupt email. Save current records before any migration and plan a test and rollback window.']},
    {title:'Choose a simple first stack',paragraphs:['For a small service business, a domain, website, professional contact route and private inquiry process may be sufficient. Add a paid mailbox if the team needs managed storage and collaboration. Add a CRM only when inquiry ownership and stages are clear.','Use the Business Stack Finder as a starting shortlist, then check vendor terms and costs yourself. A free tier has limits. An application that stores customer data also needs retention, access control and a backup or export plan.'],checklist:['Test the website and inquiry path on a phone.','Confirm who sees customer data.','Set a review date for unused subscriptions.']},
    {title:'Write the handover test',paragraphs:['Before launch, ask a colleague to find a service, submit a test inquiry, locate the saved record and recover access using the documented owner account. Record what happened and fix gaps.','Keep a list of account owners, billing contacts, renewal dates, export methods and support routes in a private location. The stack is ready when the business can operate it without relying on one developer’s personal laptop.']}
  ],sources:[{label:'Cloudflare Pages documentation',url:'https://developers.cloudflare.com/pages/'},{label:'Google Workspace pricing',url:'https://workspace.google.com/pricing.html'}]},
  {slug:'google-workspace-readiness-checklist',title:'Google Workspace readiness checklist for a business domain',description:'Plan mailbox inventory, DNS, migration, security, billing and rollback before moving business email to Google Workspace.',intro:'Email migration is a continuity project. Inventory what exists, decide who owns the new account and test delivery before changing live records.',date:'2026-10-30',readingTime:'5 minute read',serviceSlug:'software-development',serviceName:'Software development',sections:[
    {title:'Inventory mail and ownership',paragraphs:['List every address, alias, shared mailbox, forwarding rule and group. Note which people need a login and which addresses only receive messages. Export or retain old mail according to business requirements and the provider’s available tools.','Decide who will own billing and the primary administrator account. Set a second recovery method and at least one backup administrator where suitable. Avoid creating the only admin account under a contractor’s private email.'],checklist:['Verified domain and DNS access.','Mailbox count, aliases and retention needs.','Named administrator, recovery owner and billing contact.']},
    {title:'Plan DNS and a controlled cutover',paragraphs:['Record current MX, SPF, DKIM and DMARC settings before editing. Identify other services that send mail for the domain, such as forms or newsletters. A new SPF record must account for legitimate senders; do not publish multiple conflicting SPF records.','Schedule a change window, lower DNS TTL where appropriate, update records from the provider’s current instructions and test inbound and outbound mail. Keep the previous configuration and a rollback plan until delivery is stable. Do not let an automation tool change DNS without the owner’s approval.']},
    {title:'Separate forwarding from mailboxes',paragraphs:['Cloudflare Email Routing can forward incoming messages to a verified destination or Worker. This is useful for simple aliases, but it is not a managed Google Workspace mailbox with its own storage, users and collaboration tools.','Decide whether the business needs a mailbox, forwarding address or group for each identity. This avoids buying seats for aliases while also avoiding a false assumption that forwarding supplies full mailbox features.']},
    {title:'Verify costs and train users',paragraphs:['Check the official Workspace plan, billing country, tax and payment method before ordering. Slickk’s implementation fee, if commissioned, is separate. Do not rely on a referral discount: Bangladesh is absent from Google’s published standard referral country list.','After migration, test recovery, multi-factor authentication, shared-file permissions and day-to-day sending from Android and desktop. Provide users a short guide and set a date to review unused accounts.'],checklist:['Test representative inbound and outbound messages.','Check admin security and user recovery.','Confirm subscription owner and monthly budget.']}
  ],sources:[{label:'Cloudflare Email Routing',url:'https://developers.cloudflare.com/email-routing/'},{label:'Google Workspace pricing',url:'https://workspace.google.com/pricing.html'},{label:'Workspace referral countries',url:'https://workspace.google.com/intl/en_gb/landing/partners/referral/countries/'}]},
  {slug:'cloud-cost-awareness-guide',title:'Cloud cost awareness guide for small teams',description:'Compare static hosting and usage-based cloud services using workload assumptions, official calculators, alerts and an accountable billing owner.',intro:'A free allowance can help you start, but a production service needs a cost owner and a plan for usage beyond the allowance.',date:'2026-10-30',readingTime:'5 minute read',serviceSlug:'software-development',serviceName:'Software development',sections:[
    {title:'Start with the workload',paragraphs:['Describe what runs, how often it runs, who uses it and where data must live. A static brochure site has different cost drivers from a database-backed application or a continuously running virtual machine. Avoid choosing a large platform because a trial credit makes the first month look free.','Estimate traffic, storage, database reads and writes, outbound bandwidth, background jobs and support needs. Write down which assumptions are guesses and set a review date after real use.']},
    {title:'Compare operating effort as well as price',paragraphs:['A static website on Cloudflare Pages can avoid maintaining a server. Functions and D1 still have usage limits and operational concerns. Google Cloud and AWS offer broader managed services, but their product choices, regions and data transfer can make bills less predictable for a small team.','Use official calculators rather than a single copied monthly price. Include the region, usage pattern and any paid support or third-party tools. An estimate is not a guaranteed bill.'],checklist:['Workload and region assumptions.','Monthly usage estimate and peak scenario.','Owner of billing and alerts.']},
    {title:'Set controls before production',paragraphs:['Create budgets and alerts, restrict who can add paid resources, and review invoices. Some alerts do not automatically stop usage, so document an operational response. Where supported, set quotas or limits that match the business risk.','Keep development and production workloads distinct. Shut down unused test resources. Record how to export data, restore service and transfer account ownership if a vendor relationship changes.']},
    {title:'Treat credits carefully',paragraphs:['A generic free trial may have eligibility rules, time limits and product exclusions. The Google Cloud affiliate page describes an exclusive offer for approved affiliates; Slickk has no verified approval and does not offer that promotion.','Ask for a written estimate and a small pilot before committing to a migration. The best platform is the one the team can afford, operate and recover, not the one with the largest introductory credit.']}
  ],sources:[{label:'Google Cloud pricing and calculator',url:'https://cloud.google.com/pricing'},{label:'AWS Pricing Calculator',url:'https://calculator.aws/'},{label:'Cloudflare Pages limits',url:'https://developers.cloudflare.com/pages/platform/limits/'}]},
  {slug:'safe-business-automation-checklist',title:'Safe business automation checklist',description:'Design a small Zapier, Make or Apps Script workflow with clear permissions, test cases, human review and a manual fallback.',intro:'Automation is valuable when it removes repetitive steps without hiding errors or taking unapproved actions in a customer account.',date:'2026-10-30',readingTime:'5 minute read',serviceSlug:'ai-automation',serviceName:'AI automation',sections:[
    {title:'Pick one low-risk workflow',paragraphs:['Write the trigger, the source fields, the destination and the expected result. For example, an accepted inquiry can create a task for a named owner. Identify duplicate requests, missing fields and cases that need human judgment before connecting services.','Use fictional data for the first prototype. Remove personal fields that are not required. Explain who can see the result and how long records remain in each system.'],checklist:['One measurable task and a named owner.','Minimum required data and permissions.','A manual path when the automation is down.']},
    {title:'Review permissions and sending',paragraphs:['Connect customer accounts only with the owner’s consent and the narrowest scopes available. A tool that reads an inbox or writes Drive files can expose much more than a single task needs. Record the access granted and how to revoke it.','Keep outbound email, payments, publishing and irreversible record changes behind human approval until a tested policy permits them. A generated AI draft is an input for review, not a factual or legal sign-off.']},
    {title:'Test failures, retries and cost',paragraphs:['Test the normal path, missing data, duplicate triggers, an expired token, provider downtime and a retry after partial success. Decide how the owner learns that a run failed. Make sure retries do not send repeated messages or create duplicate orders.','Compare Zapier, Make and Apps Script using actual app support, limits, data handling and maintenance effort. Paid plans may be needed as volume grows. Record expected runs and review the bill after launch.']},
    {title:'Hand over a runbook',paragraphs:['Document the trigger, connected accounts, owner, failure alert, pause switch, logs, data retention and recovery steps. Review access when staff or agencies change.','Slickk can help map, test and monitor a workflow under a written scope. The public AI showcase only drafts examples and does not connect to a visitor’s Gmail, Drive or Calendar.']}
  ],sources:[{label:'Google Apps Script documentation',url:'https://developers.google.com/apps-script'},{label:'Zapier Solution Partner overview',url:'https://zapier.com/l/solution-partner'},{label:'Make help center',url:'https://help.make.com/'}]},
);
