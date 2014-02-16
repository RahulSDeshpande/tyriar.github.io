#!/bin/bash
grunt
git status
git add -A
git commit -m "$1"
git push