import * as React from 'react';
import { connect } from 'react-redux';
import * as queryString from "query-string";
import './styles.scss';


import CateList from './cateList';
import LoadingSpinner from '../../components/Loading';
import FilterBrands from '../../components/Filter/filter-brands';
import FilterItemPerPage from '../../components/Filter/fitler-item-page';
import FilterOptions from '../../components/Filter/filter-options-list';
import Pagination from '../../components/Pagination/pagination';
import { fetchProdList } from '../../actions/prodListAction'

import {ShoeCollection} from '../../Interfaces/shoe-collection';
import {Category} from '../../Interfaces/category';
import {Brand} from '../../Interfaces/brand';

interface CategoryViewProps {
	history?: {[key: string]: any},
    location?: {
        search: string,
        pathname: string,
    },
    match?: {
        params: {
            category: string
        }
    },
	category: Category,
	isLoading: Boolean,
	brands: Brand[],
	selectedBrands: Brand[],
	collection: ShoeCollection,
	fetchProdList: Function
}

const settingThumbSlide = {
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 3,
};

class CategoryView extends React.Component<CategoryViewProps, {}> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.getProdListData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params !== prevProps.match.params) {
			this.getProdListData();
		}
	}

	getProdListData() {
		const queries = {...this.props.match.params, ...queryString.parse(this.props.location.search)};
		this.props.fetchProdList(queries);
	}

	renderCateList(collection) {
		if (collection) {
			return collection.items.map((item, index) => {
				return (
					<CateList key={index} item={item}/>
				)
			})
		}
	}

	onFilterBrands = (selectedBrands, name) => {
		const {search} = this.props.location;
        const searchObject = queryString.parse(search, {arrayFormat: 'bracket'});
		if (searchObject.itemsPerPage) {
            delete searchObject.itemsPerPage;
        }
		searchObject[name] = selectedBrands;
		this.filterChange(searchObject)
	}

	onChangeFilterOption = (queriesObject) => {
		this.filterChange({...queryString.parse(this.props.location!.search, {arrayFormat: 'bracket'}), ...queriesObject})
	}

	filterChange = (searchObject) => {
		const history = this.props.history!;
        const {pathname} = this.props.location;
		if (searchObject.page) {
			delete searchObject.page
		}

        history.push({
            pathname,
            search: '?' + queryString.stringify(searchObject, {encode: false, arrayFormat: 'bracket'})
        });
	}

	render() {
		const { category, brands, selectedBrands, collection, isLoading } = this.props;
		const { pathname, search } = this.props.location;
		return (
			<div className="prodlist__wrapper">
				<div className="container">
					{
						collection &&
						<div className="prodlist__title">
							<p className="total-prod">{collection.total} Products Found</p>
							<h1 className="list-title">{category.name}</h1>
						</div>
					}
					<div className="row">
						<div className="col-lg-3">
							{
								category &&
								<FilterBrands
									brands={brands}
									onFilterBrands={this.onFilterBrands}
									selectedBrands={selectedBrands}
									category={category}
								/>
							}
						</div>
						<div className="col-lg-9">
							{
								collection &&
								<div className="filter">
									<FilterItemPerPage
										total={collection.total}
										onChangeItemPerPage = {this.onChangeFilterOption}
										queries = {collection.queries}
									/>
									<FilterOptions
										onChangeListOptions = {this.onChangeFilterOption}
										queries = {collection && collection.queries}
									/>
								</div>
							}
							<div className="prodlist__content">
								<div className="list-content">
									<div className="row">
										{isLoading ? <LoadingSpinner/> : this.renderCateList(collection)}
									</div>
								</div>
							</div>
							{
								collection &&
								<Pagination
									total={collection.total}
									totalPages={collection.totalPages}
									currentPage={collection.currentPage}
									pathname={pathname}
									search={search}
								/>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		category: state.prodList.data.category,
		brands: state.prodList.data.brands,
		selectedBrands: state.prodList.data.selectedBrands,
		collection: state.prodList.data.collection,
		isLoading: state.prodList.isLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProdList: (queries) => dispatch(fetchProdList(queries))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)