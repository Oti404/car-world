const dotenv = require('dotenv');
dotenv.config();

const API = 'http://localhost:3000/api/cars';

const cars = [
  {
    name: 'Aston Martin DB12',
    basePrice: 245000,
    stock: 3,
    description: 'The DB12 is Aston Martin\'s most powerful and advanced front-engined sports car ever. A stunning evolution of the iconic DB lineage with a hand-crafted interior.',
    engineSpecs: '4.0L Twin-Turbo V8, 671 hp, 800 Nm, 0-100 in 3.5s, 325 km/h top speed',
    images: ['assets/aston-martin-db12-000.webp'],
    options: {
      colors: [
        { name: 'Skyfall Silver', price: 0 },
        { name: 'Iridescent Emerald', price: 4500 },
        { name: 'Onyx Black', price: 0 },
        { name: 'Cognac Tan', price: 3200 }
      ],
      wheels: [
        { name: '21" Dark Chrome Split-Spoke', price: 0 },
        { name: '21" Gloss Black Forged', price: 3800 }
      ],
      interior: [
        { name: 'Obsidian Black Leather', price: 0 },
        { name: 'Caramel Tan Full Leather', price: 6500 },
        { name: 'Two-Tone Sport', price: 4200 }
      ],
      extras: [
        { name: 'Carbon Fibre Pack', price: 9500 },
        { name: 'Panoramic Glass Roof', price: 3200 },
        { name: 'Premium Sound System', price: 4800 }
      ]
    }
  },
  {
    name: 'Aston Martin Valkyrie',
    basePrice: 3200000,
    stock: 1,
    description: 'The Valkyrie is a road-legal hypercar developed in partnership with Red Bull Racing. It represents the absolute pinnacle of naturally-aspirated performance.',
    engineSpecs: '6.5L Naturally Aspirated V12 + KERS Hybrid, 1160 hp total, 0-100 in 2.5s, 402 km/h top speed',
    images: ['assets/aston-martin-valkyrie-000.webp'],
    options: {
      colors: [
        { name: 'Stirling Green', price: 0 },
        { name: 'Onyx Black', price: 0 },
        { name: 'Xenon Grey', price: 0 }
      ],
      wheels: [
        { name: 'Bespoke Forged Carbon Magnesium', price: 0 }
      ],
      interior: [
        { name: 'Full Carbon Racing Interior', price: 0 },
        { name: 'Bespoke Leather & Alcantara', price: 35000 }
      ],
      extras: [
        { name: 'Track Pack', price: 85000 },
        { name: 'Exposed Carbon Bodywork', price: 42000 }
      ]
    }
  },
  {
    name: 'Audi R8 V10 GT RWD',
    basePrice: 198000,
    stock: 4,
    description: 'The purest, most driver-focused R8 ever made. The GT RWD is rear-wheel-drive only, naturally aspirated, and limited to just 333 units worldwide.',
    engineSpecs: '5.2L Naturally Aspirated V10, 620 hp, 580 Nm, 0-100 in 3.4s, 329 km/h top speed',
    images: ['assets/audi-r8-v10-gt-rwd-000.webp'],
    options: {
      colors: [
        { name: 'Kemora Grey', price: 0 },
        { name: 'Suzuka Grey', price: 0 },
        { name: 'Misano Red', price: 2800 },
        { name: 'Mythos Black', price: 0 }
      ],
      wheels: [
        { name: '20" Anthracite Diamond-Cut', price: 0 },
        { name: '20" Gloss Black Forged', price: 4200 }
      ],
      interior: [
        { name: 'Black Leather & Alcantara', price: 0 },
        { name: 'Red Stitching Package', price: 3500 }
      ],
      extras: [
        { name: 'Carbon Exterior Package', price: 12000 },
        { name: 'Sports Exhaust', price: 6500 },
        { name: 'Laser Headlights', price: 3800 }
      ]
    }
  },
  {
    name: 'Audi RS6 Avant',
    basePrice: 142000,
    stock: 8,
    description: 'The RS6 Avant redefines the performance estate segment. It combines supercar performance with everyday usability in an iconic wagon body.',
    engineSpecs: '4.0L TFSI Twin-Turbo V8 MHEV, 630 hp, 850 Nm, 0-100 in 3.4s, 305 km/h top speed',
    images: ['assets/audi-rs6-avant-000.webp', 'assets/audi-rs6-avant-001.webp'],
    options: {
      colors: [
        { name: 'Nardo Grey', price: 0 },
        { name: 'Sebring Black', price: 0 },
        { name: 'Glacier White', price: 1500 },
        { name: 'Nogaro Blue', price: 3200 }
      ],
      wheels: [
        { name: '22" RS Design Anthracite', price: 0 },
        { name: '22" Forged Titanium Grey', price: 5500 }
      ],
      interior: [
        { name: 'Black Valcona Leather', price: 0 },
        { name: 'Cognac Brown Leather', price: 4800 },
        { name: 'Carbon Atlas Inlays', price: 3200 }
      ],
      extras: [
        { name: 'Dynamic Ride', price: 7500 },
        { name: 'Night Vision', price: 4200 },
        { name: 'Bang & Olufsen 3D Sound', price: 6800 }
      ]
    }
  },
  {
    name: 'BMW M4 Competition',
    basePrice: 98000,
    stock: 10,
    description: 'The M4 Competition is the definitive high-performance coupe. With its iconic twin kidney grille and track-focused chassis, it delivers an uncompromising driving experience.',
    engineSpecs: '3.0L TwinPower Turbo Inline-6 (S58), 510 hp, 650 Nm, 0-100 in 3.9s, 290 km/h top speed',
    images: ['assets/bmw-m4-competition-000.webp', 'assets/bmw-m4-competition-001.webp'],
    options: {
      colors: [
        { name: 'Brooklyn Grey', price: 0 },
        { name: 'Toronto Red', price: 2500 },
        { name: 'Isle of Man Green', price: 2500 },
        { name: 'Frozen Portimao Blue', price: 5500 }
      ],
      wheels: [
        { name: '19/20" M Jet-Spoke Bicolor', price: 0 },
        { name: '20/21" Forged Orbit Grey', price: 4800 }
      ],
      interior: [
        { name: 'Black Merino Leather', price: 0 },
        { name: 'Silverstone Full Merino', price: 5200 },
        { name: 'Carbon Bucket Seats', price: 8500 }
      ],
      extras: [
        { name: 'M Carbon Exterior Package', price: 9800 },
        { name: 'Bowers & Wilkins Sound', price: 5500 },
        { name: 'M Driver\'s Package', price: 2800 }
      ]
    }
  },
  {
    name: 'Bugatti Chiron Pur Sport',
    basePrice: 3600000,
    stock: 1,
    description: 'The Chiron Pur Sport is designed for maximum driver engagement. With a lower gear ratio, stiffened suspension and downforce-generating aerodynamics, it\'s the most focused Chiron.',
    engineSpecs: '8.0L Quad-Turbo W16, 1500 hp, 1600 Nm, 0-100 in 2.3s, 350 km/h (limited)',
    images: ['assets/bugatti-chiron-pur-sport-000.webp'],
    options: {
      colors: [
        { name: 'French Racing Blue', price: 0 },
        { name: 'Light Grey & Dark Grey', price: 0 },
        { name: 'Bespoke EB Colour', price: 120000 }
      ],
      wheels: [
        { name: 'Bespoke Forged Magnesium', price: 0 }
      ],
      interior: [
        { name: 'Sky Blue & Dark Blue Leather', price: 0 },
        { name: 'Full Bespoke Interior', price: 85000 }
      ],
      extras: [
        { name: 'Exposed Carbon Package', price: 95000 },
        { name: 'Titanium Exhaust', price: 45000 }
      ]
    }
  },
  {
    name: 'Dodge Viper ACR',
    basePrice: 138000,
    stock: 2,
    description: 'The Viper ACR — American Club Racer — is one of the most track-focused production cars ever built. Raw, visceral and unfiltered American muscle.',
    engineSpecs: '8.4L Naturally Aspirated V10, 645 hp, 813 Nm, 0-100 in 3.5s, 330 km/h top speed',
    images: ['assets/dodge-viper-acr-000.webp'],
    options: {
      colors: [
        { name: 'Viper Red', price: 0 },
        { name: 'Snakeskin Green', price: 3500 },
        { name: 'Gloss Black', price: 0 }
      ],
      wheels: [
        { name: '18/19" Sidewinder II Aluminum', price: 0 },
        { name: 'Lightweight Forged Carbon', price: 12000 }
      ],
      interior: [
        { name: 'Black Leather', price: 0 },
        { name: 'Red & Black Two-Tone', price: 4500 }
      ],
      extras: [
        { name: 'Aero Pack (Extreme Downforce)', price: 18000 },
        { name: 'Cup 2 Tires', price: 4200 }
      ]
    }
  },
  {
    name: 'Ferrari 296 GTB',
    basePrice: 325000,
    stock: 3,
    description: 'The 296 GTB introduces a new V6 plug-in hybrid powertrain to the Ferrari range. It blends electrification with the pure emotion only a Ferrari can deliver.',
    engineSpecs: '3.0L Twin-Turbo V6 + Electric Motor PHEV, 830 hp total, 0-100 in 2.9s, 330 km/h top speed',
    images: ['assets/ferrari-296-gtb-000.webp'],
    options: {
      colors: [
        { name: 'Rosso Corsa', price: 0 },
        { name: 'Giallo Triplo Strato', price: 12000 },
        { name: 'Blu Corsa', price: 8500 },
        { name: 'Bianco Avus', price: 0 }
      ],
      wheels: [
        { name: '20/21" Forged Diamond Finish', price: 0 },
        { name: '20/21" Dark Spider Design', price: 6500 }
      ],
      interior: [
        { name: 'Nero Full Leather', price: 0 },
        { name: 'Rosso Racing Interior', price: 18000 },
        { name: 'Alcantara Sport Package', price: 9500 }
      ],
      extras: [
        { name: 'Assetto Fiorano Package', price: 35000 },
        { name: 'Carbon Fibre Racing Seats', price: 12000 },
        { name: 'JBL Premium Audio', price: 5800 }
      ]
    }
  },
  {
    name: 'Ferrari 488 GTB',
    basePrice: 268000,
    stock: 5,
    description: 'The 488 GTB represented a landmark moment for Ferrari — the return of the turbocharged V8 to the mid-engine sports car range with breathtaking results.',
    engineSpecs: '3.9L Twin-Turbo V8, 660 hp, 760 Nm, 0-100 in 3.0s, 330 km/h top speed',
    images: ['assets/ferrari-488-gtb-000.webp'],
    options: {
      colors: [
        { name: 'Rosso Corsa', price: 0 },
        { name: 'Giallo Modena', price: 8500 },
        { name: 'Nero Daytona', price: 0 },
        { name: 'Bianco Italia', price: 0 }
      ],
      wheels: [
        { name: '20" Five-Spoke Diamond Finish', price: 0 },
        { name: '20" Forged Dark Spider', price: 5800 }
      ],
      interior: [
        { name: 'Nero Leather', price: 0 },
        { name: 'Rosso & Nero Two-Tone', price: 14000 }
      ],
      extras: [
        { name: 'Carbon Driver Zone + LEDs', price: 14500 },
        { name: 'Racing Exhaust', price: 8500 }
      ]
    }
  },
  {
    name: 'Ferrari LaFerrari',
    basePrice: 1850000,
    stock: 1,
    description: 'LaFerrari — "The Ferrari" — is the first production car to use HY-KERS hybrid technology derived directly from Formula 1. One of the greatest supercars ever made.',
    engineSpecs: '6.3L Naturally Aspirated V12 + HY-KERS Electric, 963 hp total, 0-100 in 2.9s, 350 km/h top speed',
    images: ['assets/ferrari-laferrari-000.webp'],
    options: {
      colors: [
        { name: 'Rosso Corsa', price: 0 },
        { name: 'Nero Daytona', price: 0 },
        { name: 'Bespoke Tailor Made', price: 95000 }
      ],
      wheels: [
        { name: 'Bespoke Forged Alloy', price: 0 }
      ],
      interior: [
        { name: 'Carbon & Leather Racing', price: 0 },
        { name: 'Full Bespoke Tailor Made', price: 65000 }
      ],
      extras: [
        { name: 'Track Telemetry System', price: 22000 },
        { name: 'Exposed Carbon Interior', price: 38000 }
      ]
    }
  },
  {
    name: 'Ferrari SF90 Stradale',
    basePrice: 520000,
    stock: 2,
    description: 'The SF90 Stradale is Ferrari\'s most powerful road car. The plug-in hybrid system with three electric motors combined with the V8 produces a staggering output.',
    engineSpecs: '4.0L Twin-Turbo V8 + 3 Electric Motors PHEV, 1000 hp total, 0-100 in 2.5s, 340 km/h top speed',
    images: ['assets/ferrari-sf90-stradale-000.webp'],
    options: {
      colors: [
        { name: 'Rosso SF90', price: 0 },
        { name: 'Grigio Titanio', price: 0 },
        { name: 'Giallo Triplo Strato', price: 15000 },
        { name: 'Blu Pozzi', price: 12000 }
      ],
      wheels: [
        { name: '20/21" Forged Bicolor', price: 0 },
        { name: '20/21" Full Dark Forged', price: 8500 }
      ],
      interior: [
        { name: 'Nero Alcantara & Leather', price: 0 },
        { name: 'Rosso Racing Full Leather', price: 22000 }
      ],
      extras: [
        { name: 'Assetto Fiorano Package', price: 65000 },
        { name: 'Carbon Fibre Roof', price: 18000 },
        { name: 'Heads-Up Display', price: 5500 }
      ]
    }
  },
  {
    name: 'Ford GT',
    basePrice: 550000,
    stock: 1,
    description: 'The Ford GT is a race car built for the road. Born from Le Mans, the GT uses an EcoBoost V6 and a carbon fibre monocoque to achieve supercar-beating performance.',
    engineSpecs: '3.5L EcoBoost Twin-Turbo V6, 660 hp, 746 Nm, 0-100 in 3.3s, 347 km/h top speed',
    images: ['assets/ford-gt-000.webp'],
    options: {
      colors: [
        { name: 'Liquid Red', price: 0 },
        { name: 'Shadow Black', price: 0 },
        { name: 'Lightning Blue', price: 3500 },
        { name: 'White Platinum', price: 0 }
      ],
      wheels: [
        { name: '20" Forged Aluminum Carbon', price: 0 }
      ],
      interior: [
        { name: 'Ebony Leather & Alcantara', price: 0 },
        { name: 'Red Accent Package', price: 8500 }
      ],
      extras: [
        { name: 'Le Mans Heritage Livery', price: 15000 },
        { name: 'Carbon Fibre Package', price: 25000 }
      ]
    }
  },
  {
    name: 'Koenigsegg Jesko',
    basePrice: 3000000,
    stock: 1,
    description: 'The Jesko is named after the father of founder Christian von Koenigsegg. It features an all-new 9-speed LST gearbox and is designed to break the 300 mph barrier.',
    engineSpecs: '5.0L Twin-Turbo V8 (E85), 1600 hp, 1500 Nm, 0-100 in 2.5s, 480 km/h top speed',
    images: ['assets/koenigsegg-jesko-000.webp'],
    options: {
      colors: [
        { name: 'White & Blue Carbon', price: 0 },
        { name: 'Bespoke Client Spec', price: 150000 }
      ],
      wheels: [
        { name: 'Bespoke Carbon Fibre', price: 0 }
      ],
      interior: [
        { name: 'Full Alcantara & Carbon', price: 0 },
        { name: 'Bespoke Configured', price: 95000 }
      ],
      extras: [
        { name: 'Naked Carbon Body', price: 125000 },
        { name: 'Track Aero Package', price: 85000 }
      ]
    }
  },
  {
    name: 'Lamborghini Aventador SVJ',
    basePrice: 520000,
    stock: 2,
    description: 'The Aventador SVJ is the fastest naturally-aspirated production car around the Nürburgring. ALA 2.0 active aerodynamics deliver unmatched cornering performance.',
    engineSpecs: '6.5L Naturally Aspirated V12, 770 hp, 720 Nm, 0-100 in 2.8s, 350 km/h top speed',
    images: ['assets/lamborghini-aventador-svj-000.webp'],
    options: {
      colors: [
        { name: 'Giallo Orion', price: 0 },
        { name: 'Rosso Mars', price: 0 },
        { name: 'Blu Cepheus', price: 4500 },
        { name: 'Ad Personam Bespoke', price: 45000 }
      ],
      wheels: [
        { name: '20/21" ALA Carbon Forged', price: 0 },
        { name: '20/21" Gold Center-Lock', price: 15000 }
      ],
      interior: [
        { name: 'Nero Ade Full Leather', price: 0 },
        { name: 'Yellow Accent CarbonSkin', price: 22000 }
      ],
      extras: [
        { name: 'Ad Personam Full Package', price: 55000 },
        { name: 'Visible Carbon Fibre Aero', price: 28000 }
      ]
    }
  },
  {
    name: 'Lamborghini Huracan STO',
    basePrice: 328000,
    stock: 4,
    description: 'The Huracán STO — Super Trofeo Omologata — is a road-legal race car. With 75% of its body in carbon fibre, it\'s the most track-focused Huracán ever.',
    engineSpecs: '5.2L Naturally Aspirated V10, 640 hp, 565 Nm, 0-100 in 3.0s, 310 km/h top speed',
    images: ['assets/lamborghini-huracan-sto-000.webp'],
    options: {
      colors: [
        { name: 'Arancio Xanto', price: 0 },
        { name: 'Bianco Monocerus', price: 0 },
        { name: 'Blu Laufey', price: 4800 },
        { name: 'Verde Selvans', price: 4800 }
      ],
      wheels: [
        { name: '20" Center-Lock Forged', price: 0 },
        { name: '20" Gold Center-Lock', price: 12000 }
      ],
      interior: [
        { name: 'Carbon Racing Seats + Alcantara', price: 0 },
        { name: 'Full Ad Personam Interior', price: 18000 }
      ],
      extras: [
        { name: 'Sensonum Sound System', price: 5200 },
        { name: 'Carbon Fibre Track Pack', price: 22000 }
      ]
    }
  },
  {
    name: 'Land Rover Range Rover',
    basePrice: 145000,
    stock: 15,
    description: 'The fifth-generation Range Rover combines legendary off-road capability with the refinement of a luxury saloon. The ultimate expression of sophisticated all-terrain capability.',
    engineSpecs: '4.4L Twin-Turbo V8, 530 hp, 750 Nm, 0-100 in 4.6s, 250 km/h top speed',
    images: ['assets/land-rover-range-rover-000.webp'],
    options: {
      colors: [
        { name: 'Santorini Black', price: 0 },
        { name: 'Fuji White', price: 0 },
        { name: 'Carpathian Grey', price: 2800 },
        { name: 'Charente Grey', price: 2800 }
      ],
      wheels: [
        { name: '22" Gloss Dark Grey Split-Spoke', price: 0 },
        { name: '23" Gloss Black 5-Split-Spoke', price: 6500 }
      ],
      interior: [
        { name: 'Ebony Leather', price: 0 },
        { name: 'Vintage Tan Semi-Aniline', price: 8500 },
        { name: 'Ivory Semi-Aniline', price: 8500 }
      ],
      extras: [
        { name: 'Executive Class Rear Seating', price: 12000 },
        { name: 'Meridian Signature Sound', price: 7500 },
        { name: 'Head-Up Display', price: 2800 }
      ]
    }
  },
  {
    name: 'Lexus LFA',
    basePrice: 395000,
    stock: 1,
    description: 'The LFA is the most exotic car ever produced by Toyota/Lexus. The carbon fibre structure, F1-inspired V10 and screaming 9000 rpm redline make it a legend.',
    engineSpecs: '4.8L Naturally Aspirated V10 (1LR-GUE), 552 hp, 480 Nm, 0-100 in 3.7s, 325 km/h top speed',
    images: ['assets/lexus-lfa-000.webp'],
    options: {
      colors: [
        { name: 'Whitest White', price: 0 },
        { name: 'Obsidian Black', price: 0 },
        { name: 'Infrared', price: 5500 }
      ],
      wheels: [
        { name: '20" Forged BBS Aluminum', price: 0 }
      ],
      interior: [
        { name: 'Black Alcantara & Carbon', price: 0 },
        { name: 'Red Accent Sport Package', price: 12000 }
      ],
      extras: [
        { name: 'Nürburgring Package', price: 65000 },
        { name: 'Carbon Fibre Roof Panel', price: 9500 }
      ]
    }
  },
  {
    name: 'Maserati MC20',
    basePrice: 242000,
    stock: 4,
    description: 'The MC20 marks Maserati\'s return to the supercar segment after two decades. The Nettuno V6 engine features twin-turbos and pre-chamber combustion derived from Formula 1.',
    engineSpecs: '3.0L Twin-Turbo V6 Nettuno, 630 hp, 730 Nm, 0-100 in 2.9s, 325 km/h top speed',
    images: ['assets/maserati-mc20-000.webp'],
    options: {
      colors: [
        { name: 'Bianco Audace', price: 0 },
        { name: 'Rosso Vincente', price: 0 },
        { name: 'Giallo Genio', price: 5500 },
        { name: 'Blu Infinito', price: 5500 }
      ],
      wheels: [
        { name: '20/21" Triforce Dark', price: 0 },
        { name: '20/21" Gold Triforce', price: 8500 }
      ],
      interior: [
        { name: 'Nero Leather', price: 0 },
        { name: 'Bianco & Nero Two-Tone', price: 12000 }
      ],
      extras: [
        { name: 'Carbon Fibre Package', price: 18000 },
        { name: 'Sonus Faber Sound System', price: 6500 }
      ]
    }
  },
  {
    name: 'McLaren 765LT',
    basePrice: 358000,
    stock: 2,
    description: 'The 765LT is the most powerful Longtail McLaren ever made. Sharing its DNA with the legendary F1 GTR, it\'s 80 kg lighter than the 720S and devastatingly fast.',
    engineSpecs: '4.0L Twin-Turbo V8 M840T, 765 hp, 800 Nm, 0-100 in 2.8s, 330 km/h top speed',
    images: ['assets/mclaren-765lt-000.webp'],
    options: {
      colors: [
        { name: 'Volcano Yellow', price: 0 },
        { name: 'Papaya Spark', price: 0 },
        { name: 'Lantana Purple', price: 6500 },
        { name: 'Silica White', price: 0 }
      ],
      wheels: [
        { name: '19/20" Ultra-Lightweight Forged', price: 0 },
        { name: '19/20" Carbon Black Forged', price: 9500 }
      ],
      interior: [
        { name: 'Carbon Black Alcantara', price: 0 },
        { name: 'Amarillo Yellow Accents', price: 14000 }
      ],
      extras: [
        { name: 'Carbon Fibre Pack', price: 22000 },
        { name: 'Track Telemetry', price: 8500 },
        { name: 'Bowers & Wilkins Audio', price: 6500 }
      ]
    }
  },
  {
    name: 'McLaren P1',
    basePrice: 1350000,
    stock: 1,
    description: 'The McLaren P1 is one of the Holy Trinity of hypercars. Using F1 technology including DRS and IPAS hybrid system, it set a new benchmark for what a road car could achieve.',
    engineSpecs: '3.8L Twin-Turbo V8 + IPAS Electric Hybrid, 916 hp total, 900 Nm, 0-100 in 2.8s, 350 km/h top speed',
    images: ['assets/mclaren-p1-000.webp'],
    options: {
      colors: [
        { name: 'Volcano Yellow', price: 0 },
        { name: 'Supernova Silver', price: 0 },
        { name: 'McLaren Orange', price: 0 },
        { name: 'Bespoke MSO', price: 95000 }
      ],
      wheels: [
        { name: 'Forged Magnesium Center-Lock', price: 0 }
      ],
      interior: [
        { name: 'Carbon Alcantara Racing', price: 0 },
        { name: 'MSO Bespoke', price: 65000 }
      ],
      extras: [
        { name: 'XP Carbon Pack', price: 85000 },
        { name: 'Track Pack', price: 45000 }
      ]
    }
  },
  {
    name: 'Mercedes-AMG GT',
    basePrice: 162000,
    stock: 6,
    description: 'The AMG GT is AMG\'s first fully in-house developed sports car. The Panamericana grille, long bonnet and wide hips create an unmistakable silhouette.',
    engineSpecs: '4.0L Biturbo V8 AMG, 630 hp, 900 Nm, 0-100 in 3.2s, 316 km/h top speed',
    images: ['assets/mercedes-amg-gt-000.webp', 'assets/mercedes-amg-gt-001.webp'],
    options: {
      colors: [
        { name: 'Obsidian Black', price: 0 },
        { name: 'Selenite Grey Magno', price: 4500 },
        { name: 'AMG Green Hell Magno', price: 6500 },
        { name: 'Designo Diamond White', price: 3500 }
      ],
      wheels: [
        { name: '20/21" AMG Cross-Spoke Bicolor', price: 0 },
        { name: '21" AMG Forged Titanium Grey', price: 5800 }
      ],
      interior: [
        { name: 'Black Nappa Leather', price: 0 },
        { name: 'Platinum White Nappa', price: 8500 },
        { name: 'AMG Performance Seats', price: 6500 }
      ],
      extras: [
        { name: 'AMG Carbon Fibre Package', price: 14500 },
        { name: 'Burmester High-End Audio', price: 7500 },
        { name: 'Night Package', price: 3200 }
      ]
    }
  },
  {
    name: 'Mercedes-AMG ONE',
    basePrice: 2750000,
    stock: 1,
    description: 'The AMG ONE transfers a complete Formula 1 hybrid powertrain directly into a road car for the first time. A 1000+ hp hypercar born from the Championship-winning F1 W07.',
    engineSpecs: '1.6L Turbo F1 V6 + 4 Electric Motors Hybrid, 1063 hp total, 0-100 in 2.9s, 352 km/h top speed',
    images: ['assets/mercedes-amg-one-000.webp'],
    options: {
      colors: [
        { name: 'Silver Arrow Magno', price: 0 },
        { name: 'AMG Black', price: 0 },
        { name: 'Bespoke Manufaktur', price: 120000 }
      ],
      wheels: [
        { name: 'Bespoke Forged Magnesium', price: 0 }
      ],
      interior: [
        { name: 'Carbon & Alcantara F1 Style', price: 0 },
        { name: 'Full Bespoke Manufaktur', price: 85000 }
      ],
      extras: [
        { name: 'Exposed Carbon Body', price: 95000 },
        { name: 'Track Aero Package', price: 55000 }
      ]
    }
  },
  {
    name: 'Nissan GT-R Nismo',
    basePrice: 212000,
    stock: 3,
    description: 'The GT-R Nismo is the ultimate expression of Nissan\'s iconic supercar. Hand-assembled at Nismo\'s facility in Omori, each engine is built by a single technician.',
    engineSpecs: '3.8L Twin-Turbo V6 VR38DETT, 600 hp, 652 Nm, 0-100 in 2.7s, 315 km/h top speed',
    images: ['assets/nissan-gt-r-nismo-000.webp'],
    options: {
      colors: [
        { name: 'Ultimate Shining Slash Silver', price: 0 },
        { name: 'Jet Black', price: 0 },
        { name: 'Brilliant White Pearl', price: 2800 }
      ],
      wheels: [
        { name: '20" RAYS Forged Aluminum', price: 0 }
      ],
      interior: [
        { name: 'Recaro Carbon Shell Seats', price: 0 },
        { name: 'Red Alcantara Accents', price: 8500 }
      ],
      extras: [
        { name: 'Carbon Fibre Aero Kit', price: 22000 },
        { name: 'Nismo Track Edition Package', price: 18000 }
      ]
    }
  },
  {
    name: 'Pagani Huayra Roadster BC',
    basePrice: 3400000,
    stock: 1,
    description: 'The Huayra Roadster BC is dedicated to Benny Caiola, Pagani\'s first customer and lifelong friend. Only 40 units were produced, each a unique work of automotive art.',
    engineSpecs: '6.0L Twin-Turbo V12 AMG M158, 800 hp, 1100 Nm, 0-100 in 2.8s, 340 km/h top speed',
    images: ['assets/pagani-huayra-roadster-bc-000.webp'],
    options: {
      colors: [
        { name: 'Bespoke Client Specification', price: 0 },
        { name: 'Naked Carbon', price: 185000 }
      ],
      wheels: [
        { name: 'Bespoke Forged Magnesium', price: 0 }
      ],
      interior: [
        { name: 'Full Leather & Carbon', price: 0 },
        { name: 'Bespoke Artisan Interior', price: 145000 }
      ],
      extras: [
        { name: 'Full Exposed Carbon Package', price: 225000 }
      ]
    }
  },
  {
    name: 'Porsche 911 GT3 RS',
    basePrice: 248000,
    stock: 3,
    description: 'The 911 GT3 RS is the most extreme naturally-aspirated 911 ever made for the road. Its motorsport-derived aerodynamics generate more downforce than ever before.',
    engineSpecs: '4.0L Naturally Aspirated Flat-6, 525 hp, 465 Nm, 0-100 in 3.2s, 296 km/h top speed',
    images: ['assets/porsche-911-gt3-rs-000.webp'],
    options: {
      colors: [
        { name: 'Guards Red', price: 0 },
        { name: 'GT Silver Metallic', price: 2500 },
        { name: 'Python Green', price: 8500 },
        { name: 'Chalk', price: 0 }
      ],
      wheels: [
        { name: '21" Central-Lock Satin Platinum', price: 0 },
        { name: '21" Central-Lock Gloss Black', price: 4500 }
      ],
      interior: [
        { name: 'Black Leather & Alcantara', price: 0 },
        { name: 'Clubsport Package', price: 3200 },
        { name: 'Full Bucket Seat Weissach', price: 18000 }
      ],
      extras: [
        { name: 'Weissach Package', price: 32000 },
        { name: 'Lift System Front Axle', price: 3500 },
        { name: 'BOSE Surround Sound', price: 4800 }
      ]
    }
  },
  {
    name: 'Porsche 918 Spyder',
    basePrice: 845000,
    stock: 1,
    description: 'The 918 Spyder is part of the Holy Trinity of hypercars. This plug-in hybrid combines a naturally aspirated V8 with two electric motors for other-worldly performance.',
    engineSpecs: '4.6L Naturally Aspirated V8 + 2 Electric Motors PHEV, 887 hp total, 1280 Nm, 0-100 in 2.6s, 345 km/h top speed',
    images: ['assets/porsche-918-spyder-000.webp'],
    options: {
      colors: [
        { name: 'Liquid Metal Chrome Blue', price: 0 },
        { name: 'Arrow Grey', price: 0 },
        { name: 'Carrara White Metallic', price: 0 }
      ],
      wheels: [
        { name: '20/21" Magnesium Center-Lock', price: 0 }
      ],
      interior: [
        { name: 'Black Alcantara & Carbon', price: 0 },
        { name: 'Marsala Red Full Package', price: 35000 }
      ],
      extras: [
        { name: 'Weissach Package', price: 84000 },
        { name: 'Magnesium Wheels Upgrade', price: 22000 }
      ]
    }
  },
  {
    name: 'Porsche Panamera',
    basePrice: 112000,
    stock: 12,
    description: 'The Porsche Panamera redefines the luxury sports sedan. A true four-door sports car offering supercar performance with the comfort and versatility of a large executive saloon.',
    engineSpecs: '4.0L Twin-Turbo V8, 630 hp, 820 Nm, 0-100 in 3.2s, 310 km/h top speed',
    images: ['assets/porsche-panamera-000.webp'],
    options: {
      colors: [
        { name: 'Jet Black Metallic', price: 0 },
        { name: 'Gentian Blue Metallic', price: 3500 },
        { name: 'Carrara White Metallic', price: 3500 },
        { name: 'Chalk', price: 2800 }
      ],
      wheels: [
        { name: '21" Exclusive Design Sport', price: 0 },
        { name: '22" Exclusive Design Sport Platinum', price: 6500 }
      ],
      interior: [
        { name: 'Black Leather', price: 0 },
        { name: 'Bordeaux Red Leather', price: 7500 },
        { name: 'Two-Tone Leather', price: 5500 }
      ],
      extras: [
        { name: 'Burmester High-End Audio', price: 6800 },
        { name: 'Night Vision Assist', price: 3200 },
        { name: 'Executive Package', price: 9500 }
      ]
    }
  },
  {
    name: 'Porsche Taycan',
    basePrice: 105000,
    stock: 18,
    description: 'The Porsche Taycan is the first all-electric sports car from Porsche. It combines the soul of a sports car with zero-emission driving, proving that performance and sustainability can coexist.',
    engineSpecs: 'Dual Electric Motors (800V), 761 hp (Turbo S), 1050 Nm, 0-100 in 2.8s, 260 km/h top speed, 630 km range',
    images: ['assets/porsche-taycan-000.webp', 'assets/porsche-taycan-001.webp'],
    options: {
      colors: [
        { name: 'Frozen Blue Metallic', price: 0 },
        { name: 'Carrara White Metallic', price: 3500 },
        { name: 'Jet Black Metallic', price: 0 },
        { name: 'Gentian Blue Metallic', price: 3500 }
      ],
      wheels: [
        { name: '21" Taycan S Aero', price: 0 },
        { name: '21" Cross Turismo Aero', price: 3500 },
        { name: '21" Exclusive Design', price: 6500 }
      ],
      interior: [
        { name: 'Black Leather', price: 0 },
        { name: 'Two-Tone Atacama Blue', price: 8500 },
        { name: 'Chalk Interior', price: 5500 }
      ],
      extras: [
        { name: 'Performance Battery Plus', price: 8500 },
        { name: 'Burmester 3D High-End Audio', price: 6800 },
        { name: 'Rear Axle Steering', price: 4800 }
      ]
    }
  },
  {
    name: 'Rimac Nevera',
    basePrice: 2400000,
    stock: 1,
    description: 'The Rimac Nevera is the world\'s fastest production car. Four electric motors and torque vectoring create a hypercar unlike anything before it — all-electric, all-fast.',
    engineSpecs: '4 Electric Motors (120 kWh), 1914 hp, 2360 Nm, 0-100 in 1.97s, 412 km/h top speed',
    images: ['assets/rimac-nevera-000.webp'],
    options: {
      colors: [
        { name: 'Aluminum Silver', price: 0 },
        { name: 'Midnight Blue', price: 0 },
        { name: 'Bespoke 1-of-1', price: 185000 }
      ],
      wheels: [
        { name: 'Bespoke Forged Carbon', price: 0 }
      ],
      interior: [
        { name: 'Full Leather & Alcantara', price: 0 },
        { name: 'Bespoke Interior', price: 125000 }
      ],
      extras: [
        { name: 'Naked Carbon Body', price: 165000 },
        { name: 'Track Pack', price: 85000 }
      ]
    }
  },
  {
    name: 'Tesla Model S Plaid',
    basePrice: 108000,
    stock: 20,
    description: 'The Tesla Model S Plaid is the quickest production car ever made to 100 km/h. Three motors and revolutionary carbon-sleeved rotors deliver instant, seamless acceleration.',
    engineSpecs: 'Tri-Motor Electric (100 kWh), 1020 hp, 1420 Nm, 0-100 in 2.1s, 322 km/h top speed, 637 km range',
    images: ['assets/tesla-model-s-plaid-000.webp'],
    options: {
      colors: [
        { name: 'Midnight Silver Metallic', price: 0 },
        { name: 'Pearl White Multi-Coat', price: 2500 },
        { name: 'Solid Black', price: 2500 },
        { name: 'Red Multi-Coat', price: 4500 }
      ],
      wheels: [
        { name: '19" Tempest', price: 0 },
        { name: '21" Arachnid Gloss', price: 5500 }
      ],
      interior: [
        { name: 'All Black', price: 0 },
        { name: 'Cream', price: 2500 },
        { name: 'Carbon Fibre Trim', price: 4500 }
      ],
      extras: [
        { name: 'Autopilot Enhanced', price: 6500 },
        { name: 'Full Self-Driving Capability', price: 12000 },
        { name: 'Premium Audio', price: 0 }
      ]
    }
  }
];

async function seed() {
  console.log(`Seeding ${cars.length} cars...\n`);
  let success = 0;
  let failed = 0;

  for (const car of cars) {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      const data = await res.json();
      console.log(`OK  ${car.name} (id: ${data.id})`);
      success++;
    } catch (e) {
      console.error(`ERR ${car.name}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nDone. ${success} added, ${failed} failed.`);
}

module.exports = cars;
if (require.main === module) seed();
