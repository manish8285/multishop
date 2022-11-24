import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.multishop.android',
  appName: 'multishop',
  webDir: 'build',
  bundledWebRuntime: false,
  server:{
    androidScheme:"http",
    allowNavigation:["my.api.url"]
  }
};

export default config;
