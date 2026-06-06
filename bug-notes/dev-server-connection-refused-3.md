# Dev server connection refused 3

## Bug (beginner-friendly)
When opening `http://localhost:3000/login` the browser shows "Failed to Load Page — ERR_CONNECTION_REFUSED". This means your browser cannot reach the Next dev server on port 3000.

## What was wrong (common causes)
- The Next dev server was not running.
- A different process or previous server instance was blocking port 3000.
- Firewall, VPN, or proxy settings prevented local connections.
- The app was running but the browser pointed to the wrong host or port.

## Quick commands to run (how to start and check)
1. Start the Next dev server:

```bash
npm run dev
```

2. If your app depends on a separate JSON backend, start it too:

```bash
npm run server
```

3. Confirm the dev server reports Ready in the terminal. Look for a line like:

```
Next.js ... Ready
- Local: http://localhost:3000
```

## Step-by-step checks if you see ERR_CONNECTION_REFUSED
1. Refresh the page in the browser to be sure it's not a transient issue.
2. Check the terminal where you started `npm run dev` for errors or whether it actually started.
3. From PowerShell (Windows) check whether something is listening on port 3000:

```powershell
netstat -ano | findstr :3000

# If you get a PID, inspect it:
Get-Process -Id <PID>

# If it's a stale process, kill it:
taskkill /PID <PID> /F
```

4. Try a quick reachability test from the same machine:

PowerShell:
```powershell
Invoke-WebRequest http://localhost:3000/login -UseBasicParsing
```

macOS/Linux:
```bash
curl -v http://localhost:3000/login
```

If these return HTML or a 200/3xx/4xx response, the server is reachable.

5. If the terminal shows "Ready" but the browser still fails:
- Check Windows Firewall or security software that might block local ports.
- Disable VPN or proxy temporarily and try again.
- Ensure you're using the exact URL shown in the terminal (port and host).

6. Check logs for errors when the browser requests `/login`. The Next terminal and browser DevTools Network tab are the primary places to look.

## Handling I applied (what I did to fix it)
1. Started the Next dev server and confirmed "Ready" in the terminal.
2. Verified `npm run server` is started when the route depends on `http://localhost:3001`.
3. If a stale process occupied port 3000, killed it and restarted Next.
4. After the server was ready, refreshed the browser and the page loaded.

## Future care and prevention (for beginners)
- Always run `npm run dev` before opening the app in the browser.
- If your project uses multiple services (json-server, databases), add a short README/Dev setup checklist listing required commands.
- Add a small health endpoint (e.g., `/api/health`) that returns 200 so you can quickly test server reachability.
- If you frequently hit port conflicts, consider adding a script that checks and frees the port before starting (or change the port in `package.json` temporarily).

## What to do next if still stuck
1. Copy terminal output (from `npm run dev`) and paste it in a bug note or chat.
2. Share the output of `netstat -ano | findstr :3000` and `Invoke-WebRequest http://localhost:3000/login -UseBasicParsing` so we can diagnose further.
3. I can run the checks and try restarting the server here if you want — tell me to proceed and I'll capture the terminal output for you.

## Files to check when this happens
- `package.json` scripts (confirm `dev` and `server` commands)
- `next.config.ts` (if custom port or turbopack.root is configured)
- Any recent changes to firewall or network settings

---
Add a new numbered bug note in this folder if you encounter a different failure — name it after the main symptom and increment the number.
