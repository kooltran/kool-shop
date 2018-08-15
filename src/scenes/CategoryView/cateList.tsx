import * as React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import {Shoe} from '../../interfaces/shoe';
import {ShoeColor} from '../../interfaces/shoe-color';

import ColorList from './colorList';

interface CateListProps {
    item: Shoe,
}

interface CateListState {
    activeColor: ShoeColor
}

const settingThumbSlide = {
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
    infinite: false
};


export default class CateList extends React.Component<CateListProps, CateListState> {
    constructor(props) {
        super(props)

        this.state = {
            activeColor: this.props.item.shoeColors[0],
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.item.shoeColors[0].slug !== prevProps.item.shoeColors[0].slug) {
            this.setState({
                activeColor: this.props.item.shoeColors[0]
            })
        }
    }

    onHoverColor = (color) => {
        this.setState({
            activeColor: color,
        })
    }

    renderColorList() {
        return this.props.item.shoeColors.map((color, index) => {
            return <ColorList
                        key={index}
                        color={color}
                        onHoverColor={this.onHoverColor}
                        prodSlug={this.props.item.slug}
                    />
        })
    }

    render() {
        const item = this.props.item;
        const { activeColor } = this.state;
        return (
            <div className="col-md-4">
                <div className="prod-item-wrapper">
                    <Link className="prod-item" to={`/details/${item.slug}/${activeColor.slug}`}>
                        <img className="prod-image" src={activeColor.images[0].md} alt={activeColor.slug} />
                        <p className="prod-name">{item.name}</p>
                    </Link>
                    <div className="prod-thumbimg">
                        <Slider
                            {...settingThumbSlide}
                            infinite = {item.shoeColors.length > 3 ? true : false}
                        >
                            {this.renderColorList()}
                        </Slider>
                    </div>
                    <p className="prod-price">{item.price}$</p>
                </div>
            </div>
        )
    }
}