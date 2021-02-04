const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {
  MultiMatchQuery,
  SearchkitResolvers,
  SearchkitSchema,
  RefinementSelectFacet,
  RangeFacet
} = require('@searchkit/schema')

const searchkitConfig = {
//  host: "http://192.168.1.110:19200",
  host: "http://192.168.0.187:19200",
  index: 'esbootstrapdata-pam-withrest_prod',
  hits: {
    fields: []
  },
  query: new MultiMatchQuery({ fields: ['all_fields_for_freetext'] }),
  facets: [
    new RefinementSelectFacet({ field: 'Country', identifier: 'country', label: 'Country', multipleSelect: false, size:1000}),
    new RefinementSelectFacet({ field: 'Single_policy_or_measure__or_group_of_measures', identifier: 'Single_policy_or_measure__or_group_of_measures', label: 'Single policy or measure, or group of measures', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'GHG_s__affected', identifier: 'GHG_s__affected', label: 'GHG(s) affected', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'Sector_s__affected', identifier: 'Sector_s__affected', label: 'Sector(s) affected', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'Objective_s__lookup_only4facets', identifier: 'Objective_s__lookup_only4facets', label: 'Objective(s)', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'Type_of_policy_instrument', identifier: 'Type_of_policy_instrument', label: 'Type of policy instrument', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'Status_of_implementation', identifier: 'Status_of_implementation', label: 'Status of implementation', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'Entities_responsible_for_implementing_the_policy__type_', identifier: 'Entities_responsible_for_implementing_the_policy__type_', label: 'Entities responsible for implementing the policy (type)', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'Implementation_period_start', identifier: 'Implementation_period_start', label: 'Implementation period start', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'Is_the_policy_or_measure_related_to_a_Union_policy_', identifier: 'Is_the_policy_or_measure_related_to_a_Union_policy_', label: 'Is the policy or measure related to a Union policy?', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'Union_policies_lookup_only4facets', identifier: 'Union_policies_lookup_only4facets', label: 'Union policy which resulted in the implementation of the policy or measure', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'Projection_scenario_in_which_the_policy_or_measure_is_included', identifier: 'Projection_scenario_in_which_the_policy_or_measure_is_included', label: 'Projection scenario in which the policy or measure is included', multipleSelect: false, size:1000 }),
    new RefinementSelectFacet({ field: 'Policy_impacting_EU_ETS__ESD_or_LULUCF_emissions', identifier: 'Policy_impacting_EU_ETS__ESD_or_LULUCF_emissions', label: 'Policy impacting EU ETS, ESD or LULUCF emissions', multipleSelect: false, size:1000 }),
    new RangeFacet({ field: 'Total_GHG_emissions_reductions_in_2020__kt_CO2eq_y_', identifier: 'Total_GHG_emissions_reductions_in_2020__kt_CO2eq_y_', label: 'Total GHG emissions reductions in 2020 (kt CO2eq/y)', range:{min:-1000, max:120000,interval:100}}),
    new RangeFacet({ field: 'Total_GHG_emissions_reductions_in_2030__kt_CO2eq_y_', identifier: 'Total_GHG_emissions_reductions_in_2030__kt_CO2eq_y_', label: 'Total GHG emissions reductions in 2030 (kt CO2eq/y)' , range:{min:-500, max:150000,interval:100}})
  ]
}

const { typeDefs, withSearchkitResolvers, context } = SearchkitSchema({
  config: searchkitConfig,
  typeName: 'ResultSet', 
  hitTypeName: 'ResultHit',
  addToQueryType: true 
})

const config = {
  api: {
    bodyParser: false
  }
}

const server = new ApolloServer({
  typeDefs: [
    gql`
    type Query {
      root: String
    }

    type HitFields {
      Country: String,
      Report_ID_ES: String,
      Name_of_policy_or_measure: String,
      Single_policy_or_measure__or_group_of_measures: String,
      Report_ID: String,
      ID_of_policy_or_measure: String,
      Policies_or_measures_included_in_the_group: String,
      Type_of_policy_instrument: String,
      Status_of_implementation: String,
      Policy_impacting_EU_ETS__ESD_or_LULUCF_emissions: String,
      Sector_s__affected: String,
      Objective_s_: String,
      Objective_s__lookup_only4facets: String,
      Total_GHG_emissions_reductions_in_2020__kt_CO2eq_y_: String,
      Total_GHG_emissions_reductions_in_2030__kt_CO2eq_y_: String,
      Entities_responsible_for_implementing_the_policy__type_: String,
      Entities_responsible_for_implementing_the_policy: String,
      Implementation_period_start: String,
      Is_the_policy_or_measure_related_to_a_Union_policy_: String,
      Related_Union_Policy: String,
      Union_policies_lookup_only4facets: String,
      GHG_s__affected: String,
      Projection_scenario_in_which_the_policy_or_measure_is_included: String,
      Link_to_national_report: String,
      Description: String,
      Quantified_objective: String,
      Implementation_period_finish: String,
      Indicator_used_to_monitor_and_evaluate_progress_over_time: String,
      General_comment: String,
      Main_reference: String,
      URL_to_main_reference: String,
      GHG_emissions_reductions_EU_ETS_in_2020__kt_CO2eq_y_: String,
      GHG_emissions_reductions_ESD_in_2020__kt_CO2eq_y_: String,
      GHG_emissions_reductions_EU_ETS_in_2025__kt_CO2eq_y_: String,
      GHG_emissions_reductions_ESD_in_2025__kt_CO2eq_y_: String,
      Total_GHG_emissions_reductions_in_2025__kt_CO2eq_y_: String,
      GHG_emissions_reductions_EU_ETS_in_2030__kt_CO2eq_y_: String,
      GHG_emissions_reductions_ESD_in_2030__kt_CO2eq_y_: String,
      GHG_emissions_reductions_EU_ETS_in_2035__kt_CO2eq_y_: String,
      GHG_emissions_reductions_ESD_in_2035__kt_CO2eq_y_: String,
      Total_GHG_emissions_reductions_in_2035__kt_CO2eq_y_: String,
      Reference_for_ex_ante_assessment: String,
      Web_link_for_ex_ante_assessment: String,
      Year_for_which_reduction_applies__ex_post_: String,
      Average_ex_post_emission_reduction__kt_CO2eq_y_: String,
      Explanation_of_the_basis_for_the_mitigation_estimates: String,
      Factors_affected_by_the_policy_or_measure: String,
      Reference_for_ex_post_assessment: String,
      Web_link_for_ex_post_assessment: String,
      Projected_costs__EUR_per_tonne_CO2eq_reduced__sequestered_: String,
      Projected_absolute_costs_per_year__EUR_: String,
      Year_projected_cost_has_been_calculated_for: String,
      Price_reference_year__projected_costs_: String,
      Projected_benefits__EUR_per_tonne_CO2eq_reduced__sequestered_: String,
      Projected_absolute_benefit_per_year__EUR_: String,
      Projected_net_costs__EUR_per_tonne_CO2eq_reduced__sequestered_: String,
      Projected_net_cost_per_year__EUR_: String,
      Description_of_projected_cost_estimates: String,
      Reference_for_projected_costs_and_benefits: String,
      Web_link_for_projected_costs_and_benefits: String,
      Realised_costs___EUR_per_tonne_CO2eq_reduced__sequestered_: String,
      Realised_absolute_costs_per_year__EUR_: String,
      Year_realised_cost_has_been_calculated_for: String,
      Price_reference_year__realised_costs_: String,
      Realised_benefits__EUR_per_tonne_CO2eq_reduced__sequestered_: String,
      Realised_absolute_benefit_per_year__EUR_: String,
      Realised_net_costs__EUR_per_tonne_CO2eq_reduced__sequestered_: String,
      Realised_net_cost_per_year__EUR_: String,
      Description_of_realised_cost_estimates: String,
      Reference_for_realised_costs_and_benefits: String,
      Web_link_for_realised_costs_and_benefits: String
    }

    type ResultHit implements SKHit {
      id: ID!
      fields: HitFields
    }
  `, ...typeDefs
  ],
  resolvers: withSearchkitResolvers({}),
  introspection: true,
  playground: true,
  context: {
    ...context
  }
})


const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
