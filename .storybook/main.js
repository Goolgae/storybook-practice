// .storybook/main.js 입니다

module.exports = {
  //👇 Location of our stories
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
};