/**
 * @description       : LWC Expandable Section Component
 * @group             : Generic Components
 * @last modified on  : 2022-12-26
 * @last modified by  : samuel@pipelaunch.com
 * @changelog         : 2022-01-26 - Initial version
 **/
import { LightningElement, api } from "lwc";

import template_base from "./templates/base.html";
import template_nonCollapsible from "./templates/nonCollapsible.html";

import * as utils from "./lwcExpandableSectionUtils";

export default class LwcExpandableSection extends LightningElement {
  /**
   * @property {string} mainClass CSS classes for the main element.
   */
  @api mainClass = "";

  /**
   * @property {string} sectionTitle - title or label of the section
   */
  @api sectionTitle = "";

  /**
   * @property {string} iconName - name of the icon to be displayed
   * @default null
   * @example utility:emoji
   * // TODO: validate and add more options
   */
  @api iconName = null;

  /**
   * @property {string} variant - variant of the component
   * @default base
   * @options base, non-collapsible
   */
  @api get variant() {
    return this._variant;
  }
  _variant = "base";
  set variant(value) {
    this._variant = utils.validateVariant(value);
    if (this._variant === "non-collapsible") this._expanded = true;
  }

  /**
   * @property {boolean} expanded - state of the section (expanded or not)
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
    return this._variant === "non-collapsible"
      ? template_nonCollapsible
      : template_base;
  }

  /**
   * @type {String} - class of the parent element with dynamic open class
   */
  get computeSectionClasses() {
    return this._expanded ? "slds-section slds-is-open" : "slds-section";
  }

  get computeButtonClasses() {
    const classes = [
      "slds-button",
      "slds-section__title-action",
      "slds-grid",
      "slds-grid_vertical-align-center",
    ];
    if (this.iconName) {
      classes.push("slds-grid_align-spread", "slds-grid_reverse");
    } 
    return classes.join(" ");
  }

  get computeAreaHidden() {
    return this._expanded ? "false" : "true";
  }

  handleClick() {
    this._expanded = !this._expanded;
  }
}
