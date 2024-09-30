const express = require("express");
const axios = require("axios");

const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "dpg-crld8s8gph6c73e3trvg-a",
  user: "gavin_b6s8_user",
  password: "Llnew57nqEXY4GMVpEQ91tny0OGUxu97",
  database: "gavin_b6s8",
  port: 5432,
});

// Bijvoorbeeld een query
pool
  .query("SELECT * FROM wp_posts WHERE post_type = $1 AND post_status = $2", [
    "post",
    "publish",
  ])
  .then((result) => {
    console.log(result.rows);
  })
  .catch((err) => {
    console.error("Database query error", err);
  });

app.get("/api/posts", async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM wp_posts WHERE post_type = 'post' AND post_status = 'publish';"
    );
    res.status(202).json({ posts: response });
  } catch (err) {
    res.status(404).json({ msg: err });
  }
});

app.get("/api/product", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost/portfolio-wp/wp-json/wp/v2/posts`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ error: "Error fetching product" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
