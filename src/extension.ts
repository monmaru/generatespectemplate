// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.generatespectemplate', async () => {
		const workspaces = vscode.workspace.workspaceFolders;
		if (workspaces === undefined) {
			return;
		}

		const specName = await vscode.window.showInputBox({
			placeHolder: "Name Your Spec"
		});

		if (specName === undefined) {
			vscode.window.showErrorMessage("Spec name is empty!!");
			return;
		}

		const current = workspaces[0].uri.fsPath;
		const root = path.join(current, specName);

		fs.mkdir(root, err => {
			if (err === null) {
				fs.mkdir(path.join(root, 'images'), _err => {});
				fs.mkdir(path.join(root, 'materials'), _err => {});
				fs.appendFile(path.join(root, 'index.md'), makeMarkdownTemplate(specName), _err => {});
			} else {
				vscode.window.showErrorMessage(err.message);
			}
		});

		vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(root), false);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function makeMarkdownTemplate(specName: string): string {
	return `
# ${specName}

## 1章

## 2章
`;
}
