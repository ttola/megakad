export interface Identity {
  company: string;
  tagline: string;
}

export interface Capability {
  n: string;
  title: string;
  blurb: string;
  tools: string[];
}

export interface Company {
  name: string;
  mark: string;
  color: string;
  engagement: string;
  summary: string;
  tags: string[];
  sector: string;
}

export interface CaseStudy {
  n: string;
  title: string;
  client: string;
  body: string;
  stats: Array<[string, string]>;
}

export const identity: Identity = {
  company: "Megakad",
  tagline: "Independent consulting for teams shipping mobile, web, and platform software.",
};

export const stats: Array<[string, string]> = [
  ["16+", "years shipping"],
  ["12", "portfolio engagements"],
  ["6", "sectors at scale"],
  ["1", "delivery partner"],
];

export const capabilities: Capability[] = [
  {
    n: "01",
    title: "Mobile leadership",
    blurb:
      "React Native and Expo programmes from greenfield to App Store. Native modules, deep linking, in-app payments, certificate pinning, store deployment, OTA updates.",
    tools: ["React Native", "Expo", "Fastlane", "XState", "Maestro"],
  },
  {
    n: "02",
    title: "Web architecture",
    blurb:
      "Micro-frontends, BFFs, design systems, and the wiring underneath. React, Vue, Angular — whatever the team already runs.",
    tools: ["React", "Vue", "TypeScript", "GraphQL", "Storybook"],
  },
  {
    n: "03",
    title: "Platform & delivery",
    blurb:
      "CI/CD, observability, security and accessibility baked into the workflow — not bolted on at the end. CI automation, Azure DevOps, Sentry, Datapower, Detox.",
    tools: ["CI Automation", "Azure DevOps", "Sentry", "Detox", "Kubernetes"],
  },
  {
    n: "04",
    title: "Team & ways of working",
    blurb:
      "Hiring shape, refinement, code review culture, conventional commits, Amigos meetings — the unsexy infrastructure that lets a team move quickly without breaking.",
    tools: ["Refinement", "Mentoring", "Hiring", "Conventional commits", "BDD"],
  },
];

export const companies: Company[] = [
  {
    name: "Santander UK",
    mark: "S",
    color: "#EC0000",
    engagement: "Business banking mobile consulting engagement",
    summary:
      "Led the first React Native cross-platform app for Santander UK and built the remote-first team that delivered it. First cloud-enabled integrated solution at the bank, shipped in 13 months.",
    tags: ["React Native", "TypeScript", "Fastlane", "XState", "Detox"],
    sector: "Banking",
  },
  {
    name: "MMT Digital",
    mark: "MMT",
    color: "#012169",
    engagement: "Mobile compliance consulting engagement",
    summary:
      "Led mobile development for a secure application under criticality compliance. Passed penetration-test thresholds and shipped a tight Expo + Azure DevOps workflow with crash reporting and review-prompt integration.",
    tags: ["React Native", "Expo", "Azure", "Entra", "Crashlytics"],
    sector: "Compliance",
  },
  {
    name: "WorldRemit",
    mark: "WR",
    color: "#0099CC",
    engagement: "Global remittance mobile consulting engagement",
    summary:
      "Led the greenfield programme that moved the global remittance experience from native to React Native. The mobile app is now the only client for WorldRemit since they shut down the website.",
    tags: ["React Native", "GraphQL", "Accessibility", "CI Automation"],
    sector: "Fintech",
  },
  {
    name: "Domino's Pizza Group",
    mark: "DPG",
    color: "#006491",
    engagement: "Retail web platform consulting engagement",
    summary:
      "Designed parts of the web architecture and contributed micro-frontends in Vue and React for the new Domino's UK and Ireland site. Led the release strategy on Azure Kubernetes with Istio service mesh.",
    tags: ["Microfrontends", "Vue", "React", "Kubernetes", "Istio"],
    sector: "Retail",
  },
  {
    name: "Elekt",
    mark: "Ek",
    color: "#0F2C3D",
    engagement: "Consumer app consulting engagement",
    summary:
      "Took the team from eight to three and lifted the App Store rating by 1.5 points by reducing bug incidents and simplifying abstractions. Migrated to Expo, shipped in-app payments, deep links, and backend-driven forms.",
    tags: ["React Native", "Expo", "Sentry", "Maestro", "Fastlane"],
    sector: "Consumer",
  },
  {
    name: "Santander Labs · OnePayFx",
    mark: "OP",
    color: "#9C0E12",
    engagement: "Payments architecture consulting engagement",
    summary:
      "Led the technical rewrite of the Ripple compliance payment architecture. Refactored microservices using DDD and introduced Kafka event streams into the datalake, audit, and compliance systems.",
    tags: ["NodeJS", "Kotlin", "Kafka", "Ripple", "Loopback 4"],
    sector: "Blockchain",
  },
  {
    name: "Fleetway Travel",
    mark: "FT",
    color: "#1B3A6B",
    engagement: "Travel platform consulting engagement",
    summary:
      "Led the B2C application architecture, migrated Node and Angular from ES5 to TypeScript, and built the B2B SDK widget that partners embed. Configured Mongo replication and the Bamboo + Docker pipeline.",
    tags: ["TypeScript", "Angular", "NodeJS", "MongoDB", "Docker"],
    sector: "Travel",
  },
  {
    name: "Santander · Core API",
    mark: "API",
    color: "#C70039",
    engagement: "API security consulting engagement",
    summary:
      "Collaborated on the security architecture for all Santander UK core and public REST APIs. Implemented the JWT policy for IBM Datapower and shipped the bank-wide quality-gate dashboard for governance.",
    tags: ["NodeJS", "IBM API Connect", "OAuth", "JWT", "Datapower"],
    sector: "Banking",
  },
  {
    name: "NCAA Nigeria",
    mark: "AV",
    color: "#0A6C3C",
    engagement: "Aviation portal consulting engagement",
    summary:
      "Led the planning and build of the DAWS aviation portal intranet for the Nigerian Civil Aviation Authority, plus the staff training programme and the data migration onto the new platform.",
    tags: ["Go", "PostgreSQL", "Angular", "Knockout"],
    sector: "Aviation",
  },
  {
    name: "TechyClass",
    mark: "TC",
    color: "#4F3FB8",
    engagement: "Education platform consulting engagement",
    summary:
      "Built the reporting, logging, and authentication APIs alongside the WPF Windows desktop client. Designed the portable SQL CE persistence layer for offline classroom use.",
    tags: ["NodeJS", "WPF · C#", "MongoDB", "XAML"],
    sector: "EdTech",
  },
  {
    name: "YorubaName",
    mark: "YN",
    color: "#1F8A5B",
    engagement: "Open-source product contribution",
    summary:
      "Contribution to the Yoruba language dictionary project — AngularJS integration of the client management system against the public dictionary API.",
    tags: ["AngularJS", "Open Source"],
    sector: "Heritage",
  },
  {
    name: "Findr · London",
    mark: "Fr",
    color: "#D43F6C",
    engagement: "Event discovery app consulting engagement",
    summary:
      "Built Findr, the cross-platform event discovery app on Ionic + AngularJS + Cordova. Integrated granular app caching tuned for low-bandwidth networks.",
    tags: ["Ionic", "AngularJS", "Cordova"],
    sector: "Events",
  },
];

export const selected: CaseStudy[] = [
  {
    n: "Case 01",
    title: "A bank's first React Native app, mid-pandemic",
    client: "Santander UK · Business Banking",
    body:
      "Built the team and the codebase from zero. Shipped a cross-platform iOS + Android app — Santander's first — on a 13-month clock, fully remote. The release pipeline migrated off on-prem MacOS hardware onto cloud build servers; end-to-end testing moved off a 12-hour serial run onto a cloud device farm running 24 devices in parallel in 30 minutes.",
    stats: [
      ["13 mo", "to ship"],
      ["12 h → 30 m", "test cycle"],
      ["6 → 24", "test devices"],
    ],
  },
  {
    n: "Case 02",
    title: "Replacing a website with a mobile app",
    client: "WorldRemit · Greenfield",
    body:
      "Led the workstream that rebuilt the global remittance experience on React Native. The app strengthened onboarding and customer engagement flows, helping shift the product strategy toward mobile-first international money transfer.",
    stats: [
      ["Mobile-first", "product shift"],
      ["iOS + Android", "shipped together"],
      ["A11y", "first-class"],
    ],
  },
  {
    n: "Case 03",
    title: "Modernising a national retail web platform",
    client: "Domino's Pizza Group",
    body:
      "Contributed to the new Domino's UK and Ireland web platform across Vue and React micro-frontends. Supported the architecture behind the retail ordering experience and helped shape the Azure Kubernetes release strategy using Istio service mesh.",
    stats: [
      ["Vue + React", "frontends"],
      ["Micro-frontends", "architecture"],
      ["Kubernetes + Istio", "release path"],
    ],
  },
];

export const tickerItems = [
  ...companies.map((company) => company.name),
  "Available for engagements",
];
