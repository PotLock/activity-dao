import { injectGlobal } from "@emotion/css";

import { DynaPuff, Alexandria, Manrope, Hanken_Grotesk, Aclonica, Inter, DM_Sans, Nunito_Sans } from "next/font/google";
//import fonts from next/font -- significantly reduce layout shifts
const dynapuff = DynaPuff({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const alexandria = Alexandria({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const manrope = Manrope({
  weight: ['400', '500', '700'],
  subsets : ['latin'],
  display: "swap"
})

const hankenGrotesk = Hanken_Grotesk({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  display: "swap"
})

const aclonica = Aclonica({
  weight: ['400'],
  subsets: ['latin'],
  display: "swap"
})

const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap'
});

const dmSans = DM_Sans({
  weight: [ '700'],
  subsets: ['latin'],
  display: 'swap'
});

const nunitoSans = Nunito_Sans({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap'
});


export default function createGlobalStyle() {
  injectGlobal`
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

@font-face {
        font-family: "SF Pro Text";
        src: url("/FontsFree-Net-SFProText-Bold.ttf");
        font-weight: 700;
      }
@font-face {
        font-family: "GT America";
        src: url("/GT-America-Standard-Regular-Trial.otf");
        font-weight: 500;
      }

    body {
      margin: 0; line-height: normal;
    }
:root {

/* fonts */
--ui-small-strong: 'GT America';
--font-sf-pro-text: 'SF Pro Text';

/* font sizes */
--font-size-3xl: 1.375rem;
--font-size-lg: 1.125rem;
--font-size-5xl: 1.5rem;
--font-size-lgi: 1.188rem;
--font-size-37xl-1: 3.506rem;
--font-size-15xl: 2.125rem;
--font-size-26xl: 2.813rem;
--font-size-sm-8: 0.863rem;
--font-size-7xl-1: 1.631rem;
--font-size-2xl: 1.313rem;
--font-size-6xs-5: 0.406rem;
--font-size-5xs-9: 0.494rem;
--font-size-5xs-3: 0.456rem;
--font-size-5xs: 0.5rem;
--font-size-4xl: 1.438rem;
--font-size-10xl: 1.813rem;
--font-size-39xl: 3.625rem;
--ui-small-strong-size: 0.875rem;
--font-size-13xl: 2rem;
--font-size-7xl: 1.625rem;
--font-size-smi: 0.813rem;
--font-size-56xl-2: 4.7rem;
--font-size-41xl: 3.75rem;
--font-size-21xl: 2.5rem;
--font-size-lg-3: 1.144rem;
--font-size-12xl: 1.938rem;
--font-size-6xl: 1.563rem;
--display-1-medium-size: 0.75rem;
--font-size-27xl-5: 2.906rem;
--font-size-9xl: 1.75rem;
--font-size-18xl: 2.313rem;
--font-size-sm-2: 0.825rem;
--font-size-base: 1rem;
--font-size-xs-4: 0.713rem;
--font-size-9xl-4: 1.775rem;
--font-size-xl: 1.25rem;
--font-size-base-9: 1.056rem;
--font-size-16xl: 2.188rem;
--font-size-27xl: 2.875rem;
--font-size-59xl-3: 4.894rem;
--font-size-55xl-9: 4.681rem;
--font-size-28xl: 2.938rem;
--font-size-44xl: 3.938rem;
--font-size-52xl-3: 4.456rem;
--font-size-24xl: 2.688rem;
--font-size-38xl: 3.563rem;
--font-size-32xl: 3.188rem;
--font-size-22xl: 2.563rem;
--font-size-3xs-2: 0.575rem;
--font-size-mini-3: 0.894rem;
--font-size-mid-5: 1.094rem;
--font-size-23xl-2: 2.638rem;

/* Colors */
--background-default-default: #fff;
--wwwgetminjiapp-black: #000;
--color-red: #d00000;
--color-mistyrose: #ffe8e8;
--color-gainsboro-100: #e7e7e7;
--color-gainsboro-200: #dfe3e8;
--border-default-default: #d9d9d9;
--buttons-background-primary-gradient: #0969da;
--color-royalblue-100: #0066e2;
--color-aliceblue-100: #eef5ff;
--color-aliceblue-200: #ecf5ff;
--color-aliceblue-300: #e6f7ff;
--color-azure: #e6fbff;
--color-deepskyblue: #0ab9de;
--color-honeydew: #e9ffe6;
--color-limegreen-100: #00c20a;
--color-limegreen-200: #1fa90c;
--color-cornsilk-100: #fff8e0;
--color-cornsilk-200: #fff7e0;
--color-cornsilk-300: #fff6db;
--color-yellow-64: #fde047;
--wwwgetminjiapp-candlelight: #facc15;
--color-gold-100: #ffc304;
--color-indigo: #680589;
--color-thistle: #f4d2ff;
--text-default-tertiary: #b3b3b3;
--color-darkgray-100: #a0a0a0;
--color-dimgray: #6f706e;
--color-darkslategray-100: #4c4d44;
--dark-grey-400: #212b36;
--color-silver: #c4c4c4;
--wwwamplemarketcom-alabaster: #fbfbfb;
--color-gray-100: #282828;
--badges-text-text-dark: #19213d;
--text-default-default: #1e1e1e;
--color-grey-7: #111;
--color-gray-200: #101010;
--color-gray-300: #0f0f0e;
--wwwamplemarketcom-alabaster-75: rgba(251, 251, 251, 0.75);
--color-gray-400: rgba(255, 255, 255, 0.84);
--color-gray-500: rgba(15, 15, 14, 0.1);
--color-azure-47: #64748b;
--inputs-select-text-text-neutral: #666f8d;
--color-slategray-100: rgba(107, 114, 128, 0.7);
--color-seashell: #fff2ec;
--color-darkorange: #e88518;
--color-mediumblue: #3d37f1;
--color-beige: #dff3d3;
--color-green: #459a00;
--color-lemonchiffon: #fef1c9;
--color-darkslateblue-100: #20235a;
--color-darkslateblue-200: rgba(32, 35, 90, 0.05);
--color-darkslateblue-300: rgba(32, 35, 90, 0.1);
--color-floralwhite: #fffbf2;
--color-khaki: #ffd881;
--color-lavenderblush: #ffe6f0;
--color-hotpink: #ff5694;
--badges-backgrounds-bg-color-2: #f7f8fa;
--color-whitesmoke-100: #f6f6f6;
--inputs-select-borders-br-color-1: #f0f2f5;
--color-lightslategray: #919eab;
--color-lavender: #f1eefe;
--color-blueviolet: #6d39e4;
--color-linen: #f5ebe2;
--color-sienna: #a0744a;

/* Spacing */
--space-200: 0.5rem;
--radius-full: 624.937rem;
--space-400: 1rem;
--font-size-16: 1rem;
--width-472: 29.5rem;
--item-spacing-8: 0.5rem;
--badges-pill: 12.5rem;
--default-gaps-default-paddings-pd-medium: 1.5rem;
--badges-gaps-gap-small: 0.25rem;
--badges-paddings-pd-small: 0.375rem;
--badges-small: 0.25rem;
--buttons-regular: 0.5rem;
--buttons-gaps-gap-small: 0.25rem;

/* Gaps */
--gap-3xs: 0.625rem;
--gap-29xl: 3rem;
--gap-xl: 1.25rem;
--gap-6xs: 0.437rem;
--gap-xs: 0.75rem;
--gap-31xl: 3.125rem;
--gap-11xl: 1.875rem;
--gap-2xl-8: 1.362rem;
--gap-62xl-9: 5.118rem;
--gap-lg: 1.125rem;
--gap-6xs-9: 0.431rem;
--gap-7xs: 0.375rem;
--gap-11xs-9: 0.118rem;
--gap-mid: 1.062rem;
--gap-45xl: 4rem;
--gap-11xs-7: 0.106rem;
--gap-7xl-8: 1.675rem;
--gap-4xs-1: 0.506rem;
--gap-sm: 0.875rem;
--gap-21xl: 2.5rem;
--gap-261xl-1: 17.506rem;
--gap-base-9: 0.993rem;
--gap-5xs: 0.5rem;
--gap-7xs-8: 0.362rem;
--gap-23xl: 2.625rem;
--gap-2xl: 1.312rem;
--gap-125xl: 9rem;
--gap-415xl: 27.125rem;
--gap-4xs: 0.562rem;
--gap-176xl: 12.187rem;
--gap-10xs: 0.187rem;
--gap-173xl: 12rem;
--gap-120xl: 8.687rem;
--gap-13xl: 2rem;
--gap-lgi-4: 1.212rem;
--gap-12xl-8: 1.987rem;
--gap-lgi: 1.187rem;
--gap-lgi-5: 1.218rem;
--gap-5xs-6: 0.475rem;
--gap-7xs-3: 0.331rem;
--gap-35xl-2: 3.387rem;
--gap-xs-4: 0.712rem;
--gap-9xs-4: 0.212rem;
--gap-137xl-5: 9.781rem;
--gap-sm-7: 0.856rem;
--gap-10xs-7: 0.168rem;
--gap-5xl: 1.5rem;
--gap-15xl: 2.125rem;
--gap-12xs: 0.062rem;
--gap-6xl: 1.562rem;
--gap-82xl: 6.312rem;
--gap-25xl: 2.75rem;
--gap-3xl: 1.375rem;
--gap-18xl: 2.312rem;
--gap-smi: 0.812rem;
--gap-9xs: 0.25rem;
--gap-58xl: 4.812rem;

/* Paddings */
--padding-6xl: 1.562rem;
--padding-12xs: 0.062rem;
--padding-55xl: 4.625rem;
--padding-13xl: 2rem;
--padding-34xl: 3.312rem;
--padding-69xl-1: 5.506rem;
--padding-8xs: 0.312rem;
--padding-9xs: 0.25rem;
--padding-36xl: 3.437rem;
--padding-smi: 0.812rem;
--padding-mid: 1.062rem;
--padding-14xl: 2.062rem;
--padding-9xl: 1.75rem;
--padding-mini: 0.937rem;
--padding-base-4: 0.962rem;
--padding-3xs: 0.625rem;
--padding-7xs: 0.375rem;
--padding-11xs-5: 0.093rem;
--padding-11xs: 0.125rem;
--padding-10xs: 0.187rem;
--padding-11xs-7: 0.106rem;
--padding-xs: 0.75rem;
--padding-6xs: 0.437rem;
--padding-sm: 0.875rem;
--padding-17xl: 2.25rem;
--padding-12xl: 1.937rem;
--padding-77xl: 6rem;
--padding-27xl-4: 2.9rem;
--padding-4xl: 1.437rem;
--padding-base: 1rem;
--padding-15xl: 2.125rem;
--padding-10xl: 1.812rem;
--padding-30xl-5: 3.093rem;
--padding-lg: 1.125rem;
--padding-20xl: 2.437rem;
--padding-2xl: 1.312rem;
--padding-7xl: 1.625rem;
--padding-xl: 1.25rem;
--padding-mini-9: 0.931rem;
--padding-base-5: 0.968rem;
--padding-100xl: 7.437rem;
--padding-88xl: 6.687rem;
--padding-5xs-5: 0.468rem;
--padding-80xl: 6.187rem;
--padding-218xl: 14.812rem;
--padding-2xs: 0.687rem;
--padding-5xs: 0.5rem;
--padding-11xl: 1.875rem;
--padding-16xl: 2.187rem;
--padding-5xl: 1.5rem;
--padding-517xl: 33.5rem;
--padding-4xs: 0.562rem;
--padding-29xl: 3rem;
--padding-3xs-5: 0.593rem;
--padding-6xs-5: 0.406rem;
--padding-512xl: 33.187rem;
--padding-37xl-2: 3.512rem;
--padding-57xl: 4.75rem;
--padding-70xl: 5.562rem;
--padding-27xl-6: 2.912rem;
--padding-76xl: 5.937rem;
--padding-lgi: 1.187rem;
--padding-33xl: 3.25rem;
--padding-25xl-2: 2.762rem;
--padding-24xl-9: 2.743rem;
--padding-31xl: 3.125rem;
--padding-3xl: 1.375rem;
--padding-3xl-4: 1.4rem;
--padding-2xl-9: 1.368rem;
--padding-143xl: 10.125rem;
--padding-44xl: 3.937rem;
--padding-xl-3: 1.268rem;
--padding-9xs-1: 0.193rem;
--padding-10xs-2: 0.137rem;
--padding-40xl: 3.687rem;
--padding-8xl: 1.687rem;
--padding-23xl: 2.625rem;
--padding-121xl: 8.75rem;
--padding-105xl: 7.75rem;
--padding-101xl: 7.5rem;
--padding-131xl: 9.375rem;
--padding-95xl: 7.125rem;
--padding-127xl: 9.125rem;
--padding-109xl: 8rem;
--padding-158xl: 11.062rem;
--padding-144xl: 10.187rem;
--padding-135xl: 9.625rem;
--padding-10xs-5: 0.156rem;
--padding-10xs-6: 0.162rem;
--padding-10xs-3: 0.143rem;

/* Border radiuses */
--br-4xl-1: 23.1px;
--br-4xs-1: 8.1px;
--br-5737xl-4: 5756.4px;
--br-lgi-6: 19.6px;
--br-xl: 20px;
--br-3xl: 22px;
--br-3xl-4: 22.4px;
--br-10xs-3: 2.3px;
--br-11xl: 30px;
--br-4664xl-1: 4683.1px;
--br-27xl: 46px;
--br-sm: 14px;
--br-mini: 15px;
--br-3xs: 10px;
--br-7xs: 6px;
--br-8xs: 5px;
--br-6xl-4: 25.4px;
--br-sm-5: 13.5px;
--br-5xs: 8px;
--br-9xs: 4px;
--br-13xl: 32px;
--br-181xl: 200px;
--br-9980xl: 9999px;
--br-5xl: 24px;

/* Effects */
--neutral-bs-small: 0px 1px 3px rgba(25, 33, 61, 0.1);
--button-primary: 0px 2px 5px rgba(20, 88, 201, 0.17), 0px -2px 0.3px rgba(14, 56, 125, 0.18) inset, 0px 2px 1px rgba(255, 255, 255, 0.22) inset;
}
`;
}

export {
  dynapuff,
  alexandria,
  dmSans,
  nunitoSans,
  hankenGrotesk,
  aclonica,
  inter,
  manrope
}