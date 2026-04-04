export interface RightsSection {
  heading: string;
  content: string[];
}

export interface RightsTopic {
  slug: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  icon: string;
  description: string;
  lastUpdated: string;
  sections: RightsSection[];
  relatedTopics: string[];
}

export const rightsTopics: RightsTopic[] = [
  {
    slug: "deposit-protection",
    title: "Deposit Protection: Your Rights as a UK Tenant",
    shortTitle: "Deposit Protection",
    metaDescription:
      "Learn how tenancy deposit protection works in the UK. Understand the 3 government-backed schemes, the 30-day deadline, and penalties of 1-3x the deposit if your landlord fails to protect it.",
    icon: "shield",
    description:
      "How deposit protection works, the 3 government schemes, deadlines, and what happens when your landlord fails to comply.",
    lastUpdated: "2026-04-01",
    sections: [
      {
        heading: "What is Tenancy Deposit Protection?",
        content: [
          "Under the Housing Act 2004 (as amended), every landlord in England and Wales who takes a deposit on an assured shorthold tenancy (AST) must protect it in a government-authorised tenancy deposit scheme within **30 days** of receiving it.",
          "This rule exists to stop landlords unfairly withholding deposits at the end of a tenancy. The scheme holds the deposit (or insures it) and provides a free dispute resolution service if there is a disagreement about deductions.",
          "If your landlord does not protect your deposit within 30 days, they face serious legal consequences, including being unable to serve a valid Section 21 eviction notice.",
        ],
      },
      {
        heading: "The Three Government-Approved Schemes",
        content: [
          "There are three approved deposit protection schemes in England and Wales. Your landlord can use any one of them:",
          "**1. Deposit Protection Service (DPS)** - A custodial scheme (free for landlords). The DPS holds your deposit directly. At the end of your tenancy, both parties must agree before any money is released. Website: depositprotection.com",
          "**2. MyDeposits** - Offers both custodial and insurance-based protection. With insurance-based, the landlord keeps the deposit but pays MyDeposits a fee to insure it. Website: mydeposits.co.uk",
          "**3. Tenancy Deposit Scheme (TDS)** - Also offers custodial and insurance options. TDS is the oldest of the three schemes. Website: tenancydepositscheme.com",
          "For all three schemes, you can check whether your deposit has been protected by searching on the scheme's website using your name and tenancy details.",
        ],
      },
      {
        heading: "The 30-Day Deadline",
        content: [
          "Your landlord must protect your deposit **within 30 days** of receiving it. They must also provide you with the following prescribed information within the same 30-day window:",
          "- The name and contact details of the scheme used",
          "- The landlord's or agent's name, address, and contact details",
          "- How to apply for the deposit to be released at the end of the tenancy",
          "- What to do if there is a dispute about the deposit",
          "- The purpose of the deposit",
          "If you did not receive this information, your deposit may not be properly protected, even if the money is sitting in a scheme.",
        ],
      },
      {
        heading: "Penalties for Non-Compliance",
        content: [
          "If your landlord fails to protect your deposit or provide the required prescribed information, you can take them to court. The court **must** order the landlord to either:",
          "- Return your deposit in full, **or**",
          "- Protect it in one of the approved schemes within 14 days",
          "On top of that, the court **must** also order the landlord to pay you compensation of **between 1x and 3x the deposit amount**. For example, if your deposit was £1,200, you could receive between £1,200 and £3,600 in compensation.",
          "Additionally, the landlord **cannot serve a valid Section 21 notice** to evict you until the deposit is properly protected and prescribed information has been given. This is a powerful safeguard for tenants.",
        ],
      },
      {
        heading: "Getting Your Deposit Back",
        content: [
          "At the end of your tenancy, your landlord should return your deposit within **10 days** of both parties agreeing on any deductions. If there is a dispute, either party can use the scheme's free Alternative Dispute Resolution (ADR) service.",
          "Common lawful deductions include unpaid rent, damage beyond fair wear and tear, missing items listed on the inventory, and professional cleaning if your tenancy agreement requires it.",
          "**Tips to protect your deposit:**",
          "- Take dated photographs of the property at the start and end of your tenancy",
          "- Complete a detailed check-in inventory and keep a signed copy",
          "- Report any damage or issues to your landlord in writing (email is best)",
          "- Keep copies of all communication about repairs, cleaning, or issues",
          "- Check your deposit is protected at depositprotection.com, mydeposits.co.uk, or tenancydepositscheme.com",
        ],
      },
      {
        heading: "How to Make a Claim",
        content: [
          "If your landlord has not protected your deposit, you can apply to the county court to claim compensation. You can do this at any time during your tenancy or up to six years after it ends.",
          "**Steps to claim:**",
          "- Check all three schemes to confirm your deposit is not protected",
          "- Write to your landlord asking them to protect it and provide prescribed information",
          "- If they do not comply within 14 days, apply to your local county court using form N208",
          "- The court fee is typically £308 (recoverable if you win)",
          "- You do not need a solicitor; many tenants bring these claims successfully on their own",
          "Citizens Advice and Shelter can provide free guidance on the process.",
        ],
      },
    ],
    relatedTopics: ["tenant-fees", "section-21-eviction", "quiet-enjoyment"],
  },
  {
    slug: "damp-and-mould",
    title: "Damp and Mould: Awaab's Law and Your Rights",
    shortTitle: "Damp and Mould",
    metaDescription:
      "Understand your rights regarding damp and mould in a rented home. Learn about Awaab's Law, landlord obligations, how to report problems, and when to involve your local council.",
    icon: "droplet",
    description:
      "Awaab's Law, landlord obligations for damp and mould, how to report problems, and escalating to the council.",
    lastUpdated: "2026-04-01",
    sections: [
      {
        heading: "Overview: Damp and Mould in Rented Homes",
        content: [
          "Damp and mould are among the most common complaints from UK tenants. Living in a damp or mouldy property can cause serious health problems, including respiratory infections, asthma, and allergic reactions. Children, elderly people, and those with existing conditions are especially vulnerable.",
          "UK law is clear: landlords have a duty to keep rental properties free from serious damp and mould. Several pieces of legislation protect tenants, including the Landlord and Tenant Act 1985, the Housing Act 2004, the Homes (Fitness for Human Habitation) Act 2018, and the newer Awaab's Law provisions in the Renters' Rights Act 2025.",
        ],
      },
      {
        heading: "What is Awaab's Law?",
        content: [
          "Awaab's Law is named after Awaab Ishak, a two-year-old boy who died in 2020 from a respiratory condition caused by exposure to mould in his family's housing association flat in Rochdale.",
          "Originally introduced for social housing through the Social Housing (Regulation) Act 2023, Awaab's Law sets strict timescales for landlords to investigate and fix damp and mould. The Renters' Rights Act 2025 extended these protections to the private rented sector as well.",
          "**Key timescales under Awaab's Law:**",
          "- Landlords must **acknowledge** a report of damp or mould within **14 days**",
          "- They must **investigate** the issue within **14 days** of acknowledgement",
          "- **Emergency hazards** (those posing an imminent risk to health) must be addressed within **24 hours**",
          "- **Non-emergency repairs** must begin within **7 days** of the investigation and be completed within a reasonable timeframe",
          "- If the landlord fails to meet these timescales, tenants can escalate to the local council or seek legal remedies",
        ],
      },
      {
        heading: "Landlord Obligations",
        content: [
          "Under Section 11 of the Landlord and Tenant Act 1985, your landlord is responsible for maintaining the structure and exterior of the property, as well as installations for water, gas, electricity, sanitation, and heating. Damp caused by structural defects, leaking roofs, broken guttering, or inadequate ventilation falls squarely on the landlord.",
          "Under the Homes (Fitness for Human Habitation) Act 2018, your landlord must ensure the property is fit for you to live in throughout the tenancy. Serious damp and mould can make a property unfit for habitation.",
          "**Your landlord is responsible for damp and mould caused by:**",
          "- Structural defects (rising damp, penetrating damp from leaks)",
          "- Poor ventilation design or missing extractor fans",
          "- Leaking roofs, windows, or guttering",
          "- Faulty or inadequate heating systems",
          "- Broken or missing damp-proof courses",
          "**Your landlord is not typically responsible for:**",
          "- Condensation caused solely by tenant lifestyle (drying clothes indoors without ventilation, blocking air vents). However, if the property lacks adequate ventilation or heating, the landlord may still be liable.",
        ],
      },
      {
        heading: "How to Report Damp and Mould",
        content: [
          "If you discover damp or mould in your rented home, act quickly. The longer it is left, the worse it gets.",
          "**Step 1: Document everything.** Take clear photographs of all affected areas, including close-ups and wider shots showing the extent. Note the date, the room, and any health symptoms you or your household are experiencing.",
          "**Step 2: Report it to your landlord in writing.** Email is best because it creates a clear paper trail. Describe the problem, attach your photos, and ask for a repair timeline. Reference their obligations under Section 11 of the Landlord and Tenant Act 1985.",
          "**Step 3: Keep a log.** Record every communication, repair visit, and any worsening of the problem. This is essential if you need to escalate later.",
          "**Step 4: Allow access for repairs.** You must give your landlord reasonable access to inspect and carry out repairs (typically 24 hours' notice).",
        ],
      },
      {
        heading: "Escalating to the Council",
        content: [
          "If your landlord ignores your reports or fails to fix the problem within the Awaab's Law timescales, you can involve your local council's Environmental Health department.",
          "The council has powers under the Housing Act 2004 to inspect the property using the Housing Health and Safety Rating System (HHSRS). Damp and mould can be classified as a **Category 1 hazard** (the most serious), which requires the council to take enforcement action.",
          "**Council enforcement options include:**",
          "- Issuing an **improvement notice** requiring the landlord to fix the problem within a set timeframe",
          "- Issuing a **prohibition order** preventing all or part of the property from being used",
          "- Carrying out **emergency remedial action** and charging the landlord",
          "- Issuing a **civil penalty** of up to **£30,000** or prosecuting the landlord",
          "Contact your local council's Environmental Health team by phone or through their website. The inspection is free.",
        ],
      },
      {
        heading: "Compensation and Legal Remedies",
        content: [
          "If damp and mould have affected your health or made your home unfit to live in, you may be entitled to compensation. Options include:",
          "- **Rent reduction or rent repayment** for the period the property was in poor condition",
          "- **Compensation for damage** to your belongings (furniture, clothing, etc.)",
          "- **Compensation for health impacts**, supported by medical evidence",
          "- **Court-ordered repairs** if your landlord refuses to act",
          "You can bring a claim under the Homes (Fitness for Human Habitation) Act 2018 or pursue a disrepair claim in the county court. Many solicitors offer no-win-no-fee arrangements for housing disrepair cases.",
          "Shelter (shelter.org.uk) and Citizens Advice (citizensadvice.org.uk) offer free guidance on taking legal action.",
        ],
      },
    ],
    relatedTopics: [
      "repairs-and-maintenance",
      "quiet-enjoyment",
      "section-21-eviction",
    ],
  },
  {
    slug: "section-21-eviction",
    title: "Section 21 Eviction: What Tenants Need to Know",
    shortTitle: "Section 21 Eviction",
    metaDescription:
      "Understand Section 21 'no-fault' eviction notices in England. Learn about the Renters' Rights Act 2025 abolition, your rights during the transition, and how to challenge an invalid notice.",
    icon: "document",
    description:
      "What Section 21 is, the Renters' Rights Act 2025 changes, transitional rules, and how to challenge invalid notices.",
    lastUpdated: "2026-04-01",
    sections: [
      {
        heading: "What is a Section 21 Notice?",
        content: [
          "A Section 21 notice (also called a 'no-fault eviction' notice) was a mechanism under the Housing Act 1988 that allowed landlords in England to evict assured shorthold tenants without giving any reason. The landlord simply had to give you at least two months' written notice.",
          "Section 21 was widely criticised because tenants could be evicted even if they had done nothing wrong, paid rent on time, and kept the property in good condition. It was often used as retaliation when tenants complained about repairs or poor conditions.",
        ],
      },
      {
        heading: "The Renters' Rights Act 2025",
        content: [
          "The **Renters' Rights Act 2025** (which received Royal Assent in late 2025) abolishes Section 21 no-fault evictions in England. This is the biggest change to private renting law in over 30 years.",
          "**Key changes under the Act:**",
          "- **Section 21 is abolished.** Landlords can no longer evict tenants without a valid reason.",
          "- **All tenancies become periodic.** Fixed-term assured shorthold tenancies are replaced by periodic tenancies that roll on month to month. Tenants can leave by giving **two months' notice** at any time.",
          "- **Section 8 grounds are reformed.** Landlords must use Section 8 of the Housing Act 1988 (which requires a valid ground for possession) to evict tenants. New and amended grounds include selling the property, moving back in, and persistent rent arrears.",
          "- **A new Private Rented Sector Ombudsman** is established to resolve disputes between tenants and landlords without going to court.",
          "- **A Landlord Register** (the Private Rented Sector Database) requires all landlords to register and meet baseline standards.",
        ],
      },
      {
        heading: "Transitional Rules",
        content: [
          "The abolition of Section 21 is being implemented in phases. The exact commencement dates depend on secondary legislation, but the government confirmed the transition is underway in 2026.",
          "**During the transition period:**",
          "- Existing fixed-term tenancies continue until their fixed term expires, at which point they convert to periodic tenancies under the new rules",
          "- Section 21 notices served before the abolition date remain valid if they meet all existing requirements",
          "- New tenancies created after the commencement date are immediately subject to the new rules",
          "- Landlords who already served a valid Section 21 notice before the abolition date have a limited window to apply to the court for a possession order",
          "Check the government's official guidance at gov.uk for the latest commencement dates and transitional provisions.",
        ],
      },
      {
        heading: "Valid Grounds for Eviction Under the New System",
        content: [
          "Under the reformed Section 8, landlords can still seek possession, but only on specific grounds. The key grounds include:",
          "**Mandatory grounds (court must grant possession):**",
          "- **Ground 1:** The landlord wants to sell the property (12 months' minimum tenancy before this can be used)",
          "- **Ground 1A:** The landlord or a close family member wants to move into the property (12 months' minimum tenancy)",
          "- **Ground 8:** The tenant has at least **two months' rent arrears** at both the date of the notice and the date of the hearing",
          "**Discretionary grounds (court decides based on reasonableness):**",
          "- **Ground 10:** Some rent is unpaid at the date of the notice and hearing",
          "- **Ground 12:** The tenant has broken a term of the tenancy agreement",
          "- **Ground 14:** The tenant or someone living with them has caused nuisance or annoyance",
          "Under the new system, landlords must give **four months' notice** for most grounds, giving tenants more time to find alternative housing.",
        ],
      },
      {
        heading: "How to Challenge an Invalid Section 21 Notice",
        content: [
          "Even under the old system, many Section 21 notices were invalid. If you received a Section 21 notice before the abolition, check the following:",
          "**A Section 21 notice was invalid if:**",
          "- Your deposit was not protected in a government-approved scheme",
          "- You were not given the prescribed information about the deposit scheme",
          "- You were not given a valid Energy Performance Certificate (EPC)",
          "- You were not given the government's \"How to Rent\" guide",
          "- You were not given a current gas safety certificate",
          "- The notice was served within the first four months of the tenancy",
          "- The notice was served within six months of a council improvement notice or Environmental Health complaint (retaliatory eviction protection under the Deregulation Act 2015)",
          "- The notice period given was less than two months",
          "If any of these apply, do not leave the property. Seek advice from Shelter (shelter.org.uk) or Citizens Advice immediately. The court cannot grant a possession order based on an invalid notice.",
        ],
      },
      {
        heading: "What to Do If You Receive an Eviction Notice",
        content: [
          "**Do not panic, and do not leave immediately.** A notice is not an eviction; it is the start of a legal process. Here is what to do:",
          "- **Check the notice is valid** using the criteria above",
          "- **Do not leave before the notice expires.** You have at least two months (or four months under the new rules) to find somewhere else",
          "- **Get free legal advice.** Contact Shelter (0808 800 4444), Citizens Advice, or your local council's housing team",
          "- **If the notice is invalid, respond in writing** explaining why and stating that you do not intend to leave",
          "- **If the landlord applies to court,** you have the right to attend the hearing and present your defence. The court will check the notice's validity before granting any order",
          "- **Even if a possession order is granted,** only court-appointed bailiffs can physically remove you. Your landlord cannot change the locks, remove your belongings, or force you out. Doing so is a criminal offence (illegal eviction under the Protection from Eviction Act 1977).",
        ],
      },
    ],
    relatedTopics: [
      "deposit-protection",
      "repairs-and-maintenance",
      "quiet-enjoyment",
    ],
  },
  {
    slug: "rent-increases",
    title: "Rent Increases: Your Rights and How to Challenge Them",
    shortTitle: "Rent Increases",
    metaDescription:
      "Learn how rent increases work in England. Understand the Section 13 process, how to challenge an unfair increase at the First-tier Tribunal, and what evidence you need.",
    icon: "currency",
    description:
      "Section 13 process, how often rent can increase, challenging unfair rises at tribunal, and gathering market evidence.",
    lastUpdated: "2026-04-01",
    sections: [
      {
        heading: "How Rent Increases Work",
        content: [
          "In England, the rules around rent increases depend on the type of tenancy you have. For most private tenants on assured shorthold tenancies (ASTs), the rules are set out in the Housing Act 1988.",
          "**During a fixed-term tenancy:** Your landlord can only increase the rent if your tenancy agreement includes a specific rent review clause. Without such a clause, the rent is fixed for the term.",
          "**During a periodic tenancy (rolling month-to-month):** Your landlord can propose a rent increase using the formal Section 13 process, or you can agree to an increase informally. Under the Renters' Rights Act 2025, all tenancies are now periodic, making the Section 13 process more important than ever.",
        ],
      },
      {
        heading: "The Section 13 Process",
        content: [
          "Section 13 of the Housing Act 1988 sets out the formal process for rent increases in periodic tenancies. Your landlord must follow this process exactly, or the increase is invalid.",
          "**Requirements for a valid Section 13 notice:**",
          "- The increase must be proposed using the correct form (currently Form 4)",
          "- The landlord must give **at least two months' notice** before the increase takes effect",
          "- Rent can only be increased **once per year** (12 months must pass since the last increase or the start of the tenancy)",
          "- The proposed new rent must be a specific amount, not a vague description",
          "- The notice must be served on the tenant in the correct way (posted or hand-delivered)",
          "Under the Renters' Rights Act 2025, the Section 13 process is the **only** way landlords can increase rent. Rent review clauses in tenancy agreements are no longer enforceable.",
        ],
      },
      {
        heading: "Challenging an Unfair Rent Increase",
        content: [
          "If you believe the proposed rent increase is above the market rate, you can challenge it at the **First-tier Tribunal (Property Chamber)**. The application is free.",
          "**How to challenge:**",
          "- You must apply to the tribunal **before the new rent takes effect** (before the date specified in the Section 13 notice)",
          "- Complete the application form available at gov.uk or from the tribunal office",
          "- The tribunal will assess whether the proposed rent is in line with the **open market rent** for a similar property in the area",
          "- The tribunal's decision is binding on both parties",
          "**Important:** The tribunal can set the rent at any amount it considers fair, which could be the same, lower, or even higher than the landlord proposed. In practice, the tribunal rarely sets it higher, but it is technically possible. If you are confident the proposed rent exceeds market rate, the risk is low.",
        ],
      },
      {
        heading: "Gathering Market Rent Evidence",
        content: [
          "To support your challenge, you should gather evidence of market rents for comparable properties in your area. The tribunal will consider this evidence when making its decision.",
          "**Useful sources of evidence:**",
          "- **Rightmove, Zoopla, and OpenRent** listings for similar properties (same size, type, condition, and location)",
          "- **ONS Private Rental Index** data for your region",
          "- **Valuation Office Agency (VOA)** rental data",
          "- **Screenshots of current listings** with dates (the tribunal wants to see what is available at the time of the increase, not historical data)",
          "- **Your property's condition** relative to comparables (if your property is in worse condition, the rent should be lower)",
          "Aim to find at least 3 to 5 comparable properties. Note the address, rent, number of bedrooms, property type, and any differences from your property.",
        ],
      },
      {
        heading: "Protections Under the Renters' Rights Act 2025",
        content: [
          "The Renters' Rights Act 2025 introduced additional protections around rent increases:",
          "- **Rent increases are limited to once per year.** Landlords cannot use Section 13 more frequently.",
          "- **Rent review clauses are abolished.** The Section 13 process is the only valid mechanism.",
          "- **Tribunal decisions cannot exceed the landlord's proposed amount.** Under the new rules, the tribunal can reduce the rent or keep it the same, but cannot set it higher than the amount the landlord asked for. This removes the risk that previously deterred tenants from challenging increases.",
          "- **Retaliatory rent increases are prohibited.** If a landlord increases rent shortly after a tenant makes a complaint or requests repairs, the tenant can argue this is retaliatory and the tribunal may refuse the increase.",
          "These changes significantly strengthen tenant protections and make it safer to challenge unfair increases.",
        ],
      },
      {
        heading: "What to Do If You Cannot Afford the Increase",
        content: [
          "If your rent increases and you are struggling to pay, there are several steps you can take:",
          "- **Negotiate with your landlord.** Many landlords prefer a reliable tenant at a slightly lower rent over an empty property.",
          "- **Check your benefit entitlement.** Use an online benefits calculator (such as entitledto.co.uk) to check if you qualify for Universal Credit housing costs or Housing Benefit.",
          "- **Contact your local council.** If you are at risk of homelessness due to unaffordable rent, the council has a duty to help under the Homelessness Reduction Act 2017.",
          "- **Seek advice.** Shelter (0808 800 4444) and Citizens Advice can help you understand your options and negotiate with your landlord.",
        ],
      },
    ],
    relatedTopics: ["section-21-eviction", "tenant-fees", "quiet-enjoyment"],
  },
  {
    slug: "repairs-and-maintenance",
    title: "Repairs and Maintenance: What Your Landlord Must Fix",
    shortTitle: "Repairs and Maintenance",
    metaDescription:
      "Know what your landlord must repair under Section 11 of the Landlord and Tenant Act 1985. Learn about timescales, how to report issues, council enforcement, and your legal options.",
    icon: "wrench",
    description:
      "Landlord obligations under Section 11, repair timescales, reporting process, and council enforcement powers.",
    lastUpdated: "2026-04-01",
    sections: [
      {
        heading: "Your Landlord's Legal Obligations",
        content: [
          "Under **Section 11 of the Landlord and Tenant Act 1985**, your landlord is responsible for keeping the following in repair and proper working order throughout your tenancy:",
          "- **The structure and exterior** of the property (roof, walls, windows, doors, guttering, external pipes, drains)",
          "- **Installations for water, gas, and electricity** (pipes, wiring, boilers, radiators, basins, sinks, baths, toilets)",
          "- **Installations for space heating and water heating** (boilers, central heating systems, hot water tanks)",
          "- **Installations for sanitation** (toilets, baths, showers, drains)",
          "This obligation applies to all tenancies of less than seven years and cannot be overridden by the tenancy agreement. Your landlord cannot make you responsible for these repairs in the contract.",
        ],
      },
      {
        heading: "Fitness for Human Habitation",
        content: [
          "The **Homes (Fitness for Human Habitation) Act 2018** added an additional layer of protection. Your landlord must ensure the property is fit for you to live in at the start of and throughout the tenancy.",
          "**Factors the court considers include:**",
          "- Repair and stability of the building",
          "- Freedom from damp",
          "- Adequate natural lighting and ventilation",
          "- Adequate water supply, drainage, and sanitation",
          "- Suitable facilities for cooking and preparing food",
          "- Freedom from hazards assessed under the Housing Health and Safety Rating System (HHSRS)",
          "If the property is unfit, you can take your landlord to court without waiting for them to fail to make a repair. This is especially useful for problems like persistent damp, inadequate heating, or pest infestations.",
        ],
      },
      {
        heading: "Reporting Repairs to Your Landlord",
        content: [
          "Your landlord's repair obligation is only triggered once they know about the problem. Report issues as soon as you notice them.",
          "**Best practice for reporting:**",
          "- **Report in writing** (email is ideal) so you have a dated record",
          "- Describe the problem clearly and include photographs",
          "- Reference your landlord's obligation under Section 11 of the Landlord and Tenant Act 1985",
          "- Ask for a timeline for the repair",
          "- Keep copies of all correspondence",
          "- If your landlord or agent has a specific repair reporting system, use it, but also send a separate email for your own records",
        ],
      },
      {
        heading: "Repair Timescales",
        content: [
          "There is no single statutory timescale for all repairs, but the law requires landlords to carry out repairs within a **reasonable time**. What counts as reasonable depends on the nature and severity of the problem.",
          "**General guidelines used by courts and councils:**",
          "- **Emergency repairs** (no heating, no hot water, gas leak, flooding, dangerous electrics): **24 hours**",
          "- **Urgent repairs** (leaking roof, broken toilet if only one in property, broken lock): **1 to 7 days**",
          "- **Routine repairs** (dripping tap, broken extractor fan, minor plaster damage): **28 days**",
          "- **Planned maintenance** (repainting, replacing old but functional items): timescale agreed between parties",
          "Under Awaab's Law (extended to private renting by the Renters' Rights Act 2025), landlords must acknowledge damp and mould reports within 14 days, investigate within 14 days, and begin repairs within 7 days of the investigation.",
        ],
      },
      {
        heading: "What If Your Landlord Refuses to Repair?",
        content: [
          "If your landlord ignores your repair request or delays unreasonably, you have several options:",
          "**1. Send a formal letter before action.** State clearly what needs repairing, reference the relevant legislation, and give a final deadline (typically 14 days). Warn that you will involve the council or take legal action if they do not respond.",
          "**2. Contact your local council.** The Environmental Health department can inspect the property under the Housing Act 2004 and issue enforcement notices. This is free.",
          "**3. Apply to the courts.** You can bring a claim under Section 11 of the Landlord and Tenant Act 1985 or the Homes (Fitness for Human Habitation) Act 2018. The court can order the landlord to carry out repairs and award compensation.",
          "**4. Contact the PRS Ombudsman.** Under the Renters' Rights Act 2025, the new Private Rented Sector Ombudsman can investigate complaints and order landlords to take action.",
          "**Do not withhold rent** as a self-help remedy. While it may be tempting, withholding rent can give your landlord grounds to seek possession for rent arrears. Instead, use the formal routes above.",
        ],
      },
      {
        heading: "Compensation for Disrepair",
        content: [
          "If your landlord's failure to repair has caused you loss, inconvenience, or health problems, you may be entitled to compensation. Courts typically award:",
          "- **A percentage reduction in rent** for the period the property was in disrepair (commonly 25% to 50% depending on severity)",
          "- **Damages for inconvenience and distress**",
          "- **Special damages** for loss of or damage to personal belongings",
          "- **Compensation for health impacts**, supported by medical evidence",
          "Many housing disrepair solicitors work on a no-win-no-fee basis. You can also get free advice from Shelter, Citizens Advice, or your local law centre.",
        ],
      },
    ],
    relatedTopics: ["damp-and-mould", "quiet-enjoyment", "hmo-rules"],
  },
  {
    slug: "hmo-rules",
    title: "HMO Rules: Houses in Multiple Occupation Explained",
    shortTitle: "HMO Rules",
    metaDescription:
      "Understand HMO rules in England. Learn what counts as a House in Multiple Occupation, licensing requirements, manager duties, fire safety, and overcrowding protections.",
    icon: "building",
    description:
      "What counts as an HMO, mandatory and additional licensing, fire safety, manager duties, and overcrowding rules.",
    lastUpdated: "2026-04-01",
    sections: [
      {
        heading: "What is a House in Multiple Occupation (HMO)?",
        content: [
          "A House in Multiple Occupation (HMO) is a property rented to **three or more tenants** who form **two or more separate households** and share facilities such as a kitchen, bathroom, or toilet.",
          "**Common examples of HMOs:**",
          "- A shared house with three or more tenants on separate tenancy agreements",
          "- A bedsit property with shared kitchen or bathroom",
          "- A converted building with self-contained flats that did not meet the 1991 Building Regulations conversion standard and where more than one-third of the flats are rented",
          "It does not matter whether the tenants are students, professionals, or benefit claimants. If the property meets the definition, it is an HMO and the landlord must comply with HMO regulations.",
        ],
      },
      {
        heading: "Mandatory HMO Licensing",
        content: [
          "Under the Housing Act 2004 (as amended in 2018), a **mandatory HMO licence** is required if the property is occupied by **five or more tenants** from **two or more households**.",
          "Prior to 2018, mandatory licensing only applied to HMOs of three or more storeys. The 2018 amendment removed the storey requirement, bringing many more properties into scope.",
          "**The licence lasts up to five years** and must be renewed before it expires. Landlords must apply to the local council and pay a fee (typically £500 to £1,500 depending on the council).",
          "**A licensed HMO must meet minimum standards including:**",
          "- Adequate fire safety measures (fire doors, smoke alarms, fire extinguishers, escape routes)",
          "- Suitable and sufficient kitchen facilities for the number of occupants",
          "- Adequate bathroom and toilet facilities",
          "- Appropriate waste disposal facilities",
          "- An annual gas safety certificate, a valid electrical installation condition report (EICR), and working smoke and carbon monoxide alarms",
        ],
      },
      {
        heading: "Additional and Selective Licensing",
        content: [
          "Some local councils operate **additional licensing** schemes that cover HMOs with three or four tenants (below the mandatory threshold). Others operate **selective licensing** schemes that cover all private rented properties in a designated area, not just HMOs.",
          "**Check with your local council** to find out if additional or selective licensing applies in your area. You can usually find this on the council's website under housing or private renting.",
          "If your landlord needs a licence but does not have one, they face serious penalties (see below). As a tenant in an unlicensed HMO, you may be entitled to a **rent repayment order** for up to 12 months' rent.",
        ],
      },
      {
        heading: "Manager Duties and Standards",
        content: [
          "The Management of Houses in Multiple Occupation (England) Regulations 2006 set out the duties of HMO managers (usually the landlord or their appointed agent). These include:",
          "- **Providing contact details** to all tenants and displaying the manager's name, address, and phone number in a prominent place in the property",
          "- **Maintaining the common areas** (hallways, stairways, shared kitchens, shared bathrooms) in good repair and clean condition",
          "- **Maintaining fire safety equipment** (alarms, extinguishers, fire blankets, fire doors) and keeping escape routes clear",
          "- **Ensuring water supply and drainage** are in good working order",
          "- **Providing adequate waste disposal facilities** (bins, recycling)",
          "- **Maintaining the structure and exterior** of the property",
          "- **Supplying each unit** with adequate heating, lighting, and ventilation",
        ],
      },
      {
        heading: "Fire Safety in HMOs",
        content: [
          "Fire safety is one of the most critical aspects of HMO regulation. HMOs are higher risk because multiple households share common areas and escape routes.",
          "**Minimum fire safety requirements:**",
          "- **Smoke alarms** on every floor (interconnected in larger HMOs)",
          "- **Heat detectors** in kitchens",
          "- **Carbon monoxide alarms** in any room with a solid fuel burning appliance (and now required in rooms with gas appliances under updated regulations)",
          "- **Fire doors** (typically FD30 rated, providing 30 minutes of fire resistance) on all bedrooms and kitchens in licensable HMOs",
          "- **Clear escape routes** with emergency lighting in larger HMOs",
          "- **Fire blankets and fire extinguishers** in shared kitchens",
          "If your HMO lacks these, report it to your local council immediately. Poor fire safety in an HMO is treated as a serious hazard.",
        ],
      },
      {
        heading: "Overcrowding and Room Sizes",
        content: [
          "The Licensing of Houses in Multiple Occupation (Mandatory Conditions of Licences) (England) Regulations 2018 set **minimum room sizes** for HMOs:",
          "- **6.51 square metres** for a single person aged 10 or over",
          "- **10.22 square metres** for two people aged 10 or over",
          "- **4.64 square metres** for a child under 10",
          "A room smaller than 4.64 square metres cannot be used as sleeping accommodation at all.",
          "The landlord must state on the licence the maximum number of people who can occupy each room. If the property is overcrowded beyond these limits, the landlord is committing an offence and the council can take enforcement action.",
        ],
      },
      {
        heading: "Penalties for Unlicensed HMOs",
        content: [
          "Operating an HMO without the required licence is a criminal offence. Penalties include:",
          "- **An unlimited fine** upon prosecution in the magistrates' court",
          "- **Civil penalties of up to £30,000** per offence (as an alternative to prosecution)",
          "- **Rent repayment orders:** Tenants can apply to the First-tier Tribunal for repayment of up to **12 months' rent** paid while the property was unlicensed. The local council can also apply on behalf of Housing Benefit or Universal Credit",
          "- **The landlord cannot serve a valid Section 21 notice** while the property requires but does not have a licence (under the old rules, now superseded by the Renters' Rights Act 2025 abolition of Section 21)",
          "If you suspect your HMO is unlicensed, check your council's public HMO register (most councils publish this online) and contact Environmental Health.",
        ],
      },
    ],
    relatedTopics: [
      "repairs-and-maintenance",
      "quiet-enjoyment",
      "tenant-fees",
    ],
  },
  {
    slug: "tenant-fees",
    title: "Tenant Fees Act 2019: What Landlords Can and Cannot Charge",
    shortTitle: "Tenant Fees",
    metaDescription:
      "Understand the Tenant Fees Act 2019. Learn which fees are banned, the deposit cap at 5 weeks' rent, permitted payments, and what to do if you are charged an unlawful fee.",
    icon: "banknotes",
    description:
      "The Tenant Fees Act 2019, banned fees, deposit caps, permitted charges, and how to reclaim unlawful payments.",
    lastUpdated: "2026-04-01",
    sections: [
      {
        heading: "What is the Tenant Fees Act 2019?",
        content: [
          "The **Tenant Fees Act 2019** came into force on 1 June 2019 and applies to all assured shorthold tenancies and licences to occupy in England. It bans most fees that landlords and letting agents previously charged to tenants.",
          "Before this Act, tenants routinely paid hundreds of pounds in fees just to secure a rental, including administration fees, referencing fees, check-in fees, inventory fees, and renewal fees. The average tenant was paying over £400 in fees on top of the deposit and first month's rent.",
          "The Act ensures that the only payments tenants are required to make are rent, a capped security deposit, a capped holding deposit, and a limited number of other specified payments.",
        ],
      },
      {
        heading: "Permitted Payments",
        content: [
          "Under the Tenant Fees Act 2019, the **only** payments a landlord or agent can require from a tenant are:",
          "- **Rent** (the agreed monthly or weekly rent)",
          "- **A security deposit** capped at **five weeks' rent** if the annual rent is under £50,000, or **six weeks' rent** if the annual rent is £50,000 or more",
          "- **A holding deposit** capped at **one week's rent** to reserve the property while references are carried out",
          "- **Payments for utilities** (gas, electricity, water, council tax, TV Licence, broadband) if the tenant is contractually responsible",
          "- **A default fee for lost keys or replacement security devices**, but only if the charge is reasonable and evidenced by receipts",
          "- **A default fee for late rent**, but only if the rent is more than **14 days overdue** and the fee does not exceed **3% above the Bank of England base rate** on the outstanding amount",
          "- **Payments for a change of sharer** requested by the tenant, capped at **£50** or the landlord's reasonable costs, whichever is higher",
          "- **Payments for early termination** of the tenancy requested by the tenant, limited to the loss suffered by the landlord (typically rent until a new tenant is found, up to a maximum of the remaining rent due under the tenancy)",
        ],
      },
      {
        heading: "Banned Fees",
        content: [
          "The following fees are **banned** under the Tenant Fees Act 2019. If your landlord or agent asks you to pay any of these, they are breaking the law:",
          "- **Administration fees** or application fees",
          "- **Referencing fees** (credit checks, employer references, previous landlord references)",
          "- **Inventory check-in and check-out fees**",
          "- **Tenancy renewal fees**",
          "- **Cleaning fees** charged upfront (cleaning can only be deducted from the deposit at the end of the tenancy if justified)",
          "- **Garden maintenance fees**",
          "- **Professional cleaning fees** charged upfront",
          "- **Any fee not listed in the permitted payments** above",
          "Agents sometimes try to disguise banned fees under different names. If you are asked to pay anything other than the permitted payments listed above, it is likely unlawful.",
        ],
      },
      {
        heading: "The Deposit Cap",
        content: [
          "The Act caps security deposits at **five weeks' rent** for most tenancies. Here is how to calculate it:",
          "**Formula: (Monthly rent x 12) / 52 x 5**",
          "For example, if your monthly rent is £1,000: (£1,000 x 12) / 52 x 5 = **£1,153.85**",
          "If your landlord asked for a deposit higher than this amount after 1 June 2019, the excess is an unlawful payment and you can reclaim it.",
          "The deposit must still be protected in a government-approved scheme within 30 days (see our Deposit Protection guide).",
        ],
      },
      {
        heading: "Holding Deposits",
        content: [
          "A holding deposit is a payment to reserve a property while referencing checks are carried out. Under the Tenant Fees Act 2019:",
          "- The holding deposit is capped at **one week's rent**",
          "- The landlord must decide whether to grant you the tenancy within **15 days** (the \"deadline for agreement\"), unless you agree to a longer period in writing",
          "- If the tenancy goes ahead, the holding deposit must be put towards the first month's rent or the security deposit",
          "- **The holding deposit must be returned if:** the landlord decides not to let to you, or the landlord fails to take all reasonable steps to enter into the tenancy before the deadline",
          "- **The landlord can keep the holding deposit if:** you provide false or misleading information, you fail a Right to Rent immigration check, or you pull out of the tenancy without good reason",
        ],
      },
      {
        heading: "Enforcement and Penalties",
        content: [
          "Charging a prohibited fee is a civil offence. Local council trading standards teams are responsible for enforcement.",
          "**Penalties include:**",
          "- A **financial penalty of up to £5,000** for a first offence",
          "- A **financial penalty of up to £30,000** or **criminal prosecution** for a repeat offence within five years",
          "- The landlord **cannot serve a valid Section 21 notice** until any unlawful fee has been repaid (under the old rules; now superseded by the Section 21 abolition)",
          "**If you have been charged an unlawful fee:**",
          "- Ask the landlord or agent to refund it in writing, referencing the Tenant Fees Act 2019",
          "- If they refuse, report them to your local council's trading standards team",
          "- You can also apply to the First-tier Tribunal for a recovery order",
          "- Keep evidence: the advert, your tenancy agreement, receipts or bank statements showing the payment, and all correspondence",
        ],
      },
    ],
    relatedTopics: [
      "deposit-protection",
      "rent-increases",
      "section-21-eviction",
    ],
  },
  {
    slug: "quiet-enjoyment",
    title: "Right to Quiet Enjoyment: Living Without Landlord Interference",
    shortTitle: "Quiet Enjoyment",
    metaDescription:
      "Understand your right to quiet enjoyment as a UK tenant. Learn about landlord entry rules, what counts as harassment, and how to take action if your landlord violates your rights.",
    icon: "home",
    description:
      "Your right to live undisturbed, landlord entry rules, what counts as harassment, and legal remedies.",
    lastUpdated: "2026-04-01",
    sections: [
      {
        heading: "What is the Right to Quiet Enjoyment?",
        content: [
          "The right to quiet enjoyment is a fundamental principle of tenancy law. It means that once you are granted a tenancy, you have the right to use and enjoy the property without interference from your landlord.",
          "This right is implied into every tenancy agreement by common law, even if it is not explicitly written in the contract. It applies to all types of tenancies, including assured shorthold tenancies, periodic tenancies, and fixed-term tenancies.",
          "\"Quiet enjoyment\" does not mean the property must be quiet. It means you have the right to occupy and use the property **peacefully, without disturbance** from your landlord. The word \"quiet\" in legal terms means \"undisturbed.\"",
        ],
      },
      {
        heading: "What Does This Right Cover?",
        content: [
          "Your right to quiet enjoyment protects you from a wide range of landlord conduct. Specifically, your landlord **must not:**",
          "- **Enter the property without your permission** (except in a genuine emergency, such as a gas leak or flood)",
          "- **Visit without giving reasonable notice** (at least 24 hours in most circumstances)",
          "- **Change the locks** or prevent you from accessing the property",
          "- **Remove your belongings** or interfere with your possessions",
          "- **Cut off or interfere with utilities** (gas, electricity, water, internet)",
          "- **Carry out unnecessary or excessive works** designed to disrupt your occupation",
          "- **Intimidate, threaten, or harass you** into leaving",
          "- **Send persistent, unwanted communications** designed to pressure you",
          "- **Allow other people** (builders, agents, prospective buyers or tenants) to enter without your agreement",
        ],
      },
      {
        heading: "Landlord Entry Rules",
        content: [
          "Your landlord does not have an automatic right to enter the property. Even though they own it, your tenancy gives you exclusive possession, which means you control who enters.",
          "**Rules for landlord access:**",
          "- Your landlord must give **at least 24 hours' written notice** before visiting",
          "- Visits should be at a **reasonable time** (not early morning or late evening)",
          "- You must **agree** to the visit; the landlord cannot insist on entering",
          "- If you unreasonably refuse access for necessary repairs, the landlord may be able to seek a court order, but they still cannot force entry themselves",
          "**Exceptions (when the landlord can enter without notice):**",
          "- A genuine **emergency** that poses an immediate risk to life or property (gas leak, burst pipe, fire)",
          "- If the tenancy agreement grants specific access rights for certain purposes (but even then, 24 hours' notice is considered best practice)",
          "If your landlord enters without permission and it is not an emergency, this is a breach of your right to quiet enjoyment and may also constitute harassment or illegal eviction.",
        ],
      },
      {
        heading: "Harassment by Landlords",
        content: [
          "Landlord harassment is a criminal offence under the **Protection from Eviction Act 1977**. Section 1(3A) makes it an offence for a landlord (or anyone acting on their behalf) to do acts likely to interfere with the peace or comfort of a residential occupier, or to persistently withdraw or withhold services, with the intent to cause the occupier to leave.",
          "**Common examples of landlord harassment:**",
          "- Turning up unannounced repeatedly",
          "- Letting themselves in when you are out",
          "- Changing the locks while you are away",
          "- Removing your belongings",
          "- Turning off the heating, water, or electricity",
          "- Making threats (verbal, written, or via text/email)",
          "- Entering your room without permission (especially in an HMO)",
          "- Starting unnecessary building works to make the property unlivable",
          "- Offering you money to leave and then becoming aggressive or persistent when you refuse",
          "If convicted, a landlord can face an **unlimited fine** and/or **up to two years' imprisonment**.",
        ],
      },
      {
        heading: "Illegal Eviction",
        content: [
          "Illegal eviction occurs when a landlord tries to remove you from the property without following the correct legal process. Under the **Protection from Eviction Act 1977**, it is a criminal offence to:",
          "- **Unlawfully deprive** a residential occupier of their occupation (e.g., changing the locks, boarding up the property)",
          "- **Attempt to deprive** them of occupation by intimidation or harassment",
          "Only a **court-appointed bailiff** can physically remove you from the property, and only after the landlord has obtained a valid possession order from the court.",
          "**If your landlord illegally evicts you:**",
          "- **Call the police.** Illegal eviction is a criminal offence and you can report it.",
          "- **Contact your local council.** Most councils have a Tenancy Relations Officer who deals with illegal eviction cases and can help you get back into the property quickly.",
          "- **Do not break back in** if the locks have been changed. Contact the council or police first.",
          "- **Seek legal advice immediately.** You may be entitled to an emergency injunction to get back into the property and substantial compensation.",
        ],
      },
      {
        heading: "Taking Action",
        content: [
          "If your landlord is breaching your right to quiet enjoyment, take the following steps:",
          "**1. Document everything.** Keep a diary of incidents with dates, times, and descriptions. Save texts, emails, and voicemails. Take photographs or video if appropriate.",
          "**2. Write to your landlord.** Send a formal letter or email explaining that their conduct breaches your right to quiet enjoyment. Reference the Protection from Eviction Act 1977 and state that you expect the behaviour to stop immediately.",
          "**3. Report to your local council.** Contact the Tenancy Relations Officer or Environmental Health department. The council can warn the landlord, serve notices, and prosecute if necessary.",
          "**4. Report to the police.** If the conduct amounts to harassment or illegal eviction, it is a criminal matter. Call 101 (non-emergency) or 999 if you feel in immediate danger.",
          "**5. Contact the PRS Ombudsman.** Under the Renters' Rights Act 2025, the new Private Rented Sector Ombudsman can investigate complaints about landlord conduct.",
          "**6. Seek legal advice.** Shelter (0808 800 4444), Citizens Advice, and local law centres can advise on your options, including compensation claims. Many solicitors handle these cases on a no-win-no-fee basis.",
          "You may be entitled to compensation for distress, inconvenience, and any financial losses caused by the landlord's behaviour.",
        ],
      },
    ],
    relatedTopics: [
      "section-21-eviction",
      "repairs-and-maintenance",
      "damp-and-mould",
    ],
  },
];

export function getTopicBySlug(slug: string): RightsTopic | undefined {
  return rightsTopics.find((t) => t.slug === slug);
}

export function getAllTopicSlugs(): string[] {
  return rightsTopics.map((t) => t.slug);
}
