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
                title: t('Category'),
                path: paths.dashboard.category.root,
                icon: ICONS.category,
                children: [
                  { title: t('list'), path: paths.dashboard.category.list },
                  { title: t('create'), path: paths.dashboard.category.new },
                ],
              },
              {
                title: t('SubCategory'),
                path: paths.dashboard.subcategory.root,
                icon: ICONS.subcategory,
                children: [
                  { title: t('list'), path: paths.dashboard.subcategory.list },
                  { title: t('create'), path: paths.dashboard.subcategory.new },
                ],
              },
              {
                title: t('Color'),
                path: paths.dashboard.color.root,
                icon: ICONS.color,
                children: [
                  { title: t('list'), path: paths.dashboard.color.list },
                  { title: t('create'), path: paths.dashboard.color.new },
                ],
              },
              {
                title: t('Size'),
                path: paths.dashboard.size.root,
                icon: ICONS.size,
                children: [
                  { title: t('list'), path: paths.dashboard.size.list },
                  { title: t('create'), path: paths.dashboard.size.new },
                ],
              },
              {
                title: t('Material'),
                path: paths.dashboard.material.root,
                icon: ICONS.material,
                children: [
                  { title: t('list'), path: paths.dashboard.material.list },
                  { title: t('create'), path: paths.dashboard.material.new },
                ],
              },
              {
                title: t('Type'),
                path: paths.dashboard.type.root,
                icon: ICONS.type,
                children: [
                  { title: t('list'), path: paths.dashboard.type.list },
                  { title: t('create'), path: paths.dashboard.type.new },
                ],
              },
              {
                title: t('Tag'),
                path: paths.dashboard.tag.root,
                icon: ICONS.type,
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
                icon: ICONS.category,
                children: [
                  { title: t('list'), path: paths.dashboard.blog.blogcategory.list },
                  { title: t('create'), path: paths.dashboard.blog.blogcategory.new },
                ],
              },
              {
                title: t('Tags'),
                path: paths.dashboard.blog.blogtags.root,
                icon: ICONS.tags,
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
            title: t('Social links'),
            path: paths.dashboard.socialmedia.root,
            icon: ICONS.sociallinks,
            children: [
              { title: t('list'), path: paths.dashboard.socialmedia.list },
              { title: t('create'), path: paths.dashboard.socialmedia.new },
            ],
          },
          {
            title: t('Pages'),
            path: paths.dashboard.pages.root,
            icon: ICONS.pages,
            children: [{ title: t('list'), path: paths.dashboard.pages.list }],
          },
          {
            title: t('FAQ'),
            path: paths.dashboard.faq.root,
            icon: ICONS.sociallinks,
            children: [
              { title: t('list'), path: paths.dashboard.faq.list },
              { title: t('create'), path: paths.dashboard.faq.new },
            ],
          },
          {
            title: t('Contact Inquiry'),
            path: paths.dashboard.inquiry.root,
            icon: ICONS.sociallinks,
            children: [
              { title: t('list'), path: paths.dashboard.inquiry.list },
              { title: t('create'), path: paths.dashboard.inquiry.new },
            ],
          },
          {
            title: t('Contact Us'),
            path: paths.dashboard.contact.root,
            icon: ICONS.pages,
            children: [{ title: t('list'), path: paths.dashboard.contact.list }],
          },
          {
            title: t('About Us'),
            path: paths.dashboard.aboutus.root,
            icon: ICONS.pages,
            children: [{ title: t('list'), path: paths.dashboard.aboutus.list }],
          },
          {
            title: t('brands partner'),
            path: paths.dashboard.brandpartner.root,
            icon: ICONS.pages,
            children: [{ title: t('list'), path: paths.dashboard.brandpartner.list }],
          },
          {
            title: t('Manage deliverables'),
            path: paths.dashboard.deliverable.root,
            icon: ICONS.pages,
            children: [{ title: t('list'), path: paths.dashboard.deliverable.list }],
          },
          {
            title: t('Delivery Details'),
            path: paths.dashboard.deliverydetails.root,
            icon: ICONS.pages,
            children: [{ title: t('list'), path: paths.dashboard.deliverydetails.list }],
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
