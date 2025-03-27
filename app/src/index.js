import express from "express";
import cors from "cors";
import { Client } from "@elastic/elasticsearch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const caPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../ca.crt"
);

const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "elk6969",
  },
  tls: {
    ca: fs.readFileSync(caPath),
  },
});

const create = async () => {
  const bulkData = [
    { index: { _index: "game-of-thrones" } },
    { character: "Ned Stark", quote: "Winter is coming." },

    { index: { _index: "game-of-thrones" } },
    { character: "Daenerys Targaryen", quote: "I am the blood of the dragon." },

    { index: { _index: "game-of-thrones" } },
    {
      character: "Tyrion Lannister",
      quote: "A mind needs books like a sword needs whetstone.",
    },
  ];

  const resp = await client.bulk({ refresh: true, body: bulkData });

  console.log(11, resp);
};

const read = async () => {
  // match
  const resp = await client.search({
    index: "game-of-thrones",
    body: {
      query: {
        match: { quote: "Winter" },
      },
    },
  });

  // wildcard
  const resp1 = await client.search({
    index: "game-of-thrones",
    body: {
      query: {
        wildcard: { quote: "win*" },
      },
    },
  });

  console.log(resp.hits, resp1.hits);
};

const update = async () => {
  await client.update({
    index: "game-of-thrones",
    id: "DZql1pUBH3xxHNJ5VVaw",
    body: {
      script: {
        source: "ctx._source.birthplace = 'Winterfell333'",
      },
    },
  });

  const resp = await client.get({
    index: "game-of-thrones",
    id: "DZql1pUBH3xxHNJ5VVaw",
  });

  console.log(11, resp)
};

// create();
// read();
// update()

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Hello BB");
  } catch (error) {}
});

app.listen("3030", () => {
  console.log("open 3030");
});
