# Koha Snippets

Snippets of code to be inserted into the administrative settings of Koha.

## Development

I'm using npm scripts to automate development tasks. Run `npm install` to get the necessary dependencies. Then, from inside this project, you'll have these `npm run` scripts available:

- `build` - run all the compilation scripts listed here, meta-task
- `admin-js` - minify all staff-side JavaScript
- `catalog-js` - minify all public catalog JavaScript
- `admin-scss` - compile & minify staff-side styles
- `catalog-scss` - compile & minify public catalog styles

All output goes in the "dist" directory unless otherwise noted.

These tasks let me write many small snippets of code which accomplish one thing and then combine them all together into a single optimized file.

There are also a series of meta-tasks which run a specific compile/minify task, copy the output to the Mac OS clipboard, and open the appropriate setting URL in Koha's administration module. They are `ajs`, `acss`, `cjs`, and `ccss` where the first letter stands for either "admin" or "catalog". CCA's intranet domain is hard-coded into them.

## License

[ECL-2.0](https://opensource.org/licenses/ECL-2.0)
