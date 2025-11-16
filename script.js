/* -------------------------
   Floors + Auto-place shops
   Replace previous FLOORS and SHOPS variables with this block
   ------------------------- */

// GRID dims used by the rest of script (unchanged)
const GRID_W = 20, GRID_H = 14, CELL = 28, GAP = 4;

// New multi-floor maps (6 floors): Ground, 1st, 2nd, 3rd, 4th, Food Court
// '.' = walkable, '#' = wall, 'S' = shop placeholder, 'X' = escalator/stairs/lift, 'E' = entrance, 'W' = washroom
const FLOORS = [
  // 0 - Ground Floor
  { id:0, name:'Ground', map:[
    '####################',
    '#E..S..S..S..S..S..#',
    '#..S..S..S..S..S..W#',
    '#..S..S..S..S..S..W#',
    '#..................#',
    '#..####..####..##..#',
    '#..#..#..#..#..#X..#',
    '#..#..#..#..#..#X..#',
    '#..####..####..##..#',
    '#.................#',
    '#.S.....S....S....#',
    '#.S.....S....S....#',
    '#.................#',
    '####################'
  ]},
  // 1 - 1st Floor
  { id:1, name:'1st', map:[
    '####################',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..#####..#####....#',
    '#..#X..#..#X..#....#',
    '#..#X..#..#X..#....#',
    '#..#####..#####....#',
    '#..................#',
    '#..W.......W.......#',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..................#',
    '####################'
  ]},
  // 2 - 2nd Floor
  { id:2, name:'2nd', map:[
    '####################',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..#####..#####....#',
    '#..#X..#..#X..#....#',
    '#..#X..#..#X..#....#',
    '#..#####..#####....#',
    '#..................#',
    '#..W.......W.......#',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..................#',
    '####################'
  ]},
  // 3 - 3rd Floor
  { id:3, name:'3rd', map:[
    '####################',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..#####..#####....#',
    '#..#X..#..#X..#....#',
    '#..#X..#..#X..#....#',
    '#..#####..#####....#',
    '#..................#',
    '#..W.......W.......#',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..................#',
    '####################'
  ]},
  // 4 - 4th Floor
  { id:4, name:'4th', map:[
    '####################',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..#####..#####....#',
    '#..#X..#..#X..#....#',
    '#..#X..#..#X..#....#',
    '#..#####..#####....#',
    '#..................#',
    '#..W.......W.......#',
    '#..S...S....S...S..#',
    '#..S...S....S...S..#',
    '#..................#',
    '####################'
  ]},
  // 5 - Food Court
  { id:5, name:'Food Court', map:[
    '####################',
    '#..S.S.S.S.S.S.S.S.#',
    '#..S.S.S.S.S.S.S.S.#',
    '#..S.S.S.S.S.S.S.S.#',
    '#..................#',
    '#..####..####..##..#',
    '#..#..#..#..#..#X..#',
    '#..#..#..#..#..#X..#',
    '#..####..####..##..#',
    '#.................#',
    '#..S.S.S.S.S.S.S...#',
    '#..S.S.S.S.S.S.S...#',
    '#.................#',
    '####################'
  ]}
];

// The user-supplied JSON (paste exactly what you provided here)
const userShopData = {
  "shops": [
    {"name": "Westside", "floor": "Ground"},
    {"name": "Pantaloons", "floor": "Ground"},
    {"name": "Big Bazaar", "floor": "Ground"},
    {"name": "FabIndia", "floor": "Ground"},
    {"name": "Lifestyle", "floor": "Ground"},
    {"name": "Home Centre", "floor": "Ground"},
    {"name": "Bata", "floor": "Ground"},
    {"name": "Metro Shoes", "floor": "Ground"},
    {"name": "Spar Hypermarket", "floor": "Ground"},

    {"name": "Levi’s", "floor": "1st"},
    {"name": "H&M", "floor": "1st"},
    {"name": "Max Fashion", "floor": "1st"},
    {"name": "Biba", "floor": "1st"},
    {"name": "Raymond", "floor": "1st"},
    {"name": "Allen Solly", "floor": "1st"},
    {"name": "Van Heusen", "floor": "1st"},
    {"name": "Peter England", "floor": "1st"},
    {"name": "Arrow", "floor": "1st"},
    {"name": "United Colors of Benetton", "floor": "1st"},
    {"name": "Global Desi", "floor": "1st"},
    {"name": "W for Women", "floor": "1st"},
    {"name": "Mufti", "floor": "1st"},
    {"name": "Spykar", "floor": "1st"},
    {"name": "Lee", "floor": "1st"},
    {"name": "Jack & Jones", "floor": "1st"},

    {"name": "Nike", "floor": "2nd"},
    {"name": "Puma", "floor": "2nd"},
    {"name": "Adidas", "floor": "2nd"},
    {"name": "Skechers", "floor": "2nd"},
    {"name": "Woodland", "floor": "2nd"},
    {"name": "Reebok", "floor": "2nd"},
    {"name": "Planet Sports", "floor": "2nd"},
    {"name": "Wildcraft", "floor": "2nd"},

    {"name": "Reliance Digital", "floor": "2nd"},
    {"name": "Croma", "floor": "2nd"},
    {"name": "Samsung", "floor": "2nd"},
    {"name": "Bose", "floor": "2nd"},

    {"name": "Poorvika Mobiles", "floor": "2nd"},
    {"name": "Sangeetha Mobiles", "floor": "2nd"},
    {"name": "Reliance Vision Express", "floor": "2nd"},

    {"name": "Tanishq", "floor": "3rd"},
    {"name": "Malabar Gold & Diamonds", "floor": "3rd"},
    {"name": "Titan World", "floor": "3rd"},
    {"name": "Joyalukkas", "floor": "3rd"},
    {"name": "Daniel Wellington", "floor": "3rd"},
    {"name": "Citizen", "floor": "3rd"},
    {"name": "Seiko", "floor": "3rd"},

    {"name": "The Body Shop", "floor": "3rd"},
    {"name": "Nykaa", "floor": "3rd"},
    {"name": "L’Oréal Paris", "floor": "3rd"},
    {"name": "Health & Glow", "floor": "3rd"},

    {"name": "Crossword", "floor": "4th"},
    {"name": "Sapna Book House", "floor": "4th"},

    {"name": "Hidesign", "floor": "4th"},
    {"name": "Lavie", "floor": "4th"},
    {"name": "Chumbak", "floor": "4th"},
    {"name": "Miniso", "floor": "4th"},
    {"name": "Decathlon", "floor": "4th"},

    {"name": "Fastrack", "floor": "4th"},
    {"name": "Gili", "floor": "4th"},
    {"name": "Lush", "floor": "4th"},

    {"name": "McDonald’s", "floor": "Food Court"},
    {"name": "KFC", "floor": "Food Court"},
    {"name": "Domino’s", "floor": "Food Court"},
    {"name": "Pizza Hut", "floor": "Food Court"},
    {"name": "Subway", "floor": "Food Court"},
    {"name": "Savoury Restaurant", "floor": "Food Court"},
    {"name": "Chicking", "floor": "Food Court"},
    {"name": "Ideal Ice Cream Parlour", "floor": "Food Court"},
    {"name": "Roll n Roster", "floor": "Food Court"},
    {"name": "China Town", "floor": "Food Court"},
    {"name": "Shiv Sagar Juice", "floor": "Food Court"},
    {"name": "Baskin Robbins", "floor": "Food Court"}
  ]
};

// floor name -> index map (case-insensitive)
const floorNameToIndex = (name) => {
  if(!name) return 0;
  const n = String(name).trim().toLowerCase();
  if(n==='ground' || n==='ground floor') return 0;
  if(n==='1st' || n==='first' || n==='1') return 1;
  if(n==='2nd' || n==='second' || n==='2') return 2;
  if(n==='3rd' || n==='third' || n==='3') return 3;
  if(n==='4th' || n==='fourth' || n==='4') return 4;
  if(n==='food court' || n==='food') return 5;
  // fallback
  return 0;
};

// helper: find all coordinates with char 'S' or '.' (walkable) on a floor map
function findCoordsForFloor(floorIdx){
  const coordsS = []; const coordsWalk = [];
  const map = FLOORS[floorIdx].map;
  for(let y=0;y<map.length;y++){
    for(let x=0;x<map[y].length;x++){
      const ch = map[y][x];
      if(ch === 'S') coordsS.push({x,y});
      else if(ch === '.') coordsWalk.push({x,y});
    }
  }
  return { coordsS, coordsWalk };
}

// Build SHOPS by placing user shops onto maps
let SHOPS = []; // will be filled below

(function placeUserShops(){
  // group shops by floor index
  const byFloor = {};
  for(const s of userShopData.shops){
    const idx = floorNameToIndex(s.floor);
    if(!byFloor[idx]) byFloor[idx] = [];
    byFloor[idx].push({ name: s.name, floorName: s.floor });
  }

  // iterate floors and place shops where S placeholders exist
  for(const fIdxStr of Object.keys(byFloor)){
    const fIdx = Number(fIdxStr);
    const shopsOnFloor = byFloor[fIdx] || [];
    const { coordsS, coordsWalk } = findCoordsForFloor(fIdx);

    // place shops into coordsS first
    let placed = 0;
    for(let i=0;i<shopsOnFloor.length && i<coordsS.length;i++){
      const pos = coordsS[i];
      const s = shopsOnFloor[i];
      SHOPS.push({
        id: `${s.name.toLowerCase().replace(/\s+/g,'-')}-${fIdx}`,
        floor: fIdx,
        x: pos.x,
        y: pos.y,
        w: 2, h: 2,
        name: s.name,
        category: 'General',
        items: []
      });
      placed++;
    }
    // if more shops than coordsS, fill walkable coords
    if(placed < shopsOnFloor.length){
      let wIdx = 0;
      for(let j=placed;j<shopsOnFloor.length && wIdx < coordsWalk.length;j++, wIdx++){
        const pos = coordsWalk[wIdx];
        const s = shopsOnFloor[j];
        SHOPS.push({
          id: `${s.name.toLowerCase().replace(/\s+/g,'-')}-${fIdx}`,
          floor: fIdx,
          x: pos.x,
          y: pos.y,
          w: 2, h: 2,
          name: s.name,
          category: 'General',
          items: []
        });
      }
      // if still not enough free cells (very unlikely with provided maps), push to first available X near center
      if(placed + (coordsWalk.length) < shopsOnFloor.length){
        const fallback = { x:2, y:2 };
        for(let k = placed + coordsWalk.length; k < shopsOnFloor.length; k++){
          const s = shopsOnFloor[k];
          SHOPS.push({
            id: `${s.name.toLowerCase().replace(/\s+/g,'-')}-${fIdx}`,
            floor: fIdx,
            x: fallback.x + (k%4),
            y: fallback.y + Math.floor(k/4),
            w: 2, h: 2,
            name: s.name,
            category: 'General',
            items: []
          });
        }
      }
    }
  }

  // if localStorage had saved shops (admin edits), prefer those
  try{
    const saved = localStorage.getItem('shops_v1');
    if(saved){
      const loaded = JSON.parse(saved);
      if(Array.isArray(loaded) && loaded.length>0){
        // Merge: keep saved shops (so admin edits persist), but ensure new shops from user data exist.
        // We'll overwrite SHOPS by saved shops, and then add any missing from our placed list.
        const savedMap = new Map(loaded.map(s => [s.id, s]));
        // add placed shops not in saved
        for(const p of SHOPS){
          if(!savedMap.has(p.id)) savedMap.set(p.id, p);
        }
        SHOPS = Array.from(savedMap.values());
      }
    }
  }catch(e){
    console.warn('localStorage merge failed', e);
  }

})(); // auto-run

// expose for debugging
window.__USER_PLACED_SHOPS = SHOPS;
console.log('Placed shops:', SHOPS.length, 'shops. Floors available:', FLOORS.map(f=>f.name).join(', '));
