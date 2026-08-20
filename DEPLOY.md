# Deploying drstock.ai

The site is a single static page (`index.html`) plus `assets/`. It is served by
GitHub Pages from the `main` branch, root directory, on repo
`kfree108/drstock-site`.

Publishing a change is just: commit, push to `main`, wait ~1 minute.

---

## Current state

- GitHub Pages: **enabled and built**, `main` / root.
- Custom domain: **drstock.ai**, applied automatically from the `CNAME` file in
  this repo when Pages first built. It has deliberately **not** been re-saved
  through the API — see the warning below for why that matters.
- HTTPS certificate: **not issued yet**, and cannot be until DNS moves. This is
  expected, not a fault.
- DNS for drstock.ai: **still pointing at Squarespace.** Nothing has been changed.

### How to view the page before DNS moves

Because a custom domain is set, `https://kfree108.github.io/drstock-site/`
returns a `301` redirect to `http://drstock.ai/` — which is still Squarespace.
So there is no ordinary URL that shows the real page right now.

To confirm GitHub is genuinely serving the right content, ask GitHub's edge for
the site directly, bypassing DNS:

```sh
curl -s -H "Host: drstock.ai" http://185.199.108.153/ | grep '<title>'
```

That returned the Dr. Stock title on 20 August 2026, so the deploy itself is
good. The moment the A records below are changed, `https://drstock.ai` shows
this page with no further work in the repo.

## Why the domain still shows nothing useful

Squarespace's parked/placeholder page serves a `noindex` robots directive.
While `drstock.ai` resolves to Squarespace, Google and every AI crawler are being
told explicitly not to index the domain. That means the SEO and AI-search work in
this page earns nothing until the DNS records below are changed. The domain is
invisible, not merely wrong.

---

## The DNS records Ken needs to set

These have to be done by hand at the registrar / DNS host for `drstock.ai`,
because the change needs Ken's 2FA. Claude has not touched DNS.

**Delete** the existing Squarespace A / CNAME records for `@` and `www` first,
then add:

### Apex (`@`) — four A records

| Type | Host | Value             |
|------|------|-------------------|
| A    | @    | `185.199.108.153` |
| A    | @    | `185.199.109.153` |
| A    | @    | `185.199.110.153` |
| A    | @    | `185.199.111.153` |

(Optionally also the AAAA records `2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153` — not required.)

### www — one CNAME

| Type  | Host | Value                |
|-------|------|----------------------|
| CNAME | www  | `kfree108.github.io` |

Note the value is the **user** github.io host, with no repo path and no trailing
content — `kfree108.github.io`.

---

## ⚠️ The step that cost us a day — read before touching GitHub again

**Do not re-save the custom domain in GitHub Pages settings until DNS
propagation is confirmed across public resolvers.**

When the custom domain is saved (or re-saved) while the domain still resolves to
the old host, GitHub queues certificate issuance against that stale DNS answer.
The validation fails, and GitHub does not retry loudly — it gives up quietly and
leaves the domain stuck without HTTPS. The fix is then a manual remove-and-re-add
cycle with more waiting.

### Correct order

1. Change the DNS records at the registrar (above).
2. **Wait.** Then verify propagation from more than one public resolver:
   ```sh
   dig +short drstock.ai @8.8.8.8          # Google
   dig +short drstock.ai @1.1.1.1          # Cloudflare
   dig +short drstock.ai @9.9.9.9          # Quad9
   dig +short www.drstock.ai @8.8.8.8      # should return kfree108.github.io
   ```
   Every one of them must return the four `185.199.10x.153` addresses and
   nothing else. If any resolver still returns a Squarespace IP, wait longer.
   TTLs on the old records decide how long this takes.
3. Only once **all** resolvers agree, re-save the custom domain so GitHub
   re-runs certificate issuance:
   ```sh
   gh api -X PUT repos/kfree108/drstock-site/pages -f cname="drstock.ai"
   ```
4. Watch for the certificate to be issued:
   ```sh
   gh api repos/kfree108/drstock-site/pages \
     --jq '{status,html_url,cname,https_certificate:.https_certificate.state,enforced:.https_enforced}'
   ```
   `https_certificate.state` should move to `approved`. This can take up to
   ~15 minutes after DNS is genuinely clean.
5. When the certificate is approved, turn on Enforce HTTPS:
   ```sh
   gh api -X PUT repos/kfree108/drstock-site/pages -f https_enforced=true
   ```

If step 4 stalls for more than an hour with clean DNS, remove the custom domain,
wait a few minutes, and add it back — but only ever with DNS already correct.

---

## Useful commands

```sh
# check Pages status
gh api repos/kfree108/drstock-site/pages

# force a rebuild
gh api -X POST repos/kfree108/drstock-site/pages/builds

# see recent builds
gh api repos/kfree108/drstock-site/pages/builds --jq '.[0:3]'
```

## Before launch

- `G-DRSTOCKTBD` is a **placeholder** GA4 measurement ID. A real GA4 property
  needs creating for drstock.ai, and the id replaced in `index.html` (it appears
  in the `gtag` script tags and in `window.FC_CTA.ga4`).
- Pricing is deliberately not published — the page says the first 30 days are
  free and the plan is quoted on the demo call. If a price is set later, the
  pricing section and the two pricing FAQ answers both need updating.
