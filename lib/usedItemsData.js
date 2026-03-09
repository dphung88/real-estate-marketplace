export const ITEMS_PER_PAGE = 6;

// 4 ảnh mỗi item: [full, góc 2, góc 3, góc 4] — khác nhau để khách xem chi tiết
const carBody = 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=75';
const carWheel = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=75';
const carInterior = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=75';
// Lawn mowers: full mower, ride-on, bãi cỏ/green, góc máy khác
const mowerFull = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75';
const mowerRideOn = 'https://images.unsplash.com/photo-1630709437016-ee675b9b29b8?w=600&q=75';
const mowerGrass = 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=600&q=75';
const mowerField = 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=600&q=75';

// More mower images for uniqueness
const mower1 = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75';
const mower2 = 'https://images.unsplash.com/photo-1630709437016-ee675b9b29b8?w=600&q=75';
const mower3 = 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?w=600&q=75';
const mower4 = 'https://images.unsplash.com/photo-1592179900431-1e021ea53b28?w=600&q=75';
const mower5 = 'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=600&q=75';
const mower6 = 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&q=75';
// Other: grill
const grill1 = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=75';
const grill2 = 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=75';
const grill3 = 'https://images.unsplash.com/photo-1527524159482-b5c459dc8a5d?w=600&q=75';
const grill4 = 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=75';
// TV
const tv1 = 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=75';
const tv2 = 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&q=75';
const tv3 = 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=600&q=75';
const tv4 = 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=75';
// Bedroom
const bed1 = 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=75';
const bed2 = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14b0?w=600&q=75';
const bed3 = 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=75';
const bed4 = 'https://images.unsplash.com/photo-1505693314120-0d443da42156?w=600&q=75';
// Camera
const cam1 = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=75';
const cam2 = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=75';
const cam3 = 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&q=75';
const cam4 = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=75';
// Tools
const tool1 = 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=75';
const tool2 = 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=75';
const tool3 = 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=75';
const tool4 = 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=75';
// Fitness bike
const bike1 = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=75';
const bike2 = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=75';
const bike3 = 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=75';
const bike4 = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=75';

export const ALL_ITEMS = [
  { id: 1, title: 'Toyota Camry 2020', category: 'cars', location: 'Chicago, IL', price: 22500, condition: 'excellent', description: '45,000 miles, excellent condition, 1 owner, full service history.', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=75', images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=75', carBody, carWheel, carInterior] },
  { id: 2, title: 'Honda Accord 2019', category: 'cars', location: 'Chicago, IL', price: 19800, condition: 'excellent', description: '52,000 miles, clean title, leather seats, sunroof.', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=75', images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=75', 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=75', carWheel, carInterior] },
  { id: 3, title: 'Ford F-150 2018', category: 'cars', location: 'Naperville, IL', price: 28500, condition: 'good', description: '68,000 miles, crew cab, 4WD, tow package included.', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=75', images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=75', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=75', carWheel, carInterior] },
  { id: 4, title: 'Chevrolet Malibu 2021', category: 'cars', location: 'Chicago, IL', price: 19500, condition: 'excellent', description: '32,000 miles, one owner, Apple CarPlay, backup camera.', image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=75', images: ['https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=75', carBody, carWheel, carInterior] },
  { id: 5, title: 'Nissan Altima 2020', category: 'cars', location: 'Evanston, IL', price: 17200, condition: 'good', description: '48,000 miles, fuel efficient, keyless entry, well maintained.', image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=75', images: ['https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=75', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=75', carWheel, carInterior] },
  { id: 6, title: 'Hyundai Sonata 2022', category: 'cars', location: 'Chicago, IL', price: 21500, condition: 'excellent', description: '22,000 miles, pristine condition, remaining warranty transferable.', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=75', images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=75', carBody, carWheel, carInterior] },
  { id: 7, title: 'John Deere Riding Mower', category: 'lawnmowers', location: 'Chicago, IL', price: 1800, condition: 'good', description: '2019 model, 200 hours of use, good condition, clean and serviced.', image: mower1, images: [mower1, mowerRideOn, mowerGrass, mowerField] },
  { id: 8, title: 'Husqvarna Zero Turn Mower', category: 'lawnmowers', location: 'Oak Park, IL', price: 3200, condition: 'excellent', description: '2021 model, 42" deck, hydrostatic drive, low hours.', image: mower2, images: [mower2, mowerRideOn, mowerGrass, mowerField] },
  { id: 9, title: 'Toro Push Mower 22"', category: 'lawnmowers', location: 'Chicago, IL', price: 220, condition: 'good', description: 'Self-propelled, electric start, mulching capability.', image: mower3, images: [mower3, mowerRideOn, mowerGrass, mowerField] },
  { id: 10, title: 'Cub Cadet XT1', category: 'lawnmowers', location: 'Wheaton, IL', price: 1450, condition: 'excellent', description: '2018 model, 42" cut, bagger included, garage kept.', image: mower4, images: [mower4, mowerRideOn, mowerGrass, mowerField] },
  { id: 11, title: 'Snapper Riding Mower', category: 'lawnmowers', location: 'Chicago, IL', price: 950, condition: 'good', description: '30" deck, 12.5 HP, reliable for small yards.', image: mower5, images: [mower5, mowerRideOn, mowerGrass, mowerField] },
  { id: 12, title: 'Greenworks 40V Cordless Mower', category: 'lawnmowers', location: 'Evanston, IL', price: 380, condition: 'excellent', description: 'Battery-powered, quiet, includes 2 batteries and charger.', image: mower6, images: [mower6, mowerRideOn, mowerGrass, mowerField] },
  { id: 13, title: '2018 Clayton Mobile Home', category: 'mobile-homes', location: 'Chicago, IL', price: 45000, condition: 'excellent', description: '3 bedrooms, 2 baths, 1,200 sqft, well-maintained, move-in ready.', image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=75', images: ['https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=75', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=75', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=75', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75'] },
  { id: 14, title: 'Fleetwood Single Wide 2020', category: 'mobile-homes', location: 'Joliet, IL', price: 52000, condition: 'excellent', description: '2 beds, 2 baths, 1,000 sqft, new HVAC, skirting included.', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=75', images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=75', 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=75', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=75', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=75'] },
  { id: 15, title: 'Champion Double Wide 2016', category: 'mobile-homes', location: 'Rockford, IL', price: 38000, condition: 'good', description: '4 beds, 2 baths, 1,500 sqft, large lot, porch included.', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=75', images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=75', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75', 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=75', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=75'] },
  { id: 16, title: 'Cavco Park Model 2019', category: 'mobile-homes', location: 'Peoria, IL', price: 68000, condition: 'excellent', description: '3 beds, 2 baths, 1,800 sqft, luxury finishes, lake view.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=75', images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=75', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=75', 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=75'] },
  { id: 17, title: 'Palm Harbor Double Wide', category: 'mobile-homes', location: 'Chicago, IL', price: 55000, condition: 'good', description: '3 beds, 2 baths, 1,350 sqft, vinyl siding, deck.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75', images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=75', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=75', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=75'] },
  { id: 18, title: 'Skyline Single Wide 2015', category: 'mobile-homes', location: 'Springfield, IL', price: 29000, condition: 'fair', description: '2 beds, 1 bath, 720 sqft, needs minor updates, solid structure.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=75', images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=75', 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=75', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=75', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75'] },
  { id: 19, title: 'Weber Genesis Gas Grill', category: 'other', location: 'Chicago, IL', price: 450, condition: 'excellent', description: '3 burners, side burner, cover included, used 2 seasons.', image: grill1, images: [grill1, grill2, grill3, grill4] },
  { id: 20, title: 'Samsung 65" Smart TV', category: 'other', location: 'Oak Park, IL', price: 580, condition: 'excellent', description: '4K UHD, HDR, like new with remote and stand.', image: tv1, images: [tv1, tv2, tv3, tv4] },
  { id: 21, title: 'Queen Bedroom Set', category: 'other', location: 'Chicago, IL', price: 650, condition: 'good', description: 'Bed frame, mattress, headboard, 2 nightstands. Solid wood.', image: bed1, images: [bed1, bed2, bed3, bed4] },
  { id: 22, title: 'Canon EOS R5 Camera', category: 'other', location: 'Evanston, IL', price: 3200, condition: 'excellent', description: '45MP, 8K video, 2 lenses included, low shutter count.', image: cam1, images: [cam1, cam2, cam3, cam4] },
  { id: 23, title: 'DeWalt Power Tool Set', category: 'other', location: 'Chicago, IL', price: 420, condition: 'good', description: 'Drill, impact driver, circular saw, 2 batteries, charger.', image: tool1, images: [tool1, tool2, tool3, tool4] },
  { id: 24, title: 'Peloton Bike', category: 'other', location: 'Naperville, IL', price: 1450, condition: 'excellent', description: 'Gen 2, subscription transferable, shoes and weights included.', image: bike1, images: [bike1, bike2, bike3, bike4] },
];
