const core = require('@actions/core');

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
