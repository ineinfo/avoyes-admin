import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
    supabase: {
      login: `${ROOTS.AUTH}/supabase/login`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      register: `${ROOTS.AUTH}/supabase/register`,
      newPassword: `${ROOTS.AUTH}/supabase/new-password`,
      forgotPassword: `${ROOTS.AUTH}/supabase/forgot-password`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
    },
    category: {
      root: `${ROOTS.DASHBOARD}/category`,
      new: `${ROOTS.DASHBOARD}/category/new`,
      list: `${ROOTS.DASHBOARD}/category/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/category/${id}/edit`,
    },
    subcategory: {
      root: `${ROOTS.DASHBOARD}/subcategory`,
      new: `${ROOTS.DASHBOARD}/subcategory/new`,
      list: `${ROOTS.DASHBOARD}/subcategory/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/subcategory/${id}/edit`,
    },
    color: {
      root: `${ROOTS.DASHBOARD}/color`,
      new: `${ROOTS.DASHBOARD}/color/new`,
      list: `${ROOTS.DASHBOARD}/color/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/color/${id}/edit`,
    },

    size: {
      root: `${ROOTS.DASHBOARD}/size`,
      new: `${ROOTS.DASHBOARD}/size/new`,
      list: `${ROOTS.DASHBOARD}/size/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/size/${id}/edit`,
    },
    material: {
      root: `${ROOTS.DASHBOARD}/material`,
      new: `${ROOTS.DASHBOARD}/material/new`,
      list: `${ROOTS.DASHBOARD}/material/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/material/${id}/edit`,
    },
    type: {
      root: `${ROOTS.DASHBOARD}/type`,
      new: `${ROOTS.DASHBOARD}/type/new`,
      list: `${ROOTS.DASHBOARD}/type/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/type/${id}/edit`,
    },
    tag: {
      root: `${ROOTS.DASHBOARD}/tag`,
      new: `${ROOTS.DASHBOARD}/tag/new`,
      list: `${ROOTS.DASHBOARD}/tag/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/tag/${id}/edit`,
    },
    blog: {
      root: `${ROOTS.DASHBOARD}/blog`,
      blogcategory: {
        root: `${ROOTS.DASHBOARD}/blog/category`,
        new: `${ROOTS.DASHBOARD}/blog/category/new`,
        list: `${ROOTS.DASHBOARD}/blog/category/list`,
        edit: (id) => `${ROOTS.DASHBOARD}/blog/category/${id}/edit`,
      },
      blogtags: {
        root: `${ROOTS.DASHBOARD}/blog/tags`,
        new: `${ROOTS.DASHBOARD}/blog/tags/new`,
        list: `${ROOTS.DASHBOARD}/blog/tags/list`,
        edit: (id) => `${ROOTS.DASHBOARD}/blog/tags/${id}/edit`,
      },
      // blogcomment: {
      //   root: `${ROOTS.DASHBOARD}/blog/comment`,
      //   new: `${ROOTS.DASHBOARD}/blog/comment/new`,
      //   list: `${ROOTS.DASHBOARD}/blog/comment/list`,
      //   edit: (id) => `${ROOTS.DASHBOARD}/blog/comment/${id}/edit`,
      // },
      list: `${ROOTS.DASHBOARD}/blog/list`,
      new: `${ROOTS.DASHBOARD}/blog/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/blog/${id}/edit`,
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      list: `${ROOTS.DASHBOARD}/product/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
    },
    socialmedia: {
      root: `${ROOTS.DASHBOARD}/socialmedia`,
      new: `${ROOTS.DASHBOARD}/socialmedia/new`,
      list: `${ROOTS.DASHBOARD}/socialmedia/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/socialmedia/${id}/edit`,
    },
    event: {
      root: `${ROOTS.DASHBOARD}/event`,
      new: `${ROOTS.DASHBOARD}/event/new`,
      list: `${ROOTS.DASHBOARD}/event/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/event/${id}/edit`,
    },
    eventvideo: {
      root: `${ROOTS.DASHBOARD}/eventvideo`,
      list: `${ROOTS.DASHBOARD}/eventvideo/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/eventvideo/${id}/edit`,
    },
    eventcategory: {
      root: `${ROOTS.DASHBOARD}/eventcategory`,
      new: `${ROOTS.DASHBOARD}/eventcategory/new`,
      list: `${ROOTS.DASHBOARD}/eventcategory/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/eventcategory/${id}/edit`,
    },
    eventspeaker: {
      root: `${ROOTS.DASHBOARD}/eventspeaker`,
      new: `${ROOTS.DASHBOARD}/eventspeaker/new`,
      list: `${ROOTS.DASHBOARD}/eventspeaker/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/eventspeaker/${id}/edit`,
    },
    orderhistory: {
      root: `${ROOTS.DASHBOARD}/orderhistory`,
      list: `${ROOTS.DASHBOARD}/orderhistory/list`,
      view: (id) => `${ROOTS.DASHBOARD}/orderhistory/${id}/view`,
    },
    foodplace: {
      root: `${ROOTS.DASHBOARD}/foodplace`,
      new: `${ROOTS.DASHBOARD}/foodplace/new`,
      list: `${ROOTS.DASHBOARD}/foodplace/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/foodplace/${id}/edit`,
    },
    foodtype: {
      root: `${ROOTS.DASHBOARD}/foodtype`,
      new: `${ROOTS.DASHBOARD}/foodtype/new`,
      list: `${ROOTS.DASHBOARD}/foodtype/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/foodtype/${id}/edit`,
    },
    populardishes: {
      root: `${ROOTS.DASHBOARD}/populardishes`,
      new: `${ROOTS.DASHBOARD}/populardishes/new`,
      list: `${ROOTS.DASHBOARD}/populardishes/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/populardishes/${id}/edit`,
    },
    challenges: {
      root: `${ROOTS.DASHBOARD}/challenges`,
      new: `${ROOTS.DASHBOARD}/challenges/new`,
      list: `${ROOTS.DASHBOARD}/challenges/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/challenges/${id}/edit`,
    },
    activity: {
      root: `${ROOTS.DASHBOARD}/activity`,
      new: `${ROOTS.DASHBOARD}/activity/new`,
      list: `${ROOTS.DASHBOARD}/activity/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/activity/${id}/edit`,
    },
    activitycategory: {
      root: `${ROOTS.DASHBOARD}/activitycategory`,
      new: `${ROOTS.DASHBOARD}/activitycategory/new`,
      list: `${ROOTS.DASHBOARD}/activitycategory/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/activitycategory/${id}/edit`,
    },
    pages: {
      root: `${ROOTS.DASHBOARD}/pages`,
      list: `${ROOTS.DASHBOARD}/pages/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/pages/${id}/edit`,
    },
    faq: {
      root: `${ROOTS.DASHBOARD}/faq`,
      new: `${ROOTS.DASHBOARD}/faq/new`,
      list: `${ROOTS.DASHBOARD}/faq/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/faq/${id}/edit`,
    },
    inquiry: {
      root: `${ROOTS.DASHBOARD}/inquiry`,
      new: `${ROOTS.DASHBOARD}/inquiry/new`,
      list: `${ROOTS.DASHBOARD}/inquiry/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/inquiry/${id}/edit`,
    },
    contact: {
      root: `${ROOTS.DASHBOARD}/contact`,
      list: `${ROOTS.DASHBOARD}/contact/list`,
      new: `${ROOTS.DASHBOARD}/contact/new`,
    },
    aboutus: {
      root: `${ROOTS.DASHBOARD}/aboutus`,
      list: `${ROOTS.DASHBOARD}/aboutus/list`,
      new: `${ROOTS.DASHBOARD}/aboutus/new`,
    },
    setting: {
      root: `${ROOTS.DASHBOARD}/setting`,
      changepassword: `${ROOTS.DASHBOARD}/setting/changepassword`,
      profile: `${ROOTS.DASHBOARD}/setting/profile`,
    },
    topbanner: {
      root: `${ROOTS.DASHBOARD}/topbanner`,
      new: `${ROOTS.DASHBOARD}/topbanner/new`,
      list: `${ROOTS.DASHBOARD}/topbanner/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/topbanner/${id}/edit`,
    },
    bottombanner: {
      root: `${ROOTS.DASHBOARD}/bottombanner`,
      new: `${ROOTS.DASHBOARD}/bottombanner/new`,
      list: `${ROOTS.DASHBOARD}/bottombanner/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/bottombanner/${id}/edit`,
    },
  },
};
