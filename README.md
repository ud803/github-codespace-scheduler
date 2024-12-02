Hello guys, I'm trying to use codespace as a remote server and needed to turn on/off codespace at certain time.

# This is how I imagine it works.
1. There is a codespace created that you want to automate. (ex, do some scheduled jobs)
2. You have already set a cronjob or a scheduled job in the codespace
3. Through this action, you only turn on/off at the right timing to make above job work on time.

# Prerequisites
- You should have github tokens with permissions for codespace.
- You should have a codespace already created. (because it just turns on & off existing one)

# Parameters
- cron: make this 1~2 minutes earlier before your "real cron job" in codespace starts
- `REPO_ID`: integer id of your repo for codespace. try `gh api repos/{owner}/{repo} --jq ".id"` in your terminal to figure it out
- `CODESPACE_NAME`: name of your target codespace. ex) `curious-fox-wr3249sfop3`
- `WAIT_SECONDS`: seconds to wait before stopping the codespace. I think it should be long enough to start the codespace + do your work in codespace. Calculate it so that your monthly usage minutes does not exceed the free tier.

```
name: Codespace Scheduler

on:
  schedule:
    - cron: '*/5 * * * *' 
  workflow_dispatch:
jobs:
  codespace_scheduler:
    runs-on: ubuntu-latest
    steps:
      - name: Codespace Scheduler
        uses: ud803/github-codespace-scheduler@v1.0.6
        env:
          GITHUB_AUTH: ${{ secrets.YOUR_TOKEN_NAME_WITH_PERMISSION_TO_CODESPACE }}
        with:
          CODESPACE_NAME: "your-codespace-name"
          WAIT_SECONDS: 30
```
