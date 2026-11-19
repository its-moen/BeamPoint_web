// All content lives here. Edit text and numbers in this one file.
window.SITE = {
  nav: [["index.html","Device"],["business.html","Business"],["project.html","Project"]],
  problem: [
    {i:"sweep",t:"Alignment is slow and unreliable",b:"Installers sweep the antenna by hand and watch signal bars. One alignment takes 40 minutes to two hours, and often ends on a crowded or distant tower."},
    {i:"wrong",t:"Tools do not fit the market",b:"Spectrum analysers cost UGX 15m and up. Imported tools cost UGX 4 to 9m with no local data. Free apps give no bearing."},
    {i:"log",t:"Skill lives in people's heads",b:"Nothing records which tower was chosen or why, so the knowledge leaves when a technician changes employer."}
  ],
  steps: [
    {t:"GNSS fix",b:"Know where the install is."},
    {t:"Scan cells",b:"Listen for nearby network signals."},
    {t:"Match towers",b:"Connect the scan to the tower database."},
    {t:"Score options",b:"Balance quality, distance and terrain."},
    {t:"Compute bearing",b:"Get angle and elevation before climbing."},
    {t:"Guide the aim",b:"Follow the dial and the rising tone."},
    {t:"Lock and log",b:"Save the result to the dashboard."}
  ],
  status: ["Fixing position: 0.42 N, 33.20 E","Scanning cells","3 towers resolved","Ranking by quality","Target bearing 042 deg, +2.1 elev","Turn right, tone rising","Locked and logged"],
  features: [
    {t:"Quality ranked",b:"RSRP, RSRQ and SINR with distance, not the single signal bar."},
    {t:"Terrain aware",b:"An offline elevation model flags blocked paths before the mast goes up."},
    {t:"Learns from the fleet",b:"Every installation refines the tower database."},
    {t:"Built for the field",b:"Offline first, a full day on one charge, IP65 and ladder proof."}
  ],
  specs: [["Display","2.8 inch, sunlight readable"],["Cellular","LTE Cat-4 with neighbour cell report"],["Position","Multi-constellation GNSS"],["Heading","9-axis tilt compensated"],["Battery","5,000 mAh, USB-C"],["Enclosure","IP65 with antenna clamp"]],
  pricing: [
    {p:"UGX 1,200,000",u:"one time",t:"Buy",b:"Own the instrument outright."},
    {p:"UGX 150,000",u:"per month for 12 months",t:"Lease to own",b:"Spread the cost across the field team."},
    {p:"UGX 90,000",u:"per week",t:"Weekly rental",b:"Try BP-1 on the next install sprint."},
    {p:"UGX 45,000",u:"per device per month",t:"Data subscription",b:"Keep tower intelligence current."},
    {p:"UGX 1.5m",u:"per year",t:"Dashboard",b:"Turn every lock into operations evidence."},
    {p:"UGX 250,000",u:"per technician",t:"Training",b:"Make the first field day count."}
  ],
  market: [["Tier-2 and 3 ISPs",210],["WISPs and community",120],["Contractors",180],["CCTV, solar, IoT",180],["Training institutes",50]],
  bom: [["Cellular module",78],["GNSS",42],["Power",28],["Orientation IMU",27],["Enclosure",26],["Interface",24],["Processing",15],["Assembly",15]],
  cash: [["Q1",29.5],["Q2",6.3],["Q3",11.2],["Q4",30.6]],
  roadmap: [
    {m:"Months 1 to 2",t:"Concierge test",b:"Rank towers by hand and send a bearing by WhatsApp. Register the company."},
    {m:"Months 3 to 5",t:"Breadboard MVP",b:"GNSS, compass and LTE scan in 5 field pilot units. UCC application in month 5."},
    {m:"Months 6 to 8",t:"Engineering prototype",b:"Custom PCB, dashboard and a 25 unit batch. Collect pre-orders."},
    {m:"Months 9 to 12",t:"Commercial release",b:"Subscription goes live. Second batch of 20 units."}
  ],
  team: [
    {n:"Bwire Rodney Desire",r:"Venture lead"},{n:"Ssengendo Miracle",r:"Technology lead"},
    {n:"Mayanja Joel Stephen",r:"Product and UX"},{n:"Lubanga Shafick",r:"Marketing"},
    {n:"Mutakubwa Shalifu",r:"Finance and legal"}
  ],
  risks: [{id:"R1",t:"Tower data incomplete",s:16},{id:"R2",t:"Import cost and exchange rate",s:12},{id:"R3",t:"UCC approval delay",s:12},{id:"R8",t:"Device damage in the field",s:12},{id:"R6",t:"Data breach",s:10}],
  legal: [
    {t:"Company registration",w:"Month 2",b:"Private limited company with URSB, plus a TIN from URA and a trading license."},
    {t:"UCC type approval",w:"Months 5 to 6",b:"The device has a cellular module, so it needs approval before import, sale or use."},
    {t:"Data protection",w:"Before first customer data",b:"Installation logs carry GPS positions of premises. Register as a data controller or processor."},
    {t:"Trademark",w:"Month 6",b:"Protect the BeamPoint name, firmware and database."}
  ],
  // demo and dashboard (illustrative sample data)
  towers: [
    {site:"JJA-014",q:92,km:3.2,b:47,el:2.1,note:"Clear path, top match"},
    {site:"JJA-031",q:71,km:5.8,b:112,el:1.4,note:"Moderate terrain"},
    {site:"NKT-007",q:58,km:7.4,b:226,el:0.9,note:"Longer hop, verify"},
    {site:"JJA-022",q:44,km:2.7,b:302,el:3.4,note:"Blocked by ridge"}
  ],
  kpis: [["267","Installations",""],["17 min","Avg alignment time","vs 70 min baseline"],["4","Repeat visits","vs 16 per month"],["15.8 dB","Avg SINR",""]],
  weekly: [["W1",22],["W2",31],["W3",28],["W4",40],["W5",46],["W6",52],["W7",48]],
  techs: [["Technician A",64,16],["Technician B",58,18],["Technician C",52,17],["Technician D",49,19],["Technician E",44,16]],
  jobsSample: [["JOB-1042","JJA-014",92,"09:12"],["JOB-1041","JJA-031",71,"08:40"],["JOB-1040","JJA-014",90,"08:05"]],
  survey: [["40+ min alignment",75],["Repeat visit last month",95],["Would use BP-1",85],["Would recommend",85],["Needs offline mode",65],["Would pay UGX 800k+",95],["Open to lease or rental",75],["Accepts UGX 45k subscription",50],["Ops manager or owner decides",75]],
  footer: {
    tag: "Align to a number, not a guess. A handheld antenna-alignment instrument and data service for internet installers in Uganda.",
    cols: [
      {h:"Explore",links:[["Device","index.html"],["How it works","index.html#how"],["Try the demo","index.html#demo"],["Bearing planner","index.html#planner"]]},
      {h:"For providers",links:[["Pricing","business.html#pricing"],["ROI calculator","business.html#savings"],["Dashboard preview","business.html#dashboard"],["Break-even","business.html#breakeven"],["Book a free pilot","project.html#pilot"]]},
      {h:"Project",links:[["Roadmap","project.html#roadmap"],["Team","project.html#team"],["Risks","project.html#risks"],["Legal steps","project.html#legal"],["Pilot tracker","project.html#tracker"]]}
    ],
    copy: "2026 BeamPoint. Planning estimates for a course project. Sample data is labelled as sample.",
    place: "Jinja, Uganda"
  }
};
