# MARC Bibliographic Frameworks

This directory contains CSV exports of our [MARC bibliographic frameworks](https://library-staff.cca.edu/cgi-bin/koha/admin/biblio_framework.pl). They are schemas for the basic cataloging editor that define which MARC fields and subfields appear as well as various settings about these fields. Generally, one can use the "advanced" cataloging editor (which is raw MARC in a human-readable format) to circumvent the schema if need be (e.g., to add a field that does not exist in the schema). Each record uses exactly one schema.

See [Koha's documentation](https://koha-community.org/manual/24.11/en/html/administration.html#marc-bibliographic-frameworks) for further details. There is also [a wiki page](https://wiki.koha-community.org/wiki/MARC_frameworks) of schemas available for download but it's unclear how well-maintained they are.

We typically use only the Default and Matlib schemas.

Koha recommends one not edit the default framework, but create a copy of it to use as a mutable default, but we did not heed that advice and our framework has long since diverged from the original. If we break the framework and need to revert to a prior version, now we have one here. When we make changes, we record them here.

## Controlled Vocabularies

Note that schemas can connect subfields to authorized value categories which function as a controlled vocabulary. For instance, we use an `RDA_CONTENT` AV category as the source for `336$a` [Content type term](https://www.loc.gov/marc/bibliographic/bd336.html) subfield values. I'm not sure what happens if you try to import a framework into a Koha instance which does not have the corresponding AV categories. Consider creating empty categories before importing a framework or deleting values from the `authorised_value` column of the CSV.
