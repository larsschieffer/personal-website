---
title: "A Smarter Way To Handle Multi-Project Workflows"
published: "2024-09-08"
summary:
  "Minimize window clutter and boost productivity by organizing your development
  into distinct tmux sessions with a simple, elegant solution."
thumbnail: /blog/thumbnails/tmux-session-per-project.webp
---

Since my last [update]({{< ref "development-setup.md" >}}), I’ve increasingly
used my terminal for development. I’ve fully switched to
[Neovim](https://neovim.io/) alongside [tmux](https://github.com/tmux/tmux),
with the help of the following resources:

- [VIM Fundamentals](https://frontendmasters.com/courses/vim-fundamentals/)
- [PDE: A different take on editing code](https://www.youtube.com/watch?v=QMVIJhC9Veg)
- [How I Setup Neovim On My Mac To Make it AMAZING in 2024](https://www.josean.com/posts/how-to-setup-neovim-2024)
- [LazyVim](http://www.lazyvim.org/)

I’m very happy with my _Personalized Development Environment_, but something’s
bugging me in my setup. Working on larger codebases with multiple projects, dev
servers, database connections, etc., it quickly becomes overwhelming to manage
many windows with too much movement on screen. Something feels off.

Here’s what I’ve been doing with tmux so far: I start a tmux session, navigate
to the project I’m working on, open Neovim, and start coding. When I need to
start a development server, I open a new tmux window, so I can switch between
them easily. You see where this is going? Imagine working on a full-stack
feature that requires changes across multiple projects. Suddenly, I’ve got many
windows open, without knowing which one belongs to which project. I often find
myself cycling through windows to find the right one. This needs to change.

## The Better Approach

I need a more efficient system to manage my daily development tasks. It became
obvious that the windows I open are grouped around dependent projects, without
really interfere with each other. Typically, I have one Neovim instance for the
source code and several helper scripts for running various tasks open. The
solution is quite clear: I need more tmux sessions, one for each project. I’d
already been using tmux, but I hadn’t realized the value of running multiple
sessions. Now, it fits perfectly with my workflow.

## The Implementation

Using ideas from the sources mentioned earlier and the goals in mind, I wrote
the following script to solve my lagging developer experience. It requires three
additional dependencies to work properly:

- [tmux](https://github.com/tmux/tmux)
- [fzf](https://github.com/junegunn/fzf)
- [fd](https://github.com/sharkdp/fd)

Let’s walk through the script step by step together, or you can directly skip to
the [full script](#the-whole-script).

### The Project Selection

```sh
#!/bin/bash

# Define the base location
LOCATION=~/Projects/

# Search for directories in the base location, excluding certain directorys
FUZZY_SELECTION=$(fd . "$LOCATION" --type directory --max-depth 1 | cut -d '/' -f5- | fzf --print-query)
```

All my development projects are located in **~/Projects/**, so it makes sense to
limit the selection to this directory. This also allows shortening the visible
labels later. The selection process combines the `fd` command with `fzf`.
Instead of feeding the results directly into `fzf` to choose a project, the
`cut` utility trims the path, from _/Users/lars/Projects/personal-website_ to
_personal-website_. The shortened paths are then passed into `fzf`. The
`--print-query` option enables a special feature later. Now, the
`FUZZY_SELECTION` variable holds both the query inputted into `fzf` and the
selected project, like this:

```sh
$ echo $FUZZY_SELECTION
personal
personal-website/
```

### Getting the Session Metadata

```sh
# Set the field separator to newline
IFS=$'\n'

# Read the query and selected directory from the fzf output
{ read -r QUERY; read -r SELECTED_DIRECTORY; } <<< "$FUZZY_SELECTION"

# Determine the selected directory, fallback to the query if not selected
SELECTED_DIRECTORY="${SELECTED_DIRECTORY:-$QUERY}"

# Set session directory and name
SESSION_DIRECTORY="$LOCATION$SELECTED_DIRECTORY"
SESSION_NAME=$(basename "$SESSION_DIRECTORY")

# Create directory if it doesn't exist
mkdir -p $SESSION_DIRECTORY
```

Next, two parts of information are required from the selected project: the
absolute path, saved in `SESSION_DIRECTORY` and the session name as
`SESSION_NAME`. The name of the project helps keep track of which project is
open as tmux session. If an existing project is selected (like in the example
above), both the query and selected directory exist, so the script uses the
existing one. However, if a new project name is typed, you couldn't select it in
fzf and therefor the query input is used to create the directory. This feature
allows using the script for new projects, too.

### Creating the TMUX Session

```sh
# Check if the tmux session exists, and create it if not
if ! tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
  tmux new-session -s "$SESSION_NAME" -c "$SESSION_DIRECTORY" -d
fi

# Switch to the tmux session
if [ "$TERM" = "tmux-256color" ] && [ -n "$TMUX" ]; then
  tmux switch-client -t "$SESSION_NAME"
else
  tmux attach -t "$SESSION_NAME"
fi
```

At this point, the project directory and the corresponding session name are set.
The script checks if tmux already has a session with that name; if not, one is
created using the absolute path and session name. Creating a new session in
detached mode allows the rest of the script to be the same for both new and
existing sessions. This process allows only one running session per project
created by this script.

Then, it's determined whether the script is called inside a tmux session or a
normal shell environment. While there wasn’t an official solution, checking the
value of the _TERM_ variable works reliably enough. If you are already in a tmux
session, the script switches to the other one; otherwise, you attach directly to
it.

### The Whole Script

```sh
#!/bin/bash

# Define the base location
LOCATION=~/Projects/

# Search for directories in the base location, excluding certain directorys
FUZZY_SELECTION=$(fd . "$LOCATION" --type directory --max-depth 1 | cut -d '/' -f5- | fzf --print-query)

# Set the field separator to newline
IFS=$'\n'

# Read the query and selected directory from the fzf output
{ read -r QUERY; read -r SELECTED_DIRECTORY; } <<< "$FUZZY_SELECTION"

# Determine the selected directory, fallback to the query if not selected
SELECTED_DIRECTORY="${SELECTED_DIRECTORY:-$QUERY}"

# Set session directory and name
SESSION_DIRECTORY="$LOCATION$SELECTED_DIRECTORY"
SESSION_NAME=$(basename "$SESSION_DIRECTORY")

# Create directory if it doesn't exist
mkdir -p $SESSION_DIRECTORY

# Check if the tmux session exists, and create it if not
if ! tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
  tmux new-session -s "$SESSION_NAME" -c "$SESSION_DIRECTORY" -d
fi

# Switch to the tmux session
if [ "$TERM" = "tmux-256color" ] && [ -n "$TMUX" ]; then
  tmux switch-client -t "$SESSION_NAME"
else
  tmux attach -t "$SESSION_NAME"
fi
```

## Visualization

Let’s see how switching between projects looks like. You can easily add the
script to your shell environment. For example for z-shell you can use the
following:

```
# New session
bindkey -s <YOUR_KEYBINDING> "<PATH_TO_SCRIPT>\n"
```

![Visualization](/blog/tmux-session-per-project/visualization.gif)

In this example, I switch from the _tmux-config_ to the _personal-website_
project and back. The best part? It scales effortlessly to multiple projects
without adding complexity. Add the script to your shell environment and give it
a try.
