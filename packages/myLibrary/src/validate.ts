import { Program } from "@typespec/compiler";
import { validateNamespaceIsRequired } from "./rules/validateNamespace.js";


export function $onvalidate(program: Program) {
    validateNamespaceIsRequired(program);
}