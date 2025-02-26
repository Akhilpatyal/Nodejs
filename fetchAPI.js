import express from "express";
const port = 3000;
const app = express();
const fetchapi = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const result = await response.json();
  result.slice(0, 5).map((items) => {
    console.log(`${items.id} -> ${items.title}`);
  });
  return result.slice(0, 5);
};
app.get("/", async (req, res) => {
  const data = await fetchapi();
  res.json(data);
});
// fetchapi();

// post data
const body = {
  title: "foo",
  body: "bar",
  userId: 1,
};
const postApi = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
};

postApi().catch((err) => console.log(err));
fetchapi();
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
