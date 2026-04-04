export interface AreaData {
  slug: string;
  name: string;
  region: string;
  population: number;
  postcodePrefix: string;
  medianRent: {
    studio: number;
    oneBed: number;
    twoBed: number;
    threeBed: number;
    fourBed: number;
  };
  averageYield: number;
  rentGrowthYoY: number;
  demandLevel: "Very High" | "High" | "Medium" | "Low";
  studentPopulation: boolean;
  averageDeposit: number;
  councilTaxBandD: number;
  topAreas: string[];
  transportLinks: string;
  description: string;
}

/** UK national average 2-bed rent for comparison */
export const NATIONAL_AVERAGE_TWO_BED = 1050;

const areas: AreaData[] = [
  {
    slug: "london",
    name: "London",
    region: "London",
    population: 9002488,
    postcodePrefix: "SW",
    medianRent: {
      studio: 1350,
      oneBed: 1600,
      twoBed: 2000,
      threeBed: 2500,
      fourBed: 3200,
    },
    averageYield: 4.2,
    rentGrowthYoY: 5.8,
    demandLevel: "Very High",
    studentPopulation: true,
    averageDeposit: 2308,
    councilTaxBandD: 1927,
    topAreas: ["Clapham", "Hackney", "Greenwich", "Brixton"],
    transportLinks:
      "Extensive Underground, Overground, Elizabeth Line, bus network, and national rail connections across all zones.",
    description:
      "London remains the UK's most expensive rental market, with intense competition for properties across all boroughs. Demand consistently outstrips supply, particularly for one and two-bed flats in zones 2 to 4. Renters should budget for significantly higher costs than the national average.",
  },
  {
    slug: "manchester",
    name: "Manchester",
    region: "North West",
    population: 561000,
    postcodePrefix: "M",
    medianRent: {
      studio: 750,
      oneBed: 900,
      twoBed: 1150,
      threeBed: 1400,
      fourBed: 1750,
    },
    averageYield: 6.5,
    rentGrowthYoY: 7.2,
    demandLevel: "Very High",
    studentPopulation: true,
    averageDeposit: 1327,
    councilTaxBandD: 1746,
    topAreas: ["Northern Quarter", "Ancoats", "Didsbury", "Chorlton"],
    transportLinks:
      "Metrolink tram network, Piccadilly and Victoria mainline stations, extensive bus routes, and Manchester Airport nearby.",
    description:
      "Manchester is one of the fastest-growing rental markets outside London, driven by major regeneration, a strong jobs market, and a large student population. Yields are among the highest in the UK. City centre apartments are in particularly high demand.",
  },
  {
    slug: "birmingham",
    name: "Birmingham",
    region: "West Midlands",
    population: 1157000,
    postcodePrefix: "B",
    medianRent: {
      studio: 650,
      oneBed: 800,
      twoBed: 1000,
      threeBed: 1250,
      fourBed: 1550,
    },
    averageYield: 6.0,
    rentGrowthYoY: 6.5,
    demandLevel: "Very High",
    studentPopulation: true,
    averageDeposit: 1154,
    councilTaxBandD: 1903,
    topAreas: ["Jewellery Quarter", "Digbeth", "Edgbaston", "Moseley"],
    transportLinks:
      "New Street and Moor Street mainline stations, West Midlands Metro, extensive bus network, and HS2 coming soon.",
    description:
      "Birmingham's rental market has surged following years of regeneration, HS2 investment, and growing appeal as a business hub. The city offers strong rental yields and has a diverse mix of tenants from young professionals to families. Costs are rising but remain well below London.",
  },
  {
    slug: "leeds",
    name: "Leeds",
    region: "Yorkshire and the Humber",
    population: 812000,
    postcodePrefix: "LS",
    medianRent: {
      studio: 600,
      oneBed: 750,
      twoBed: 950,
      threeBed: 1200,
      fourBed: 1500,
    },
    averageYield: 6.3,
    rentGrowthYoY: 5.9,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1096,
    councilTaxBandD: 1800,
    topAreas: ["Headingley", "Chapel Allerton", "Horsforth", "Leeds Dock"],
    transportLinks:
      "Leeds mainline station with fast services to London, York, and Manchester. Extensive bus network and planned mass transit system.",
    description:
      "Leeds combines a thriving financial services sector with a large university population, creating steady rental demand across the city. The city centre has seen significant apartment development, while suburban areas like Headingley remain popular with students and families.",
  },
  {
    slug: "bristol",
    name: "Bristol",
    region: "South West",
    population: 472000,
    postcodePrefix: "BS",
    medianRent: {
      studio: 850,
      oneBed: 1050,
      twoBed: 1350,
      threeBed: 1650,
      fourBed: 2000,
    },
    averageYield: 5.1,
    rentGrowthYoY: 6.0,
    demandLevel: "Very High",
    studentPopulation: true,
    averageDeposit: 1558,
    councilTaxBandD: 2196,
    topAreas: ["Clifton", "Stokes Croft", "Redland", "Southville"],
    transportLinks:
      "Bristol Temple Meads mainline station with services to London and the South West. Bus network, harbour ferry, and Bristol Airport.",
    description:
      "Bristol is one of the most in-demand rental markets in the South West, driven by its creative industries, tech sector, and university population. Rents have risen sharply, with Clifton and the harbourside commanding premium prices. Supply is tight across the city.",
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    region: "North West",
    population: 496000,
    postcodePrefix: "L",
    medianRent: {
      studio: 550,
      oneBed: 650,
      twoBed: 800,
      threeBed: 1000,
      fourBed: 1250,
    },
    averageYield: 7.2,
    rentGrowthYoY: 6.8,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 923,
    councilTaxBandD: 2203,
    topAreas: ["Baltic Triangle", "Ropewalks", "Aigburth", "Woolton"],
    transportLinks:
      "Lime Street mainline station, Merseyrail network, extensive bus routes, and Liverpool John Lennon Airport.",
    description:
      "Liverpool offers some of the highest rental yields in the UK, attracting buy-to-let investors. The city has undergone major regeneration, with the Baltic Triangle and waterfront areas seeing strong demand from young professionals. Rents remain affordable compared to other major cities.",
  },
  {
    slug: "sheffield",
    name: "Sheffield",
    region: "Yorkshire and the Humber",
    population: 556000,
    postcodePrefix: "S",
    medianRent: {
      studio: 525,
      oneBed: 650,
      twoBed: 825,
      threeBed: 1050,
      fourBed: 1300,
    },
    averageYield: 6.4,
    rentGrowthYoY: 5.5,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 952,
    councilTaxBandD: 1956,
    topAreas: ["Kelham Island", "Ecclesall Road", "Crookes", "Sharrow"],
    transportLinks:
      "Sheffield mainline station, Supertram network, bus services, and easy access to the M1 motorway.",
    description:
      "Sheffield is an affordable city with a large student population from its two universities. Kelham Island has become a trendy neighbourhood with growing professional demand. The city offers strong yields, particularly in areas popular with students.",
  },
  {
    slug: "newcastle",
    name: "Newcastle upon Tyne",
    region: "North East",
    population: 302000,
    postcodePrefix: "NE",
    medianRent: {
      studio: 550,
      oneBed: 675,
      twoBed: 850,
      threeBed: 1050,
      fourBed: 1300,
    },
    averageYield: 6.7,
    rentGrowthYoY: 5.3,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 981,
    councilTaxBandD: 2157,
    topAreas: ["Jesmond", "Ouseburn", "Heaton", "Quayside"],
    transportLinks:
      "Newcastle Central mainline station, Tyne and Wear Metro, extensive bus network, and Newcastle Airport.",
    description:
      "Newcastle offers affordable renting with excellent transport links and a vibrant cultural scene. The city attracts a large student population, and areas like Jesmond and Ouseburn have strong demand from young professionals. Rental yields are above the national average.",
  },
  {
    slug: "nottingham",
    name: "Nottingham",
    region: "East Midlands",
    population: 337000,
    postcodePrefix: "NG",
    medianRent: {
      studio: 550,
      oneBed: 675,
      twoBed: 850,
      threeBed: 1050,
      fourBed: 1300,
    },
    averageYield: 6.5,
    rentGrowthYoY: 5.7,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 981,
    councilTaxBandD: 2139,
    topAreas: ["Hockley", "Lace Market", "West Bridgford", "Beeston"],
    transportLinks:
      "Nottingham mainline station, NET tram network, extensive bus routes, and East Midlands Airport nearby.",
    description:
      "Nottingham is a major student city with two universities driving consistent rental demand. The Lace Market and Hockley areas are popular with professionals, while family homes in West Bridgford command higher rents. The city offers good yields and steady growth.",
  },
  {
    slug: "leicester",
    name: "Leicester",
    region: "East Midlands",
    population: 368000,
    postcodePrefix: "LE",
    medianRent: {
      studio: 525,
      oneBed: 650,
      twoBed: 825,
      threeBed: 1025,
      fourBed: 1275,
    },
    averageYield: 6.1,
    rentGrowthYoY: 5.4,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 952,
    councilTaxBandD: 1989,
    topAreas: ["Stoneygate", "Clarendon Park", "Aylestone", "Knighton"],
    transportLinks:
      "Leicester mainline station with services to London, Birmingham, and Sheffield. Comprehensive bus network.",
    description:
      "Leicester offers affordable renting with a diverse economy and large student population. The city has seen steady rent growth, driven by demand from students and young professionals. Areas near the universities command premium rents.",
  },
  {
    slug: "edinburgh",
    name: "Edinburgh",
    region: "Scotland",
    population: 527000,
    postcodePrefix: "EH",
    medianRent: {
      studio: 850,
      oneBed: 1050,
      twoBed: 1350,
      threeBed: 1700,
      fourBed: 2100,
    },
    averageYield: 4.8,
    rentGrowthYoY: 7.5,
    demandLevel: "Very High",
    studentPopulation: true,
    averageDeposit: 1558,
    councilTaxBandD: 1580,
    topAreas: ["Marchmont", "Stockbridge", "Leith", "Morningside"],
    transportLinks:
      "Edinburgh Waverley mainline station, extensive bus network, Edinburgh Trams to the airport, and nearby Edinburgh Airport.",
    description:
      "Edinburgh's rental market is among the most competitive in the UK, driven by its status as a cultural and business capital. Short-term holiday lets have reduced available stock, pushing rents higher. The Scottish tenancy system gives renters additional protections compared to England.",
  },
  {
    slug: "glasgow",
    name: "Glasgow",
    region: "Scotland",
    population: 635000,
    postcodePrefix: "G",
    medianRent: {
      studio: 600,
      oneBed: 750,
      twoBed: 950,
      threeBed: 1200,
      fourBed: 1500,
    },
    averageYield: 6.8,
    rentGrowthYoY: 6.2,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1096,
    councilTaxBandD: 1498,
    topAreas: ["West End", "Finnieston", "Merchant City", "Shawlands"],
    transportLinks:
      "Glasgow Central and Queen Street mainline stations, Subway system, Scotrail network, and Glasgow Airport.",
    description:
      "Glasgow offers more affordable renting than Edinburgh while still providing a vibrant urban lifestyle. The West End and Finnieston are highly sought after by young professionals. Glasgow benefits from strong yields and growing demand from both students and workers.",
  },
  {
    slug: "cardiff",
    name: "Cardiff",
    region: "Wales",
    population: 369000,
    postcodePrefix: "CF",
    medianRent: {
      studio: 600,
      oneBed: 750,
      twoBed: 950,
      threeBed: 1200,
      fourBed: 1450,
    },
    averageYield: 5.8,
    rentGrowthYoY: 5.6,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1096,
    councilTaxBandD: 1653,
    topAreas: ["Cathays", "Roath", "Canton", "Pontcanna"],
    transportLinks:
      "Cardiff Central mainline station, bus network, and upcoming South Wales Metro improvements.",
    description:
      "Cardiff is Wales' capital and largest rental market, with strong demand from students and government workers. Cathays is the main student area, while Canton and Pontcanna attract young professionals. Welsh tenancy law provides additional protections for renters.",
  },
  {
    slug: "belfast",
    name: "Belfast",
    region: "Northern Ireland",
    population: 345000,
    postcodePrefix: "BT",
    medianRent: {
      studio: 500,
      oneBed: 625,
      twoBed: 800,
      threeBed: 1000,
      fourBed: 1250,
    },
    averageYield: 6.9,
    rentGrowthYoY: 7.0,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 923,
    councilTaxBandD: 1350,
    topAreas: ["Botanic Quarter", "Cathedral Quarter", "Stranmillis", "Ormeau"],
    transportLinks:
      "Belfast Central and Great Victoria Street stations, Glider bus rapid transit, and Belfast City and International airports.",
    description:
      "Belfast is seeing rapid rent growth as Northern Ireland's economy strengthens. The city offers some of the most affordable renting in the UK, with strong yields for landlords. The Botanic Quarter and Cathedral Quarter are popular with students and young professionals.",
  },
  {
    slug: "brighton",
    name: "Brighton",
    region: "South East",
    population: 290000,
    postcodePrefix: "BN",
    medianRent: {
      studio: 850,
      oneBed: 1050,
      twoBed: 1350,
      threeBed: 1650,
      fourBed: 2050,
    },
    averageYield: 4.5,
    rentGrowthYoY: 5.2,
    demandLevel: "Very High",
    studentPopulation: true,
    averageDeposit: 1558,
    councilTaxBandD: 2083,
    topAreas: ["North Laine", "Kemptown", "Hove", "Hanover"],
    transportLinks:
      "Brighton mainline station with fast services to London (under 1 hour). Extensive bus network along the coast.",
    description:
      "Brighton is one of the most expensive rental markets on the south coast, driven by London commuters, students, and its vibrant cultural scene. Supply is limited and demand is intense, particularly for one and two-bed properties near the seafront and station.",
  },
  {
    slug: "oxford",
    name: "Oxford",
    region: "South East",
    population: 162000,
    postcodePrefix: "OX",
    medianRent: {
      studio: 900,
      oneBed: 1100,
      twoBed: 1400,
      threeBed: 1750,
      fourBed: 2200,
    },
    averageYield: 4.3,
    rentGrowthYoY: 4.8,
    demandLevel: "Very High",
    studentPopulation: true,
    averageDeposit: 1615,
    councilTaxBandD: 2143,
    topAreas: ["Jericho", "Summertown", "Cowley", "Headington"],
    transportLinks:
      "Oxford mainline station with services to London Paddington. Extensive bus network including frequent services to London and airports.",
    description:
      "Oxford's rental market is shaped by the university, hospitals, and research institutions. Demand far exceeds supply, pushing rents well above regional averages. Competition is fierce, and properties in central areas like Jericho are snapped up quickly.",
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    region: "East of England",
    population: 145000,
    postcodePrefix: "CB",
    medianRent: {
      studio: 900,
      oneBed: 1100,
      twoBed: 1400,
      threeBed: 1750,
      fourBed: 2150,
    },
    averageYield: 4.2,
    rentGrowthYoY: 4.5,
    demandLevel: "Very High",
    studentPopulation: true,
    averageDeposit: 1615,
    councilTaxBandD: 2091,
    topAreas: ["Mill Road", "Chesterton", "Romsey", "Trumpington"],
    transportLinks:
      "Cambridge mainline station with fast services to London Kings Cross. Guided busway and extensive cycling infrastructure.",
    description:
      "Cambridge is driven by its world-renowned university and booming tech sector (Silicon Fen). Rental demand is extremely high, with limited supply keeping rents elevated. The biomedical campus and science parks add further pressure on housing stock.",
  },
  {
    slug: "bath",
    name: "Bath",
    region: "South West",
    population: 97000,
    postcodePrefix: "BA",
    medianRent: {
      studio: 800,
      oneBed: 975,
      twoBed: 1250,
      threeBed: 1550,
      fourBed: 1900,
    },
    averageYield: 4.4,
    rentGrowthYoY: 4.2,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1442,
    councilTaxBandD: 2016,
    topAreas: ["Oldfield Park", "Bear Flat", "Widcombe", "Bathwick"],
    transportLinks:
      "Bath Spa mainline station with services to London Paddington and Bristol. Park and ride bus services.",
    description:
      "Bath's UNESCO World Heritage status and compact size make it a desirable but expensive rental market. Student demand from the two universities adds to competition. Heritage building restrictions limit new supply, keeping rents high relative to earnings.",
  },
  {
    slug: "york",
    name: "York",
    region: "Yorkshire and the Humber",
    population: 211000,
    postcodePrefix: "YO",
    medianRent: {
      studio: 650,
      oneBed: 800,
      twoBed: 1025,
      threeBed: 1300,
      fourBed: 1600,
    },
    averageYield: 5.0,
    rentGrowthYoY: 5.1,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1183,
    councilTaxBandD: 1853,
    topAreas: ["The Groves", "Bishopthorpe Road", "Heworth", "Acomb"],
    transportLinks:
      "York mainline station on the East Coast Main Line with fast services to London, Edinburgh, and Leeds.",
    description:
      "York is a historic city with a tight rental market driven by tourism workers, university students, and commuters to Leeds. The city centre has limited stock, pushing rents upward. Family homes in suburbs like Acomb offer more affordable options.",
  },
  {
    slug: "exeter",
    name: "Exeter",
    region: "South West",
    population: 133000,
    postcodePrefix: "EX",
    medianRent: {
      studio: 650,
      oneBed: 800,
      twoBed: 1025,
      threeBed: 1275,
      fourBed: 1550,
    },
    averageYield: 5.2,
    rentGrowthYoY: 5.0,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1183,
    councilTaxBandD: 1960,
    topAreas: ["St James", "Mount Pleasant", "Heavitree", "Topsham"],
    transportLinks:
      "Exeter St Davids mainline station with services to London, Bristol, and Plymouth. Good bus network and Exeter Airport.",
    description:
      "Exeter's rental market is driven by its university, hospital, and growing professional services sector. The compact city centre has limited rental stock, while suburban areas like Topsham offer more space. Demand consistently outstrips supply.",
  },
  {
    slug: "southampton",
    name: "Southampton",
    region: "South East",
    population: 261000,
    postcodePrefix: "SO",
    medianRent: {
      studio: 650,
      oneBed: 800,
      twoBed: 1025,
      threeBed: 1275,
      fourBed: 1550,
    },
    averageYield: 5.5,
    rentGrowthYoY: 5.3,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1183,
    councilTaxBandD: 1849,
    topAreas: ["Portswood", "Ocean Village", "Shirley", "Bitterne"],
    transportLinks:
      "Southampton Central mainline station, good motorway access via M27/M3, bus network, and Southampton Airport.",
    description:
      "Southampton is a port city with two universities and a strong maritime economy. The rental market is affordable compared to nearby Winchester and Bournemouth. Portswood is the main student area, while Ocean Village attracts professionals.",
  },
  {
    slug: "portsmouth",
    name: "Portsmouth",
    region: "South East",
    population: 215000,
    postcodePrefix: "PO",
    medianRent: {
      studio: 600,
      oneBed: 750,
      twoBed: 950,
      threeBed: 1200,
      fourBed: 1450,
    },
    averageYield: 5.8,
    rentGrowthYoY: 5.1,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1096,
    councilTaxBandD: 1891,
    topAreas: ["Southsea", "Old Portsmouth", "Fratton", "North End"],
    transportLinks:
      "Portsmouth & Southsea and Portsmouth Harbour stations with services to London. Wightlink and Hovertravel to the Isle of Wight.",
    description:
      "Portsmouth is a compact island city with a military heritage and growing university. Southsea is the most popular rental area, offering seafront living at south coast prices. The density of the city means rental stock turns over quickly.",
  },
  {
    slug: "reading",
    name: "Reading",
    region: "South East",
    population: 174000,
    postcodePrefix: "RG",
    medianRent: {
      studio: 800,
      oneBed: 975,
      twoBed: 1250,
      threeBed: 1550,
      fourBed: 1900,
    },
    averageYield: 4.7,
    rentGrowthYoY: 4.6,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1442,
    councilTaxBandD: 1969,
    topAreas: ["Caversham", "Tilehurst", "Earley", "Woodley"],
    transportLinks:
      "Reading mainline station on the Great Western and Elizabeth Line, with fast services to London Paddington. Major motorway junction (M4/A33).",
    description:
      "Reading is a major commuter town with its own strong economy in tech and financial services. The Elizabeth Line has boosted demand, and rents reflect the easy access to London. The university adds to demand, particularly for HMOs.",
  },
  {
    slug: "milton-keynes",
    name: "Milton Keynes",
    region: "South East",
    population: 287000,
    postcodePrefix: "MK",
    medianRent: {
      studio: 700,
      oneBed: 850,
      twoBed: 1100,
      threeBed: 1375,
      fourBed: 1700,
    },
    averageYield: 5.3,
    rentGrowthYoY: 5.0,
    demandLevel: "High",
    studentPopulation: false,
    averageDeposit: 1269,
    councilTaxBandD: 1942,
    topAreas: ["Central Milton Keynes", "Wolverton", "Stony Stratford", "Newport Pagnell"],
    transportLinks:
      "Milton Keynes Central station with fast services to London Euston (35 mins). Extensive grid road system and Redway cycle network.",
    description:
      "Milton Keynes is a growing new town with a strong professional rental market. Fast London commute times and relative affordability drive demand. The city has newer housing stock than most UK cities, which appeals to tenants seeking modern properties.",
  },
  {
    slug: "coventry",
    name: "Coventry",
    region: "West Midlands",
    population: 379000,
    postcodePrefix: "CV",
    medianRent: {
      studio: 550,
      oneBed: 675,
      twoBed: 850,
      threeBed: 1075,
      fourBed: 1325,
    },
    averageYield: 6.2,
    rentGrowthYoY: 5.8,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 981,
    councilTaxBandD: 1883,
    topAreas: ["Earlsdon", "Chapelfields", "Stoke", "Styvechale"],
    transportLinks:
      "Coventry mainline station with services to London, Birmingham, and the North. Extensive bus network.",
    description:
      "Coventry's two universities and growing automotive and tech industries create strong rental demand. The city was UK City of Culture in 2021, boosting regeneration. Rents are more affordable than neighbouring Birmingham and Warwick.",
  },
  {
    slug: "derby",
    name: "Derby",
    region: "East Midlands",
    population: 259000,
    postcodePrefix: "DE",
    medianRent: {
      studio: 475,
      oneBed: 575,
      twoBed: 725,
      threeBed: 925,
      fourBed: 1150,
    },
    averageYield: 6.3,
    rentGrowthYoY: 4.8,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 837,
    councilTaxBandD: 1947,
    topAreas: ["Allestree", "Darley Abbey", "Littleover", "Mickleover"],
    transportLinks:
      "Derby mainline station with services to London, Birmingham, and Sheffield. Good road links via A38 and A50.",
    description:
      "Derby is an affordable Midlands city anchored by Rolls-Royce and other engineering firms. The rental market is steady, with good yields in suburban areas. The university adds some student demand, but the market is primarily driven by professionals and families.",
  },
  {
    slug: "stoke-on-trent",
    name: "Stoke-on-Trent",
    region: "West Midlands",
    population: 258000,
    postcodePrefix: "ST",
    medianRent: {
      studio: 400,
      oneBed: 475,
      twoBed: 600,
      threeBed: 750,
      fourBed: 950,
    },
    averageYield: 7.5,
    rentGrowthYoY: 4.2,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 692,
    councilTaxBandD: 1812,
    topAreas: ["Hanley", "Newcastle-under-Lyme", "Trentham", "Stone"],
    transportLinks:
      "Stoke-on-Trent mainline station on the West Coast Main Line. Good motorway links via M6.",
    description:
      "Stoke-on-Trent is one of the most affordable cities to rent in the UK, offering some of the highest gross yields nationally. The city's ceramics heritage is giving way to a more diversified economy. Keele University adds student demand to the market.",
  },
  {
    slug: "wolverhampton",
    name: "Wolverhampton",
    region: "West Midlands",
    population: 264000,
    postcodePrefix: "WV",
    medianRent: {
      studio: 475,
      oneBed: 575,
      twoBed: 725,
      threeBed: 925,
      fourBed: 1150,
    },
    averageYield: 6.6,
    rentGrowthYoY: 5.0,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 837,
    councilTaxBandD: 1936,
    topAreas: ["Tettenhall", "Penn", "Compton", "Finchfield"],
    transportLinks:
      "Wolverhampton mainline station with West Midlands Metro tram link to Birmingham. Extensive bus network.",
    description:
      "Wolverhampton offers affordable renting within easy reach of Birmingham via the Metro tram. The city has seen regeneration around the station quarter, and rents are gradually rising. It appeals to tenants priced out of Birmingham's centre.",
  },
  {
    slug: "plymouth",
    name: "Plymouth",
    region: "South West",
    population: 264000,
    postcodePrefix: "PL",
    medianRent: {
      studio: 525,
      oneBed: 650,
      twoBed: 825,
      threeBed: 1025,
      fourBed: 1275,
    },
    averageYield: 5.8,
    rentGrowthYoY: 4.5,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 952,
    councilTaxBandD: 1882,
    topAreas: ["The Barbican", "Mutley", "Peverell", "Mannamead"],
    transportLinks:
      "Plymouth mainline station with services to London Paddington. Ferry terminal with routes to France and Spain. City bus network.",
    description:
      "Plymouth is a naval city with a university and growing marine science sector. The waterfront area has seen significant regeneration. Rents are among the most affordable in the South West, making it popular with students and military personnel.",
  },
  {
    slug: "sunderland",
    name: "Sunderland",
    region: "North East",
    population: 277000,
    postcodePrefix: "SR",
    medianRent: {
      studio: 375,
      oneBed: 450,
      twoBed: 575,
      threeBed: 700,
      fourBed: 875,
    },
    averageYield: 7.8,
    rentGrowthYoY: 4.0,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 664,
    councilTaxBandD: 1873,
    topAreas: ["Roker", "Seaburn", "Ashbrooke", "Park Lane"],
    transportLinks:
      "Sunderland mainline station, Tyne and Wear Metro connections, and bus network. Close to Newcastle Airport.",
    description:
      "Sunderland offers some of the lowest rents and highest yields in England. The university and Nissan plant drive demand. Coastal areas like Roker and Seaburn are popular with tenants seeking affordable seafront living.",
  },
  {
    slug: "bradford",
    name: "Bradford",
    region: "Yorkshire and the Humber",
    population: 546000,
    postcodePrefix: "BD",
    medianRent: {
      studio: 400,
      oneBed: 500,
      twoBed: 625,
      threeBed: 800,
      fourBed: 1000,
    },
    averageYield: 7.2,
    rentGrowthYoY: 4.5,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 721,
    councilTaxBandD: 1810,
    topAreas: ["Saltaire", "Shipley", "Ilkley", "Bingley"],
    transportLinks:
      "Bradford Interchange and Forster Square stations with services to Leeds. Bus network and proximity to Leeds-Bradford Airport.",
    description:
      "Bradford is one of the most affordable cities in the UK to rent, with strong yields for investors. The city is close to Leeds, and areas like Saltaire (a UNESCO World Heritage Site) attract commuters seeking character properties at lower prices.",
  },
  {
    slug: "norwich",
    name: "Norwich",
    region: "East of England",
    population: 144000,
    postcodePrefix: "NR",
    medianRent: {
      studio: 575,
      oneBed: 700,
      twoBed: 900,
      threeBed: 1125,
      fourBed: 1375,
    },
    averageYield: 5.5,
    rentGrowthYoY: 5.0,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1038,
    councilTaxBandD: 2048,
    topAreas: ["Golden Triangle", "Eaton", "Thorpe Hamlet", "Unthank Road"],
    transportLinks:
      "Norwich mainline station with services to London Liverpool Street. Bus network and Norwich Airport.",
    description:
      "Norwich is a self-contained city with a strong local economy in insurance, research, and food production. The University of East Anglia drives student demand, particularly in the Golden Triangle. The city has a loyal tenant base with many choosing to stay long-term.",
  },
  {
    slug: "swansea",
    name: "Swansea",
    region: "Wales",
    population: 246000,
    postcodePrefix: "SA",
    medianRent: {
      studio: 450,
      oneBed: 550,
      twoBed: 700,
      threeBed: 875,
      fourBed: 1100,
    },
    averageYield: 6.0,
    rentGrowthYoY: 4.8,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 808,
    councilTaxBandD: 1812,
    topAreas: ["Uplands", "Brynmill", "Sketty", "Mumbles"],
    transportLinks:
      "Swansea mainline station with services to London Paddington. Bus network and proximity to Gower Peninsula.",
    description:
      "Swansea offers affordable coastal renting with the beautiful Gower Peninsula on its doorstep. The university drives student demand in Uplands and Brynmill. Mumbles is a premium area commanding higher rents. Welsh tenancy law applies.",
  },
  {
    slug: "aberdeen",
    name: "Aberdeen",
    region: "Scotland",
    population: 229000,
    postcodePrefix: "AB",
    medianRent: {
      studio: 500,
      oneBed: 625,
      twoBed: 800,
      threeBed: 1025,
      fourBed: 1275,
    },
    averageYield: 5.5,
    rentGrowthYoY: 3.5,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 923,
    councilTaxBandD: 1504,
    topAreas: ["West End", "Rosemount", "Old Aberdeen", "Torry"],
    transportLinks:
      "Aberdeen mainline station with services to Edinburgh, Glasgow, and London. Aberdeen Airport with domestic and international flights.",
    description:
      "Aberdeen's rental market has stabilised after years of decline following the oil price drop. Rents are recovering as the energy sector diversifies into renewables. The city has two universities and a strong professional tenant base.",
  },
  {
    slug: "dundee",
    name: "Dundee",
    region: "Scotland",
    population: 149000,
    postcodePrefix: "DD",
    medianRent: {
      studio: 425,
      oneBed: 525,
      twoBed: 675,
      threeBed: 850,
      fourBed: 1075,
    },
    averageYield: 6.5,
    rentGrowthYoY: 4.5,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 779,
    councilTaxBandD: 1414,
    topAreas: ["West End", "Broughty Ferry", "City Centre", "Perth Road"],
    transportLinks:
      "Dundee mainline station with services to Edinburgh, Glasgow, and Aberdeen. Bus network and Dundee Airport.",
    description:
      "Dundee is undergoing a cultural renaissance anchored by the V&A Museum. The waterfront regeneration has attracted new tenants, and the two universities provide consistent student demand. Rents remain very affordable compared to Edinburgh.",
  },
  {
    slug: "bournemouth",
    name: "Bournemouth",
    region: "South West",
    population: 199000,
    postcodePrefix: "BH",
    medianRent: {
      studio: 700,
      oneBed: 850,
      twoBed: 1100,
      threeBed: 1375,
      fourBed: 1700,
    },
    averageYield: 5.0,
    rentGrowthYoY: 5.5,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1269,
    councilTaxBandD: 2012,
    topAreas: ["Westbourne", "Boscombe", "Charminster", "Winton"],
    transportLinks:
      "Bournemouth mainline station with services to London Waterloo. Bus network along the coast and Bournemouth Airport.",
    description:
      "Bournemouth is a popular seaside town with a growing digital economy and language school sector driving rental demand. The university and coastal lifestyle attract a mix of tenants. Rents are higher than inland Dorset, particularly near the beach.",
  },
  {
    slug: "luton",
    name: "Luton",
    region: "East of England",
    population: 225000,
    postcodePrefix: "LU",
    medianRent: {
      studio: 650,
      oneBed: 800,
      twoBed: 1025,
      threeBed: 1275,
      fourBed: 1550,
    },
    averageYield: 5.8,
    rentGrowthYoY: 5.2,
    demandLevel: "High",
    studentPopulation: false,
    averageDeposit: 1183,
    councilTaxBandD: 1923,
    topAreas: ["Old Town", "New Town", "Round Green", "Stopsley"],
    transportLinks:
      "Luton mainline station and Luton Airport Parkway with Thameslink services to London. London Luton Airport on the doorstep.",
    description:
      "Luton offers affordable renting within easy commuting distance of London via Thameslink. The airport and proximity to the M1 drive demand from airport workers and commuters. Rental growth has been steady as London tenants seek more affordable alternatives.",
  },
  {
    slug: "northampton",
    name: "Northampton",
    region: "East Midlands",
    population: 231000,
    postcodePrefix: "NN",
    medianRent: {
      studio: 550,
      oneBed: 675,
      twoBed: 850,
      threeBed: 1075,
      fourBed: 1325,
    },
    averageYield: 5.6,
    rentGrowthYoY: 4.8,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 981,
    councilTaxBandD: 1851,
    topAreas: ["Abington", "Far Cotton", "Kingsthorpe", "Weston Favell"],
    transportLinks:
      "Northampton mainline station with services to London Euston (under 1 hour). Good road links via M1.",
    description:
      "Northampton is a growing town with fast London commuter links that drive rental demand. The University of Northampton's new waterside campus has boosted the town centre. Rents are affordable compared to nearby Milton Keynes.",
  },
  {
    slug: "peterborough",
    name: "Peterborough",
    region: "East of England",
    population: 215000,
    postcodePrefix: "PE",
    medianRent: {
      studio: 525,
      oneBed: 650,
      twoBed: 825,
      threeBed: 1025,
      fourBed: 1275,
    },
    averageYield: 5.8,
    rentGrowthYoY: 4.5,
    demandLevel: "Medium",
    studentPopulation: false,
    averageDeposit: 952,
    councilTaxBandD: 1788,
    topAreas: ["City Centre", "Longthorpe", "Werrington", "Hampton"],
    transportLinks:
      "Peterborough mainline station on the East Coast Main Line with fast services to London Kings Cross (under 50 mins).",
    description:
      "Peterborough offers affordable renting with excellent rail links to London. The city has seen significant growth and development, with new housing estates in areas like Hampton. It attracts commuters and families seeking space at lower prices.",
  },
  {
    slug: "cheltenham",
    name: "Cheltenham",
    region: "South West",
    population: 118000,
    postcodePrefix: "GL",
    medianRent: {
      studio: 650,
      oneBed: 800,
      twoBed: 1025,
      threeBed: 1300,
      fourBed: 1600,
    },
    averageYield: 4.8,
    rentGrowthYoY: 4.5,
    demandLevel: "High",
    studentPopulation: false,
    averageDeposit: 1183,
    councilTaxBandD: 1882,
    topAreas: ["Montpellier", "Pittville", "Leckhampton", "Charlton Kings"],
    transportLinks:
      "Cheltenham Spa mainline station with services to London, Birmingham, and Bristol. Bus network.",
    description:
      "Cheltenham is an elegant Regency town with a strong professional rental market driven by GCHQ, financial services, and the festivals circuit. Montpellier is the premium area, while outer suburbs offer better value for families.",
  },
  {
    slug: "chester",
    name: "Chester",
    region: "North West",
    population: 133000,
    postcodePrefix: "CH",
    medianRent: {
      studio: 600,
      oneBed: 725,
      twoBed: 925,
      threeBed: 1175,
      fourBed: 1450,
    },
    averageYield: 5.0,
    rentGrowthYoY: 4.3,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1067,
    councilTaxBandD: 1877,
    topAreas: ["Hoole", "Boughton", "Handbridge", "Upton"],
    transportLinks:
      "Chester mainline station with services to London, Manchester, and North Wales. Bus network and close to Chester Business Park.",
    description:
      "Chester is a historic walled city with a professional rental market driven by finance, legal services, and tourism. The compact city centre has limited stock, and demand from the university adds to competition. It commands higher rents than nearby Liverpool.",
  },
  {
    slug: "canterbury",
    name: "Canterbury",
    region: "South East",
    population: 164000,
    postcodePrefix: "CT",
    medianRent: {
      studio: 650,
      oneBed: 800,
      twoBed: 1025,
      threeBed: 1275,
      fourBed: 1550,
    },
    averageYield: 5.2,
    rentGrowthYoY: 4.8,
    demandLevel: "High",
    studentPopulation: true,
    averageDeposit: 1183,
    councilTaxBandD: 2024,
    topAreas: ["City Centre", "Herne Bay", "Whitstable", "Sturry"],
    transportLinks:
      "Canterbury East and Canterbury West stations with high-speed services to London St Pancras (under 1 hour).",
    description:
      "Canterbury's three universities make it a major student rental market relative to its size. The high-speed rail link to London has also attracted commuters. Nearby Whitstable commands premium rents as a desirable coastal alternative.",
  },
  {
    slug: "colchester",
    name: "Colchester",
    region: "East of England",
    population: 193000,
    postcodePrefix: "CO",
    medianRent: {
      studio: 600,
      oneBed: 750,
      twoBed: 950,
      threeBed: 1200,
      fourBed: 1450,
    },
    averageYield: 5.3,
    rentGrowthYoY: 4.5,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 1096,
    councilTaxBandD: 1978,
    topAreas: ["Wivenhoe", "Lexden", "Old Town", "Mile End"],
    transportLinks:
      "Colchester mainline station with services to London Liverpool Street. Good road links via A12.",
    description:
      "Colchester is Britain's oldest recorded town and a growing commuter destination for London workers. The University of Essex drives student demand in nearby Wivenhoe. The garrison also contributes military tenants to the rental market.",
  },
  {
    slug: "ipswich",
    name: "Ipswich",
    region: "East of England",
    population: 140000,
    postcodePrefix: "IP",
    medianRent: {
      studio: 525,
      oneBed: 650,
      twoBed: 825,
      threeBed: 1025,
      fourBed: 1275,
    },
    averageYield: 5.8,
    rentGrowthYoY: 4.3,
    demandLevel: "Medium",
    studentPopulation: false,
    averageDeposit: 952,
    councilTaxBandD: 1876,
    topAreas: ["Waterfront", "Christchurch Park", "Tuddenham", "Rushmere"],
    transportLinks:
      "Ipswich mainline station with services to London Liverpool Street (just over 1 hour). Bus network.",
    description:
      "Ipswich offers affordable renting in East Anglia with reasonable London commute times. The waterfront regeneration has attracted new tenants, and the insurance and financial services sector provides professional demand. Rents remain below the regional average.",
  },
  {
    slug: "lincoln",
    name: "Lincoln",
    region: "East Midlands",
    population: 104000,
    postcodePrefix: "LN",
    medianRent: {
      studio: 450,
      oneBed: 550,
      twoBed: 700,
      threeBed: 875,
      fourBed: 1100,
    },
    averageYield: 6.4,
    rentGrowthYoY: 4.2,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 808,
    councilTaxBandD: 1756,
    topAreas: ["Uphill", "Brayford", "West End", "Monks Road"],
    transportLinks:
      "Lincoln Central station with services to Nottingham, Sheffield, and London. Bus network.",
    description:
      "Lincoln is a cathedral city with a growing university that drives student rental demand. The Brayford waterfront area has seen significant development. Rents are very affordable, making it attractive for students and first-time renters.",
  },
  {
    slug: "gloucester",
    name: "Gloucester",
    region: "South West",
    population: 133000,
    postcodePrefix: "GL",
    medianRent: {
      studio: 525,
      oneBed: 650,
      twoBed: 825,
      threeBed: 1050,
      fourBed: 1300,
    },
    averageYield: 5.6,
    rentGrowthYoY: 4.5,
    demandLevel: "Medium",
    studentPopulation: false,
    averageDeposit: 952,
    councilTaxBandD: 1886,
    topAreas: ["Kingsholm", "Gloucester Docks", "Longlevens", "Barnwood"],
    transportLinks:
      "Gloucester mainline station with services to London, Bristol, and Birmingham. Good motorway links via M5.",
    description:
      "Gloucester is an affordable cathedral city close to Cheltenham and the Cotswolds. The Docks area has been regenerated into a popular residential quarter. Rents are noticeably lower than neighbouring Cheltenham, attracting budget-conscious tenants.",
  },
  {
    slug: "worcester",
    name: "Worcester",
    region: "West Midlands",
    population: 103000,
    postcodePrefix: "WR",
    medianRent: {
      studio: 525,
      oneBed: 650,
      twoBed: 825,
      threeBed: 1050,
      fourBed: 1300,
    },
    averageYield: 5.4,
    rentGrowthYoY: 4.2,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 952,
    councilTaxBandD: 1845,
    topAreas: ["St Johns", "Barbourne", "Diglis", "Claines"],
    transportLinks:
      "Worcester Shrub Hill and Foregate Street stations with services to London, Birmingham, and Hereford.",
    description:
      "Worcester is a historic cathedral city on the River Severn with a small but active rental market. The university provides steady student demand, and the city's position between Birmingham and the countryside appeals to professionals seeking a quieter lifestyle.",
  },
  {
    slug: "carlisle",
    name: "Carlisle",
    region: "North West",
    population: 108000,
    postcodePrefix: "CA",
    medianRent: {
      studio: 375,
      oneBed: 450,
      twoBed: 575,
      threeBed: 725,
      fourBed: 900,
    },
    averageYield: 6.8,
    rentGrowthYoY: 3.8,
    demandLevel: "Low",
    studentPopulation: true,
    averageDeposit: 664,
    councilTaxBandD: 1895,
    topAreas: ["Stanwix", "Botcherby", "Harraby", "Denton Holme"],
    transportLinks:
      "Carlisle mainline station on the West Coast Main Line with services to London, Glasgow, and Edinburgh. Close to the Scottish border.",
    description:
      "Carlisle is a border city with some of the lowest rents in England. The University of Cumbria provides modest student demand. Its location on the West Coast Main Line offers rail connections to both England and Scotland.",
  },
  {
    slug: "inverness",
    name: "Inverness",
    region: "Scotland",
    population: 63000,
    postcodePrefix: "IV",
    medianRent: {
      studio: 450,
      oneBed: 575,
      twoBed: 725,
      threeBed: 925,
      fourBed: 1150,
    },
    averageYield: 5.2,
    rentGrowthYoY: 4.0,
    demandLevel: "Medium",
    studentPopulation: false,
    averageDeposit: 837,
    councilTaxBandD: 1426,
    topAreas: ["Crown", "Ness-side", "Culloden", "Balloch"],
    transportLinks:
      "Inverness mainline station as the northern terminus of rail services from London, Edinburgh, and Glasgow. Inverness Airport with domestic flights.",
    description:
      "Inverness is the capital of the Scottish Highlands and a growing regional hub. Rental supply is limited, and demand from NHS Highland, UHI, and tourism workers keeps the market tight. Scottish tenancy protections apply, including rent caps.",
  },
  {
    slug: "stirling",
    name: "Stirling",
    region: "Scotland",
    population: 48000,
    postcodePrefix: "FK",
    medianRent: {
      studio: 475,
      oneBed: 600,
      twoBed: 775,
      threeBed: 975,
      fourBed: 1200,
    },
    averageYield: 5.5,
    rentGrowthYoY: 4.2,
    demandLevel: "Medium",
    studentPopulation: true,
    averageDeposit: 894,
    councilTaxBandD: 1440,
    topAreas: ["Bridge of Allan", "King's Park", "Causewayhead", "Raploch"],
    transportLinks:
      "Stirling mainline station with services to Edinburgh, Glasgow, and the Highlands. Central location in Scotland with good motorway links.",
    description:
      "Stirling is a university city positioned between Edinburgh and Glasgow, offering more affordable renting than either. The University of Stirling drives student demand, particularly in Bridge of Allan. Its central location makes it popular with commuters to both cities.",
  },
];

export function getAllAreas(): AreaData[] {
  return areas;
}

export function getAreaBySlug(slug: string): AreaData | undefined {
  return areas.find((a) => a.slug === slug);
}

export function getAllAreaSlugs(): string[] {
  return areas.map((a) => a.slug);
}

/**
 * Get nearby areas for a given area (same region, or geographically close).
 * Returns up to 5 areas, excluding the given area itself.
 */
export function getNearbyAreas(slug: string): AreaData[] {
  const area = getAreaBySlug(slug);
  if (!area) return [];

  // First, prioritise same-region areas
  const sameRegion = areas.filter(
    (a) => a.region === area.region && a.slug !== slug
  );

  if (sameRegion.length >= 5) {
    return sameRegion.slice(0, 5);
  }

  // Fill remaining slots with areas from nearby regions
  const regionProximity: Record<string, string[]> = {
    London: ["South East", "East of England"],
    "South East": ["London", "South West", "East of England"],
    "South West": ["South East", "Wales"],
    "East of England": ["South East", "London", "East Midlands"],
    "West Midlands": ["East Midlands", "North West", "South West"],
    "East Midlands": ["West Midlands", "Yorkshire and the Humber", "East of England"],
    "North West": ["Yorkshire and the Humber", "West Midlands", "North East", "Wales"],
    "North East": ["Yorkshire and the Humber", "North West", "Scotland"],
    "Yorkshire and the Humber": ["North East", "North West", "East Midlands"],
    Wales: ["South West", "West Midlands", "North West"],
    Scotland: ["North East", "North West"],
    "Northern Ireland": ["Scotland", "North West"],
  };

  const nearby = [...sameRegion];
  const nearbyRegions = regionProximity[area.region] || [];

  for (const region of nearbyRegions) {
    if (nearby.length >= 5) break;
    const fromRegion = areas.filter(
      (a) => a.region === region && a.slug !== slug && !nearby.includes(a)
    );
    nearby.push(...fromRegion);
  }

  return nearby.slice(0, 5);
}
