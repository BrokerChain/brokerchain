import * as path from "node:path";
// import { Logger } from "myutils/logger";
// import { write_text_file } from "../file/write_text_file";
// import * as ts from "typescript";
// export function make_client(plog: Logger, name: string) {
//     const log = plog.sub("make_client");
//     log.variable("name", name);
//     const src_dir = process.cwd().replace("/dist/", "/src/");
//     log.variable("src_dir", src_dir);
//     const entry_file = path.resolve(src_dir, "server/index.ts");
//     log.variable("entry_file", entry_file);
//     const program = ts.createProgram({
//         rootNames: [entry_file],
//         options: {
//             declaration: true,
//             emitDeclarationOnly: true
//         }
//     });
//     program.emit();
//     console.log("done");
//     // const checker = program.getTypeChecker();
//     // const source_file = program.getSourceFile(entry_file);
//     // debugger;
//     // // console.log(source_file);
//     // ts.forEachChild(source_file, node => {
//     //     if (!ts.isExportDeclaration(node)) return;
//     //     if (node.kind !== ts.SyntaxKind.ExportDeclaration) return;
//     //     // console.log(node.decorators, node.moduleSpecifier);
//     //     // const symbol = checker.getSymbolAtLocation(node);
//     //     // console.log(symbol);
//     //     // const symbol = checker.getRootSymbols(node);
//     //     // console.log(symbol);
//     // });
//     // const info = program.getDeclarationDiagnostics();
//     // console.log(info);
// }
