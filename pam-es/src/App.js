import * as _ from 'lodash';
import decorateComponentWithProps from 'decorate-component-with-props';
import extend from 'lodash/extend';
import React from 'react';
import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  RefinementListFilter,
  Pagination,
  HierarchicalMenuFilter,
  HitsStats,
  SortingSelector,
  NoHits,
  ResetFilters,
  RangeFilter,
  NumericRefinementListFilter,
  ViewSwitcherHits,
  ViewSwitcherToggle,
  DynamicRangeFilter,
  InputFilter,
  GroupedSelectedFilters,
  Layout,
  TopBar,
  LayoutBody,
  LayoutResults,
  ActionBar,
  ActionBarRow,
  SideBar,
  MenuFilter,
  FacetFilter,
} from 'searchkit';

import { Table } from 'semantic-ui-react';
import './theme.scss';

const GenericGridItem = (props) => {
  console.log('griditem props', props);
  const { bemBlocks, result } = props;
  const source = extend({}, result._source, result.highlight);
  const fieldTitle = props.data?.tile_title || 'title';
  const fieldDescription = props.data?.tile_description || 'description';
  const fieldImage = props.data?.tile_image || 'depiction';
  const fieldUrl = props.data?.tile_url || 'about';
  // const title = source[titleField];
  return (
    <div
      className={bemBlocks.item().mix(bemBlocks.container('item'))}
      data-qa="hit"
    >
      <a href={source[fieldUrl]} target="_blank" rel="noreferrer">
        {/* {source[fieldImage] && ( */}
        {/*   <img */}
        {/*     data-qa="poster" */}
        {/*     alt="presentation" */}
        {/*     className={bemBlocks.item('poster')} */}
        {/*     src={source[fieldImage]} */}
        {/*     width="170" */}
        {/*     height="240" */}
        {/*   /> */}
        {/* )} */}
        <div
          data-qa="title"
          className={bemBlocks.item('title')}
          dangerouslySetInnerHTML={{ __html: source[fieldTitle] }}
        ></div>
      </a>
    </div>
  );
};

const GenericListItem = (props) => {
  // console.log('item', props);
  const { bemBlocks, result } = props;
  let url = 'http://www.imdb.com/title/' + result._source.imdbId;
  const source = extend({}, result._source, result.highlight);
  return (
    <div
      className={bemBlocks.item().mix(bemBlocks.container('item'))}
      data-qa="hit"
    >
      <div className={bemBlocks.item('poster')}>
        {/* <img alt="presentation" data-qa="poster" src={result._source.poster} /> */}
      </div>
      <div className={bemBlocks.item('details')}>
        <a href={url} target="_blank" rel="noreferrer">
          <h2
            className={bemBlocks.item('title')}
            dangerouslySetInnerHTML={{ __html: source.title }}
          ></h2>
        </a>
        {/* <h3 className={bemBlocks.item('subtitle')}> */}
        {/*   Released in {source.year}, rated {source.imdbRating}/10 */}
        {/* </h3> */}
        {/* <div */}
        {/*   className={bemBlocks.item('text')} */}
        {/*   dangerouslySetInnerHTML={{ __html: source.plot }} */}
        {/* ></div> */}
      </div>
    </div>
  );
};
const pamFields = {
  "Country":"Country",
  "ID_of_policy_or_measure":"ID of policy or measure",
  "Report_ID_ES":"",
  "Name_of_policy_or_measure":"Name of policy or measure",
  "Single_policy_or_measure__or_group_of_measures":"Single policy or measure, or group of measures",
  "Policies_or_measures_included_in_the_group":"Policies or measures included in the group",
  "Type_of_policy_instrument":"Type of policy instrument",
  "Status_of_implementation":"Status of implementation",
  "Policy_impacting_EU_ETS__ESD_or_LULUCF_emissions":"Policy impacting EU ETS, ESD or LULUCF emissions",
  "Sector_s__affected":"Sector(s) affected",
  "Objective_s_":"Objective(s)",
  "Total_GHG_emissions_reductions_in_2020__kt_CO2eq_y_":"Total GHG emissions reductions in 2020 (kt CO2eq/y)",
  "Total_GHG_emissions_reductions_in_2030__kt_CO2eq_y_":"Total GHG emissions reductions in 2030 (kt CO2eq/y)",
  "Entities_responsible_for_implementing_the_policy":"Entities responsible for implementing the policy",
  "Implementation_period_start":"Implementation period start",
  "Is_the_policy_or_measure_related_to_a_Union_policy_":"Is the policy or measure related to a Union policy?",
  "Related_Union_Policy":"Related Union Policy",
  "GHG_s__affected":"GHG(s) affected",
  "Projection_scenario_in_which_the_policy_or_measure_is_included":"Projection scenario in which the policy or measure is included",
  "Description":"Description",
  "Quantified_objective":"Quantified objective",
  "Implementation_period_finish":"Implementation period finish",
  "Indicator_used_to_monitor_and_evaluate_progress_over_time":"Indicator used to monitor and evaluate progress over time",
  "General_comment":"General comment",
  "Main_reference":"Main reference",
  "URL_to_main_reference":"URL to main reference",
  "GHG_emissions_reductions_EU_ETS_in_2020__kt_CO2eq_y_":"GHG emissions reductions EU ETS in 2020 (kt CO2eq/y)",
  "GHG_emissions_reductions_ESD_in_2020__kt_CO2eq_y_":"GHG emissions reductions ESD in 2020 (kt CO2eq/y)",
  "GHG_emissions_reductions_EU_ETS_in_2025__kt_CO2eq_y_":"GHG emissions reductions EU ETS in 2025 (kt CO2eq/y)",
  "GHG_emissions_reductions_ESD_in_2025__kt_CO2eq_y_":"GHG emissions reductions ESD in 2025 (kt CO2eq/y)",
  "Total_GHG_emissions_reductions_in_2025__kt_CO2eq_y_":"Total GHG emissions reductions in 2025 (kt CO2eq/y)",
  "GHG_emissions_reductions_EU_ETS_in_2030__kt_CO2eq_y_":"GHG emissions reductions EU ETS in 2030 (kt CO2eq/y)",
  "GHG_emissions_reductions_ESD_in_2030__kt_CO2eq_y_":"GHG emissions reductions ESD in 2030 (kt CO2eq/y)",
  "GHG_emissions_reductions_EU_ETS_in_2035__kt_CO2eq_y_":"GHG emissions reductions EU ETS in 2035 (kt CO2eq/y)",
  "GHG_emissions_reductions_ESD_in_2035__kt_CO2eq_y_":"GHG emissions reductions ESD in 2035 (kt CO2eq/y)",
  "Total_GHG_emissions_reductions_in_2035__kt_CO2eq_y_":"Total GHG emissions reductions in 2035 (kt CO2eq/y)",
  "Reference_for_ex_ante_assessment":"Reference for ex-ante assessment",
  "Web_link_for_ex_ante_assessment":"Web link for ex-ante assessment",
  "Year_for_which_reduction_applies__ex_post_":"Year for which reduction applies (ex post)",
  "Average_ex_post_emission_reduction__kt_CO2eq_y_":"Average ex post emission reduction (kt CO2eq/y)",
  "Explanation_of_the_basis_for_the_mitigation_estimates":"Explanation of the basis for the mitigation estimates",
  "Factors_affected_by_the_policy_or_measure":"Factors affected by the policy or measure",
  "Reference_for_ex_post_assessment":"Reference for ex-post assessment",
  "Web_link_for_ex_post_assessment":"Web link for ex-post assessment",
  "Projected_costs__EUR_per_tonne_CO2eq_reduced__sequestered_":"Projected costs (EUR per tonne CO2eq reduced/ sequestered)",
  "Projected_absolute_costs_per_year__EUR_":"Projected absolute costs per year (EUR)",
  "Year_projected_cost_has_been_calculated_for":"Year projected cost has been calculated for",
  "Price_reference_year__projected_costs_":"Price reference year (projected costs)",
  "Projected_benefits__EUR_per_tonne_CO2eq_reduced__sequestered_":"Projected benefits (EUR per tonne CO2eq reduced/ sequestered)",
  "Projected_absolute_benefit_per_year__EUR_":"Projected absolute benefit per year (EUR)",
  "Projected_net_costs__EUR_per_tonne_CO2eq_reduced__sequestered_":"Projected net costs (EUR per tonne CO2eq reduced/ sequestered)",
  "Projected_net_cost_per_year__EUR_":"Projected net cost per year (EUR)",
  "Description_of_projected_cost_estimates":"Description of projected cost estimates",
  "Reference_for_projected_costs_and_benefits":"Reference for projected costs and benefits",
  "Web_link_for_projected_costs_and_benefits":"Web link for projected costs and benefits",
  "Realised_costs___EUR_per_tonne_CO2eq_reduced__sequestered_":"Realised costs (EUR per tonne CO2eq reduced/ sequestered)",
  "Realised_absolute_costs_per_year__EUR_":"Realised absolute costs per year (EUR)",
  "Year_realised_cost_has_been_calculated_for":"Year realised cost has been calculated for",
  "Price_reference_year__realised_costs_":"Price reference year (realised costs)",
  "Realised_benefits__EUR_per_tonne_CO2eq_reduced__sequestered_":"Realised benefits (EUR per tonne CO2eq reduced/ sequestered)",
  "Realised_absolute_benefit_per_year__EUR_":"Realised absolute benefit per year (EUR)",
  "Realised_net_costs__EUR_per_tonne_CO2eq_reduced__sequestered_":"Realised net costs (EUR per tonne CO2eq reduced/ sequestered)",
  "Realised_net_cost_per_year__EUR_":"Realised net cost per year (EUR)",
  "Description_of_realised_cost_estimates":"Description of realised cost estimates",
  "Reference_for_realised_costs_and_benefits":"Reference for realised costs and benefits",
  "Web_link_for_realised_costs_and_benefits":"Web link for realised costs and benefits"

/*
  "Report_ID":"",
  "Objective_s__lookup_only4facets":"",
  "Entities_responsible_for_implementing_the_policy__type_":"",
  "Union_policies_lookup_only4facets":"",
  "Link_to_national_report":"",
*/
}

const GenericTable = (props) => {
  //console.log(props)
  const cols = Object.keys(pamFields)
  console.log(props.hits)
  return (
    <div className='results-content-body'>
   <table>
    <thead>
      <tr>
      {cols.map((col)=>(
        <>
        {(col !== 'Report_ID_ES')?
          (
          <th key={col}>
            <div style={{width:200+'px'}}>
            {pamFields[col]}
            </div>
          </th>
          )
          :
          (
            <></>
          )
        }
        </>
      ))}
      </tr>
    </thead>
    <tbody>
    {props?.hits.map((hit) => (
      <tr key={hit.id}> 
        {cols.map((col)=>(
          <>
          {((col !== 'Report_ID_ES') && (col !== 'Name_of_policy_or_measure'))? 
            (
              <td key={col}>
                <div style={{width:200+'px', overflow:'hidden', height:'30px'}}>
                  {hit._source[col]}
                </div>
              </td>)
            :
            (
              <>
              {(col === 'Name_of_policy_or_measure')?
                (
                  <td>
                    <a href={hit._source['Report_ID_ES']}>{hit._source[col]}</a>
                  </td>
                ):(<></>)
              }
              </>
            )
            }
          
          </>
        ))}
      </tr>
    ))}
    </tbody>
  </table>
</div>
  );
};
const SearchKitView = ({ data }) => {
//  host: "http://192.168.0.187:19200",
//  index: 'esbootstrapdata-pam-withrest_prod',

  const { es_index = {} } = 'esbootstrapdata-pam-withrest_prod';
  const { host = 'http://192.168.0.187:19200', indexName = '' } = es_index;
  //const url = `${host}/${indexName}`;
  const url = 'http://192.168.0.187:19200/esbootstrapdata-pam-withrest_prod'
  // console.log('using es index ', url);
  console.log(url)
  const searchkit = React.useMemo(() => {
    return new SearchkitManager(url);
  }, [url]);
  //const searchkit = new SearchkitManager("http://demo.searchkit.co/api/movies/")

  return (
    <div>
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          {/* <TopBar></TopBar> */}

          <LayoutBody>
            <SideBar>
              {/* <HierarchicalMenuFilter */}
              {/*   fields={['type.raw', 'genres.raw']} */}
              {/*   title="Categories" */}
              {/*   id="categories" */}
              {/* /> */}
              {/* <DynamicRangeFilter */}
              {/*   field="metaScore" */}
              {/*   id="metascore" */}
              {/*   title="Metascore" */}
              {/*   rangeFormatter={(count) => count + '*'} */}
              {/* /> */}
              <RefinementListFilter
                field='Country'
                id='country'
                title='Country'
                size={10}
              />
              <RefinementListFilter
                field='Single_policy_or_measure__or_group_of_measures'
                id='Single_policy_or_measure__or_group_of_measures'
                title='Single policy or measure, or group of measures'
                size={10}
              />
              <RefinementListFilter
                field='Sector_s__affected'
                id='Sector_s__affected'
                title='Sector(s) affected'
                size={10}
              />
              <RefinementListFilter
                field='Objective_s__lookup_only4facets'
                id='Objective_s__lookup_only4facets'
                title='Objective(s)'
                size={10}
              />
              <RefinementListFilter
                field='Type_of_policy_instrument'
                id='Type_of_policy_instrument'
                title='Type of policy instrument'
                size={10}
              />
              <RefinementListFilter
                field='Status_of_implementation'
                id='Status_of_implementation'
                title='Status of implementation'
                size={10}
              />
              <RefinementListFilter
                field='Entities_responsible_for_implementing_the_policy__type_'
                id='Entities_responsible_for_implementing_the_policy__type_'
                title='Entities responsible for implementing the policy (type)'
                size={10}
              />
              <RefinementListFilter
                field='Implementation_period_start'
                id='Implementation_period_start'
                title='Implementation period start'
                size={10}
              />
              <RefinementListFilter
                field='Is_the_policy_or_measure_related_to_a_Union_policy_'
                id='Is_the_policy_or_measure_related_to_a_Union_policy_'
                title='Is the policy or measure related to a Union policy?'
                size={10}
              />
              <RefinementListFilter
                field='Union_policies_lookup_only4facets'
                id='Union_policies_lookup_only4facets'
                title='Union policy which resulted in the implementation of the policy or measure'
                size={10}
              />
              <RefinementListFilter
                field='Projection_scenario_in_which_the_policy_or_measure_is_included'
                id='Projection_scenario_in_which_the_policy_or_measure_is_included'
                title='Projection scenario in which the policy or measure is included'
                size={10}
              />
              <RefinementListFilter
                field='Policy_impacting_EU_ETS__ESD_or_LULUCF_emissions'
                id='Policy_impacting_EU_ETS__ESD_or_LULUCF_emissions'
                title='Policy impacting EU ETS, ESD or LULUCF emissions'
                size={10}
              />
              <RangeFilter
                min={-1000}
                max={120000}
                field="Total_GHG_emissions_reductions_in_2020__kt_CO2eq_y_"
                id="Total_GHG_emissions_reductions_in_2020__kt_CO2eq_y_"
                title="Total GHG emissions reductions in 2020 (kt CO2eq/y)"
                showHistogram={true}
              />
              <RangeFilter
                min={-500}
                max={150000}
                field="Total_GHG_emissions_reductions_in_2030__kt_CO2eq_y_"
                id="Total_GHG_emissions_reductions_in_2030__kt_CO2eq_y_"
                title="Total GHG emissions reductions in 2030 (kt CO2eq/y)"
                showHistogram={true}
              />


{/*  
  */}

            </SideBar>
            <LayoutResults>
              {/* <div className="my-logo">Searchkit Acme co</div> */}
              <SearchBox
                autofocus={true}
                searchOnChange={true}
                queryFields={["all_fields_for_freetext", "languages", "text"]}
                queryOptions={{"default_operator":"OR","analyze_wildcard":true}}
              />
              <ActionBar>
                <ActionBarRow>
                  <HitsStats
                    translations={{
                      'hitstats.results_found': '{hitCount} results found',
                    }}
                  />
                  <ViewSwitcherToggle />
                  <SortingSelector
                    options={[
                      { label: 'Relevance', field: '_score', order: 'desc' },
                      {
                        label: 'Country',
                        field: 'Country',
                        order: 'asc',
                      },
                      {
                        label: 'ID',
                        field: 'ID_of_policy_or_measure',
                        order: 'asc',
                      },
                    ]}
                  />
                </ActionBarRow>

                <ActionBarRow>
                  <GroupedSelectedFilters />
                  <ResetFilters />
                </ActionBarRow>
              </ActionBar>

              {/* <ViewSwitcherConfig */}
              {/*   searchkit={this.searchkit} */}
              {/*   hitComponents={[ */}
              {/*     { key: 'grid', title: 'Grid', itemComponent: MovieHitsGridItem, defaultOption: true }, */}
              {/*     { key: 'list', title: 'List', itemComponent: MovieHitsListItem }, */}
              {/*     { key: 'custom-list', title: 'Custom List', listComponent: MovieList } */}
              {/*   ]} */}
              {/* /> */}
              {/* <ViewSwitcherHits */}
              {/*   searchkit={this.searchkit} */}
              {/*   highlightFields={['title']} */}
              {/*   hitsPerPage={12} */}
              {/*   sourceFilter={['title']} */}
              {/* /> */}
              {/* <ViewSwitcherToggle searchkit={this.searchkit} translations={{ Grid: 'My Grid' }} /> */}

              <ViewSwitcherHits
                hitsPerPage={10}
//                highlightFields={['title', 'description']}
                sourceFilter={[]}
                hitComponents={[
                  {
                    key: 'table',
                    title: 'Table',
                    listComponent: decorateComponentWithProps(GenericTable, {
                      data,
                    }),
                    defaultOption: true,
                  },
                  {
                    key: 'grid',
                    title: 'Grid',
                    itemComponent: decorateComponentWithProps(GenericGridItem, {
                      data,
                    }),
                  },
                  {
                    key: 'list',
                    title: 'List',
                    itemComponent: decorateComponentWithProps(GenericListItem, {
                      data,
                    }),
                  },
                ]}
                scrollTo="body"
              />
              <NoHits suggestionsField={'did_you_mean'} />
              <Pagination showNumbers={true} />
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    </div>
  );
};
export default SearchKitView;