@echo off
git init
git add .
git commit -m "Initial commit - AI Architect v0.1"
git remote add origin %1
git branch -M main
echo Git setup complete.
