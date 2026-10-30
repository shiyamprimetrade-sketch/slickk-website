export type ProgramType = 'agency_partner' | 'affiliate' | 'referral' | 'professional_network' | 'credits_only';
export type SignupCost = 'free_verified' | 'unknown' | 'requires_paid_account';
export type ApprovalStatus = 'research_only' | 'application_open' | 'applied' | 'approved' | 'rejected' | 'ineligible';
export type GeoEligibility = 'bd_eligible_confirmed' | 'bd_unconfirmed' | 'bd_not_listed' | 'us_ca_only' | 'check';
export type PayoutType = 'cash' | 'credits' | 'professional_leads' | 'unknown';
export interface PartnerProgram {
  id: string; provider: string; category: string; programName: string; officialUrl: string;
  programType: ProgramType; signupCost: SignupCost; approvalStatus: ApprovalStatus;
  geoEligibility: GeoEligibility; payoutType: PayoutType; restrictions: string;
  clientReferralAllowed: 'yes' | 'no' | 'verify'; marketingChannelsAllowed: string;
  approvedTrackingUrl: string; publicBadgeAllowed: boolean; dateVerified: string;
  evidenceUrl: string; disclosureRequired: boolean; notes: string;
}
type Row = [string, string, string, string, string, ProgramType, Partial<PartnerProgram>?];
const rows: Row[] = [
  ['google-workspace-referral','Google Workspace','Professional email','Workspace Referral','https://workspace.google.com/referral-program/','referral',{signupCost:'free_verified',geoEligibility:'bd_not_listed',payoutType:'cash',restrictions:'Bangladesh is absent from the published referrer country list; unique coupons cannot be posted publicly.',evidenceUrl:'https://workspace.google.com/intl/en_gb/landing/partners/referral/countries/',dateVerified:'2026-10-30',notes:'Do not apply with a false country or assume Slickk can earn commissions.'}],
  ['google-workspace-affiliate','Google Workspace','Professional email','Workspace Affiliate','https://workspace.google.com/intl/en_uk/affiliate-program/','affiliate',{payoutType:'cash',restrictions:'Separate CJ application and country requirements; Bangladesh eligibility unconfirmed.',notes:'Higher-volume publisher route, not an enrolled Slickk program.'}],
  ['google-cloud-affiliate','Google Cloud','Cloud','Cloud Affiliate','https://cloud.google.com/affiliate-program','affiliate',{signupCost:'free_verified',approvalStatus:'ineligible',geoEligibility:'us_ca_only',payoutType:'cash',restrictions:'Published program is for affiliates operating in the US or Canada; no social or email promotion.',dateVerified:'2026-10-30',notes:'Affiliate-only trial offer does not apply to Slickk.'}],
  ['google-cloud-partner','Google Cloud','Cloud','Cloud Partner Network','https://cloud.google.com/partners','professional_network',{payoutType:'professional_leads',restrictions:'Application, credentials and partner benefits require independent verification.',notes:'Distinct from the US/Canada affiliate program.'}],
  ['microsoft-ai-cloud','Microsoft','Cloud','AI Cloud Partner Program','https://partner.microsoft.com/en-us/partnership','professional_network',{signupCost:'free_verified',restrictions:'Business verification and benefit requirements apply after no-cost enrollment.',dateVerified:'2026-10-30'}],
  ['aws-partner','AWS','Cloud','AWS Partner Network','https://docs.aws.amazon.com/partner-central/latest/getting-started/becoming.html','professional_network',{signupCost:'requires_paid_account',restrictions:'Registration requires a paid AWS account plan in good standing, even though joining APN has no separate fee.',evidenceUrl:'https://docs.aws.amazon.com/partner-central/latest/getting-started/registration-faq.html',dateVerified:'2026-10-30'}],
  ['cloudflare-partners','Cloudflare','Cloud','Cloudflare Partners','https://www.cloudflare.com/partners/','agency_partner',{restrictions:'Qualification, geography and commercial terms require review.'}],
  ['digitalocean-partners','DigitalOcean','Cloud','Partner Programs','https://www.digitalocean.com/partners','agency_partner',{restrictions:'Different solutions, startup and Marketplace routes have separate requirements.'}],
  ['digitalocean-referral','DigitalOcean','Cloud','Referral Program','https://www.digitalocean.com/referral-program','credits_only',{payoutType:'credits',restrictions:'Hosting credits, not cash income.',dateVerified:'2026-10-30',notes:'Do not count as affiliate revenue.'}],
  ['shopify-partner','Shopify','Website & ecommerce','Partner Program','https://help.shopify.com/en/partners/partner-program/about','agency_partner',{signupCost:'free_verified',payoutType:'cash',restrictions:'Merchant referral and development-store terms apply; Bangladesh payment gateway availability needs separate review.',clientReferralAllowed:'yes',dateVerified:'2026-10-30'}],
  ['shopify-affiliate','Shopify','Website & ecommerce','Affiliate Program','https://help.shopify.com/en/affiliates/about','affiliate',{signupCost:'free_verified',payoutType:'cash',restrictions:'Requires an established audience, original content and approval.',dateVerified:'2026-10-30'}],
  ['hostinger-affiliate','Hostinger','Domain & hosting','Affiliate Program','https://www.hostinger.com/affiliates','affiliate',{payoutType:'cash',restrictions:'Verify Bangladesh payout and permitted channels before applying.'}],
  ['namecheap-affiliate','Namecheap','Domain & hosting','Affiliate Program','https://www.namecheap.com/affiliates/','affiliate',{payoutType:'cash',restrictions:'Affiliate platform, Bangladesh payout and terms require verification.'}],
  ['godaddy-affiliate','GoDaddy','Domain & hosting','Affiliate Program','https://www.godaddy.com/affiliate-programs','affiliate',{payoutType:'cash',restrictions:'Country and payout method require verification.'}],
  ['kinsta-affiliate','Kinsta','Domain & hosting','Affiliate Program','https://kinsta.com/affiliates/','affiliate',{payoutType:'cash',restrictions:'Manual screening, original content and disclosure requirements.'}],
  ['cloudways-agency','Cloudways','Domain & hosting','Agency Partner Program','https://www.cloudways.com/en/agency-partner-program.php','agency_partner',{restrictions:'Tier and usage criteria; not free hosting.'}],
  ['cloudways-affiliate','Cloudways','Domain & hosting','Affiliate Program','https://support.cloudways.com/en/articles/5134056-how-to-join-cloudways-affiliate-program-faqs-benefits','affiliate',{payoutType:'cash',restrictions:'Application and payout conditions require review.'}],
  ['webflow-affiliate','Webflow','Website & ecommerce','Affiliate Program','https://webflow.com/solutions/affiliates','affiliate',{payoutType:'cash',clientReferralAllowed:'no',restrictions:'One-to-one client referrals are excluded from affiliate payouts; agency work may be rejected.',dateVerified:'2026-10-30',evidenceUrl:'https://help.webflow.com/hc/en-us/articles/33961372613011-Webflow-s-affiliate-program-overview'}],
  ['webflow-partner','Webflow','Website & ecommerce','Certified Partner','https://webflow.com/solutions/partners','agency_partner',{restrictions:'Portfolio, credentials and approval required.'}],
  ['framer-expert','Framer','Website & ecommerce','Expert Program','https://www.framer.com/expert/apply/','agency_partner',{restrictions:'Published Framer portfolio and application review required.'}],
  ['wix-studio-partner','Wix Studio','Website & ecommerce','Partner Program','https://support.wix.com/en/article/wix-studio-joining-the-wix-partner-program','agency_partner',{restrictions:'Business details and tier-dependent benefits.'}],
  ['squarespace-circle','Squarespace','Website & ecommerce','Circle','https://support.squarespace.com/hc/en-us/articles/218890098-Getting-started-with-Squarespace-Circle','professional_network',{restrictions:'Membership for Squarespace customers; benefits depend on participation.'}],
  ['elementor-affiliate','Elementor','Website & ecommerce','Affiliate Program','https://elementor.com/affiliates/signup/','affiliate',{payoutType:'cash',restrictions:'Approval, country, tax and payout requirements need review.'}],
  ['hubspot-affiliate','HubSpot','CRM & sales','Affiliate Program','https://www.hubspot.com/partners/affiliates','affiliate',{payoutType:'cash',clientReferralAllowed:'no',restrictions:'Publisher route; not for one-to-one agency client referrals.',dateVerified:'2026-10-30'}],
  ['hubspot-solutions','HubSpot','CRM & sales','Solutions Partner Program','https://www.hubspot.com/partners','agency_partner',{restrictions:'Investment, qualification and tier terms require review.'}],
  ['pipedrive-affiliate','Pipedrive','CRM & sales','Affiliate Program','https://www.pipedrive.com/en/affiliate-partnership','affiliate',{payoutType:'cash',restrictions:'Payout method and Bangladesh eligibility require verification.'}],
  ['pipedrive-solutions','Pipedrive','CRM & sales','Solution Providers','https://www.pipedrive.com/en/partner','agency_partner',{restrictions:'Separate reseller and agency terms; verify tiers.'}],
  ['make-affiliate','Make','Automation & AI','Affiliate Program','https://www.make.com/affiliate','affiliate',{payoutType:'cash',restrictions:'Wise-only payout; at least three unique paying users and a $100 minimum payout.',dateVerified:'2026-10-30',evidenceUrl:'https://help.make.com/affiliate-program'}],
  ['zapier-solution','Zapier','Automation & AI','Solution Partner','https://zapier.com/l/solution-partner','agency_partner',{signupCost:'free_verified',restrictions:'Requires business website and custom-domain email; training and review follow application.',dateVerified:'2026-10-30'}],
  ['zoho-affiliate','Zoho','CRM & sales','Affiliate Program','https://www.zoho.com/affiliate/signup.html','affiliate',{payoutType:'cash',restrictions:'Approval, geography and payout need verification.'}],
  ['brevo-affiliate','Brevo','SEO & marketing','Affiliate Program','https://partners.brevo.com/affiliates','affiliate',{payoutType:'cash',restrictions:'Business-domain email and established traffic site required.'}],
  ['semrush-affiliate','Semrush','SEO & marketing','Affiliate Program','https://www.semrush.com/lp/affiliate-program/en/','affiliate',{payoutType:'cash',restrictions:'Publisher audience threshold; revisit after measured traffic growth.'}],
  ['framer-creator','Framer','Website & ecommerce','Creator affiliate system','https://www.framer.com/help/articles/how-affiliate-links-work/','affiliate',{payoutType:'cash',restrictions:'Creator Program participation and generated links required.'}],
  ['squarespace-benefits','Squarespace','Website & ecommerce','Circle benefits','https://support.squarespace.com/hc/en-us/articles/17127487603341-Squarespace-Circle-discount-and-benefits-overview','professional_network',{restrictions:'Discounts and referral benefits vary by member status.'}],
  ['zapier-ecosystem','Zapier','Automation & AI','Partner ecosystem','https://zapier.com/l/partners','professional_network',{signupCost:'free_verified',restrictions:'Programs have separate criteria and approval.'}],
];
export const partnerPrograms: PartnerProgram[] = rows.map(([id, provider, category, programName, officialUrl, programType, details]) => ({
  id, provider, category, programName, officialUrl, programType,
  signupCost:'unknown', approvalStatus:'research_only', geoEligibility:'bd_unconfirmed', payoutType:'unknown',
  restrictions:'Review current terms, geography, permitted channels and payout before applying.',
  clientReferralAllowed:'verify', marketingChannelsAllowed:'verify against current terms',
  approvedTrackingUrl:'', publicBadgeAllowed:false, dateVerified:'', evidenceUrl:officialUrl,
  disclosureRequired:programType==='affiliate' || programType==='referral', notes:'Official information only; Slickk has no verified membership.',
  ...details,
}));
