<p align="center">
  <a href="https://www.equinor.com">
    <img width="300" src=".github/Equinor_HORIZ_logo_RGB_RED.png">
  </a>
</p>

# Brandwalls

This is the main repository for Equinor Brandwalls. This version of the website is built using the [Sanity content platform](https://www.sanity.io/) as headless CMS and [Next.js](https://nextjs.org/) for the web frontend.

The project is licensed under the [MIT license](https://github.com/equinor/energyvision/blob/main/LICENSE) following [the open source strategy of Equinor](https://opensource.equinor.com) and integrates elements from the [Equinor Design System](https://eds.equinor.com).

This project uses [pnpm](https://pnpm.io) as main package manager. You can install pnpm using npm as shown below, or use one of the [alternative installation methods](https://pnpm.io/installation).

```bash
# Install pnpm
npm i -g pnpm

# Install all project dependencies
pnpm setup-project
```

## Project overview

This monorepo is organized into several folder. Please refer to README files inside each folder for more information.

- `studio` - [Sanity](https://www.sanity.io/) powered content platform.
- `web` - Web application using [Next.js](https://nextjs.org/) and React components.

## Package managers

This project uses the pnpm package manager. All commands should be run from root. There are filter aliases in the root `package.json` file that can be used to run commands in specific directories. For example:

```bash
# Install dependencies
pnpm web install

# Start the web in dev mode
pnpm web dev

# Add some package to the web folder
pnpm web add <some-package>

# Build Next.js
pnpm web build
```

## Contributing

If you want to report a bug, please create an issue in GitHub unless it is a security issue. If it is a security issue, please follow our Security Reporting Policy in SECURITY.md file.
