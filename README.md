# bmi

Website for BMI Fitness. ([demo](https://djtv.io/bmi))

_Unfortunately, this business closed due to COVID-19._

## Tech Stack

- [Jekyll](https://jekyllrb.com)
- [Node.js](https://nodejs.org)
- [Sass](https://sass-lang.com/)
- [Materialize](https://materializecss.com/)
- [Disqus](https://disqus.com/)
- [Forestry.io](https://forestry.io)
- [Formspree](https://formspree.io/)

## Development

### Setup

You should have the following installed:

- Node
- Ruby
- ImageMagick
- Bundler

```sh
$ npm install
```

### Commands

#### dev

`npm run dev`

Builds the website and starts Jekyll server on port 4000. Images will be
optimized.

#### dev-nopic

`npm run dev-nopic`

Builds the website and starts Jekyll server on port 4000. Images will **not**
be optimized.

#### build

`npm run build`

Builds the website. Images will be optimized.

#### build-nopic

`npm run build-nopic`

Builds the website. Images will **not** be optimized.

#### reviews

`npm run reviews` **Disabled until we get access to Google Business API**

This script will retrieve all Google Reviews for BMI Fitness and save in
`_data/reviews.yml`
