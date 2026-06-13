/* ============================================================
   De-AirTech · Fabric Filter Solutions — slide content data
   Blocks: lead, stats, cards, list, specs, steps, note, badges,
   bars, fig, figs, split. Images from the original PPT are
   integrated throughout.
   ============================================================ */
const IMG = "assets/img/";

const SLIDES = [

/* 1 — COVER */
{ type:"cover", bg:IMG+"image3.jpg", corp:IMG+"image1.png",
  kicker:"Air Pollution Control",
  l1:"Fabric Filter", l2:"Solutions",
  sub:"Advanced bag filter technology for industrial air pollution control.",
  tag:"Engineering Excellence Since 2002" },

/* 2 — CONTENTS */
{ type:"toc", kicker:"Presentation Overview", title:"Contents", chip:"Overview",
  items:[
    ["01","Company Profile","About De-AirTech, history & organization"],
    ["02","Fabric Filter Technology","Working principle, components & features"],
    ["03","Product Portfolio","Pulse jet, LWP, modular & high-temp filters"],
    ["04","Technical Advantages","Filtration efficiency, cleaning & control"],
    ["05","Industry Applications","Cement, power, waste incineration & more"],
    ["06","Project References","Global installations & success stories"],
    ["07","Service & Support","Maintenance, spare parts & ESP conversion"]
  ]},

/* 3 — CHAPTER 01 */
{ type:"chapter", n:"01", bg:IMG+"image4.jpeg", kicker:"Chapter 01",
  title:"Company Profile", sub:"Your trusted partner in air quality control." },

/* 4 — ABOUT */
{ type:"content", kicker:"Company Profile", title:"About De-AirTech", chip:"Company Profile",
  layout:"r6040",
  main:[
    {lead:["Our Mission",["Reducing emissions is a mandatory, complex task for any industry. We deliver air quality solutions that comply with present and future regulations while respecting each plant's process, schedule and budget."]]},
    {lead:["Core Expertise",["Full experience across design, engineering, construction, start-up, operation and maintenance of Air Quality Systems — backed by in-house flow-dynamic models and computer simulation."]]},
    {lead:["Global Application",["Countless in-situ emission control systems let us confidently apply our technology to any requirement, across diverse industries worldwide."]]}
  ],
  side:[
    {label:"Company Strengths"},
    {stats:[ {n:"20",u:"+",l:"Years Experience"},{n:"100",u:"+",l:"Partners"},
             {n:"110",u:"+",l:"Projects"},{n:"20",u:"+",l:"Engineers"} ], cls:"c2"},
    {note:["Quality Assurance","ISO 9001 · CE · NEMA · EAC certified — meeting increasingly stringent environmental standards."]}
  ]},

/* 5 — CHAPTER 02 */
{ type:"chapter", n:"02", bg:IMG+"image5.jpg", kicker:"Chapter 02",
  title:"Fabric Filter Technology", sub:"Understanding bag filter systems." },

/* 6 — WHAT IS A FABRIC FILTER */
{ type:"content", kicker:"Fabric Filter Technology", title:"What is a Fabric Filter?", chip:"Fabric Filter Technology",
  layout:"r5545",
  main:[
    {lead:["Definition & Purpose",[
      "A fabric filter — also called a baghouse or bag filter — removes particulate matter from industrial exhaust gases, using fabric bags as the filtering medium.",
      "Its inherent high collection efficiency makes it highly effective at capturing fine particulates and heavy metals to meet stringent regulations."]]},
    {cardsTitle:"Applications"},
    {cards:[
      ["Power Generation","Coal-fired steam generators, stoker-fired & fluidized-bed boilers"],
      ["Waste Incineration","Municipal & medical waste incinerators, cogeneration"],
      ["Industrial Processes","Steel, cement, rock products, aluminum & glass"]
    ], cls:"c3"}
  ],
  side:[
    {stats:[ {n:"99.99",u:"%+",l:"Collection Efficiency"},{p:"<",n:"10",u:" mg/Nm³",l:"Emission"},
             {n:"2-5",l:"Years Bag Life"},{p:"<",n:"1500",u:" Pa",l:"Pressure Drop"} ], cls:"c2"},
    {note:["Advanced Capabilities","With dry sorbents, fabric filters capture air toxics such as mercury, dioxins and furans — at far lower injection rates than ESPs."]}
  ]},

/* 7 — WORKING PRINCIPLE */
{ type:"content", kicker:"Fabric Filter Technology", title:"Working Principle", chip:"Fabric Filter Technology",
  layout:"rows",
  rows:[
    {steps:[
      ["1","Dirty Gas Inlet","Contaminated gas enters the housing, evenly distributed across the chamber."],
      ["2","Filtration","Gas flows through bags outside-to-inside; dust forms a cake on the outer surface."],
      ["3","Clean Gas Outlet","Filtered gas exits the bag tops into the clean-air chamber and outlet."],
      ["4","Cleaning Cycle","At the set pressure drop, pulse-jet cleaning dislodges the dust cake."],
      ["5","Dust Discharge","Collected dust falls to the hopper and is removed via the discharge valve."]
    ]},
    {split:true, ratio:"r6040", gap:"34px", cols:[
      [ {cards:[
          ["Filtration Mode","Outside-to-inside filtration with dust-cake formation on the external bag surface for enhanced efficiency."],
          ["Online Cleaning","Pulse-jet cleaning runs while the system operates — continuous filtration with no shutdown."]
        ], cls:"c2"} ],
      [ {fig:{src:IMG+"image6.jpeg", mode:"contain", ar:"16/9", cap:"System schematic"}} ]
    ]}
  ]},

/* 8 — KEY COMPONENTS */
{ type:"content", kicker:"Fabric Filter Technology", title:"Key Components", chip:"Fabric Filter Technology",
  layout:"rows",
  rows:[
    {cards:[
      ["Filter Bags","Specialized fabrics (polyester, PPS, PTFE, fiberglass) chosen for temperature, chemistry and particles.",["1–12 m length","120–160 mm dia"]],
      ["Filter Cages","Metal wire cages support the bags and prevent collapse — carbon, stainless or galvanized steel.",["10–24 wires","150–200 mm rings"]],
      ["Cleaning System","Pulse-jet cleaning with air tank, solenoid valves, blow pipes and nozzles for cake removal.",["0.25–0.6 MPa","100–200 ms"]],
      ["Control System","PLC-based control with differential-pressure & temperature monitoring and auto sequences.",["Siemens · AB","HMI touchscreen"]],
      ["Hoppers & Discharge","Hoppers with ≥60° slopes prevent bridging; rotary valves, screws or pneumatic conveying.",["Heating elements","Level sensors"]],
      ["Housing Structure","Robust steel housing split into dirty- and clean-air chambers by the tube sheet.",["Carbon/stainless","Explosion-proof"]]
    ], cls:"c3"}
  ]},

/* 9 — CHAPTER 03 */
{ type:"chapter", n:"03", bg:IMG+"image7.jpeg", kicker:"Chapter 03",
  title:"Product Portfolio", sub:"Comprehensive bag filter solutions." },

/* 10 — PULSE JET */
{ type:"content", kicker:"Product Portfolio", title:"Pulse Jet Fabric Filters", chip:"Product Portfolio",
  layout:"r5545",
  main:[
    {lead:["Technology Overview",[
      "Pulse-jet filters use high-pressure compressed air (0.4–0.6 MPa). Short, intense pulses create a shockwave that dislodges the dust cake.",
      "Cleaning runs online — compartments are cleaned while the filter keeps operating."]]},
    {listTitle:"Key Advantages"},
    {list:["Continuous operation during cleaning","Effective dust-cake removal","Low compressed-air consumption","Suitable for various bag lengths"]}
  ],
  side:[
    {fig:{src:IMG+"image8.jpeg", ar:"16/10", cap:"Pulse-jet cleaning mechanism"}},
    {specs:[["Air Pressure","0.3–0.6 MPa"],["Pulse Duration","100–200 ms"],["Air Consumption","Low"],["Cleaning Cycle","Adjustable"]]}
  ]},

/* 11 — LWP */
{ type:"content", kicker:"Product Portfolio", title:"Low-Pressure (LWP) Fabric Filters", chip:"Product Portfolio",
  layout:"r5545",
  main:[
    {lead:["LWP Technology Innovation",[
      "The LWP (Long Wave Pulsing) system cleans bags at low pressure, removing dust from extended-length bags with a single shot of compressed air.",
      "A special nozzle and venturi create a wave traveling at sonic velocity — same profile and efficiency regardless of bag length."]]},
    {listTitle:"Technical Benefits"},
    {list:["Low-pressure operation (0.2–0.3 MPa)","Uniform cleaning along entire bag length","Reduced stress, extended bag lifetime","Cleans up to 30 bags, 12 m long, in one shot"]}
  ],
  side:[
    {fig:{src:IMG+"image9.PNG", mode:"contain", ar:"16/10", cap:"Sonic wave propagation through the bag"}},
    {note:["Major Application","ESP conversion & upgrading — ideal where existing housings demand long bags."]}
  ]},

/* 12 — MODULAR */
{ type:"content", kicker:"Product Portfolio", title:"Modular Fabric Filters", chip:"Product Portfolio",
  layout:"r5545",
  main:[
    {lead:["Modular Design Concept",[
      "A modular design lets you scale the number of modules to the gas volume needed to reach the required capacity.",
      "Installation avoids on-site welding, greatly shortening erection time and cutting cost."]]},
    {listTitle:"Design & Features"},
    {list:["Scalable: add modules by gas volume","Pre-assembled in workshop, minimal site work","No field welding — fast erection","Integrated controller & lifting lugs","ATEX certification on demand"]}
  ],
  side:[
    {fig:{src:IMG+"image10.jpeg", ar:"16/10", cap:"Multiple-module arrangement for large gas volumes"}},
    {note:["Ideal For","Large-scale applications and tight project schedules."]}
  ]},

/* 13 — COMPACT */
{ type:"content", kicker:"Product Portfolio", title:"Compact Dedusting Filters", chip:"Product Portfolio",
  layout:"r5545",
  main:[
    {lead:["Standardized Design",[
      "Standardized materials and a compact design reduce freight and installation cost while requiring minimal space.",
      "Easy to install and operate, meeting strict efficiency demanded by today's regulations."]]},
    {listTitle:"Key Highlights"},
    {list:["Compact footprint for tight spaces","Cost-effective through standardization","Built in one piece or per transport size","Low pressure drop, quick bag replacement"]}
  ],
  side:[
    {figs:{srcs:[IMG+"image11.jpeg",IMG+"image12.jpeg",IMG+"image13.jpeg"], cols:3, ar:"3/4"}},
    {note:["Applications","Small industries and workshops with limited space."]}
  ]},

/* 14 — HIGH TEMPERATURE */
{ type:"content", kicker:"Product Portfolio", title:"High Temperature Filters", chip:"Product Portfolio",
  layout:"r5545",
  main:[
    {cards:[
      ["Ceramic Candle Bag Type","Composite catalyst ceramic tubes combine fiber filtration with denitration catalysts — integrating dust removal, deNOx and dioxin removal into one ultra-clean system."],
      ["Metal Bag Type","High-entropy metal micro/nano membranes form an asymmetric gradient-pore structure: high efficiency, low resistance and easy cleaning for hot flue gas."]
    ], cls:"c2"},
    {badgesTitle:"Applications"},
    {badges:["Cement Kiln","Power Plant","Glass Kiln","Waste Incinerator"]}
  ],
  side:[
    {fig:{src:IMG+"image15.png", ar:"16/10", cap:"Metal membrane element for hot-gas filtration"}},
    {stats:[ {n:"450",u:"°C",l:"Max Temperature"},{n:"99.9",u:"%",l:"Efficiency"} ], cls:"c2"}
  ]},

/* 15 — CHAPTER 04 */
{ type:"chapter", n:"04", bg:IMG+"image16.jpeg", kicker:"Chapter 04",
  title:"Technical Advantages", sub:"Why choose De-AirTech fabric filters." },

/* 16 — FILTRATION EFFICIENCY */
{ type:"content", kicker:"Technical Advantages", title:"Superior Filtration Efficiency", chip:"Technical Advantages",
  layout:"r5545",
  main:[
    {lead:["High Collection Efficiency",[
      "De-AirTech fabric filters achieve 99%+ collection efficiency for particulate matter — highly effective on fine particulates and heavy metals.",
      "Our systems consistently meet and exceed stringent environmental regulations worldwide."]]},
    {listTitle:"Advanced Capabilities"},
    {list:["Sub-micron particle capture","Mercury & heavy-metal removal","Dioxin & furan reduction","Enhanced SO₂ capture with sorbents"]}
  ],
  side:[
    {fig:{src:IMG+"image17.jpeg", ar:"16/10", cap:"Multi-layer filtration mechanism"}},
    {stats:[ {n:"99.99",u:"%",l:"PM Collection"},{p:"<",n:"5",u:" mg/Nm³",l:"PM Emission"},
             {p:">",n:"95",u:"%",l:"Heavy Metals"},{p:">",n:"99",u:"%",l:"Dioxins"} ], cls:"c2"}
  ]},

/* 17 — CLEANING TECHNOLOGIES */
{ type:"content", kicker:"Technical Advantages", title:"Advanced Cleaning Technologies", chip:"Technical Advantages",
  layout:"rows",
  rows:[
    {cards:[
      ["Pulse Jet","High-pressure air (0.4–0.6 MPa) creates an intense shockwave; short 100–200 ms pulses minimize air use.",["Online cleaning","Adjustable frequency","Proven reliability"]],
      ["LWP System","Low-pressure (0.2–0.3 MPa) sonic wave travels the full bag length — one shot cleans up to 30 bags, 12 m long.",["Uniform profile","Extended bag life","Reduced air use"]],
      ["Smart Control","PLC monitors differential pressure and adjusts cycles automatically to minimize air use while holding performance.",["ΔP monitoring","Automated sequences","Remote monitoring"]]
    ], cls:"c3"}
  ]},

/* 18 — BAG & CAGE */
{ type:"content", kicker:"Technical Advantages", title:"Filter Bag & Cage Excellence", chip:"Technical Advantages",
  layout:"r5545",
  main:[
    {lead:["Premium Filter Bags",[
      "The heart of a successful fabric filter is its internal bag components — fibers sourced only from renowned, multi-national textile suppliers.",
      "Snap bands ensure a gas-tight fit; ePTFE sewing thread seals every seam for extended service life."]]},
    {specsTitle:"Material Options"},
    {specs:[["Polyester","Max 130°C · general use"],["PPS","Max 190°C · chemical resistant"],["PTFE","Max 260°C · extreme conditions"],["Fiberglass","Max 280°C · high temperature"]]}
  ],
  side:[
    {figs:{srcs:[IMG+"image18.jpeg",IMG+"image19.jpeg"], cols:2, ar:"4/3"}},
    {stats:[ {n:"200",u:"K",l:"Filter tubes / year capacity"} ], cls:"c1"}
  ]},

/* 19 — SMART CONTROL */
{ type:"content", kicker:"Technical Advantages", title:"Smart Control Systems", chip:"Technical Advantages",
  layout:"r6040",
  main:[
    {lead:["PLC-Based Control",[
      "Advanced PLC control from Siemens, Allen-Bradley, Schneider and Mitsubishi, with intuitive HMI touchscreens.",
      "Remote monitoring and plant-DCS integration are available as options."]]},
    {cards:[
      ["Pressure Monitoring","Real-time differential pressure across the filter bags."],
      ["Automated Cleaning","Pressure-based or timer-based cleaning sequences."],
      ["Temperature Monitoring","Continuous inlet and outlet temperature measurement."]
    ], cls:"c3"},
    {badgesTitle:"Sequencers & Certifications"},
    {badges:["Autel","ASCO","Goyen","CE","NEMA","GOST"]}
  ],
  side:[
    {fig:{src:IMG+"image20.jpg", ar:"3/4", cap:"PLC control panel with HMI interface"}}
  ]},

/* 20 — CHAPTER 05 */
{ type:"chapter", n:"05", bg:IMG+"image21.jpg", kicker:"Chapter 05",
  title:"Industry Applications", sub:"Serving diverse industries worldwide." },

/* 21 — CEMENT & POWER */
{ type:"content", kicker:"Industry Applications", title:"Cement & Power Industries", chip:"Industry Applications",
  layout:"r5545",
  main:[
    {lead:["Cement Industry Solutions",[
      "De-AirTech filters serve cement lines from raw-material grinding to packaging — handling high temperatures, abrasive dust and varying moisture."]]},
    {cardsTitle:"Key Application Points"},
    {cards:[
      ["Coal Mill","Coal-grinding dust collection"],
      ["Clinker Cooler","Heat exchange & cooling"],
      ["Cement Mill","Finish-grinding dust control"],
      ["Kiln & Raw Mill","Main process dust collection"]
    ], cls:"c2"}
  ],
  side:[
    {fig:{src:IMG+"image22.png", ar:"16/10", cap:"Cement production dust-control points"}},
    {note:["Power Plant Solutions","Engineered for coal-fired, stoker-fired & fluidized-bed boilers and cogeneration — guaranteed emission &lt;10 mg/Nm³."]}
  ]},

/* 22 — OTHER INDUSTRIES & FGD */
{ type:"content", kicker:"Industry Applications", title:"Other Industries & FGD Integration", chip:"Industry Applications",
  layout:"r5545",
  main:[
    {cards:[
      ["Waste Incineration","Municipal & medical incinerators need control of particulates, heavy metals, dioxins and acid gases.",["MSW incinerators","Medical waste"]],
      ["Steel Industry","Sintering, blast furnaces, converters and rolling mills generate heavy dust — reliably controlled.",["Sinter plants","Cast houses"]],
      ["Glass Industry","Glass furnaces and processing generate dust and fumes that must be controlled for compliance.",["Glass furnaces","Batch plants"]]
    ], cls:"c3"}
  ],
  side:[
    {label:"FGD Integration Solutions"},
    {cards:[
      ["Additional SO₂ Capture","Filter cake enhances acid-gas absorption after FGD systems."],
      ["Lower Reagent Use","Reduced sorbent injection rates versus ESP systems."],
      ["Multi-Pollutant Control","Particulates, SO₂, HCl, HF and heavy metals in one system."]
    ], cls:"c1"}
  ]},

/* 23 — CHAPTER 06 */
{ type:"chapter", n:"06", bg:IMG+"image23.jpeg", kicker:"Chapter 06",
  title:"Project References", sub:"A proven track record of excellence." },

/* 24 — GLOBAL PORTFOLIO */
{ type:"content", kicker:"Project References", title:"Global Project Portfolio", chip:"Project References",
  layout:"r5545",
  main:[
    {lead:["Worldwide Presence",[
      "De-AirTech has designed, supplied and commissioned fabric filter systems across the globe — spanning diverse industries and challenging environments.",
      "From cement plants in Asia to power stations in the Middle East, our filters meet or exceed emission requirements everywhere."]]},
    {stats:[ {n:"110",u:"+",l:"Projects Completed"},{n:"40",u:"+",l:"Countries Served"},
             {n:"50",u:"+",l:"Cement Plants"},{n:"30",u:"+",l:"Power Stations"} ], cls:"c2"}
  ],
  side:[
    {figs:{srcs:[IMG+"image24.jpeg",IMG+"image7.jpeg",IMG+"image4.jpeg",IMG+"image16.jpeg"], cols:2, ar:"3/2"}},
    {bars:[["Asia-Pacific",30],["Middle East & Africa",30],["Americas",25],["Europe",15]]}
  ]},

/* 25 — PROJECT MAP */
{ type:"map", kicker:"Project References", title:"Global Project Map", chip:"Project References",
  img:IMG+"image25.png",
  stats:[ {n:"45",u:"+",l:"Countries"},{n:"110",u:"+",l:"Projects (2019–2025)"} ],
  legend:[["8+ Projects","#e0654f"],["5–7 Projects","#e08a3c"],["3–4 Projects","#4ec4c4"],["1–2 Projects","#7fb98a"]],
  markers:[[26,40],[49,34],[51,30],[72,28],[83,42],[52,52],[30,46],[88,68]] },

/* 26 — CHAPTER 07 */
{ type:"chapter", n:"07", bg:IMG+"image26.jpg", kicker:"Chapter 07",
  title:"Service & Support", sub:"Comprehensive customer care." },

/* 27 — REPAIR & MAINTENANCE */
{ type:"content", kicker:"Service & Support", title:"Repair & Maintenance Services", chip:"Service & Support",
  layout:"r5545",
  main:[
    {lead:["Comprehensive Service Offerings",[
      "Utilities and industries face extraordinary challenges operating Air Quality equipment: aging systems, preventive maintenance, emergency repairs and demanding new rules.",
      "De-AirTech delivers proven, cost-effective solutions — from routine repairs to complete system upgrades."]]},
    {cards:[
      ["Inspection & Analysis","System inspection, troubleshooting and performance analysis."],
      ["Training & Life Extension","Operator training and equipment life-extension strategies."],
      ["Repair & Outage Support","Emergency repairs, outage supervision and project management."]
    ], cls:"c3"}
  ],
  side:[
    {fig:{src:IMG+"image27.png", ar:"16/10", cap:"Field service & maintenance team"}},
    {note:["Advanced Capabilities","In-house CFD & physical flow modeling, performance optimization, compliance testing — backed by a 24/7 emergency-response team."]}
  ]},

/* 28 — SPARE PARTS */
{ type:"content", kicker:"Service & Support", title:"Spare Parts & Supply", chip:"Service & Support",
  layout:"rows",
  rows:[
    {cards:[
      ["Filter Bags","Full range of materials, sizes and configurations for your application.",["PE · Aramid · PPS","PTFE · Fiberglass","Custom sizes"]],
      ["Filter Cages","Carbon, stainless or galvanized steel cages with various coatings.",["Standard & custom","Silicon coating","Multiple connections"]],
      ["Valves & Diaphragms","Solenoid valves, pulse valves and diaphragm kits for all major brands.",["Autel · ASCO · Goyen","Original parts","Fast delivery"]],
      ["Control Components","PLC modules, HMI panels, sensors and control-system upgrades.",["Siemens · AB","Sequencers","Instrumentation"]],
      ["DeNOx Catalysts","SCR catalysts for NOx reduction alongside fabric filter systems.",["High activity","Long service life","Various formulations"]],
      ["Mechanical Parts","Rotary valves, screw conveyors, dampers and expansion joints.",["OEM quality","Custom fabrication","Install support"]]
    ], cls:"c3"}
  ]},

/* 29 — ESP CONVERSION */
{ type:"content", kicker:"Service & Support", title:"ESP to FF Conversion", chip:"Service & Support",
  layout:"r5545",
  main:[
    {lead:["Conversion Solutions",[
      "When regulations tighten or capacity must grow, existing Electrostatic Precipitators can be converted by replacing internals with a fabric filter arrangement.",
      "Reusing casing, hoppers, structure and ash handling means substantial savings in cost and footprint with minimum downtime."]]},
    {listTitle:"Performance Improvement"},
    {list:["Emission reduction: 50–90%","Heavy-metal capture capability","Dioxin removal efficiency","Reduced power consumption"]}
  ],
  side:[
    {figs:{srcs:[IMG+"image28.jpg",IMG+"image29.jpg"], cols:2, ar:"4/3"}},
    {stats:[ {n:"15",u:"+",l:"Successful conversions completed"} ], cls:"c1"}
  ]},

/* 30 — MANUFACTURING */
{ type:"content", kicker:"Service & Support", title:"Manufacturing Excellence", chip:"Service & Support",
  layout:"r5545",
  main:[
    {lead:["Three Steel Bases + One Bag Base",[
      "Located near Tianjin and Shanghai ports for efficient logistics.",
      "A team of 600+ — including 30 engineers and 30 management professionals — delivers high-quality products and service."]]},
    {stats:[ {n:"3×80,000",u:" m²",l:"Total Area"},{n:"50,000",u:" t",l:"Annual Capacity"},
             {n:"20",u:"+",l:"Years Experience"},{n:"600",u:"+",l:"Employees"} ], cls:"c2"}
  ],
  side:[
    {figs:{srcs:[IMG+"image30.jpeg",IMG+"image31.jpeg",IMG+"image32.jpeg",IMG+"image33.jpeg"], cols:2, ar:"3/2"}},
    {note:["Annual Output","200,000+ filter tubes · full-range cage manufacturing · complete testing laboratory."]}
  ]},

/* 31 — CERTIFICATIONS */
{ type:"content", kicker:"Service & Support", title:"Quality Certifications", chip:"Service & Support",
  layout:"rows",
  rows:[
    {cards:[
      ["ISO 9001","Quality Management System certification — consistent quality and continuous improvement.",["International standard"]],
      ["CE","European Conformity — compliance with EU safety, health and environmental requirements.",["EU market access"]],
      ["NEMA","Standards for electrical & control systems from the National Electrical Manufacturers Association.",["North America"]],
      ["UL & CSA","Compliance with North American safety standards and technical regulations.",["Safety certified"]],
      ["ASME","American Society of Mechanical Engineers certification for pressure vessels.",["Mechanical standard"]],
      ["ATEX","Certification for equipment used in potentially explosive atmospheres.",["Explosion protection"]]
    ], cls:"c3"}
  ]},

/* 32 — PARTNERSHIPS */
{ type:"partners", kicker:"Service & Support", title:"Long-term Partnerships", chip:"Service & Support",
  lead:["Trusted by Industry Leaders",["De-AirTech has built long-term partnerships with leading companies worldwide. Our commitment to quality, reliability and customer satisfaction has earned the trust of major industrial players."]],
  logos:["image34.png","image35.png","image36.png","image37.png","image38.jpeg","image39.png","image40.png","image41.png","image42.png","image43.png","image44.png","image45.png","image46.gif"],
  benefits:["Dedicated account management","Preferred customer pricing","Priority spare-parts delivery","Extended warranty options"],
  stat:{n:"98",u:"%",l:"Client retention rate"} },

/* 33 — CONTACT */
{ type:"contact", bg:IMG+"image47.jpeg", corp:IMG+"image1.png", kicker:"Thank You",
  title:"Partner with De-AirTech",
  msg:"Contact us today to discuss your air pollution control needs. Together, we can create a cleaner, more sustainable future.",
  info:[
    ["Phone / WhatsApp","+86 136 5193 2427"],
    ["Email","Jie.huang@de-airtech.com"],
    ["Website","www.de-airtech.com"]
  ],
  foot:"De-AirTech Environmental Technology Co., Ltd. · Shanghai, China" }

];
