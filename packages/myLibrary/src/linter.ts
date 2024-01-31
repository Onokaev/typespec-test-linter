import { defineLinter } from "@typespec/compiler";
import { requiredDocRule } from "./rules/requiredDocRule.js";
// Import the rule defined previously

export const $linter = defineLinter({
  // Include all the rules your linter is defining here.
  rules: [requiredDocRule],

  // Optionally a linter can provide a set of rulesets
  ruleSets: {
    recommended: {
      // (optional) A ruleset takes a map of rules to explicitly enable
      enable: { [`@typespec/my-linter/${requiredDocRule.name}`]: true },

      // (optional) A rule set can extend another rule set
      extends: ["@typespec/best-practices/recommended"],

      // (optional) A rule set can disable a rule enabled in a ruleset it extended.
      disable: {
        "`@typespec/best-practices/no-a": "This doesn't apply in this ruleset.",
      },
    },
  },
});