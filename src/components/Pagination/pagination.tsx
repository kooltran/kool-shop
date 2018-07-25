import * as React from 'react';
import { Link } from 'react-router-dom';
import './pagination.scss';
import PaginationItem from './pagination-item';

interface PaginationProps {
    pathname: string,
    search: string,
    total: number,
    totalPages: number,
    currentPage: number,
    itemsPerPage: number,
}


export default class Pagination extends React.Component<PaginationProps, {}> {
    constructor(props) {
        super(props);
    }

    renderPaginationList() {
        const { total, totalPages, pathname, currentPage } = this.props;
        const paginationItems = [];
        const search = new URLSearchParams(this.props.search);
        const addPaginationItem = function addPaginationItem(pageItem :number, label :string, isActive :boolean = false) {
            paginationItems.push({pageItem, label, isActive});
        };

        if (currentPage > 1) {
            addPaginationItem(1, 'First');
            addPaginationItem(currentPage-1, 'Prev');
        }

        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                addPaginationItem(i, `${i}`, true);
            } else {
                addPaginationItem(i, `${i}`);
            }
        }

        if (currentPage < totalPages) {
            addPaginationItem(currentPage + 1, 'Next');

        }

        if (currentPage <= totalPages - 1) {
            addPaginationItem(totalPages, 'Last');
        }

        return paginationItems.map((paginationItem, index) => {
            return (
                <PaginationItem
                    key={index}
                    pathname={pathname}
                    search={search}
                    isActive={paginationItem.isActive}
                    label={paginationItem.label}
                    pageItem={paginationItem.pageItem}
                />
            )
        })
    }

    render() {
        return (
            <div className="pagy">
                {this.renderPaginationList()}
            </div>
        )
    }
}