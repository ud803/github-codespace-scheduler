const core = require('@actions/core');
const { Octokit } = require('@octokit/core'); // Octokit 가져오기

// Octokit.js
// https://github.com/octokit/core.js#readme



async function run() {
try {
    // 입력 값 가져오기
    const name = core.getInput('name');
    const name2 = core.getInput('name2');
    const github_auth = core.getInput('github_auth');

    // 로그 출력
    console.log(`Hello, ${name}!`);
    console.log(`Hello, ${name2}!`);

    const octokit = new Octokit({
        auth: github_auth
      })

    // GitHub API 요청 (octokit 사용)
    const response = await octokit.request('POST /user/codespaces', {
        repository_id: "R_kgDONXvtSA",
        ref: 'main',
        geo: 'UsWest',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    // API 응답 출력 (선택적)
    console.log(response);

} catch (error) {
    // 에러 발생 시 처리
    core.setFailed(`Action failed with error: ${error.message}`);
}
}

run();