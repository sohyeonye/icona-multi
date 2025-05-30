import github from "@actions/github";
import core from "@actions/core";
import { generate } from "@icona/generator";

(async () => {
    try {
        const commitMessage = github.context.payload.head_commit?.message || '';
        core.info('Commit message: ' + commitMessage);

        const match = commitMessage.match(/Update (\.\/icona\/[^ ]+)/i);
        if (!match) {
            core.notice('No .icona/*.json file found in commit message');
            return;
        }

        const filePath = match[1];
        core.info('Found file path: ' + filePath);

        const serviceName = filePath.replace('./icona/', '').replace('.json', '');
        core.info('Extracted service name: ' + serviceName);

        generate({
            config: {
              svg: {
                genMode: "recreate", 
                active: true, 
                path: `${serviceName}/svg`, 
                svgoConfig: {},
              },
              png: {
                genMode: "recreate", 
                active: true,
                path: `${serviceName}/png`, // will generate png files in png folder
              }
            },
            icons: `./.icona/${serviceName}.json` 
          });
    } catch (e) {
        core.setFailed(e.message);
    }
})();