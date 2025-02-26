import express from "express";
const app = express();
const PORT = 3000;

let cache = {
  data: null,
  timestams: 0,
};
// create fetch fuction
const fetchData = async () => {
  if (cache.data && Date.now() - cache.timestams <60* 1000) {
    return cache.data;
  }
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await response.json();
  cache = {
    data: result.slice(0,5),
    timestams: Date.now(),
  };
  return result.slice(0,5);
};
app.get("/", async (req,res) => {
  const data = await fetchData();
  res.json(data);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
