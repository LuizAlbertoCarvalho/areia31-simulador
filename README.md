
# Areia31 - Simulador de Times de Vôlei

Um aplicativo para sortear times de vôlei com base em jogadores, líderes, mulheres e líberos, distribuindo-os de forma equilibrada.

## Development

1.  Clone the repository or download the files.
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The app will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Building for Production

```bash
npm run build
# or
yarn build
```
This will create a `dist` folder with the production-ready files.

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

1.  **Install `gh-pages` (if not already done by `npm install`):**
    If you haven't run `npm install` after updating `package.json`, you might need to install `gh-pages` manually:
    ```bash
    npm install --save-dev gh-pages
    # or
    yarn add --dev gh-pages
    ```

2.  **Create a GitHub Repository:**
    *   If you haven't already, create a new public repository on GitHub. For example, name it `areia-31-simulador`.
    *   **Important:** The `base` path in `vite.config.js` is set to `/areia-31-simulador/`. If your repository name is different, you **MUST** update this `base` path in `vite.config.js` to match `/your-repo-name/`.

3.  **Initialize Git and Push your code to GitHub:**
    If your project is not already a Git repository:
    ```bash
    git init
    git branch -M main # Or master, depending on your default
    git add .
    git commit -m "Initial setup for GitHub Pages deployment"
    # Replace YOUR_USERNAME and YOUR_REPOSITORY_NAME with your actual details
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    git push -u origin main
    ```
    If it's already a Git repository, just add, commit, and push the changes:
    ```bash
    git add .
    git commit -m "Configure for GitHub Pages deployment"
    git push
    ```

4.  **Run the deploy script:**
    ```bash
    npm run deploy
    # or
    yarn deploy
    ```
    This script will:
    *   Build the project (running `npm run build`).
    *   Push the contents of the `dist` folder to a special branch named `gh-pages` in your GitHub repository.

5.  **Configure GitHub Pages in Repository Settings:**
    *   Go to your repository on GitHub.
    *   Click on "Settings".
    *   Navigate to the "Pages" section in the left sidebar (under "Code and automation").
    *   Under "Build and deployment", for "Source", select "Deploy from a branch".
    *   Under "Branch":
        *   Select `gh-pages` as the branch.
        *   Select `/ (root)` as the folder.
    *   Click "Save".

6.  **Access your site:**
    *   GitHub will build and deploy your site. This might take a few minutes. You can monitor the progress in the "Actions" tab of your repository if a GitHub Action is triggered, or simply wait for the Pages settings to show the live URL.
    *   Once deployed, your site will be available at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`.
        (e.g., `https://yourusername.github.io/areia-31-simulador/` if your username is `yourusername` and repo name is `areia-31-simulador`)

## Mobile Access
Once deployed to GitHub Pages, you can access the application on your mobile phone by navigating to the GitHub Pages URL (e.g., `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`) in your mobile browser. The application uses Tailwind CSS and should be responsive.

Ensure your mobile device has an internet connection to access the deployed site.
