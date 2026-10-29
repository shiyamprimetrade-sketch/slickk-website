export const serviceSilos = [
  { slug: 'web-development', name: 'Website Development', details: [
    { slug: 'website-development', name: 'Business website development', summary: 'Scope a responsive company website, content structure and launch handover.' },
  ] },
  { slug: 'software-development', name: 'Software Development', details: [] },
  { slug: 'app-development', name: 'Mobile App Development', details: [
    { slug: 'app-development', name: 'App design and development', summary: 'Plan mobile workflows, platform feasibility, testing and release responsibilities.' },
  ] },
  { slug: 'seo-services', name: 'Search Engine Optimization', details: [
    { slug: 'seo', name: 'SEO and search visibility', summary: 'Review technical foundations, search intent and useful on-page improvements.' },
  ] },
  { slug: 'digital-marketing', name: 'Digital Marketing', details: [
    { slug: 'digital-marketing', name: 'Digital marketing services', summary: 'Plan audience, channel, creative and reporting for a scoped campaign.' },
  ] },
  { slug: 'content-creation', name: 'Content Creation', details: [] },
] as const;

export const parentForDetail = (slug: string) => serviceSilos.find(silo => silo.details.some(detail => detail.slug === slug));
