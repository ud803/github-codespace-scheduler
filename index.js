const core = require('@actions/core');

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: 'YOUR-TOKEN'
  })
  

async function run() {
    try {
        const name = core.getInput('name');
        const name2 = core.getInput('name2');
        console.log(`Hello, ${name}!`);
        console.log(`Hello, ${name2}!`);
    } catch (error) {
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}

run();

await octokit.request('POST /user/codespaces', {
    repository_id: "R_kgDONXvtSA",
    ref: 'main',
    geo: 'UsWest',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  