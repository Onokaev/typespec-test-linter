import {  createRule, getDoc, paramMessage } from "@typespec/compiler";

export const requiredDocRule = createRule({
  name: "no-model-doc",
  severity: "warning",
  // Short description of what this linter rule does. To be used for generated summary of a linter.
  description: "Enforce documentation on models.",
  messages: {
    default: `Must be documented.`,
    // Different messages can be provided
    models: `Models must be documented.`,

    // Message can be parameterized
    enums: paramMessage`Enum ${"enumName"} must be documented.`,
  },
  create(context) {
    return {
      operation: (op) => {
        if (!getDoc(context.program, op)) {
          context.reportDiagnostic({
            target: op,
          });
        }
      },
      model: (model) => {
        if (!getDoc(context.program, model)) {
          context.reportDiagnostic({
            messageId: "models",
            target: model,
          });
        }
      },
      enums: (type: any) => {
        if (!getDoc(context.program, type)) {
          context.reportDiagnostic({
            messageId: "enums",
            format: {enumName: type.name},
            target: type,
          });
        }
      },
    };
  },
});