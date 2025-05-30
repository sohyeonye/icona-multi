import github from "@actions/github";
import core from "@actions/core";
import { generate } from "@icona/generator";

(async () => {
    try {
        // Get commit message from the latest commit
        const commitMessage = github.context.payload.head_commit?.message || '';
        core.info('Commit message: ' + commitMessage);

        // Extract file path from commit message
        const match = commitMessage.match(/update (\.\/icona\/[^ ]+)/i);
        if (!match) {
            core.notice('No .icona/*.json file found in commit message');
            return;
        }

        const filePath = match[1];
        core.info('Found file path: ' + filePath);

        // Extract base name (e.g., ./icona/hello.json -> hello)
        const fileName = filePath.replace('./icona/', '').replace('.json', '');
        core.info('Extracted file name: ' + fileName);

        // You can use fileName variable as needed

    } catch (e) {
        core.setFailed(e.message);
    }
})();