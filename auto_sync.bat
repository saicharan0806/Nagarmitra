@echo off
title CivicSync GitHub Auto-Push Watcher
echo Starting CivicSync GitHub Auto-Push Watcher...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\auto_push.ps1"
pause
