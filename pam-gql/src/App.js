import {  gql } from '@apollo/client';
import { useSearchkitQuery } from '@searchkit/client'
import { HitsList, HitsGrid, HitsTable } from './Hits'

import {
  FacetsList,
  SearchBar,
  Pagination,
  ResetSearchButton,
  SelectedFilters
} from '@searchkit/elastic-ui'
import '@elastic/eui/dist/eui_theme_light.css'

import React, { useState } from 'react'


import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiHorizontalRule,
  EuiButtonGroup,
  EuiFlexGroup
} from '@elastic/eui'

const query = gql`
query resultSet($query: String, $filters: [SKFiltersSet], $page: SKPageInput) {
    results(query: $query, filters: $filters) {
      summary {
        total
        appliedFilters {
          id
          identifier
          display
          label
          ... on DateRangeSelectedFilter {
            dateMin
            dateMax
          }

          ... on NumericRangeSelectedFilter {
            min
            max
          }

          ... on ValueSelectedFilter {
            value
          }
        }
        query
      }
      hits(page: $page) {
        page {
          total
          totalPages
          pageNumber
          from
          size
        }
        items {
          id
          ... on ResultHit {
            fields {
              Country
              Report_ID_ES
              Name_of_policy_or_measure
              Single_policy_or_measure__or_group_of_measures
              Report_ID
              ID_of_policy_or_measure
              Policies_or_measures_included_in_the_group
              Type_of_policy_instrument
              Status_of_implementation
              Policy_impacting_EU_ETS__ESD_or_LULUCF_emissions
              Sector_s__affected
              Objective_s_
              Objective_s__lookup_only4facets
              Total_GHG_emissions_reductions_in_2020__kt_CO2eq_y_
              Total_GHG_emissions_reductions_in_2030__kt_CO2eq_y_
              Entities_responsible_for_implementing_the_policy__type_
              Entities_responsible_for_implementing_the_policy
              Implementation_period_start
              Is_the_policy_or_measure_related_to_a_Union_policy_
              Related_Union_Policy
              Union_policies_lookup_only4facets
              GHG_s__affected
              Projection_scenario_in_which_the_policy_or_measure_is_included
              Link_to_national_report
              Description
              Quantified_objective
              Implementation_period_finish
              Indicator_used_to_monitor_and_evaluate_progress_over_time
              General_comment
              Main_reference
              URL_to_main_reference
              GHG_emissions_reductions_EU_ETS_in_2020__kt_CO2eq_y_
              GHG_emissions_reductions_ESD_in_2020__kt_CO2eq_y_
              GHG_emissions_reductions_EU_ETS_in_2025__kt_CO2eq_y_
              GHG_emissions_reductions_ESD_in_2025__kt_CO2eq_y_
              Total_GHG_emissions_reductions_in_2025__kt_CO2eq_y_
              GHG_emissions_reductions_EU_ETS_in_2030__kt_CO2eq_y_
              GHG_emissions_reductions_ESD_in_2030__kt_CO2eq_y_
              GHG_emissions_reductions_EU_ETS_in_2035__kt_CO2eq_y_
              GHG_emissions_reductions_ESD_in_2035__kt_CO2eq_y_
              Total_GHG_emissions_reductions_in_2035__kt_CO2eq_y_
              Reference_for_ex_ante_assessment
              Web_link_for_ex_ante_assessment
              Year_for_which_reduction_applies__ex_post_
              Average_ex_post_emission_reduction__kt_CO2eq_y_
              Explanation_of_the_basis_for_the_mitigation_estimates
              Factors_affected_by_the_policy_or_measure
              Reference_for_ex_post_assessment
              Web_link_for_ex_post_assessment
              Projected_costs__EUR_per_tonne_CO2eq_reduced__sequestered_
              Projected_absolute_costs_per_year__EUR_
              Year_projected_cost_has_been_calculated_for
              Price_reference_year__projected_costs_
              Projected_benefits__EUR_per_tonne_CO2eq_reduced__sequestered_
              Projected_absolute_benefit_per_year__EUR_
              Projected_net_costs__EUR_per_tonne_CO2eq_reduced__sequestered_
              Projected_net_cost_per_year__EUR_
              Description_of_projected_cost_estimates
              Reference_for_projected_costs_and_benefits
              Web_link_for_projected_costs_and_benefits
              Realised_costs___EUR_per_tonne_CO2eq_reduced__sequestered_
              Realised_absolute_costs_per_year__EUR_
              Year_realised_cost_has_been_calculated_for
              Price_reference_year__realised_costs_
              Realised_benefits__EUR_per_tonne_CO2eq_reduced__sequestered_
              Realised_absolute_benefit_per_year__EUR_
              Realised_net_costs__EUR_per_tonne_CO2eq_reduced__sequestered_
              Realised_net_cost_per_year__EUR_
              Description_of_realised_cost_estimates
              Reference_for_realised_costs_and_benefits
              Web_link_for_realised_costs_and_benefits
              Projected_net_cost_per_year__EUR_
              Realised_net_cost_per_year__EUR_
            }
          }
        }
      }
      facets {
        identifier
        type
        label
        display
        entries {
          id
          label
          count
        }
      }
    }
  }
`

function App() {

  const { data, loading } = useSearchkitQuery(query)
  const [viewType, setViewType] = useState('table')
  const Facets = FacetsList([])
  return (
    <EuiPage>
      <EuiPageSideBar>
        <SearchBar loading={loading} />
        <EuiHorizontalRule margin="m" />
        <Facets data={data?.results} loading={loading} />
      </EuiPageSideBar>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <SelectedFilters data={data?.results} loading={loading} />
            </EuiTitle>
          </EuiPageHeaderSection>
          <EuiPageHeaderSection>
            <ResetSearchButton loading={loading} />
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle size="s">
                <h2>{data?.results.summary.total} Results</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection>
              <EuiButtonGroup
                legend=""
                options={[
                  {
                    id: `table`,
                    label: 'Table'
                  },
                  {
                    id: `grid`,
                    label: 'Grid'
                  },
                  {
                    id: `list`,
                    label: 'List'
                  }
                ]}
                idSelected={viewType}
                onChange={(id) => setViewType(id)}
              />
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            {viewType === 'grid' && <HitsGrid data={data} /> }
            {viewType === 'list' && <HitsList data={data} /> }
            {viewType === 'table' && <HitsTable data={data} /> }
            <EuiFlexGroup justifyContent="spaceAround">
              <Pagination data={data?.results} />
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
}

export default App;
