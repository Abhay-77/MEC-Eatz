import { supabase } from "./supabase.js";

const items = [
  {
    name: "Margherita Pizza",
    price: 299,
    available: true,
    description: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce."
  },
  {
    name: "Cheeseburger",
    price: 249,
    available: true,
    description: "Juicy beef patty with melted cheese, lettuce, tomato, and signature sauce."
  },
  {
    name: "Veggie Wrap",
    price: 199,
    available: false,
    description: "Whole wheat wrap filled with grilled vegetables and tangy yogurt dressing."
  },
  {
    name: "Grilled Chicken Sandwich",
    price: 269,
    available: true,
    description: "Tender grilled chicken breast served with lettuce, tomato, and mayo on a toasted bun."
  },
  {
    name: "Caesar Salad",
    price: 179,
    available: true,
    description: "Crisp romaine lettuce tossed with creamy Caesar dressing, croutons, and parmesan."
  },
  {
    name: "Mango Smoothie",
    price: 149,
    available: true,
    description: "Refreshing tropical blend of ripe mangoes, yogurt, and honey."
  },
  {
    name: "Iced Coffee",
    price: 129,
    available: true,
    description: "Chilled coffee with milk and a hint of vanilla, served over ice."
  },
  {
    name: "Chocolate Milkshake",
    price: 159,
    available: false,
    description: "Thick and creamy shake made with chocolate ice cream and fresh milk."
  },
  {
    name: "Pasta Alfredo",
    price: 279,
    available: true,
    description: "Creamy fettuccine pasta tossed with parmesan cheese and rich alfredo sauce."
  },
  {
    name: "Lemon Iced Tea",
    price: 99,
    available: true,
    description: "Cool and refreshing black tea infused with lemon flavor and a touch of sweetness."
  }
];

const seedDB = async () => {
    const {data} = await supabase.from("Items").insert(items)
}

seedDB()
console.log("DB seeded")