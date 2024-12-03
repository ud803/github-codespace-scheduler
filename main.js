const core = require('@actions/core');
const { Octokit } = require('@octokit/core'); // Fetch Octokit

async function run() {
try {
    // Fetch Envs 
    const GITHUB_AUTH = process.env.GITHUB_AUTH

    // Fetch Variables
    const CODESPACE_NAME = core.getInput('CODESPACE_NAME');

    const octokit = new Octokit({
        auth: GITHUB_AUTH
      })

    // 1. Start Codespace
    console.log(`API:: POST /user/codespaces/{codespace_name}/start`)
    const response_start = await octokit.request('POST /user/codespaces/{codespace_name}/start', {
      codespace_name: CODESPACE_NAME,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    console.log(response_start);
    
} catch (error) {
    // Error Message
    core.setFailed(`Action failed with error: ${error.message}`);
}
}

run();
