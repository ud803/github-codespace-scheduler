Hello guys, I'm trying to use codespace as a remote server and needed to turn on/off codespace at certain time.

# This is how I imagine it works.
1. There is a codespace created that you want to automate. (ex, do some scheduled jobs)
2. You have already set a cronjob or a scheduled job in the codespace
3. Through this action, you only turn on/off at the right timing to make above job work on time.

# Parameters
- cron: make this 1~2 minutes earlier before your "real cron job" in codespace starts
- `REPO_ID`: integer id of your repo for codespace. try `gh api repos/{owner}/{repo} --jq ".id"` in your terminal to figure it out
- `CODESPACE_NAME`: name of your target codespace. ex) `curious-fox-wr3249sfop3`
- `WAIT_SECONDS`: seconds to wait before stopping the codespace. I think it should be long enough to start the codespace + do your work in codespace. Calculate it so that your monthly usage minutes does not exceed the free tier.

```
name: Test My Custom Action

on:
  schedule:
    - cron: '*/5 * * * *' 
  workflow_dispatch:
jobs:
  echo-test:
    runs-on: ubuntu-latest
    steps:
      - name: Step1) Checkout code
        uses: actions/checkout@v4
        with:
          repository: ${{ github.repository }}
        
      - name: Step2) Print current date
        run: |
          echo "This is a scheduled event!"
          echo "Current Date and Time: $(date)"
        
      - name: Step3) Start & Wait & Stop Codespace
        env:
          github_auth: ${{ secrets.TOKEN_CODESPACE }}
        uses: ./
        with:
          REPO_ID: {your_repo_integer_id}
          CODESPACE_NAME: "your-codespace-name"
          WAIT_SECONDS: 30
```
