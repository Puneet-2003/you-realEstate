export interface Project {
  id: string;
  name: string;
  category: string;
  location: string;
  year: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  architect: string;
  price: string;
  image: string;
  description: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: "nebula-residence",
    name: "Nebula Residence",
    category: "Private Villa",
    location: "Lugano, Switzerland",
    year: "2025",
    area: "14,200 sq.ft",
    bedrooms: 6,
    bathrooms: 8,
    architect: "Studio Novaris & K. Ando",
    price: "$28,500,000",
    image: "/assets/images/nebula_residence_interior_1794323290097.jpg",
    description: "An extraordinary dual-height architectural sanctuary carved into the alpine hillside. Features exposed structural concrete pillars, panoramic motorized glass curtain walls, and museum-grade gallery living spaces.",
    features: [
      "Double-height 7.2m living room ceiling",
      "Thermal mass exposed concrete columns",
      "Motorized triple-glazed acoustic curtain walls",
      "Subterranean 6-car collector gallery",
      "Private wellness spa & 20m indoor-outdoor pool"
    ],
    specs: [
      { label: "Lot Size", value: "1.8 Acres" },
      { label: "Completion", value: "Q3 2025" },
      { label: "Energy Rating", value: "Net Zero A+" },
      { label: "Climate Control", value: "Geothermal Radiant" }
    ]
  },
  {
    id: "novaris-horizon-villa",
    name: "Novaris Horizon",
    category: "Coastal Estate",
    location: "Cap d'Antibes, France",
    year: "2025",
    area: "18,500 sq.ft",
    bedrooms: 7,
    bathrooms: 9,
    architect: "Novaris Design Lab",
    price: "$42,000,000",
    image: "/assets/images/hero_novaris_villa_1794323288845.jpg",
    description: "The quintessential expression of organic parametric architecture. Sweeping cantilevered terraces hover gracefully above the Mediterranean, anchored by a multi-tiered infinity pool reflecting illuminated glass contours.",
    features: [
      "Parametric aerodynamic roof cantilevers",
      "180-degree unobstructed coastal panorama",
      "Tiered negative-edge illuminated lagoon pool",
      "Automated hidden glass pocket doors",
      "Helipad & private cliffside funicular"
    ],
    specs: [
      { label: "Lot Size", value: "2.4 Acres" },
      { label: "Completion", value: "Completed 2025" },
      { label: "Energy Rating", value: "Passive House Plus" },
      { label: "Automation", value: "Neural Smart Home v4" }
    ]
  },
  {
    id: "nova-tower-pavilion",
    name: "Nova Pavilion",
    category: "Urban Landmark",
    location: "Tokyo, Japan",
    year: "2024",
    area: "24,800 sq.ft",
    bedrooms: 4,
    bathrooms: 6,
    architect: "Z. Hadid Associates & Novaris",
    price: "$36,000,000",
    image: "/assets/images/futuristic_parametric_pavilion_1794323290253.jpg",
    description: "A continuous fluid ribbon of engineered ultra-high performance concrete. The structure blurs the boundary between sculpture and high-density luxury residential architecture.",
    features: [
      "Continuous double-curved composite shell",
      "Integrated radiant cooling into curved walls",
      "Atmospheric water harvesting system",
      "Luminescent stone reflection pool",
      "Private sky tea pavilion and Zen garden"
    ],
    specs: [
      { label: "Lot Size", value: "1.2 Acres" },
      { label: "Completion", value: "2024" },
      { label: "Energy Rating", value: "LEED Platinum" },
      { label: "Acoustics", value: "NC-15 Sound Dampening" }
    ]
  },
  {
    id: "solaris-estate",
    name: "Solaris Ridge",
    category: "Mountain Villa",
    location: "Aspen, Colorado",
    year: "2025",
    area: "12,800 sq.ft",
    bedrooms: 5,
    bathrooms: 7,
    architect: "Novaris Alpine Studio",
    price: "$31,000,000",
    image: "/assets/images/nextgen_tech_residence_1794323290943.jpg",
    description: "Designed into the rugged granite topography, Solaris Ridge integrates kinetic solar glass panels, exterior heated cantilevered decks, and dark basalt masonry.",
    features: [
      "Kinetic electrochromic solar glazing",
      "Snow-melting geothermal terrace slabs",
      "Cantilevered heated black granite pool",
      "Oxygen-enriched master retreat suites",
      "Wine cellar with 3,000-bottle capacity"
    ],
    specs: [
      { label: "Lot Size", value: "3.5 Acres" },
      { label: "Completion", value: "Q4 2025" },
      { label: "Energy Rating", value: "100% Off-Grid Solar" },
      { label: "Elevation", value: "8,200 ft" }
    ]
  },
  {
    id: "stepped-terrace-residence",
    name: "Apex Stepped Cube",
    category: "Modern Residence",
    location: "Mallorca, Spain",
    year: "2024",
    area: "9,600 sq.ft",
    bedrooms: 5,
    bathrooms: 6,
    architect: "Minimalist Atelier",
    price: "$19,500,000",
    image: "/assets/images/modern_stepped_balconies_1794323289202.jpg",
    description: "Crisp geometric cubes staggered organically along the hillside. Every level opens onto private lush hanging gardens with mature olive trees and native Mediterranean flora.",
    features: [
      "Staggered cantilevered sun terraces",
      "Integrated vertical biodiverse gardens",
      "Local limestone & micro-cement finishes",
      "Pergola shaded outdoor culinary pavilion",
      "Deep underground natural cooling cistern"
    ],
    specs: [
      { label: "Lot Size", value: "0.9 Acres" },
      { label: "Completion", value: "2024" },
      { label: "Energy Rating", value: "BREEAM Outstanding" },
      { label: "Irrigation", value: "Greywater Closed-Loop" }
    ]
  }
];
