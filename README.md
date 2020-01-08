## The near by shops repository
A full stack javascript project to lists shops nearby a given user.

# Description

This repository was created for the main purpose of answering a Coding Challenge, feel free to <a href="https://github.com/hiddenfounders/web-coding-challenge/blob/master/coding-challenge.md" target="_blank">click here</a>.

As a resume of what this challenge is, the challenger has to develop a full stack javascript project that would answer to the following functionalities:

A can user sign up and sign in using my email & password, he can display a list of shops near by his location (sorted by distance), he has the posibility to like displayed shops so that they could be added to the list of his preferred shops(those shops shouldn’t be displayed in the near by list).

The following functionalities are a bonus (optional):
The use can now dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2 hours, and he can alsow display the list of preferred shops (the shops he liked), and remove them any time he wants from the list of preferred shops.

## Requirements

* Node js v12.14.0
* Git
* Mysql


## Common setups

Clone the repo and install the dependencies.

```bash
git clone https://github.com/YassineElHosni/shops-near-by.git
cd shops-near-by
```

```bash
npm install
```

Create a new database with the name 'db_shops' & Importe the following SQL code

```bash
https://github.com/YassineElHosni/shops-near-by/blob/master/data-base-script.sql
```