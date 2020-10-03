#!/usr/bin/env node

const fs = require('fs').promises
const axios = require('axios').default
const YAML = require('json-to-pretty-yaml');

const apiURL = 'http://localhost:3000'
const outputFileName = '_data/reviews.yml'

async function main() {
  try {
    const { data } = await axios.get(apiURL)
    const fd = await fs.open(outputFileName, 'w')
    await fs.writeFile(fd, YAML.stringify(data))
  } catch (error) {
    console.error(error);
  }
}

main()
