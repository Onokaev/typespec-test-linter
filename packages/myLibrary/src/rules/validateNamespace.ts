import { Namespace, Program, navigateTypesInNamespace } from "@typespec/compiler";
import { reportDiagnostic } from "../lib.js";

export function validateNamespaceIsRequired(program: Program) {
    for (const namespace of GetDeclaredNamespaces(program)) {
      navigateTypesInNamespace(namespace, {
        enum: (enum_) => {
            if(enum_.members.has("unknownFutureValue")){
                return;
            }
  
          reportDiagnostic(program, {
            code: "element-missing-dependencies",
            target: enum_,
            messageId: "Enum missing unknownFutureValue",
            format: {
              model: enum_.name,
            },
          });
        },
      });
    }
  };

  function GetDeclaredNamespaces(program: Program): Namespace[] {
    const root = program.checker!.getGlobalNamespaceType();
    const namespaces = expandNamespaces(root);
  
    return namespaces;
  }

  function expandNamespaces(namespace: Namespace): Namespace[] {
    return [namespace, ...[...namespace.namespaces.values()].flatMap(expandNamespaces)];
  }