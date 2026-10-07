# Deployment (CI/CD)

`.github/workflows/ci.yml` runs on every pull request and every push to `main`:

| Job | When | What |
| --- | --- | --- |
| `check` | every PR and push | type-check, lint, tests (in-memory MongoDB, AI mocked), build |
| `deploy` | push to `main` (a merge) or "Run workflow", **only if `check` passed** | 1. trigger Render deploy hook → 2. wait until `/api/health` on Render reports this commit → 3. build and deploy the frontend with the Vercel CLI → 4. smoke-test `PRODUCTION_URL/api/health` through the Vercel proxy |

Deploys never overlap (`concurrency: production-deploy`). A failed step stops the pipeline and the
previous release stays live on both platforms.

## One-time setup

### 1. Stop the platforms from deploying on their own

Otherwise every merge deploys twice, including commits that failed CI.

- **Render** → your service → **Settings → Build & Deploy → Auto-Deploy → Off**.
  (`render.yaml` sets `autoDeployTrigger: "off"` for services created from the Blueprint.)
- **Vercel**: nothing to do. `vercel.json` sets `git.deploymentEnabled.main = false`, so Vercel stops
  auto-deploying `main` but still builds preview deployments for pull requests.

### 2. Collect the values

| Name | Where to get it |
| --- | --- |
| `RENDER_DEPLOY_HOOK_URL` | Render → service → **Settings → Deploy Hook** (copy the URL) |
| `VERCEL_TOKEN` | https://vercel.com/account/tokens → **Create** |
| `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | Run `npx vercel link` in the project once; both IDs are in `.vercel/project.json` (`orgId`, `projectId`). Or Vercel → project → **Settings → General** |
| `RENDER_URL` | Your Render service URL, e.g. `https://skill-sphere-7dbg.onrender.com` (no trailing slash) |
| `PRODUCTION_URL` | Your public site, e.g. `https://skill-sphere-portal.vercel.app` (no trailing slash) |

### 3. Add them to GitHub

GitHub repo → **Settings → Environments → New environment** named `production`. Then, inside it:

- **Environment secrets:** `RENDER_DEPLOY_HOOK_URL`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- **Environment variables:** `RENDER_URL`, `PRODUCTION_URL`

Optional: on the same page, enable **Required reviewers** if you want to approve each production deploy,
and add a branch protection rule on `main` that requires the `check` job to pass before merging.

### 4. Platform environment variables (unchanged)

- **Render:** `DBURL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `AI_ANALYZER_*`, `TRUST_PROXY_HOPS=2`. Do **not**
  set `CLIENT_ORIGIN` when using the Vercel proxy.
- **Vercel:** leave `VITE_API_BASE_URL` unset, so the app calls `/api` on its own domain and Vercel proxies it.

## Redeploying or rolling back

- **Redeploy `main`:** GitHub → **Actions → CI/CD → Run workflow**.
- **Roll back:** revert the bad commit on `main` (a revert is a merge, so it deploys like any other), or use
  **Instant Rollback** on Vercel and **Rollback** on Render's deploy list for an immediate fix.

## Troubleshooting

- *"Missing deploy settings"*: a secret or variable from step 3 isn't set in the `production` environment.
- *"Render did not go live with <sha>"*: the Render build failed or took longer than 20 minutes. Check Render's
  deploy logs. Render reports the commit via `RENDER_GIT_COMMIT`, which `/api/health` returns.
- *Smoke test fails but Render was fine*: usually `vercel.json` still points at an old Render URL, or
  `VITE_API_BASE_URL` is set on Vercel.
