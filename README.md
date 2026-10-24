# acpk.in

Portfolio site for Praveenkumar Alagarsamy Chandrasekaran. It's plain HTML/CSS/JS with no build step.

## Edit
- All text is in `index.html`. To add a project, copy an `<article class="card">` block.
  `data-tags` (`ai`, `automation`, `client`) decides which filter chips show it.
- Styles are in `styles.css`. The photo is `photo.jpg`.
- Preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000

---

## Deploy: step by step

### Step 1: Create the GitHub repository
1. Sign in at https://github.com with Praveen's account.
2. Click **+** (top right) → **New repository**.
3. Fill in:
   - **Repository name:** `acpk.in`. Any name works, because the custom domain replaces the GitHub URL.
   - **Visibility:** **Public**. GitHub Pages is free only for public repos.
   - Do **not** tick "Add a README", ".gitignore" or "license", because this folder already has its files.
4. Click **Create repository**. Keep the page open, since it shows the repo URL, for example
   `https://github.com/<username>/acpk.in.git`.

### Step 2: Push this folder to GitHub
Open Terminal in this folder (`portfolio/`) and run the commands below. Replace `<username>` with Praveen's GitHub username.

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<username>/acpk.in.git
git push -u origin main
```

**Before committing, make the commits Praveen's.** Otherwise GitHub credits whoever's Mac this is. This setting only affects this repo:
```bash
git config user.name "Praveenkumar Alagarsamy Chandrasekaran"
git config user.email "azy.praveen@gmail.com"
```
(This email must be added to Praveen's GitHub account, under Settings → Emails, for the commits to link to his profile.)

**If `git push` fails with `403` / "Permission denied to <someone-else>":** the Mac is signed in to a
different GitHub account. Push with a token from Praveen's account instead, so no one else becomes a collaborator:
1. Praveen goes to GitHub → profile picture → **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token**.
   - **Repository access:** *Only select repositories* → `acpk.in`
   - **Permissions → Repository permissions → Contents:** *Read and write*
   - Generate the token, then copy it. It starts with `github_pat_`.
2. Push with the token. This doesn't change the Mac's saved GitHub login:
   ```bash
   git push https://ac-praveen:<TOKEN>@github.com/ac-praveen/acpk.in.git main
   git branch -u origin/main
   ```
3. Delete the token afterwards (same page → token → **Delete**) unless you'll push again soon.
   Don't save it in any file.

**If `git push` asks for a password:** GitHub doesn't accept the account password here. Paste the token from above instead.

**Without the terminal:** on the new empty repo page, click **"uploading an existing file"** and drag in every file
from this folder: `index.html`, `styles.css`, `main.js`, `photo.jpg`, `favicon.svg`, `CNAME`, `README.md`.
Then click **Commit changes**.

Check: reload the repo page. You should see all 7 files, including `CNAME`.

### Step 3: Turn on GitHub Pages
1. In the repo, open **Settings** (top tab) → **Pages** (left sidebar, under "Code and automation").
2. Under **Build and deployment**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main`, folder `/ (root)` → **Save**
3. Wait 1–2 minutes. The **Actions** tab shows a "pages build and deployment" run. When it has a green tick, the
   site is live at `https://<username>.github.io/acpk.in/`.

### Step 4: Add the custom domain in GitHub
1. Still in **Settings → Pages**, go to **Custom domain** and enter `acpk.in`, then click **Save**.
   This usually fills in by itself from the `CNAME` file.
2. GitHub will show "DNS check unsuccessful" until you finish Step 5. That's expected.

### Step 5: Point the domain at GitHub (GoDaddy)
1. Sign in at https://godaddy.com → **My Products** → find `acpk.in`.
2. **Turn off the current GoDaddy site.** acpk.in currently shows a GoDaddy Website Builder page.
   Go to **Websites + Marketing** → that site → **Settings** → unpublish it or disconnect the domain.
   Also check **Domain → Forwarding** and remove any forwarding.
3. Open **DNS** (on the domain: **Manage DNS**).
4. **Delete** every existing record of type **A** with name **@**.
5. **Add** four new records. For each: type `A`, name `@`, TTL `1 hour`:
   | Type | Name | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
6. Find the **CNAME** record named **www**. Edit it, or add it if it doesn't exist, so its value is
   `<username>.github.io` (Praveen's username, without the repo name).
7. Save.

### Step 6: Wait for DNS, then enable HTTPS
1. DNS changes take anywhere from a few minutes to a few hours.
   To check, run `dig +short acpk.in` in Terminal. It should list the four `185.199.x.153` IPs.
2. Go back to **Settings → Pages** in GitHub. When it says **"DNS check successful"**, tick **Enforce HTTPS**.
   If the box is greyed out, GitHub is still issuing the certificate. Wait up to about an hour and refresh.
3. Open https://acpk.in and https://www.acpk.in. Both should show the site with a padlock.

### Step 7 (optional): Verify the domain with GitHub
This stops anyone else's GitHub repo from claiming `acpk.in`.
1. GitHub → profile picture → **Settings → Pages** (the account settings, not the repo) → **Add a domain** → `acpk.in`.
2. GitHub shows a **TXT** record. Add it in GoDaddy DNS exactly as shown, then click **Verify**.

---

## Updating the site later
Edit the files, then:
```bash
git add .
git commit -m "Update portfolio"
git push
```
The live site updates within about 1–2 minutes. Or edit a file directly on github.com (pencil icon → **Commit changes**).

## Troubleshooting
- **404 at acpk.in:** check that `CNAME` is in the repo and that Settings → Pages → Custom domain still says `acpk.in`.
- **Still shows the old GoDaddy page:** the Website Builder site or the old A records are still active. Redo Step 5, steps 2–4.
- **"Domain is improperly configured":** the DNS hasn't spread yet, or an old A record is left over. Run `dig +short acpk.in`.
- **Photo or styles missing:** filenames are case-sensitive on GitHub. They must match exactly (`photo.jpg`, `styles.css`).
