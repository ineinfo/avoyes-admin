import axios from 'axios';

import { HOST_API } from 'src/config-global';

import {
  CATEGORY_ROUTE,
  SUBCATEGORY_ROUTE,
  PRODUCT_ROUTE,
  SOCIAL_MEDIA,
  PAGES_ROUTE,
  HOME_ROUTE,
  COLOR_ROUTE,
  SIZE_ROUTE,
  MATERIAL_ROUTE,
  TYPE_ROUTE,
  BLOG_ROUTE,
  BLOG_CATEGORY_ROUTE,
  BLOG_TAGS_ROUTE,
  BLOG_COMMENT_ROUTE,
  CONTACT_INQUIRY,
  FAQ_ROUTE,
  CONTACT_US,
  ABOUTUS_ROUTE,
  TAG_ROUTE,
  BRAND_PARTNER,
  DELIVERABLE_ROUTE,
  DELIVERY_DETAILS,
  EVENT_ROUTE,
  FOOD_PLACE_ROUTE,
  FOOD_TYPE_ROUTE,
  POPULAR_DISHES_ROUTE,
  CHALLANGES_ROUTE,
  EVENT_VIDEO_ROUTE,
  ACTIVITY_ROUTE,
  EVENT_CATEGORY_ROUTE,
  EVENT_SPEAKER_ROUTE,
  ORDER_HISTORY_ROUTE,
  ORDER_STATUS_ROUTE,
  ACTIVITY_CATEGORY_ROUTE,
  ACTIVITY_IMG_REMOVE,
  BANNER_ROUTE,
  BOTTOM_BANNER_ROUTE,
} from './apiendpoints';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  // product: {
  //   list: '/api/product/list',
  //   details: '/api/product/details',
  //   search: '/api/product/search',
  // },
  // users: {
  //   list: USER_ROUTE,
  //   create: USER_ROUTE,
  //   details: (id) => `${USER_ROUTE}/${id}`,
  // },
  // clients: {
  //   list: CLIENTS_ROUTE,
  //   create: CLIENTS_ROUTE,
  //   details: (id) => `${CLIENTS_ROUTE}/${id}`,
  // },
  // leads: {
  //   list: LEADS_ROUTE,
  //   create: LEADS_ROUTE,
  //   details: (id) => `${LEADS_ROUTE}/${id}`,
  // },
  category: {
    list: CATEGORY_ROUTE,
    create: CATEGORY_ROUTE,
    details: (id) => `${CATEGORY_ROUTE}/${id}`,
    deletes: (id) => `${CATEGORY_ROUTE}/${id}`,
  },
  subcategory: {
    list: SUBCATEGORY_ROUTE,
    create: SUBCATEGORY_ROUTE,
    details: (id) => `${SUBCATEGORY_ROUTE}/${id}`,
    deletes: (id) => `${SUBCATEGORY_ROUTE}/${id}`,
  },
  product: {
    list: PRODUCT_ROUTE,
    create: PRODUCT_ROUTE,
    details: (id) => `${PRODUCT_ROUTE}/${id}`,
    deletes: (id) => `${PRODUCT_ROUTE}/${id}`,
  },
  color: {
    list: COLOR_ROUTE,
    create: COLOR_ROUTE,
    details: (id) => `${COLOR_ROUTE}/${id}`,
    deletes: (id) => `${COLOR_ROUTE}/${id}`,
  },
  material: {
    list: MATERIAL_ROUTE,
    create: MATERIAL_ROUTE,
    details: (id) => `${MATERIAL_ROUTE}/${id}`,
    deletes: (id) => `${MATERIAL_ROUTE}/${id}`,
  },
  type: {
    list: TYPE_ROUTE,
    create: TYPE_ROUTE,
    details: (id) => `${TYPE_ROUTE}/${id}`,
    deletes: (id) => `${TYPE_ROUTE}/${id}`,
  },
  tag: {
    list: TAG_ROUTE,
    create: TAG_ROUTE,
    details: (id) => `${TAG_ROUTE}/${id}`,
    deletes: (id) => `${TAG_ROUTE}/${id}`,
  },
  socialmedia: {
    list: SOCIAL_MEDIA,
    create: SOCIAL_MEDIA,
    details: (id) => `${SOCIAL_MEDIA}/${id}`,
    deletes: (id) => `${SOCIAL_MEDIA}/${id}`,
  },
  event: {
    list: EVENT_ROUTE,
    create: EVENT_ROUTE,
    details: (id) => `${EVENT_ROUTE}/${id}`,
    deletes: (id) => `${EVENT_ROUTE}/${id}`,
  },
  eventvideo: {
    list: EVENT_VIDEO_ROUTE,
    create: EVENT_VIDEO_ROUTE,
    details: (id) => `${EVENT_VIDEO_ROUTE}/${id}`,
  },
  eventcategory: {
    list: EVENT_CATEGORY_ROUTE,
    create: EVENT_CATEGORY_ROUTE,
    details: (id) => `${EVENT_CATEGORY_ROUTE}/${id}`,
    deletes: (id) => `${EVENT_CATEGORY_ROUTE}/${id}`,
  },
  eventspeaker: {
    list: EVENT_SPEAKER_ROUTE,
    create: EVENT_SPEAKER_ROUTE,
    details: (id) => `${EVENT_SPEAKER_ROUTE}/${id}`,
    deletes: (id) => `${EVENT_SPEAKER_ROUTE}/${id}`,
  },
  orderhistory: {
    list: ORDER_HISTORY_ROUTE,
    create: ORDER_HISTORY_ROUTE,
    details: (id) => `${ORDER_HISTORY_ROUTE}/${id}`,
    view: (id) => `${ORDER_STATUS_ROUTE}/${id}/status`,
  },
  activity: {
    list: ACTIVITY_ROUTE,
    create: ACTIVITY_ROUTE,
    details: (id) => `${ACTIVITY_ROUTE}/${id}`,
    deletes: (id) => `${ACTIVITY_ROUTE}/${id}`,
    imgdlt: (iid) => `${ACTIVITY_IMG_REMOVE}/${iid}`
  },
  activitycategory: {
    list: ACTIVITY_CATEGORY_ROUTE,
    create: ACTIVITY_CATEGORY_ROUTE,
    details: (id) => `${ACTIVITY_CATEGORY_ROUTE}/${id}`,
    deletes: (id) => `${ACTIVITY_CATEGORY_ROUTE}/${id}`,
  },
  foodplace: {
    list: FOOD_PLACE_ROUTE,
    create: FOOD_PLACE_ROUTE,
    details: (id) => `${FOOD_PLACE_ROUTE}/${id}`,
    deletes: (id) => `${FOOD_PLACE_ROUTE}/${id}`,
  },
  foodtype: {
    list: FOOD_TYPE_ROUTE,
    create: FOOD_TYPE_ROUTE,
    details: (id) => `${FOOD_TYPE_ROUTE}/${id}`,
    deletes: (id) => `${FOOD_TYPE_ROUTE}/${id}`,
  },
  populardishes: {
    list: POPULAR_DISHES_ROUTE,
    create: POPULAR_DISHES_ROUTE,
    details: (id) => `${POPULAR_DISHES_ROUTE}/${id}`,
    deletes: (id) => `${POPULAR_DISHES_ROUTE}/${id}`,
  },
  challenges: {
    list: CHALLANGES_ROUTE,
    create: CHALLANGES_ROUTE,
    details: (id) => `${CHALLANGES_ROUTE}/${id}`,
    deletes: (id) => `${CHALLANGES_ROUTE}/${id}`,
  },
  faq: {
    list: FAQ_ROUTE,
    create: FAQ_ROUTE,
    details: (id) => `${FAQ_ROUTE}/${id}`,
    deletes: (id) => `${FAQ_ROUTE}/${id}`,
  },
  inquiry: {
    list: CONTACT_INQUIRY,
    create: CONTACT_INQUIRY,
    details: (id) => `${CONTACT_INQUIRY}/${id}`,
    deletes: (id) => `${CONTACT_INQUIRY}/${id}`,
  },
  contact: {
    list: CONTACT_US,
    create: CONTACT_US,
    details: CONTACT_US,
  },
  brandpartner: {
    list: BRAND_PARTNER,
    create: BRAND_PARTNER,
    details: BRAND_PARTNER,
  },
  deliverydetails: {
    list: DELIVERY_DETAILS,
    create: DELIVERY_DETAILS,
    details: DELIVERY_DETAILS,
  },
  blog: {
    list: BLOG_ROUTE,
    create: BLOG_ROUTE,
    details: (id) => `${BLOG_ROUTE}/${id}`,
    deletes: (id) => `${BLOG_ROUTE}/${id}`,
  },
  blogcategory: {
    list: BLOG_CATEGORY_ROUTE,
    create: BLOG_CATEGORY_ROUTE,
    details: (id) => `${BLOG_CATEGORY_ROUTE}/${id}`,
    deletes: (id) => `${BLOG_CATEGORY_ROUTE}/${id}`,
  },
  blogtags: {
    list: BLOG_TAGS_ROUTE,
    create: BLOG_TAGS_ROUTE,
    details: (id) => `${BLOG_TAGS_ROUTE}/${id}`,
    deletes: (id) => `${BLOG_TAGS_ROUTE}/${id}`,
  },
  blogcomment: {
    list: BLOG_COMMENT_ROUTE,
    create: BLOG_COMMENT_ROUTE,
    details: (id) => `${BLOG_COMMENT_ROUTE}/${id}`,
    deletes: (id) => `${BLOG_COMMENT_ROUTE}/${id}`,
  },
  // brand: {
  //   list: BRANDS_ROUTE,
  //   create: BRANDS_ROUTE,
  //   details: (id) => `${BRANDS_ROUTE}/?id=${id}`,
  //   deletes: (id) => `${BRANDS_ROUTE}?ids=${id}`,
  // },
  // product: {
  //   list: PRODUCT_ROUTE,
  //   create: PRODUCT_ROUTE,
  //   details: (id) => `${PRODUCT_ROUTE}/${id}`,
  //   deletes: (id) => `${PRODUCT_ROUTE}?ids=${id}`,
  // },
  topbanner: {
    list: BANNER_ROUTE,
    create: BANNER_ROUTE,
    details: (id) => `${BANNER_ROUTE}/${id}`,
    deletes: (id) => `${BANNER_ROUTE}/${id}`,
  },
  bottombanner: {
    list: BOTTOM_BANNER_ROUTE,
    create: BOTTOM_BANNER_ROUTE,
    details: (id) => `${BOTTOM_BANNER_ROUTE}/${id}`,
    deletes: (id) => `${BOTTOM_BANNER_ROUTE}/${id}`,
  },
  pages: {
    list: PAGES_ROUTE,
    create: PAGES_ROUTE,
    details: (id) => `${PAGES_ROUTE}/${id}`,
  },
  aboutus: {
    list: ABOUTUS_ROUTE,
    create: ABOUTUS_ROUTE,
    details: ABOUTUS_ROUTE,
  },
  deliverable: {
    list: DELIVERABLE_ROUTE,
    create: DELIVERABLE_ROUTE,
    details: DELIVERABLE_ROUTE,
  },
  homepage: {
    list: HOME_ROUTE,
    create: HOME_ROUTE,
    details: (id) => `${HOME_ROUTE}/?id=${id}`,
    deletes: (id) => `${HOME_ROUTE}?ids=${id}`,
  },
  // rewards: {
  //   list: REWARDS_ROUTE,
  //   create: REWARDS_ROUTE,
  //   details: (id) => `${REWARDS_ROUTE}/?id=${id}`,
  //   deletes: (id) => `${REWARDS_ROUTE}?ids=${id}`,
  // },
  size: {
    list: SIZE_ROUTE,
    create: SIZE_ROUTE,
    details: (id) => `${SIZE_ROUTE}/${id}`,
    deletes: (id) => `${SIZE_ROUTE}/${id}`,
  },
};
