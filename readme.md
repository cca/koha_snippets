# Koha Snippets

Snippets of code to be inserted into the administrative settings of Koha.

## Development

I'm using npm scripts to automate development tasks. Run `npm install` to get the necessary dependencies. Then, from inside this project, you'll have these `npm run` scripts available:

- `build` - run all the compilation scripts listed here, meta-task
- `catalog-js` - minify all public catalog JavaScript
- `admin-js` - minify all staff-facing JavaScript
- `catalog-scss` - compile & minify public catalog styles

All output goes in the "dist" directory unless otherwise noted.

The tasks above let me write many, small snippets of code which accomplish one thing and then combine them all together into a single optimized file.

## License

[ECL-2.0](https://opensource.org/licenses/ECL-2.0)
