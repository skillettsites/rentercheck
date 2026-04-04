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
