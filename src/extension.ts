import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
    let generateAllFilesDisposable = vscode.commands.registerCommand(
        "extension.generateAllFiles",
        async (uri: vscode.Uri) => {
            if (uri && uri.fsPath) {
                const folderPath = uri.fsPath;
                const directoryName = path.basename(folderPath);
                const reactFCName =
                    directoryName.charAt(0).toUpperCase() +
                    directoryName.substring(1);
                const remainingFilesName =
                    directoryName.charAt(0).toLowerCase() +
                    directoryName.substring(1);
                const fileNames = [
                    `${reactFCName}.tsx`,
                    `${remainingFilesName}.types.ts`,
                    `${remainingFilesName}.mocks.ts`,
                    `${remainingFilesName}.styles.ts`,
                    `${remainingFilesName}.tests.tsx`,
                    `${remainingFilesName}.stories.tsx`,
                ];

                try {
                    for (const fileName of fileNames) {
                        const filePath = path.join(folderPath, fileName);
                        await fs.promises.writeFile(filePath, "");
                    }
                    vscode.window.showInformationMessage(
                        "Files generated successfully."
                    );
                } catch (error) {
                    vscode.window.showErrorMessage(
                        `Failed to generate files: ${error}`
                    );
                }
            } else {
                vscode.window.showErrorMessage("No directory selected.");
            }
        }
    );

    context.subscriptions.push(generateAllFilesDisposable);
}

export function deactivate() {}
