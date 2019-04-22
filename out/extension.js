"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.generatespectemplate', () => __awaiter(this, void 0, void 0, function* () {
        const workspaces = vscode.workspace.workspaceFolders;
        if (workspaces !== undefined) {
            const specName = yield vscode.window.showInputBox({
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
                    fs.mkdir(path.join(root, 'images'), err => { });
                    fs.mkdir(path.join(root, 'materials'), err => { });
                    fs.appendFile(path.join(root, 'index.md'), "", err => { });
                }
                else {
                    vscode.window.showErrorMessage(err.message);
                }
            });
            vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(root), false);
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map