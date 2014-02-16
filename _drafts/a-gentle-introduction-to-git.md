<div class="post-image right-aligned">
    ![Git logo]
</div>

## What is Git

Git is a source control (or version control) system designed and developed by Linus Torvalds back in 2005 for the development of the Linux kernal. Much like other source control systems like Team Foundation Server or Subversion it manages your source code and allows a team to work on the same project without much trouble.

Over the last few years Git has seen incredible growth making it one of the most widest-adopted source control systems. According to an [Eclipse Foundation survey conducted in May 2013][1], Git has risen from 6.8% usage in 2010 to a massive 30.3% in 2013.

## Cloning and merging

Git was designed for open source software and that comes through with the workflow it uses. Say you wanted to submit a patch to John's repository, the first thing you would do is *clone* the repository (also called *fork*), this will give you your own identical version of the repository that you can work on and *commit* your changes to. Once the work is complete you will ask John to *merge* your commits in to his repository (also called a *pull request*).

## Distributed version control

What sets Git apart from regular source control systems is that it's *distributed*. I've found the best way to explain this is to compare it to a regular one. In Team Foundation Server (TFS) for example, you have a single centralised repository on some server that everyone commits to. The first commit is commit #1, the second is commit #2, and so on. With Git the commit names are actually hashes that looks like f52435ce2ffeb7d6b8f1573ca8a6bba9d0697520.

<div class="post-image center-aligned">
	![Number vs hash]
</div>

Since there is only a single repository in TFS everyone commits to the repository and if necessary, will sync from the server to resolve any conflicts.

<div class="post-image center-aligned">
	![TFS tree]
</div>

With Git, instead of pointing to a single repository on some server you will  on The idea of numbered commits doesn't make as much sense when there could be hundreds of different versions of the same repository all being pulled from and merged in to each other. This idea is better explained with a picture.

<div class="post-image center-aligned">
	![Git tree]
</div>

This is what is happening in the above image:

- Jessica clones *Daniel's* repository, commits a change and pushes it back to Daniel's repository.
- Nathan clones *Daniel's* repository, commits some changes and pushes them to Daniel's repository.
- Sam clones *Nathan's* repository and later pulls from Nathan's repository to bring the commits made by Nathan to Sam's repository.
- John clones *Nathan's* repository, makes a commit and pushes it back to Nathan's repository.
- Daniel makes the initial repository, accepts some pulls and commits at the end.

## Multiple repositories

As time passes by, the original repository may not end up being the primary repository. For example, say Frank wants to modify John's project to suit his needs, but John doesn't want them in his repository. Provided John's license allows, Frank could clone John's repository and continue working on it as a completely separate project.

## Branching

A repository can contain many *branches*, the first of which is the *master* branch which is typically where the first commit of the project would be. A branch is basically a clone of the code. ******************************************************* Unfinished

Typically all development should be done on a *branch*, ideally a separate branch each new feature. The concept of a branch is not Git-specific, but the idea that all development should be done on a branch is arguably more prevalent due to how simple they are to manage.

## Commands

Here are a few must know commands to get you started.

```

```

## Do I really need to use a command line?

No you don't, there are a [range of GUIs available][2] via the official Git site. I actually recommend you start somewhere like GitHub and use their graphical clients first to get you familiar with all the lingo, and then have a shot at using the command line if you want more control and a deeper understanding of the system.

## Useful links

- [Official Git website][3]
- [Try GitHub tutorial by CodeSchool][4]

[1]: http://www.slideshare.net/IanSkerrett/eclipse-survey-2013-report-final
[2]: http://git-scm.com/downloads/guis
[3]: http://git-scm.com/
[4]: http://try.github.com

[Git logo]: http://2.bp.blogspot.com/-hxMTuT0XjN4/UlDUW8E65fI/AAAAAAAAW2o/1GrwhfLZBfQ/s1600/git-logo.png
[Git tree]: http://4.bp.blogspot.com/--47ZHZEarjI/UlDSKZwZVcI/AAAAAAAAW2M/Iq7OnDCUocA/s1600/git-tree.png
[Number vs hash]: http://4.bp.blogspot.com/-HZ2-Dkcmp-w/UlDSN1YVF1I/AAAAAAAAW2Y/8McshQX8T8o/s1600/number-vs-hash.png
[TFS tree]: http://4.bp.blogspot.com/-HC6XAG2lfXY/UlDSN31iTaI/AAAAAAAAW2U/HGndXhPjqZg/s1600/tfs-tree.png