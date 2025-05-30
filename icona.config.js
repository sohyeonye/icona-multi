import github from "@actions/github";
import core from "@actions/core";
import { generate } from "@icona/generator";

(async () => {
    try {
        // Get modified files from the latest commit in a push event
        const modifiedFiles = github.context.payload.head_commit?.modified || [];
        // Filter for .icona/*.json files
        const iconaJsonFiles = modifiedFiles.filter(f => f.startsWith('.icona/') && f.endsWith('.json'));

        if (iconaJsonFiles.length === 0) {
            core.notice('No .icona/*.json files changed.');
            return;
        }

        // Extract base names (e.g., .icona/icons.json -> icons)
        const fileNames = iconaJsonFiles.map(f => f.replace('.icona/', '').replace('.json', ''));

        core.info('Changed icon files: ' + fileNames.join(', '));
        // You can use fileNames array as needed

    } catch (e) {
        core.setFailed(e.message);
    }
})();