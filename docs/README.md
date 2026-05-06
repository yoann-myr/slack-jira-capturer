# Aida Docs

Mintlify-powered documentation site.

## Local preview

```bash
npm i -g mint     # requires Node.js >= 20.17.0
cd docs
mint dev
```

Open http://localhost:3000.

## Deploy

Complete onboarding at [mintlify.com/start](https://mintlify.com/start), connect your GitHub account, and install the Mintlify GitHub App on this repo (point it at the `docs/` folder). Every push to the production branch redeploys.

## Structure

```
docs/
├── docs.json              # site config + navigation
├── index.mdx              # landing page
├── quickstart.mdx
├── essentials/
│   ├── markdown.mdx
│   └── navigation.mdx
├── logo/                  # add dark.svg + light.svg
└── favicon.svg            # add your favicon
```
