import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {CollectionQueries} from '../../Interfaces/collection-queries';

interface FilterOptionsProps {
    queries: CollectionQueries,
    onChangeListOptions: Function,
}

interface optionsInterface {
    [optionName :string]: {
        value: string,
        label: string,
        queries: {
            [key :string]: string,
        }
    }[]
}

const listOptions: optionsInterface = {
    order: [
        {
            value: 'featured',
            label: 'Nổi bật',
            queries: {
                orderBy: 'featured',
                order: 'DESC',
            }
        },
        {
            value: 'priceLowest',
            label: 'Giá thấp -> cao',
            queries: {
                orderBy: 'price',
                order: 'ASC',
            }
        },
        {
            value: 'priceHighest',
            label: 'Giá cao -> thấp',
            queries: {
                orderBy: 'price',
                order: 'DESC',
            },
        }
    ]
}

export default class FilterOptions extends React.Component<FilterOptionsProps, {}> {
    constructor(props) {
        super(props);

        this.onChangeListOptions = this.onChangeListOptions.bind(this)
    }

    onChangeListOptions(selectOption) {
        for (let option of listOptions.order) {
            if (selectOption.value === option.value && selectOption.value !== selectOption.selectedVal) {
                this.props.onChangeListOptions(option.queries)
            }
        }
    }

    renderListOptions(selected) {
        return listOptions.order.map((option, index) => {
            return {
                value: option.value,
                label: option.label,
                selectedVal: selected
            }
        })
    }

    render() {
        const {queries} = this.props;
        let orderOptions = null;
        if (queries) {
            listOptions.order.map(option => {
                if (option.queries.orderBy === queries.orderBy && option.queries.order === queries.order) {
                    orderOptions = option;
                }
            })
        }
        if (orderOptions === null) {
            orderOptions = listOptions.order[0];
        }
        return (
            <div className="filter__options">
                <p className="filter__options--title">SORT BY:</p>
                <Select
                    name='order'
                    value={orderOptions.value}
                    onChange={this.onChangeListOptions}
                    options={this.renderListOptions(orderOptions.value)}
                    clearable={false}
                    searchable={false}
                />
            </div>
        )
    }
}