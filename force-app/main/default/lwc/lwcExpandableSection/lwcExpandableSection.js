/**
 * @description       : LWC Expandable Section Component
 * @group             : Generic Components
 * @last modified on  : 2023-12-05
 * @last modified by  : samuel@pipelaunch.com
 * @changelog         : 2022-01-26 - Initial version
 *                      2023-11-28 - Added sectionTitleBackgroundColor
 *                      2023-12-04 - Added new variant styles (titles)
 **/
import { LightningElement, api } from "lwc";

import template_base from "./templates/base.html";
import template_titleSections from "./templates/titleSections.html";
import template_nonCollapsible from "./templates/nonCollapsible.html";

import * as utils from "./lwcExpandableSectionUtils";

export default class LwcExpandableSection extends LightningElement {
  /**
   * @property {string} - CSS classes for the main element.
   */
  @api mainClass = "";

  /**
   * @property {string} - title or label of the section
   */
  @api sectionTitle = "";

  /**
   * @property {string} - name of the icon to be displayed
   * @default null
   * @example utility:emoji
   * // TODO: validate and add more options
   */
  @api iconName = null;

  /**
   * @property {string|null} - background color of the section
   * default will be the normal background color (grey)
   * @example #F3F3F3
   */
  @api sectionTitleBackgroundColor = null;

  /**
   * @property {string} - variant of the component
   * @default base
   * @options base, non-collapsible, titles
   */
  @api get variant() {
    return this._variant;
  }
  _variant = "base";
  set variant(value) {
    this._variant = utils.validateVariant(value);
    if (this._variant === "non-collapsible") {
      this._expanded = true;
    }
  }

  /**
   * @property {boolean} - state of the section (expanded or not)
   * @default false
   */
  @api get expanded() {
    return this._expanded; // to receive the state
  }
  _expanded = false;
  set expanded(value) {
    this._expanded = Boolean(value);
  }

  render() {
    switch (this._variant) {
      case "non-collapsible":
        return template_nonCollapsible;
      case "titles":
        return template_titleSections;
      default:
        return template_base;
    }
  }

  /**
   * @type {string} - class of the parent element with dynamic open class
   */
  get computeSectionClasses() {
    return this._expanded ? "slds-section slds-is-open" : "slds-section";
  }

  /**
   * @type {string} - class of the button with dynamic open class
   */
  get computeButtonClasses() {
    const classes = [
      "slds-button",
      "slds-section__title-action",
      "slds-grid",
      "slds-grid_vertical-align-center"
    ];
    if (this.iconName) {
      classes.push("slds-grid_align-spread", "slds-grid_reverse");
    }
    return classes.join(" ");
  }

  /**
   * @type {string} - are hidden attribute
   */
  get computeAreaHidden() {
    return this._expanded ? "false" : "true";
  }

  /**
   * @type {string} - inline styles for the section title
   */
  get computeSectionTitleStyles() {
    if (this.sectionTitleBackgroundColor) {
      return `background-color: ${this.sectionTitleBackgroundColor};`;
    }
    return "";
  }

  /**
   * @description handles click on the button to expand/collapse the section
   */
  handleClick() {
    this._expanded = !this._expanded;
    this.dispatchEvent(new CustomEvent("toggle", { detail: this._expanded }));
  }
}
