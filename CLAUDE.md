# RenterCheck

UK rental property intelligence platform for tenants and council enforcement teams. Enter any postcode, get a comprehensive rental safety report with 15 data sources.

## Commands
- Dev: `npm run dev`
- Build: `npx next build`
- Deploy: auto on push to main via Vercel

## Architecture
- Next.js 16+ App Router, TypeScript strict, Tailwind CSS v4
- 89 pages total (50 rent/area, 8 blog, 8 rights, 8 tools, plus static pages)
- 15 API integrations: Postcodes.io, EPC, Police Crime, EA Flood, Open-Meteo AQI, Overpass (schools, transport, noise, healthcare, green spaces, amenities), PlanIt Planning, council tax estimates, broadband estimates, ArcGIS IMD 2019 (deprivation)
- Shared haversine utility: src/lib/apis/haversine.ts (used by all Overpass modules)
- Council REST API: /api/check (free/paid tiers), /api/check/bulk
- Newsletter API: /api/newsletter
- ISR for static pages, SSR for property checks

## Key Paths
- `src/app/page.tsx` - Homepage with tools grid and council CTA
- `src/app/check/[postcode]/page.tsx` - Property check with 15 data cards + premium upsell
- `src/app/check/[postcode]/loading.tsx` - Skeleton loading state
- `src/app/landlord-check/page.tsx` - Compliance checker (10 legal requirements)
- `src/app/damp-check/page.tsx` - 4-step damp/mould risk wizard
- `src/app/report-issue/page.tsx` - 3 escalation letter generator
- `src/app/calculator/page.tsx` - Total monthly cost calculator
- `src/app/fair-rent/page.tsx` - Regional rent comparison gauge
- `src/app/hmo-check/page.tsx` - HMO licence determination
- `src/app/moving-checklist/page.tsx` - 37-item interactive checklist (localStorage)
- `src/app/commute/page.tsx` - Commuter report (time, cost, CO2, stations)
- `src/app/rights/page.tsx` - Rights hub
- `src/app/rights/[topic]/page.tsx` - 8 rights guides
- `src/app/rent/page.tsx` - Rent by city hub (sortable table)
- `src/app/rent/[area]/page.tsx` - 50 city rental market pages
- `src/app/blog/page.tsx` - Blog hub with category filter
- `src/app/blog/[slug]/page.tsx` - 8 blog articles with FAQ accordion + JSON-LD
- `src/app/councils/page.tsx` - Council SaaS pitch (pricing, ROI calc, contact form)
- `src/app/councils/demo/page.tsx` - Council dashboard demo (ward table, alerts, Kanban)
- `src/app/councils/ROICalculator.tsx` - Client ROI calculator island
- `src/app/api/check/route.ts` - Property check API (free/paid tiers)
- `src/app/api/check/bulk/route.ts` - Bulk check API (max 50, requires API key)
- `src/app/api/newsletter/route.ts` - Newsletter signup endpoint
- `src/lib/apis/` - 15 API client modules + shared haversine util
- `src/lib/apis/index.ts` - Data aggregator (getPropertyData), safety score calculator
- `src/lib/apis/commute.ts` - Commute calculation (distance, time, cost, CO2)
- `src/lib/apis/council-tax.ts` - Council tax estimates by postcode prefix
- `src/lib/apis/schools.ts` - Schools via Overpass API
- `src/lib/apis/transport.ts` - Stations/bus stops via Overpass API
- `src/lib/apis/noise.ts` - Noise estimates from proximity data
- `src/lib/apis/air-quality.ts` - Air quality via Open-Meteo
- `src/lib/apis/planning.ts` - Planning apps via PlanIt API
- `src/data/areas.ts` - 50 UK city rental data
- `src/data/blog-articles.ts` - 8 blog article content
- `src/data/rights-topics.ts` - 8 rights guide content
- `src/data/rent-data.ts` - Regional median rent data
- `src/components/PostcodeSearch.tsx` - Postcode search + navigation
- `src/components/NewsletterSignup.tsx` - Email capture (inline + banner variants)
- `src/components/ExitIntentPopup.tsx` - Exit intent email popup
- `src/components/ui/Header.tsx` - Sticky header with mobile menu
- `src/components/ui/Footer.tsx` - 5-column footer

## Revenue
- Consumer: premium property reports (£3.99-9.99), affiliates
- Council SaaS: £500/mo (5K props), £1,500/mo (25K props), Enterprise custom
- G-Cloud Digital Marketplace (planned)

## Patterns
- Client components use "use client" directive
- API modules return null on failure (never throw)
- Safety score: EPC 15%, Crime 20%, Flood 10%, Transport 10%, AQI 8%, Broadband 5%, Schools 5%, Noise 5%, Deprivation 10%, Healthcare 5%, Green Space 4%, Amenities 3%
- Rights/blog content in src/data/ TypeScript files
- JSON-LD on blog (Article + FAQPage) and rent pages (BreadcrumbList)
- PostcodeSearch navigates to /check/[postcode]
- Moving checklist persisted in localStorage
- Newsletter subscription flag in localStorage (hides popup/form after subscribing)
- Exit intent popup: 10s delay, once per session (sessionStorage)

## API Keys (.env.local)
- EPC_EMAIL + EPC_API_KEY: EPC Register API (basic auth)
- NEXT_PUBLIC_GA_MEASUREMENT_ID: Google Analytics 4
- COUNCIL_API_KEY: Council API authentication for paid tier

## Live URLs
- Site: https://rentercheck.vercel.app
- GitHub: github.com/skillettsites/rentercheck
