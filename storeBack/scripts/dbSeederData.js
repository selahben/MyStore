const categoriesData = [
  { "className": "AllProducts", "title": "All Products", "main": true },
  { "className": "FruitsAndVegetables", "title": "Fruits And Vegetables" },
  { "className": "Dairy", "title": "Dairy" },
  { "className": "Bakery", "title": "Bakery" },
  { "className": "Meats", "title": "Meats" },
  { "className": "DryFood", "title": "Dry Food" },
];

const productsData = [
  {
    "name": "Tomato",
    "description": "The Most tasty Tomato you'll find!",
    "price": 10,
    "unit": "KG",
    "image": {
      "url":
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
      "alt": "Tomato",
    },
    "category": "Fruits And Vegetables",
    "sn": "101",
    "nutritionVals": "Iron",
    "ingredients": "Tomato",
    "tags": "tomato, red, vegetables, vegetable",
  },
  {
    "name": "Letuce",
    "description": "The greenest Letuce Ever!",
    "price": "7",
    "unit": "KG",
    "image": {
      "url": "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
      "alt": "Letuce",
    },
    "category": "Fruits And Vegetables",
    "sn": "103",
    "nutritionVals": "Iron",
    "ingredients": "Lettuce",
    "tags": "lettuce, green, vegetables, vegetable",
  },
  {
    "name": "Milk",
    "description": "Milk is Good for You!",
    "price": "3",
    "unit": "Units",
    "image": {
      "url":
        "https://img-new.cgtrader.com/items/717115/a69ed5d165/large/milk-carton-3d-model-obj-mtl-fbx-blend.png",
      "alt": "Milk",
    },
    "category": "Dairy",
    "sn": "201",
    "nutritionVals": "Calcium: 50% ; Fat: 3%",
    "ingredients": "Milk",
    "tags": "milk, white, dairy",
  },
  {
    "name": "Cheese",
    "description": "Wonderful Cheese",
    "price": "40",
    "unit": "KG",
    "image": {
      "url":
        "https://media.wired.co.uk/photos/606db5957bdd70ad8525ceea/master/w_1600%2Cc_limit/Cheese_01.jpg",
      "alt": "Cheese",
    },
    "category": "Dairy",
    "sn": "203",
    "nutritionVals": "Calcium: 10% ; Salt: 1% ; Fat: 28%",
    "ingredients": "Milk,Salt",
    "tags": "cheese, yellow, dairy",
  },
  {
    "name": "Bread",
    "description": "You got to have Bread!",
    "price": "2",
    "unit": "Units",
    "image": {
      "url":
        "https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/5:4/w_2815,h_2252,c_limit/milk-bread.jpg",
      "alt": "Bread",
    },
    "category": "Bakery",
    "sn": "301",
    "nutritionVals": "Fat: 5% ; Sugar: 1%",
    "ingredients": "Wheat , Salt , Sugar , Eggs",
    "tags": "bread, bakery, wheat, flour",
  },
  {
    "name": "Donuts",
    "description": "Get your Donuts NOW!",
    "price": "1",
    "unit": "Units",
    "image": {
      "url":
        "https://www.christinascucina.com/wp-content/uploads/2014/01/IMG_4471.jpg",
      "alt": "Donuts",
    },
    "category": "Bakery",
    "sn": "302",
    "nutritionVals": "",
    "ingredients": "",
    "tags": "donuts, donut, bakery, wheat, flour, dessert",
  },
  {
    "name": "Chicken Breast",
    "description": "Mmmmm.. Chicken Breast..",
    "price": "20",
    "unit": "KG",
    "image": {
      "url": "https://m.media-amazon.com/images/I/61F-jpebw2L.jpg",
      "alt": "Chicken Breast",
    },
    "category": "Meats",
    "sn": "401",
    "nutritionVals": "",
    "ingredients": "",
    "tags": "chicken breasts, chicken breast, chicken, meat, meats",
  },
  {
    "name": "Steak",
    "description": "Great Steak",
    "price": "60",
    "unit": "KG",
    "image": {
      "url":
        "https://cdn.pixabay.com/photo/2018/02/08/15/02/meat-3139641_1280.jpg",
      "alt": "Steak",
    },
    "category": "Meats",
    "sn": "402",
    "nutritionVals": "",
    "ingredients": "",
    "tags": "steak, steaks, cow, meat, meats",
  },
  {
    "name": "Sugar",
    "description": "Bring a little sweetness to your life",
    "price": "1",
    "unit": "Units",
    "image": {
      "url":
        "https://britishcornershop.co.uk/cdn-cgi/image/width=471,fit=contain,quality=75,format=auto,metadata=copyright/https://www.britishcornershop.co.uk/img/large/HB9999.jpg",
      "alt": "Sugar",
    },
    "category": "Dry Food",
    "sn": "501",
    "nutritionVals": "",
    "ingredients": "",
    "tags": "sugar, white, dry food, dry foods",
  },
  {
    "name": "Salt",
    "description": "A little flavor to every dish ",
    "price": "1",
    "unit": "Units",
    "image": {
      "url":
        "https://www.gourmetfoodworld.com/images/Product/medium/la-baleine-mediterranean-sea-salt-fine-crystals-1S-727.jpg",
      "alt": "Salt",
    },
    "category": "Dry Food",
    "sn": "502",
    "nutritionVals": "",
    "ingredients": "",
    "tags": "salt, white, dry food, dry foods",
  },
  {
    "name": "Flour",
    "description": "Baking is a great hobby",
    "price": "3",
    "unit": "Units",
    "image": {
      "url":
        "https://www.etalianfood.com/pub/media/catalog/product/cache/80d2192410dad911a8a678a81e478d2b/f/l/flour-00-barilla.jpg",
      "alt": "Flour",
    },
    "category": "Dry Food",
    "sn": "503",
    "nutritionVals": "",
    "ingredients": "",
    "tags": "flour, white, dry food, dry foods",
  },
];

const usersData = [
  {
    "name": "John Doe",
    "phone": "972501111111",
    "email": "john_doe@gmail.com",
    "password": "Aa123456&",
    "isAdmin": true,
    "image": {
      "url":
        "https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869_1280.jpg",
      "alt": "John Doe",
    },
    "address": {
      "state": "New York",
      "country": "USA",
      "city": "New York",
    },
  },
  {
    "name": "Jane Doe",
    "phone": "972502222222",
    "email": "jane_doe@gmail.com",
    "password": "Aa123456&",
    "isAdmin": false,
    "image": {
      "url":
        "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "alt": "Jane Doe",
    },
    "address": {
      "country": "Israel",
      "city": "Tel Aviv",
    },
  },
];

module.exports = {
  categoriesData,
  usersData,
  productsData,
};
