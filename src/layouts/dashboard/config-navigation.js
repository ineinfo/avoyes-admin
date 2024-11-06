import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  product: icon('ic_product'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  role: icon('ic_roles'),
  amenity: icon('ic_amenity'),
  property: icon('ic_property'),
  clients: icon('ic_clients'),
  leads: icon('ic_leads'),
  propertylogo: icon('ic_properties'),
  category: icon('ic_category'),
  subcategory: icon('ic_subcategory'),
  brand: icon('ic_brand'),
  sociallinks: icon('ic_sociallinks'),
  pages: icon('ic_pages'),
  home: icon('ic_home'),
  review: icon('ic_review'),
  advertisement: icon('ic_advertisement'),
  setting: icon('ic_setting'),
  rewards: icon('ic_rewards'),
  color: icon('ic_color'),
  size: icon('ic_size'),
  material: icon('ic_material'),
  type: icon('ic_type'),
  tags: icon('ic_tags'),
  comment: icon('ic_comment'),
  inquiry: icon('ic_inquiry'),
  about: icon('ic_about'),
  contact: icon('ic_contact'),
  faq: icon('ic_faq'),
  event: icon('ic_event'),
  foodplace: icon('ic_foodplace'),
  foodtype: icon('ic_foodtype'),
  populardishes: icon('ic_populardishes'),
  challanges: icon('ic_challanges'),
  eventspeakar: icon('ic_eventspeakar'),
  eventcategory: icon('ic_eventcategory'),
  activity: icon('ic_activity'),
  activitycategory: icon('ic_activitycategory'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      {
        subheader: t('overview'),
        items: [
          {
            title: t('Dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
        ],
      },
      {
        subheader: t('management'),
        items: [
          {
            title: t('Raw masters'),
            icon: ICONS.blank,
            path: [
              paths.dashboard.category.root,
              paths.dashboard.category.new,
              paths.dashboard.subcategory.root,
              paths.dashboard.subcategory.new,
              paths.dashboard.size.root,
              paths.dashboard.size.new,
              paths.dashboard.material.root,
              paths.dashboard.material.new,
              paths.dashboard.type.root,
              paths.dashboard.type.new,
            ],
            children: [
              {
                title: t('Product Category'),
                path: paths.dashboard.category.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.category.list },
                  { title: t('create'), path: paths.dashboard.category.new },
                ],
              },
              {
                title: t('Product SubCategory'),
                path: paths.dashboard.subcategory.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.subcategory.list },
                  { title: t('create'), path: paths.dashboard.subcategory.new },
                ],
              },
              {
                title: t('Product Color'),
                path: paths.dashboard.color.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.color.list },
                  { title: t('create'), path: paths.dashboard.color.new },
                ],
              },
              {
                title: t('Product Size'),
                path: paths.dashboard.size.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.size.list },
                  { title: t('create'), path: paths.dashboard.size.new },
                ],
              },
              {
                title: t('Product Material'),
                path: paths.dashboard.material.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.material.list },
                  { title: t('create'), path: paths.dashboard.material.new },
                ],
              },
              {
                title: t('Product Type'),
                path: paths.dashboard.type.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.type.list },
                  { title: t('create'), path: paths.dashboard.type.new },
                ],
              },
              {
                title: t('Product Tag'),
                path: paths.dashboard.tag.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.tag.list },
                  { title: t('create'), path: paths.dashboard.tag.new },
                ],
              },
            ],
          },
          {
            title: t('Blog'),
            path: paths.dashboard.blog.root,
            icon: ICONS.blog,
            children: [
              {
                title: t('Category'),
                path: paths.dashboard.blog.blogcategory.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.blog.blogcategory.list },
                  { title: t('create'), path: paths.dashboard.blog.blogcategory.new },
                ],
              },
              {
                title: t('Tags'),
                path: paths.dashboard.blog.blogtags.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.blog.blogtags.list },
                  { title: t('create'), path: paths.dashboard.blog.blogtags.new },
                ],
              },
              // {
              //   title: t('Comments'),
              //   path: paths.dashboard.blog.blogcomment.root,
              //   icon: ICONS.category,
              //   children: [
              //     { title: t('list'), path: paths.dashboard.blog.blogcomment.list },
              //     { title: t('create'), path: paths.dashboard.blog.blogcomment.new },
              //   ],
              // },
              {
                title: t('list'),
                path: paths.dashboard.blog.list,
              },
              {
                title: t('create'),
                path: paths.dashboard.blog.new,
              },
            ],
          },
          {
            title: t('Product'),
            path: paths.dashboard.product.root,
            icon: ICONS.product,
            children: [
              { title: t('list'), path: paths.dashboard.product.list },
              { title: t('create'), path: paths.dashboard.product.new },
            ],
          },

          {
            title: t('Event Category'),
            path: paths.dashboard.eventcategory.root,
            icon: ICONS.eventcategory,
            children: [
              { title: t('list'), path: paths.dashboard.eventcategory.list },
              { title: t('create'), path: paths.dashboard.eventcategory.new },
            ],
          },
          {
            title: t('Event Speaker'),
            path: paths.dashboard.eventspeaker.root,
            icon: ICONS.eventspeakar,
            children: [
              { title: t('list'), path: paths.dashboard.eventspeaker.list },
              { title: t('create'), path: paths.dashboard.eventspeaker.new },
            ],
          },
          {
            title: t('Event Video'),
            path: paths.dashboard.eventvideo.root,
            icon: ICONS.tour,
            children: [{ title: t('list'), path: paths.dashboard.eventvideo.list }],
          },
          {
            title: t('Event'),
            path: paths.dashboard.event.root,
            icon: ICONS.event,
            children: [
              { title: t('list'), path: paths.dashboard.event.list },
              { title: t('create'), path: paths.dashboard.event.new },
            ],
          },

          {
            title: t('Order Details'),
            path: paths.dashboard.orderhistory.root,
            icon: ICONS.order,
            children: [{ title: t('list'), path: paths.dashboard.orderhistory.list }],
          },
          {
            title: t('Food Type'),
            path: paths.dashboard.foodtype.root,
            icon: ICONS.foodtype,
            children: [
              { title: t('list'), path: paths.dashboard.foodtype.list },
              { title: t('create'), path: paths.dashboard.foodtype.new },
            ],
          },
          {
            title: t('Food place'),
            path: paths.dashboard.foodplace.root,
            icon: ICONS.foodplace,
            children: [
              { title: t('list'), path: paths.dashboard.foodplace.list },
              { title: t('create'), path: paths.dashboard.foodplace.new },
            ],
          },
          {
            title: t('Popular dishes'),
            path: paths.dashboard.populardishes.root,
            icon: ICONS.populardishes,
            children: [
              { title: t('list'), path: paths.dashboard.populardishes.list },
              { title: t('create'), path: paths.dashboard.populardishes.new },
            ],
          },
          {
            title: t('Challanges'),
            path: paths.dashboard.challenges.root,
            icon: ICONS.blog,
            children: [
              { title: t('list'), path: paths.dashboard.challenges.list },
              { title: t('create'), path: paths.dashboard.challenges.new },
            ],
          },
          {
            title: t('Activity'),
            path: paths.dashboard.activity.root,
            icon: ICONS.activity,
            children: [
              { title: t('list'), path: paths.dashboard.activity.list },
              { title: t('create'), path: paths.dashboard.activity.new },
            ],
          },
          {
            title: t('Activity Category'),
            path: paths.dashboard.activitycategory.root,
            icon: ICONS.activitycategory,
            children: [
              { title: t('list'), path: paths.dashboard.activitycategory.list },
              { title: t('create'), path: paths.dashboard.activitycategory.new },
            ],
          },
          {
            title: t('Banners'),
            icon: ICONS.file,
            path: [paths.dashboard.category.root],
            children: [
              {
                title: t('Top Banner'),
                path: paths.dashboard.topbanner.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.topbanner.list },
                  { title: t('create'), path: paths.dashboard.topbanner.new },
                ],
              },
              {
                title: t('Bottom Banner'),
                path: paths.dashboard.bottombanner.root,
                icon: ICONS.amenity,
                children: [
                  { title: t('list'), path: paths.dashboard.bottombanner.list },
                  // { title: t('create'), path: paths.dashboard.bottombanner.new },
                ],
              },
            ],
          },
          {
            title: t('Pages'),
            path: paths.dashboard.pages.root,
            icon: ICONS.pages,
            children: [{ title: t('list'), path: paths.dashboard.pages.list }],
          },
          {
            title: t('Social links'),
            path: paths.dashboard.socialmedia.root,
            icon: ICONS.sociallinks,
            children: [
              { title: t('list'), path: paths.dashboard.socialmedia.list },
              { title: t('create'), path: paths.dashboard.socialmedia.new },
            ],
          },
          {
            title: t('FAQ'),
            path: paths.dashboard.faq.root,
            icon: ICONS.faq,
            children: [
              { title: t('list'), path: paths.dashboard.faq.list },
              { title: t('create'), path: paths.dashboard.faq.new },
            ],
          },
          {
            title: t('Contact Inquiry'),
            path: paths.dashboard.inquiry.root,
            icon: ICONS.inquiry,
            children: [
              { title: t('list'), path: paths.dashboard.inquiry.list },
              { title: t('create'), path: paths.dashboard.inquiry.new },
            ],
          },
          {
            title: t('Contact Us'),
            path: paths.dashboard.contact.root,
            icon: ICONS.contact,
            children: [{ title: t('list'), path: paths.dashboard.contact.list }],
          },
          {
            title: t('About Us'),
            path: paths.dashboard.aboutus.root,
            icon: ICONS.about,
            children: [{ title: t('list'), path: paths.dashboard.aboutus.list }],
          },
          {
            title: t('Setting'),
            path: paths.dashboard.setting.root,
            icon: ICONS.setting,
            children: [
              { title: t('profile'), path: paths.dashboard.setting.profile },
              { title: t('Change Password'), path: paths.dashboard.setting.changepassword },
            ],
          },
         
        ],
      },
    ],
    [t]
  );

  return data;
}
