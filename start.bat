@echo off
title MHP Workshop - Start

echo Starting backend server...
start "MHP Backend" cmd /k "cd /d %~dp0server && node index.js"

timeout /t 2 /nobreak >nul

echo Starting Angular frontend...
start "MHP Frontend" cmd /k "cd /d %~dp0 && npm start"

echo.
echo Both processes started in separate windows.
echo Close those windows to stop the servers.
pause
