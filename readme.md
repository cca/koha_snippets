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

## Default MARC Bibliographic Framework

Our default [MARC bibliographic framework](https://library-staff.cca.edu/cgi-bin/koha/admin/biblio_framework.pl), which is a sort of schema for the basic cataloging editor, is included here as "export_default.csv". Koha recommends you not edit this framework, but create a copy of it to use as your mutable default, but we did not heed that advice and our framework has long since diverged from the builtin one. If we break the framework and need to revert to a prior version, now we have one here. When we make changes, we should backup the framework.

## License

[ECL-2.0](https://opensource.org/licenses/ECL-2.0)
