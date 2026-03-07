const products = [
  // Diaries & Notebooks (categoryId: 1)
  {
    id: 101,
    title: "Deckle Edge Handmade Paper",
    price: 299,
    unit: "Piece",
    size: "A5",
    gsm: 75,
    categoryId: 1,
    subCategoryId: 101, // Leather Diary
    image: "",
  },
  {
    id: 102,
    title: "Executive Desk Diary",
    price: 450,
    unit: "Piece",
    size: "A5",
    gsm: 100,
    categoryId: 1,
    subCategoryId: 102, // Executive Diary
    image: "",
  },
  {
    id: 103,
    title: "Eco-Friendly Notepad",
    price: 150,
    unit: "Piece",
    size: "A6",
    gsm: 80,
    categoryId: 1,
    subCategoryId: 104, // Notebooks
    image: "",
  },

  // Gift Packaging (categoryId: 2)
  {
    id: 201,
    title: "Floral Printed Gift Box",
    price: 350,
    unit: "Set of 3",
    size: "Assorted",
    gsm: 250,
    categoryId: 2,
    subCategoryId: 201, // Gift Box
    image: "",
  },
  {
    id: 202,
    title: "Premium Sweet Box",
    price: 120,
    unit: "Piece",
    size: "Small",
    gsm: 300,
    categoryId: 2,
    subCategoryId: 204, // Sweet Boxes
    image: "",
  },
  
  // Bags (categoryId: 3)
  {
    id: 301,
    title: "Handmade Paper Shopper",
    price: 99,
    unit: "Pack of 5",
    size: "Standard",
    gsm: 200,
    categoryId: 3,
    subCategoryId: 301, // Shopping Bag
    image: "",
  }
];

export default products;