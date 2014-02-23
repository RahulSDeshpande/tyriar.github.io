---
layout      : post
title       : A gentle introduction to Git
tags        : [Git, GitHub]
staging     : 1
isfeatured  : 1
preview     : /images/2014/02/24/git-logo.png
socialimage : /images/2014/02/24/git-tree.png
primarytag  : GitHub
intro       : Git is a source control (or version control) system designed and developed by Linus Torvalds back in 2005 for the development of the Linux kernal. Similar to other source control systems like <abbr title="Team Foundation Server">TFS</abbr> or Subversion, it manages your source code and allows a team to work on the same project without much trouble.
---

{% include post-image.html class="right-col" alt="Git logo" src="/images/2014/02/24/git-logo.png" %}

Over the last few years Git has seen incredible growth making it one of the widest-adopted source control systems in the world. According to an [Eclipse Foundation survey][1] conducted in May 2013, Git has risen from 6.8% usage in 2010 to a massive 30.3% in 2013.

<div class="clear"><!----></div>



## Cloning and merging

Git was designed for open source software and that shines through in its workflow. Say you wanted to submit a patch to John's repository, the first thing you would do is *clone* the repository (also called *fork*). This will give you your own identical version of the repository that you can work on and *commit* your changes to. Once the work is complete you will ask John to *merge* your commits into his repository.



## Distributed version control

What sets Git apart from regular source control systems is that it's *distributed*. I've found the best way to explain this is to compare it to a regular one. In <abbr title="Team Foundation Server">TFS</abbr> for example, you have a single centralised repository on some server that everyone commits to. The first commit is commit #1, the second is commit #2, and so on. With Git the commit names are actually hashes that looks like f52435ce2ffeb7d6b8f1573ca8a6bba9d0697520.

{% include post-image.html class="right-col" alt="TFS revisions vs Git commits" src="/images/2014/02/24/number-vs-hash.svg" %}

Since there is only a single repository in <abbr title="Team Foundation Server">TFS</abbr> everyone commits to the repository and if necessary, will sync from the server to resolve any conflicts before committing.

{% include post-image.html class="full-width stretch" alt="An example of a TFS tree" caption="A TFS tree" src="/images/2014/02/24/tfs-tree.svg" %}

With Git, the idea of numbered commits doesn't make as much sense as there could be hundreds of different versions of the same repository all being pulled from and merged into each other.

{% include post-image.html class="full-width stretch" alt="An example of a Git tree" caption="A Git tree" src="/images/2014/02/24/git-tree.svg" %}

This is what is happening in the above image:

- Jessica clones *Daniel's* repository, commits a change and pushes it back to Daniel's repository.
- Nathan clones *Daniel's* repository, commits some changes and pushes them to Daniel's repository.
- Sam clones *Nathan's* repository and later merges from Nathan's repository to bring the commits made by Nathan to Sam's repository.
- John clones *Nathan's* repository, makes a commit and pushes it back to Nathan's repository.
- Daniel makes the initial repository, accepts some merges and commits at the end.



## Multiple repositories

As time passes by, the original repository may not end up being the primary repository. For example, say Frank wants to modify John's project to suit his needs, but John doesn't want to bring the changes into his repository. Provided John's license allows, Frank could clone John's repository and continue working on it as a completely separate project.

{% include post-image.html class="full-width stretch" alt="A forked project" src="/images/2014/02/24/forked-project.svg" %}



## Branching

A repository can contain many *branches*, the first of which is the *master* branch which is typically where the first commit of the project would be. A branch is basically another copy of the repository within the repository itself. This allows a developer to work on a large feature on the branch `find-command` which can be paused at any time by returning to the `master` branch.

{% include post-image.html class="full-width stretch" alt="A forked project" src="/images/2014/02/24/branches.svg" %}

Typically all development should be done on a *branch*, ideally having a separate branch each new feature. This gives the developer a very clean and manageable workspace. The concept of a branch is not Git-specific, but the idea that all development should be done on a branch is arguably more prevalent on Git due to how simple they are to manage.



## Staging

Before files are commited they need to be first staged for commit. Once files are staged, the files can then be committed to the local repository.



## Commands

Here are a few must know commands to get you started.

| Command                                                           | Description
|-------------------------------------------------------------------|------------
| <kbd><code>git init</code></kbd>                                  | Creates an empty git repository
| <kbd><code>git clone &lt;repository&gt;</code></kbd>              | Clones a repository
| <kbd><code>git pull &lt;repository&gt;</code></kbd>               | Pulls changes from a repository
| <kbd><code>git status</code></kbd>                                | Show any modified, added or removed files since the last commit
| <kbd><code>git diff</code></kbd>                                  | Shows the file changes between the staged files and unstaged files
| <kbd><code>git diff --cached</code></kbd>                         | Shows the file changes between the the last commit and the staged files
| <kbd><code>git add &lt;file1&gt; [&lt;file2&gt; ...]</code></kbd> | Stage one or more files for commit
| <kbd><code>git add -A</code></kbd>                                | Stage all changes in the repository
| <kbd><code>git commit -m &lt;message&gt;</code></kbd>             | Commits the staged files with a message
| <kbd><code>git push</code></kbd>                                  | Push commits to a remove repository
| <kbd><code>git log</code></kbd>                                   | Show a list of commits made to the repository
| <kbd><code>git help</code></kbd>                                  | Shows a list of Git commands
| <kbd><code>git help &lt;command&gt;</code></kbd>                  | Print help on <kbd><code>&lt;command&gt;</code></kbd> 



## Do I really need to use a command line?

No you don't, there are a [range of GUIs available][2] on the official Git site. I actually recommend you start somewhere like GitHub and use a graphical client first to get yourself familiar with all the lingo. Once you're a little more confident have a shot at using the command line if you want more control and a deeper understanding of the system.



## Useful links

- [Official Git website][3]
- [GitHub][5]
- [Try GitHub tutorial by CodeSchool][4]



[1]: http://www.slideshare.net/IanSkerrett/eclipse-survey-2013-report-final
[2]: http://git-scm.com/downloads/guis
[3]: http://git-scm.com/
[4]: http://try.github.com
[5]: https://github.com/