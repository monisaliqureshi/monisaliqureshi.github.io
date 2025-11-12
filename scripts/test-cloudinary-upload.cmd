@echo off
REM Test helper (Windows cmd): POST a remote image URL to the local Cloudinary upload route
REM Usage: scripts\test-cloudinary-upload.cmd

set URL=http://localhost:3000/api/cloudinary-upload
set REMOTE=https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg

curl -v -X POST "%URL%" -H "Content-Type: application/json" -d "{\"remoteUrl\": \"%REMOTE%\", \"filename\": \"shoes_test\"}"
