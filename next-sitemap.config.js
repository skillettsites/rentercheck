/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://rentercheck.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/councils/demo', '/api/*', '/opengraph-image'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
  },

  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (
      path === '/check' ||
      path === '/calculator' ||
      path === '/fair-rent' ||
      path === '/damp-check' ||
      path === '/hmo-check' ||
      path === '/landlord-check' ||
      path === '/commute' ||
      path === '/report-issue' ||
      path === '/moving-checklist'
    ) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (
      path.startsWith('/blog/') ||
      path.startsWith('/rent/') ||
      path.startsWith('/compare/')
    ) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (
      path.startsWith('/rights/') ||
      path.startsWith('/councils/')
    ) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (
      path === '/about' ||
      path === '/privacy' ||
      path === '/terms'
    ) {
      priority = 0.3;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },

  additionalPaths: async (config) => {
    const paths = [];
    const now = new Date().toISOString();

    // Blog articles (28)
    const blogSlugs = [
      'can-landlord-enter-without-permission',
      'can-landlord-increase-rent',
      'how-to-get-deposit-back',
      'what-to-check-before-renting',
      'tenant-rights-damp-mould-2026',
      'how-to-report-landlord',
      'renting-rights-without-contract',
      'hmo-rights-house-share',
      'can-landlord-keep-deposit-for-cleaning',
      'can-landlord-evict-me-for-no-reason',
      'can-landlord-refuse-pets',
      'can-landlord-charge-for-repairs',
      'can-landlord-increase-rent-during-fixed-term',
      'can-landlord-make-me-pay-for-decorating',
      'can-landlord-stop-me-having-visitors',
      'can-landlord-change-locks',
      'how-to-check-if-deposit-protected',
      'how-to-break-a-tenancy-agreement-early',
      'how-to-deal-with-noisy-neighbours-renting',
      'how-to-negotiate-rent-reduction',
      'how-to-get-council-to-inspect-rental',
      'how-to-claim-compensation-from-landlord',
      'average-cost-renting-uk-2026',
      'cheapest-places-to-rent-uk',
      'renting-vs-buying-uk-2026',
      'hidden-costs-of-renting',
      'how-to-spot-rental-scam',
      'what-to-do-if-scammed-by-landlord',
      'renters-rights-act-2025-key-changes',
      'section-21-abolished-what-next',
      'prs-database-tenants-guide',
      'new-pet-rules-renters-2026',
      'rent-bidding-wars-banned',
      'landlord-fines-2026',
      'rent-repayment-orders-doubled',
      'council-enforcement-powers-2026',
      'decent-homes-standard-private-rentals',
      'awaabs-law-private-landlords',
      'selective-licensing-guide-2026',
      'civil-penalties-landlords-complete-list',
    ];

    for (const slug of blogSlugs) {
      paths.push({
        loc: `/blog/${slug}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8,
      });
    }

    // Rent area pages (50)
    const areaSlugs = [
      'london', 'manchester', 'birmingham', 'leeds', 'bristol',
      'liverpool', 'sheffield', 'newcastle', 'nottingham', 'leicester',
      'edinburgh', 'glasgow', 'cardiff', 'belfast', 'brighton',
      'oxford', 'cambridge', 'bath', 'york', 'exeter',
      'southampton', 'portsmouth', 'reading', 'milton-keynes', 'coventry',
      'derby', 'stoke-on-trent', 'wolverhampton', 'plymouth', 'sunderland',
      'bradford', 'norwich', 'swansea', 'aberdeen', 'dundee',
      'bournemouth', 'luton', 'northampton', 'peterborough', 'cheltenham',
      'chester', 'canterbury', 'colchester', 'ipswich', 'lincoln',
      'gloucester', 'worcester', 'carlisle', 'inverness', 'stirling',
    ];

    for (const slug of areaSlugs) {
      paths.push({
        loc: `/rent/${slug}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8,
      });
    }

    // Compare pages (100)
    const compareSlugs = [
      // London vs major cities
      'london-vs-manchester', 'london-vs-birmingham', 'london-vs-leeds',
      'london-vs-bristol', 'london-vs-liverpool', 'london-vs-edinburgh',
      'london-vs-glasgow', 'london-vs-brighton', 'london-vs-cardiff',
      'london-vs-nottingham', 'london-vs-sheffield', 'london-vs-newcastle',
      'london-vs-oxford', 'london-vs-cambridge', 'london-vs-reading',
      // Major city pairs
      'manchester-vs-leeds', 'manchester-vs-liverpool', 'manchester-vs-birmingham',
      'manchester-vs-sheffield', 'manchester-vs-newcastle', 'manchester-vs-bristol',
      'manchester-vs-nottingham', 'manchester-vs-edinburgh',
      'birmingham-vs-leeds', 'birmingham-vs-bristol', 'birmingham-vs-nottingham',
      'birmingham-vs-coventry', 'birmingham-vs-sheffield', 'birmingham-vs-leicester',
      'bristol-vs-bath', 'bristol-vs-exeter', 'bristol-vs-cardiff', 'bristol-vs-southampton',
      'leeds-vs-sheffield', 'leeds-vs-york', 'leeds-vs-bradford',
      'leeds-vs-newcastle', 'leeds-vs-nottingham',
      'liverpool-vs-leeds', 'liverpool-vs-sheffield', 'liverpool-vs-newcastle',
      'nottingham-vs-leicester', 'nottingham-vs-derby', 'nottingham-vs-sheffield',
      'sheffield-vs-york', 'newcastle-vs-sunderland',
      'coventry-vs-leicester', 'leicester-vs-derby',
      'southampton-vs-portsmouth', 'exeter-vs-plymouth',
      'norwich-vs-ipswich', 'norwich-vs-cambridge', 'peterborough-vs-cambridge',
      // Regional rivals
      'edinburgh-vs-glasgow', 'cardiff-vs-swansea', 'aberdeen-vs-dundee',
      'edinburgh-vs-aberdeen', 'glasgow-vs-dundee', 'edinburgh-vs-dundee',
      'inverness-vs-aberdeen', 'stirling-vs-edinburgh',
      'cardiff-vs-bristol', 'swansea-vs-bristol',
      'wolverhampton-vs-birmingham', 'stoke-on-trent-vs-derby',
      'bradford-vs-sheffield', 'chester-vs-liverpool', 'carlisle-vs-newcastle',
      // Affordable vs expensive
      'brighton-vs-southampton', 'oxford-vs-reading', 'cambridge-vs-peterborough',
      'oxford-vs-cambridge', 'brighton-vs-portsmouth', 'bath-vs-cheltenham',
      'milton-keynes-vs-luton', 'milton-keynes-vs-northampton',
      'reading-vs-southampton', 'cheltenham-vs-gloucester',
      'canterbury-vs-brighton', 'colchester-vs-ipswich',
      'lincoln-vs-nottingham', 'gloucester-vs-worcester',
      'bournemouth-vs-southampton', 'bournemouth-vs-brighton',
      'reading-vs-milton-keynes', 'luton-vs-northampton',
      'chester-vs-stoke-on-trent', 'worcester-vs-birmingham',
      'plymouth-vs-bournemouth', 'coventry-vs-wolverhampton',
      'derby-vs-stoke-on-trent', 'sunderland-vs-bradford',
      'canterbury-vs-colchester', 'lincoln-vs-peterborough',
      'york-vs-newcastle', 'bath-vs-exeter',
      'northampton-vs-peterborough', 'wolverhampton-vs-stoke-on-trent',
      'inverness-vs-stirling', 'glasgow-vs-aberdeen',
    ];

    for (const slug of compareSlugs) {
      paths.push({
        loc: `/compare/${slug}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8,
      });
    }

    // Council area pages (50)
    const councilSlugs = [
      'london', 'manchester', 'birmingham', 'leeds', 'bristol',
      'liverpool', 'sheffield', 'newcastle', 'nottingham', 'leicester',
      'edinburgh', 'glasgow', 'cardiff', 'belfast', 'brighton',
      'oxford', 'cambridge', 'bath', 'york', 'exeter',
      'southampton', 'portsmouth', 'reading', 'milton-keynes', 'coventry',
      'derby', 'stoke-on-trent', 'wolverhampton', 'plymouth', 'sunderland',
      'bradford', 'norwich', 'swansea', 'aberdeen', 'dundee',
      'bournemouth', 'luton', 'northampton', 'peterborough', 'cheltenham',
      'chester', 'canterbury', 'colchester', 'ipswich', 'lincoln',
      'gloucester', 'worcester', 'carlisle', 'inverness', 'stirling',
    ];

    for (const slug of councilSlugs) {
      paths.push({
        loc: `/councils/${slug}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7,
      });
    }

    // Rights topic pages (8)
    const rightsSlugs = [
      'deposit-protection',
      'damp-and-mould',
      'section-21-eviction',
      'rent-increases',
      'repairs-and-maintenance',
      'hmo-rules',
      'tenant-fees',
      'quiet-enjoyment',
    ];

    for (const slug of rightsSlugs) {
      paths.push({
        loc: `/rights/${slug}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7,
      });
    }

    return paths;
  },
};
