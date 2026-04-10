const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");

// ✅ PASTE YOUR MONGODB URI HERE
const MONGODB_URI = "mongodb+srv://kapisadmin:kapis123@cluster0.zjgnqgo.mongodb.net/vasan?retryWrites=true&w=majority";
const DB_NAME = "shree-krishna-vasan-bhandar";

const demoProducts = [
  // ─── COOKWARE ───
  {
    name: "Stainless Steel Kadhai 28cm",
    slug: "stainless-steel-kadhai-28cm",
    price: 899,
    category: "Cookware",
    description: "Premium grade stainless steel kadhai ideal for deep frying, sautéing and everyday Indian cooking. Mirror-polished interior for easy cleaning.",
    features: ["Food-grade 304 stainless steel", "Mirror polished interior", "Induction compatible", "Dishwasher safe", "28cm diameter, 5L capacity"],
    images: [
      "https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
    stock: 50,
    isFeatured: true,
  },
  {
    name: "Non-Stick Frying Pan 24cm",
    slug: "non-stick-frying-pan-24cm",
    price: 649,
    category: "Cookware",
    description: "Premium non-stick frying pan with ergonomic handle. Perfect for omelettes, pancakes and everyday cooking with minimal oil.",
    features: ["PFOA-free non-stick coating", "Bakelite handle stays cool", "Even heat distribution", "Suitable for gas & induction", "24cm diameter"],
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
    stock: 35,
    isFeatured: true,
  },
  {
    name: "Pressure Cooker 5L",
    slug: "pressure-cooker-5l",
    price: 1299,
    category: "Cookware",
    description: "ISI certified stainless steel pressure cooker. Cook faster and retain more nutrients. Safety valve and gasket included.",
    features: ["ISI certified", "5 litre capacity", "Tri-ply base", "Safety valve included", "10 year warranty"],
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      "https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=600&q=80",
    ],
    stock: 28,
    isFeatured: false,
  },
  {
    name: "Sauce Pan with Lid 18cm",
    slug: "sauce-pan-with-lid-18cm",
    price: 549,
    category: "Cookware",
    description: "Compact stainless steel sauce pan with glass lid. Ideal for making sauces, soups, boiling milk and heating food.",
    features: ["Glass lid included", "Stay-cool handle", "Pouring spout on both sides", "Dishwasher safe", "18cm diameter"],
    images: [
      "https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=600&q=80",
    ],
    stock: 42,
    isFeatured: false,
  },
  {
    name: "Tawa / Griddle 30cm",
    slug: "tawa-griddle-30cm",
    price: 449,
    category: "Cookware",
    description: "Heavy-duty flat tawa for making rotis, parathas and dosas. Thick base ensures uniform heat distribution.",
    features: ["Thick 3mm base", "Natural non-stick surface", "No coating to peel", "Gas & induction ready", "30cm diameter"],
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80",
    ],
    stock: 60,
    isFeatured: true,
  },

  // ─── STORAGE ───
  {
    name: "Stainless Steel Container Set (3 pcs)",
    slug: "stainless-steel-container-set-3pcs",
    price: 599,
    category: "Storage",
    description: "Airtight stainless steel containers perfect for storing dal, rice, sugar and spices. Keep food fresh for longer.",
    features: ["Airtight locking lid", "Set of 3 sizes: 500ml, 1L, 1.5L", "BPA-free", "Stackable design", "Rust resistant"],
    images: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&q=80",
    ],
    stock: 75,
    isFeatured: true,
  },
  {
    name: "Milton Steel Water Bottle 1L",
    slug: "milton-steel-water-bottle-1l",
    price: 349,
    category: "Storage",
    description: "Double-wall insulated stainless steel bottle. Keeps water cold for 24 hours and hot for 12 hours.",
    features: ["Double-wall vacuum insulation", "1 litre capacity", "Leak-proof lid", "BPA-free", "Hot & cold 24 hours"],
    images: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
    ],
    stock: 90,
    isFeatured: false,
  },
  {
    name: "Masala Dabba / Spice Box",
    slug: "masala-dabba-spice-box",
    price: 499,
    category: "Storage",
    description: "Traditional Indian masala dabba with 7 spice compartments and a small spoon. Keeps spices fresh and organized.",
    features: ["7 individual spice containers", "Comes with a small spoon", "Airtight outer lid", "Mirror-polished steel", "Easy to clean"],
    images: [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&q=80",
    ],
    stock: 55,
    isFeatured: true,
  },
  {
    name: "Bread Box / Roti Container",
    slug: "bread-box-roti-container",
    price: 399,
    category: "Storage",
    description: "Large stainless steel bread box to store rotis, parathas and bread fresh. Ventilated design prevents condensation.",
    features: ["Ventilated lid design", "Large capacity", "Easy-grip handle", "Stackable", "Food-safe steel"],
    images: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
    ],
    stock: 40,
    isFeatured: false,
  },

  // ─── DINNER SET ───
  {
    name: "Stainless Steel Thali Set (6 pcs)",
    slug: "stainless-steel-thali-set-6pcs",
    price: 1499,
    category: "Dinner Set",
    description: "Complete thali set with 1 large thali, 2 katoris, 1 glass, 1 spoon and 1 fork. Perfect for daily use and gifting.",
    features: ["6 piece complete set", "Mirror polished finish", "Heavy gauge steel", "Dishwasher safe", "Gift box packaging"],
    images: [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
    ],
    stock: 30,
    isFeatured: true,
  },
  {
    name: "Designer Dinner Plate Set (6 pcs)",
    slug: "designer-dinner-plate-set-6pcs",
    price: 1199,
    category: "Dinner Set",
    description: "Elegant embossed design dinner plates. Set of 6 plates ideal for serving rice, roti and curries at home or parties.",
    features: ["Embossed floral design", "Set of 6 plates", "26cm diameter", "Scratch resistant", "Heavy duty 1.5mm steel"],
    images: [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&q=80",
    ],
    stock: 25,
    isFeatured: false,
  },
  {
    name: "Katori / Bowl Set (6 pcs)",
    slug: "katori-bowl-set-6pcs",
    price: 449,
    category: "Dinner Set",
    description: "Small serving bowls for dal, sabzi, curd and desserts. Set of 6 uniform katoris with a satin finish.",
    features: ["Set of 6 katoris", "200ml capacity each", "Satin finish", "Stackable for storage", "Food-grade steel"],
    images: [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&q=80",
    ],
    stock: 80,
    isFeatured: false,
  },
  {
    name: "Serving Spoon Set (6 pcs)",
    slug: "serving-spoon-set-6pcs",
    price: 299,
    category: "Dinner Set",
    description: "Set of 6 stainless steel serving spoons in different sizes. Perfect for serving rice, dal, sabzi and desserts.",
    features: ["6 different sizes", "Mirror polished", "Comfortable handle", "Dishwasher safe", "Rust-proof steel"],
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
    stock: 100,
    isFeatured: false,
  },

  // ─── ACCESSORIES ───
  {
    name: "Stainless Steel Ladle Set (3 pcs)",
    slug: "stainless-steel-ladle-set-3pcs",
    price: 349,
    category: "Accessories",
    description: "Durable ladle set including a soup ladle, slotted ladle and a solid ladle. Long handle keeps hands away from heat.",
    features: ["Set of 3 ladles", "Long 33cm handle", "Hook for hanging", "Heavy duty steel", "Dishwasher safe"],
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80",
    ],
    stock: 65,
    isFeatured: false,
  },
  {
    name: "Chakla Belan / Rolling Board & Pin",
    slug: "chakla-belan-rolling-board-pin",
    price: 249,
    category: "Accessories",
    description: "Classic stainless steel chakla and belan set for making perfectly round rotis and parathas every time.",
    features: ["25cm chakla diameter", "Smooth rolling surface", "Lightweight belan", "No rust or stain", "Easy to clean"],
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80",
    ],
    stock: 70,
    isFeatured: false,
  },
  {
    name: "Grater & Peeler Combo",
    slug: "grater-peeler-combo",
    price: 199,
    category: "Accessories",
    description: "Multi-purpose box grater with 4 grating surfaces plus a stainless steel peeler. Essential kitchen tools.",
    features: ["4 grating surfaces", "Non-slip base", "Stainless steel blades", "Includes peeler", "Compact storage"],
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80",
    ],
    stock: 85,
    isFeatured: false,
  },
  {
    name: "Colander / Chalni 24cm",
    slug: "colander-chalni-24cm",
    price: 279,
    category: "Accessories",
    description: "Large stainless steel colander for draining pasta, washing vegetables and straining liquids efficiently.",
    features: ["24cm diameter", "Sturdy handles on both sides", "Fine perforation pattern", "Foot ring for stability", "Easy to clean"],
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80",
    ],
    stock: 55,
    isFeatured: false,
  },
  {
    name: "Kitchen Tong 30cm",
    slug: "kitchen-tong-30cm",
    price: 149,
    category: "Accessories",
    description: "Multipurpose spring-loaded kitchen tong for flipping, grilling and serving. Locking mechanism for easy storage.",
    features: ["Spring-loaded mechanism", "Locking ring for storage", "30cm length", "Heat-resistant grip", "Dishwasher safe"],
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80",
    ],
    stock: 120,
    isFeatured: false,
  },
  {
    name: "Idli Stand 4-Plate (16 idlis)",
    slug: "idli-stand-4-plate-16-idlis",
    price: 399,
    category: "Accessories",
    description: "Classic 4-plate idli stand that makes 16 idlis at once. Compatible with all standard pressure cookers and idli pots.",
    features: ["Makes 16 idlis at once", "4 removable plates", "Fits standard cookers", "Easy to clean plates", "Durable steel"],
    images: [
      "https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=600&q=80",
    ],
    stock: 45,
    isFeatured: true,
  },
];

async function seed() {
  console.log("🔗 Connecting to MongoDB...");
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  console.log("✅ Connected!");

  const db = client.db(DB_NAME);

  // ── ADMIN USER ──
  const existingAdmin = await db.collection("admins").findOne({ username: "admin" });
  if (existingAdmin) {
    console.log("⚠️  Admin user already exists, skipping...");
  } else {
    const hash = await bcrypt.hash("admin123", 10);
    await db.collection("admins").insertOne({
      username: "admin",
      password: hash,
      createdAt: new Date(),
    });
    console.log("✅ Admin created — username: admin | password: admin123");
  }

  // ── PRODUCTS ──
  const existing = await db.collection("products").countDocuments();
  if (existing > 0) {
    console.log(`⚠️  ${existing} products already exist. Dropping and re-seeding...`);
    await db.collection("products").deleteMany({});
  }

  const productsWithDates = demoProducts.map((p) => ({
    ...p,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await db.collection("products").insertMany(productsWithDates);
  console.log(`✅ ${demoProducts.length} demo products inserted!`);

  // ── DEMO ORDERS ──
  await db.collection("orders").deleteMany({});
  await db.collection("orders").insertMany([
    {
      customer: { name: "Ravi Patel", phone: "+91 98765 43210", address: "12, Satellite Road, Ahmedabad - 380015" },
      items: [
        { productId: "demo1", name: "Stainless Steel Kadhai 28cm", price: 899, quantity: 2 },
        { productId: "demo2", name: "Non-Stick Frying Pan 24cm", price: 649, quantity: 1 },
      ],
      totalAmount: 2447,
      paymentStatus: "paid",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      customer: { name: "Meena Shah", phone: "+91 87654 32109", address: "45, Vastrapur Lake Road, Ahmedabad - 380054" },
      items: [
        { productId: "demo3", name: "Stainless Steel Thali Set (6 pcs)", price: 1499, quantity: 1 },
      ],
      totalAmount: 1499,
      paymentStatus: "paid",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      customer: { name: "Suresh Mehta", phone: "+91 76543 21098", address: "7, C.G. Road, Navrangpura, Ahmedabad - 380009" },
      items: [
        { productId: "demo4", name: "Pressure Cooker 5L", price: 1299, quantity: 1 },
        { productId: "demo5", name: "Masala Dabba / Spice Box", price: 499, quantity: 2 },
      ],
      totalAmount: 2297,
      paymentStatus: "pending",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      customer: { name: "Priya Joshi", phone: "+91 65432 10987", address: "22, Paldi, Ahmedabad - 380007" },
      items: [
        { productId: "demo6", name: "Stainless Steel Container Set (3 pcs)", price: 599, quantity: 3 },
      ],
      totalAmount: 1797,
      paymentStatus: "paid",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      customer: { name: "Amit Desai", phone: "+91 54321 09876", address: "88, Bopal, Ahmedabad - 380058" },
      items: [
        { productId: "demo7", name: "Tawa / Griddle 30cm", price: 449, quantity: 1 },
        { productId: "demo8", name: "Stainless Steel Ladle Set (3 pcs)", price: 349, quantity: 1 },
      ],
      totalAmount: 898,
      paymentStatus: "failed",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ]);
  console.log("✅ 5 demo orders inserted!");

  // ── DEMO ENQUIRIES ──
  await db.collection("enquiries").deleteMany({});
  await db.collection("enquiries").insertMany([
    {
      name: "Bharat Kitchenware",
      business: "Bharat Kitchenware Pvt Ltd",
      phone: "+91 99887 76655",
      city: "Surat",
      message: "We are interested in bulk orders for the Kadhai and Tawa range. Please share your dealer pricing.",
      type: "dealer",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Nilesh Solanki",
      phone: "+91 88776 65544",
      message: "Do you have the pressure cooker available in 3L size as well?",
      type: "contact",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Kavita General Store",
      business: "Kavita General Store",
      phone: "+91 77665 54433",
      city: "Vadodara",
      message: "We run a retail store in Vadodara and would like to become an authorized dealer.",
      type: "dealer",
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Rajesh Kumar",
      phone: "+91 66554 43322",
      message: "Interested in the Thali Set for a wedding gift. Do you provide gift wrapping?",
      type: "contact",
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
  ]);
  console.log("✅ 4 demo enquiries inserted!");

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🎉 SEED COMPLETE!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Admin Login: http://localhost:3000/admin/login");
  console.log("Username   : admin");
  console.log("Password   : admin123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  await client.close();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});