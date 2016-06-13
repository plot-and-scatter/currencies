# Plot + Scatter D3 Template

A template for simple D3 projects. Includes a gulpfile to automate watching of assets and running a web server.

## Installation and use

Fork the project, then run `npm install` to install all required node packages and bower components.

To watch and copy assets and run the development server, run `gulp`.

## Cloning for your own use

To make a new project based on this repository:

```sh
# Clone the project
$ git clone https://github.com/plot-and-scatter/ps-d3-template.git my-project-name
$ cd my-project-name

# Set remotes
$ git remote set-url origin https://github.com/your-username/your-repo-name.git
$ git remote add upstream https://github.com/plot-and-scatter/ps-d3-template.git

# Verify origin points to your repository and upstream points to ps-d3-template
$ git remote -v
```

## Syncing with this project after forking

Ensure you have added the upstream remote (previous step), and then follow the instructions at [https://help.github.com/articles/syncing-a-fork/](https://help.github.com/articles/syncing-a-fork/).

In brief:

```sh
# Fetch the upstream
$ git fetch upstream

# Check out your own master branch
$ git checkout master

# Merge upstream changes
$ git merge upstream/master

```