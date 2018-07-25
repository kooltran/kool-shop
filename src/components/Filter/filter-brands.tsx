import * as React from 'react';
import './filter.scss';

import {Brand} from '../../Interfaces/brand';

interface FilterBrandsProps {
    [key:string]: any,
    brands: Brand[],
    selectedBrands: Brand[],
    onChangeFiltersHandler: Function,
    isLoading: boolean,
}


export default class FilterBrands extends React.Component<FilterBrandsProps, {}> {
    constructor(props) {
        super(props);

        this.state = {
            selectedBrands: []
        }
    }

    getBrandNameObject(optionName, brandName) {
        return {
            optionName: brandName
        }
    }

    handleBrandsFilter = (e) => {
        const {value, name, checked} = e.target;
        const { selectedBrands } = this.props
        const selectedBrandsChange = [];

        for (const selectedBrand of selectedBrands) {
            if (!checked && selectedBrand.slug === value) { continue; }

            selectedBrandsChange.push(selectedBrand.slug);
        }
        if (checked) {
            selectedBrandsChange.push(value)
        }

        this.props.onFilterBrands(selectedBrandsChange, 'selectedBrands')
    }

    renderBrandsName() {
        const { brands, selectedBrands } = this.props
        if (brands) {
            return brands.map((brand, index) => {
                let isChecked = false;
                selectedBrands.map(selectedBrand => {
                    if (brand.slug === selectedBrand.slug) {
                        isChecked = true;
                    }
                })

                return (
                    <div key={index} className="brand-name">
                        <label className="checkbox-group" htmlFor={brand.slug}>
                            <input
                                id={brand.slug}
                                className="checkbox-input"
                                type="checkbox"
                                checked={isChecked}
                                name={brand.slug}
                                value={brand.slug}
                                onChange={this.handleBrandsFilter}
                            />
                            <span className="checkbox-mask"></span>
                            <span className="checkbox-label">{brand.name}</span>
                        </label>
                    </div>
                )
            })
        }
    }

    openBrandsFilter = (e) => {
        const parent = e.target.parentNode;
        if (parent.classList.contains('open')) {
            parent.classList.remove('open')
        } else {
            parent.classList.add('open')
        }
    }

    render() {
        return (
            <div className="filter__brands open">
                <div className="filter__brands--title" onClick={this.openBrandsFilter}>Brands</div>
                <div className="filter__brands--content">
                    <div className="brand-name">
                        {this.renderBrandsName()}
                    </div>
                </div>
            </div>
        )
    }
}