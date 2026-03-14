# by-shai.net

Personal developer website for Shai Eliav.

## Hosting

This site is deployed via **GitHub Pages** at [by-shai.net](https://by-shai.net).

## Local Development

Simply open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

## DNS Setup (Squarespace → GitHub Pages)

1. In your Squarespace DNS panel, add these records:
   - **A** records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME** record: `www` → `<your-github-username>.github.io`
2. In GitHub repo **Settings → Pages**, set custom domain to `by-shai.net` and enable HTTPS.
