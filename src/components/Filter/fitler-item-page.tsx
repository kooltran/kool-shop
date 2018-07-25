import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './filter.scss'

import {CollectionQueries} from '../../Interfaces/collection-queries';

interface ItemPerPageProps {
    queries: CollectionQueries,
    onChangeItemPerPage: Function,
    total: number
}

export default class FilterItemPerPage extends React.Component<ItemPerPageProps, {}> {
    constructor(props) {
        super(props);

        this.onChangeItemPerPage = this.onChangeItemPerPage.bind(this)
    }

    getItemPerPageObject(value) {
        const {itemsPerPage} = this.props.queries;
        return {
            itemsPerPage: value
        }
    }

    onChangeItemPerPage = (selectedOption) => {
        if (selectedOption.value !== selectedOption.selectedVal) {
            this.props.onChangeItemPerPage(this.getItemPerPageObject(selectedOption.value))
        }
    }

    renderItemPerPage(selected) {
        const {total} = this.props;
        let totalPagesRound;
        const totalPageArr = [];
        if (total < 10) {
            totalPagesRound = 1;
        } else {
            totalPagesRound = Math.floor(total / 10);
        }
        for (let i = 1; i <= totalPagesRound; i++) {
            totalPageArr.push(i);
        }
        return totalPageArr.map((page, index) => {
            return {
                value: page * 10,
                label: page * 10,
                selectedVal: parseInt(selected)
            }
        })
    }

    render() {
        const {queries} = this.props;
        return (
            <div className="filter__perpage">
                <p className="filter__perpage--title">DISPLAY NUMBER</p>
                <Select
                    value={queries && queries.itemsPerPage.toString()}
                    onChange={this.onChangeItemPerPage}
                    options={this.renderItemPerPage(queries && queries.itemsPerPage)}
                    clearable={false}
                    searchable={false}
                />
            </div>
        )
    }
}