// module.exports = async (req, res, data) => {
//   const pageN = req.headers["x-page-n"] || 0;
//   const pageSize =
//     req.headers["x-page-size"] || process.env.DEFAULT_RESPONSE_PAGE_SIZE;

//   const paginated = await data.page(pageN, pageSize);

//   res.set({
//     "Access-Control-Expose-Headers": "x-page-count, x-row-count",
//     "X-Page-Count": Math.ceil(paginated.total / pageSize),
//     "X-Row-Count": paginated.total,
//   });

//   return paginated.results;
// };
