#!/usr/bin/env node

const fs = require('fs').promises
const globby = require('globby');
const inline = require('inline-critical')
const PurgeCSS = require('purgecss').default

// -----------------------------------------------------------------------------
// runPurge(options)
//
// options: {
//   css:   <String> css
//   globs: Array<String> globs to html files
// }
//
// returns a Promise that resolves to:
//   [
//     {
//       htmlFile: '', // html filename
//       purgeResult: [
//         {
//           css: '',  // purged css
//         }
//       ]
//     }
//   ]
// -----------------------------------------------------------------------------
async function runPurge(options) {
  const purgeCss = new PurgeCSS()
  const htmlFiles = await globby(options.globs)

  const purgedFiles = htmlFiles.map(async htmlFile => {
    const purgeResult = await purgeCss.purge({
      content: [htmlFile],
      css: [{ raw: options.css }]
    })

    return { htmlFile, purgeResult }
  })

  return await Promise.all(purgedFiles)
}


// -----------------------------------------------------------------------------
// runInline
// isolates the side effects
// -----------------------------------------------------------------------------
async function runInline(htmlFile, css) {
  let html = await fs.readFile(htmlFile)
  await fs.writeFile(htmlFile, inline(html, css))
}


// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------
async function main() {
  const mainCssFile = '_site/assets/css/main.css'
  const mainCss = await fs.readFile(mainCssFile)
  const globsToPurge = [
    '_site/**/*.html',
  ]
  const globsToIgnore = [
    '_site/admin/*'
  ]
  const globsToNotPurge = [
    '_site/trainers/**/*',
    '_site/careers/*',
    '_site/services/personal-training/*',
    '_site/services/rental-space/*'
  ]

  /*
   * process files that inline purged css
   */
  console.log(`Inline-CSS: process purge files`)
  const purgedList = await runPurge({
    css: mainCss,
    globs: [
      ...globsToPurge,
      ...globsToIgnore.map(glob => `!${glob}`),
      ...globsToNotPurge.map(glob => `!${glob}`)
    ]
  })

  for (const item of purgedList) {
    await runInline(item.htmlFile, item.purgeResult.shift().css)
  }

  /*
   * process files that inline all css
   */
  console.log(`Inline CSS: process inline only files`)
  const htmlFiles = await globby(globsToNotPurge)

  for (const htmlFile of htmlFiles) {
    await runInline(htmlFile, mainCss)
  }
}

main()
