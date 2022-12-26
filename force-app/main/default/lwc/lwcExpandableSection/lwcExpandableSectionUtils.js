// @ts-check
/**
 * @description validates variant to prevent invalid values
 * @param {String} input
 * @returns {String}
 */
export function validateVariant(input) {
  const VALID_VARIANTS = ["base", "non-collapsible"];
  if (!input || input.length === 0 || !VALID_VARIANTS.includes(input)) {
    return VALID_VARIANTS[0];
  }
  return input;
}
