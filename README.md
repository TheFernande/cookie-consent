
# Live site url

[Live demo](https://cookie-consent-ashen.vercel.app/)

## Step by step guide for creating a new project based on this one

### Local setup

- Duplicate this `starter` directory and rename it to your `<project_name>`
- Update the `name` field in the `package.json` file to your `<project_name>`
- Update the `description` field in the `package.json` file to your `<project_description>`
- Update `Title` and `Description` metadata in `app/layout.tsx`

### Git setup

- Check if the current repository is pointing to a remote repository

```bash
git remote -v
```

- Remove the `git remote` pointing to this repository

```bash
git remote remove origin
```

- Create a new repository in your GitHub account `https://github.com/TheFernande?tab=repositories`
- Add the new repository as the `origin` remote `https://github.com/TheFernande/<your_repository_name>.git`

```bash
git remote add origin <your_repository_url>
```

### Development

- Install the dependencies

```bash
yarn
```

- Start the development server

```bash
yarn run dev
```

### Publish

- Build the project -> Always test the build before publishing 🤓

```bash
yarn run build
```

- Publish the project either with the following commands or with VsCode's GUI

```bash
git add .
git commit -m "<commit_message>"
git push --set-upstream origin main
```

- Explanation of the `git push --set-upstream origin main` command

- `git push` -> Push the changes to the remote repository
- `--set-upstream` -> Create a new branch in the remote repository with the same name as the current branch
- `origin` -> The remote repository
- `main` -> The current branch

## Useful commands

- Reload VsCode window

```bash
Cmd + Shift + P -> Reload Window
```
