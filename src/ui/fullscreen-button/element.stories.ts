import '../../media/test-utils/define';
import './define';

import { html } from 'lit';

import { ifNonEmpty, on } from '../../base/directives';
import { LOGGER_STORYBOOK_ARG_TYPES } from '../../base/logger';
import { storybookAction, StorybookControl } from '../../base/storybook';
import { omit } from '../../utils/object';
import { TOGGLE_BUTTON_ELEMENT_STORYBOOK_ARG_TYPES } from '../toggle-button/element.stories';
import { FULLSCREEN_BUTTON_ELEMENT_TAG_NAME } from './FullscreenButtonElement';

export const FULLSCREEN_BUTTON_ELEMENT_STORYBOOK_ARG_TYPES = {
  ...LOGGER_STORYBOOK_ARG_TYPES,
  ...omit(TOGGLE_BUTTON_ELEMENT_STORYBOOK_ARG_TYPES, ['pressed']),
  label: { control: StorybookControl.Text, defaultValue: 'Fullscreen' },
  mediaFullscreen: {
    control: StorybookControl.Boolean,
    defaultValue: false
  },
  onEnterFullscreenRequest: storybookAction('vds-enter-fullscreen-request'),
  onExitFullscreenRequest: storybookAction('vds-exit-fullscreen-request')
};

export default {
  title: 'UI/Controls/Fullscreen Button',
  component: FULLSCREEN_BUTTON_ELEMENT_TAG_NAME,
  argTypes: FULLSCREEN_BUTTON_ELEMENT_STORYBOOK_ARG_TYPES,
  excludeStories: /.*STORYBOOK_ARG_TYPES$/
};

function Template({
  // Properties
  label,
  logLevel,
  describedBy,
  disabled,
  // Actions
  onEnterFullscreenRequest,
  onExitFullscreenRequest,
  // Media Properties
  mediaFullscreen
}: any) {
  return html`
    <vds-fake-media-player
      log-level=${logLevel}
      .mediaCanPlay="${true}"
      .mediaFullscreen="${mediaFullscreen}"
      ${on('vds-enter-fullscreen-request', onEnterFullscreenRequest)}
      ${on('vds-exit-fullscreen-request', onExitFullscreenRequest)}
    >
      <vds-fullscreen-button
        label="${ifNonEmpty(label)}"
        described-by="${ifNonEmpty(describedBy)}"
        ?disabled="${disabled}"
        slot="ui"
      >
        <div class="enter">Enter</div>
        <div class="exit">Exit</div>
      </vds-fullscreen-button>
    </vds-fake-media-player>

    <style>
      vds-fullscreen-button[media-fullscreen] .enter {
        display: none;
      }

      vds-fullscreen-button:not([media-fullscreen]) .exit {
        display: none;
      }
    </style>
  `;
}

export const FullscreenButton = Template.bind({});
