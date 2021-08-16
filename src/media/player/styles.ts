import { css } from 'lit';

export const basePlayerStyles = css`
  :host {
    display: block;
    contain: content;
  }

  :host([hidden]) {
    display: none;
  }

  ::slotted(vds-media-ui) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Position above media container. */
    z-index: 1;
  }
`;
