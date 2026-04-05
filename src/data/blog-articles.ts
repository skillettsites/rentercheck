export interface BlogArticle {
  slug: string;
  title: string;
  metaDescription: string;
  publishDate: string;
  lastUpdated: string;
  readTime: number;
  category: "Rights" | "Guides" | "Money" | "Safety";
  sections: {
    id: string;
    heading: string;
    content: string;
  }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "can-landlord-enter-without-permission",
    title: "Can My Landlord Enter Without Permission? Your Rights Explained",
    metaDescription:
      "Your landlord must give at least 24 hours written notice before entering your home. Learn about emergency exceptions, quiet enjoyment rights, and what to do if your landlord enters without permission.",
    publishDate: "2026-04-04",
    lastUpdated: "2026-04-04",
    readTime: 7,
    category: "Rights",
    sections: [
      {
        id: "your-right-to-quiet-enjoyment",
        heading: "Your Right to Quiet Enjoyment",
        content:
          "Every tenant in England has a legal right to \"quiet enjoyment\" of their home. This is one of the most fundamental rights in tenancy law, and it applies whether your tenancy agreement mentions it or not. It is an implied term in every tenancy.\n\nQuiet enjoyment means your landlord cannot interfere with your peaceful use of the property. This includes entering the property without your consent, making unannounced visits, or doing anything that disrupts your ability to live there comfortably. The right is protected under common law and reinforced by the **Protection from Eviction Act 1977**.\n\nUnder the **Renters' Rights Act 2025**, these protections have been strengthened further. Landlords who repeatedly breach quiet enjoyment rights can face enforcement action from local councils, and persistent harassment can result in criminal prosecution.",
      },
      {
        id: "24-hour-notice-requirement",
        heading: "The 24-Hour Notice Requirement",
        content:
          "Your landlord must give you at least **24 hours written notice** before visiting the property for any non-emergency reason. This is a minimum; many tenancy agreements specify longer notice periods.\n\nThe notice must include:\n\n- The date and approximate time of the visit\n- The reason for the visit (e.g. inspection, repairs, showing to prospective tenants)\n- A request for your agreement, not just an announcement\n\nImportantly, even with 24 hours notice, you can refuse entry if the proposed time is not convenient. Your landlord needs your actual consent, not just to have given notice. The only situation where your landlord can insist on access (outside emergencies) is if your tenancy agreement includes a specific access clause and the visit is for a legitimate purpose such as carrying out repairs.\n\nIf your landlord wants to show the property to prospective tenants or buyers, they must still give proper notice and obtain your agreement on timing. Under the **Renters' Rights Act 2025**, landlords cannot require you to allow viewings at unreasonable times or with unreasonable frequency.",
      },
      {
        id: "emergency-exceptions",
        heading: "When Can a Landlord Enter Without Notice?",
        content:
          "There are limited circumstances where a landlord may enter without giving 24 hours notice:\n\n- **Genuine emergency**: A burst pipe, gas leak, fire, or structural collapse that poses an immediate risk to life, health, or the property. The landlord must still try to contact you first if at all possible.\n- **With your verbal agreement**: If you phone your landlord and say \"come round now to fix the boiler,\" that counts as consent even without written notice.\n\nThat is the full list. There is no general \"landlord's right of access\" that overrides your right to quiet enjoyment. Your landlord cannot enter:\n\n- To \"check on the property\" without notice\n- Because they still have a key\n- While you are on holiday\n- To carry out non-urgent repairs without agreeing a time\n- To show estate agents or prospective buyers without your consent\n\nIf your tenancy agreement says \"the landlord may enter at any time without notice,\" that clause is likely unenforceable because it conflicts with your statutory rights under the Protection from Eviction Act 1977.",
      },
      {
        id: "what-counts-as-harassment",
        heading: "What Counts as Landlord Harassment?",
        content:
          "Repeated unauthorised entry, or threats to enter, can amount to **harassment** under the Protection from Eviction Act 1977. Harassment is a criminal offence that can result in a fine or imprisonment.\n\nExamples of harassment include:\n\n- Entering the property without notice or consent on multiple occasions\n- Turning up unannounced to \"inspect\" the property\n- Letting themselves in while you are out\n- Threatening to enter if you do not comply with demands\n- Changing the locks while you are away\n- Removing your belongings\n- Deliberately disrupting utilities (gas, electricity, water)\n\nUnder section 1(3A) of the Protection from Eviction Act 1977, a landlord commits an offence if they do acts \"likely to interfere with the peace or comfort of the residential occupier\" with the intent of causing them to give up the property. The maximum penalty is an unlimited fine and up to two years in prison.\n\nLocal councils have a duty to investigate reports of landlord harassment and can prosecute offending landlords.",
      },
      {
        id: "what-to-do",
        heading: "What to Do If Your Landlord Enters Without Permission",
        content:
          "If your landlord has entered your home without permission, take these steps:\n\n- **Document everything**: Write down the date, time, and what happened while it is fresh in your memory. Take photos if there is evidence of entry (moved items, unlocked doors).\n- **Check for a pattern**: A single incident might be a misunderstanding. Repeated entries suggest harassment.\n- **Write to your landlord**: Send a formal letter (keep a copy) reminding them of your right to quiet enjoyment and the 24-hour notice requirement. State clearly that you do not consent to unannounced visits.\n- **Change the locks**: You are generally entitled to change the locks on your rental property, provided you give a set of keys to the landlord and change them back when you leave. Check your tenancy agreement first.\n- **Contact your council**: If the behaviour continues, report it to your local council's tenancy relations officer or private rented sector team. They can investigate and take enforcement action.\n- **Call the police**: If you feel threatened or your landlord is physically present and refusing to leave, call 999. Unlawful entry can be trespass.\n- **Seek legal advice**: Contact Shelter (0808 800 4444) or Citizens Advice for free, confidential guidance.\n\nYou may also be able to claim compensation through the courts if your landlord's behaviour has caused you distress or financial loss. Under the Renters' Rights Act 2025, the new Private Rented Sector Ombudsman can also investigate complaints about landlord behaviour.",
      },
    ],
    faqs: [
      {
        question: "Can my landlord enter my property without permission in the UK?",
        answer:
          "No. Your landlord must give you at least 24 hours written notice and obtain your consent before entering. The only exception is a genuine emergency such as a gas leak or burst pipe. This right is protected under common law, the Protection from Eviction Act 1977, and the Renters' Rights Act 2025.",
      },
      {
        question: "What happens if my landlord enters without notice?",
        answer:
          "A single incident may be a misunderstanding, but repeated unauthorised entry can constitute harassment, which is a criminal offence under the Protection from Eviction Act 1977. You should document the incident, write a formal letter to your landlord, and report repeated breaches to your local council.",
      },
      {
        question: "Can I change the locks on my rented property?",
        answer:
          "Generally yes. There is no law preventing you from changing the locks, provided you give a copy of the new key to your landlord and restore the original locks when you leave. Check your tenancy agreement for any specific clauses, though a clause completely prohibiting lock changes may be considered unfair under the Consumer Rights Act 2015.",
      },
      {
        question:
          "Can my landlord show prospective tenants around while I still live there?",
        answer:
          "Your landlord can request access to show the property, but must give proper notice and you must agree to the timing. You cannot unreasonably refuse if given adequate notice, but you can insist on convenient times and reasonable frequency. Under the Renters' Rights Act 2025, landlords cannot pressure you into allowing excessive viewings.",
      },
    ],
    relatedSlugs: [
      "how-to-report-landlord",
      "renting-rights-without-contract",
      "can-landlord-increase-rent",
    ],
  },
  {
    slug: "can-landlord-increase-rent",
    title: "Can My Landlord Increase My Rent? Rules for 2026",
    metaDescription:
      "UK rent increase rules for 2026 explained. Learn about the Section 13 process, once-per-year limits, how to challenge unfair increases at a tribunal, and changes under the Renters' Rights Act 2025.",
    publishDate: "2026-04-04",
    lastUpdated: "2026-04-04",
    readTime: 8,
    category: "Money",
    sections: [
      {
        id: "how-rent-increases-work",
        heading: "How Rent Increases Work in England",
        content:
          "Under the **Renters' Rights Act 2025**, the rules around rent increases have changed significantly. All Section 21 \"no fault\" evictions have been abolished, and the rent increase process is now more tightly regulated.\n\nYour landlord can only increase your rent using the **Section 13** process. This means they must serve you a formal notice (a Section 13 notice) proposing the new rent amount. They cannot simply tell you verbally or put it in a text message.\n\nThe key rules are:\n\n- Rent can only be increased **once per year** (once every 12 months)\n- The landlord must give you **at least two months' notice** using the prescribed Section 13 form\n- The proposed increase must be to a **market rent level**, not an arbitrary amount\n- You have the right to **challenge the increase** at a First-tier Tribunal\n\nRent review clauses in tenancy agreements that allow increases by a fixed percentage or formula are **no longer valid** under the Renters' Rights Act 2025. All increases must go through the Section 13 route.",
      },
      {
        id: "section-13-process",
        heading: "The Section 13 Notice Process",
        content:
          "Your landlord must follow a specific legal process to increase your rent:\n\n- **Step 1**: The landlord serves you a Section 13 notice (Form 4) proposing the new rent\n- **Step 2**: The notice must state the current rent, the proposed new rent, and the date the increase takes effect\n- **Step 3**: You have until the proposed start date to decide whether to accept or challenge it\n- **Step 4**: If you do nothing, the new rent takes effect on the date stated in the notice\n\nThe notice period is **two months** for most tenancies. The increase cannot take effect less than 12 months after the start of your tenancy or less than 12 months after the last rent increase, whichever is later.\n\nIf the notice is not served correctly (wrong form, insufficient notice period, too soon after the last increase), it is invalid and you can continue paying the current rent.",
      },
      {
        id: "challenging-at-tribunal",
        heading: "How to Challenge a Rent Increase at Tribunal",
        content:
          "If you believe the proposed rent increase is above market rate, you can refer it to the **First-tier Tribunal (Property Chamber)**. The application is free and you do not need a solicitor.\n\nHere is how the process works:\n\n- You must apply **before the proposed start date** of the increase\n- The tribunal will assess what the **open market rent** would be for your property\n- They consider the property's condition, size, location, and comparable rents in the area\n- They can set the rent at the market rate, which could be lower, the same, or higher than the landlord proposed\n\n**Important change for 2026**: Under the Renters' Rights Act 2025, the tribunal can **only set the rent at or below the amount proposed by the landlord**. Previously, the tribunal could set a rent higher than the landlord asked for, which discouraged tenants from challenging. This risk has now been removed.\n\nTo strengthen your case, gather evidence of comparable rents in your area. Check rental listings on Rightmove and Zoopla for similar properties. You can also use our [fair rent checker](/fair-rent) to see how your rent compares to the local average.\n\nThe tribunal process typically takes 4 to 8 weeks from application to decision.",
      },
      {
        id: "what-counts-as-fair",
        heading: "How to Check If a Rent Increase Is Fair",
        content:
          "A rent increase should reflect the **open market rent** for your property. Here is how to assess whether it is reasonable:\n\n- **Compare similar properties**: Search Rightmove and Zoopla for properties of a similar size, type, and condition in your area. Focus on asking rents, not sold prices.\n- **Check the ONS data**: The Office for National Statistics publishes monthly private rental statistics broken down by region.\n- **Consider the property condition**: If your property needs repairs or has issues like damp, the market rent should be lower than a well-maintained equivalent.\n- **Look at the percentage increase**: While there is no cap on rent increases, anything significantly above inflation should be supported by local market evidence.\n\nUse our [fair rent checker](/fair-rent) to see a quick comparison of your rent against the local average for your property type and area.\n\nIf the increase is clearly above market rate, you have strong grounds for a tribunal challenge. If it is roughly in line with comparable properties, it may be harder to dispute even if it feels steep.",
      },
      {
        id: "rent-increase-protections",
        heading: "Additional Protections Under the Renters' Rights Act 2025",
        content:
          "The Renters' Rights Act 2025 introduced several important protections around rent:\n\n- **No retaliatory increases**: Landlords cannot use rent increases as punishment for tenants who have complained about repairs or exercised their rights. If a tribunal finds an increase is retaliatory, they can reject it.\n- **No bidding wars**: It is now illegal for landlords or agents to invite or accept offers above the advertised rent for a new tenancy.\n- **Rent repayment orders**: If your landlord commits certain offences (such as failing to licence an HMO), you can apply for a rent repayment order to recover up to 12 months of rent.\n- **Section 21 abolition**: Since no-fault evictions are abolished, your landlord cannot evict you simply because you challenged a rent increase.\n\nThese changes mean tenants are in a much stronger position to challenge unfair rent increases without fear of losing their home.\n\nIf you believe your rent increase is unfair or has not followed the correct process, contact Citizens Advice (0800 144 8848) or Shelter (0808 800 4444) for free guidance.",
      },
    ],
    faqs: [
      {
        question: "How often can my landlord increase my rent?",
        answer:
          "Your landlord can only increase your rent once every 12 months. They must use the Section 13 notice process and give you at least two months' written notice. Rent review clauses allowing more frequent increases are no longer valid under the Renters' Rights Act 2025.",
      },
      {
        question: "Can my landlord increase rent by any amount?",
        answer:
          "There is no formal cap on rent increases in England, but the increase must be to a market rent level. If you believe the increase is above the open market rate, you can challenge it at a First-tier Tribunal for free. The tribunal can only set the rent at or below the amount your landlord proposed.",
      },
      {
        question: "What if my landlord increases rent without a Section 13 notice?",
        answer:
          "A rent increase is only valid if served using a Section 13 notice with the correct form and notice period. If your landlord simply tells you the rent is going up without following this process, the increase is not legally binding and you can continue paying the current rent.",
      },
      {
        question: "Can my landlord evict me for challenging a rent increase?",
        answer:
          "No. Section 21 no-fault evictions have been abolished under the Renters' Rights Act 2025. Your landlord cannot evict you simply because you challenged a rent increase. If a tribunal finds an increase is retaliatory, they can reject it entirely.",
      },
      {
        question: "Is there a rent cap in the UK?",
        answer:
          "There is no formal rent cap in England as of 2026. However, all increases must be to market rent levels and follow the Section 13 process. Scotland has introduced rent controls in certain areas, and Wales has its own rules under the Renting Homes (Wales) Act 2016.",
      },
    ],
    relatedSlugs: [
      "how-to-get-deposit-back",
      "can-landlord-enter-without-permission",
      "how-to-report-landlord",
    ],
  },
  {
    slug: "how-to-get-deposit-back",
    title: "How to Get Your Full Deposit Back: Complete Guide",
    metaDescription:
      "Step-by-step guide to getting your tenancy deposit back in full. Covers check-in/check-out, fair wear and tear, how to dispute deductions, ADR with DPS/MyDeposits/TDS, and claiming penalties for unprotected deposits.",
    publishDate: "2026-04-04",
    lastUpdated: "2026-04-04",
    readTime: 9,
    category: "Money",
    sections: [
      {
        id: "deposit-protection-basics",
        heading: "How Deposit Protection Works",
        content:
          "In England, your landlord must protect your deposit in one of three **government-approved tenancy deposit schemes** within **30 days** of receiving it. The three schemes are:\n\n- **Deposit Protection Service (DPS)**: A custodial scheme where the DPS holds the money\n- **MyDeposits**: Offers both custodial and insurance-based protection\n- **Tenancy Deposit Scheme (TDS)**: Offers both custodial and insurance-based protection\n\nYour landlord must also give you **prescribed information** about the scheme within 30 days. This includes which scheme holds the deposit, the scheme's dispute resolution process, and the circumstances under which deductions may be made.\n\nIf your landlord fails to protect your deposit or provide the prescribed information, they cannot serve a valid Section 8 eviction notice. More importantly, you can claim compensation of **1 to 3 times the deposit amount** through the county court.\n\nThe deposit cap under the Tenant Fees Act 2019 is **5 weeks' rent** for tenancies with annual rent under £50,000, or 6 weeks' rent for higher amounts.",
      },
      {
        id: "check-in-check-out",
        heading: "The Check-In and Check-Out Process",
        content:
          "A thorough check-in process at the start of your tenancy is the single most important step to getting your deposit back at the end.\n\n**At check-in, you should:**\n\n- Request or create a detailed **inventory** listing every item, fixture, and surface\n- Take **date-stamped photos and videos** of every room, including close-ups of any existing damage\n- Note any pre-existing issues: marks on walls, stains on carpets, scuffs on doors, condition of appliances\n- Report any problems to your landlord in writing within the first week\n- Keep a copy of the inventory and all photos in a safe place (cloud storage is ideal)\n\n**At check-out:**\n\n- Clean the property to the standard it was in at check-in (not \"professionally cleaned\" unless that was the standard at the start)\n- Take photos of every room again, from the same angles as your check-in photos\n- Attend the check-out inspection in person if possible\n- Read the check-out report carefully and challenge anything you disagree with before signing\n\nIf no inventory was done at check-in, this works in your favour. Your landlord will struggle to prove damage was caused by you without a baseline record.",
      },
      {
        id: "fair-wear-and-tear",
        heading: "What Is Fair Wear and Tear?",
        content:
          "Your landlord **cannot** deduct from your deposit for \"fair wear and tear.\" This is the natural deterioration that occurs through normal everyday living.\n\nExamples of fair wear and tear (no deduction allowed):\n\n- Small scuffs on walls from furniture\n- Faded curtains from sunlight\n- Worn carpet in high-traffic areas\n- Minor marks around light switches\n- Slight discolouration of grouting\n- Faded paint over several years\n\nExamples of damage beyond fair wear and tear (deduction may be valid):\n\n- Large holes in walls\n- Cigarette burns on carpets\n- Broken windows or door handles\n- Stains that require professional cleaning\n- Pet damage to floors or furniture\n- Missing items listed on the inventory\n\nThe key principle is that the longer you have lived in the property, the more wear and tear is expected. A carpet in a property where you lived for 5 years should look more worn than one after a 6-month tenancy. Landlords must apply a **betterment** reduction, meaning they cannot charge you the full cost of a new item to replace an old one.",
      },
      {
        id: "disputing-deductions",
        heading: "How to Dispute Unfair Deductions",
        content:
          "If your landlord proposes deductions you disagree with, do not simply accept them. Here is the process:\n\n- **Respond in writing** within 10 days, explaining why you dispute each deduction\n- **Provide evidence**: Check-in photos, your own check-out photos, receipts for cleaning, and any relevant correspondence\n- **Be specific**: Address each deduction individually rather than making a general complaint\n- **Negotiate**: Many disputes are resolved through direct negotiation. Offer a compromise if appropriate.\n\nIf you cannot agree, either party can refer the dispute to the **Alternative Dispute Resolution (ADR)** service provided by the deposit scheme. This is free and binding.\n\nThe ADR process:\n\n- Either you or the landlord raises a dispute with the scheme\n- Both parties submit evidence (photos, inventory, correspondence)\n- An independent adjudicator reviews the evidence and makes a decision\n- The decision is binding on both parties\n- The money is then released according to the adjudicator's decision\n\nADR decisions typically take 4 to 6 weeks. The adjudicator cannot award more than the deposit amount. In practice, landlords who make unreasonable deductions often lose at ADR because the burden of proof is on them to justify each deduction.",
      },
      {
        id: "unprotected-deposit-claims",
        heading: "What If Your Deposit Was Not Protected?",
        content:
          "If your landlord failed to protect your deposit in a government-approved scheme within 30 days, you have powerful legal remedies.\n\nYou can apply to the **county court** for:\n\n- The return of your full deposit\n- Compensation of **1 to 3 times the deposit amount** (at the court's discretion)\n\nFor example, if your deposit was £1,200 and it was never protected, the court could order your landlord to pay you back the £1,200 plus up to £3,600 in compensation, totalling £4,800.\n\nTo check if your deposit is protected:\n\n- Search on the DPS website: depositprotection.com\n- Search on MyDeposits: mydeposits.co.uk\n- Search on TDS: tenancydepositscheme.com\n\nYou can make a claim at any time during the tenancy or within **6 years** of the tenancy ending. Many solicitors offer these cases on a \"no win, no fee\" basis because the success rate is very high when the deposit genuinely was not protected.\n\nYou do not need to wait until your tenancy ends to make a claim. You can apply to court while still living in the property.",
      },
      {
        id: "tips-getting-deposit-back",
        heading: "10 Tips to Get Your Full Deposit Back",
        content:
          "Follow these practical tips to maximise your chances:\n\n- **Take photos on day one**: Document every room, every mark, every appliance. Store them in the cloud with timestamps.\n- **Report issues immediately**: If something is broken or damaged when you move in, email your landlord within the first week.\n- **Keep all correspondence**: Save every email, text, and letter from your landlord. These may be crucial evidence later.\n- **Pay rent on time**: Landlords are more likely to dispute deposits with tenants who had payment issues.\n- **Give proper notice**: Follow the notice requirements in your tenancy agreement to avoid claims for lost rent.\n- **Clean thoroughly**: Clean the property to the same standard as when you moved in. Take photos as proof.\n- **Fix minor damage**: It is often cheaper to repair small holes in walls or replace a damaged blind yourself than to have it deducted from your deposit.\n- **Attend the check-out**: Being present means you can challenge observations in real time.\n- **Know the ADR process**: If your landlord makes unfair deductions, use the deposit scheme's free dispute resolution.\n- **Check protection status**: Verify your deposit is protected. If it is not, you may be entitled to compensation of 1 to 3 times the deposit amount.",
      },
    ],
    faqs: [
      {
        question: "How long does a landlord have to return my deposit?",
        answer:
          "Your landlord should return your deposit within 10 days of both parties agreeing how much should be returned. If there is a dispute, the money stays protected in the deposit scheme until resolved through ADR or the courts.",
      },
      {
        question: "Can my landlord deduct for professional cleaning?",
        answer:
          "Only if the property was professionally cleaned before you moved in and this was documented in the inventory. If the property was not professionally cleaned at check-in, your landlord cannot require you to pay for professional cleaning at check-out. You only need to return the property in a similar condition to when you moved in, accounting for fair wear and tear.",
      },
      {
        question: "What if my landlord will not return my deposit?",
        answer:
          "First, write a formal letter requesting the return of your deposit within 10 days. If they refuse or do not respond, raise a dispute through the deposit protection scheme's ADR service. If the deposit was never protected, you can apply to the county court for its return plus compensation of 1 to 3 times the deposit amount.",
      },
      {
        question: "Can I get compensation if my deposit was not protected?",
        answer:
          "Yes. If your landlord failed to protect your deposit within 30 days, you can apply to the county court for the return of the deposit plus compensation of 1 to 3 times the deposit amount. You can claim during the tenancy or within 6 years of it ending.",
      },
    ],
    relatedSlugs: [
      "can-landlord-increase-rent",
      "what-to-check-before-renting",
      "renting-rights-without-contract",
    ],
  },
  {
    slug: "what-to-check-before-renting",
    title: "What to Check Before Renting a Property: 15-Point Checklist",
    metaDescription:
      "Essential checklist of 15 things to check before signing a tenancy agreement. Covers EPC ratings, gas safety, electrical certs, damp signs, landlord legitimacy, deposit protection, and hidden costs.",
    publishDate: "2026-04-04",
    lastUpdated: "2026-04-04",
    readTime: 8,
    category: "Guides",
    sections: [
      {
        id: "safety-certificates",
        heading: "1. Safety Certificates You Must See",
        content:
          "Before signing any tenancy agreement, your landlord is legally required to provide certain safety documents. If they cannot show you these, walk away or report them.\n\n**Gas Safety Certificate (CP12)**\n\nEvery rental property with gas appliances must have an annual gas safety check by a Gas Safe registered engineer. Your landlord must give you a copy of the certificate **before you move in**. You can verify an engineer's registration at GasSafeRegister.co.uk.\n\n**Electrical Installation Condition Report (EICR)**\n\nSince July 2020, landlords must have the electrical installation inspected every 5 years by a qualified electrician. They must give you a copy of the report **before you move in**. The report should show a \"satisfactory\" result.\n\n**Energy Performance Certificate (EPC)**\n\nAll rental properties must have an EPC rating of **E or above** (C or above for new tenancies from 2028). The landlord must show you the EPC before you commit. A low rating means higher energy bills. You can check any property's EPC for free at gov.uk/find-energy-certificate.\n\n**Smoke and Carbon Monoxide Alarms**\n\nLandlords must install smoke alarms on every floor and carbon monoxide alarms in any room with a fixed combustion appliance (gas boiler, wood burner, etc.). Test them during your viewing.",
      },
      {
        id: "property-condition",
        heading: "2. Property Condition Red Flags",
        content:
          "During your viewing, look carefully for signs of problems that could affect your health, safety, or deposit:\n\n**Damp and Mould**\n\n- Black spots on walls, ceilings, or around windows\n- Peeling paint or wallpaper\n- Musty smell, especially in bathrooms and kitchens\n- Condensation between double-glazed window panes (indicates failed seals)\n- Tide marks on walls (possible rising damp)\n\nUse our [damp assessment tool](/damp-check) to understand your rights if you find damp.\n\n**Structural Issues**\n\n- Cracks in walls, especially diagonal cracks near windows and doors\n- Doors or windows that stick or will not close properly\n- Uneven or sloping floors\n- Signs of subsidence in the exterior walls\n\n**Plumbing and Heating**\n\n- Run taps to check water pressure\n- Flush toilets\n- Turn on the heating and check radiators get warm\n- Look under sinks for signs of leaks\n- Check the boiler age (boilers over 15 years old are less efficient and more likely to break down)",
      },
      {
        id: "landlord-checks",
        heading: "3. Check Your Landlord",
        content:
          "Not all landlords operate legally. Protect yourself by verifying the basics:\n\n- **Deposit protection**: Ask which scheme will protect your deposit (DPS, MyDeposits, or TDS). If they seem unsure, that is a warning sign.\n- **Licensing**: Check if the property requires an HMO licence (if it is a house share) or selective licensing (some council areas require all landlords to be licensed). Contact your local council or use our [landlord check tool](/landlord-check).\n- **Landlord identity**: Verify the person you are dealing with actually owns the property. You can check the Land Registry for £3.\n- **Agent membership**: If you are dealing with a letting agent, check they are a member of a government-approved redress scheme (The Property Ombudsman or Property Redress Scheme). This is a legal requirement.\n- **Tenant Fees Act compliance**: Your landlord or agent can only charge you rent, a refundable tenancy deposit (max 5 weeks' rent), and a refundable holding deposit (max 1 week's rent). No other fees are permitted.",
      },
      {
        id: "tenancy-agreement",
        heading: "4. Read the Tenancy Agreement Carefully",
        content:
          "Never sign a tenancy agreement without reading every clause. Pay special attention to:\n\n- **Rent amount and payment date**: Confirm the exact amount and when it is due each month\n- **Deposit amount**: Must not exceed 5 weeks' rent (for annual rent under £50,000)\n- **Notice periods**: How much notice you must give to end the tenancy\n- **Break clause**: Does the agreement allow you to leave early? Under what conditions?\n- **Restrictions**: Pets, subletting, smoking, alterations, guests staying overnight\n- **Repair responsibilities**: Who is responsible for what? (Note: structural repairs, plumbing, heating, and electrical are always the landlord's responsibility by law)\n- **Rent increase clause**: Under the Renters' Rights Act 2025, only Section 13 increases are valid. Fixed-percentage review clauses are no longer enforceable.\n\nIf anything seems unfair or confusing, ask for clarification in writing before signing. You can also contact Citizens Advice or Shelter for help understanding your agreement.",
      },
      {
        id: "area-safety",
        heading: "5. Research the Area",
        content:
          "The property itself might be perfect, but the area matters too:\n\n- **Crime rates**: Check local crime statistics on police.uk or use our [property safety check](/check) for a detailed area report\n- **Flood risk**: Check gov.uk/check-flooding for flood risk data\n- **Transport links**: How long is the actual commute? Check at peak times, not just off-peak.\n- **Local amenities**: Are there shops, GP surgeries, schools (if relevant), and green spaces nearby?\n- **Noise levels**: Visit at different times of day. A quiet street during a Tuesday viewing might be very different on a Friday night.\n- **Council tax band**: Check your council's website for the band and annual charge. This can add £100-200+ per month to your costs.\n\nUse our [total cost calculator](/calculator) to work out the true monthly cost of renting, including council tax, energy bills, and commuting costs.",
      },
      {
        id: "hidden-costs",
        heading: "6. Calculate the True Cost",
        content:
          "The advertised rent is just the starting point. Before committing, add up all the costs:\n\n- **Rent**: The monthly amount (confirm whether it includes any bills)\n- **Council tax**: Varies dramatically by area and property band\n- **Energy bills**: Check the EPC rating. A rating of D or below will mean higher bills. Ask the landlord or current tenant about typical monthly costs.\n- **Water rates**: Metered or unmetered? Ask for recent bills.\n- **Broadband**: Check availability and speeds at your chosen provider\n- **Commuting costs**: Train pass, petrol, parking\n- **Contents insurance**: Not required but strongly recommended\n- **TV licence**: £169.50 per year (2026 rate)\n\nOur [cost calculator](/calculator) helps you work out the true total monthly cost so there are no surprises after you move in.\n\nAs a rule of thumb, your total housing costs (rent plus all bills) should not exceed **35-40% of your take-home pay**. If it is higher, you may find yourself under financial pressure.",
      },
    ],
    faqs: [
      {
        question: "What documents should a landlord provide before I move in?",
        answer:
          "Your landlord must provide a valid Gas Safety Certificate (CP12), an Electrical Installation Condition Report (EICR), an Energy Performance Certificate rated E or above, and the government's 'How to Rent' guide. They must also confirm which deposit protection scheme will hold your deposit and provide the prescribed information within 30 days.",
      },
      {
        question: "Can a landlord rent out a property without an EPC?",
        answer:
          "No. It is illegal to let a property without a valid EPC in England. The property must also have a minimum rating of E (with some exemptions). From 2028, new tenancies will require a minimum C rating. Landlords who let without a valid EPC can be fined up to £5,000.",
      },
      {
        question: "What fees can a letting agent charge tenants?",
        answer:
          "Under the Tenant Fees Act 2019, agents can only charge rent, a refundable tenancy deposit (max 5 weeks' rent for annual rent under £50,000), a refundable holding deposit (max 1 week's rent), and charges for specific tenant-requested services like contract changes or early termination. All other fees are banned.",
      },
      {
        question: "How do I check if a property is licensed?",
        answer:
          "Contact your local council's housing team or check their website for a public register of licensed properties. Many councils now have online searchable databases. You can also use our landlord check tool to look up licensing requirements for your area.",
      },
    ],
    relatedSlugs: [
      "how-to-get-deposit-back",
      "tenant-rights-damp-mould-2026",
      "hmo-rights-house-share",
    ],
  },
  {
    slug: "tenant-rights-damp-mould-2026",
    title: "Tenant Rights for Damp and Mould in 2026: Awaab's Law Explained",
    metaDescription:
      "Awaab's Law gives tenants legal timescales for landlords to fix damp and mould. Learn what the law requires, how to report issues, health risks, and when you can claim compensation.",
    publishDate: "2026-04-04",
    lastUpdated: "2026-04-04",
    readTime: 8,
    category: "Safety",
    sections: [
      {
        id: "what-is-awaabs-law",
        heading: "What Is Awaab's Law?",
        content:
          "Awaab's Law is named after **Awaab Ishak**, a two-year-old boy who died in December 2020 from a respiratory condition caused by prolonged exposure to mould in his family's social housing in Rochdale. His death led to a national outcry and prompted the government to introduce strict legal timescales for landlords to address damp and mould.\n\nThe law was introduced as part of the **Social Housing (Regulation) Act 2023** and initially applied to social housing landlords. Under the **Renters' Rights Act 2025**, these requirements have been extended to **all private landlords** in England.\n\nAwaab's Law creates legally enforceable timescales for landlords to investigate and fix hazards including damp, mould, and other conditions that pose a risk to tenants' health. Failure to comply can result in enforcement action, fines, and compensation claims.",
      },
      {
        id: "required-timescales",
        heading: "The Legal Timescales Landlords Must Follow",
        content:
          "Under Awaab's Law, once a tenant reports a damp or mould problem, the landlord must act within strict timescales:\n\n- **Within 14 calendar days**: The landlord must investigate the issue and provide a written response explaining what they found and what action they will take\n- **Within 7 calendar days of investigation**: If the issue poses an immediate risk to health, emergency repairs must begin\n- **Within 28 calendar days**: Non-emergency repairs must be completed\n- **Within 7 calendar days of completion**: The landlord must contact the tenant to confirm the work has been effective\n\nIf the repair is complex and genuinely cannot be completed within 28 days, the landlord must provide a clear written schedule with a reasonable completion date. They must also take interim measures to protect the tenant's health in the meantime, such as providing dehumidifiers or temporary alternative accommodation.\n\nThese timescales apply from the date the tenant reports the issue, not from when the landlord acknowledges it. Keep a record of when you reported the problem.",
      },
      {
        id: "how-to-report",
        heading: "How to Report Damp and Mould to Your Landlord",
        content:
          "Reporting correctly is essential to trigger the legal timescales and protect your rights:\n\n- **Put it in writing**: Always report damp and mould in writing (email is ideal). A phone call is not enough because you need evidence of when you reported it.\n- **Be specific**: Describe exactly where the damp or mould is, how long it has been there, and any symptoms you or your household are experiencing.\n- **Take photos**: Photograph every affected area with date stamps. Take photos regularly to show progression.\n- **Keep a log**: Note dates, times, and details of all communication with your landlord about the issue.\n- **Send a follow-up**: If you do not receive a written response within 14 days, send a follow-up email referencing Awaab's Law and the legal timescales.\n\nUse our [report issue tool](/report-issue) to generate a formal letter to your landlord that references the relevant legislation and sets out the timescales they must follow.\n\nIf your landlord does not respond or refuses to act, the next step is to contact your local council's environmental health team.",
      },
      {
        id: "landlord-ignores",
        heading: "What Happens If Your Landlord Ignores the Problem?",
        content:
          "If your landlord fails to act within the legal timescales, you have several options:\n\n**Contact your local council**\n\nYour council's environmental health team can inspect the property and serve an **improvement notice** requiring the landlord to carry out repairs within a set period. If the landlord ignores the notice, the council can:\n\n- Carry out the work themselves and charge the landlord\n- Issue a **civil penalty** of up to £30,000\n- Prosecute the landlord (unlimited fine on conviction)\n- Issue a **banning order** preventing them from letting property\n\n**Apply to the courts**\n\nYou can apply to the county court for a **repair order** requiring the landlord to fix the problem. You may also claim **compensation** for:\n\n- Damage to your belongings caused by damp or mould\n- Reduced enjoyment of the property\n- Health costs and suffering\n\nCompensation amounts vary, but courts have awarded 25-50% rent reductions for the period the property was affected by serious damp and mould.\n\n**Rent repayment order**\n\nIf your landlord has been convicted of a housing offence or issued a civil penalty, you can apply for a **rent repayment order** to recover up to 12 months of rent.\n\n**The Private Rented Sector Ombudsman**\n\nUnder the Renters' Rights Act 2025, all private landlords must join the new ombudsman service. You can complain to the ombudsman if your landlord has failed to address damp and mould issues.",
      },
      {
        id: "health-risks",
        heading: "Health Risks of Damp and Mould",
        content:
          "Living with damp and mould is not just unpleasant; it is a serious health hazard. The NHS recognises the following risks:\n\n- **Respiratory infections**: Mould spores can cause and worsen asthma, bronchitis, and other respiratory conditions\n- **Allergic reactions**: Sneezing, skin rashes, watery eyes, and runny nose\n- **Weakened immune system**: Prolonged exposure can affect your body's ability to fight infections\n- **Mental health**: Living in damp, mouldy conditions is associated with anxiety, depression, and poor sleep\n- **Higher risk groups**: Children, elderly people, pregnant women, and those with existing respiratory conditions or weakened immune systems are particularly vulnerable\n\nIf you or anyone in your household is experiencing health problems that you believe are linked to damp or mould, see your GP and ask them to document the connection in your medical records. This evidence is valuable if you later claim compensation.\n\nYou can use our [damp and mould assessment](/damp-check) to evaluate the severity of the issue and understand your legal options.",
      },
      {
        id: "preventing-damp",
        heading: "Tenant vs Landlord Responsibilities",
        content:
          "Understanding who is responsible for what can prevent disputes:\n\n**Landlord responsibilities:**\n\n- Structural repairs (roof, walls, foundations, external drainage)\n- Plumbing and heating systems\n- Ventilation systems (extractor fans, trickle vents)\n- Damp-proofing\n- Addressing any design or structural defects that cause condensation\n\n**Tenant responsibilities:**\n\n- Ventilating the property reasonably (opening windows when cooking or showering, using extractor fans)\n- Heating the property adequately\n- Not blocking ventilation points\n- Reporting problems promptly\n\nLandlords sometimes blame tenants for condensation damp, claiming it is a \"lifestyle issue.\" While tenants should ventilate and heat the property, the landlord is responsible if the problem is caused by inadequate ventilation, insulation, or heating systems. If your property has no extractor fans, insufficient insulation, or a heating system that does not work properly, the damp is the landlord's problem to fix.\n\nA surveyor's report can establish the cause of damp definitively. If your landlord refuses to accept responsibility, your council's environmental health team can carry out an assessment.",
      },
    ],
    faqs: [
      {
        question: "Does Awaab's Law apply to private tenants?",
        answer:
          "Yes. Awaab's Law originally applied only to social housing under the Social Housing (Regulation) Act 2023, but the Renters' Rights Act 2025 extended these requirements to all private landlords in England. Your landlord must investigate within 14 days, begin emergency repairs within 7 days, and complete non-emergency repairs within 28 days.",
      },
      {
        question: "Can my landlord blame me for damp and mould?",
        answer:
          "Landlords sometimes claim condensation damp is caused by the tenant's lifestyle. While tenants should ventilate and heat the property reasonably, the landlord is responsible if the issue is caused by inadequate ventilation, poor insulation, structural defects, or faulty heating systems. A council environmental health inspection or independent surveyor's report can determine the true cause.",
      },
      {
        question: "Can I withhold rent because of damp and mould?",
        answer:
          "Withholding rent is risky and generally not recommended, as your landlord could seek to recover the unpaid rent through the courts. Instead, report the issue formally, contact your council's environmental health team, and consider applying to the courts for a rent reduction or compensation. Seek advice from Shelter or Citizens Advice before taking any action on rent.",
      },
      {
        question: "How much compensation can I get for damp and mould?",
        answer:
          "Compensation varies depending on severity and duration. Courts have awarded rent reductions of 25-50% for the affected period, plus damages for health impacts and damage to belongings. In serious cases, awards of several thousand pounds are not uncommon. You can also apply for a rent repayment order of up to 12 months' rent if your landlord has been convicted of a housing offence.",
      },
    ],
    relatedSlugs: [
      "how-to-report-landlord",
      "what-to-check-before-renting",
      "can-landlord-enter-without-permission",
    ],
  },
  {
    slug: "how-to-report-landlord",
    title: "How to Report Your Landlord: Step-by-Step Guide",
    metaDescription:
      "Step-by-step guide to reporting a landlord in the UK. Learn when to report, who to report to (council, ombudsman, police), what evidence you need, and how to use template letters.",
    publishDate: "2026-04-04",
    lastUpdated: "2026-04-04",
    readTime: 7,
    category: "Rights",
    sections: [
      {
        id: "when-to-report",
        heading: "When Should You Report Your Landlord?",
        content:
          "You should report your landlord if they are failing to meet their legal obligations. Common reasons include:\n\n- **Refusing to carry out repairs**: Especially to the structure, exterior, plumbing, heating, or electrical systems\n- **Damp and mould**: If reported and not addressed within the Awaab's Law timescales\n- **Unsafe conditions**: No gas safety certificate, no EICR, faulty smoke alarms, exposed wiring\n- **Harassment or illegal eviction**: Entering without permission, changing locks, threatening behaviour, disconnecting utilities\n- **Deposit not protected**: Failure to protect your deposit in a government-approved scheme within 30 days\n- **Unlicensed HMO**: Operating a house in multiple occupation without the required licence\n- **Retaliatory behaviour**: Increasing rent or issuing eviction threats because you complained about repairs\n- **Illegal fees**: Charging banned fees under the Tenant Fees Act 2019\n\nAlways try to resolve the issue directly with your landlord first by putting your complaint in writing. Keep copies of all correspondence. If they do not respond within a reasonable time (14 days for most issues), escalate to the relevant authority.",
      },
      {
        id: "who-to-report-to",
        heading: "Who to Report Your Landlord To",
        content:
          "Different issues should be reported to different organisations:\n\n**Local Council Environmental Health**\n\nFor: disrepair, damp and mould, unsafe conditions, hazards\n\nYour council's environmental health team can inspect the property, assess hazards using the Housing Health and Safety Rating System (HHSRS), and serve improvement notices requiring repairs. They can also issue civil penalties of up to £30,000 or prosecute.\n\nFind your council at gov.uk/find-local-council.\n\n**The Private Rented Sector Ombudsman**\n\nFor: poor landlord conduct, failure to carry out repairs, disputes not resolved directly\n\nUnder the Renters' Rights Act 2025, all private landlords must join the PRS Ombudsman. The ombudsman can investigate complaints, order remedies, and award compensation.\n\n**The Police**\n\nFor: illegal eviction, harassment, threatening behaviour, criminal damage to your belongings\n\nIllegal eviction and harassment are criminal offences under the Protection from Eviction Act 1977. Call 999 if you are in immediate danger, or 101 to report an incident.\n\n**Trading Standards**\n\nFor: illegal tenant fees, misleading property descriptions, unfair contract terms\n\n**The Property Ombudsman / Property Redress Scheme**\n\nFor: complaints about letting agents (not landlords directly). All agents must belong to one of these schemes.",
      },
      {
        id: "evidence-needed",
        heading: "What Evidence Do You Need?",
        content:
          "Strong evidence significantly increases the chances of a successful outcome. Gather:\n\n- **Written correspondence**: All emails, letters, and text messages between you and your landlord about the issue\n- **Photographs and videos**: Date-stamped images showing the problem. Take them regularly to show progression or deterioration.\n- **A written timeline**: Dates of when you reported the issue, any responses received, and any visits or inspections\n- **Witness statements**: If neighbours, visitors, or other tenants have witnessed the problem or your landlord's behaviour\n- **Medical evidence**: If the housing conditions have affected your health, ask your GP for a letter or report\n- **Receipts and invoices**: For any costs you have incurred as a result (replacement belongings, temporary accommodation, cleaning)\n- **Your tenancy agreement**: Including the deposit protection certificate and prescribed information\n- **Inspection reports**: Any surveys, gas safety certificates, EICRs, or EPC reports\n\nOrganise your evidence chronologically and keep copies of everything. Never hand over original documents.",
      },
      {
        id: "step-by-step-process",
        heading: "The Reporting Process: Step by Step",
        content:
          "Follow this process for the best outcome:\n\n**Step 1: Write to your landlord** (if you have not already)\n\nSend a formal written complaint describing the issue, referencing the relevant law, and stating what action you expect and by when. Use our [report issue tool](/report-issue) to generate a professional letter.\n\n**Step 2: Set a deadline**\n\nGive your landlord a reasonable deadline to respond (14 days for most issues, 7 days for urgent health and safety matters).\n\n**Step 3: Contact the relevant authority**\n\nIf the deadline passes without action, contact the appropriate authority (council, ombudsman, police, or trading standards).\n\n**Step 4: Request an inspection**\n\nFor disrepair or hazard issues, request a Housing Health and Safety Rating System (HHSRS) inspection from your council. This is free.\n\n**Step 5: Follow up**\n\nAuthorities can be slow. Follow up every 2 weeks if you have not heard back. Ask for a reference number and the name of the officer handling your case.\n\n**Step 6: Escalate if necessary**\n\nIf your council fails to act, you can complain to the Local Government Ombudsman. If the PRS Ombudsman's decision is unsatisfactory, you may have further options through the courts.",
      },
      {
        id: "timeline-expectations",
        heading: "How Long Does the Process Take?",
        content:
          "Timelines vary depending on the type of complaint and the authority handling it:\n\n- **Council environmental health inspection**: Usually within 2 to 4 weeks of your request\n- **Council improvement notice**: Served after inspection; gives the landlord 28 days (or less for urgent hazards) to complete repairs\n- **PRS Ombudsman complaint**: Typically resolved within 8 to 12 weeks\n- **Court proceedings**: If you take legal action for compensation, county court claims can take 3 to 6 months\n- **Police investigation**: For criminal matters like harassment or illegal eviction, timescales vary widely\n\n**What to do while you wait:**\n\n- Continue paying rent (stopping rent payments can weaken your position)\n- Continue documenting the issue\n- Take reasonable steps to mitigate health risks (ventilate, use dehumidifiers if you have them)\n- Contact Shelter (0808 800 4444) or Citizens Advice (0800 144 8848) for ongoing support and advice\n\nRemember that under the Renters' Rights Act 2025, your landlord cannot evict you in retaliation for making a complaint. If they try, this is grounds for a defence against eviction and potential criminal prosecution.",
      },
    ],
    faqs: [
      {
        question: "Can my landlord evict me for reporting them?",
        answer:
          "No. Under the Renters' Rights Act 2025, retaliatory eviction is illegal. Section 21 no-fault evictions have been abolished entirely. If your landlord tries to evict you after you have reported them, this can be used as a defence in court and may result in criminal prosecution of the landlord.",
      },
      {
        question: "Is reporting my landlord free?",
        answer:
          "Yes. Council environmental health inspections, the PRS Ombudsman, Trading Standards, and police reports are all free. If you pursue compensation through the county court, there is a court fee (starting from £35 for claims under £300), but you may be eligible for fee remission if you are on a low income.",
      },
      {
        question: "Can I report my landlord anonymously?",
        answer:
          "You can report concerns to your council anonymously, but anonymous complaints may be harder to investigate because the council may not be able to inspect the property without the tenant's cooperation. For ombudsman complaints and court proceedings, you will need to identify yourself.",
      },
      {
        question: "What if my landlord is also my employer?",
        answer:
          "If you live in tied accommodation (provided by your employer), your housing rights are more complex. You still have basic rights to safe, habitable conditions. Contact Shelter or Citizens Advice for specialist guidance on tied accommodation, as the eviction rules differ.",
      },
    ],
    relatedSlugs: [
      "tenant-rights-damp-mould-2026",
      "can-landlord-enter-without-permission",
      "hmo-rights-house-share",
    ],
  },
  {
    slug: "renting-rights-without-contract",
    title: "Your Rights as a Tenant Without a Written Contract",
    metaDescription:
      "No written tenancy agreement? You still have legal rights. Learn about verbal tenancy agreements, implied statutory terms, how to prove your tenancy, and what protections apply.",
    publishDate: "2026-04-04",
    lastUpdated: "2026-04-04",
    readTime: 7,
    category: "Rights",
    sections: [
      {
        id: "verbal-agreements-valid",
        heading: "Verbal Tenancy Agreements Are Legally Valid",
        content:
          "If you are paying rent to live in a property but never signed a written tenancy agreement, you still have a legally binding tenancy. In England, a tenancy does not need to be in writing to be valid.\n\nA verbal (or oral) tenancy agreement is created when:\n\n- You agreed to rent the property (even just by saying \"yes\" or nodding)\n- The landlord accepted you as a tenant\n- You are paying rent\n- You have exclusive possession of the property (your own space that the landlord cannot use)\n\nThe main difficulty with a verbal agreement is proving what was agreed. Without a written record, disputes about rent amounts, notice periods, or responsibilities become your word against your landlord's. This is why keeping records is so important, which we cover below.\n\nIf you have lived in the property for any period and paid rent, the law will generally recognise that a tenancy exists. The type of tenancy will depend on the circumstances, but in most cases you will have an **assured shorthold tenancy** (or, under the Renters' Rights Act 2025, a periodic tenancy).",
      },
      {
        id: "implied-statutory-terms",
        heading: "Implied Terms That Apply by Law",
        content:
          "Even without a written agreement, certain terms are implied into every tenancy by statute. Your landlord cannot opt out of these:\n\n**Landlord's repair obligations (Landlord and Tenant Act 1985, s.11)**\n\n- Keep the structure and exterior in repair (roof, walls, foundations, gutters, external pipes)\n- Keep installations for water, gas, electricity, sanitation, and heating in repair and working order\n- Keep communal areas in repair (in blocks of flats)\n\n**Deposit protection (Housing Act 2004)**\n\n- Protect your deposit in a government-approved scheme within 30 days\n- Provide prescribed information about the scheme\n- Failure to comply means they cannot evict you and you can claim 1-3x compensation\n\n**Gas, electrical, and fire safety**\n\n- Annual gas safety check and certificate\n- 5-yearly electrical inspection and report\n- Smoke alarms on every floor; carbon monoxide alarms where required\n\n**Right to quiet enjoyment**\n\n- The landlord cannot interfere with your peaceful use of the property\n- At least 24 hours notice before visiting\n\n**Fitness for habitation (Homes (Fitness for Human Habitation) Act 2018)**\n\n- The property must be fit to live in throughout the tenancy\n- If it is not, you can take your landlord to court\n\n**Protection from eviction (Protection from Eviction Act 1977)**\n\n- Your landlord cannot evict you without a court order\n- Harassment and illegal eviction are criminal offences\n\nThese rights apply regardless of what any written agreement says, and they certainly apply when there is no written agreement at all.",
      },
      {
        id: "what-you-are-entitled-to",
        heading: "What You Are Entitled To Without a Written Agreement",
        content:
          "Without a written contract, you are still entitled to:\n\n- **A habitable property**: Free from serious hazards, with working heating, hot water, and sanitation\n- **Deposit protection**: If you paid a deposit, it must be protected. If it was not, you can claim compensation.\n- **Proper eviction procedure**: Your landlord must obtain a court order to evict you. They cannot simply change the locks or ask you to leave.\n- **Reasonable notice**: If your landlord wants you to leave, they must give you proper notice. For a periodic tenancy (which is what most verbal agreements create), this is at least 2 months under the new rules.\n- **Repairs**: Your landlord is responsible for structural repairs, heating, plumbing, and electrical systems regardless of any agreement.\n- **Safety certificates**: Gas, electrical, and EPC certificates must be provided.\n- **The How to Rent guide**: Your landlord must give you the government's How to Rent booklet.\n\nThe main thing you lose without a written agreement is clarity. Disputes about what was agreed are harder to resolve. But your core statutory rights are identical to those of a tenant with a 50-page contract.",
      },
      {
        id: "proving-tenancy",
        heading: "How to Prove Your Tenancy Without Paperwork",
        content:
          "If you need to prove your tenancy exists (for example, to your council, a court, or for benefits), gather:\n\n- **Bank statements**: Showing regular rent payments to the landlord\n- **Rent receipts**: If your landlord gave you any\n- **Text messages, emails, or WhatsApp messages**: Any communication referencing you as a tenant, the rent amount, or the property\n- **Utility bills**: In your name at the property address\n- **Council tax records**: Showing you as the liable person at the address\n- **Electoral register**: If you registered to vote at the address\n- **Post**: Letters addressed to you at the property\n- **Witness statements**: From neighbours, friends, or family who can confirm you live there\n\nThe more evidence you have, the stronger your position. Even if you only have one or two of these, combined with the fact that you live at the property, it will usually be sufficient to establish that a tenancy exists.\n\nIf you are currently renting without a written agreement, ask your landlord to put the terms in writing. If they refuse, write a letter yourself setting out the terms as you understand them and send it to your landlord. If they do not dispute it, this becomes useful evidence of the agreed terms.",
      },
      {
        id: "getting-a-written-agreement",
        heading: "Should You Ask for a Written Agreement?",
        content:
          "Yes. While a verbal agreement is legally valid, a written agreement protects both parties. Here is why:\n\n- **Clarity**: Both sides know exactly what was agreed (rent, notice periods, responsibilities)\n- **Evidence**: If a dispute arises, a written document is much easier to enforce\n- **Benefits**: Some housing-related benefits require a written tenancy agreement\n- **Mortgage applications**: If you later need to prove your housing costs, a written agreement helps\n- **Deposit disputes**: The terms of the tenancy are relevant to deposit adjudication\n\nYour landlord is required to provide you with a written statement of the main terms of your tenancy if you request one. Under the Renters' Rights Act 2025, landlords must provide a written tenancy agreement for all new tenancies.\n\nIf your landlord refuses to provide a written agreement, this is a red flag. Consider contacting Citizens Advice or Shelter for guidance, and make sure to document all the terms you have agreed verbally through your own correspondence.",
      },
    ],
    faqs: [
      {
        question: "Do I have rights as a tenant without a contract?",
        answer:
          "Yes. A verbal tenancy agreement is legally valid in England. You have the same core statutory rights as any other tenant, including the right to a habitable property, deposit protection, protection from illegal eviction, and your landlord's obligation to carry out repairs. These rights are implied by law and cannot be overridden.",
      },
      {
        question: "Can my landlord evict me without a written tenancy agreement?",
        answer:
          "Your landlord cannot simply ask you to leave or change the locks. They must obtain a court order to evict you, regardless of whether there is a written agreement. Under the Renters' Rights Act 2025, all evictions must follow the proper legal process with grounds specified in the Act.",
      },
      {
        question: "Is my deposit protected if I do not have a written contract?",
        answer:
          "Your landlord is legally required to protect your deposit in a government-approved scheme within 30 days, whether or not there is a written agreement. If they failed to do so, you can claim compensation of 1 to 3 times the deposit amount through the county court.",
      },
      {
        question: "What type of tenancy do I have without a written agreement?",
        answer:
          "In most cases, you will have an assured shorthold tenancy (or, under the Renters' Rights Act 2025, a periodic assured tenancy). This gives you the standard statutory protections. The type depends on the circumstances, particularly whether you have exclusive possession of the property and pay rent.",
      },
    ],
    relatedSlugs: [
      "can-landlord-enter-without-permission",
      "how-to-get-deposit-back",
      "how-to-report-landlord",
    ],
  },
  {
    slug: "hmo-rights-house-share",
    title: "Living in a House Share? Your HMO Rights Explained",
    metaDescription:
      "Know your rights in a house share or HMO. Learn what makes a property an HMO, mandatory vs additional licensing, fire safety rules, minimum room sizes, and how to check if your HMO is licensed.",
    publishDate: "2026-04-04",
    lastUpdated: "2026-04-04",
    readTime: 8,
    category: "Safety",
    sections: [
      {
        id: "what-is-an-hmo",
        heading: "What Makes a Property an HMO?",
        content:
          "A **House in Multiple Occupation (HMO)** is a property rented out by at least 3 people who are not from one household (e.g. not a family) but share facilities such as a bathroom, kitchen, or toilet.\n\nA property is an HMO if:\n\n- It is rented to **3 or more tenants** who form **2 or more households**\n- The tenants share a kitchen, bathroom, or toilet\n- At least one tenant pays rent (or their employer pays rent on their behalf)\n\nExamples of HMOs:\n\n- A house shared by 3 friends, each paying rent individually\n- A property let as bedsits with shared kitchen and bathroom\n- A converted house with multiple studio flats sharing some facilities\n\nA property is **not** an HMO if:\n\n- It is occupied by a single family (even a large one)\n- It is a purpose-built block of self-contained flats (unless the block itself was converted)\n- The owner lives in the property with up to 2 lodgers\n\nUnder the **Housing Act 2004**, HMOs face additional regulations to protect tenants because shared housing carries higher risks for fire safety, overcrowding, and maintenance.",
      },
      {
        id: "mandatory-vs-additional",
        heading: "Mandatory vs Additional Licensing",
        content:
          "There are two types of HMO licensing in England:\n\n**Mandatory licensing**\n\nApplies to all HMOs with **5 or more tenants** forming **2 or more households**, regardless of the number of storeys. Since October 2018, there is no longer a requirement for the property to be 3 or more storeys.\n\nThe landlord must obtain a licence from the local council. The licence lasts up to 5 years and includes conditions about:\n\n- Maximum number of occupants\n- Minimum room sizes\n- Fire safety measures\n- Facilities (kitchens, bathrooms)\n- Property management standards\n\n**Additional licensing**\n\nMany councils operate additional licensing schemes that require landlords of smaller HMOs (3-4 tenants) to also obtain a licence. This varies by area. Some councils apply additional licensing borough-wide; others target specific wards or streets.\n\n**Selective licensing**\n\nSome councils require all privately rented properties (not just HMOs) in certain areas to be licensed. Check your council's website to see if selective licensing applies in your area.\n\nOperating an unlicensed HMO is a criminal offence. Landlords can face an **unlimited fine** on conviction, and tenants can apply for a **rent repayment order** to recover up to 12 months of rent.",
      },
      {
        id: "fire-safety-rights",
        heading: "Your Fire Safety Rights in an HMO",
        content:
          "HMOs must meet higher fire safety standards than single-occupancy rentals. Your landlord is legally required to provide:\n\n- **Fire doors**: On all rooms that open onto an escape route (hallways, landings, stairwells). Fire doors must be self-closing and in good condition.\n- **Smoke alarms**: Interlinked smoke detectors on every floor, tested regularly\n- **Fire blanket**: In the kitchen\n- **Fire extinguisher**: On each floor (required in some council licence conditions)\n- **Emergency lighting**: In communal hallways and stairwells where there is no natural light\n- **Clear escape routes**: Hallways and stairwells must be kept clear of obstructions at all times\n- **Fire safety signage**: Clear fire exit signs and evacuation instructions\n\nYour landlord must also carry out a **fire risk assessment** and review it regularly. You have the right to see this assessment.\n\nIf fire safety measures are missing or inadequate, report it to your local council's environmental health team and the fire service. This is a serious safety issue that should be addressed urgently.\n\nDo not block fire doors open or remove smoke alarm batteries. These measures exist to protect your life.",
      },
      {
        id: "room-sizes-facilities",
        heading: "Minimum Room Sizes and Facilities",
        content:
          "The **Licensing of Houses in Multiple Occupation (Mandatory Conditions of Licences) (England) Regulations 2018** set minimum room sizes for licensed HMOs:\n\n- **Single occupancy bedroom**: At least **6.51 square metres** (approximately 70 sq ft)\n- **Double occupancy bedroom**: At least **10.22 square metres** (approximately 110 sq ft)\n- **Children under 10**: At least **4.64 square metres** per child\n\nThese are absolute minimums. Any room below these sizes **cannot** be used as sleeping accommodation, and the number in the licence must not be exceeded.\n\nRegarding shared facilities, the licence conditions typically require:\n\n- **Kitchen**: Adequate cooking and food storage facilities for the number of occupants. Generally, 1 cooker, sink, and fridge per 5 tenants as a minimum.\n- **Bathrooms**: At least 1 bathroom (with toilet, wash basin, and bath or shower) per 5 tenants\n- **Washing facilities**: Adequate provision for laundry\n- **Waste disposal**: Sufficient bins for the number of occupants\n\nIf your bedroom is below the minimum size, your landlord is breaching their licence conditions. Report this to your council.",
      },
      {
        id: "check-hmo-licensed",
        heading: "How to Check If Your HMO Is Licensed",
        content:
          "Every council maintains a register of licensed HMOs. Here is how to check:\n\n- **Check your council's website**: Most councils have a searchable online register of licensed HMOs. Search by address or postcode.\n- **Contact the council directly**: If there is no online register, phone or email your council's private sector housing team and ask whether the property is licensed.\n- **Ask your landlord**: They should be able to show you a copy of the HMO licence, which must be displayed in the property.\n- **Use our landlord check tool**: Enter your postcode at our [landlord compliance checker](/landlord-check) to find out if your property requires a licence.\n\nIf the property should be licensed but is not:\n\n- Report it to your local council\n- You can apply for a **rent repayment order** to recover up to 12 months of rent\n- The landlord cannot serve a valid eviction notice while the property is unlicensed\n- The landlord faces an unlimited fine or civil penalty of up to £30,000\n\nLiving in an unlicensed HMO does not make your tenancy invalid. You still have all your normal tenancy rights, plus the additional remedies described above.",
      },
      {
        id: "your-rights-as-hmo-tenant",
        heading: "Additional Rights for HMO Tenants",
        content:
          "Beyond the standard tenant rights, HMO residents have extra protections:\n\n- **Landlord's name and address**: Must be displayed in the property in a visible common area\n- **Property management**: The landlord must keep communal areas clean, maintain the structure and exterior, and ensure all shared facilities are in working order\n- **Overcrowding**: The landlord must not allow more people to live in the property than the licence permits\n- **Anti-social behaviour**: The landlord has a duty to manage the property and address anti-social behaviour by other tenants\n- **Refuse and recycling**: Adequate provision must be made for waste disposal\n\n**Your responsibilities as an HMO tenant:**\n\n- Keep your room and shared areas reasonably clean and tidy\n- Do not damage fire safety equipment\n- Follow any reasonable house rules set by the landlord\n- Do not cause a nuisance to other residents\n- Report repairs and safety issues promptly\n\nIf you have concerns about the management of your HMO, raise them with your landlord in writing first. If they do not resolve the issue, contact your local council or use our [report issue tool](/report-issue) to generate a formal complaint letter.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my house share is an HMO?",
        answer:
          "If you rent a property with at least 3 people from 2 or more separate households and you share facilities like a kitchen or bathroom, it is an HMO. If there are 5 or more tenants from 2 or more households, it requires a mandatory licence regardless of the number of storeys.",
      },
      {
        question: "What happens if my HMO is not licensed?",
        answer:
          "Operating an unlicensed HMO is a criminal offence. The landlord can face an unlimited fine. As a tenant, you can apply for a rent repayment order to recover up to 12 months of rent. The landlord also cannot serve a valid eviction notice while the property remains unlicensed.",
      },
      {
        question: "Can my landlord charge me for communal cleaning in an HMO?",
        answer:
          "Under the Tenant Fees Act 2019, landlords cannot charge separate fees for cleaning communal areas. Maintaining communal areas is the landlord's responsibility under HMO management regulations. The cost should be factored into the rent, not charged as an additional fee.",
      },
      {
        question: "What is the minimum bedroom size in an HMO?",
        answer:
          "For licensed HMOs, a single bedroom must be at least 6.51 square metres (about 70 sq ft) and a double bedroom must be at least 10.22 square metres (about 110 sq ft). Any room below these sizes cannot be used as sleeping accommodation. If your room is too small, report it to your local council.",
      },
      {
        question: "Can I claim rent back if my HMO is unlicensed?",
        answer:
          "Yes. You can apply to the First-tier Tribunal for a rent repayment order covering up to 12 months of rent if your HMO requires a licence and the landlord has not obtained one. You do not need to wait for the landlord to be prosecuted; you can apply directly.",
      },
    ],
    relatedSlugs: [
      "what-to-check-before-renting",
      "tenant-rights-damp-mould-2026",
      "how-to-report-landlord",
    ],
  },
  // ---- Article 9: Can landlord keep deposit for cleaning ----
  {
    slug: "can-landlord-keep-deposit-for-cleaning",
    title: "Can My Landlord Keep My Deposit for Cleaning?",
    metaDescription:
      "Find out when landlords can and cannot deduct cleaning costs from your deposit. Covers fair wear and tear, professional cleaning clauses, and how to dispute deductions.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 6,
    category: "Rights",
    sections: [
      {
        id: "when-deductions-are-allowed",
        heading: "When Can a Landlord Deduct for Cleaning?",
        content:
          "Your landlord can only deduct cleaning costs from your deposit if the property is returned in a **worse condition** than it was at the start of your tenancy, beyond what counts as fair wear and tear.\n\nThe key principle is simple: you must return the property in the same standard of cleanliness as when you moved in. If you received the property after a professional clean, you should return it in a professionally cleaned state. If it was not professionally cleaned when you moved in, you only need to leave it in a reasonable, clean condition.\n\nUnder the **Housing Act 2004** and tenancy deposit protection rules, landlords must justify every deduction with evidence. They need to show:\n\n- The condition at check-in (usually via an inventory with photos)\n- The condition at check-out\n- That the difference goes beyond normal wear and tear\n- Actual costs incurred (receipts for cleaning).",
      },
      {
        id: "professional-cleaning-clauses",
        heading: "Are Professional Cleaning Clauses Enforceable?",
        content:
          "Many tenancy agreements include a clause requiring you to have the property professionally cleaned at the end of your tenancy. However, these clauses have limited enforceability.\n\nUnder the **Tenant Fees Act 2019**, landlords in England cannot charge fees beyond rent, a capped deposit, and a limited number of permitted payments. A mandatory professional cleaning fee that goes beyond restoring the property to its original condition could be considered a prohibited payment.\n\nThe critical test is whether professional cleaning was the standard when you moved in. If the inventory states \"professionally cleaned\" at the start, it is reasonable to expect the same at the end. If no professional clean was done before you moved in, the landlord cannot insist on one when you leave.\n\nThe **Consumer Rights Act 2015** also applies. Any contract term must be fair. A clause requiring professional cleaning regardless of the property's condition may be deemed an unfair term.",
      },
      {
        id: "fair-wear-and-tear-cleaning",
        heading: "Fair Wear and Tear vs. Cleaning Issues",
        content:
          "Fair wear and tear covers the natural deterioration of a property through normal everyday use. Your landlord cannot charge you for:\n\n- Light dust accumulation in hard-to-reach areas\n- Slight discolouration of grouting over time\n- Minor marks on kitchen surfaces from normal cooking\n- Faded or slightly worn areas in high-use zones\n- Small marks behind doors from normal opening and closing\n\nHowever, the following would typically justify a cleaning deduction:\n\n- Heavy grease build-up in the oven or on the hob\n- Mould caused by failure to ventilate (not structural damp)\n- Significant staining on carpets from spills\n- Lime scale build-up in bathrooms that could have been prevented\n- Food residue in cupboards or the fridge\n\nThe longer you have lived in the property, the more wear and tear is expected. A property lived in for three years will naturally show more signs of use than one occupied for six months.",
      },
      {
        id: "how-to-dispute-cleaning-deductions",
        heading: "How to Dispute Unfair Cleaning Deductions",
        content:
          "If your landlord proposes cleaning deductions you disagree with, follow these steps:\n\n- **Compare check-in and check-out evidence**: Your strongest defence is photographic evidence from the start and end of the tenancy.\n- **Respond in writing**: Set out clearly why you dispute each specific deduction. Be factual and reference the inventory.\n- **Challenge excessive costs**: If the landlord quotes £300 for an oven clean that costs £50 commercially, point this out with evidence of local rates.\n- **Use the deposit scheme dispute process**: If you cannot agree, either party can raise a dispute with the relevant scheme (DPS, MyDeposits, or TDS). The adjudicator will review evidence from both sides and make a binding decision.\n\nIn practice, landlords who claim large cleaning deductions without strong check-in evidence frequently lose at adjudication. The burden of proof is on the landlord.\n\nUse our [property check tool](/check) to document the condition of your property before you move in.",
      },
      {
        id: "end-of-tenancy-cleaning-tips",
        heading: "How to Protect Yourself: Practical Tips",
        content:
          "To maximise your chances of getting your full deposit back:\n\n- **Take photos at check-in**: Photograph every room, including close-ups of any existing marks, stains, or damage. Store them with date stamps.\n- **Keep the inventory**: Never sign an inventory you disagree with. Add notes about anything inaccurate.\n- **Clean thoroughly before check-out**: Focus on the oven, hob, bathroom tiles, windows, and carpets. These are the most common areas for deductions.\n- **Get a professional clean if the tenancy started with one**: Keep the receipt as proof.\n- **Attend the check-out inspection**: Challenge any observations you disagree with on the spot.\n\nIf your deposit was not protected in a government-approved scheme within 30 days, your landlord cannot make any deductions and you may be entitled to compensation of 1 to 3 times the deposit amount. Check whether your deposit is protected using our [deposit check guide](/blog/how-to-check-if-deposit-protected).",
      },
    ],
    faqs: [
      {
        question: "Can my landlord charge me for professional cleaning?",
        answer:
          "Only if the property was professionally cleaned before you moved in and this is documented in the inventory. Under the Tenant Fees Act 2019, landlords cannot impose cleaning charges that go beyond restoring the property to its check-in condition.",
      },
      {
        question: "What if there was no inventory at the start of my tenancy?",
        answer:
          "This works in your favour. Without a check-in inventory, the landlord has no baseline evidence to prove damage or cleaning issues were caused by you. Deposit scheme adjudicators typically side with the tenant when no inventory exists.",
      },
      {
        question: "How much can a landlord deduct for cleaning?",
        answer:
          "Any deduction must be reasonable and reflect actual costs. The landlord should provide receipts. You can challenge excessive charges by providing quotes from local cleaning companies for comparison.",
      },
      {
        question: "Can I dispute a cleaning deduction after agreeing to it?",
        answer:
          "If you signed a check-out report but later want to dispute it, you may still be able to raise a case with the deposit scheme. However, it is much harder once you have agreed in writing. Always challenge deductions you disagree with before signing.",
      },
    ],
    relatedSlugs: [
      "how-to-get-deposit-back",
      "how-to-check-if-deposit-protected",
      "can-landlord-charge-for-repairs",
      "what-to-check-before-renting",
    ],
  },
  // ---- Article 10: Can landlord evict me for no reason ----
  {
    slug: "can-landlord-evict-me-for-no-reason",
    title: "Can My Landlord Evict Me for No Reason in 2026?",
    metaDescription:
      "Section 21 no-fault evictions are abolished. Learn the new eviction rules under the Renters' Rights Act 2025, the valid grounds landlords can use, and how to challenge an unfair eviction.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 7,
    category: "Rights",
    sections: [
      {
        id: "section-21-abolished",
        heading: "Section 21 Is Now Abolished",
        content:
          "As of 2026, **Section 21 \"no-fault\" evictions have been abolished** across England under the **Renters' Rights Act 2025**. This was one of the most significant changes to private renting law in decades.\n\nPreviously, landlords could evict tenants with just two months' notice without giving any reason. This created enormous insecurity for the 11 million private renters in England. Many tenants were afraid to complain about repairs or challenge rent increases because they feared a retaliatory Section 21 notice.\n\nThe abolition means your landlord can **no longer evict you without a valid reason**. All evictions must now go through the **Section 8** process, which requires the landlord to prove specific grounds.",
      },
      {
        id: "valid-grounds-for-eviction",
        heading: "Valid Grounds for Eviction Under the New Rules",
        content:
          "Under the reformed Section 8 process, landlords can only evict tenants on specific grounds set out in **Schedule 2 of the Housing Act 1988** (as amended by the Renters' Rights Act 2025). The main grounds include:\n\n**Mandatory grounds (court must grant possession):**\n- **Ground 1**: The landlord wants to sell the property (4 months' notice, cannot be used in first 12 months)\n- **Ground 1A**: The landlord or a close family member wants to move in (4 months' notice, cannot be used in first 12 months)\n- **Ground 8**: Serious rent arrears of at least 2 months at notice and hearing date\n\n**Discretionary grounds (court decides if reasonable):**\n- **Ground 10**: Some rent arrears\n- **Ground 11**: Persistent late payment of rent\n- **Ground 12**: Breach of tenancy terms\n- **Ground 14**: Antisocial behaviour or criminal activity\n\nThe landlord must serve a Section 8 notice specifying the ground(s) relied upon, and if you do not leave, they must obtain a court order. The court process typically takes 6 to 14 weeks.",
      },
      {
        id: "retaliatory-eviction-protection",
        heading: "Protection Against Retaliatory Eviction",
        content:
          "The **Renters' Rights Act 2025** strengthened protection against retaliatory evictions. If you have raised a legitimate complaint about the condition of your property, your landlord cannot evict you as punishment.\n\nSpecifically:\n\n- If you have reported a hazard to the local council, the landlord cannot begin eviction proceedings for a set period\n- If the council has served an improvement notice or emergency remedial action notice, eviction is blocked until the issue is resolved\n- The court can refuse to grant possession if it believes the eviction is motivated by the tenant exercising their legal rights\n\nThis means you can report damp, disrepair, or safety issues without fear of losing your home. Use our [report issue tool](/report-issue) to generate a formal complaint letter to your landlord or council.\n\nIf you believe your landlord is attempting a retaliatory eviction, seek advice immediately from Shelter (0808 800 4444) or your local Citizens Advice.",
      },
      {
        id: "illegal-eviction",
        heading: "What Is an Illegal Eviction?",
        content:
          "An illegal eviction occurs when a landlord forces you out without following the proper legal process. This is a **criminal offence** under the **Protection from Eviction Act 1977**.\n\nExamples of illegal eviction include:\n\n- Changing the locks while you are out\n- Removing your belongings from the property\n- Cutting off utilities (gas, electricity, water)\n- Physically removing you or threatening violence\n- Telling you to leave immediately with no notice\n- Entering the property repeatedly to intimidate you into leaving\n\nIf your landlord does any of these things, you should:\n\n- **Call the police**: Illegal eviction is a criminal matter. Call 999 if you are in immediate danger or 101 for non-emergency reporting.\n- **Contact your council**: Local authority tenancy relations officers can intervene and potentially prosecute the landlord.\n- **Do not leave**: You have a legal right to remain in the property until a court order is obtained.\n- **Get legal advice**: Contact Shelter or Citizens Advice immediately. You may be entitled to an injunction to get back into the property and compensation for any losses.",
      },
      {
        id: "how-to-respond-to-eviction",
        heading: "What to Do If You Receive an Eviction Notice",
        content:
          "If your landlord serves you with a Section 8 notice:\n\n- **Check the notice carefully**: Is it on the correct form? Does it specify valid grounds? Is the notice period correct (varies by ground, typically 2 to 4 months)? An invalid notice can be challenged.\n- **Do not panic**: The notice is not an eviction. Your landlord must obtain a court order before you are required to leave.\n- **Seek advice early**: Contact Shelter, Citizens Advice, or a housing solicitor. Many local authorities offer free housing advice services.\n- **Gather evidence**: If you believe the ground is fabricated or the eviction is retaliatory, collect evidence to present to the court.\n- **Attend the court hearing**: If the case goes to court, attend the hearing. The court will consider whether the ground is proven and (for discretionary grounds) whether it is reasonable to grant possession.\n\nYou can check your property's compliance status using our [landlord check tool](/landlord-check) to see if your landlord has met all legal requirements. Non-compliant landlords may face restrictions on eviction proceedings.",
      },
    ],
    faqs: [
      {
        question: "Can my landlord evict me without a reason in 2026?",
        answer:
          "No. Section 21 no-fault evictions have been abolished under the Renters' Rights Act 2025. Your landlord must use the Section 8 process and prove a valid ground for eviction, such as wanting to sell the property, move in themselves, or that you have serious rent arrears.",
      },
      {
        question: "How much notice must my landlord give before evicting me?",
        answer:
          "The notice period depends on the ground. For sale or landlord occupation grounds, it is 4 months. For rent arrears (Ground 8), it is 4 weeks. For antisocial behaviour (Ground 14), notice can be served with immediate effect. Your landlord must then obtain a court order if you do not leave.",
      },
      {
        question: "Can my landlord evict me for complaining about repairs?",
        answer:
          "No. The Renters' Rights Act 2025 includes strong protections against retaliatory eviction. If you have reported a legitimate issue to the landlord or council, the court can refuse to grant possession if it believes the eviction is retaliatory.",
      },
      {
        question: "What should I do if my landlord changes the locks?",
        answer:
          "This is an illegal eviction and a criminal offence under the Protection from Eviction Act 1977. Call the police, contact your council's tenancy relations officer, and seek legal advice from Shelter (0808 800 4444). You have the right to be readmitted to the property.",
      },
    ],
    relatedSlugs: [
      "can-landlord-enter-without-permission",
      "how-to-report-landlord",
      "can-landlord-change-locks",
      "renting-rights-without-contract",
    ],
  },
  // ---- Article 11: Can landlord refuse pets ----
  {
    slug: "can-landlord-refuse-pets",
    title: "Can My Landlord Refuse Pets? New Rules for 2026",
    metaDescription:
      "The Renters' Rights Act 2025 gives tenants the right to request pets. Learn how to make a pet request, when landlords can refuse, and what insurance you may need.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 6,
    category: "Rights",
    sections: [
      {
        id: "new-pet-rules",
        heading: "The New Right to Request Pets",
        content:
          "The **Renters' Rights Act 2025** introduced a significant change for pet owners: tenants now have the **right to request permission to keep a pet**, and landlords **cannot unreasonably refuse**.\n\nPreviously, most tenancy agreements included blanket \"no pets\" clauses, and landlords could refuse without giving any reason. Under the new rules:\n\n- You can make a written request to your landlord to keep a pet\n- The landlord must respond within **42 days** (6 weeks)\n- If the landlord does not respond within 42 days, consent is **deemed to have been given**\n- The landlord can only refuse on **reasonable grounds**\n- If refused, the landlord must give written reasons\n\nThis applies to all assured tenancies in England, which covers the vast majority of private renters.",
      },
      {
        id: "reasonable-refusal",
        heading: "When Can a Landlord Reasonably Refuse?",
        content:
          "The legislation does not define \"reasonable\" exhaustively, but guidance from the government suggests landlords may reasonably refuse in situations such as:\n\n- The property is a small flat with no outdoor space and the pet is a large dog\n- The building's head lease or freehold covenants prohibit pets (e.g. in a block of flats)\n- The pet would cause a genuine health or safety risk (e.g. venomous animals)\n- The property is specifically adapted for someone with allergies (supported housing)\n\nHowever, landlords **cannot** refuse simply because:\n\n- They prefer not to have pets in the property\n- They are worried about potential damage (this is what pet insurance is for)\n- Previous tenants had issues with pets\n- The tenancy agreement says \"no pets\" (blanket bans are overridden by the new legislation)\n\nIf you believe the refusal is unreasonable, you can raise the matter with the **Private Rented Sector Ombudsman** (created under the Renters' Rights Act 2025) or apply to the county court.",
      },
      {
        id: "pet-insurance-requirement",
        heading: "Pet Damage Insurance",
        content:
          "Under the Renters' Rights Act 2025, landlords can require you to take out **pet damage insurance** as a condition of granting permission. This is separate from your deposit.\n\nThe insurance covers damage caused by your pet to the property, giving the landlord financial protection without needing to increase the deposit (which is capped at 5 weeks' rent under the Tenant Fees Act 2019).\n\nKey points about pet insurance requirements:\n\n- The landlord can specify a reasonable level of cover\n- You choose the insurance provider and policy\n- The landlord should be named as an interested party on the policy\n- You must keep the policy active for the duration of your tenancy\n- Premiums typically range from £5 to £20 per month depending on the pet and property\n\nKeep your insurance documents safe and provide a copy to your landlord when requested.",
      },
      {
        id: "how-to-make-pet-request",
        heading: "How to Make a Pet Request: Step by Step",
        content:
          "To give yourself the best chance of a successful pet request:\n\n- **Put it in writing**: Send a formal letter or email to your landlord. Keep a copy and note the date sent.\n- **Be specific**: State the type of pet, breed (if applicable), size, and age. A request for a \"small, house-trained cat\" is stronger than just \"a pet.\"\n- **Offer reassurances**: Mention that you will take out pet damage insurance, keep the property clean, and ensure the pet does not cause disturbance to neighbours.\n- **Reference the legislation**: Mention the Renters' Rights Act 2025 and the requirement for consent not to be unreasonably withheld.\n- **Set a deadline**: Remind the landlord they have 42 days to respond, and that failure to respond counts as consent.\n\nIf your landlord does not respond within 42 days, keep evidence of when you sent the request. You can then proceed on the basis that consent has been granted.\n\nUse our [report issue tool](/report-issue) to generate a formal pet request letter.",
      },
    ],
    faqs: [
      {
        question: "Can my landlord refuse to let me have a pet in 2026?",
        answer:
          "Your landlord can only refuse on reasonable grounds under the Renters' Rights Act 2025. They must respond to your written request within 42 days. If they do not respond, consent is deemed to have been given. Blanket 'no pets' clauses in tenancy agreements are overridden by the new rules.",
      },
      {
        question: "Do I need pet insurance for a rented property?",
        answer:
          "Your landlord can require you to take out pet damage insurance as a condition of granting consent. This covers any damage your pet causes to the property. Premiums typically range from £5 to £20 per month.",
      },
      {
        question: "What if my tenancy agreement says no pets?",
        answer:
          "Blanket 'no pets' clauses are overridden by the Renters' Rights Act 2025. You have the right to make a request, and the landlord can only refuse on reasonable grounds. The clause in your agreement does not automatically prevent you from having a pet.",
      },
      {
        question: "Can my landlord evict me for having a pet?",
        answer:
          "If you followed the correct request process and your landlord consented (or failed to respond within 42 days), they cannot evict you for having the pet. If you got a pet without making a request, the landlord could potentially use Ground 12 (breach of tenancy terms), but this is a discretionary ground and the court would consider all circumstances.",
      },
    ],
    relatedSlugs: [
      "can-landlord-enter-without-permission",
      "can-landlord-keep-deposit-for-cleaning",
      "can-landlord-evict-me-for-no-reason",
      "renting-rights-without-contract",
    ],
  },
  // ---- Article 12: Can landlord charge for repairs ----
  {
    slug: "can-landlord-charge-for-repairs",
    title: "Can My Landlord Charge Me for Repairs?",
    metaDescription:
      "Know when your landlord is responsible for repairs and when you might have to pay. Covers Section 11, structural repairs, tenant damage, and the Homes (Fitness for Human Habitation) Act.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 6,
    category: "Rights",
    sections: [
      {
        id: "landlord-repair-obligations",
        heading: "What Your Landlord Must Repair (Section 11)",
        content:
          "Under **Section 11 of the Landlord and Tenant Act 1985**, your landlord is legally responsible for repairing and maintaining:\n\n- The **structure and exterior** of the property (walls, roof, foundations, external doors, windows, drains, gutters)\n- **Water, gas, and electricity supply** installations\n- **Heating and hot water** systems (boilers, radiators, pipes)\n- **Sanitary installations** (baths, sinks, toilets, basins)\n\nThis obligation applies regardless of what your tenancy agreement says. Even if your contract states that certain repairs are your responsibility, Section 11 overrides any clause that tries to transfer these obligations to the tenant.\n\nThe **Homes (Fitness for Human Habitation) Act 2018** added a further requirement: the property must be fit for human habitation throughout the tenancy. If it is not, you can take your landlord to court without waiting for the council to intervene.",
      },
      {
        id: "when-tenant-pays",
        heading: "When You Might Be Responsible for Repair Costs",
        content:
          "There are situations where you may be liable for repair costs:\n\n- **Damage you caused**: If you or your guests caused the damage (e.g. a smashed window, a hole in a wall, a blocked drain from inappropriate items), you are responsible for putting it right.\n- **Tenant fixtures**: Items you installed yourself (shelving, curtain rails) are your responsibility.\n- **Minor maintenance**: Changing lightbulbs, replacing smoke alarm batteries, and keeping the property clean are typically tenant responsibilities.\n- **Garden maintenance**: Unless your tenancy agreement says otherwise, you are usually responsible for basic garden upkeep.\n\nHowever, your landlord **cannot** charge you for:\n\n- Repairs caused by normal wear and tear\n- Pre-existing issues that were present when you moved in\n- Problems caused by structural defects (e.g. damp caused by a leaking roof)\n- Repairs to items the landlord is obligated to maintain under Section 11\n- Appliances that broke through normal use (unless they belong to you)",
      },
      {
        id: "challenging-repair-charges",
        heading: "How to Challenge Unfair Repair Charges",
        content:
          "If your landlord is trying to charge you for repairs you believe are their responsibility:\n\n- **Check your tenancy agreement**: While Section 11 sets the minimum, your agreement may give you additional rights.\n- **Put your response in writing**: Clearly state which repairs are the landlord's responsibility under Section 11 and the Homes Act 2018.\n- **Document the issue**: Take photos, keep records of when you reported the problem, and save all correspondence.\n- **Report to the council**: If the landlord refuses to carry out essential repairs, contact your local council's environmental health team. They can inspect the property and serve improvement notices.\n- **Use the Ombudsman**: Under the Renters' Rights Act 2025, the new Private Rented Sector Ombudsman can investigate complaints about landlord behaviour, including refusal to carry out repairs.\n\nUse our [damp check tool](/damp-check) to assess damp and mould risk, or our [report issue tool](/report-issue) to generate a formal repair request letter.",
      },
      {
        id: "deducting-from-deposit",
        heading: "Can Repair Costs Come Out of Your Deposit?",
        content:
          "At the end of your tenancy, your landlord may try to deduct repair costs from your deposit. They can only do this for damage beyond fair wear and tear that you (or your guests) caused.\n\nThe landlord must:\n\n- Provide evidence of the damage (check-in and check-out reports, photos)\n- Show that you caused the damage (not pre-existing or structural)\n- Provide receipts or quotes for the actual repair cost\n- Apply betterment: they cannot charge for brand new replacements of old items\n\nIf you disagree with the deductions, use the free dispute resolution service provided by the deposit protection scheme (DPS, MyDeposits, or TDS). The adjudicator's decision is binding.\n\nNever accept deductions you disagree with without challenging them. Many landlords make speculative deductions expecting tenants not to dispute them.",
      },
    ],
    faqs: [
      {
        question: "Is my landlord responsible for boiler repairs?",
        answer:
          "Yes. Under Section 11 of the Landlord and Tenant Act 1985, your landlord must maintain heating and hot water systems, including the boiler. They cannot charge you for boiler repairs unless you caused the damage.",
      },
      {
        question: "Can my landlord charge me for a blocked drain?",
        answer:
          "It depends on the cause. If the blockage is in the main drainage system, it is the landlord's responsibility. If you caused the blockage (e.g. by putting inappropriate items down the drain), you may be liable for the cost.",
      },
      {
        question: "What if my landlord refuses to do repairs?",
        answer:
          "Report the issue to your local council's environmental health team. They can inspect the property and serve an improvement notice. You can also take your landlord to court under the Homes (Fitness for Human Habitation) Act 2018, or complain to the Private Rented Sector Ombudsman.",
      },
    ],
    relatedSlugs: [
      "tenant-rights-damp-mould-2026",
      "how-to-report-landlord",
      "can-landlord-keep-deposit-for-cleaning",
      "how-to-get-deposit-back",
    ],
  },
  // ---- Article 13: Can landlord increase rent during fixed term ----
  {
    slug: "can-landlord-increase-rent-during-fixed-term",
    title: "Can My Landlord Increase Rent During a Fixed Term?",
    metaDescription:
      "Your landlord generally cannot increase rent mid-tenancy without a rent review clause. Learn about fixed-term protections, the Section 13 process, and how the Renters' Rights Act changes things.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 5,
    category: "Money",
    sections: [
      {
        id: "fixed-term-protection",
        heading: "Rent During a Fixed-Term Tenancy",
        content:
          "If you are on a **fixed-term tenancy** (e.g. a 12-month contract), your landlord generally **cannot increase your rent** during the fixed term unless there is a specific **rent review clause** in your tenancy agreement.\n\nThis has been a longstanding principle of tenancy law. A fixed-term tenancy is a contract for a set period, and the rent is one of the agreed terms. Changing it mid-contract without a clause permitting this would be a breach of contract.\n\nHowever, the **Renters' Rights Act 2025** has changed the landscape significantly. Fixed-term tenancies are being phased out in favour of periodic (rolling) tenancies. All new tenancies created after the Act's commencement are periodic from day one. Existing fixed-term tenancies will convert to periodic tenancies when their fixed term ends.\n\nFor tenants still on existing fixed-term contracts, the original terms continue to apply until the fixed term expires.",
      },
      {
        id: "rent-review-clauses",
        heading: "What If There Is a Rent Review Clause?",
        content:
          "Some fixed-term tenancy agreements include a rent review clause allowing the landlord to increase rent during the term. Under the **Renters' Rights Act 2025**, these clauses are **no longer valid** for new tenancies.\n\nFor existing tenancies with a rent review clause, the clause may still apply until the fixed term ends. However, any increase under a rent review clause must still be to a **market rent level** and the landlord should give reasonable notice.\n\nIf you are on an older tenancy with a rent review clause:\n\n- Check whether the clause specifies a formula (e.g. CPI + 1%) or allows any increase\n- The clause must be clear and unambiguous to be enforceable\n- Under the Consumer Rights Act 2015, a term that allows the landlord to increase rent without limit may be deemed unfair\n- You can challenge an unreasonable increase even if the clause technically allows it\n\nUse our [fair rent tool](/fair-rent) to check whether a proposed increase is in line with local market rates.",
      },
      {
        id: "after-fixed-term-ends",
        heading: "What Happens When Your Fixed Term Ends?",
        content:
          "When your fixed-term tenancy ends, it automatically becomes a **periodic tenancy** (rolling month-to-month or week-to-week). Under the Renters' Rights Act 2025, all tenancies are now periodic.\n\nOnce you are on a periodic tenancy, your landlord can increase your rent using the **Section 13 process**:\n\n- They must give you **at least two months' notice** using the prescribed form\n- The increase can only take effect **once per 12 months**\n- The proposed rent must reflect the **open market rate**\n- You can challenge the increase at a **First-tier Tribunal** (free to apply)\n\nImportantly, the tribunal can now only set the rent at or below the amount the landlord proposed, not higher. This change removed the previous risk that discouraged tenants from challenging increases.\n\nIf you are approaching the end of a fixed term, consider checking local rents to prepare for any potential increase. Our [fair rent tool](/fair-rent) can help.",
      },
      {
        id: "agreeing-to-increase",
        heading: "Can You Agree to a Mid-Tenancy Increase?",
        content:
          "You and your landlord can mutually agree to change the rent at any time, including during a fixed term. However, this must be a genuine agreement, not something imposed.\n\nIf your landlord asks you to agree to a rent increase mid-tenancy:\n\n- You are under **no obligation** to agree\n- The increase cannot be a condition of the tenancy continuing (that would effectively be a threat of eviction)\n- If you do agree, get the new amount confirmed in writing and ensure both parties sign\n- Under the Renters' Rights Act 2025, your landlord cannot evict you for refusing to agree to a mid-term increase\n\nBe cautious about agreeing to increases outside the Section 13 process. If you agree informally and later dispute it, proving the agreement existed can be difficult.",
      },
    ],
    faqs: [
      {
        question: "Can my landlord raise rent during a 12-month tenancy?",
        answer:
          "Generally no, unless there is a rent review clause in your agreement. Under the Renters' Rights Act 2025, rent review clauses are no longer valid for new tenancies. All increases must use the Section 13 process with at least two months' notice.",
      },
      {
        question: "What if I agreed to a rent increase but it was not through Section 13?",
        answer:
          "A mutual agreement to change the rent is valid, but it must be genuinely voluntary. If you felt pressured or threatened with eviction, the agreement may not be enforceable. Seek advice from Shelter or Citizens Advice.",
      },
      {
        question: "How often can rent go up on a periodic tenancy?",
        answer:
          "Once every 12 months. Your landlord must use the Section 13 notice process and give at least two months' written notice. The proposed increase must reflect market rates.",
      },
    ],
    relatedSlugs: [
      "can-landlord-increase-rent",
      "how-to-negotiate-rent-reduction",
      "average-cost-renting-uk-2026",
      "renting-vs-buying-uk-2026",
    ],
  },
  // ---- Article 14: Can landlord make me pay for decorating ----
  {
    slug: "can-landlord-make-me-pay-for-decorating",
    title: "Can My Landlord Make Me Pay for Decorating?",
    metaDescription:
      "Find out whether your landlord can charge you for repainting or redecorating at the end of your tenancy. Covers fair wear and tear, betterment, and how to protect your deposit.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 5,
    category: "Rights",
    sections: [
      {
        id: "decorating-responsibilities",
        heading: "Who Is Responsible for Decorating?",
        content:
          "In most private tenancies, **decorating is the landlord's responsibility** unless your tenancy agreement specifically states otherwise. Under **Section 11 of the Landlord and Tenant Act 1985**, the landlord must maintain the structure and exterior of the property, but internal decoration is not explicitly covered by Section 11.\n\nHowever, the **Homes (Fitness for Human Habitation) Act 2018** requires the property to be fit for habitation throughout the tenancy. If peeling paint, damp-stained walls, or severely deteriorated decoration makes the property unfit, the landlord has a duty to address it.\n\nIn practice, most tenancy agreements say the tenant must not redecorate without the landlord's written consent and must return the property in its original decorative condition. This does not mean you have to repaint at the end of every tenancy; it means you should not cause damage beyond fair wear and tear.",
      },
      {
        id: "fair-wear-tear-decorating",
        heading: "Fair Wear and Tear: What Counts?",
        content:
          "Your landlord cannot charge you for the natural ageing of decoration. Fair wear and tear for decorating includes:\n\n- **Paint fading** or yellowing over time (especially in sunny rooms)\n- **Small scuffs** around door handles, light switches, and skirting boards\n- **Pin holes** from hanging pictures (a few small holes are generally accepted)\n- **Slight marks** on walls from furniture placement\n\nWhat might justify a deduction:\n\n- **Large holes** in walls from shelving or TV brackets without consent\n- **Crayon, marker, or pen marks** on walls\n- **Significant staining** (e.g. nicotine staining from smoking indoors)\n- **Painting walls a different colour** without permission\n- **Wallpaper removal or damage**\n\nThe longer you have lived in the property, the more wear is expected. A landlord cannot charge the full cost of repainting a room that was last decorated five years ago; they must apply a **betterment** reduction to account for the age and condition of the existing decoration.",
      },
      {
        id: "betterment-explained",
        heading: "The Betterment Principle",
        content:
          "Betterment is a critical concept when challenging decorating deductions. The principle is that the landlord should not profit from your deposit by getting a brand-new decoration paid for by you when the existing decoration was already old.\n\nFor example:\n\n- If the walls were last painted 4 years ago and the expected lifespan of internal paint is 5 years, the paint was already 80% through its useful life when you moved out\n- Even if you caused some damage, the landlord can only charge you for the remaining 20% of the value\n- The landlord should provide evidence of the original decoration date and the cost of redecoration\n\nDeposit scheme adjudicators consistently apply betterment in their decisions. If your landlord claims the full cost of redecorating a room that was already due for redecoration, challenge this through the deposit scheme's dispute resolution process.",
      },
      {
        id: "protecting-yourself",
        heading: "How to Protect Yourself",
        content:
          "To avoid decorating disputes at the end of your tenancy:\n\n- **Document the condition at check-in**: Take close-up photos of walls, ceilings, and any existing marks or damage.\n- **Get permission for changes**: If you want to paint, hang shelves, or make other changes, get written consent from your landlord first.\n- **Restore to original**: If you painted walls a different colour, consider repainting to the original shade before moving out.\n- **Fill small holes**: Use filler to patch any nail or screw holes before the check-out inspection.\n- **Keep the inventory**: This is your primary evidence for disputing unfair charges.\n\nUse our [property check tool](/check) to document the condition of a property before you commit to renting it.",
      },
    ],
    faqs: [
      {
        question: "Can my landlord charge me for repainting at the end of the tenancy?",
        answer:
          "Only if you caused damage beyond fair wear and tear. Normal fading, minor scuffs, and small pin holes are wear and tear. If you painted walls a different colour without permission or caused significant damage, the landlord can deduct a proportionate amount after applying betterment.",
      },
      {
        question: "Can I paint my rented property?",
        answer:
          "Check your tenancy agreement. Most require written consent from the landlord before making decorative changes. If you paint without permission, the landlord can charge you for restoring the original colour. Always get agreement in writing before making changes.",
      },
      {
        question: "What is betterment in deposit deductions?",
        answer:
          "Betterment means the landlord cannot profit from your deposit by claiming the full cost of new decoration when the existing decoration was already old. The deduction must be proportionate to the remaining useful life of the item at the time of damage.",
      },
    ],
    relatedSlugs: [
      "can-landlord-keep-deposit-for-cleaning",
      "how-to-get-deposit-back",
      "can-landlord-charge-for-repairs",
      "what-to-check-before-renting",
    ],
  },
  // ---- Article 15: Can landlord stop me having visitors ----
  {
    slug: "can-landlord-stop-me-having-visitors",
    title: "Can My Landlord Stop Me Having Overnight Visitors?",
    metaDescription:
      "Your landlord cannot restrict who visits your home. Learn about your right to quiet enjoyment, the difference between visitors and occupiers, and what to do if your landlord interferes.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 5,
    category: "Rights",
    sections: [
      {
        id: "right-to-visitors",
        heading: "Your Right to Have Visitors",
        content:
          "Your landlord **cannot** prevent you from having visitors, including overnight guests. This is protected by your right to **quiet enjoyment**, which is an implied term in every tenancy.\n\nThe right to quiet enjoyment means you can use your rented home as your own private space. This includes having friends, family, and partners visit and stay overnight. Your landlord has no say over who enters your home as a guest.\n\nSome tenancy agreements include clauses restricting overnight guests or requiring you to notify the landlord. These clauses are generally **unenforceable** because they conflict with your fundamental right to quiet enjoyment and may be considered unfair terms under the **Consumer Rights Act 2015**.\n\nThe only exception is in HMOs (houses in multiple occupation) where fire safety regulations may limit the number of people who can sleep in the property overnight due to fire escape capacity.",
      },
      {
        id: "visitors-vs-occupiers",
        heading: "Visitors vs. Additional Occupiers",
        content:
          "There is an important legal distinction between a **visitor** and an **occupier**:\n\n- A **visitor** is someone who stays temporarily, whether for a night, a weekend, or a few weeks. They do not pay rent and their main home is elsewhere.\n- An **occupier** is someone who effectively lives in the property as their main residence, contributes to household costs, and receives post there.\n\nIf a guest stays so frequently that they effectively live in the property, they could be considered an additional occupier. This matters because:\n\n- Your tenancy agreement may require you to notify the landlord of additional occupiers\n- Additional occupiers can affect council tax (e.g. losing a single-person discount)\n- In HMOs, additional occupiers may affect the property's licensing requirements\n- The property insurance may be affected\n\nAs a general guide, someone staying 3 to 4 nights per week on an ongoing basis could be considered an occupier rather than a visitor.",
      },
      {
        id: "what-to-do-if-restricted",
        heading: "What to Do If Your Landlord Interferes",
        content:
          "If your landlord is trying to restrict your visitors or monitoring who comes and goes:\n\n- **Know your rights**: Write to your landlord explaining that you have a right to quiet enjoyment and that restricting visitors is a breach of this right.\n- **Document interference**: Keep a record of any messages, calls, or incidents where your landlord tries to control your visitors.\n- **Report harassment**: If the behaviour is persistent or intimidating, report it to your local council's tenancy relations team. Landlord harassment is a criminal offence under the Protection from Eviction Act 1977.\n- **Seek advice**: Contact Shelter (0808 800 4444) or Citizens Advice if the situation escalates.\n\nInstalling cameras that monitor your front door or communal areas without your consent may breach data protection law (GDPR and the Data Protection Act 2018). If your landlord has installed such cameras, you can complain to the Information Commissioner's Office.\n\nUse our [report issue tool](/report-issue) to generate a formal letter asserting your rights.",
      },
    ],
    faqs: [
      {
        question: "Can my landlord limit how often my partner stays over?",
        answer:
          "No. Your landlord cannot restrict visitors, including partners. However, if your partner effectively moves in and lives there as their main residence, they become an additional occupier. You may need to notify your landlord, but they cannot refuse reasonable arrangements.",
      },
      {
        question: "Can my landlord install cameras to monitor visitors?",
        answer:
          "No. Installing cameras that monitor your private entrance or the approach to your home without your consent is likely a breach of your right to quiet enjoyment and may violate data protection law. You can complain to the Information Commissioner's Office and your local council.",
      },
      {
        question: "Does my tenancy agreement 'no visitors' clause apply?",
        answer:
          "Clauses restricting visitors are generally unenforceable because they conflict with your right to quiet enjoyment and may be considered unfair under the Consumer Rights Act 2015. Your landlord cannot override this fundamental tenancy right through a contract clause.",
      },
    ],
    relatedSlugs: [
      "can-landlord-enter-without-permission",
      "renting-rights-without-contract",
      "can-landlord-evict-me-for-no-reason",
      "hmo-rights-house-share",
    ],
  },
  // ---- Article 16: Can landlord change locks ----
  {
    slug: "can-landlord-change-locks",
    title: "Can My Landlord Change the Locks? Illegal Eviction Explained",
    metaDescription:
      "Changing locks to keep you out is illegal eviction. Learn about the Protection from Eviction Act 1977, your rights, what to do if locked out, and how to get back into your home.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 6,
    category: "Rights",
    sections: [
      {
        id: "is-it-legal",
        heading: "Can Your Landlord Change the Locks?",
        content:
          "If your landlord changes the locks to prevent you from entering your home, this is **illegal eviction**. It is a criminal offence under the **Protection from Eviction Act 1977**, punishable by an unlimited fine and up to two years in prison.\n\nThis applies regardless of:\n\n- Whether you owe rent\n- Whether your tenancy has ended\n- Whether you have broken tenancy terms\n- Whether the landlord owns the property outright\n- Whether you have a written tenancy agreement or not\n\nThe only lawful way to remove a tenant from a property is through a **court order**. Even after obtaining a court order, only **county court bailiffs** (or High Court enforcement officers) can carry out the physical eviction. The landlord cannot do it themselves.\n\nChanging locks while you are out and refusing to give you a new key is just as illegal as physically removing you from the property.",
      },
      {
        id: "what-to-do-locked-out",
        heading: "What to Do If You Are Locked Out",
        content:
          "If your landlord has changed the locks and you cannot get into your home:\n\n- **Call the police**: Dial 101 (non-emergency) or 999 if you feel threatened. Explain that you have been illegally evicted. The police can ask the landlord to give you access.\n- **Contact your council immediately**: Call your local council's housing team or tenancy relations officer. Many councils have an emergency out-of-hours number for illegal evictions. Council officers can visit the property and demand the landlord provides access.\n- **Do not break in**: While you have a legal right to be in the property, breaking in could complicate matters. Let the police or council handle re-entry.\n- **Get emergency legal advice**: Call Shelter (0808 800 4444), the Housing Loss Prevention Advice Service, or a local law centre. In urgent cases, a solicitor can apply for an **emergency injunction** from the county court, sometimes on the same day.\n- **Document everything**: Take photos of the changed locks, keep copies of texts or messages from the landlord, and note the exact date and time you were locked out.",
      },
      {
        id: "compensation-for-illegal-eviction",
        heading: "Claiming Compensation",
        content:
          "If you have been illegally evicted, you may be entitled to significant compensation:\n\n- **Civil claim for damages**: You can sue your landlord in the county court for breach of covenant (quiet enjoyment), trespass, and any losses suffered. This can include:\n  - The cost of alternative accommodation (hotel, staying with friends)\n  - Replacement of personal belongings if you could not access them\n  - Compensation for distress and inconvenience\n  - Lost wages if you missed work\n\n- **Rent repayment order**: If the property required a licence (e.g. HMO licence, selective licence) and the landlord did not have one, you can apply for a rent repayment order of up to 12 months' rent.\n\n- **Criminal prosecution**: The council can prosecute the landlord. If convicted, the court can award compensation to you as part of the criminal proceedings.\n\nCompensation awards for illegal eviction in the county court typically range from £1,000 to £25,000 depending on the severity and duration of the eviction.",
      },
      {
        id: "can-tenant-change-locks",
        heading: "Can You Change the Locks as a Tenant?",
        content:
          "As a tenant, you are generally entitled to change the locks on your rented property, provided you:\n\n- Give a copy of the new key to your landlord\n- Restore the original locks when you move out (or hand over all keys to the new locks)\n\nThere is no specific law preventing tenants from changing locks. Some tenancy agreements prohibit it, but such clauses may be considered unfair under the **Consumer Rights Act 2015**, especially if you are changing locks due to safety concerns (e.g. after a break-in or domestic abuse situation).\n\nIf your landlord is harassing you or entering without permission, changing the locks is a practical step to protect your safety. You must still provide a key, but this ensures the landlord cannot enter unannounced.\n\nUse our [landlord check tool](/landlord-check) to verify your landlord's compliance with legal requirements.",
      },
    ],
    faqs: [
      {
        question: "Is it illegal for my landlord to change the locks?",
        answer:
          "Yes. Changing the locks to prevent you from entering your home is illegal eviction under the Protection from Eviction Act 1977. It is a criminal offence punishable by an unlimited fine and up to two years in prison. This applies even if you owe rent or have broken tenancy terms.",
      },
      {
        question: "What should I do if my landlord locks me out?",
        answer:
          "Call the police on 101 and your council's housing team immediately. Do not break in. Get emergency legal advice from Shelter (0808 800 4444). A solicitor can apply for an emergency injunction to get you back into the property, sometimes on the same day.",
      },
      {
        question: "Can I claim compensation for being illegally evicted?",
        answer:
          "Yes. You can sue your landlord for breach of quiet enjoyment, trespass, and losses including alternative accommodation costs, distress, and lost wages. Awards typically range from £1,000 to £25,000. You may also be entitled to a rent repayment order of up to 12 months' rent.",
      },
      {
        question: "Can I change the locks on my rental to keep my landlord out?",
        answer:
          "Generally yes, provided you give a copy of the new key to your landlord and restore the original locks when you leave. This is a practical step if your landlord is entering without permission. Any tenancy clause prohibiting lock changes may be considered unfair under the Consumer Rights Act 2015.",
      },
    ],
    relatedSlugs: [
      "can-landlord-enter-without-permission",
      "can-landlord-evict-me-for-no-reason",
      "how-to-report-landlord",
      "renting-rights-without-contract",
    ],
  },
  // ---- Article 17: How to check if deposit protected ----
  {
    slug: "how-to-check-if-deposit-protected",
    title: "How to Check if Your Deposit is Protected (3 Minute Check)",
    metaDescription:
      "Check all three deposit protection schemes in minutes. Step-by-step guide to DPS, MyDeposits, and TDS lookups, plus what to do if your deposit is not protected.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 5,
    category: "Guides",
    sections: [
      {
        id: "the-three-schemes",
        heading: "The Three Government-Approved Deposit Schemes",
        content:
          "In England, all tenancy deposits must be protected in one of three **government-approved schemes** within **30 days** of the landlord receiving the money. The three schemes are:\n\n- **Deposit Protection Service (DPS)** at depositprotection.com: A custodial scheme where the DPS holds the actual money.\n- **MyDeposits** at mydeposits.co.uk: Offers both custodial (they hold the money) and insurance (landlord holds the money, scheme provides insurance) options.\n- **Tenancy Deposit Scheme (TDS)** at tenancydepositscheme.com: Also offers both custodial and insurance options.\n\nYour landlord should have told you which scheme protects your deposit within 30 days of receiving it, along with \"prescribed information\" about the scheme and your rights. If they did not, they are already in breach of the law.",
      },
      {
        id: "step-by-step-check",
        heading: "How to Check Each Scheme (Step by Step)",
        content:
          "You can check all three schemes online in about 3 minutes:\n\n**DPS (Deposit Protection Service):**\n- Go to depositprotection.com\n- Click \"Check your deposit\" or \"Tenants\" section\n- Enter your surname, postcode, and tenancy start date\n- If your deposit is with the DPS, it will show the amount and status\n\n**MyDeposits:**\n- Go to mydeposits.co.uk\n- Click \"Is my deposit protected?\"\n- Enter your deposit ID (from your prescribed information) or use the search\n- You can also call them on 0333 321 9401\n\n**TDS (Tenancy Deposit Scheme):**\n- Go to tenancydepositscheme.com\n- Click \"Is my deposit protected?\"\n- Enter your deposit reference number or search by name and postcode\n- You can also call them on 0300 037 1000\n\nIf you cannot find your deposit on any of the three schemes, it is likely not protected. This is a serious legal breach by your landlord.",
      },
      {
        id: "not-protected",
        heading: "What to Do If Your Deposit Is Not Protected",
        content:
          "If your deposit is not protected in any of the three schemes, your landlord is breaking the law. You have strong legal remedies:\n\n- **Compensation claim**: You can apply to the county court for compensation of **1 to 3 times the deposit amount**. This is a penalty for failing to comply with the deposit protection requirements.\n- **Your landlord cannot evict you**: A landlord who has not protected your deposit (or served the prescribed information) cannot serve a valid eviction notice. This gives you significant leverage.\n- **Return of the deposit**: The court can order the landlord to return the deposit or protect it within 14 days.\n\nThe court claim is straightforward and can be done without a solicitor using the Money Claims Online service (moneyclaims.service.gov.uk). Many housing charities and law centres can help with the paperwork.\n\nBefore making a claim, write to your landlord giving them 14 days to protect the deposit and provide the prescribed information. Keep a copy of this letter. If they do not comply, proceed with the court claim.\n\nUse our [landlord check tool](/landlord-check) to assess your landlord's overall compliance with legal requirements.",
      },
      {
        id: "prescribed-information",
        heading: "Did You Receive the Prescribed Information?",
        content:
          "Even if your deposit is protected, your landlord must also have served you with **prescribed information** within 30 days. This must include:\n\n- The name and contact details of the scheme\n- Your landlord's or agent's name and contact details\n- The address of the rented property\n- The amount of the deposit\n- Information about the scheme's dispute resolution process\n- The circumstances in which deductions may be made\n\nIf you did not receive this information (or it was not served within 30 days), the same penalties apply as for an unprotected deposit: the landlord cannot serve a valid eviction notice, and you can claim 1 to 3 times the deposit amount.\n\nCheck your email, letters, and tenancy paperwork carefully. The prescribed information is often sent as a separate document or email, not included in the tenancy agreement itself.",
      },
    ],
    faqs: [
      {
        question: "How do I check if my deposit is protected?",
        answer:
          "Search all three government-approved schemes: DPS (depositprotection.com), MyDeposits (mydeposits.co.uk), and TDS (tenancydepositscheme.com). Each has an online search tool where you can look up your deposit using your name, postcode, or deposit reference number.",
      },
      {
        question: "What if my landlord protected the deposit late?",
        answer:
          "If the deposit was protected more than 30 days after the landlord received it, this is a breach. You can still claim compensation of 1 to 3 times the deposit amount through the county court, even if it is now protected.",
      },
      {
        question: "Can I claim compensation if my deposit was not protected?",
        answer:
          "Yes. You can apply to the county court for 1 to 3 times the deposit amount as a penalty. You can also prevent the landlord from serving a valid eviction notice until the deposit is properly protected.",
      },
      {
        question: "Do I need a solicitor to make a deposit protection claim?",
        answer:
          "No. The claim can be filed online through Money Claims Online (moneyclaims.service.gov.uk). Many housing charities and law centres offer free help with the process. Shelter and Citizens Advice can also guide you through it.",
      },
    ],
    relatedSlugs: [
      "how-to-get-deposit-back",
      "can-landlord-keep-deposit-for-cleaning",
      "renting-rights-without-contract",
      "how-to-report-landlord",
    ],
  },
  // ---- Article 18: How to break tenancy early ----
  {
    slug: "how-to-break-a-tenancy-agreement-early",
    title: "How to Break a Tenancy Agreement Early: Your Options",
    metaDescription:
      "Need to leave your rental early? Learn about break clauses, negotiation, surrender, and your legal options. Covers fixed-term and periodic tenancies in England.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 7,
    category: "Guides",
    sections: [
      {
        id: "break-clauses",
        heading: "Check for a Break Clause",
        content:
          "The easiest way to end a tenancy early is if your agreement contains a **break clause**. This is a pre-agreed right for either party (or both) to end the tenancy before the fixed term expires.\n\nCommon break clause terms:\n\n- Typically activated at the 6-month point in a 12-month tenancy\n- Usually requires 1 or 2 months' written notice\n- May have conditions (e.g. all rent must be up to date, all keys returned)\n\nTo exercise a break clause:\n\n- Write to your landlord (or agent) giving the required notice period\n- Reference the specific clause in your tenancy agreement\n- State the date you will vacate\n- Keep a copy and get proof of delivery (recorded post or email with read receipt)\n\nIf any conditions are not met, the break clause may not be valid. For example, if the clause requires \"all rent to be paid up to date\" and you owe even a small amount, the landlord could argue the break clause was not properly exercised.\n\nNote: Under the **Renters' Rights Act 2025**, all new tenancies are periodic (rolling). Tenants can end a periodic tenancy by giving **two months' notice** at any time, without needing a break clause.",
      },
      {
        id: "negotiating-early-exit",
        heading: "Negotiating an Early Exit (Surrender)",
        content:
          "If you do not have a break clause, you can negotiate with your landlord to end the tenancy early by mutual agreement. This is called a **surrender** of the tenancy.\n\nTo negotiate successfully:\n\n- **Explain your situation**: Landlords are more sympathetic if you have a genuine reason (job relocation, health issues, relationship breakdown).\n- **Offer to help find a replacement tenant**: This removes the landlord's biggest concern, which is lost rental income.\n- **Propose a handover date**: Suggest a date that gives the landlord time to find a new tenant (usually 4 to 6 weeks).\n- **Offer to cover costs**: You might agree to pay the landlord's re-letting costs (typically one to two weeks' rent to an agent).\n- **Get it in writing**: If the landlord agrees, confirm the terms in writing, signed by both parties. This is essential to avoid future disputes.\n\nMost landlords prefer a cooperative early exit to a situation where a tenant stops paying rent or the property sits empty. Approach the conversation constructively and you are likely to reach an agreement.",
      },
      {
        id: "just-leaving",
        heading: "What Happens If You Just Leave?",
        content:
          "If you leave a fixed-term tenancy without the landlord's agreement and without a break clause, you remain **legally liable for rent** until the end of the fixed term (or until a new tenant is found).\n\nHowever, your landlord has a **duty to mitigate their losses**. This means they must take reasonable steps to find a new tenant. They cannot leave the property empty for the remainder of your tenancy and claim the full rent from you.\n\nIn practice:\n\n- Your landlord will likely re-advertise the property\n- If a new tenant is found quickly, your liability reduces to the gap period plus any re-letting costs\n- The landlord can deduct unpaid rent from your deposit\n- If the total owed exceeds the deposit, the landlord could pursue you through the county court (though many do not bother for small amounts)\n\nBefore leaving, always try to negotiate an exit. It is almost always cheaper and less stressful than simply walking away.",
      },
      {
        id: "special-circumstances",
        heading: "Special Circumstances for Early Exit",
        content:
          "Certain situations give you stronger grounds for ending a tenancy early:\n\n- **Property is uninhabitable**: If the property has serious hazards (damp, dangerous electrics, no heating), you may have grounds to leave. Document everything and report to the council before leaving.\n- **Domestic abuse**: Under the **Domestic Abuse Act 2021**, victims of domestic abuse can end a joint tenancy without the abuser's consent. Seek advice from the National Domestic Abuse Helpline (0808 2000 247).\n- **Landlord breach**: If your landlord has breached the tenancy agreement (e.g. illegal entry, harassment, failure to protect your deposit), you may be able to end the tenancy. Get legal advice first.\n- **Military service**: Members of the armed forces may have special provisions. Check with the Armed Forces Legal Aid scheme.\n\nIn any of these situations, seek advice from Shelter (0808 800 4444) or Citizens Advice before taking action. Having professional support strengthens your position significantly.\n\nUse our [damp check tool](/damp-check) or [property check tool](/check) to document issues with the property.",
      },
    ],
    faqs: [
      {
        question: "Can I leave my tenancy before the fixed term ends?",
        answer:
          "You can if your agreement has a break clause, if you negotiate a surrender with your landlord, or under the Renters' Rights Act 2025 if your tenancy is periodic (2 months' notice). Without these, you remain liable for rent until the term ends or a new tenant is found.",
      },
      {
        question: "Will I lose my deposit if I leave early?",
        answer:
          "Not necessarily. Your deposit can only be used for legitimate deductions (damage, unpaid rent, cleaning). If you leave the property in good condition and negotiate an early exit, you should get your deposit back in full.",
      },
      {
        question: "Can my landlord charge an early termination fee?",
        answer:
          "Under the Tenant Fees Act 2019, landlords cannot charge penalties for ending a tenancy early. They can only claim actual financial losses (rent owed until a new tenant is found, or reasonable re-letting costs). Any fee above this is a prohibited payment.",
      },
      {
        question: "How do I give notice on a periodic tenancy?",
        answer:
          "Under the Renters' Rights Act 2025, tenants can give two months' notice at any time to end a periodic tenancy. The notice must be in writing. You do not need a reason, and the landlord cannot refuse.",
      },
    ],
    relatedSlugs: [
      "renting-rights-without-contract",
      "how-to-get-deposit-back",
      "how-to-report-landlord",
      "can-landlord-evict-me-for-no-reason",
    ],
  },
  // ---- Article 19: Dealing with noisy neighbours ----
  {
    slug: "how-to-deal-with-noisy-neighbours-renting",
    title: "How to Deal with Noisy Neighbours When Renting",
    metaDescription:
      "Practical steps for renters dealing with noisy neighbours. Covers talking to neighbours, reporting to landlords, council noise complaints, and your legal rights.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 6,
    category: "Guides",
    sections: [
      {
        id: "step-1-direct-approach",
        heading: "Step 1: Talk to Your Neighbours",
        content:
          "Before escalating, try a direct, friendly conversation. Many noise issues are caused by people who do not realise they are disturbing others.\n\n- **Choose the right moment**: Approach them during the day, not during a noisy episode when emotions are high.\n- **Be specific**: Explain what noise you can hear and when it is most disruptive (e.g. \"I can hear music clearly through the wall after 11pm\").\n- **Suggest solutions**: Perhaps they could use headphones after a certain time, move speakers away from shared walls, or put rugs down on hard floors.\n- **Keep it friendly**: Frame it as a neighbourly request, not a complaint. Most people respond well to a respectful approach.\n\nIf the noise is from a party or one-off event, consider letting it go. If it is a recurring pattern, a conversation is worth having. Keep a note of when you spoke and what was agreed.",
      },
      {
        id: "step-2-tell-your-landlord",
        heading: "Step 2: Report It to Your Landlord",
        content:
          "If direct communication does not work, inform your landlord in writing. This matters for several reasons:\n\n- If the noisy neighbour is also a tenant of your landlord (e.g. in a block of flats), the landlord may be able to take action under the other tenant's agreement.\n- If the noise makes the property unsuitable for living, it could be a **fitness for habitation** issue under the Homes (Fitness for Human Habitation) Act 2018.\n- Having a written record strengthens your position if you need to escalate further.\n\nIn your letter or email:\n\n- Describe the type, frequency, and timing of the noise\n- Explain what steps you have already taken (e.g. speaking to the neighbour)\n- Ask the landlord to investigate and take action\n- Reference the Renters' Rights Act 2025 if relevant (landlords must ensure properties are fit for habitation)\n\nUse our [report issue tool](/report-issue) to generate a formal complaint letter.",
      },
      {
        id: "step-3-council-complaint",
        heading: "Step 3: Make a Council Noise Complaint",
        content:
          "Your local council has a legal duty to investigate noise complaints under the **Environmental Protection Act 1990**. If the noise amounts to a **statutory nuisance**, the council can take enforcement action.\n\nHow to file a complaint:\n\n- Contact your council's environmental health team (usually online or by phone)\n- Keep a **noise diary** for at least two weeks: record dates, times, duration, and type of noise\n- The council may install noise monitoring equipment in your property\n- If the noise is confirmed as a statutory nuisance, the council can serve an **abatement notice** on the person responsible\n- Breaching an abatement notice is a criminal offence with fines of up to £5,000 (domestic premises)\n\nFor noise outside council office hours (e.g. late at night), many councils have an out-of-hours noise team you can call. Some councils also have a noise app for reporting.\n\nUse our [property check tool](/check) to assess the noise environment of any postcode before renting.",
      },
      {
        id: "step-4-legal-options",
        heading: "Step 4: Legal Options for Persistent Noise",
        content:
          "If the council complaint process is not resolving the issue, you have further legal options:\n\n- **Private action under the Environmental Protection Act 1990**: You can bring a case to the magistrates' court yourself under Section 82. The court can order the neighbour to stop the nuisance and fine them.\n- **Mediation**: Many councils offer free mediation services for neighbour disputes. A neutral mediator helps both parties reach an agreement.\n- **Ending your tenancy**: Under the Renters' Rights Act 2025, you can give two months' notice to end a periodic tenancy at any time. If the noise is making the property unlivable, this may be your best option.\n- **Claiming rent reduction**: If the noise significantly affects your ability to use the property, you may have grounds to argue for a rent reduction, particularly if the landlord is aware of the problem and has not taken action.\n\nDocument everything: noise diaries, correspondence with the landlord, council reference numbers, and any impact on your health or wellbeing (e.g. GP letters about sleep disruption).",
      },
    ],
    faqs: [
      {
        question: "Can I break my lease because of noisy neighbours?",
        answer:
          "If the noise makes the property unfit for habitation and the landlord has not taken action, you may have grounds to argue the landlord has breached their obligations. Under the Renters' Rights Act 2025, you can give two months' notice on a periodic tenancy at any time.",
      },
      {
        question: "What counts as a statutory nuisance for noise?",
        answer:
          "A statutory nuisance is noise that unreasonably and substantially interferes with your use and enjoyment of your home. It does not have to be constant; regular loud music at night, persistent dog barking, or ongoing DIY at antisocial hours can all qualify.",
      },
      {
        question: "Can I call the police about noisy neighbours?",
        answer:
          "The police generally handle noise only if there is a breach of the peace, criminal behaviour, or a threat to safety. For standard noise complaints, contact your council's environmental health team. For noise involving violence or threats, call 999.",
      },
    ],
    relatedSlugs: [
      "what-to-check-before-renting",
      "how-to-report-landlord",
      "how-to-break-a-tenancy-agreement-early",
      "can-landlord-evict-me-for-no-reason",
    ],
  },
  // ---- Article 20: How to negotiate rent reduction ----
  {
    slug: "how-to-negotiate-rent-reduction",
    title: "How to Negotiate a Rent Reduction: Scripts That Work",
    metaDescription:
      "Practical scripts and strategies for negotiating a rent reduction with your landlord. Covers when to ask, what evidence to gather, and how to frame the conversation.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 7,
    category: "Money",
    sections: [
      {
        id: "when-to-ask",
        heading: "When to Ask for a Rent Reduction",
        content:
          "Timing matters when negotiating rent. The best times to request a reduction are:\n\n- **When your tenancy is due for renewal**: This is the natural negotiation point. Your landlord would rather keep a good tenant at a slightly lower rent than face an empty property.\n- **When local rents have fallen**: If comparable properties in your area are now listed for less than you are paying, you have strong evidence.\n- **When the property has issues**: Ongoing repairs, damp, poor EPC rating, or broken appliances give you leverage.\n- **When you have been a reliable tenant**: Landlords value tenants who pay on time, look after the property, and cause no problems. This is worth real money to them.\n- **After the landlord proposes an increase**: Counter-offer with evidence rather than simply accepting.\n\nUse our [fair rent tool](/fair-rent) to see how your rent compares to the local average. This gives you objective data to support your request.",
      },
      {
        id: "gathering-evidence",
        heading: "Gathering Your Evidence",
        content:
          "Before approaching your landlord, build a case:\n\n- **Local comparables**: Search Rightmove and Zoopla for similar properties in your area. Screenshot listings showing lower asking rents. Focus on properties with the same number of bedrooms, similar size, and comparable condition.\n- **ONS rental data**: The Office for National Statistics publishes monthly private rental statistics by region. Download the latest data for your area.\n- **Property condition**: If the property has issues (low EPC rating, outstanding repairs, damp), document these. A property in poor condition commands less rent.\n- **Your track record**: Note how long you have lived there, your payment history, and how well you have maintained the property.\n- **Void costs**: Research average void periods in your area. For every month the property sits empty, the landlord loses a full month's rent plus re-letting costs.\n\nUse our [property check tool](/check) to get objective data about the property's EPC rating, broadband speeds, flood risk, and local amenities.",
      },
      {
        id: "scripts-that-work",
        heading: "Scripts and Phrases That Work",
        content:
          "Here are proven approaches for the conversation:\n\n**The data-driven approach:**\n\"I have been looking at comparable properties in the area, and similar flats are currently listed at £X to £Y per month. Given the current market, I would like to discuss adjusting my rent to reflect this. I have been a reliable tenant for [X months/years] and would like to stay.\"\n\n**The condition-based approach:**\n\"I really enjoy living here, but there are some ongoing issues with the property [name specific issues]. Given the condition, I think a reduction from £X to £Y would be fair. I am happy to continue looking after the property well.\"\n\n**The retention approach:**\n\"I wanted to let you know I am reviewing my housing options as my tenancy comes up for renewal. I have seen comparable properties at lower rents. I would prefer to stay, but I would need the rent to come down to £X to make that work. What are your thoughts?\"\n\n**Key phrases to use:**\n- \"I have researched the local market\"\n- \"I would like to find a solution that works for both of us\"\n- \"The void cost of re-letting would be approximately...\"\n- \"I have been a reliable tenant who pays on time\"",
      },
      {
        id: "if-they-say-no",
        heading: "What If Your Landlord Says No?",
        content:
          "If your initial request is refused:\n\n- **Ask for a compromise**: If they will not reduce the rent, ask them to freeze it (no increase) or make improvements to the property instead (new appliances, repainting, better insulation).\n- **Put it in writing**: Follow up the conversation with an email summarising your case. Sometimes landlords reconsider after seeing the evidence laid out clearly.\n- **Give notice**: Under the Renters' Rights Act 2025, you can give two months' notice on a periodic tenancy. If comparable properties are genuinely cheaper, moving is a real option.\n- **Challenge a proposed increase**: If the landlord has served a Section 13 notice for an increase you believe is above market rate, refer it to the First-tier Tribunal. This is free, and since 2025, the tribunal can only set the rent at or below the proposed amount.\n\nRemember: your landlord faces significant costs if you leave. Void periods, re-letting agent fees, referencing, potential redecoration, and the risk of getting a less reliable tenant all cost money. A good tenant willing to stay at a slightly lower rent is often the landlord's best option.",
      },
    ],
    faqs: [
      {
        question: "How much of a rent reduction can I realistically ask for?",
        answer:
          "A 5% to 10% reduction is a common and reasonable starting point, supported by local comparable evidence. For properties with significant issues or in falling markets, you may be able to negotiate more. Start with the data and let the evidence guide your ask.",
      },
      {
        question: "Can my landlord evict me for asking for a rent reduction?",
        answer:
          "No. Under the Renters' Rights Act 2025, Section 21 no-fault evictions are abolished. Your landlord cannot evict you for negotiating rent. They can only evict on specific grounds such as wanting to sell or move in, with proper notice.",
      },
      {
        question: "Should I negotiate rent in writing or in person?",
        answer:
          "Start with an email or letter so there is a written record. If the landlord wants to discuss further, a phone call or meeting is fine, but always follow up with a written summary of what was agreed.",
      },
    ],
    relatedSlugs: [
      "can-landlord-increase-rent",
      "can-landlord-increase-rent-during-fixed-term",
      "average-cost-renting-uk-2026",
      "renting-vs-buying-uk-2026",
    ],
  },
  // ---- Article 21: How to get council to inspect rental ----
  {
    slug: "how-to-get-council-to-inspect-rental",
    title: "How to Get Your Council to Inspect Your Rental Property",
    metaDescription:
      "Step-by-step guide to requesting a council inspection of your rental. Covers HHSRS assessments, environmental health, what inspectors look for, and what happens after.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 6,
    category: "Guides",
    sections: [
      {
        id: "when-to-request",
        heading: "When Should You Request a Council Inspection?",
        content:
          "You should contact your council's environmental health team if your rental property has problems that your landlord has refused to fix. Common issues include:\n\n- **Damp and mould** that the landlord has not addressed\n- **No heating or hot water** (or a broken boiler the landlord will not repair)\n- **Unsafe electrics** (exposed wiring, faulty sockets, no smoke alarms)\n- **Structural problems** (cracks in walls, unstable floors, leaking roof)\n- **Pest infestations** the landlord will not treat\n- **Fire safety concerns** (blocked fire exits, no fire doors in an HMO)\n- **Overcrowding** or rooms below minimum size\n\nBefore contacting the council, you should have already reported the issue to your landlord in writing and given them reasonable time to act (typically 14 days for non-urgent issues, 24 hours for emergencies like no heating in winter).\n\nUse our [damp check tool](/damp-check) to assess damp risk, and our [report issue tool](/report-issue) to generate a formal complaint letter to your landlord.",
      },
      {
        id: "how-to-request",
        heading: "How to Request an Inspection",
        content:
          "Contact your local council's **environmental health** or **private rented sector** team:\n\n- **Online**: Most councils have a web form for reporting housing conditions. Search for \"[your council name] report housing problem\" or \"environmental health complaint.\"\n- **Phone**: Call the council's main number and ask for the environmental health or housing standards team.\n- **In person**: Visit the council offices if you prefer.\n\nWhen making your request:\n\n- Describe each problem clearly and specifically\n- Include photos and videos if possible\n- Provide copies of correspondence with your landlord showing you reported the issue and they have not resolved it\n- Give your contact details and confirm your availability for an inspection\n- Ask for a reference number so you can track progress\n\nCouncils have a **legal duty** to investigate complaints about housing conditions under the **Housing Act 2004**. They cannot refuse to inspect if you report a legitimate concern.",
      },
      {
        id: "what-inspectors-look-for",
        heading: "What Inspectors Check (HHSRS)",
        content:
          "Council inspectors assess properties using the **Housing Health and Safety Rating System (HHSRS)**, which covers 29 categories of hazard including:\n\n- Damp and mould growth\n- Excess cold (no adequate heating)\n- Falls on stairs and between levels\n- Electrical hazards\n- Fire safety\n- Carbon monoxide and fuel combustion products\n- Crowding and space\n- Entry by intruders (security)\n- Structural collapse and falling elements\n\nEach hazard is scored based on the likelihood of harm and the severity of potential outcomes. Hazards are classified as:\n\n- **Category 1 hazards**: Serious and immediate risk. The council **must** take enforcement action.\n- **Category 2 hazards**: Less serious but still significant. The council **may** take action.\n\nThe inspection typically takes 1 to 2 hours. The inspector will examine the entire property, not just the issue you reported. They may find additional problems you were not aware of.",
      },
      {
        id: "after-inspection",
        heading: "What Happens After the Inspection",
        content:
          "After the inspection, the council can take several actions depending on what they find:\n\n- **Improvement notice**: Orders the landlord to carry out specific works within a set timeframe (typically 28 days to several months).\n- **Prohibition order**: Bans the use of part or all of the property until hazards are resolved.\n- **Emergency remedial action**: For serious and immediate risks, the council can carry out works themselves and charge the landlord.\n- **Hazard awareness notice**: For less serious issues, informs the landlord of the hazard.\n\nImportantly, once the council has served an improvement notice or taken emergency action, your landlord **cannot evict you** using the retaliatory eviction provisions. This protection is strengthened under the Renters' Rights Act 2025.\n\nIf the landlord fails to comply with an improvement notice, the council can prosecute them (unlimited fine) or carry out the works and recover the cost. You may also be entitled to a **rent repayment order** of up to 12 months' rent if the landlord is prosecuted.",
      },
    ],
    faqs: [
      {
        question: "Can my landlord evict me for contacting the council?",
        answer:
          "No. Under the Renters' Rights Act 2025, retaliatory evictions are illegal. If the council has taken action (improvement notice or emergency remedial action), your landlord cannot begin eviction proceedings. This protection is one of the strongest tenant rights available.",
      },
      {
        question: "How long does a council inspection take to arrange?",
        answer:
          "It varies by council, but most aim to inspect within 2 to 4 weeks for non-urgent issues. For emergencies (no heating in winter, dangerous electrics), inspections may be arranged within 24 to 48 hours. Chase the council if you do not hear back within a week.",
      },
      {
        question: "Is a council inspection free?",
        answer:
          "Yes. Council housing inspections are free for tenants. The landlord may be charged if enforcement action is taken, but there is no cost to you as the tenant.",
      },
    ],
    relatedSlugs: [
      "how-to-report-landlord",
      "tenant-rights-damp-mould-2026",
      "can-landlord-charge-for-repairs",
      "can-landlord-evict-me-for-no-reason",
    ],
  },
  // ---- Article 22: How to claim compensation from landlord ----
  {
    slug: "how-to-claim-compensation-from-landlord",
    title: "How to Claim Compensation from Your Landlord",
    metaDescription:
      "A practical guide to claiming compensation from your landlord for disrepair, illegal eviction, unprotected deposits, and harassment. Covers county court, Ombudsman, and rent repayment orders.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 8,
    category: "Guides",
    sections: [
      {
        id: "grounds-for-compensation",
        heading: "When Can You Claim Compensation?",
        content:
          "You may be entitled to compensation from your landlord in several situations:\n\n- **Unprotected deposit**: If your landlord failed to protect your deposit in a government-approved scheme within 30 days, you can claim 1 to 3 times the deposit amount.\n- **Disrepair**: If the landlord failed to maintain the property (breach of Section 11 or the Homes Act 2018), you can claim for any losses, inconvenience, and damage to your belongings.\n- **Illegal eviction**: If you were illegally evicted (locks changed, utilities cut off), compensation can include accommodation costs, distress, and loss of belongings.\n- **Harassment**: Persistent interference with your quiet enjoyment, unlawful entry, or intimidation can result in compensation.\n- **Rent repayment**: If your landlord committed a housing offence (unlicensed HMO, breach of improvement notice, illegal eviction), you can claim up to 12 months' rent.\n- **Prohibited fees**: If your landlord charged fees banned under the Tenant Fees Act 2019, you can claim the amount back plus interest.\n\nEach route has different processes and potential amounts. Understanding which applies to your situation is the first step.",
      },
      {
        id: "county-court-claims",
        heading: "Making a County Court Claim",
        content:
          "For most compensation claims against a landlord, you will use the **county court** (small claims track for claims under £10,000):\n\n**How to file:**\n- Use Money Claims Online (moneyclaims.service.gov.uk) for straightforward claims\n- Or fill in Form N1 and submit it to your local county court\n- The court fee depends on the amount claimed (e.g. £80 for claims up to £1,000, £115 for claims up to £5,000)\n\n**Types of claims:**\n- **Deposit protection**: Claim 1 to 3 times the deposit under Section 214 of the Housing Act 2004\n- **Disrepair**: Claim for losses caused by the landlord's failure to repair (reduced rent value, damaged belongings, health costs)\n- **Breach of quiet enjoyment**: Claim for distress and inconvenience caused by landlord interference\n\n**Building your case:**\n- Gather all evidence: photos, correspondence, receipts for losses, medical evidence if health was affected\n- Write a letter before action giving the landlord 14 days to respond before filing\n- You do not need a solicitor for small claims. The hearing is informal and designed for non-lawyers.\n- If you win, the landlord must pay within 14 days (or as ordered by the court)",
      },
      {
        id: "rent-repayment-orders",
        heading: "Rent Repayment Orders",
        content:
          "A **rent repayment order (RRO)** lets you recover up to 12 months' rent if your landlord committed specific housing offences:\n\n- Operating an unlicensed HMO\n- Breaching a council improvement notice\n- Illegal eviction or harassment\n- Failure to comply with a prohibition order\n- Using violence to secure entry to the property\n\nThe application goes to the **First-tier Tribunal (Property Chamber)**, not the county court. The process:\n\n- Complete the application form (available from the tribunal website)\n- Pay the fee (£100 to £300 depending on the claim)\n- Submit evidence of the offence and the rent you paid\n- Attend a hearing (usually within 3 to 6 months)\n- The tribunal decides the amount to award (up to 12 months' rent)\n\nYou do not need to wait for the landlord to be prosecuted. You can apply for an RRO whether or not the council has taken criminal action. However, a successful prosecution strengthens your case.\n\nUse our [landlord check tool](/landlord-check) to assess whether your property requires a licence that the landlord may not have.",
      },
      {
        id: "prs-ombudsman",
        heading: "The Private Rented Sector Ombudsman",
        content:
          "The **Renters' Rights Act 2025** created a new **Private Rented Sector Ombudsman** that all landlords in England must register with. This provides a free alternative to the courts for many complaints.\n\nThe Ombudsman can investigate complaints about:\n\n- Failure to carry out repairs\n- Poor communication or unresponsiveness\n- Breach of landlord obligations\n- Unfair treatment or discrimination\n- Complaints handling by landlords or agents\n\nThe Ombudsman can order remedies including:\n\n- An apology\n- An explanation of what went wrong\n- Compensation (amounts vary)\n- Practical action to put things right\n\nTo use the Ombudsman:\n\n- First complain to your landlord and allow them time to respond (usually 8 weeks)\n- If not resolved, submit your complaint to the Ombudsman\n- The process is free and decisions are binding on the landlord\n- The Ombudsman aims to resolve complaints within 90 days\n\nThe Ombudsman is a good option for issues that do not warrant a full court claim but still need resolution. For larger financial claims, the county court or tribunal may be more appropriate.",
      },
    ],
    faqs: [
      {
        question: "How much compensation can I claim from my landlord?",
        answer:
          "It depends on the type of claim. Unprotected deposits: 1 to 3 times the deposit. Disrepair: varies based on losses (typically hundreds to thousands of pounds). Illegal eviction: £1,000 to £25,000. Rent repayment orders: up to 12 months' rent. Each case is assessed individually.",
      },
      {
        question: "Do I need a solicitor to claim compensation?",
        answer:
          "For small claims (under £10,000), you generally do not need a solicitor. The county court small claims process is designed for non-lawyers. For larger or more complex claims, legal advice is recommended. Many housing charities offer free legal help.",
      },
      {
        question: "How long do I have to make a compensation claim?",
        answer:
          "For most claims, you have 6 years from the date of the issue (Limitation Act 1980). For deposit protection claims, the time limit is 6 years from the end of the tenancy. For rent repayment orders, you must apply within 12 months of the offence. Act promptly to preserve evidence.",
      },
      {
        question: "Can I claim compensation while still living in the property?",
        answer:
          "Yes. You do not need to have moved out to make a claim. You can claim for disrepair, unprotected deposits, and other issues while still a tenant. Your landlord cannot evict you for making a legitimate claim.",
      },
    ],
    relatedSlugs: [
      "how-to-report-landlord",
      "how-to-get-deposit-back",
      "how-to-check-if-deposit-protected",
      "can-landlord-evict-me-for-no-reason",
    ],
  },
  // ---- Article 23: Average cost of renting UK 2026 ----
  {
    slug: "average-cost-renting-uk-2026",
    title: "The Real Cost of Renting in the UK in 2026",
    metaDescription:
      "Average UK rent prices in 2026 by region, plus hidden costs most renters forget. Covers London, North, Midlands, and how to calculate your true monthly spend.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 7,
    category: "Money",
    sections: [
      {
        id: "average-rents-by-region",
        heading: "Average Rents Across the UK in 2026",
        content:
          "According to the latest ONS Private Rental Index and Rightmove data, average monthly rents in 2026 vary enormously by region:\n\n- **London**: £2,100 (up 4.2% year-on-year)\n- **South East**: £1,350 (up 3.8%)\n- **East of England**: £1,250 (up 3.5%)\n- **South West**: £1,150 (up 3.1%)\n- **West Midlands**: £950 (up 3.9%)\n- **East Midlands**: £875 (up 3.6%)\n- **North West**: £850 (up 4.1%)\n- **Yorkshire and the Humber**: £800 (up 3.4%)\n- **North East**: £650 (up 2.8%)\n\nThe UK average outside London is approximately £1,000 per month. Within London, rents range from around £1,500 in outer boroughs to over £3,000 in central areas.\n\nThese figures are for all property types combined. One-bedroom flats are typically 30% to 40% below these averages, while three-bedroom houses are 20% to 30% above.\n\nCheck how your area compares using our [rent comparison pages](/rent).",
      },
      {
        id: "beyond-rent",
        heading: "The Costs Most Renters Forget",
        content:
          "Rent is only part of your monthly outgoings. The true cost of renting includes:\n\n- **Council tax**: £100 to £300/month depending on the band and location. Single occupants get a 25% discount.\n- **Energy bills**: £100 to £250/month depending on EPC rating, property size, and insulation quality.\n- **Water rates**: £25 to £70/month depending on whether you are metered and the number of occupants.\n- **Broadband**: £25 to £50/month for standard to full fibre.\n- **TV licence**: £13.25/month if you watch live TV or use BBC iPlayer.\n- **Contents insurance**: £10 to £25/month. Not legally required but strongly recommended.\n- **Deposit**: Capped at 5 weeks' rent under the Tenant Fees Act 2019. This is an upfront cost you should get back.\n- **Moving costs**: Removal van, mail redirection, new curtains or furniture.\n\nFor a property with £1,200/month rent, total monthly outgoings are typically £1,550 to £1,700. Use our [total cost calculator](/calculator) to get a personalised breakdown.",
      },
      {
        id: "rent-trends-2026",
        heading: "Rent Trends and What to Expect",
        content:
          "Several factors are shaping the rental market in 2026:\n\n- **Supply shortage continues**: The number of rental properties has fallen as some landlords exit the market due to higher mortgage rates and increased regulation. Fewer properties means continued upward pressure on rents.\n- **Demand remains strong**: Net migration, delays to first-time buying, and an ageing population all contribute to high demand for rentals.\n- **The Renters' Rights Act 2025**: The abolition of Section 21 and new pet rights are making renting more secure, but some landlords have raised rents in response to increased regulation.\n- **Regional variation**: Rents in northern cities are rising faster in percentage terms as remote working drives demand outside London. Cities like Manchester, Leeds, and Bristol have seen particularly strong growth.\n- **Student market**: University towns continue to see sharp rent increases, with some areas up 8% to 10% year-on-year.\n\nThe Bank of England and ONS both project rental inflation of 3% to 5% nationally through 2026, with London slightly below this due to its already high base.",
      },
      {
        id: "how-to-reduce-costs",
        heading: "How to Reduce Your Rental Costs",
        content:
          "Practical steps to bring your total cost of renting down:\n\n- **Negotiate your rent**: Use local comparables and your track record as a reliable tenant. See our guide on [negotiating rent reductions](/blog/how-to-negotiate-rent-reduction).\n- **Challenge your council tax band**: If you think your property is in the wrong band, apply to the Valuation Office Agency (VOA) for a reassessment. It is free.\n- **Switch energy suppliers**: Even in the current market, comparison sites can find savings. Ensure your property has an EPC rating of C or above; if not, your landlord may need to improve insulation.\n- **Apply for council tax reductions**: Students are exempt. Those on low income or certain benefits may qualify for a council tax reduction.\n- **Consider house shares**: Splitting rent and bills between occupants significantly reduces per-person costs. Use our [HMO checker](/blog/hmo-rights-house-share) to know your rights in shared housing.\n- **Check benefits entitlement**: Housing benefit and Universal Credit housing element can help with rent. Use an online benefits calculator to check eligibility.\n\nEvery pound saved on bills and utilities is a pound more in your pocket. Start with the biggest costs (rent, energy, council tax) for maximum impact.",
      },
    ],
    faqs: [
      {
        question: "What is the average rent in the UK in 2026?",
        answer:
          "The UK average rent outside London is approximately £1,000 per month. In London, the average is around £2,100. Rents vary significantly by region, with the North East being cheapest (£650 average) and London being most expensive.",
      },
      {
        question: "How much should I spend on rent as a percentage of income?",
        answer:
          "The general guideline is no more than 30% to 35% of your gross income on rent. In London and the South East, many renters spend 40% or more. Use our total cost calculator to see the full picture including bills, not just the rent figure.",
      },
      {
        question: "Are rents going up or down in 2026?",
        answer:
          "Rents are continuing to rise across most of the UK, though the rate of increase has moderated slightly compared to 2024 and 2025. National rental inflation is projected at 3% to 5% through 2026, with regional variations.",
      },
    ],
    relatedSlugs: [
      "cheapest-places-to-rent-uk",
      "renting-vs-buying-uk-2026",
      "hidden-costs-of-renting",
      "how-to-negotiate-rent-reduction",
    ],
  },
  // ---- Article 24: Cheapest places to rent UK ----
  {
    slug: "cheapest-places-to-rent-uk",
    title: "Cheapest Places to Rent in the UK 2026",
    metaDescription:
      "The most affordable places to rent in the UK in 2026. Covers average rents by city, hidden gems with low costs and good amenities, and what to watch out for.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 6,
    category: "Money",
    sections: [
      {
        id: "cheapest-cities",
        heading: "The 10 Cheapest Cities to Rent in 2026",
        content:
          "Based on ONS data and live Rightmove listings, the cheapest cities for renters in 2026 are:\n\n- **Burnley, Lancashire**: Average 2-bed rent £450/month. Strong transport links to Manchester, low council tax.\n- **Stoke-on-Trent**: Average 2-bed rent £500/month. Good amenities, university city, improving infrastructure.\n- **Sunderland**: Average 2-bed rent £500/month. Coastal location, Metro link to Newcastle.\n- **Bradford**: Average 2-bed rent £525/month. Close to Leeds, good schools, significant regeneration.\n- **Hull**: Average 2-bed rent £525/month. UK City of Culture legacy, new developments, university town.\n- **Middlesbrough**: Average 2-bed rent £530/month. Teesside regeneration, freeport investment.\n- **Blackburn**: Average 2-bed rent £530/month. M65 motorway access, affordable housing stock.\n- **Dundee**: Average 2-bed rent £550/month. V&A museum, waterfront development, university city.\n- **Rochdale**: Average 2-bed rent £550/month. Metrolink to Manchester, canal restoration.\n- **Hartlepool**: Average 2-bed rent £475/month. Marina development, National Museum of the Royal Navy.\n\nThese rents are for two-bedroom properties. One-beds are typically 25% to 30% cheaper.",
      },
      {
        id: "hidden-gems",
        heading: "Hidden Gems: Affordable and Liveable",
        content:
          "Some areas offer low rents without compromising on quality of life:\n\n- **Lancaster**: Average 2-bed rent £600/month. Historic university city, close to the Lake District, excellent walkability.\n- **Stirling, Scotland**: Average 2-bed rent £625/month. Castle, university, stunning scenery, direct trains to Edinburgh and Glasgow.\n- **Lincoln**: Average 2-bed rent £625/month. Cathedral city, growing tech sector, university expansion.\n- **Bangor, Wales**: Average 2-bed rent £550/month. University town, Snowdonia on the doorstep, coastal setting.\n- **Inverness**: Average 2-bed rent £650/month. Capital of the Highlands, growing economy, exceptional natural surroundings.\n\nWhen choosing an affordable area, consider the total cost of living, not just rent. Council tax varies significantly between councils, and energy costs depend on property insulation quality. Use our [total cost calculator](/calculator) for a complete picture.\n\nCheck our [rent by area pages](/rent) for detailed breakdowns of any UK city.",
      },
      {
        id: "what-to-watch-out-for",
        heading: "What to Watch Out for in Low-Rent Areas",
        content:
          "Very low rents sometimes indicate issues worth investigating before you sign:\n\n- **Property condition**: Cheaper areas may have older housing stock with lower EPC ratings, meaning higher energy bills that offset the rent savings.\n- **Crime rates**: Some very affordable areas have above-average crime. Check before committing.\n- **Transport links**: Low rents may reflect poor connectivity. If you commute, factor in travel costs and time.\n- **Employment opportunities**: Consider the local job market if you need to work locally.\n- **Broadband speeds**: Rural cheap areas may have poor broadband. Check availability before moving.\n- **Amenities**: Ensure the area has the shops, healthcare, and services you need.\n\nUse our [property check tool](/check) to investigate any postcode before renting. It covers EPC ratings, crime data, flood risk, broadband speeds, transport links, and more, all in one free report.",
      },
      {
        id: "cheapest-areas-near-london",
        heading: "Cheapest Commutable Areas Near London",
        content:
          "If you work in London but want cheaper rent, consider these commuter-friendly areas:\n\n- **Luton**: Average 2-bed rent £900/month. 25 minutes to St Pancras by train.\n- **Chatham/Rochester**: Average 2-bed rent £875/month. 45 minutes to London St Pancras via HS1.\n- **Basildon**: Average 2-bed rent £950/month. 35 minutes to Fenchurch Street.\n- **Tilbury**: Average 2-bed rent £850/month. C2C line to Fenchurch Street.\n- **Grays**: Average 2-bed rent £900/month. 45 minutes to Fenchurch Street.\n\nBalance rent savings against season ticket costs. An annual travelcard from Luton costs approximately £5,500, while from Chatham it is around £5,000. At cheaper rents, the overall saving can still be significant compared to inner London.\n\nUse our [commute tool](/commute) to calculate journey times, costs, and CO2 from any postcode.",
      },
    ],
    faqs: [
      {
        question: "Where is the cheapest place to rent in the UK?",
        answer:
          "The cheapest major towns for renting in 2026 include Burnley (£450/month for a 2-bed), Hartlepool (£475/month), and Stoke-on-Trent and Sunderland (both around £500/month). These are significantly cheaper than the UK average of £1,000 outside London.",
      },
      {
        question: "Is it cheaper to rent in the north or south of England?",
        answer:
          "Significantly cheaper in the north. Average rents in the North East are around £650/month compared to £1,350 in the South East and £2,100 in London. Even accounting for lower wages, the cost-of-living ratio is generally more favourable in the north.",
      },
      {
        question: "Should I rent where it is cheap or where I can earn more?",
        answer:
          "Consider the rent-to-income ratio rather than absolute rent. A £500/month rent on a £25,000 salary (24%) may leave you better off than £1,500/month on a £40,000 salary (45%). Remote working has made this calculation easier for many people.",
      },
    ],
    relatedSlugs: [
      "average-cost-renting-uk-2026",
      "renting-vs-buying-uk-2026",
      "hidden-costs-of-renting",
      "what-to-check-before-renting",
    ],
  },
  // ---- Article 25: Renting vs buying UK 2026 ----
  {
    slug: "renting-vs-buying-uk-2026",
    title: "Renting vs Buying in 2026: Which Makes More Financial Sense?",
    metaDescription:
      "An honest comparison of renting vs buying in the UK in 2026. Covers mortgage costs, hidden buying costs, flexibility, wealth building, and when each option wins.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 8,
    category: "Money",
    sections: [
      {
        id: "the-numbers",
        heading: "The Numbers: Renting vs Buying in 2026",
        content:
          "Let us compare the true monthly costs for a typical £250,000 property:\n\n**Buying (with a 10% deposit and 4.5% mortgage rate):**\n- Mortgage repayment (25-year term): £1,250/month\n- Service charge/ground rent (if leasehold): £100 to £200/month\n- Buildings insurance: £30/month\n- Maintenance fund (1% of property value per year): £210/month\n- Total: approximately £1,590 to £1,690/month\n\n**Renting the same property:**\n- Rent: approximately £1,100/month (based on 5.3% gross yield)\n- Contents insurance: £15/month\n- Total: approximately £1,115/month\n\nOn a pure monthly cash flow basis, renting is typically £400 to £600 cheaper. However, buying builds equity. Of that £1,250 mortgage payment, roughly £300 to £400 goes towards paying down the loan (the rest is interest), which is effectively savings.\n\nUse our [total cost calculator](/calculator) to model your specific situation.",
      },
      {
        id: "hidden-costs-of-buying",
        heading: "Hidden Costs of Buying That Change the Equation",
        content:
          "The upfront costs of buying are substantial and often underestimated:\n\n- **Deposit**: £25,000 (10% of £250,000). That money could generate investment returns if you rented instead.\n- **Stamp duty**: £0 for first-time buyers up to £425,000 (2026 rates). Up to £12,500 for non-first-time buyers on a £250,000 property.\n- **Solicitor fees**: £1,200 to £2,000\n- **Survey**: £300 to £1,500 depending on type\n- **Mortgage arrangement fee**: £0 to £2,000\n- **Moving costs**: £500 to £2,000\n\nTotal upfront costs (beyond the deposit) range from £2,000 to £7,500. These are sunk costs you do not recover.\n\nIf you sell within 5 years, estate agent fees (1% to 1.5% of the sale price) and solicitor fees eat further into any equity gain. Generally, buying only makes financial sense if you plan to stay for at least 5 to 7 years.",
      },
      {
        id: "when-renting-wins",
        heading: "When Renting Makes More Sense",
        content:
          "Renting is often the better choice when:\n\n- **You might move within 5 years**: Transaction costs make short-term ownership expensive.\n- **Property prices are stagnant or falling**: If house prices are not rising, you lose the capital growth advantage of buying.\n- **You can invest the difference**: If you rent for £500/month less than buying would cost and invest that £500 in a stocks and shares ISA earning 7% average returns, the investment pot grows significantly over 10 to 20 years.\n- **You value flexibility**: Renting lets you move for work, relationships, or lifestyle changes. Under the Renters' Rights Act 2025, you can give just two months' notice.\n- **You are not financially ready**: Stretching to buy with a small deposit and high mortgage rate can leave you financially vulnerable.\n- **The rent-to-buy ratio favours renting**: In areas where buying is 30+ times annual rent (common in London), renting is usually better value.\n\nThe Renters' Rights Act 2025 has made renting significantly more secure, which reduces one of the traditional advantages of buying.",
      },
      {
        id: "when-buying-wins",
        heading: "When Buying Makes More Sense",
        content:
          "Buying is typically better when:\n\n- **You plan to stay 7+ years**: The longer you stay, the more transaction costs are amortised and the more equity you build.\n- **Mortgage rates drop**: If rates fall below 4%, the cost gap between renting and buying narrows significantly. Fixed rates lock in your costs.\n- **Property prices rise**: Historically, UK house prices have risen 3% to 5% per year on average. On a £250,000 property, that is £7,500 to £12,500 per year in equity.\n- **You want stability**: Owning means no landlord, no rent increases, and no risk of having to move.\n- **Forced savings**: Mortgage payments force you to build equity. Many people who could invest the difference never actually do.\n- **You are in a rising market**: Some regions (particularly the North and Midlands) offer strong rental yields and price growth potential.\n\nThe decision is personal and depends on your specific circumstances, location, and financial situation. Neither option is universally \"better\" for everyone.",
      },
    ],
    faqs: [
      {
        question: "Is it cheaper to rent or buy in the UK in 2026?",
        answer:
          "On a monthly cash flow basis, renting is typically £400 to £600 cheaper for equivalent properties. However, buying builds equity over time. The right choice depends on how long you plan to stay, local property prices, mortgage rates, and whether you would invest the savings from renting.",
      },
      {
        question: "How long do you need to own a property for buying to pay off?",
        answer:
          "Generally 5 to 7 years minimum to break even on transaction costs (stamp duty, solicitor fees, estate agent fees when selling). After that, equity build-up and any property price growth start to tip the balance in favour of buying.",
      },
      {
        question: "Should I wait for house prices to fall before buying?",
        answer:
          "Timing the market is extremely difficult. If you are buying a home to live in for 10+ years, short-term price fluctuations matter less. Focus on affordability: can you comfortably meet the monthly payments with a buffer for rate increases?",
      },
    ],
    relatedSlugs: [
      "average-cost-renting-uk-2026",
      "hidden-costs-of-renting",
      "cheapest-places-to-rent-uk",
      "how-to-negotiate-rent-reduction",
    ],
  },
  // ---- Article 26: Hidden costs of renting ----
  {
    slug: "hidden-costs-of-renting",
    title: "Hidden Costs of Renting Nobody Tells You About",
    metaDescription:
      "The true cost of renting goes well beyond your monthly rent. Discover the hidden costs UK renters face, from holding deposits to reference fees, and how to budget properly.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 6,
    category: "Money",
    sections: [
      {
        id: "upfront-costs",
        heading: "Upfront Costs Before You Move In",
        content:
          "Before you even get the keys, you will need to pay:\n\n- **Deposit**: Up to 5 weeks' rent (capped by the Tenant Fees Act 2019). On a £1,200/month property, that is £1,385. This is refundable, but it is cash you cannot access during the tenancy.\n- **Holding deposit**: Up to 1 week's rent (£277 on a £1,200/month property). Paid to reserve the property while references are checked. Refundable if the landlord withdraws, but you lose it if you fail referencing or pull out.\n- **First month's rent in advance**: Most landlords require the first month upfront. Combined with the deposit, you need roughly 7 weeks' rent available on day one.\n- **Moving costs**: Removal van (£200 to £800 depending on distance), packing materials, time off work.\n\nTotal upfront outlay for a £1,200/month property: approximately £2,800 to £3,500 before you have slept a single night in the property.\n\nUnder the Tenant Fees Act 2019, landlords and agents cannot charge any other upfront fees. If they try to charge referencing fees, administration fees, or check-in fees, this is illegal.",
      },
      {
        id: "ongoing-hidden-costs",
        heading: "Monthly Costs Beyond Rent",
        content:
          "The expenses that add up every month:\n\n- **Council tax**: £100 to £300/month. Many first-time renters are shocked by this. Check the band before signing a lease.\n- **Energy bills**: £100 to £250/month. Properties with poor EPC ratings (D, E, F, G) cost significantly more to heat. Always check the EPC before renting.\n- **Water rates**: £25 to £70/month. Metered properties cost less for single occupants; unmetered can be cheaper for families.\n- **Broadband**: £25 to £50/month. Many properties come with an existing line, but you will need your own contract.\n- **TV licence**: £13.25/month if you watch live TV or use BBC iPlayer.\n- **Contents insurance**: £10 to £25/month. Not legally required but covers your belongings against theft, fire, and flood.\n\nFor a £1,200/month rental, expect total monthly outgoings of **£1,550 to £1,850**. That is 30% to 55% more than the headline rent figure.\n\nUse our [total cost calculator](/calculator) to get a personalised estimate before committing to a property.",
      },
      {
        id: "costs-at-end",
        heading: "Costs When You Move Out",
        content:
          "Moving out comes with its own expenses:\n\n- **Professional cleaning**: £150 to £400 if required to match the check-in standard.\n- **Carpet cleaning**: £50 to £150 if specified in the tenancy agreement.\n- **Replacement items**: If you lost keys (£50 to £150 for replacement locks), broke fixtures, or damaged furnishings.\n- **Deposit deductions**: Even with a clean exit, some landlords will try to make deductions. Always attend the check-out inspection and challenge anything unfair.\n- **Overlap period**: If your new tenancy starts before the old one ends, you may pay double rent for days or weeks.\n- **Mail redirection**: £33.99 for 3 months (Royal Mail).\n\nBudget at least £300 to £600 for end-of-tenancy costs. Taking thorough photos at check-in and keeping the property clean throughout your tenancy minimises these expenses.\n\nSee our guide on [getting your deposit back](/blog/how-to-get-deposit-back) for strategies to avoid unfair deductions.",
      },
      {
        id: "hidden-opportunity-costs",
        heading: "The Opportunity Costs Nobody Mentions",
        content:
          "Beyond direct costs, renting has opportunity costs worth considering:\n\n- **Deposit tied up**: Your deposit (often £1,000 to £2,500) earns no interest while held in a custodial scheme. Over a 3-year tenancy, that is lost investment returns.\n- **No equity building**: Unlike mortgage payments, rent builds no wealth. Over 10 years of renting at £1,200/month, you will have paid £144,000 with nothing to show for it.\n- **Rent increases**: Unlike a fixed-rate mortgage, rent can increase annually. Even at 3% per year, £1,200/month becomes £1,612 after 10 years.\n- **Moving costs accumulate**: The average renter moves every 2 to 3 years. Each move costs £1,000 to £3,000, adding up over a lifetime.\n\nHowever, renting also has financial advantages: you avoid maintenance costs (boiler replacements, roof repairs), stamp duty, and the risk of negative equity. The flexibility to move for better-paying jobs can also be financially valuable.\n\nThe key is to budget for the **total** cost of renting, not just the headline rent. Our [total cost calculator](/calculator) helps you see the full picture.",
      },
    ],
    faqs: [
      {
        question: "What are the hidden costs of renting in the UK?",
        answer:
          "Beyond rent, expect to pay council tax (£100-300/month), energy (£100-250/month), water (£25-70/month), broadband (£25-50/month), TV licence (£13.25/month), and contents insurance (£10-25/month). Total monthly costs are typically 30% to 55% above the headline rent.",
      },
      {
        question: "How much money do I need upfront to rent a property?",
        answer:
          "You typically need roughly 7 weeks' rent upfront: a deposit (5 weeks' rent), a holding deposit (1 week's rent), and first month's rent in advance. For a £1,200/month property, budget approximately £2,800 to £3,500.",
      },
      {
        question: "Can my landlord charge me any fees?",
        answer:
          "Under the Tenant Fees Act 2019, landlords in England cannot charge referencing fees, admin fees, check-in fees, or renewal fees. The only permitted charges are rent, a capped deposit, a holding deposit, changes to the tenancy requested by you (capped at £50), and charges for late rent or lost keys.",
      },
    ],
    relatedSlugs: [
      "average-cost-renting-uk-2026",
      "renting-vs-buying-uk-2026",
      "cheapest-places-to-rent-uk",
      "what-to-check-before-renting",
    ],
  },
  // ---- Article 27: How to spot a rental scam ----
  {
    slug: "how-to-spot-rental-scam",
    title: "How to Spot a Rental Scam: 12 Red Flags",
    metaDescription:
      "Protect yourself from rental scams with these 12 red flags every UK renter should know. Covers fake listings, deposit fraud, phantom landlords, and how to verify properties.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 7,
    category: "Safety",
    sections: [
      {
        id: "the-12-red-flags",
        heading: "12 Red Flags That Indicate a Rental Scam",
        content:
          "Watch out for these warning signs when searching for a rental property:\n\n**1. Price too good to be true**: If the rent is significantly below market rate for the area, it is almost certainly a scam. Check local averages on our [rent pages](/rent).\n\n**2. Upfront payment before viewing**: Any request for money before you have physically viewed the property is a major red flag. Legitimate landlords never ask for deposits before viewings.\n\n**3. Pressure to act fast**: \"Someone else is about to take it\" or \"Pay today or lose it\" are classic scam tactics designed to stop you thinking clearly.\n\n**4. Cannot view in person**: If the landlord insists on virtual viewings only, claims to be abroad, or keeps cancelling in-person viewings, be suspicious.\n\n**5. Asking for payment by bank transfer to a personal account**: Legitimate agents use client accounts. Private landlords should use the deposit protection scheme.\n\n**6. Photos look professional but generic**: Scammers often steal photos from estate agent listings or other rental sites. Reverse image search the photos on Google.\n\n**7. No written tenancy agreement**: Every legitimate tenancy should have a written agreement before you pay anything.\n\n**8. Landlord cannot answer basic questions**: If they do not know the property's EPC rating, council tax band, or who manages the building, they may not be the real owner.\n\n**9. Using only messaging apps or email**: Refusing to speak on the phone or meet in person is a sign they are hiding their identity.\n\n**10. Property is listed by multiple \"landlords\"**: Search the address online. If the same property appears with different contact details, one (or both) is fraudulent.\n\n**11. Keys handed over without proper process**: A legitimate let involves referencing, deposit protection, and a formal agreement. If someone just hands you keys for cash, something is wrong.\n\n**12. No deposit protection information**: After paying a deposit, you should receive prescribed information about the deposit protection scheme within 30 days. No information means no protection.",
      },
      {
        id: "common-scam-types",
        heading: "The Most Common Rental Scam Types",
        content:
          "**Phantom listings**: The scammer advertises a property they do not own or control, collects deposits from multiple victims, then disappears. They often use real photos from legitimate listings.\n\n**Hijacked listings**: The scammer copies a genuine rental listing but changes the contact details. You think you are dealing with the real landlord or agent, but the money goes to the scammer.\n\n**Fake landlord**: Someone pretending to be the property owner, sometimes even showing you around a property they have access to (e.g. through a short-term let). They collect deposits and first month's rent, then vanish.\n\n**Bait and switch**: You are shown one property but pressured into renting a different (worse) one, often at the last minute when you have already committed.\n\n**Advance fee fraud**: The scammer asks for fees upfront (referencing, admin, holding) that are actually banned under the Tenant Fees Act 2019. They collect the money and disappear.\n\nRental fraud has increased significantly with the growth of online lettings. Action Fraud reports thousands of rental scam cases each year, with average losses of £1,000 to £3,000 per victim.",
      },
      {
        id: "how-to-verify",
        heading: "How to Verify a Property Is Legitimate",
        content:
          "Before paying anything, carry out these checks:\n\n- **View in person**: Always visit the property physically. Never pay without seeing it.\n- **Verify the landlord or agent**: Check if the agent is registered with a regulatory body (The Property Ombudsman, ARLA Propertymark, or RICS). Search the Land Registry (gov.uk) to confirm who owns the property (costs £3).\n- **Google the address**: Search for the property online. Check if it appears on multiple sites with consistent details. Look for reviews of the landlord or agent.\n- **Reverse image search**: Upload the listing photos to Google Images to check if they appear elsewhere.\n- **Check the EPC register**: Every rental property must have a valid EPC. Search at epcregister.com. If the property is not listed, something may be wrong.\n- **Ask for ID**: A legitimate landlord or agent will be happy to provide identification and proof of ownership.\n- **Check the deposit scheme**: After paying a deposit, verify it is protected using DPS, MyDeposits, or TDS search tools.\n\nUse our [property check tool](/check) to verify key details about any property before committing.",
      },
      {
        id: "what-to-do-if-scammed",
        heading: "What to Do If You Suspect a Scam",
        content:
          "If you think you are being scammed or have already been scammed:\n\n- **Stop all communication and payments immediately**.\n- **Report to Action Fraud**: Call 0300 123 2040 or report online at actionfraud.police.uk. This is the national reporting centre for fraud.\n- **Report to the platform**: If the listing was on Rightmove, Zoopla, SpareRoom, or Facebook, report it. Platforms can remove fraudulent listings and may help with investigations.\n- **Contact your bank**: If you paid by bank transfer, contact your bank immediately. Under the Contingent Reimbursement Model (CRM), some banks will refund victims of authorised push payment fraud.\n- **Report to Trading Standards**: Your local Trading Standards team investigates fraudulent business practices.\n- **Keep all evidence**: Save screenshots of the listing, all messages, email addresses, phone numbers, and bank details you sent money to. This helps investigators.\n\nPrevention is far better than cure. Take your time, verify everything, and never pay money to someone you have not met in person at the actual property.",
      },
    ],
    faqs: [
      {
        question: "How common are rental scams in the UK?",
        answer:
          "Action Fraud receives thousands of rental scam reports each year, with victims losing an average of £1,000 to £3,000. The rise of online listings has made scams more common. Always verify the property and landlord before paying anything.",
      },
      {
        question: "Can I get my money back if I was scammed?",
        answer:
          "Report to your bank immediately. Under the CRM code, some banks will refund victims of authorised push payment fraud. Also report to Action Fraud. Recovery is not guaranteed, but acting quickly improves your chances.",
      },
      {
        question: "How do I check if a letting agent is legitimate?",
        answer:
          "Check if they are registered with a professional body: The Property Ombudsman (tpos.co.uk), ARLA Propertymark (arla.co.uk), or RICS (rics.org). All letting agents in England must also belong to a government-approved redress scheme.",
      },
      {
        question: "Is it safe to send a deposit before signing a tenancy agreement?",
        answer:
          "A holding deposit (maximum 1 week's rent) before signing is normal and legal. However, the full deposit and first month's rent should only be paid once you have signed the tenancy agreement and have the keys. Never send large sums before completing the formal process.",
      },
    ],
    relatedSlugs: [
      "what-to-do-if-scammed-by-landlord",
      "what-to-check-before-renting",
      "how-to-check-if-deposit-protected",
      "renting-rights-without-contract",
    ],
  },
  // ---- Article 28: What to do if scammed by landlord ----
  {
    slug: "what-to-do-if-scammed-by-landlord",
    title: "What to Do if You've Been Scammed by a Landlord",
    metaDescription:
      "Step-by-step guide for tenants who have been scammed by a landlord or fake landlord. Covers reporting, getting money back, legal action, and preventing further loss.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 6,
    category: "Safety",
    sections: [
      {
        id: "immediate-steps",
        heading: "Immediate Steps to Take",
        content:
          "If you have been scammed, act quickly. The first 24 to 48 hours are critical:\n\n- **Contact your bank immediately**: Call your bank's fraud team. If you paid by bank transfer, ask them to attempt a recall of the payment. Under the **Contingent Reimbursement Model (CRM)**, participating banks may refund victims of authorised push payment (APP) fraud. The sooner you report, the higher the chance of recovery.\n- **Stop all further payments**: Do not send any more money, even if the scammer pressures you with threats or promises.\n- **Preserve all evidence**: Screenshot every message, email, listing, and receipt. Save phone numbers, email addresses, and bank details used by the scammer. Do not delete anything.\n- **Change your passwords**: If you shared any personal information (ID documents, bank details, employment records), change passwords for your email and banking immediately. Consider a credit check to ensure no identity fraud.\n\nDo not feel embarrassed. Rental scams are sophisticated and affect thousands of people every year. The important thing is to act fast.",
      },
      {
        id: "reporting-the-scam",
        heading: "Who to Report It To",
        content:
          "Report the scam to all relevant authorities:\n\n- **Action Fraud** (0300 123 2040 or actionfraud.police.uk): The UK's national reporting centre for fraud and cybercrime. They will give you a crime reference number, which you need for insurance claims and bank disputes.\n- **Your local police** (101): While Action Fraud handles most fraud reports centrally, report to local police if you feel threatened or if the scammer knows your address.\n- **The listing platform**: Report the fraudulent listing on Rightmove, Zoopla, OpenRent, SpareRoom, Facebook Marketplace, or wherever you found it. Include the crime reference number.\n- **Trading Standards**: Contact your local authority's Trading Standards team, especially if the scammer posed as a letting agent or property professional.\n- **The Property Ombudsman / ARLA**: If the scammer claimed to be a registered agent, report to the relevant professional body.\n- **HMRC** (optional): If the scammer was posing as a landlord collecting rent, HMRC may be interested in the tax fraud element.\n\nFile reports with all relevant bodies. Each has different investigative powers and cooperation between them improves the chances of catching the scammer and recovering funds.",
      },
      {
        id: "getting-money-back",
        heading: "Getting Your Money Back",
        content:
          "Recovery options depend on how you paid:\n\n**Bank transfer (Faster Payments):**\n- Report to your bank within 24 hours if possible\n- Banks participating in the CRM code should refund APP fraud victims if you took reasonable care\n- If your bank refuses, complain to the **Financial Ombudsman Service** (financial-ombudsman.org.uk)\n- Your bank may be able to recover funds if the receiving bank freezes the account in time\n\n**Credit card:**\n- You have strong protection under **Section 75 of the Consumer Credit Act 1974** for payments over £100\n- Contact your credit card provider to initiate a chargeback\n\n**Debit card:**\n- Request a chargeback through your bank. This is not guaranteed but is worth pursuing\n\n**Cash:**\n- Recovery is extremely difficult. Report to Action Fraud and police, but realistically, cash payments are rarely recovered.\n\n**PayPal or similar:**\n- File a dispute through the platform's buyer protection programme. Act within the time limits (usually 180 days).\n\nKeep records of all communications with your bank and any refusal letters. If the bank does not cooperate, escalate to the Financial Ombudsman.",
      },
      {
        id: "preventing-future-scams",
        heading: "Protecting Yourself Going Forward",
        content:
          "After being scammed, take these precautions for future property searches:\n\n- **Always view in person** before paying anything. No exceptions.\n- **Verify property ownership**: Check the Land Registry (£3 per title search at gov.uk/search-property-information-service) to confirm who owns the property.\n- **Use established platforms**: Rightmove and Zoopla listings from registered agents are safer than private ads on social media.\n- **Never pay by bank transfer to a personal account**: Legitimate agents use client accounts regulated by professional bodies.\n- **Check the deposit is protected**: Within 30 days of paying, verify your deposit on DPS, MyDeposits, or TDS.\n- **Trust your instincts**: If something feels wrong, walk away. Legitimate properties and landlords will still be there tomorrow.\n\nUse our [property check tool](/check) to verify details about any property. Cross-reference the EPC register, check crime data, and confirm the postcode exists. If a listing's details do not match what our tool shows, that is a red flag.\n\nIf you have been a victim, consider sharing your experience (anonymously) on forums and review sites to help others avoid the same scam.",
      },
    ],
    faqs: [
      {
        question: "Can I get my money back after being scammed by a landlord?",
        answer:
          "Contact your bank immediately. For bank transfers, banks in the CRM code may refund APP fraud victims. For credit card payments, Section 75 and chargeback offer protection. For cash, recovery is very difficult. The sooner you report, the better your chances.",
      },
      {
        question: "Should I report a rental scam to the police?",
        answer:
          "Yes. Report to Action Fraud (0300 123 2040) for a crime reference number. Also report to your local police (101) if you feel threatened. Report the listing to the platform where you found it and to Trading Standards.",
      },
      {
        question: "How can I check if a landlord is real?",
        answer:
          "Search the Land Registry to confirm property ownership (£3 per search). Verify the agent is registered with a professional body. Check the EPC register for the property. Meet the landlord in person at the property. Never rely solely on information provided by the person claiming to be the landlord.",
      },
      {
        question: "Can I sue a landlord who scammed me?",
        answer:
          "If you can identify the scammer, you can pursue a civil claim for fraud. In practice, many scammers are difficult to trace. The criminal route through Action Fraud and police is usually more effective. If caught, the court can order compensation as part of criminal proceedings.",
      },
    ],
    relatedSlugs: [
      "how-to-spot-rental-scam",
      "what-to-check-before-renting",
      "how-to-check-if-deposit-protected",
      "how-to-report-landlord",
    ],
  },
  {
    slug: "renters-rights-act-2025-key-changes",
    title: "Renters' Rights Act 2025: 10 Key Changes Every Tenant Must Know",
    metaDescription:
      "The Renters' Rights Act 2025 transforms renting in England from 1 May 2026. Section 21 abolished, pet rights, bidding ban, and 8 more changes explained.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 9,
    category: "Rights",
    sections: [
      {
        id: "overview",
        heading: "The Biggest Shake-Up in 35 Years",
        content:
          "The **Renters' Rights Act 2025** received Royal Assent on **27 October 2025** and is the most significant reform to private renting in England since the Housing Act 1988. It replaces the scrapped Renters' Reform Bill and goes further, delivering protections the government called \"the biggest upgrade to renters' rights in a generation.\"\n\nThe Act is being rolled out in phases. Phase 1 took effect on **27 December 2025**, expanding rent repayment orders and granting councils new investigatory powers. Phase 2, the headline package, lands on **1 May 2026** and brings Section 21 abolition, reformed Section 8 grounds, the bidding ban, pet rights, discrimination protections, advance rent caps, and more.\n\nLater milestones include the **PRS Database** (regional rollout expected late 2026), the **PRS Ombudsman** (expected 2028), and the **Decent Homes Standard** extension to private rentals (full compliance by 2035).\n\nThis article covers the 10 key changes you need to understand. Use our [Renters' Rights Act hub](/renters-rights-act) for the full legal breakdown, or run a [property check](/check) to see how your current rental measures up.",
      },
      {
        id: "section-21-abolished",
        heading: "1. Section 21 No-Fault Evictions Abolished",
        content:
          "From **1 May 2026**, landlords in England can no longer serve Section 21 notices. The last date to serve a valid Section 21 notice is **28 April 2026**, and the absolute cutoff for filing a Section 21 court application is **31 July 2026**. After that, no court in England will accept a Section 21 claim.\n\nAll tenancies become periodic (rolling month to month) by default. Fixed-term tenancies are abolished for new agreements. Existing fixed terms already in place before 1 May 2026 will convert to periodic tenancies once they expire.\n\nLandlords who need to recover possession must use **Section 8**, which requires a specific legal ground. This means they must prove a genuine reason, whether that is rent arrears, the landlord wanting to sell, or moving back in. A new **12-month protected period** at the start of every tenancy prevents landlords from using the selling or moving-in grounds during the first year.",
      },
      {
        id: "rent-increases",
        heading: "2. Rent Increase Limits",
        content:
          "All rent increases must now follow the **Section 13 process**. Landlords must serve a formal Section 13 notice giving at least **two months' notice**, and increases are limited to **once per year**.\n\nRent review clauses in tenancy agreements that allow increases by a fixed percentage, formula, or at the landlord's discretion are **no longer valid**. Every increase must go through the statutory route.\n\nCritically, the Act changes how tribunals handle challenges. Previously, a tribunal could set the rent **higher** than the landlord proposed, which deterred tenants from appealing. Now the tribunal can only set the rent at or below the landlord's proposed amount, removing the risk entirely. If you think your rent increase is above market rate, use our [fair rent checker](/fair-rent) to compare local rents before deciding whether to challenge.",
      },
      {
        id: "pet-rights",
        heading: "3. The Right to Request Pets",
        content:
          "Tenants now have a statutory right to request permission to keep a pet. Landlords must respond within **28 days** and cannot unreasonably refuse. If they do not respond, consent is deemed to have been granted.\n\nThe government specifically **removed** the earlier proposal to require tenants to take out pet insurance. There is no insurance requirement in the final Act. Landlords can, however, require the tenant to pay for any damage caused by the pet, and this can be addressed through the deposit.\n\nReasonable grounds for refusal include properties where the lease (in a block of flats, for example) prohibits pets, or where the property is genuinely unsuitable, such as a tiny studio for a large dog. A blanket \"no pets\" policy applied to all properties is likely to be considered unreasonable.\n\nIf your landlord refuses and you believe the refusal is unreasonable, you can challenge it through the **PRS Ombudsman** once it is operational (expected 2028). In the meantime, the local council's enforcement team can investigate blanket bans.",
      },
      {
        id: "bidding-ban",
        heading: "4. Rental Bidding Wars Banned",
        content:
          "It is now illegal for landlords and letting agents to invite or accept offers above the advertised rent. This applies to both the advertising stage and the negotiation stage. If a property is listed at £1,200 per month, the landlord cannot accept £1,400 from a tenant who offers more.\n\nThe penalty for breaching the bidding ban is a **civil penalty of up to £7,000**. Repeated offences can attract higher penalties.\n\nThis does not prevent tenants from voluntarily offering more (though the landlord commits an offence by accepting it), and it does not apply to sitting tenants negotiating a rent change. The ban specifically targets the practice of \"best and final offers\" that has priced out many renters in competitive markets like London and Manchester.\n\nIf you witness or experience rental bidding, report it to your local council's private rented sector enforcement team. You can also use our [report issue tool](/report-issue) to generate a formal complaint letter.",
      },
      {
        id: "discrimination-ban",
        heading: "5. Discrimination Against Tenants Banned",
        content:
          "The Act makes it unlawful for landlords and agents to discriminate against prospective tenants who receive housing benefits or have children. \"No DSS\" and \"no children\" policies are now explicitly illegal, not just discouraged.\n\nLandlords who breach this face civil penalties enforced by local councils. The ban covers advertising, application screening, and tenancy terms. A landlord cannot reject an application solely because the tenant receives Universal Credit, Housing Benefit, or any other form of state support.\n\nThis builds on case law from 2020 (the Shelter and Equality and Human Rights Commission cases that found blanket bans discriminatory), but puts it on a firm statutory footing for the first time.",
      },
      {
        id: "prs-database",
        heading: "6. The PRS Database",
        content:
          "A new **Private Rented Sector Database** will require every landlord in England to register their properties and provide key information including EPC ratings, gas safety certificates, and compliance records. Tenants will be able to search the database to verify their landlord's registration status and compliance history.\n\nThe database is expected to begin **regional rollout in late 2026**, with national coverage following. Landlords who fail to register will face civil penalties and will not be able to use Section 8 to recover possession.\n\nThis is a game-changer for transparency. For the first time, tenants will have a single place to check whether their landlord is legitimate and compliant. Once live, you will be able to access it through our [PRS Database checker](/prs-database) and [landlord check tool](/landlord-check).",
      },
      {
        id: "ombudsman",
        heading: "7. Mandatory PRS Ombudsman",
        content:
          "All private landlords in England will be required to join a new **PRS Ombudsman** service. The ombudsman will handle tenant complaints, investigate disputes, and have the power to order landlords to apologise, carry out repairs, or pay compensation of up to £25,000.\n\nThe ombudsman is expected to be operational by **2028**. Until then, tenants can still use existing routes: local council enforcement, the First-tier Tribunal, and the courts. Once established, the ombudsman will provide a faster, free alternative to court proceedings for most disputes.\n\nLandlords who fail to join the ombudsman scheme will face civil penalties and will not be able to serve Section 8 notices.",
      },
      {
        id: "decent-homes",
        heading: "8. Decent Homes Standard Extended to Private Rentals",
        content:
          "For the first time, the **Decent Homes Standard** will apply to private rented homes, not just social housing. The standard requires properties to meet five criteria: free from serious hazards (Category 1 under the Housing Health and Safety Rating System), in a reasonable state of repair, with reasonably modern facilities, providing adequate thermal comfort, and meeting minimum energy efficiency standards.\n\nThe government estimates that over **20% of private rentals** currently fail this standard. Full compliance is expected by **2035**, giving landlords time to bring properties up to standard.\n\nThis will be enforced by local councils using their existing Housing Act 2004 powers, supplemented by new civil penalty powers under the Renters' Rights Act. Use our [property check](/check) and [damp check](/damp-check) tools to assess whether your rental is likely to meet the standard.",
      },
      {
        id: "awaabs-law",
        heading: "9. Awaab's Law Extended to Private Landlords",
        content:
          "**Awaab's Law**, named after two-year-old Awaab Ishak who died from exposure to mould in a social housing property in Rochdale, sets strict timescales for landlords to investigate and fix hazards like damp and mould. It came into force for social housing in **October 2025**.\n\nThe Renters' Rights Act extends Awaab's Law to **private landlords**. The specific timescales for the private sector are subject to a **separate consultation** that has not yet concluded. Once set, private landlords will face the same legally binding deadlines for responding to reports of damp, mould, and other serious hazards.\n\nIf you are dealing with damp or mould right now, use our [damp and mould checker](/damp-check) to assess the severity and generate an evidence report, then use [report issue](/report-issue) to create a formal letter to your landlord.",
      },
      {
        id: "rent-repayment-orders",
        heading: "10. Rent Repayment Orders Doubled to 24 Months",
        content:
          "Rent repayment orders (RROs) allow tenants to recover rent paid while their landlord was committing certain housing offences. From **27 December 2025** (Phase 1 of the Act), the maximum amount recoverable has been **doubled from 12 months to 24 months** of rent.\n\nNew offences have been added to the list that qualifies for RROs, including:\n\n- Failing to register on the PRS Database (once operational)\n- Failing to join the PRS Ombudsman (once operational)\n- Breaching a banning order\n- Failing to comply with improvement notices\n\nTo apply for an RRO, you submit a claim to the **First-tier Tribunal**. You do not need a solicitor. The tribunal decides the amount based on the severity of the offence, the landlord's conduct, and the tenant's circumstances. Check our [landlord check tool](/landlord-check) to see if your landlord has any known compliance issues that might support an RRO claim.",
      },
    ],
    faqs: [
      {
        question: "When does the Renters' Rights Act 2025 come into force?",
        answer:
          "The Act received Royal Assent on 27 October 2025. Phase 1 (expanded rent repayment orders and council powers) took effect on 27 December 2025. Phase 2 (Section 21 abolition, pet rights, bidding ban, and most other provisions) takes effect on 1 May 2026. The PRS Database is expected in late 2026, and the PRS Ombudsman by 2028.",
      },
      {
        question: "Does the Renters' Rights Act apply to Scotland and Wales?",
        answer:
          "No. The Act applies only to England. Scotland has its own tenancy reforms under the Private Housing (Tenancies) (Scotland) Act 2016, and Wales has the Renting Homes (Wales) Act 2016. Northern Ireland has separate legislation.",
      },
      {
        question: "Can my landlord still evict me after Section 21 is abolished?",
        answer:
          "Yes, but only using Section 8, which requires a specific legal ground such as rent arrears, the landlord wanting to sell, or the landlord moving back in. There is a 12-month protected period at the start of each tenancy during which the selling and moving-in grounds cannot be used.",
      },
      {
        question: "What should I do if my landlord is not complying with the new rules?",
        answer:
          "Report non-compliance to your local council's private rented sector enforcement team. You can also use RenterCheck's report issue tool to generate a formal complaint letter. Once operational, the PRS Ombudsman will be another route for resolving disputes.",
      },
      {
        question: "Will rents go up because of the Renters' Rights Act?",
        answer:
          "The government's impact assessment acknowledged that some landlords may increase rents to offset compliance costs, but the bidding ban and tribunal protections should limit excessive increases. The Act also prevents retaliatory rent increases after tenants exercise their rights.",
      },
    ],
    relatedSlugs: [
      "section-21-abolished-what-next",
      "new-pet-rules-renters-2026",
      "rent-bidding-wars-banned",
      "landlord-fines-2026",
      "rent-repayment-orders-doubled",
    ],
  },
  {
    slug: "section-21-abolished-what-next",
    title: "Section 21 Abolished: What This Means for Your Tenancy",
    metaDescription:
      "Section 21 no-fault evictions end on 1 May 2026. Learn about the new Section 8 grounds, 12-month protected period, and what happens to existing notices.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 8,
    category: "Rights",
    sections: [
      {
        id: "what-happened",
        heading: "Section 21 Is Gone: The Key Dates",
        content:
          "After decades of campaigning, Section 21 of the Housing Act 1988, the \"no-fault eviction\" provision, has been abolished by the **Renters' Rights Act 2025**.\n\nHere are the critical dates:\n\n- **28 April 2026**: The last date a landlord can serve a valid Section 21 notice\n- **1 May 2026**: Section 21 is formally abolished. No new notices can be served from this date.\n- **31 July 2026**: The absolute cutoff for landlords to file a Section 21 possession claim in court. Any notice served before 29 April 2026 must have its court application filed by this date, or the notice expires permanently.\n\nIf you have already received a Section 21 notice, check the dates carefully. If your landlord has not filed a court application by 31 July 2026, the notice is dead and cannot be revived. You do not need to leave.\n\nThis change applies to **all private tenancies in England**, regardless of when they started. There is no exemption for existing tenancies.",
      },
      {
        id: "new-section-8-grounds",
        heading: "The Reformed Section 8 Grounds for Possession",
        content:
          "With Section 21 gone, landlords must use **Section 8** of the Housing Act 1988 to recover possession. The Renters' Rights Act reforms the available grounds:\n\n**Mandatory grounds** (court must grant possession if proved):\n\n| Ground | Reason | Notice period |\n|--------|--------|---------------|\n| Ground 1 | Landlord wants to move back in | 4 months |\n| Ground 1A | Landlord wants to sell | 4 months |\n| Ground 2 | Mortgage lender repossession | 2 months |\n| Ground 6 | Major redevelopment or demolition | 4 months |\n| Ground 7 | Death of tenant (periodic) | 2 months |\n| Ground 8 | Serious rent arrears (2+ months) | 2 weeks |\n| Ground 8A | Repeated rent arrears (3 times in 3 years) | 4 weeks |\n\n**Discretionary grounds** (court decides based on reasonableness):\n\n| Ground | Reason | Notice period |\n|--------|--------|---------------|\n| Ground 10 | Some rent arrears | 2 weeks |\n| Ground 11 | Persistent late payment | 2 weeks |\n| Ground 12 | Breach of tenancy terms | 2 weeks |\n| Ground 14 | Antisocial behaviour | Immediate |\n| Ground 14A | Domestic abuse by partner | 2 months |\n\nNew grounds have been added for properties subject to enforcement action or where a landlord has received a compliance notice they cannot fulfil while tenants remain in the property.",
      },
      {
        id: "protected-period",
        heading: "The 12-Month Protected Period",
        content:
          "A brand new protection under the Renters' Rights Act 2025 is the **12-month protected period**. For the first 12 months of any tenancy, the landlord **cannot use certain grounds** to evict you.\n\nThe grounds that are blocked during the protected period include:\n\n- **Ground 1** (landlord moving back in)\n- **Ground 1A** (landlord selling)\n- **Ground 6** (redevelopment)\n\nThis means a landlord cannot let a property, wait three months, and then claim they need to sell or move in. They must wait at least 12 months from the start of the tenancy before relying on these grounds.\n\nGrounds related to tenant behaviour (rent arrears, antisocial behaviour, breach of tenancy) are **not** restricted by the protected period. A landlord can still act on these at any time if warranted.\n\nThe protected period resets each time a new tenancy is granted. If you renew or move to a new property with the same landlord, a fresh 12-month protection begins.",
      },
      {
        id: "what-tenants-should-do",
        heading: "What Tenants Should Do Now",
        content:
          "If you are a current tenant in England, here is what these changes mean for you:\n\n- **If you have a Section 21 notice**: Check the dates. If your landlord has not applied to court yet, monitor the 31 July 2026 deadline. If they miss it, the notice is void.\n- **If you have a periodic tenancy**: Your tenancy continues as before. You now have stronger protections against eviction.\n- **If you have a fixed-term tenancy**: Once your fixed term expires (or from 1 May 2026 if it has already expired), your tenancy becomes periodic. You can give **2 months' notice** to leave at any time.\n- **If you want to leave**: Tenants can end a periodic tenancy by giving **2 months' notice**. There is no minimum stay period for tenants (the 12-month protected period only restricts landlords).\n\nRun a [property check](/check) to see your property's compliance status and safety score. If your landlord has outstanding issues, this could be useful evidence if they attempt a retaliatory eviction.",
      },
      {
        id: "retaliatory-evictions",
        heading: "Stronger Protection Against Retaliatory Evictions",
        content:
          "The Renters' Rights Act significantly strengthens protections against **retaliatory evictions**. Without Section 21, a landlord can no longer simply serve a no-fault notice after a tenant complains about repairs or exercises their legal rights.\n\nIf a landlord serves a Section 8 notice within 6 months of a tenant raising a legitimate complaint (about repairs, hazards, or other issues), the court can treat it as retaliatory and refuse to grant possession.\n\nLocal councils also have a duty to support tenants facing retaliatory action. If you believe your landlord is trying to evict you in retaliation for asserting your rights, contact your council's housing enforcement team and use our [report issue tool](/report-issue) to document the timeline.",
      },
      {
        id: "student-tenancies",
        heading: "What About Student Tenancies?",
        content:
          "Student tenancies in **purpose-built student accommodation (PBSA)** are treated differently. The Act includes provisions for a new ground for possession specific to student lets, allowing landlords of qualifying student accommodation to recover possession at the end of the academic year.\n\nFor students renting ordinary private properties (houses, flats), the same rules apply as for all other tenants: no Section 21, reformed Section 8 grounds, and the 12-month protected period.\n\nUniversities and accredited student accommodation providers will be able to use the student-specific ground, but only for properties registered as student accommodation. A landlord who happens to rent to students in a normal house cannot use this ground.",
      },
    ],
    faqs: [
      {
        question: "Can my landlord still evict me after 1 May 2026?",
        answer:
          "Yes, but only using Section 8, which requires a specific legal ground. They must prove a genuine reason such as rent arrears, wanting to sell the property, or wanting to move back in. For the first 12 months of your tenancy, the selling and moving-in grounds cannot be used.",
      },
      {
        question: "What happens to my existing Section 21 notice?",
        answer:
          "If a Section 21 notice was served before 29 April 2026, the landlord must file a court application by 31 July 2026 for it to remain valid. If they miss that deadline, the notice expires permanently and cannot be reissued because Section 21 no longer exists.",
      },
      {
        question: "Can I end my tenancy whenever I want under the new rules?",
        answer:
          "Tenants can end a periodic tenancy by giving 2 months' notice at any time. There is no minimum stay period for tenants. If you are in a fixed-term tenancy that has not yet expired, you will need to wait until it converts to periodic or negotiate an early exit with your landlord.",
      },
      {
        question: "Does the 12-month protected period apply to all eviction grounds?",
        answer:
          "No. The protected period blocks grounds related to selling, moving in, and redevelopment. Grounds related to tenant behaviour (rent arrears, antisocial behaviour, breach of tenancy terms) can be used at any time during the tenancy.",
      },
    ],
    relatedSlugs: [
      "renters-rights-act-2025-key-changes",
      "can-landlord-evict-me-for-no-reason",
      "landlord-fines-2026",
      "council-enforcement-powers-2026",
    ],
  },
  {
    slug: "prs-database-tenants-guide",
    title: "The PRS Database: How to Check Your Landlord (When It Launches)",
    metaDescription:
      "The PRS Database will let tenants check landlord registration and compliance. Learn what data it holds, when it launches, and penalties for unregistered landlords.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 7,
    category: "Guides",
    sections: [
      {
        id: "what-is-prs-database",
        heading: "What Is the PRS Database?",
        content:
          "The **Private Rented Sector (PRS) Database** is a new national register of all private landlords and their rental properties in England. It was established by the **Renters' Rights Act 2025** and will be the first compulsory national landlord register in England.\n\nEvery private landlord will be required to register each of their rental properties on the database before letting them to tenants. The database will be operated by a government body and will create a single, searchable source of truth about who owns and manages rental properties.\n\nThis is fundamentally different from existing voluntary landlord registers or local council licensing schemes. The PRS Database is national, compulsory, and carries significant penalties for non-compliance. Think of it as the rental equivalent of the Land Registry, but focused on landlord compliance rather than property ownership.\n\nUntil the PRS Database launches, you can use our [landlord check tool](/landlord-check) to verify your landlord's compliance with existing requirements such as EPC certificates, gas safety, and deposit protection.",
      },
      {
        id: "what-data-it-holds",
        heading: "What Information Will the Database Hold?",
        content:
          "The PRS Database will hold detailed information about both the landlord and the property:\n\n**Landlord information:**\n- Full legal name and contact details\n- Unique landlord identifier\n- Whether they have passed a \"fit and proper person\" test\n- Membership status with the PRS Ombudsman\n- Any banning orders or civil penalties\n- Any rent repayment orders made against them\n\n**Property information:**\n- Full address of each rental property\n- Current EPC rating and certificate\n- Gas safety certificate status\n- Electrical installation condition report status\n- HMO licence status (where applicable)\n- Compliance with the Decent Homes Standard\n- Current tenancy type and rent level\n\nThe government has said tenants will be able to search the database by **property address** to check if a landlord is registered and compliant. This will help tenants make informed decisions before signing a tenancy agreement.",
      },
      {
        id: "when-does-it-launch",
        heading: "When Does the PRS Database Launch?",
        content:
          "The government has indicated a **regional rollout starting in late 2026**, with national coverage following in stages. An exact launch date has not been confirmed yet.\n\nThe rollout is expected to work like this:\n\n1. **Pilot phase** (late 2026): Selected regions will be the first to require landlord registration\n2. **Expansion phase** (2027): Additional regions added\n3. **National coverage**: All private landlords in England required to register\n\nLandlords will be given a notice period to register once their region goes live. The registration process will be online and is expected to cost a modest annual fee (the exact amount has not been confirmed, but the government has said it will be affordable).\n\nWe will update our [PRS Database page](/prs-database) as soon as the launch date is confirmed and the system is accessible. Sign up for our [newsletter](/newsletter) to be notified when it goes live.",
      },
      {
        id: "penalties-for-non-registration",
        heading: "Penalties for Unregistered Landlords",
        content:
          "Landlords who fail to register on the PRS Database face serious consequences:\n\n- **Civil penalties**: Local councils will be able to impose fines on unregistered landlords\n- **Cannot serve Section 8 notices**: An unregistered landlord will not be able to use Section 8 to recover possession of the property\n- **Rent repayment orders**: Tenants can apply for a rent repayment order of up to **24 months' rent** if their landlord has failed to register\n- **Cannot increase rent**: An unregistered landlord will not be able to serve a valid Section 13 rent increase notice\n\nThis creates a strong incentive for compliance. A landlord who does not register essentially loses all their enforcement tools while remaining liable to pay back up to two years of rent.\n\nIf you discover your landlord is not registered once the database is live, report it to your local council and consider applying for a rent repayment order. Our [landlord check tool](/landlord-check) will integrate with the PRS Database as soon as it is available.",
      },
      {
        id: "what-tenants-can-access",
        heading: "What Tenants Can See and Do",
        content:
          "The PRS Database is designed to empower tenants with information. You will be able to:\n\n- **Search by address**: Enter any rental property address to check if it is registered\n- **Verify landlord identity**: Confirm that the person claiming to be the landlord is actually registered as the landlord of that property\n- **Check compliance**: See whether the property has a valid EPC, gas safety certificate, and other required documentation\n- **View enforcement history**: Check if the landlord has any banning orders, civil penalties, or rent repayment orders against them\n\nThis will be particularly useful when choosing a new rental. Before signing a tenancy agreement, you can verify that the landlord is registered and compliant. It will also help identify **rental scams**, since a scammer will not be listed as the registered landlord of the property.\n\nCombine the PRS Database with our [property check](/check) to get a comprehensive picture of both the property and the landlord before committing to a tenancy.",
      },
      {
        id: "how-it-helps-councils",
        heading: "How the PRS Database Helps Enforcement",
        content:
          "For local councils, the PRS Database is a powerful enforcement tool:\n\n- **Identify non-compliant landlords** without relying on tenant complaints\n- **Proactive inspections** targeted at properties flagged as high-risk\n- **Cross-reference** with council tax, HMO licensing, and planning records to find unlicensed HMOs and unregistered landlords\n- **Track repeat offenders** nationally rather than just within a single local authority area\n\nThe government has committed **£18.2 million in enforcement funding** for 2025/26 to help councils prepare for the new regime. This includes hiring enforcement officers, upgrading IT systems, and building capacity for the PRS Database rollout.\n\nCouncils with existing selective licensing schemes will be able to integrate their data with the national database, reducing duplication for landlords who are already licensed locally.",
      },
    ],
    faqs: [
      {
        question: "Is the PRS Database the same as a landlord licensing scheme?",
        answer:
          "No. The PRS Database is a national register that all private landlords must join. Selective and additional licensing schemes are run by individual councils and only cover specific areas. The PRS Database will operate alongside local licensing schemes, not replace them.",
      },
      {
        question: "Will the PRS Database be free for tenants to search?",
        answer:
          "Yes. The government has confirmed that tenants will be able to search the database for free. Landlords will pay a registration fee, but tenant access will be at no cost.",
      },
      {
        question: "What if my landlord refuses to register?",
        answer:
          "An unregistered landlord faces civil penalties, cannot serve Section 8 eviction notices, cannot increase rent using Section 13, and you can apply for a rent repayment order of up to 24 months' rent. Report unregistered landlords to your local council.",
      },
      {
        question: "Can I check the PRS Database now?",
        answer:
          "The PRS Database has not launched yet. Regional rollout is expected in late 2026. In the meantime, use RenterCheck's landlord check tool at rentercheck.co.uk/landlord-check to verify your landlord's existing compliance requirements.",
      },
    ],
    relatedSlugs: [
      "renters-rights-act-2025-key-changes",
      "landlord-fines-2026",
      "council-enforcement-powers-2026",
      "selective-licensing-guide-2026",
    ],
  },
  {
    slug: "new-pet-rules-renters-2026",
    title: "New Pet Rules for Renters 2026: Your Right to Keep Pets",
    metaDescription:
      "Tenants now have a legal right to request pets. Landlords must respond within 28 days and cannot unreasonably refuse. No pet insurance required.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 6,
    category: "Rights",
    sections: [
      {
        id: "the-new-right",
        heading: "Your Statutory Right to Request a Pet",
        content:
          "From **1 May 2026**, every tenant in England has a statutory right to request permission to keep a pet in their rented home. This is one of the most popular provisions of the **Renters' Rights Act 2025** and replaces the previous system where landlords could impose blanket \"no pets\" bans without justification.\n\nThe new rules work as follows:\n\n- You submit a **written request** to your landlord asking for permission to keep a specific pet\n- Your landlord has **28 days** to respond in writing\n- They must either grant consent or refuse with a **specific, reasonable reason**\n- If they do not respond within 28 days, **consent is deemed to have been granted**\n- If they refuse unreasonably, you can challenge the decision\n\nThis applies to all private tenancies in England, including existing tenancies. If you have been wanting to get a pet but your landlord has refused, you can submit a fresh request under the new rules from 1 May 2026.",
      },
      {
        id: "what-counts-as-reasonable-refusal",
        heading: "What Counts as a Reasonable Refusal?",
        content:
          "A landlord can refuse a pet request, but only for **specific, reasonable reasons**. The Act does not list every possible reason, but the government guidance indicates the following are likely to be considered reasonable:\n\n- The **superior lease** (e.g. a flat within a block) prohibits pets and the landlord cannot override this\n- The property is **genuinely unsuitable** for the specific animal (e.g. a large dog in a tiny studio with no outdoor space)\n- The tenant already has multiple pets and adding another would cause **overcrowding**\n- The specific animal poses a **health or safety risk** (e.g. a dangerous breed covered by the Dangerous Dogs Act)\n\nThe following are **not** considered reasonable grounds:\n\n- A general \"no pets\" policy applied to all properties\n- Concerns about damage without evidence (this is what the deposit is for)\n- Personal dislike of animals\n- Worry about noise (this is a tenancy management issue, not grounds for a blanket ban)\n- The property having carpets or new furnishings",
      },
      {
        id: "no-pet-insurance-requirement",
        heading: "No Pet Insurance Requirement",
        content:
          "An earlier draft of the legislation included a provision allowing landlords to require tenants to take out **pet damage insurance**. This was **specifically removed** from the final Act.\n\nThe government decided that requiring pet insurance would create a financial barrier that undermined the right to keep pets, particularly for tenants on lower incomes. Instead, the existing deposit framework is considered sufficient to cover any pet damage.\n\nYour landlord can:\n\n- Deduct from your deposit at the end of the tenancy for **actual damage** caused by your pet (beyond fair wear and tear)\n- Include a clause in the tenancy agreement making you responsible for repairing any pet damage\n\nYour landlord **cannot**:\n\n- Require you to take out pet insurance as a condition of consent\n- Charge an additional pet deposit or pet fee (this would breach the Tenant Fees Act 2019)\n- Increase your rent specifically because you have a pet",
      },
      {
        id: "how-to-make-a-request",
        heading: "How to Request Permission for a Pet",
        content:
          "Follow these steps to make a formal pet request:\n\n1. **Put it in writing**: Send an email or letter to your landlord. Keep a copy.\n2. **Be specific**: Name the type and breed of animal, and how many. \"I would like to keep one medium-sized dog, a Labrador Retriever\" is better than \"I want a pet.\"\n3. **Address concerns proactively**: Mention that you will be responsible for any damage, that the pet is house-trained (if applicable), and any steps you will take to minimise impact.\n4. **Reference the law**: State that you are making a request under the pet provisions of the Renters' Rights Act 2025 and that you expect a response within 28 days.\n5. **Keep records**: Save the sent email or get proof of posting for a letter.\n\nIf your landlord does not respond within 28 days, consent is automatically granted. If they refuse, they must provide specific reasons in writing. If you believe the refusal is unreasonable, you can escalate to the PRS Ombudsman (once operational) or to your local council's enforcement team.\n\nUse our [report issue tool](/report-issue) to generate a formal request letter if you need help drafting one.",
      },
      {
        id: "existing-tenants",
        heading: "What About Existing \"No Pets\" Clauses?",
        content:
          "If your tenancy agreement currently contains a \"no pets\" clause, the new rules **override** it from 1 May 2026. A contractual ban on pets cannot prevent you from exercising your statutory right to request a pet.\n\nHowever, the clause does not automatically become void. You still need to follow the request process described above. The difference is that your landlord can no longer simply point to the clause and refuse. They must engage with your request and provide specific, reasonable grounds if they want to say no.\n\nFor tenants who already have a pet in breach of a \"no pets\" clause, the sensible approach is to submit a formal request under the new rules from 1 May 2026. This regularises your position and protects you from any argument that you breached the tenancy terms.\n\nLandlords who try to evict tenants solely for having a pet after the new rules take effect will struggle to succeed. The courts will expect them to have followed the new consent process.",
      },
    ],
    faqs: [
      {
        question: "Can my landlord still say no to pets?",
        answer:
          "Only for specific, reasonable reasons. Blanket \"no pets\" policies are no longer valid. Your landlord must respond to a pet request within 28 days with either consent or a specific, reasonable reason for refusal. If they do not respond, consent is deemed granted.",
      },
      {
        question: "Do I need to get pet insurance for my rental?",
        answer:
          "No. The government specifically removed the pet insurance requirement from the final Act. Your landlord cannot require you to take out pet insurance as a condition of keeping a pet. They can, however, deduct from your deposit for actual pet damage at the end of the tenancy.",
      },
      {
        question: "Can my landlord charge a pet deposit or pet fee?",
        answer:
          "No. The Tenant Fees Act 2019 prohibits additional charges beyond the permitted list (rent, deposit capped at 5 weeks, holding deposit capped at 1 week). A separate pet deposit, pet fee, or pet rent would breach this Act.",
      },
      {
        question: "What pets are covered by the new rules?",
        answer:
          "The Act does not specify a list of permitted pets. Any animal can be the subject of a request. However, landlords may reasonably refuse exotic or dangerous animals, or animals unsuitable for the property type. Common household pets like dogs, cats, small caged animals, and fish are unlikely to be refused without strong justification.",
      },
      {
        question: "When can I submit a pet request under the new rules?",
        answer:
          "The pet provisions take effect on 1 May 2026. You can submit a request from that date. If you submit before 1 May 2026, the 28-day clock does not apply and your landlord can refuse under existing rules.",
      },
    ],
    relatedSlugs: [
      "renters-rights-act-2025-key-changes",
      "can-landlord-refuse-pets",
      "renting-rights-without-contract",
      "how-to-report-landlord",
    ],
  },
  {
    slug: "rent-bidding-wars-banned",
    title: "Rental Bidding Wars Are Now Illegal: What You Need to Know",
    metaDescription:
      "Rental bidding is now illegal in England with fines up to £7,000. Learn what the ban covers, how to report violations, and your rights as a tenant.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 5,
    category: "Rights",
    sections: [
      {
        id: "what-is-the-bidding-ban",
        heading: "What the Bidding Ban Means",
        content:
          "From **1 May 2026**, it is a criminal offence for landlords and letting agents in England to invite or accept rental bids above the advertised price. This was introduced by the **Renters' Rights Act 2025** to tackle the growing practice of \"best and final offers\" that had turned finding a rental into an auction.\n\nThe ban works simply: if a property is advertised at a certain rent, that is the maximum the landlord or agent can accept. They cannot:\n\n- Ask prospective tenants to \"make their best offer\"\n- Accept a higher offer from one applicant over another\n- Advertise at one price and then tell applicants the actual rent is higher\n- Use phrases like \"offers over\" or \"guide price\" for rental listings\n- Encourage tenants to compete on price during viewings\n\nThe only price the landlord can charge is the one stated in the advertisement. If no price is advertised, the landlord cannot accept rent above the first price quoted to a prospective tenant.",
      },
      {
        id: "penalties",
        heading: "Penalties for Breaking the Bidding Ban",
        content:
          "Landlords and letting agents who breach the bidding ban face **civil penalties of up to £7,000** for a first offence. The penalty is imposed by the local council and does not require a court conviction.\n\nFor **repeat offences**, the penalties escalate. A landlord or agent with a history of bidding ban breaches can face higher civil penalties and, in serious cases, a **banning order** that prevents them from letting properties or engaging in property management.\n\nLetting agents who systematically encourage bidding can also face action from their **redress scheme** (either The Property Ombudsman or the Property Redress Scheme), which could include expulsion from the scheme, effectively preventing them from operating as a letting agent.\n\nThe penalties apply to the person who **invites or accepts** the higher offer. If a letting agent encourages bidding on behalf of a landlord, both the agent and the landlord could face enforcement action.",
      },
      {
        id: "what-is-still-allowed",
        heading: "What Is Still Allowed",
        content:
          "The bidding ban does not prevent every form of rent negotiation. Here is what is still permitted:\n\n- **Tenants can offer less**: You can negotiate the rent downward. The ban only applies to rents above the advertised price.\n- **Existing tenants can negotiate**: If you are already renting and your landlord proposes a rent increase via Section 13, you can negotiate the amount. The bidding ban only applies to new lettings.\n- **Landlords can choose between applicants**: The ban is about price, not selection. A landlord can still choose the applicant they consider most suitable based on references, employment, and affordability checks.\n- **Different prices for different properties**: A landlord with multiple properties can set different rents for each one. The ban only prevents accepting more than the advertised price for a specific property.\n- **Adjusting the advertised price**: A landlord can re-advertise a property at a different price (higher or lower) before accepting a tenant. They just cannot accept an offer above whatever price is currently advertised.",
      },
      {
        id: "how-to-report",
        heading: "How to Report a Bidding Violation",
        content:
          "If you encounter a landlord or letting agent inviting or accepting bids above the advertised rent, here is how to report it:\n\n1. **Gather evidence**: Screenshot the listing showing the advertised price. Save any emails, texts, or messages where the landlord or agent invited higher offers or confirmed a higher rent was accepted.\n2. **Report to the local council**: Contact the environmental health or private rented sector enforcement team at the council where the property is located. Most councils have an online complaint form.\n3. **Report to the redress scheme**: If a letting agent is involved, report them to their redress scheme (The Property Ombudsman or Property Redress Scheme). All agents must belong to one.\n4. **Report to Trading Standards**: If the behaviour is systematic (the agent does it across multiple listings), report to Trading Standards for potential unfair trading practices.\n\nYou can use our [report issue tool](/report-issue) to generate a formal complaint letter documenting the bidding violation with evidence. Keep all original evidence, as the council may need it for enforcement proceedings.",
      },
      {
        id: "impact-on-market",
        heading: "How the Ban Affects the Rental Market",
        content:
          "Rental bidding had become endemic in high-demand areas. Research by Generation Rent found that **one in three renters** in London had experienced bidding wars, with successful applicants paying an average of **£2,400 per year more** than the advertised rent.\n\nThe ban is designed to restore transparency and fairness. Critics argue that it could lead to landlords simply advertising at higher starting prices, effectively baking the premium in. Supporters counter that transparent pricing is still better than opaque bidding, because tenants can see the actual cost upfront and make informed decisions.\n\nEarly signs since the ban was announced suggest some recalibration in the market. Letting agents are adjusting their practices, and tenants are more willing to report violations knowing that enforcement tools now exist.\n\nIf you are searching for a rental and see signs of bidding, do not participate. Document it and report it. The more reports councils receive, the stronger enforcement will become.",
      },
    ],
    faqs: [
      {
        question: "What is the fine for rental bidding?",
        answer:
          "Landlords and letting agents face civil penalties of up to £7,000 for a first offence. Repeat offences can attract higher penalties and potentially a banning order preventing them from letting properties.",
      },
      {
        question: "Can I still negotiate rent downward?",
        answer:
          "Yes. The bidding ban only prevents rents above the advertised price. You are free to offer less than the advertised rent, and the landlord is free to accept or decline your lower offer.",
      },
      {
        question: "What if a letting agent asks me to offer more than the listed rent?",
        answer:
          "This is a breach of the bidding ban. Do not offer more. Screenshot the request as evidence and report it to the local council where the property is located, and to the agent's redress scheme (The Property Ombudsman or Property Redress Scheme).",
      },
      {
        question: "Does the bidding ban apply to existing tenancies?",
        answer:
          "No. The ban applies to new lettings and advertising. If you are an existing tenant, rent increases are handled through the Section 13 process, which has its own rules and protections.",
      },
    ],
    relatedSlugs: [
      "renters-rights-act-2025-key-changes",
      "can-landlord-increase-rent",
      "how-to-report-landlord",
      "landlord-fines-2026",
    ],
  },
  {
    slug: "landlord-fines-2026",
    title: "Landlord Fines 2026: Complete Guide to Civil Penalties",
    metaDescription:
      "Full table of landlord civil penalties under the Renters' Rights Act 2025. Starting amounts for every offence, how councils decide, and how to report.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 8,
    category: "Rights",
    sections: [
      {
        id: "civil-penalties-overview",
        heading: "How Civil Penalties Work",
        content:
          "The **Renters' Rights Act 2025** significantly expands the civil penalty regime for landlord offences in England. Civil penalties are financial fines imposed by **local councils** without the need for a court prosecution. They were introduced by the Housing and Planning Act 2016 and have now been extended to cover a wide range of new offences.\n\nKey features of the civil penalty system:\n\n- Councils can impose penalties of up to **£7,000** for most offences and up to **£40,000** for more serious or repeat offences\n- Penalties are an alternative to prosecution (councils choose one or the other)\n- The landlord has 28 days to make representations before a penalty is finalised\n- The landlord can appeal to the First-tier Tribunal within 28 days of the final notice\n- **Councils keep 100% of the penalty revenue**, which funds further enforcement\n\nThe government has published guidance on **starting amounts** for each offence, but councils have discretion to adjust based on the specific circumstances of each case.",
      },
      {
        id: "starting-amounts-table",
        heading: "Civil Penalty Starting Amounts by Offence",
        content:
          "The following table shows the government's recommended starting amounts for civil penalties under the Renters' Rights Act 2025 and related housing legislation:\n\n**Renters' Rights Act 2025 offences:**\n\n| Offence | Starting amount |\n|---------|----------------|\n| Failing to register on the PRS Database | £5,000 |\n| Providing false information to the PRS Database | £7,000 |\n| Failing to join the PRS Ombudsman | £5,000 |\n| Rental bidding (inviting/accepting above advertised rent) | £7,000 |\n| Failing to respond to a pet request within 28 days | £3,000 |\n| Unreasonable refusal of a pet request | £5,000 |\n| Discrimination against tenants on benefits | £5,000 |\n| Discrimination against tenants with children | £5,000 |\n| Breaching advance rent cap (more than 1 month in advance) | £5,000 |\n| Failing to comply with Decent Homes Standard | £7,000 |\n\n**Existing Housing Act offences (updated starting amounts):**\n\n| Offence | Starting amount |\n|---------|----------------|\n| Failure to comply with improvement notice | £5,000 |\n| Operating an unlicensed HMO | £10,000 |\n| Breaching HMO licence conditions | £5,000 |\n| Failure to protect a deposit | Via courts |\n| Illegal eviction or harassment | Criminal prosecution |\n\nThese are starting points. Councils adjust upward for repeat offenders, deliberate breaches, or large portfolios, and downward for first offences, prompt compliance, or genuine mistakes.",
      },
      {
        id: "how-councils-decide",
        heading: "How Councils Decide the Penalty Amount",
        content:
          "When setting a civil penalty, councils follow a structured framework based on government guidance:\n\n**Step 1: Determine the starting amount** from the government's recommended table.\n\n**Step 2: Consider aggravating factors** (which increase the penalty):\n- History of non-compliance or previous penalties\n- Deliberate or reckless behaviour\n- Large property portfolio (suggesting a professional landlord who should know better)\n- Vulnerability of the affected tenants\n- Duration of the offence\n- Financial gain from the offence\n\n**Step 3: Consider mitigating factors** (which reduce the penalty):\n- First offence with no history of non-compliance\n- Early admission and prompt remedial action\n- Genuine ignorance (not a defence, but may reduce severity)\n- Limited financial gain\n- Evidence of good character and otherwise good landlord practice\n\n**Step 4: Ensure the penalty is proportionate** to the offence and the landlord's circumstances.\n\n**Step 5: Consider the landlord's ability to pay**. Councils can request financial information, but inability to pay does not automatically reduce the penalty if the offence is serious.\n\nThe final penalty can range from a few hundred pounds to the maximum of £7,000 (or £40,000 for the most serious offences). Councils must issue a written notice explaining how they arrived at the amount.",
      },
      {
        id: "repeat-offenders",
        heading: "Repeat Offenders and Banning Orders",
        content:
          "Landlords who accumulate civil penalties face escalating consequences:\n\n- **Higher penalties**: Each subsequent offence attracts a higher starting amount, with the maximum reaching **£40,000** for serious or repeat breaches\n- **Banning orders**: Local councils can apply to the First-tier Tribunal for a banning order against a landlord who has been convicted of a banning order offence or has received two or more civil penalties within 12 months\n- **Rogue landlord database**: Landlords subject to banning orders are listed on the national rogue landlord database, accessible to councils across England\n- **Rent repayment orders**: Tenants of repeat offenders can apply for rent repayment orders of up to 24 months' rent\n\nA **banning order** prevents a landlord from letting property, engaging in property management, or being involved in any letting agency work. Breach of a banning order is a criminal offence carrying an unlimited fine and/or imprisonment.\n\nThe PRS Database will make it much harder for banned landlords to re-enter the market under a different identity, since registration will require identity verification.",
      },
      {
        id: "how-to-report",
        heading: "How to Report a Non-Compliant Landlord",
        content:
          "If your landlord is breaking the rules, here is how to trigger enforcement:\n\n1. **Document the breach**: Gather evidence including photos, emails, screenshots of listings, copies of notices, and dates. The more evidence you have, the stronger the case.\n2. **Contact your local council**: Reach out to the **environmental health**, **private rented sector**, or **housing enforcement** team. Most councils have an online complaint form or a dedicated housing complaints email.\n3. **Be specific**: Tell the council exactly which offence you believe has been committed and provide the evidence. Reference the specific section of the Act if you can.\n4. **Follow up**: Ask for a reference number and follow up after 14 days if you have not heard back.\n\nCouncils are incentivised to act because they **keep 100% of civil penalty revenue**. With £18.2 million in new enforcement funding for 2025/26, many councils are expanding their teams and actively looking for breaches to pursue.\n\nUse our [report issue tool](/report-issue) to generate a formal complaint letter, or run a [landlord check](/landlord-check) to see if your landlord has existing compliance issues. You can also check our guide on [how to report your landlord](/blog/how-to-report-landlord) for a step-by-step walkthrough.",
      },
    ],
    faqs: [
      {
        question: "What is the maximum fine a landlord can receive?",
        answer:
          "Most offences carry a maximum civil penalty of £7,000 for a first offence. For serious or repeat offences, the maximum is £40,000. Criminal prosecution (for offences like illegal eviction) can result in unlimited fines.",
      },
      {
        question: "Do councils actually enforce civil penalties?",
        answer:
          "Yes, and enforcement is increasing. Councils retain 100% of penalty revenue, creating a financial incentive. The government has provided £18.2 million in enforcement funding for 2025/26 specifically to expand council enforcement capacity.",
      },
      {
        question: "Can I report my landlord anonymously?",
        answer:
          "Most councils accept anonymous reports, though providing your contact details helps them investigate more effectively. If you are worried about retaliation, remember that retaliatory eviction is illegal under the Renters' Rights Act 2025 and Section 21 no-fault evictions have been abolished.",
      },
      {
        question: "How long does the enforcement process take?",
        answer:
          "From initial report to penalty, the process typically takes 2 to 6 months. The council must investigate, issue a notice of intent, allow 28 days for the landlord to respond, and then issue a final notice. The landlord then has 28 days to appeal to the tribunal.",
      },
    ],
    relatedSlugs: [
      "renters-rights-act-2025-key-changes",
      "civil-penalties-landlords-complete-list",
      "council-enforcement-powers-2026",
      "how-to-report-landlord",
    ],
  },
  {
    slug: "rent-repayment-orders-doubled",
    title: "Rent Repayment Orders Doubled to 24 Months: How to Claim",
    metaDescription:
      "Rent repayment orders now cover up to 24 months of rent. New offences added from 27 Dec 2025. Learn how to apply and what you can claim back.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 7,
    category: "Money",
    sections: [
      {
        id: "what-are-rros",
        heading: "What Are Rent Repayment Orders?",
        content:
          "A **rent repayment order (RRO)** is a tribunal order requiring a landlord to repay rent to a tenant (or to the local council if the rent was paid by housing benefit). RROs were introduced by the Housing Act 2004 and have been significantly strengthened by the **Renters' Rights Act 2025**.\n\nThe key change, effective from **27 December 2025** (Phase 1), is that the maximum amount a tenant can claim has been **doubled from 12 months to 24 months** of rent. This means if your landlord has been committing a qualifying offence for two years, you could recover the entire two years of rent you paid during that period.\n\nRROs are a powerful tool because they do not require a criminal conviction. You apply directly to the **First-tier Tribunal (Property Chamber)**, and the burden of proof is the civil standard (balance of probabilities), which is easier to meet than the criminal standard.\n\nTo check if your landlord might be committing qualifying offences, use our [landlord check tool](/landlord-check) to verify EPC, gas safety, and licensing compliance.",
      },
      {
        id: "qualifying-offences",
        heading: "Which Offences Qualify for an RRO?",
        content:
          "You can apply for a rent repayment order if your landlord has committed any of the following offences:\n\n**Original offences (Housing Act 2004/2016):**\n- Operating an **unlicensed HMO** (or breach of HMO licence conditions)\n- Using violence to secure entry (Criminal Law Act 1977)\n- Illegal eviction or harassment (Protection from Eviction Act 1977)\n- Failure to comply with an **improvement notice** (Housing Act 2004)\n- Failure to comply with a **prohibition order** (Housing Act 2004)\n- Breach of a **banning order** (Housing and Planning Act 2016)\n\n**New offences added by the Renters' Rights Act 2025:**\n- Failing to register on the **PRS Database** (once operational)\n- Failing to join the **PRS Ombudsman** (once operational)\n- Breaching the **rental bidding ban**\n- Breaching the **advance rent cap** (charging more than 1 month in advance)\n- Discriminating against tenants on **benefits or with children**\n\nThe expansion of qualifying offences means many more tenants will have grounds for an RRO. Even offences that seem minor (like failing to register on the PRS Database) can now trigger a claim worth tens of thousands of pounds.",
      },
      {
        id: "how-to-apply",
        heading: "How to Apply for a Rent Repayment Order",
        content:
          "Here is the step-by-step process for claiming an RRO:\n\n**Step 1: Gather evidence**\nDocument the offence. For an unlicensed HMO, check with your council's licensing team. For illegal eviction, gather texts, emails, and witness statements. For missing certificates, check the EPC register and ask for copies of gas safety and electrical certificates. Use our [landlord check tool](/landlord-check) to run a quick compliance scan.\n\n**Step 2: Check with the council (optional but helpful)**\nYou can ask your local council to confirm whether an offence has been committed. Some councils will issue a statement confirming non-compliance, which strengthens your case. Some councils also pursue their own RRO applications for rent paid by housing benefit.\n\n**Step 3: Apply to the First-tier Tribunal**\nComplete form **RRO1** (available on the tribunal's website) and submit it along with your evidence. The application fee is currently around **£100 to £300** depending on the amount claimed.\n\n**Step 4: The hearing**\nThe tribunal will schedule a hearing (usually within 2 to 4 months). You can attend in person or online. You do not need a solicitor, but having one can help for complex cases.\n\n**Step 5: The decision**\nThe tribunal decides the amount based on the severity of the offence, the landlord's conduct, and any financial hardship the order might cause the landlord. The maximum is now **24 months' rent**.\n\nImportant: You must apply within **12 months** of the offence ending (or of becoming aware of it). Do not delay if you suspect your landlord is committing an offence.",
      },
      {
        id: "how-much-can-you-claim",
        heading: "How Much Can You Claim?",
        content:
          "The tribunal has discretion over the amount, up to a maximum of **24 months' rent** paid during the period the offence was being committed.\n\nFactors the tribunal considers include:\n\n- **Severity of the offence**: A deliberate unlicensed HMO will attract a higher award than a technical compliance lapse\n- **Duration**: The longer the offence continued, the higher the potential award\n- **Landlord's conduct**: Did they try to rectify the issue once made aware? Were they cooperative?\n- **Financial impact on the tenant**: If the offence caused the tenant additional costs (e.g. health issues from an unsafe property)\n- **Landlord's financial circumstances**: Not a bar to an order, but the tribunal can consider ability to pay\n\n**Practical examples:**\n\n- If your rent is £1,000/month and your landlord ran an unlicensed HMO for 2 years: maximum claim of **£24,000**\n- If your rent is £800/month and your landlord failed to register on the PRS Database for 6 months: maximum claim of **£4,800**\n- If your rent is £1,500/month and your landlord illegally evicted you after 18 months: maximum claim of **£36,000**\n\nIn practice, tribunals rarely award the full amount for first offences, but awards of 6 to 12 months' rent are common for proven offences.",
      },
      {
        id: "can-council-tenants-claim",
        heading: "Housing Benefit and Universal Credit Tenants",
        content:
          "If your rent is paid (wholly or partly) by **housing benefit** or the housing element of **Universal Credit**, you can still apply for an RRO. The tribunal will consider the total rent paid, regardless of the source.\n\nHowever, if the housing benefit was paid directly to the landlord by the council, the council itself can apply for an RRO to recover that money. In practice, many councils now actively pursue RROs to recover housing benefit overpayments from rogue landlords.\n\nIf the rent was partly paid by you and partly by housing benefit, you can claim for your portion and the council can claim for theirs, or you can coordinate.\n\nThis is particularly relevant because the Renters' Rights Act 2025 now explicitly bans discrimination against tenants on benefits. A landlord who refused to rent to you because you receive Universal Credit has committed an offence that qualifies for an RRO.",
      },
      {
        id: "practical-tips",
        heading: "Practical Tips for a Successful Claim",
        content:
          "Based on tribunal outcomes, here are tips to maximise your chances:\n\n- **Keep all rent receipts and bank statements**: You need to prove how much rent you paid and when\n- **Get council confirmation**: A letter from the council confirming the offence adds significant weight\n- **Apply promptly**: The 12-month deadline is strict. Do not wait.\n- **Be organised**: Present your evidence clearly and chronologically. Tribunals appreciate well-prepared cases.\n- **Consider legal help**: While not required, organisations like **Shelter**, **Citizens Advice**, and some **law centres** can help with RRO applications for free or at low cost\n- **Join forces**: If you live in an HMO, all tenants can apply for individual RROs against the same landlord. Coordinating strengthens each case.\n\nRent repayment orders are one of the most powerful tools tenants have. The doubling to 24 months makes them a genuine financial deterrent for rogue landlords. If you suspect your landlord is committing an offence, do not leave money on the table.",
      },
    ],
    faqs: [
      {
        question: "When did rent repayment orders increase to 24 months?",
        answer:
          "The increase from 12 to 24 months took effect on 27 December 2025 as part of Phase 1 of the Renters' Rights Act 2025. It applies to offences committed on or after that date.",
      },
      {
        question: "Do I need a solicitor to apply for a rent repayment order?",
        answer:
          "No. You can apply directly to the First-tier Tribunal yourself. The process is designed to be accessible without legal representation. However, free legal help is available from Shelter, Citizens Advice, and local law centres if you need support.",
      },
      {
        question: "Can I claim a rent repayment order if I have already moved out?",
        answer:
          "Yes, as long as you apply within 12 months of the offence ending or within 12 months of becoming aware of it. You do not need to be a current tenant to make a claim.",
      },
      {
        question: "What happens if my landlord cannot pay the rent repayment order?",
        answer:
          "A tribunal order is legally enforceable. If the landlord does not pay, you can enforce the order through the county court, which can use methods including attachment of earnings, charging orders on property, or bailiff action.",
      },
      {
        question: "Can I get an RRO and a civil penalty at the same time?",
        answer:
          "Yes. The council can impose a civil penalty on the landlord while you separately apply for a rent repayment order. These are independent processes and one does not prevent the other.",
      },
    ],
    relatedSlugs: [
      "renters-rights-act-2025-key-changes",
      "landlord-fines-2026",
      "how-to-claim-compensation-from-landlord",
      "how-to-report-landlord",
    ],
  },
  {
    slug: "council-enforcement-powers-2026",
    title: "New Council Enforcement Powers Under the Renters' Rights Act",
    metaDescription:
      "Councils gain major new powers from Dec 2025: bank account access, civil penalties up to £40,000, and £18.2m funding. Guide for officers and tenants.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 8,
    category: "Guides",
    sections: [
      {
        id: "overview-of-new-powers",
        heading: "A Step Change in Council Enforcement",
        content:
          "The **Renters' Rights Act 2025** gives local councils in England their most significant enforcement upgrade in two decades. Phase 1, which took effect on **27 December 2025**, introduced expanded investigatory powers and new financial recovery tools. Phase 2 (from **1 May 2026**) adds a range of new offences that councils can enforce against.\n\nThe headline changes include:\n\n- New powers to request information from **banks, building societies, and accountants** during investigations\n- Powers to request information from **tenancy deposit protection schemes** and **client money protection schemes**\n- Expanded **civil penalty** framework covering over 20 offences\n- **Councils retain 100% of civil penalty revenue** (ring-fenced for housing enforcement)\n- **£18.2 million** in new enforcement funding for 2025/26 to help councils build capacity\n\nThese powers apply to all local housing authorities in England. Combined with the PRS Database (expected late 2026), they represent a fundamental shift from reactive, complaint-driven enforcement to a proactive, intelligence-led model.",
      },
      {
        id: "investigatory-powers",
        heading: "New Investigatory Powers",
        content:
          "Before the Renters' Rights Act, councils often struggled to investigate rogue landlords because they could not access financial records or trace landlord identities. The Act changes this dramatically.\n\n**Banks and building societies**: Councils can now serve information notices on banks and building societies requiring them to disclose account details, transaction histories, and account holder information linked to a specific investigation. This helps trace rental income, identify undisclosed properties, and build evidence for civil penalties.\n\n**Accountants and tax advisers**: Similarly, councils can require accountants to provide information about a landlord's property portfolio, rental income, and business structure. This is particularly useful for tracking landlords who operate through complex company structures.\n\n**Tenancy deposit protection schemes**: Councils can request data from DPS, MyDeposits, and TDS to identify unregistered properties, check deposit compliance, and cross-reference with licensing and enforcement records.\n\n**Client money protection schemes**: Letting agents must protect client money (rent, deposits) in approved schemes. Councils can now access scheme records to investigate agents suspected of mishandling client funds.\n\nThese powers require a formal notice and can only be used in connection with a genuine investigation. They are subject to data protection safeguards and cannot be used for fishing expeditions.",
      },
      {
        id: "civil-penalties-framework",
        heading: "The Civil Penalties Framework",
        content:
          "The civil penalty system introduced by the Housing and Planning Act 2016 has been significantly expanded. Councils can now impose financial penalties for a much wider range of offences:\n\n**New offences enforceable by civil penalty:**\n- Failing to register on the PRS Database\n- Providing false information to the PRS Database\n- Failing to join the PRS Ombudsman\n- Rental bidding (inviting/accepting above advertised rent)\n- Unreasonable refusal of a pet request\n- Discrimination against tenants on benefits or with children\n- Breaching the advance rent cap\n- Failing to comply with the Decent Homes Standard\n\n**Penalty ranges:**\n- First offences: starting amounts typically **£3,000 to £10,000** depending on the offence\n- Repeat offences: up to **£40,000**\n- Most serious cases: criminal prosecution with unlimited fines\n\nCouncils use a **structured framework** to determine penalty amounts, considering the severity of the offence, the landlord's track record, whether the breach was deliberate, the vulnerability of affected tenants, and the financial gain from non-compliance.\n\nFor council enforcement officers looking for the complete penalty table, see our detailed guide on [civil penalties for landlords](/blog/civil-penalties-landlords-complete-list).",
      },
      {
        id: "revenue-retention",
        heading: "Councils Keep 100% of Penalty Revenue",
        content:
          "A crucial detail of the enforcement framework is that **councils retain all civil penalty income**. This revenue must be ring-fenced for housing enforcement activities, meaning every penalty imposed funds further enforcement capacity.\n\nThis creates a virtuous cycle: more enforcement leads to more penalty income, which funds more enforcement staff, technology, and inspections. Councils that invest in strong enforcement teams can become self-funding over time.\n\nThe **£18.2 million in government funding** for 2025/26 is designed to help councils build initial capacity. This covers:\n\n- Hiring and training enforcement officers\n- Upgrading IT systems and databases\n- Preparing for PRS Database integration\n- Building legal capacity for penalty proceedings and tribunal work\n\nSome councils are already making significant use of civil penalties. In 2024/25, London boroughs collectively imposed over **£10 million** in civil penalties on private landlords. With the expanded offence list, this figure is expected to grow substantially.",
      },
      {
        id: "selective-licensing-changes",
        heading: "Simplified Selective Licensing",
        content:
          "The Renters' Rights Act also simplified the selective licensing process. Since **December 2024**, councils no longer need **Secretary of State approval** for selective licensing schemes. This removes a significant bureaucratic hurdle that previously delayed or prevented schemes from being introduced.\n\nCouncils can now:\n\n- Introduce selective licensing schemes covering up to **20% of their area** or **20% of their private rented properties** without central government approval\n- Larger schemes still require consultation but not ministerial sign-off\n- Combine selective licensing with the PRS Database for streamlined compliance monitoring\n\nThis has already led to a surge in new selective licensing proposals. Over **60 councils** now have active or planned selective licensing schemes, with more in development.\n\nFor a full guide to selective licensing schemes across England, see our [selective licensing guide](/blog/selective-licensing-guide-2026).",
      },
      {
        id: "what-tenants-should-know",
        heading: "What This Means for Tenants",
        content:
          "Stronger council enforcement directly benefits tenants:\n\n- **Faster response to complaints**: With more funding and staff, councils can investigate tenant reports more quickly\n- **Proactive inspections**: Councils do not need to wait for complaints. They can use the PRS Database and other intelligence sources to target inspections at high-risk properties\n- **Greater deterrence**: Higher penalties and better detection mean landlords are more likely to comply with the law\n- **No retaliation risk**: With Section 21 abolished, landlords cannot evict you for reporting them to the council\n\nIf you have concerns about your rental property, report them to your local council. Use our [property check tool](/check) to identify potential issues, and our [report issue tool](/report-issue) to generate a formal complaint letter.\n\nYou can also check whether your area has a selective licensing scheme using our [landlord register tool](/landlord-register), which may give the council additional enforcement powers.",
      },
    ],
    faqs: [
      {
        question: "Can councils really access my landlord's bank accounts?",
        answer:
          "Yes, but only as part of a formal investigation into a suspected housing offence. Councils must serve an information notice and can only request data relevant to the specific investigation. They cannot conduct fishing expeditions or access accounts without reasonable grounds.",
      },
      {
        question: "How much funding have councils received for enforcement?",
        answer:
          "The government allocated £18.2 million in enforcement funding for 2025/26, distributed across local housing authorities in England. This is in addition to the revenue councils retain from civil penalties they impose.",
      },
      {
        question: "What happens to the money from civil penalties?",
        answer:
          "Councils keep 100% of civil penalty revenue. This income must be ring-fenced for housing enforcement activities, so it directly funds further enforcement work including staff, technology, and inspections.",
      },
      {
        question: "Can I report my landlord to the council without fear of eviction?",
        answer:
          "Yes. Section 21 no-fault evictions have been abolished. Your landlord cannot evict you simply for making a complaint. Retaliatory eviction using Section 8 grounds is also protected against, and a court can refuse possession if it finds the eviction is retaliatory.",
      },
    ],
    relatedSlugs: [
      "renters-rights-act-2025-key-changes",
      "landlord-fines-2026",
      "civil-penalties-landlords-complete-list",
      "selective-licensing-guide-2026",
    ],
  },
  {
    slug: "decent-homes-standard-private-rentals",
    title: "Decent Homes Standard Extended to Private Rentals: What to Expect",
    metaDescription:
      "The Decent Homes Standard now applies to private rentals for the first time. Five criteria, 2035 deadline, 20%+ failure rate. What tenants and councils need to know.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 7,
    category: "Guides",
    sections: [
      {
        id: "what-is-decent-homes",
        heading: "What Is the Decent Homes Standard?",
        content:
          "The **Decent Homes Standard** is a minimum quality benchmark for residential properties. It was introduced in 2000 for social housing and has been credited with transforming the quality of council homes and housing association properties over the past two decades.\n\nThe **Renters' Rights Act 2025** extends the Decent Homes Standard to **private rented properties** for the first time. This is one of the most significant provisions in the Act, affecting an estimated **4.6 million private rented homes** in England.\n\nA decent home must meet **five criteria**:\n\n1. **Free from Category 1 hazards** under the Housing Health and Safety Rating System (HHSRS)\n2. **In a reasonable state of repair**\n3. **Has reasonably modern facilities and services** (kitchen, bathroom, heating)\n4. **Provides adequate thermal comfort** (effective insulation and efficient heating)\n5. **Meets minimum energy efficiency standards** (currently EPC Band E or above)\n\nProperties that fail any one of these criteria are classified as \"non-decent.\" The government's English Housing Survey estimates that **over 20% of private rentals** currently fail the Decent Homes Standard, meaning around 1 million tenants live in homes that do not meet the minimum benchmark.",
      },
      {
        id: "five-criteria-explained",
        heading: "The Five Criteria Explained",
        content:
          "**1. Free from Category 1 hazards**\nThe Housing Health and Safety Rating System (HHSRS) assesses 29 potential hazards including excess cold, damp and mould, fire, falls, electrical hazards, and carbon monoxide. A Category 1 hazard is one that poses a serious risk to health or safety. Examples: a broken boiler in winter (excess cold), severe rising damp (damp and mould), exposed wiring (electrical hazards).\n\n**2. Reasonable state of repair**\nKey building components (walls, roof, windows, doors, heating, plumbing, electrics) must be in a reasonable condition. The standard does not require brand-new fittings, but components that are old, deteriorating, or not functioning properly will fail. A 30-year-old boiler that works reliably might pass; one that breaks down monthly would fail.\n\n**3. Reasonably modern facilities**\nThe kitchen must have adequate space, a sink, food preparation area, and cooking facilities. The bathroom must have a bath or shower, a basin, and a toilet. Facilities installed more than 20 to 30 years ago that have not been updated may fail this criterion, depending on condition.\n\n**4. Adequate thermal comfort**\nThe property must have effective insulation and an efficient heating system. This typically means cavity wall insulation (where feasible), loft insulation of at least 200mm, and a heating system that can maintain comfortable temperatures throughout the home.\n\n**5. Minimum energy efficiency**\nPrivate rental properties must already have a minimum EPC rating of **Band E** under the Minimum Energy Efficiency Standards (MEES) regulations. The Decent Homes Standard reinforces this requirement and the government has signalled that the minimum may be raised to **Band C** by 2030.\n\nUse our [property check tool](/check) to assess your property's EPC rating, and our [damp check tool](/damp-check) to evaluate damp and mould risks.",
      },
      {
        id: "2035-timeline",
        heading: "The 2035 Compliance Timeline",
        content:
          "The government has set **2035** as the target for full compliance with the Decent Homes Standard across the private rented sector. This gives landlords approximately 9 years from the Act's passage to bring their properties up to standard.\n\nThe timeline is deliberately generous to avoid a sudden compliance cliff that could destabilise the market. However, enforcement will begin well before 2035:\n\n- **Immediate**: Councils can already take action against Category 1 hazards under the Housing Act 2004\n- **From 1 May 2026**: The Decent Homes Standard is legally binding. Councils can begin issuing improvement notices for the most serious failures.\n- **2027 onwards**: As the PRS Database becomes operational, councils will have better data to identify non-compliant properties and prioritise inspections\n- **2030**: Expected tightening of EPC minimum to Band C\n- **2035**: Full compliance expected. Properties that still fail the standard will face escalating enforcement\n\nLandlords who own properties with major issues (no central heating, single glazing, significant damp problems) should start planning improvements now rather than waiting for enforcement.",
      },
      {
        id: "what-councils-need-to-prepare",
        heading: "What Councils Need to Prepare",
        content:
          "Enforcing the Decent Homes Standard across the private rented sector will require significant council capacity:\n\n**Staffing**: Councils need trained HHSRS inspectors, enforcement officers, and legal staff. The £18.2 million in government funding for 2025/26 will help, but many councils will need to recruit and train additional staff over the coming years.\n\n**Inspection capacity**: With over 4.6 million private rented homes in England, councils cannot inspect every property. A risk-based approach is essential, prioritising:\n- Properties with tenant complaints\n- Properties with poor EPC ratings (D, E)\n- Properties in areas with high levels of private renting\n- Properties owned by landlords with previous enforcement history\n\n**Data integration**: The PRS Database will be a key tool for identifying non-compliant properties. Councils should plan how to integrate the national database with their local housing, council tax, and licensing records.\n\n**Legal capacity**: The expanded civil penalty regime means more penalty notices, more representations to consider, and more tribunal appeals. Councils need legal officers experienced in housing enforcement and civil penalty proceedings.\n\n**Tenant engagement**: Councils should proactively communicate tenants' rights under the Decent Homes Standard and make it easy to report substandard conditions. Use our [property check tool](/check) as a reference for the kind of data tenants can gather before contacting the council.",
      },
      {
        id: "tenant-rights-decent-homes",
        heading: "What Tenants Can Do Now",
        content:
          "Even though the full 2035 deadline is years away, the Decent Homes Standard is already legally binding. If your property fails any of the five criteria, you have options:\n\n1. **Report it to your landlord in writing**: Describe the issue, reference the Decent Homes Standard, and set a reasonable deadline for remediation.\n2. **Contact your local council**: If the landlord does not act, report the issue to the council's housing enforcement team. They can inspect the property and issue an improvement notice.\n3. **Use our tools**: Run a [property check](/check) for a comprehensive overview, use the [damp check](/damp-check) for mould-related issues, and check your [EPC rating](https://www.gov.uk/find-energy-certificate) for energy efficiency.\n4. **Apply for a rent repayment order**: If the landlord fails to comply with an improvement notice, you can apply for an RRO covering up to 24 months of rent.\n\nRemember, your landlord cannot evict you for raising these issues. Section 21 is abolished, and retaliatory eviction using Section 8 grounds is protected against under the Renters' Rights Act 2025.\n\nIf you are unsure whether your property meets the standard, start with our free [property check](/check). It covers EPC ratings, crime data, flood risk, air quality, and more, giving you an evidence base before you approach your landlord or the council.",
      },
    ],
    faqs: [
      {
        question: "When does the Decent Homes Standard apply to private rentals?",
        answer:
          "The standard is legally binding from the Renters' Rights Act 2025, but full compliance is expected by 2035. Councils can enforce against the most serious failures immediately, particularly Category 1 hazards which were already enforceable under the Housing Act 2004.",
      },
      {
        question: "What percentage of private rentals fail the Decent Homes Standard?",
        answer:
          "The government's English Housing Survey estimates that over 20% of private rented homes fail the Decent Homes Standard, equating to around 1 million properties. The most common failures relate to thermal comfort, Category 1 hazards, and the state of repair.",
      },
      {
        question: "Can my landlord evict me for complaining about the property condition?",
        answer:
          "No. Section 21 no-fault evictions have been abolished. Retaliatory eviction using Section 8 grounds is protected against, and a court can refuse to grant possession if the eviction appears to be in retaliation for a legitimate complaint.",
      },
      {
        question: "Who pays for improvements to meet the Decent Homes Standard?",
        answer:
          "The landlord is responsible for all costs of bringing the property up to the Decent Homes Standard. They cannot pass these costs on to tenants through the tenancy agreement. However, landlords may apply for government grants or green home schemes where available.",
      },
    ],
    relatedSlugs: [
      "renters-rights-act-2025-key-changes",
      "awaabs-law-private-landlords",
      "tenant-rights-damp-mould-2026",
      "council-enforcement-powers-2026",
    ],
  },
  {
    slug: "awaabs-law-private-landlords",
    title: "Awaab's Law Now Applies to Private Landlords: Complete Guide",
    metaDescription:
      "Awaab's Law extends to private rentals under the Renters' Rights Act 2025. Background, social housing timescales, and what private tenants can expect.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 7,
    category: "Safety",
    sections: [
      {
        id: "background",
        heading: "The Tragedy Behind Awaab's Law",
        content:
          "**Awaab's Law** is named after **Awaab Ishak**, a two-year-old boy who died on 21 December 2020 from a respiratory condition caused by prolonged exposure to mould in his family's social housing flat in Rochdale, Greater Manchester. His family had repeatedly reported the mould to their housing association, Rochdale Boroughwide Housing, but were ignored or told to \"paint over it.\"\n\nThe coroner's inquest in November 2022 found that Awaab died as a direct result of the mould in his home and that his death was \"entirely preventable.\" The case shocked the nation and exposed systemic failures in how social landlords handled damp and mould complaints.\n\nIn response, the government introduced **Awaab's Law** as part of the Social Housing (Regulation) Act 2023, setting legally binding timescales for social landlords to investigate and fix hazards like damp and mould. The **Renters' Rights Act 2025** extends these requirements to **private landlords** for the first time.\n\nIf you are dealing with damp or mould right now, do not wait for the private sector timescales to be finalised. Use our [damp and mould checker](/damp-check) to assess the severity and generate an evidence report, then use [report issue](/report-issue) to escalate immediately.",
      },
      {
        id: "social-housing-timescales",
        heading: "Social Housing Timescales (Already in Force)",
        content:
          "The Awaab's Law timescales for **social housing** came into force on **1 October 2025**. They set strict deadlines for social landlords to respond to hazard reports:\n\n| Stage | Deadline |\n|-------|----------|\n| **Acknowledge** a hazard report | Within **24 hours** |\n| **Investigate** the reported hazard | Within **14 calendar days** of the report |\n| **Begin repair works** | Within **7 calendar days** of the investigation completing |\n| **Complete emergency repairs** (imminent risk to health) | Within **24 hours** |\n| **Complete non-emergency repairs** | Within a **reasonable timescale** set by the landlord, communicated to the tenant |\n\nSocial landlords who fail to meet these timescales can face enforcement action from the **Regulator of Social Housing**, including:\n- Compliance notices\n- Performance improvement plans\n- Intervention and management changes\n- In extreme cases, deregistration\n\nTenants of social housing can also escalate to the **Housing Ombudsman** if their landlord fails to meet Awaab's Law timescales. The Housing Ombudsman has been significantly more active since 2022, issuing severe maladministration findings and ordering substantial compensation.",
      },
      {
        id: "private-sector-extension",
        heading: "Extension to Private Landlords",
        content:
          "The Renters' Rights Act 2025 includes a provision extending Awaab's Law to the **private rented sector**. This means private landlords will eventually face similar legally binding timescales for investigating and fixing hazards.\n\nHowever, the specific timescales for the private sector have **not yet been set**. The government has committed to a **separate consultation** on the private sector timescales before bringing them into force. This consultation has not yet been published.\n\nKey points about the private sector extension:\n\n- The **power** to set timescales is already in the Act (it does not need further legislation)\n- The timescales will be set by **secondary legislation** (regulations) following the consultation\n- They may differ from the social housing timescales to reflect the different nature of private renting\n- Once in force, private landlords who breach the timescales will face **civil penalties** and potentially **rent repayment orders**\n\nThe government has not given a firm date for when the private sector timescales will be introduced, but it is expected during **2027 or 2028**, once the consultation has concluded and the regulations have been drafted.",
      },
      {
        id: "what-applies-now",
        heading: "What Already Applies to Private Landlords",
        content:
          "Even without the specific Awaab's Law timescales, private tenants are not unprotected. Several existing legal frameworks already require landlords to address hazards:\n\n**Housing Act 2004 (HHSRS)**:\nLocal councils can inspect private rental properties for 29 categories of hazard. Damp and mould growth is one of the most common **Category 1 hazards** (the most serious category). If a council inspector finds a Category 1 hazard, they **must** take enforcement action, which can include an improvement notice requiring the landlord to fix the problem within a set timescale.\n\n**Homes (Fitness for Human Habitation) Act 2018**:\nYour landlord has a legal duty to ensure the property is fit for human habitation throughout the tenancy. If it is not (due to damp, mould, or other hazards), you can take your landlord to court and claim compensation.\n\n**Decent Homes Standard (Renters' Rights Act 2025)**:\nThe extension of the Decent Homes Standard to private rentals means your home must be free from Category 1 hazards. This reinforces the existing HHSRS framework.\n\n**Deduction of Rent Act provisions**:\nIf your landlord has been served with an improvement notice or emergency remedial action notice, you may be able to claim a rent repayment order of up to 24 months' rent.\n\nThe message is clear: do not wait for Awaab's Law timescales. If your home has damp or mould, act now using the tools already available.",
      },
      {
        id: "how-to-use-existing-protections",
        heading: "How to Take Action Now",
        content:
          "If you are dealing with damp, mould, or another hazard in your private rented home, follow these steps:\n\n1. **Document everything**: Take photos with timestamps showing the extent of the problem. Record dates when you reported it and any responses from your landlord. Use our [damp and mould checker](/damp-check) to generate an evidence report.\n\n2. **Report to your landlord in writing**: Send an email or letter describing the problem, attaching photos, and requesting repair within a specific timeframe (14 days is reasonable for non-emergencies). Use our [report issue tool](/report-issue) to generate a professional letter.\n\n3. **Contact your local council**: If the landlord does not act within your deadline, report to the council's environmental health or housing enforcement team. Request an HHSRS inspection.\n\n4. **Keep medical records**: If the damp or mould is affecting your health (respiratory issues, skin conditions, allergies), visit your GP and request a letter linking your symptoms to your housing conditions. This is crucial evidence for compensation claims.\n\n5. **Consider legal action**: Under the Homes (Fitness for Human Habitation) Act 2018, you can take your landlord to court for compensation. Many solicitors handle these cases on a no-win, no-fee basis.\n\n6. **Apply for a rent repayment order**: If the council has issued an improvement notice that the landlord has breached, you can apply for an RRO of up to 24 months' rent.\n\nRemember: your landlord **cannot** evict you for raising these issues. Section 21 is abolished, and retaliatory eviction is specifically protected against.",
      },
      {
        id: "what-to-expect-from-consultation",
        heading: "What to Expect from the Consultation",
        content:
          "When the government publishes its consultation on private sector Awaab's Law timescales, it is expected to address:\n\n- **Response timescales**: How quickly must a private landlord acknowledge and investigate a hazard report? The social housing standard of 24 hours for acknowledgement and 14 days for investigation may be adapted.\n- **Repair timescales**: How quickly must repairs begin and be completed? Private landlords may argue they need more time than social landlords to arrange contractors.\n- **Emergency provisions**: What constitutes an emergency requiring a 24-hour response in the private sector?\n- **Enforcement mechanisms**: How will breaches be penalised? Civil penalties are the most likely route.\n- **Interaction with existing frameworks**: How will Awaab's Law timescales sit alongside the HHSRS, the Decent Homes Standard, and the fitness for habitation duty?\n\nWe will update this article and our [Renters' Rights Act hub](/renters-rights-act) as soon as the consultation is published and the timescales are confirmed. Sign up for our newsletter to be notified of developments.",
      },
    ],
    faqs: [
      {
        question: "Is Awaab's Law already in force for private landlords?",
        answer:
          "The power to apply Awaab's Law to private landlords is in the Renters' Rights Act 2025, but the specific timescales have not been set yet. A government consultation is pending. However, existing laws already require private landlords to address hazards like damp and mould.",
      },
      {
        question: "What are the current timescales for social housing?",
        answer:
          "Social landlords must acknowledge hazard reports within 24 hours, complete an investigation within 14 days, begin repairs within 7 days of the investigation, and complete emergency repairs within 24 hours. These timescales have been in force since 1 October 2025.",
      },
      {
        question: "Can I claim compensation for damp and mould in my private rental?",
        answer:
          "Yes. Under the Homes (Fitness for Human Habitation) Act 2018, you can sue your landlord for compensation if damp or mould makes your home unfit for habitation. You may also be eligible for a rent repayment order if the council has issued an improvement notice that the landlord has breached.",
      },
      {
        question: "What should I do if my landlord ignores my damp report?",
        answer:
          "Report to your local council's environmental health team and request an HHSRS inspection. Document everything with dated photos. If the damp is affecting your health, get a letter from your GP. Use RenterCheck's damp check tool and report issue tool to generate evidence and formal letters.",
      },
    ],
    relatedSlugs: [
      "renters-rights-act-2025-key-changes",
      "decent-homes-standard-private-rentals",
      "tenant-rights-damp-mould-2026",
      "how-to-get-council-to-inspect-rental",
    ],
  },
  {
    slug: "selective-licensing-guide-2026",
    title: "Selective Licensing 2026: 60+ Schemes and Growing",
    metaDescription:
      "No Secretary of State approval needed since Dec 2024. 60+ councils now have selective licensing. Fees, penalties, and how to check if your area has one.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 7,
    category: "Guides",
    sections: [
      {
        id: "what-is-selective-licensing",
        heading: "What Is Selective Licensing?",
        content:
          "**Selective licensing** is a scheme that allows local councils in England to require all private landlords in a designated area to obtain a licence before they can legally let a property. It was introduced by Part 3 of the **Housing Act 2004** to tackle poor housing conditions, antisocial behaviour, and low housing demand in areas with high concentrations of private rented housing.\n\nA selective licence covers **all private rented properties** in the designated area, not just HMOs (which have their own mandatory and additional licensing regime). This means even a landlord renting out a single flat in a selective licensing area must obtain a licence.\n\nThe licence typically lasts **5 years** and comes with conditions that the landlord must meet, such as:\n\n- Providing gas safety certificates annually\n- Maintaining valid EPC certificates\n- Keeping the property in good repair\n- Managing antisocial behaviour from tenants\n- Providing references for prospective tenants\n- Fitting adequate smoke and carbon monoxide alarms\n\nOperating a rental property without a licence in a selective licensing area is a criminal offence. Landlords face **civil penalties of up to £30,000**, criminal prosecution, and tenants can apply for **rent repayment orders of up to 24 months' rent**.",
      },
      {
        id: "no-more-secretary-of-state-approval",
        heading: "No More Secretary of State Approval",
        content:
          "One of the most impactful changes under the Renters' Rights Act 2025 is the removal of the requirement for **Secretary of State approval** for selective licensing schemes. Previously, councils needed explicit ministerial sign-off for any scheme covering more than 20% of their area or 20% of their private rented stock. This process was slow, bureaucratic, and often resulted in schemes being watered down or rejected.\n\nSince **December 2024**, councils can introduce selective licensing schemes without central government approval, provided they follow the consultation requirements and the scheme covers no more than **20% of their geographical area** or **20% of their private rented properties**.\n\nFor larger schemes, councils must still consult but do not need ministerial approval. This has removed the single biggest barrier to selective licensing and triggered a wave of new schemes across England.\n\nThe impact has been immediate. In the six months following the change, over **15 new selective licensing consultations** were launched by councils that had previously been deterred by the approval process.",
      },
      {
        id: "councils-with-active-schemes",
        heading: "Councils with Active or Planned Schemes",
        content:
          "As of April 2026, over **60 councils** across England have active, approved, or planned selective licensing schemes. Here is a selection of the most notable:\n\n**London boroughs:**\n- Newham (borough-wide, one of the first and largest)\n- Barking and Dagenham (borough-wide)\n- Waltham Forest (borough-wide)\n- Brent (multiple wards)\n- Tower Hamlets (selected wards)\n- Haringey (selected wards)\n- Croydon (borough-wide)\n\n**Major cities:**\n- Liverpool (city-wide)\n- Nottingham (city-wide)\n- Burnley (selected areas)\n- Blackpool (selected areas)\n- Middlesbrough (selected areas)\n- Bradford (selected areas)\n- Coventry (selected areas)\n- Sheffield (selected areas)\n\n**Other notable schemes:**\n- Thanet (selected wards)\n- Hastings (town-wide)\n- Hyndburn (selected areas)\n- Pendle (selected areas)\n- Stoke-on-Trent (selected areas)\n\nThis list is not exhaustive and is growing rapidly. To check whether your rental property is in a selective licensing area, contact your local council's housing team or use our [landlord register tool](/landlord-register) which cross-references known licensing schemes.",
      },
      {
        id: "fees-and-costs",
        heading: "Licence Fees and Costs",
        content:
          "Selective licensing fees vary by council but typically range from **£500 to £1,000 per property** for a 5-year licence. Some councils offer discounts for:\n\n- **Early applications** (before the scheme starts): Typically 10-20% discount\n- **Accredited landlords** (members of a recognised landlord accreditation scheme): 10-15% discount\n- **Multiple properties**: Reduced per-property fee for landlords with portfolios\n\nHere are some example fees:\n\n| Council | Standard fee (5 years) | Early bird / discounted |\n|---------|----------------------|------------------------|\n| Newham | £600 per property | £500 (accredited) |\n| Liverpool | £780 per property | £585 (early bird) |\n| Nottingham | £780 per property | £610 (early bird) |\n| Croydon | £750 per property | £600 (early bird) |\n| Burnley | £595 per property | £495 (early bird) |\n\nLandlords cannot pass the licence fee on to tenants. It is a business cost borne by the landlord. Under the **Tenant Fees Act 2019**, any attempt to charge tenants for licensing is a prohibited payment.\n\nThe fee structure must be split into two parts: Part A (processing the application) and Part B (enforcement and monitoring). If the application is refused, only Part A is retained.",
      },
      {
        id: "penalties-for-unlicensed-properties",
        heading: "Penalties for Unlicensed Properties",
        content:
          "Operating a rental property without a licence in a selective licensing area carries serious consequences:\n\n**Civil penalties:**\nCouncils can impose civil penalties of up to **£30,000** per offence. The starting amount varies by council, but typically ranges from £5,000 to £15,000 for a first offence.\n\n**Criminal prosecution:**\nAlternatively, councils can prosecute the landlord in the magistrates' court. The maximum fine is **unlimited**.\n\n**Rent repayment orders:**\nTenants can apply for a rent repayment order of up to **24 months' rent** (increased from 12 months by the Renters' Rights Act 2025). This is one of the most common uses of RROs.\n\n**No Section 8 notices:**\nAn unlicensed landlord **cannot serve a valid Section 8 eviction notice**. If they attempt to do so, the notice is invalid. Some courts have ruled that tenancies granted while unlicensed are themselves unenforceable in the landlord's favour.\n\nThese penalties create strong financial incentives for compliance. For a landlord charging £800/month, a 24-month RRO could mean repaying **£19,200** to the tenant, on top of a civil penalty.\n\nIf you suspect your landlord does not have a selective licence, check with your council and consider applying for an RRO. Use our [landlord check tool](/landlord-check) to start investigating.",
      },
      {
        id: "how-to-check",
        heading: "How to Check If Your Area Has Selective Licensing",
        content:
          "Here are the best ways to find out if your rental property is in a selective licensing area:\n\n1. **Contact your local council**: The housing or environmental health department can confirm whether a scheme is in place and whether your property is covered. Most councils have a searchable register of licensed properties on their website.\n\n2. **Check the council's website**: Search for \"selective licensing\" on your council's website. Active schemes will have a dedicated page explaining the designated area, fees, and how to check.\n\n3. **Use our landlord register tool**: Visit [rentercheck.co.uk/landlord-register](/landlord-register) to check your postcode against known selective licensing areas.\n\n4. **Search the London Rogue Landlord Checker**: If you are in London, the Greater London Authority operates a rogue landlord checker that includes licensing information.\n\n5. **Ask your landlord or agent**: They are legally required to have a licence if the property is in a selective licensing area. Ask them for the licence number and check it against the council's register.\n\nIf you discover your property should be licensed but is not, this is a significant finding. You may be entitled to a rent repayment order covering up to 24 months of rent. Document your findings and seek advice from your council, Shelter (0808 800 4444), or Citizens Advice.",
      },
    ],
    faqs: [
      {
        question: "How many councils have selective licensing schemes?",
        answer:
          "Over 60 councils across England have active, approved, or planned selective licensing schemes as of April 2026. The number is growing rapidly since the removal of Secretary of State approval requirements in December 2024.",
      },
      {
        question: "How much does a selective licence cost?",
        answer:
          "Fees vary by council, typically ranging from £500 to £1,000 per property for a 5-year licence. Discounts are often available for early applications and accredited landlords. The landlord pays the fee; it cannot be passed on to tenants.",
      },
      {
        question: "What happens if my landlord does not have a selective licence?",
        answer:
          "The landlord faces civil penalties of up to £30,000, cannot serve valid Section 8 eviction notices, and you can apply for a rent repayment order of up to 24 months' rent. Report the situation to your local council.",
      },
      {
        question:
          "Can my landlord charge me for the selective licence fee?",
        answer:
          "No. Selective licence fees are a business cost borne by the landlord. Any attempt to pass the fee to tenants would breach the Tenant Fees Act 2019, which prohibits landlords from charging tenants for costs related to the letting.",
      },
    ],
    relatedSlugs: [
      "renters-rights-act-2025-key-changes",
      "prs-database-tenants-guide",
      "council-enforcement-powers-2026",
      "landlord-fines-2026",
    ],
  },
  {
    slug: "civil-penalties-landlords-complete-list",
    title: "Civil Penalties for Landlords: Complete List with Starting Amounts",
    metaDescription:
      "Every civil penalty offence for landlords in one table. Starting amounts, two-tier system, how councils decide amounts. The definitive reference for 2026.",
    publishDate: "2026-04-05",
    lastUpdated: "2026-04-05",
    readTime: 10,
    category: "Rights",
    sections: [
      {
        id: "two-tier-system",
        heading: "The Two-Tier Penalty System",
        content:
          "The civil penalty framework for private landlords in England operates on a **two-tier system** following the Renters' Rights Act 2025:\n\n**Tier 1: Breach penalties (up to £7,000)**\nThese apply to regulatory breaches where the landlord has failed to comply with a legal requirement. Examples include failing to register on the PRS Database, breaching the bidding ban, or failing to respond to a pet request. These are treated as less serious than Tier 2 offences, though repeated breaches can escalate.\n\n**Tier 2: Offence penalties (up to £40,000)**\nThese apply to more serious housing offences, including those that were previously only prosecutable as criminal offences. Examples include operating an unlicensed HMO, breaching a banning order, or failing to comply with an improvement notice. Repeat Tier 1 breaches can also escalate to Tier 2 penalties.\n\nThe key difference is severity and maximum amount. Tier 1 penalties are designed for regulatory non-compliance; Tier 2 penalties are for conduct that puts tenants at risk or involves deliberate defiance of the law.\n\nCouncils choose between a civil penalty and criminal prosecution for each offence. They cannot impose both for the same offence, but they can impose civil penalties for some offences while prosecuting for others if a landlord is being investigated for multiple breaches.",
      },
      {
        id: "complete-penalty-table",
        heading: "Complete List of Civil Penalty Offences",
        content:
          "The following is the comprehensive list of offences for which local councils can impose civil penalties on private landlords, with government-recommended starting amounts:\n\n**Renters' Rights Act 2025 offences (from 1 May 2026):**\n\n| Offence | Tier | Starting amount | Maximum |\n|---------|------|----------------|--------|\n| Failing to register on PRS Database | 1 | £5,000 | £7,000 |\n| Providing false info to PRS Database | 1 | £7,000 | £7,000 |\n| Failing to update PRS Database info | 1 | £3,000 | £7,000 |\n| Failing to join PRS Ombudsman | 1 | £5,000 | £7,000 |\n| Rental bidding (inviting/accepting above advertised rent) | 1 | £7,000 | £7,000 |\n| Not responding to pet request in 28 days | 1 | £3,000 | £7,000 |\n| Unreasonable refusal of pet request | 1 | £5,000 | £7,000 |\n| Discrimination: benefits recipients | 1 | £5,000 | £7,000 |\n| Discrimination: families with children | 1 | £5,000 | £7,000 |\n| Breaching advance rent cap | 1 | £5,000 | £7,000 |\n| Failing to comply with Decent Homes Standard | 2 | £7,000 | £40,000 |\n| Breaching Awaab's Law timescales (when set) | 2 | £5,000 | £40,000 |\n\n**Housing Act 2004 offences (existing, with updated guidance):**\n\n| Offence | Tier | Starting amount | Maximum |\n|---------|------|----------------|--------|\n| Failure to comply with improvement notice | 2 | £5,000 | £30,000 |\n| Operating unlicensed HMO | 2 | £10,000 | £30,000 |\n| Breaching HMO licence conditions | 2 | £5,000 | £30,000 |\n| Failure to comply with overcrowding notice | 2 | £5,000 | £30,000 |\n| Operating without selective licence | 2 | £5,000 | £30,000 |\n| Breaching selective licence conditions | 2 | £5,000 | £30,000 |\n\n**Housing and Planning Act 2016 offences:**\n\n| Offence | Tier | Starting amount | Maximum |\n|---------|------|----------------|--------|\n| Breach of banning order | 2 | £15,000 | £30,000 |\n| Failing to comply with financial penalty (non-payment) | 2 | £5,000 | £30,000 |",
      },
      {
        id: "how-starting-amounts-work",
        heading: "How Starting Amounts Work in Practice",
        content:
          "The starting amounts published by the government are **recommendations, not fixed rules**. Each council has discretion to set its own penalty policy within the statutory maximum. Here is how the process works in practice:\n\n**Step 1: Identify the starting point**\nThe council begins with the government's recommended starting amount for the specific offence.\n\n**Step 2: Assess the severity**\nThe council considers factors that make this particular case more or less serious than a typical case:\n\n*Aggravating factors (increase the penalty):*\n- Previous offences or penalties\n- Deliberate or reckless non-compliance\n- Large portfolio of properties (professional landlord)\n- Vulnerable tenants affected (elderly, disabled, families with young children)\n- Long duration of the offence\n- Significant financial gain from non-compliance\n- Failure to cooperate with the investigation\n\n*Mitigating factors (reduce the penalty):*\n- First offence with no prior history\n- Prompt corrective action once the breach was identified\n- Genuine attempt to comply\n- Limited financial gain\n- Cooperation with the council's investigation\n- Evidence of otherwise good landlord practice\n\n**Step 3: Apply the adjustment**\nThe council adjusts the starting amount up or down based on its assessment, staying within the statutory maximum.\n\n**Step 4: Consider proportionality and ability to pay**\nThe final penalty must be proportionate to the offence. Councils can request financial information from the landlord, but a claimed inability to pay does not automatically reduce a penalty for a serious offence.",
      },
      {
        id: "penalty-process-timeline",
        heading: "The Penalty Process: Step by Step",
        content:
          "When a council decides to impose a civil penalty, the following process applies:\n\n**1. Investigation (varies)**\nThe council investigates the suspected offence, gathering evidence. This may take weeks or months depending on the complexity.\n\n**2. Notice of intent (Day 1)**\nThe council serves the landlord with a **notice of intent** setting out:\n- The offence(s) being penalised\n- The proposed penalty amount\n- The reasons for the penalty\n- The evidence relied upon\n\n**3. Representations period (28 days)**\nThe landlord has **28 days** to make written representations. They can challenge the evidence, argue mitigating factors, or provide financial information.\n\n**4. Council considers representations (14 to 28 days)**\nThe council must genuinely consider the representations and may adjust the penalty amount.\n\n**5. Final notice**\nThe council issues a **final notice** confirming the penalty. This may be the same as, lower than, or (rarely) higher than the amount in the notice of intent.\n\n**6. Appeal period (28 days)**\nThe landlord has **28 days** to appeal to the **First-tier Tribunal**. The appeal is a fresh hearing; the tribunal can increase, decrease, or confirm the penalty.\n\n**7. Payment**\nIf no appeal is made, or after the appeal is decided, the penalty becomes due. Councils can enforce unpaid penalties through the county court.",
      },
      {
        id: "multiple-penalties",
        heading: "Multiple Penalties and Cumulative Exposure",
        content:
          "A landlord committing multiple offences can face **separate penalties for each one**. There is no cap on the total amount of penalties a landlord can receive across multiple offences or properties.\n\n**Example scenarios:**\n\nA landlord with 5 unlicensed properties in a selective licensing area:\n- 5 x £5,000 starting amount = **£25,000** potential penalties, plus\n- Tenants in all 5 properties can apply for RROs totalling up to **£240,000** (assuming average rent of £1,000/month for 24 months per property)\n\nA landlord who discriminates against benefit tenants, refuses a pet unreasonably, and fails to register on the PRS Database:\n- Discrimination: £5,000\n- Pet refusal: £5,000\n- PRS Database: £5,000\n- Total: **£15,000** in penalties, plus RRO exposure\n\nA letting agent who systematically runs bidding wars across 20 properties:\n- 20 x £7,000 = **£140,000** potential penalties, plus redress scheme sanctions and potential banning order\n\nThe cumulative financial exposure from civil penalties combined with rent repayment orders can be devastating for non-compliant landlords. This is by design: the regime is intended to make compliance significantly cheaper than non-compliance.",
      },
      {
        id: "for-council-officers",
        heading: "Notes for Council Enforcement Officers",
        content:
          "If you are a local authority enforcement officer, here are practical considerations for the expanded civil penalty regime:\n\n**Building a penalty policy**: If your council does not already have a civil penalty policy covering the new Renters' Rights Act offences, develop one before Phase 2 takes effect on 1 May 2026. The policy should set local starting amounts (which can differ from government guidance), assessment criteria, and the decision-making process.\n\n**Evidence standards**: Civil penalties require evidence to the **criminal standard** (beyond reasonable doubt), even though they are civil in nature. This means your investigation must be thorough and your evidence robust enough to withstand a tribunal appeal.\n\n**Revenue retention**: All civil penalty income is retained by the council for housing enforcement. Build this into your business case for expanded enforcement capacity. Councils that invest in enforcement teams typically generate more penalty revenue than the cost of the team.\n\n**PRS Database integration**: Plan how to cross-reference the PRS Database (when live) with your local council tax records, HMO register, and selective licensing database. This will be your primary tool for identifying unregistered landlords.\n\n**Training**: Officers need training on the new offences, the updated penalty framework, and tribunal procedures. The government's £18.2 million enforcement funding can be used for training.\n\nFor bulk property compliance monitoring, explore RenterCheck's [council tools](/councils) which provide ward-level data, risk scoring, and enforcement dashboards.",
      },
    ],
    faqs: [
      {
        question: "What is the maximum civil penalty a landlord can receive?",
        answer:
          "For Tier 1 breaches (regulatory non-compliance), the maximum is £7,000 per offence. For Tier 2 offences (serious housing offences), the maximum is £30,000 to £40,000 per offence depending on the specific offence. There is no cap on the total across multiple offences.",
      },
      {
        question: "Can a landlord be penalised and prosecuted for the same offence?",
        answer:
          "No. The council must choose between imposing a civil penalty or pursuing criminal prosecution for each offence. However, they can use civil penalties for some offences and prosecution for others if the landlord is being investigated for multiple breaches.",
      },
      {
        question: "Can a landlord appeal a civil penalty?",
        answer:
          "Yes. The landlord has 28 days to appeal to the First-tier Tribunal after receiving the final notice. The tribunal conducts a fresh hearing and can increase, decrease, or confirm the penalty amount. It is not a rubber-stamp process.",
      },
      {
        question: "Do the starting amounts apply everywhere in England?",
        answer:
          "The government's starting amounts are recommendations. Each council can set its own penalty policy within the statutory maximum. This means a landlord committing the same offence in two different council areas could face different penalty amounts.",
      },
      {
        question: "What evidence do councils need to impose a civil penalty?",
        answer:
          "Councils must prove the offence to the criminal standard of proof (beyond reasonable doubt), even though civil penalties are not criminal convictions. This means thorough investigation, robust evidence gathering, and properly documented decision-making.",
      },
    ],
    relatedSlugs: [
      "landlord-fines-2026",
      "renters-rights-act-2025-key-changes",
      "council-enforcement-powers-2026",
      "rent-repayment-orders-doubled",
    ],
  },
];

export function getAllArticleSlugs(): string[] {
  return blogArticles.map((a) => a.slug);
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export const categoryColors: Record<BlogArticle["category"], string> = {
  Rights: "bg-primary-100 text-primary-700",
  Guides: "bg-accent-100 text-accent-700",
  Money: "bg-warning-100 text-warning-700",
  Safety: "bg-danger-100 text-danger-700",
};
