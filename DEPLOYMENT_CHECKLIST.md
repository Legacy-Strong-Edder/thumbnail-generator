# Deployment Checklist

Use this checklist for each deployment to production.

## Pre-Deployment Review

- [ ] All code changes reviewed and tested locally
- [ ] No console errors in browser DevTools (F12)
- [ ] Image preview loads correctly
- [ ] Thumbnail generation works (test with sample data)
- [ ] No hardcoded credentials in code
- [ ] .env file is in .gitignore (not committed)
- [ ] Version number updated in package.json (if major release)

## Environment Variables

- [ ] `NANO_BANANA_API_KEY` is set in Vercel
  - Location: https://vercel.com/dashboard → Project → Settings → Environment Variables
  - ⚠️ Must be UPPERCASE (not lowercase)
  
- [ ] `GOOGLE_DRIVE_FOLDER_ID` is set and correct
  - Should be: `1h781_9DkWsmnZLkpUEqOHjuNgIdA47dw`
  
- [ ] `NODE_ENV=production` (if applicable)

## Code Deployment

### Option 1: Automatic (GitHub Integration)
```bash
# 1. Commit changes
git add .
git commit -m "Your message"

# 2. Push to main
git push origin main

# 3. Verify Vercel auto-deploy
# → Check https://vercel.com/dashboard
# → Watch for "Building..." → "Ready" status (2-3 min)
```

### Option 2: Manual Redeploy (Vercel CLI)
```bash
# 1. Install Vercel CLI (if not already)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel deploy --prod
```

## Post-Deployment Verification

- [ ] Check deployment status in Vercel dashboard (green checkmark)
- [ ] Visit production URL: https://thumbnail-generator-wfdm134.vercel.app/
- [ ] Hard refresh browser (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
- [ ] Verify form loads without errors
- [ ] Select a base image → preview should load
- [ ] Test thumbnail generation with sample data
- [ ] Check Network tab (F12) for 4xx/5xx errors
- [ ] Verify all 25 images show in dropdown
- [ ] Check console for JavaScript errors (F12 → Console)

## Rollback Procedure (If Issues Detected)

```bash
# 1. Identify last working commit
git log --oneline | head

# 2. Revert to previous version
git revert HEAD --no-edit

# 3. Push to main
git push origin main

# 4. Vercel automatically redeploys with previous code
# → Monitor deployment status (2-3 min)

# 5. Verify rollback worked
# → Test app again
```

## Performance Check

- [ ] Thumbnail generation completes in 5-10 minutes
- [ ] No 404 errors for static files (/baseImages/*)
- [ ] CORS headers present on /api/image-proxy responses
- [ ] API response times < 2 seconds (excluding AI generation)

## Documentation Updates

- [ ] Update DOCUMENTATION.md if config changes
- [ ] Update version history in DOCUMENTATION.md
- [ ] Update this checklist if process changes

## Team Communication

- [ ] Notify team of deployment (Slack channel)
- [ ] Include what was deployed and why
- [ ] Link to PR or commit

## Final Sign-Off

- [ ] I have verified the deployment works correctly
- [ ] All critical features are functioning
- [ ] No errors in logs (vercel logs --tail)
- [ ] Ready for team to use

---

**Deployment Date:** ________________  
**Deployed By:** ________________  
**Status:** ✅ Complete / ⚠️ Needs Attention

**Notes:**
```
[Add any notes or issues encountered here]
```
