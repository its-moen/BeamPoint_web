// All content lives here. Edit text and numbers in this one file.
window.SITE = {
  nav: [["index.html","Device"],["business.html","Business"],["project.html","Project"]],
  problem: [
    {i:"sweep",t:"Blind sweeping",b:"Installers rotate the antenna by hand and watch signal bars. One alignment can take 40 minutes to two hours."},
    {i:"wrong",t:"Wrong tower",b:"Strong bars can come from a crowded or distant tower. Quality matters more than strength."},
    {i:"repeat",t:"Repeat visits",b:"Every return trip costs fuel, labour and half a day of a crew's time."},
    {i:"log",t:"Lost knowledge",b:"Nothing records which tower was chosen or why, so skill leaves when a technician does."}
  ],
  steps: [
    {t:"Fix position",b:"GNSS gives the site coordinates and altitude."},
    {t:"Scan",b:"The LTE module lists the serving and neighbouring cells."},
    {t:"Resolve towers",b:"Cell identities are matched to the offline tower database."},
    {t:"Score and rank",b:"Quality, distance and terrain clearance decide the winner."},
    {t:"Compute geometry",b:"Great-circle bearing and elevation to the best tower."},
    {t:"Guide",b:"Compass and dial close the gap while the tone rises."},
    {t:"Lock and log",b:"Readings, position and time are saved and synced."}
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
    {p:"UGX 1,200,000",u:"one time",t:"Buy",b:"Outright purchase for established providers."},
    {p:"UGX 150,000",u:"per month for 12 months",t:"Lease to own",b:"For small operators. The device is yours at term."},
    {p:"UGX 90,000",u:"per week",t:"Rent",b:"For contractors with project or seasonal work."},
    {p:"UGX 45,000",u:"per device per month",t:"Data subscription",b:"Tower updates, cloud sync and installation reports."}
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
  footer: "BeamPoint BP-1. Planning estimates for a course project. Jinja, Uganda."
};
