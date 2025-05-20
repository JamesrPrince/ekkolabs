# Troubleshooting Guide for Portfolio Site

## Common Loading Issues

### Site Not Loading at All

1. **Check your browser console for errors**

   - Press F12 or right-click and select "Inspect" > Console tab
   - Look for any red error messages that might indicate the issue

2. **Refresh with cache clearing**

   - Press Ctrl+F5 or Cmd+Shift+R to force a full refresh

3. **Try a different browser**
   - Issues might be browser-specific

### Pages Not Loading Correctly

1. **Verify the URL is correct**

   - Make sure you're using the correct URL structure (/about, /projects, /blog)

2. **Check for 404 errors**

   - If you're getting a 404 page, the route might not be configured correctly

3. **Ensure JavaScript is enabled**
   - The site requires JavaScript to function

## Deployment Issues

### Vercel Deployment Failures

1. **Check build logs in Vercel dashboard**

   - Look for specific error messages during the build process

2. **Verify environment variables**

   - Make sure all required environment variables are set in Vercel

3. **Test with a local build**
   - Run `npm run build` locally to see if the issue occurs on your machine

### Performance Issues

1. **Check network speed**

   - Large assets might take time to load on slow connections

2. **Optimize images**

   - Compress images to improve load time

3. **Check for blocking scripts**
   - Identify if any third-party scripts are blocking rendering

## How to Deploy Updated Code

1. **Verify changes locally**

   ```bash
   npm run dev
   ```

2. **Build the project locally**

   ```bash
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   ./deploy-vercel.sh
   ```

## Quick Fixes for Common Problems

### White Screen on Load

- This usually indicates a JavaScript error. Check the console for details.
- Try clearing your browser cache and cookies.
- Fallback.html should load if there's a problem with the main application.

### Missing Styles

- If the site loads without styles, check if the CSS bundling process is working.
- Verify that your CSS framework (Tailwind) is properly configured.

### Links Not Working

- Ensure that the wouter routing is properly set up.
- Check that the vercel.json file has the correct rewrites configuration.
