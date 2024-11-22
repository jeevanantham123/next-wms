// queries/getProductSiteData.js
import { gql } from '@apollo/client';
export const GET_PRODUCT_SITE_DATA = gql`
query GetUserReadingData($offset: Int!, $count: Int!) {
  get_user_reading_data(offset: $offset, count: $count) {
    StatusCode
    message
    body {
      s_no
      uniq_id
      product
      stock_site
    }
  }
}`
// export const GET_PRODUCT_SITE_DATA = gql`
//   query GetProductSiteData($offset: Int!, $count: Int!) {
//     get_product_site_data(offset: $offset, count: $count) {
//       StatusCode
//       message
//       body {
//         s_no
//         uniq_id
//         product
//         stock_site
//         blocked_for_count
//         count_in_progress
//         abc_class
//         location_management
//         stock_withdrawl_mode
//         count_mode
//         trend_profile
//         coverage
//         multilevel
//         quality_control
//         firm_horizon
//         firm_horizon_time_un
//         demand_horizon
//         time_unit_outside_of_dem
//         reorder_lt
//         production_lead_time
//         picking
//         reduction_factor
//         reorder_mode
//         reorder_frequency
//         suggestion_type
//         reorder_site
//         reorder_policy
//         safety_stock
//         calculated_safety_stock
//         reorder_threshold
//         calcualted_rop
//         maximum_stock
//         calculated_max_stock
//         eoq
//         calculated_eoq
//         technical_lot
//         shrinkage_percentage
//         planner
//         buyer
//         movement_type
//         overhead
//         include_lower_level_ovrh
//         standard_cost_update
//         revised_std_cost_update
//         budgeted_std_cost_update
//         simualted_cost_update
//         production_routing
//         cost
//         rccp
//         mf_code
//         code
//         r_code
//         release_if_shortage
//         shrink_with_release
//         last_monthly_close2
//         last_monthly_close1
//         last_annual_close
//         automatic_closing_per
//         journal_number_config
//         storage
//         access_code
//         method_of_correction
//         weighing_tolerance_pos_per
//         weighing_tolerance_neg_per
//         valuation_method
//         prorata_qty_adjust
//         location_no
//         default_icon_type
//         default_locations
//         wip_protect
//         packaging
//         packaging_capacity
//         stock_management
//         rule
//         stock_detail
//         qc_management
//         technical_sheet
//         quality_access_code
//         frequency
//         number_entries
//         sampling
//         sampling_mode
//         general_level
//         aql
//         process_frequency
//         entries_process
//         recontrol_lead_time
//         rectrl_time_unit
//         recontrol_status
//         ubd_coefficient
//         recontrol_record
//         order_warehouse
//         wo_warehouse
//         shipping_warehouse
//         cons_wareh
//         internal_mvt_wareh
//         sub_ctrt_ship_wareh
//         sb_c_cons_warehouse
//         packing
//         export_number
//         date_created
//         creation_user
//         change_time
//         change_user
//         region_state
//         freight_class
//         nmfc
//         valuation_method_his
//         created_date_time
//         updated_date_time
//         serial_detail
//         component_seq_ctrl
//         container_management
//         stock_for_project
//         container
//         packing_unit
//         no_of_containers
//         default_container
//         fdma_not_applicable
//         product_type
//         environment
//       }
//     }
//   }
// `;
