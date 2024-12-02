const core = require('@actions/core');
const { Octokit } = require('@octokit/core'); // Octokit 가져오기

// Octokit.js
// https://github.com/octokit/core.js#readme



async function run() {
try {
    // 입력 값 가져오기
    const name = core.getInput('name');
    const repo_id = +core.getInput('repo_id');
    const CODESPACE_NAME = core.getInput('CODESPACE_NAME');
    const github_auth = process.env.github_auth
    const PR_NUMBER = process.env.PR_NUMBER
    // 로그 출력
    console.log(`Hello, ${name}!`);
    console.log(`Hello my repo_id, ${repo_id}!`);
    console.log(`POST /user/codespaces/${CODESPACE_NAME}/start`);

    const octokit = new Octokit({
        auth: github_auth
      })

    // GitHub API 요청 (octokit 사용)
    const response_start = await octokit.request(`POST /user/codespaces/${CODESPACE_NAME}/start`, {
        codespace_name: CODESPACE_NAME,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      // API 응답 출력 (선택적)
      console.log(response_start);
      
      await new Promise(r => setTimeout(r, 20));
      console.log('Sleep 20 secs');
      
      const response_stop = await octokit.request(`POST /user/codespaces/${CODESPACE_NAME}/start`, {
        codespace_name: CODESPACE_NAME,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      // API 응답 출력 (선택적)
      console.log(response_stop);


} catch (error) {
    // 에러 발생 시 처리
    core.setFailed(`Action failed with error: ${error.message}`);
}
}

run();