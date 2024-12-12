import { gql } from "@urql/next";
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
    get_product_site_data(offset: $offset, count: $count) {
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
export const GET_ADMIN_USERS_LIST = gql`
  query GetUsersList($adminUserMail: String!) {
    get_users_list(admin_user_mail: $adminUserMail) {
      StatusCode
      message
      body
    }
  }
`;

export const GET_ADMIN_USER = gql`
  query GetUserDetail($admin_user_mail: String!, $user_mail: String!) {
    get_user_details(admin_user_mail: $admin_user_mail, user_mail: $user_mail) {
      StatusCode
      message
      body
    }
  }
`;

export const GET_GLOBAL_VALUES = gql`
  query GetGlobalValues($admin_user_mail: String!) {
    get_all_global_values(admin_user_mail: $admin_user_mail) {
      StatusCode
      message
      body
    }
  }
`;

export const GET_ADMIN_MODULES = gql`
  query GetAdminModules($email: String!) {
    get_modules(email: $email) {
      StatusCode
      body
      message
    }
  }
`;

export const GET_ADMIN_TRANSACTIONS = gql`
  query GetAdminTransactions($email: String!) {
    get_transactions(email: $email) {
      StatusCode
      body
      message
    }
  }
`;

export const GET_ADMIN_COMPANIES = gql`
  query GetAdminCompanies($offset: Int!, $count: Int!) {
    get_all_companies(offset: $offset, count: $count) {
      StatusCode
      body
      message
    }
  }
`;

export const GET_ADMIN_ROLES = gql`
  query GetAdminRoles($user_mail: String!) {
    get_all_available_roles(user_email: $user_mail) {
      StatusCode
      body
      message
    }
  }
`;

export const GET_ADMIN_MODULES_AND_TRANSACTION = gql`
  query GetAdminModuleTransaction($user_mail: String!) {
    get_all_modules_and_transactions(email: $user_mail) {
      StatusCode
      body
      message
    }
  }
`;
