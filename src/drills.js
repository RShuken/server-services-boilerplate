"use strict";

const knex = require("knex");
require("dotenv").config();

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});


const getAllTextItems = (searchTerm) => {
    knexInstance
        .from("shopping_list")
        .select("name")
        .where("name", "ILIKE", `%${searchTerm}%`)
        .then((result) => console.log(result));
};


//getAllTextItems("fish");


const getAllItemsPaginated = (pageNumber) => {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber - 1);
  knexInstance
    .from("shopping_list")
    .select("*")
    .limit(productsPerPage)
    .offset(offset)
    .then(results => console.log(results));
};

//getAllItemsPaginated(2);

const getItemsAddedAfterDate = (days) => {
  knexInstance
    .from("shopping_list")
    .select("name", "price", "date_added")
    .where("date_added", ">", knexInstance.raw(`now() - '?? days'::INTERVAL`, days))
    .then(results => console.log(results));
};

//getItemsAddedAfterDate(13);

const getTotalFromCategory = () => {
  knexInstance
    .from("shopping_list")
    .select("category")
    .groupBy("category")
    .sum('price as total')
    .then(result => console.log(result))
}

getTotalFromCategory();

// function mostPopularVideosForDays(days) {
//   knexInstance
//     .select("video_name", "region")
//     .count("date_viewed AS views")
//     .where(
//       "date_viewed",
//       ">",
//       knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
//     )
//     .from("whopipe_video_views")
//     .groupBy("video_name", "region")
//     .orderBy([
//       { column: "region", order: "ASC" },
//       { column: "views", order: "DESC" },
//     ])
//     .then((result) => {
//       console.log(result);
//     });
// }

// mostPopularVideosForDays(30);




// function paginateProducts(page) {
//   const productsPerPage = 10;
//   const offset = productsPerPage * (page - 1);
//   knexInstance
//     .select("product_id", "name", "price", "category")
//     .from("amazong_products")
//     .limit(productsPerPage)
//     .offset(offset)
//     .then((result) => {
//       console.log(result);
//     });
// }

// paginateProducts(2);

// function getProductsWithImages() {
//   knexInstance
//     .select("product_id", "name", "price", "category", "image")
//     .from("amazong_products")
//     .whereNotNull("image")
//     .then((result) => {
//       console.log(result);
//     });
// }

// getProductsWithImages();




// const searchByProduceName = (searchTerm) => {
// knexInstance
//   .select("product_id", "name", "price", "category")
//   .from("amazong_products")
//   .where("name", "ILIKE", `%${searchTerm}%`)
//   .then((result) => {
//     console.log(result);
//   });
// }


// searchByProduceName('holo');