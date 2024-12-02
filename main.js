const core = require('@actions/core');
const { Octokit } = require('@octokit/core'); // Fetch Octokit

async function run() {
try {
    // Fetch Envs 
    const GITHUB_AUTH = process.env.GITHUB_AUTH

    // Fetch Variables
    const REPO_ID = +core.getInput('repo_id');
    const CODESPACE_NAME = core.getInput('CODESPACE_NAME');
    const WAIT_SECONDS = core.getInput('WAIT_SECONDS');

    console.log(`Hello my repo_id is: ${REPO_ID}!`);

    const octokit = new Octokit({
        auth: GITHUB_AUTH
      })

    // 1. Start Codespace
    console.log(`API:: POST /user/codespaces/{codespace_name}/start`)
    const response_start = await octokit.request(`POST /user/codespaces/${CODESPACE_NAME}/start`, {
      codespace_name: CODESPACE_NAME,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    console.log(response_start);
    
    // 2. Wait sometimes until some job is done under codespace.
    console.log(`Wait for ${WAIT_SECONDS} seconds...`);
    await new Promise(r => setTimeout(r, WAIT_SECONDS * 1000));
    
    // 3. Stop Codespace
    console.log(`API:: POST /user/codespaces/${CODESPACE_NAME}/stop`)
    const response_stop = await octokit.request(`POST /user/codespaces/{codespace_name}/stop`, {
      codespace_name: CODESPACE_NAME,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    console.log(response_stop);

} catch (error) {
    // Error Message
    core.setFailed(`Action failed with error: ${error.message}`);
}
}

run();