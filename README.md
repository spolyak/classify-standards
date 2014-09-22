classify-standards
==================

Given a set of standards, fetch alchemy api concepts for each standards statement.
Get a set of math concepts from the mathwords website.
Filter the alchemy api concepts as to only those having tems in the mathwords lexicon.
Run stats on which concepts passed the filter and which didn't.

* act-math-alchemyapi.js, discover the concepts for standards using alchemy
* get-math-words.js, scrapes the website to make a source JSON file
* get-unique-math-tokes.js, convert the mathwords concept list to single math token list
* filter-alchemyapi-tokens.js, get lists and stats on concepts that pass/fail the filter of math words
