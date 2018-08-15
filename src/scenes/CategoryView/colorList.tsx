import * as React from 'react';
import { Link } from 'react-router-dom';
import {ShoeColor} from '../../interfaces/shoe-color';

interface ColorListProps {
    color:  ShoeColor,
    onHoverColor: Function,
    prodSlug: string
}


export default class ColorList extends React.Component<ColorListProps, {}> {
    constructor(props) {
        super(props)
    }

    handleHoverColor(color: ShoeColor) {
        this.props.onHoverColor(color);
    }

    render() {
        const { color, prodSlug } = this.props;
        return (
            <Link  to={`/details/${prodSlug}/${color.slug}`}  className="thumb-item" onMouseEnter={() => this.handleHoverColor(color)}>
                <img src={color.images[0].md} alt={color.name}/>
            </Link>
        )
    }
}