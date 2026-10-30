const dotenv = require('dotenv');
dotenv.config();

const API = 'http://localhost:3000/api/news';

const news = [
  {
    title: 'The New Porsche 911 GT3 RS: Aerodynamics Redefined',
    image: 'assets/news-000.webp',
    imageAlt: 'Porsche 911 GT3 RS front view on track',
    content: 'Porsche has pushed the boundaries of aerodynamic engineering with the new 911 GT3 RS. The active aero package generates over 860 kg of downforce, making it the most downforce-producing road car in Porsche history. With a naturally aspirated 4.0L flat-six producing 525 hp, this is the ultimate track-focused 911.'
  },
  {
    title: 'Ferrari SF90 Stradale: The Hybrid Future of the Prancing Horse',
    image: 'assets/news-001.webp',
    imageAlt: 'Ferrari SF90 Stradale in Rosso Corsa',
    content: 'Ferrari\'s most powerful road car ever, the SF90 Stradale combines a 4.0L twin-turbo V8 with three electric motors for a combined 1,000 hp. This plug-in hybrid hypercar sprints from 0 to 100 km/h in just 2.5 seconds, setting a new benchmark for what a Ferrari can achieve.'
  },
  {
    title: 'McLaren 765LT: Lightweight Technology Meets Raw Performance',
    image: 'assets/news-002.webp',
    imageAlt: 'McLaren 765LT in Papaya Orange on open road',
    content: 'The McLaren 765LT is the most track-focused, driver-centric, and powerful Longtail McLaren road car ever. Weighing just 1,229 kg, its 4.0L twin-turbo V8 produces 765 hp, delivering a power-to-weight ratio that few cars can match. Titanium exhaust, carbon fiber body panels, and active aero make this a true driver\'s weapon.'
  },
  {
    title: 'Bugatti Chiron Super Sport: 300+ mph, Road Legal',
    image: 'assets/news-003.webp',
    imageAlt: 'Bugatti Chiron Super Sport 300+ in Jet Black',
    content: 'The Bugatti Chiron Super Sport 300+ became the first production car to break the 300 mph barrier. Based on the record-setting car driven by Andy Wallace in 2019, this road-legal hypercar features a quad-turbocharged 8.0L W16 engine producing 1,600 hp. Only 30 units were produced, each a rolling piece of automotive history.'
  },
  {
    title: 'Lamborghini Huracán EVO: Born on the Track, Bred for the Road',
    image: 'assets/news-004.webp',
    imageAlt: 'Lamborghini Huracán EVO in Verde Mantis',
    content: 'The Huracán EVO represents the next step in the evolution of the mid-rear engined sports car. Featuring the most advanced version of Lamborghini\'s LDVI system, the EVO intuitively anticipates and manages all vehicle dynamics. The 5.2L naturally aspirated V10 delivers 640 hp with an incredible soundtrack that defines what a supercar should sound like.'
  },
  {
    title: 'Rimac Nevera: Croatia\'s Electric Hypercar Revolution',
    image: 'assets/news-005.webp',
    imageAlt: 'Rimac Nevera in Atomic Blue at a charging station',
    content: 'The Rimac Nevera is the world\'s fastest production electric car, producing 1,914 hp from four electric motors. It accelerates from 0 to 100 km/h in an astonishing 1.97 seconds, rewriting the laws of automotive performance. With a 120 kWh battery pack and advanced torque vectoring, the Nevera represents the future of hypercars.'
  },
  {
    title: 'Mercedes-AMG ONE: F1 Technology for the Road',
    image: 'assets/news-006.webp',
    imageAlt: 'Mercedes-AMG ONE in Silver Arrow livery',
    content: 'The Mercedes-AMG ONE brings genuine Formula 1 hybrid technology to the road for the first time. Powered by a 1.6L V6 F1 engine combined with four electric motors for a total output of over 1,000 hp, this hypercar features the same power unit concept as AMG\'s Championship-winning F1 cars. Only 275 units will be built.'
  },
  {
    title: 'Koenigsegg Jesko Absolut: The 330 mph Dream',
    image: 'assets/news-007.webp',
    imageAlt: 'Koenigsegg Jesko Absolut in Ghost White',
    content: 'The Koenigsegg Jesko Absolut is theoretically the fastest production car ever created, with a calculated top speed of 330 mph. Its 5.0L twin-turbo V8 produces 1,600 hp on E85, featuring Koenigsegg\'s revolutionary Light Speed Transmission with 9 gears and virtually instantaneous gear changes. A masterpiece of Swedish engineering.'
  },
  {
    title: 'Porsche Taycan Turbo S: Electric Sportscar Perfection',
    image: 'assets/news-008.webp',
    imageAlt: 'Porsche Taycan Turbo S in Frozen Blue Metallic',
    content: 'The Porsche Taycan Turbo S proves that electric cars can be sports cars in the truest sense. With overboost power of 761 hp and 1,050 Nm of torque, it accelerates from 0 to 100 km/h in 2.8 seconds. The 800V architecture enables ultra-fast charging, adding 100 km of range in just 5 minutes. This is Porsche\'s vision of electric performance.'
  }
];

async function seedNews() {
  console.log('Seeding news articles...\n');
  let success = 0;
  let failed = 0;

  for (const article of news) {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(`FAILED: ${article.title} — ${err}`);
        failed++;
      } else {
        const data = await res.json();
        console.log(`OK: ${article.title} (id: ${data.id})`);
        success++;
      }
    } catch (e) {
      console.error(`ERROR: ${article.title} — ${e.message}`);
      failed++;
    }
  }

  console.log(`\nDone. ${success} seeded, ${failed} failed.`);
}

module.exports = news;
if (require.main === module) seedNews();
