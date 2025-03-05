# Koha Snippets

Snippets of code to be inserted into the administrative settings of Koha.

## Development

`npm` scripts automate development tasks. These tasks let us write many small snippets of code which accomplish one thing & then combine them into a single optimized file. Run `npm install` to get the necessary dependencies. Then, from inside this project, these `npm run` scripts are available:

- `build` - run all the compilation scripts listed here, meta-task
- `ajs` - minify all **a**dmin (staff-side) JavaScript
- `cjs` - minify all public **c**atalog JavaScript
- `acss` - compile & minify staff-side styles
- `ccss` - compile & minify public catalog styles
- `cookiejs` - minify `CookieConsentJS` for the public catalog

Each of these tasks are compile/minify code for a specific Koha setting, copy the output to the Mac OS clipboard, and open the setting's URL in Koha's administration module. The first letter of the task stands for either "admin" or "catalog". CCA's intranet domain is hard-coded into them. All output also goes in the "dist" directory.

## MARC Frameworks

Our MARC schemas are in [a subdirectory](./marc_frameworks/) with their own readme.

## License

[ECL-2.0](https://opensource.org/licenses/ECL-2.0)
