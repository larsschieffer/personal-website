---
title: My Current Development Setup
published: 2023-06-01
summary:
  How do I write code? A short overview about my current development setup.
thumbnail: /blog/thumbnails/code.webp
---

Every software developer has its set of routines how to work best. In the
following sections, I want to describe to you my current setup and which
software/programs I need to write web application. Perhaps you can find
something useful to improve your setup. If you have better solutions to the
described challenges, I’m excited to hear about it.

## Hardware

During my years at university, I fell in love with
[Arch Linux](https://archlinux.org/) and the [i3](https://i3wm.org/) window
manager. Every program had its shortcuts and virtual desktop. After graduating,
I realized that, at least in Germany, Microsoft’s office products are a hard
requirement for many employers, so that I couldn’t use my favourite distro any
more, due to the lack of support for the required software. After more than a
year of fighting with Windows, I bought myself a 14” MacBook Pro with an Apple
M1 Pro chip and 32 GB memory. It’s the solution for having a Unix based
operating system and using Microsoft’s office products, which I need for work.

## Code Editor

As a full-stack developer, I tried different code editors from
[IntelliJ](https://www.jetbrains.com/idea/) Ultimate for Java Backend,
[DataGrip](https://www.jetbrains.com/datagrip/) for SQL databases, to
[WebStorm](https://www.jetbrains.com/webstorm/) for large enterprise Angular
Applications, but eventually, I chose
[Visual Studio Code](https://code.visualstudio.com/) for all my work due to the
fact of its large catalogue of wonderful extensions. Every frontend application
uses different frameworks, code styles and software solutions (e.g. E2E testing:
Playwright/Cypress…). Therefore, it made sense for me to use the editor with the
highest amount of flexibility to adjust to different projects. Besides the
general extensions of Visual Studio Code’s Language Server to get the support
for Angular, React, Svelte, Prettier or ESLint, I want to highlight the
following as valuable companions:

- **[Console Ninja](https://github.com/wallabyjs/console-ninja)**

  If you often jump between your source code and the console of your browser,
  then Console Ninja is the extension you have to install. In short, it brings
  the console log directly into your source code. I caught myself multiple times
  seeing some error (displayed by Console Ninja) in my source code, which I
  would have missed because I didn’t open the Browser’s console.
  ![Console Ninja](/blog/development-setup/console-ninja.webp)

- **[Pretty TypeScript Errors](https://github.com/yoavbls/pretty-ts-errors)**

  Imagine you are writing a complex RxJS chain of operators and suddenly
  Typescript points to you a type mismatch. But it is not your usual “number
  cannot be a string” error, but a large undecipherable message. For example,
  see the following two images from the same code location.
  ![Pretty TypeScript is disabled](/blog/development-setup/pretty-typescript-disabled.webp)
  ![Pretty TypeScript is enabled](/blog/development-setup/pretty-typescript-enabled.webp)

- **[Turbo Console Log](https://github.com/Chakroun-Anas/turbo-console-log)**

  If you quickly want to observe some values in your code, it is much easier to
  write a short `console.log` to print the desired value, instead of opening the
  debugger tab in your browser. But sadly, your logs often times only contain
  the attribute itself, or only a quick word to find the right log in your
  console. Turbo Console is adding a shortcut to create a console log for a
  specific attribute with a nicely formatted message, so that you can easily
  find it or filter for it in your browsers console. The following code snippet
  shows the outcome for the parameter “name”.

  ```ts
  function buildGreeting(name: string): string {
    console.log("TURBO ~ file: example.ts:2 ~ buildGreeting ~ name:", name);
    return `Hi ${name}`;
  }
  ```

### Vim

I keep it short. I used Vim as my editor of choice at university, and I like the
approach of the various keyboard modes. Therefore, I use in all of my editors
and IDE’s extensions
([extension](https://github.com/vscode-neovim/vscode-neovim) for Visual Studio
Code) to have an emulated Vi experience. If you are eager to learn how to use
this kind of layout, I highly recommend this
[VIM Fundamentals](https://frontendmasters.com/courses/vim-fundamentals/)
course.

### MonoLisa

Since I’m staring more than 8h a day at my computer monitor, I often asked
myself which font I should use. After some reading, I tried the
[MonoLisa](https://www.monolisa.dev/) font and I really liked it. I didn’t
experience less fatigue, but I appreciate to have a font for my editor, which I
didn’t find everywhere around the World Wide Web.

## Git

From the beginning of my software developing journey, I used Git. Handing in
some assignments for university courses or working on large code bases with
multiple team members at my current job, Git is everywhere. At the start, I used
the terminal, since I only had to do some simple commit, push and pull
operations. After some painful situations to squash multiple commits and merge
conflicts, I went to a graphical solution. If you are using a JetBrains product
like e.g. IntelliJ, the provided Git client will solve your problems with charm.
In my current setup with Visual Studio Code, I’m using
[GitKraken](https://www.gitkraken.com/) with the Pro plan. I had a steep
learning curve to use GitKraken, but in the end I really like the graphical
reprensentation of the active branches, if many developers are working in the
same repository.

## Shell

I don’t have a strong opinion on shells (except not to use Microsoft’s
PowerShell 😉). I’m currently using macOS’ default z-shell with
[ohh-my-zsh](https://github.com/ohmyzsh/ohmyzsh),
[powerlevel10k](https://github.com/romkatv/powerlevel10k) as theme and
[Alacritty](https://github.com/alacritty/alacritty) as my terminal emulator.

## Database Server

For local development, I always have one
[PostgreSQL](https://hub.docker.com/_/postgres/) and one
[DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
database running. They spin up after I log into my user account. Both are
running as docker containers with persistent volumes. This makes it
straightforward to maintain their versioning without installing them directly to
my system. Furthermore, I know that I always have a database server ready when I
need it.
