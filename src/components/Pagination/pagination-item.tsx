import * as React from 'react';
import { Link } from 'react-router-dom';

interface PaginationItemProps {
    isActive: boolean,
    pathname: string,
    search: URLSearchParams,
    label: string,
    pageItem: number
}

export default class PaginationItem extends React.Component<PaginationItemProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const { isActive, pathname, search, pageItem, label } = this.props;
        search.set('page', `${pageItem}`);

        if (isActive) {
            return <b className="pagy__item active">{pageItem}</b>
        }
        return (
            <Link className={`pagy__item pagy-${label}`} to={{pathname: pathname, search: '?'+search.toString()}}>{label}</Link>
        )
    }
}