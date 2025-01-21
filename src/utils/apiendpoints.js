import axios from 'axios';

const apiUrlCRM = process.env.NEXT_PUBLIC_API_URL_CRM;

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const assetsPath = process.env.NEXT_PUBLIC_IMAGE_API_URL;

// ROUTES
export const LOGIN_ROUTE = `${apiUrl}/users/adminlogin`;
export const AUTH_ROUTE = `${apiUrl}/users/admin-verifytoken`;

// PRODUCT CATEGORY MODULE
export const CATEGORY_ROUTE = `${apiUrl}/product-category`;

// PRODUCT SUBCATEGORY MODULE
export const SUBCATEGORY_ROUTE = `${apiUrl}/product-subcategory`;

// PRODUCT COLOR MODULE
export const COLOR_ROUTE = `${apiUrl}/product-colors`;

// PRODUCT SIZE MODULE
export const SIZE_ROUTE = `${apiUrl}/product-size`;

// PRODUCT MATERIAL MODULE
export const MATERIAL_ROUTE = `${apiUrl}/product-materials`;

// PRODUCT MATERIAL MODULE
export const TYPE_ROUTE = `${apiUrl}/product-type`;

// PRODUCT TAG MODULE
export const TAG_ROUTE = `${apiUrl}/product-tag`;

// FOOD PLACE MODULE
export const FOOD_PLACE_ROUTE = `${apiUrl}/food-place`;

// FOOD Type MODULE
export const FOOD_TYPE_ROUTE = `${apiUrl}/food-type`;

// POPULAR DISHES MODULE
export const POPULAR_DISHES_ROUTE = `${apiUrl}/popular-dishes`;

// CHALLANGES MODULE
export const CHALLANGES_ROUTE = `${apiUrl}/challenges`;

// ACTIVITY MODULE
export const ACTIVITY_ROUTE = `${apiUrl}/activities`;
export const ACTIVITY_IMG_REMOVE = `${apiUrl}/activities/image`;

// ACTIVITY CATEGORY MODULE
export const ACTIVITY_CATEGORY_ROUTE = `${apiUrl}/activitycategory`;

// PRODUCT MODULE
export const PRODUCT_ROUTE = `${apiUrl}/products`;

// BLOG MODULE
export const BLOG_ROUTE = `${apiUrl}/blog`;

// BLOG CATEGORY ROUTE
export const BLOG_CATEGORY_ROUTE = `${apiUrl}/blog-category`;

// BLOG TAGS ROUTE
export const BLOG_TAGS_ROUTE = `${apiUrl}/blog-tags`;

// BLOG COMMENT ROUTE
export const BLOG_COMMENT_ROUTE = `${apiUrl}/blog-comments`;

// SOCIALMEDIA MODULE
export const SOCIAL_MEDIA = `${apiUrl}/socials`;

// BANNER MODULE
export const BANNER_ROUTE = `${apiUrl}/banner/top`;

// LEFT BOTTOM BANNER MODULE
export const BOTTOM_BANNER_LEFT_ROUTE = `${apiUrl}/banner/1`;
export const BOTTOM_BANNER_CENTER_ROUTE = `${apiUrl}/banner/2`;
export const BOTTOM_BANNER_RIGHT_ROUTE = `${apiUrl}/banner/3`;
export const BOTTOM_BANNER_ROUTE = `${apiUrl}/banner`;

// EVENT MODULE
export const EVENT_ROUTE = `${apiUrl}/events`;

// EVENT VIDEO MODULE
export const EVENT_VIDEO_ROUTE = `${apiUrl}/events/eventvideo`;

// EVENT CATEGORY MODULE
export const EVENT_CATEGORY_ROUTE = `${apiUrl}/eventcategory`;

// EVENT SPEAKER MODULE
export const EVENT_SPEAKER_ROUTE = `${apiUrl}/eventspeaker`;

// ORDER HISTORY MODULE
export const ORDER_HISTORY_ROUTE = `${apiUrl}/orders`;
export const ORDER_STATUS_ROUTE = `${apiUrl}/orders`;

// FAQ MODULE
export const FAQ_ROUTE = `${apiUrl}/faqs`;

// DASHBOARD MODULE
export const DASHBOARD_ROUTE = `${apiUrl}/admin/count`;

// CONTACT INQUIRY MODULE
export const CONTACT_INQUIRY = `${apiUrl}/contact-inquiry`;

// CONTACT US
export const CONTACT_US = `${apiUrl}/contactus`;

// DETAILS US
export const DELIVERY_DETAILS = `${apiUrl}/deliverydetails`;

// BRAND PARNTER US
export const BRAND_PARTNER = `${apiUrl}/brandpartner`;

// PAGES MODULE
export const PAGES_ROUTE = `${apiUrl}/pages`;

// ABOUTUS MODULE
export const ABOUTUS_ROUTE = `${apiUrl}/aboutus`;

// DELIVERABLE MODULE
export const DELIVERABLE_ROUTE = `${apiUrl}/deliverable`;

// HOME MODULE
export const HOME_ROUTE = `${apiUrl}/home`;

// USER MODULE
export const USERS_ROUTE = `${apiUrl}/users`;

// COUNTRY MODULE
export const COUNTRY_ROUTE = `${apiUrl}/countries`;

// CHANGE PASSWORD
const CHANGE_PASSWORD = `${apiUrl}/users/changepassword`;

// USER PROFILE
export const PROFILE_UPDATE = `${apiUrl}/users`;

// FETCH PROFILE
export const FETCH_PROFILE = `${apiUrl}/users`;

export const ChangePassword = async (data, token) => {
  try {
    const response = await axios.put(`${CHANGE_PASSWORD}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error update property:', error);
    return null;
  }
};

export const UpdateProfile = async (data, token) => {
  const response = await axios.put(`${PROFILE_UPDATE}/${15}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};

export const FetchProfile = async (token) => {
  const response = await axios.get(`${FETCH_PROFILE}/${15}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};
