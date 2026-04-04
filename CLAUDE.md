# RenterCheck (rentercheck.co.uk)

UK rental property intelligence platform for tenants and council enforcement teams. Enter any postcode, get a comprehensive rental safety report covering EPC ratings, crime, flood risk, and tenant rights.

## Commands
- Dev: `npm run dev`
- Build: `npx next build`
- Deploy: auto on push to main via Vercel

## Architecture
- Next.js 16+ App Router, TypeScript strict, Tailwind CSS v4
- 87 pages total (50 rent/area, 8 blog, 8 rights, plus tools and static pages)
- Real API integrations: Postcodes.io, EPC Register, Police Crime API, EA Flood API
- Council REST API: /api/check (free/paid tiers), /api/check/bulk
- ISR for static pages, SSR for property checks

## Key Paths
- `src/app/page.tsx` - Homepage
- `src/app/check/[postcode]/page.tsx` - Property check results
- `src/app/landlord-check/page.tsx` - Landlord compliance checker
- `src/app/damp-check/page.tsx` - Damp/mould risk assessment
- `src/app/report-issue/page.tsx` - Tenant letter generator
- `src/app/calculator/page.tsx` - Total monthly cost calculator
- `src/app/fair-rent/page.tsx` - Fair rent checker
- `src/app/hmo-check/page.tsx` - HMO licence checker
- `src/app/moving-checklist/page.tsx` - Interactive moving checklist
- `src/app/rights/page.tsx` - Rights hub
- `src/app/rights/[topic]/page.tsx` - Individual rights guides
- `src/app/rent/page.tsx` - Rent by city hub
- `src/app/rent/[area]/page.tsx` - Individual city rent pages
- `src/app/blog/page.tsx` - Blog hub
- `src/app/blog/[slug]/page.tsx` - Blog articles
- `src/app/councils/page.tsx` - Council pitch page
- `src/app/councils/demo/page.tsx` - Council dashboard demo
- `src/app/api/check/route.ts` - Property check API
- `src/app/api/check/bulk/route.ts` - Bulk check API
- `src/lib/apis/` - API client modules
- `src/lib/apis/index.ts` - Data aggregator (getPropertyData)
- `src/data/areas.ts` - 50 UK city rental data
- `src/data/blog-articles.ts` - Blog article content
- `src/data/rights-topics.ts` - Rights guide content
- `src/data/rent-data.ts` - Regional median rent data
- `src/components/PostcodeSearch.tsx` - Search component
- `src/components/ui/Header.tsx` - Navigation header
- `src/components/ui/Footer.tsx` - Site footer
- `src/components/GoogleAnalytics.tsx` - GA4 integration

## Revenue
- Consumer: premium property reports (£3.99-9.99), affiliates
- Council SaaS: £500-1,500/mo per council
- G-Cloud Digital Marketplace (planned)

## Patterns
- Client components use "use client" directive
- API modules return null on failure (never throw)
- Rights/blog content stored in src/data/ TypeScript files
- JSON-LD structured data on blog and rent pages
- PostcodeSearch navigates to /check/[postcode]
- Moving checklist state persisted in localStorage

## API Keys (.env.local)
- EPC_EMAIL + EPC_API_KEY: EPC Register API
- NEXT_PUBLIC_GA_MEASUREMENT_ID: Google Analytics
- COUNCIL_API_KEY: Council API authentication

## Data Sources
- Postcodes.io: geocoding, postcode lookup (free, no key)
- EPC Register API: energy performance certificates (basic auth)
- Police Crime API: street-level crime data (free, no key)
- EA Flood API: flood risk zones (free, no key)

## Live URLs
- Site: https://rentercheck.vercel.app
- GitHub: github.com/skillettsites/rentercheck
