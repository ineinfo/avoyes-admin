import axios from 'axios';

const apiUrlCRM = process.env.NEXT_PUBLIC_API_URL_CRM;

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const assetsPath = process.env.NEXT_PUBLIC_IMAGE_API_URL;

// ROUTES
export const LOGIN_ROUTE = `${apiUrl}/users/adminlogin`;
export const AUTH_ROUTE = `${apiUrl}/users/admin-verifytoken`;

// RAW MASTER ENDPOINT
export const ROLES_ROUTE = `${apiUrlCRM}/roles`;
export const AMENITIES_ROUTE = `${apiUrlCRM}/amenities`;
export const PROPERTY_TYPE_ROUTE = `${apiUrlCRM}/propertytype`;

// CATEGORY MODULE
export const CATEGORY_ROUTE = `${apiUrl}/product-category`;

// PRODUCT MODULE
export const PRODUCT_ROUTE = `${apiUrl}/products`

// BLOG MODULE
export const BLOG_ROUTE = `${apiUrl}/blog`;

// BLOG CATEGORY ROUTE
export const BLOG_CATEGORY_ROUTE = `${apiUrl}/blog-category`;

// BLOG TAGS ROUTE
export const BLOG_TAGS_ROUTE = `${apiUrl}/blog-tags`;

// BLOG COMMENT ROUTE
export const BLOG_COMMENT_ROUTE = `${apiUrl}/blog-comments`;

// SUBCATEGORY MODULE
export const SUBCATEGORY_ROUTE = `${apiUrl}/product-subcategory`;

// COLOR MODULE
export const COLOR_ROUTE = `${apiUrl}/product-colors`;

// SIZE MODULE
export const SIZE_ROUTE = `${apiUrl}/product-size`;

// MATERIAL MODULE
export const MATERIAL_ROUTE = `${apiUrl}/product-materials`;

// MATERIAL MODULE
export const TYPE_ROUTE = `${apiUrl}/product-type`;

// TAG MODULE
export const TAG_ROUTE = `${apiUrl}/product-tag`;

// SOCIALMEDIA MODULE
export const SOCIAL_MEDIA = `${apiUrl}/socials`;

// FAQ MODULE
export const FAQ_ROUTE = `${apiUrl}/faqs`;

// DASHBOARD MODULE
export const DASHBOARD_ROUTE = `${apiUrl}/admin/count`

// CONTACT INQUIRY MODULE
export const CONTACT_INQUIRY = `${apiUrl}/contact-inquiry`;

// CONTACT US
export const CONTACT_US = `${apiUrl}/contactus`

// DETAILS US
export const DELIVERY_DETAILS = `${apiUrl}/deliverydetails`

// BRAND PARNTER US
export const BRAND_PARTNER = `${apiUrl}/brandpartner`

// PAGES MODULE
export const PAGES_ROUTE = `${apiUrl}/pages`;

// ABOUTUS MODULE
export const ABOUTUS_ROUTE = `${apiUrl}/aboutus`;

// DELIVERABLE MODULE
export const DELIVERABLE_ROUTE = `${apiUrl}/deliverable`;

// HOME MODULE
export const HOME_ROUTE = `${apiUrl}/home`;

// REVIEW MODULE
export const REVIEW_ROUTE = `${apiUrl}/reviews`;

// USER MODULE
export const USERS_ROUTE = `${apiUrl}/users`;

// ADVERTISEMENT MODULE
export const ADVERTISEMENT_ROUTE = `${apiUrl}/advertisements`;
export const ADVERTISEMENT_RECORD_STATUS = `${apiUrl}/advertisements/record_status`;

// OTHERS MODULE
export const CITY_ROUTE = `${apiUrl}/others/cities`;
export const STATE_ROUTE = `${apiUrl}/others/states`;
export const COUTNRY_ROUTE = `${apiUrl}/others/countries`;

// PROPERTY MASTER
export const PROPERTIES_ROUTE = `${apiUrl}/properties`;

// CHANGE PASSWORD
const CHANGE_PASSWORD = `${apiUrl}/users/changepassword`;

// USER PROFILE
export const PROFILE_UPDATE = `${apiUrl}/users`;

// FETCH PROFILE
export const FETCH_PROFILE = `${apiUrl}/users`;


export const ChangePassword = async (data,token) => {
  try {
  const response = await axios.put(`${CHANGE_PASSWORD}`, data,{
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




export const UpdateProfile = async (data) => {
  const response = await axios.put(`${PROFILE_UPDATE}?id=${3}`, data);
  return response?.data;
};

export const FetchProfile = async () => {
  const response = await axios.get(`${FETCH_PROFILE}?id=${3}`);
  return response?.data;
};
