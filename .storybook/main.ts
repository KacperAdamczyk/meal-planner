import type { StorybookConfig } from '@storybook/nextjs';
import path from 'node:path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {},
    },
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: (config) => {
    const plugins = config.resolve?.plugins ?? [];

    if (config.resolve) {
      config.resolve.plugins = [
        ...plugins,
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        }),
      ];
    }

    return config;
  },
  babel: (config) => {
    console.log(config.plugins, config.presets);

    return config;
  },
};
export default config;
