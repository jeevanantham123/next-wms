import { gql } from '@urql/next';
export const GET_USER_DATA = gql`
  query GetUserReadingData($offset: Int!, $count: Int!) {
    get_user_reading_data(offset: $offset, count: $count) {
      StatusCode
      message
      body {
        code
        nom_name
        email_address
        status
        active
      }
    }
  }
`;

export const GET_PRODUCT_SITE_DATA = gql`
  query GetProductSiteData($offset: Int!, $count: Int!) {
    get_product_site_data(offset: $offset, count: $count){
    StatusCode
    message
      body {
      s_no
      uniq_id
      product
      }
   }
  }
`;

export const GET_ADMIN_MODULES= gql`
query GetAdminModules($email: String!) {
  get_modules(email: $email){
  StatusCode
  body
  message
}
}
`;

export const GET_ADMIN_TRANSACTIONS= gql`
query GetAdminTransactions($email: String!) {
  get_transactions(email: $email){
  StatusCode
  body
  message
}
}
`;