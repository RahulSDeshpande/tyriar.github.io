# Level 1

git help
git help <command>


git init

git config --global user.name <username>
git config --global user.email <email>

git add <file>
git add <pattern>
git add folder/*.txt
git add <list of files>
git all --all

git commit -m "message"

git status

git log



# Level 2

Show unstaged differences since last commit
git diff

View staged differences
git diff --staged

Remove file from stage
git reset HEAD <file>

Restore file to original state (last commit)
git checkout -- <file>

Commit all files to commit being tracked (modified files, not new files)
git commit -a -m "message"

Undo last commit, put changes back into staging
git reset --soft HEAD^

Add to last commit and override mesage
git commit --amend -m "New message"

Delete last commit
git reset --hard HEAD^

Delete last 2commit
git reset --hard HEAD^^

Adding remote repository
git remote add origin <url>.git
git remote add <repo> <address>

Show remote repositories
git remote -v

Push changes to remote repository
git push -u origin master
git push -u <repository> <branch>

Pull changes from remote repository
git pull

Remote remote repositories
git remote rm <repo>

To push to remote repository
git push -u <repo> <branch>



# Level 3

Clones the repo at a URL (download repo, adds 'origin' remote, pointing at the cloned repo
git clone <url>

Creates a branch
git branch <branchname>

Switch to different branch
git checkout <branchname>

Switch to master branch (won't be able to see items in other branch)
git checkout master

Merges a branch in to current branch
git merge <branchname>

Delete branch
git branch -d <branchname>

Create branch and checkout that branch (shortcut)
git checkout -b admin

Get a list of remotes (verbose output)
git remote -v



# Level 4

Fetch (or sync) our local repository with the remote one
Fetch doesn't update local code
Merges the origin/master with master
Same as git merge origin/master
git fetch



# Level 5

Create remote branch
git checkout -b <branchname>
git push origin <branchname>

See local branches
git branch

See remote branches
git branch -r

Show remote branches and if they're tracked, show local branches and which remote branches they merge with, and local branches configured for when we do git push
git remote show origin

Removing a branch
git push origin :<branchname>

Delete a branch with unmerged commits
git branch -D <branchname

Show the state of your branches
git remote

Show information about a remote
git remote show origin

Clean up old stale branches
git remote prune<origin

Push branch to master branch
git push <repo> <branchname>:master

## Tagging

List tags
git tag

Goto tag
git checkout <tagname>

Create tag
git tag -a <tagname> -m <comment>

Push tags
git push --tags






# Level 6

Pull down changes but don't merge them
git fetch

Move all changes to master which are not in origin/master to a temporary area (remove merge commits)
Run all origin/master commits one at a time
Run all commits in the temporary area, one at a time
git rebase

Local branch rebase
git checkout <branchname>
git rebase master
git checkout master
git merge <branchname>

Rebase conflict
git rebase
(Fix conflict)
git rebase --continue

To cancel the rebase
git rebase --abort

To skip the patch
git rebase --skip





# Level 7

Emphasise commit hash
git config --global color.ui true

Show one commit per line with SHA and commit message
git log --pretty=oneline

Show log with custom message
git log --pretty=format:"%h %ad- %s [%an]"
%ad	author date
%an	author name
%h SHA hash
%s subject
%d ref names

More formatting info
git help log

Git log 'patch output'
git log --oneline -p

git log --oneline --stat
Insertions and deletions for each commit

git log --online --graph
Visual representation of merges etc.

Log with date ranges
git log --until=1.minute.ago
git log --since=1.day.ago
git log --since=1.hour.ago
git log --since=1.month.ago --until=2.weeks.ago
git log --since=2000-01-01 --until 2012-12-21

Diff between last commit and current state
git diff
(or)
git diff HEAD

Diff parent of latest commit
git diff HEAD^

Diff grandparent of latest commit
git diff HEAD^^

Diff 5 commits ago
git diff HEAD~5

Diff second most recent commit vs most recent
git diff HEAD^..HEAD

Diff two SHAs
git diff <SHA>..SHA
git diff 5fa029b..1f3056b

Diff between two branches
git diff <branch1> <branch2>

Diff between period
git log --since=2000-01-01 --until 2012-12-21

git blame <file> --date short
See commit history for a file

Add ignore patterns to file to have git ignore them LOCALLY (ie. not everyone else)
.git/info/exclude
  ignore folder
  folder/
  ignore file
  file.ext
  ignore mp3s
  *.mp3
  exclude files in a folder
  logs/*.log

Add ignore patterns for the repository
.gitignore

Remove file from repo
git rm file

Untrack file
git rm --cached file

Configure editor (for ALL git repos)
git config --global core.editor emacs

Configure merge tool (for ALL git repos)
git config --global merge.tool emacs

See configuration
git config --list

Create alias
git config --global alias.mylog \
"log --pretty=format:'...' graph"

Create alias for status (run `git st`)
git config --global alias.st status



## Level 2.1 Interactive rebase

Redo last 3 commits (interactive rebase) (alter every commit after the one we specify)
git rebase -i HEAD~3

Switch order of two commits
git rebase -i HEAD~2
(Change order of commits in editor, save and exit)

Reword old commit message
git rebase -i HEAD~2
(Use reword on commit, save and exit)

Split a commit into 2
Use edit command on commit
git reset HEAD^
(stage and commit twice)
git rebase --continue

Squash multiple commits into 1
Use squash command
squash merges the commit into the PREVIOUS commit
Save exit, enter new commit message, save exit




# Level 2.2 Stashing

Save current files in a temp areas (pushes onto a stash stack)
git stash save
git stash

'unstash' rerun changes
git stash apply
git stash apply stash@{0}

See all stashed changes
git stash list

Apply specific stack ({0} is default)
git stash apply stash@{0}
git stash apply stash@{1}
git stash apply ...

Drop stash
git stash drop
git stash drop stash@{0}

Apply and drop stash
git stash pop

Don't stash staged area, only stash unstaged files
git stash save --keep-index

Stash including untracked files
git stash save --include-untracked

View stats
git stash list --stat

View info about stash
git stash show stash@{0]

View stash as patch
git stash show --patch

Stash with message
git stash save "stash message"

Checks out a new branch and pops stash
git stash branch <branchname> stash@{0}

Clear all stashes
git stash clear




# Level 2.3 Purging History

Backup before trying

Check out each commit into a working directory, run the command against it and re-commit the code
git filter-branch --tree-filter <command>

Remove all passwords.txt files from root
--tree-filter ‘rm -f passwords.txt’

Run for all commits in all branches
git filter-branch --tree-filter ‘rm -f passwords.txt’ -- --al

without -f, it will fail if the file isn’t present

This can take some time with a large codebase

Run on each commit but without checking it out first (faster)
git filter-branch --index-filter <git command>

--index-filter ‘git rm --ignore-unmatch --cached --passwords.txt’

Add -f to force overwrite of backup (created from another tree filter)

Remove all empty commands
git filter-branch -f --prune-empty -- --all

Alternatively add --prune-empty to the filter-branch command




# Level 2.4 Working together

Line ending config, change \r\n to \n
git config --global core.autocrlf input

When checking out file change to \r\n, change back to \n on commit
git config --global core.autocrlf true

We can set this in the .gitattributes file
Match all html files, and add conversion
*       <conversion>
*.html  <conversion>

text=auto  choose conversion automatically
text treat files as text - convert to OS’s line endings on chekcout and back to LF on commit
text eol=crlf Set specifically
text eol=lf   Set specifically
binary treat as binary

Cherry pick commit 5409adb (the sha will change because the parent changes)
git cherry-pick 5409adb

Cherry pick and change commit message
git cherry-pick --edit 3944198

Cherry pick and combine commits
git cherry-pick --no-commit 5319023 1309310

Add cherry picked from <branch> to commit message
git cherry-pick -x 83812309

Add who cherry-picked the commit to the commit message
git cherry-pick --signoff
