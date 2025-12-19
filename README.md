# Blog Site

This repository contains a Jekyll blog configured with the Minimal Mistakes theme.

## Pushing this site to GitHub for the first time

Follow these steps to put this code on GitHub using the command line:

1. **Create a repository on GitHub**
   - Sign in to GitHub and click **New** to create a repository.
   - Choose a name (for example, `blog`), keep it **Public** or **Private** as you prefer, and leave it empty (no README or `.gitignore`).

2. **Check the current branch locally**
   - Ensure you are on the branch you want to push (this project currently uses the `work` branch):
     ```bash
     git status -sb
     ```

3. **Add GitHub as a remote**
   - Replace `<YOUR-USERNAME>` and `<REPO>` with your GitHub username and repository name:
     ```bash
     git remote add origin https://github.com/<YOUR-USERNAME>/<REPO>.git
     ```
   - If a remote named `origin` already exists, update it instead:
     ```bash
     git remote set-url origin https://github.com/<YOUR-USERNAME>/<REPO>.git
     ```

4. **Push the existing branch**
   - Push the branch to GitHub and set it to track the remote branch:
     ```bash
     git push -u origin work
     ```

5. **Verify on GitHub**
   - After the push finishes, refresh your GitHub repository page to see the files online.

### Optional: create a GitHub Pages site

If you want to host the blog with GitHub Pages:
1. Open the repository **Settings → Pages**.
2. Choose **Deploy from a branch** and select the `work` branch and `/ (root)` folder.
3. Save; GitHub will build and publish the site at the provided URL once it finishes.

### Common fixes
- If you see `Authentication failed`, ensure you are signed in with a PAT (personal access token) that has `repo` permissions and use it in place of your password.
- If `git push` warns about diverged branches, run `git pull --rebase origin work` to synchronize before pushing again.
