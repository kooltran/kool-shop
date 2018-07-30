import * as React from 'react';
import { connect } from 'react-redux';
import Text from '../../components/Text';
import Agent from '../../services/agent';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import * as get from 'lodash.get';
import Select from 'react-select';
import './styles.scss';

import cateService from '../../services/cateService';
import Storage from '../../services/storage';
import { fetchProdDetail } from '../../actions/prodDetailAction';
import { addToCart, updateQtySize } from '../../actions/cartAction';

import {Shoe} from '../../interfaces/shoe';
import { ShoeColor } from '../../interfaces/shoe-color'
import { Endpoints } from '../../interfaces/endpoints'
import { Cart } from '../../interfaces/cart'

import LoadingSpinner from '../../components/Loading';
import ShoeSize from './shoesize';
import { makeGetCartState } from '../../selector/cartSelector';
import * as _ from 'lodash';

interface DetailViewProps {
    name: string,
    location?: string,
    match?: {
        params: {
            name: string,
            color: string
        }
    },
    shoeColors: ShoeColor[],
    endpoints: Endpoints,
    cartAdded: Cart,
    price: number,
    remainedProd: number,
    fetchProdDetail: Function,
    addToCart: Function,
    choosenSizeAdded: object
}

interface DetailViewState {
    item: Shoe,
    isLoading: Boolean,
    selectedSize: Number,
    productQty: Number,
    selectedOption: string,
    errorMessage: string,
    disabledSize: string,
    activeColorName: string,
    quantity: number,
    shoeColorSizeId: number,
    cartId: number,
    totalProd: number,
    remainedQty: number,
    choosenSize: Object
}

const sliderSettings = {
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: false
}

const cartIdAdded = Storage('cart-id');

class DetailView extends React.Component<DetailViewProps, DetailViewState> {
    prodName: string;

    constructor(props) {
        super(props);

        this.state = {
            totalProd: null,
            mainNav: null,
            thumbNav: null,
            productQty: null,
            shoeColorSizeId: null,
            selectedSize: null,
            quantity: 1,
            errorMessage: '',
            cartId: null,
            remainedQty: null,
        }
        this.prodName = this.props.match.params.name;
    }

    componentDidMount() {
		const { name } = this.props.match.params;
        this.props.fetchProdDetail(name)
            .then(() => {
                this.setState({
                    mainNav: this.mainSlider,
                    thumbNav: this.thumbSlider
                })
            })
 	}

    componentWillReceiveProps(props) {
        const { shoeColorSizeId, quantity } = this.state;
        if (props.shoeColorSizeId ===  shoeColorSizeId) {
            this.setState({ errorMessage: '' })
        }
        if (quantity >= props.remainedProd ) {
            this.setState({ quantity: 1 })
        }
    }


    renderColorListImage(activeColor, className, imageSize) {
        const { shoeColors } = this.props;

        if (shoeColors) {
            const colorChoosen = shoeColors.find(color => {
                return color.slug === activeColor;
            })
            if (colorChoosen) {
                return colorChoosen.images.map((image, index) => {
                    const imageUrl = image[imageSize]
                    return (
                        <div key={index} className={className}>
                            <img src={imageUrl}/>
                        </div>
                    )
                })
            }
        }
    }

    handleChangeProdQty = (selectedOption) => {
        const { value } =  selectedOption;
        this.setState({
            quantity: value,
        });
    }

    onChangeShoeSizes = (shoeColorSizeId, e) => {
        const { shoeColors, cartAdded } = this.props;
        const { totalProd } = this.state;
        const activeColorName = this.props.match.params.color;
        const { value, label } = e.target;
        const parentNode = e.target.parentNode;
        const childNodes = parentNode.parentNode.childNodes;
        for (let size of childNodes) {
            if (!parentNode.classList.contains('disabled-size')) {
                size.classList.remove('selected')
            }
        }
        if (!parentNode.classList.contains('disabled-size')) {
            parentNode.classList.add('selected');
        }
        const activeColor = shoeColors.find(color => {
            return color.slug === activeColorName
        })
        activeColor.sizes.map(size => {
            if (size.size === parseInt(value) && size.quantity > 0) {
                this.setState({
                    totalProd: size.quantity,
                    quantity: 1,
                    selectedSize: size.size,
                    errorMessage: '',
                    shoeColorSizeId: size.id
                })
            }
        })
    }

    onSubmitCart = (e) => {
        const { selectedSize, totalProd, shoeColorSizeId, quantity, remainedQty } = this.state;
        const { cartAdded, endpoints } = this.props;
        const cart = cartIdAdded.load();
        const { url, queries } = endpoints.carts.add;
        const cartInfo = {...queries, cart, shoeColorSizeId, quantity};
        if (!selectedSize) {
            this.setState({
                errorMessage: 'Please select a size!'
            })
        } else {
            if (cartAdded.items.length > 0) {
                const choosenSize = cartAdded.items.find(item =>  item.shoeColorSize.id === shoeColorSizeId)
                if (choosenSize) {
                    if (choosenSize.quantity < choosenSize.shoeColorSize.quantity) {
                        this.props.addToCart(url, cartInfo, shoeColorSizeId);
                    } else {
                        this.setState({
                            errorMessage: 'This product is out of stock'
                        })
                    }
                } else {
                    this.setState({ errorMessage: '' })
                    this.props.addToCart(url, cartInfo, shoeColorSizeId);
                }
            } else {
                this.setState({ errorMessage: '' })
                this.props.addToCart(url, cartInfo, shoeColorSizeId);
            }
        }
    }

    renderColorList(shoeColors, activeColor) {
        if (shoeColors) {
            return shoeColors.map((color, index) => {
                return (
                    <div key={index} className={`color-item ${color.slug === activeColor ? 'selected-color' : ''}`}>
                        <Link className="color-link" to={`/details/${this.prodName}/${color.slug}`}><img src={color.images[0].md}/></Link>
                    </div>
                )
            })
        }
    }

    renderProductQty() {
        const { cartAdded } = this.props;
        const { totalProd, shoeColorSizeId, choosenSize } = this.state;
        let quantityArr = [], remainedProd;
        if (cartAdded) {
            cartAdded.items.map(item => {
                if (item.shoeColorSize.id === shoeColorSizeId) {
                    remainedProd = item.shoeColorSize.quantity - item.quantity;
                }
            })
        }
        if (totalProd) {
            if (remainedProd < 6 && remainedProd > 0) {
                for (let i = 1; i <= remainedProd; i++) {
                    quantityArr.push(i)
                }
                return quantityArr.map(qty => {
                    return {
                        value: qty,
                        label: `${qty}`
                    }
                })
            } else if (remainedProd === 0) {
                return [
                    {value: 1, label: `${1}`}
                ]
            } else if (totalProd < 6) {
                for (let i = 1; i <= totalProd; i++) {
                    quantityArr.push(i)
                }
                return quantityArr.map(qty => {
                    return {
                        value: qty,
                        label: `${qty}`
                    }
                })
            }
            else {
                return [
                    {value: 1, label: '1'},
                    {value: 2, label: '2'},
                    {value: 3, label: '3'},
                    {value: 4, label: '4'},
                    {value: 5, label: '5'},
                    {value: 6, label: '6'}
                ]
            }
        }
        return [
            {value: 1, label: '1'},
            {value: 2, label: '2'},
            {value: 3, label: '3'},
            {value: 4, label: '4'},
            {value: 5, label: '5'},
            {value: 6, label: '6'}
        ]
    }

    renderDetailView() {
        const activeColorName = this.props.match.params.color;
        const { name, price, shoeColors, cartAdded } = this.props;
        const { quantity, totalProd, selectedSize, errorMessage, shoeColorSizeId } = this.state;
        let colorName;
        if (shoeColors) {
            shoeColors.map(color => {
                if (color.slug === activeColorName) {
                    colorName = color.name
                }
            })
        }
		return (
			<div className="detail__content">
                <div className="detail__content--header">
                    <h2 className="prod-name">{name}</h2>
                    <div className="prod-price">{price}$</div>
                </div>
                <div className="detail__content--center">
                    <div className="row">
                        <div className="prod-image col-lg-8">
                            <Slider
                                className="main-slider"
                                asNavFor={this.state.thumbNav}
                                ref={slider => (this.mainSlider = slider)}
                                >
                                {this.renderColorListImage(activeColorName, 'main-image', 'xl')}
                            </Slider>
                            <Slider
                                className="thumb-slider"
                                asNavFor={this.state.mainNav}
                                ref={slider => (this.thumbSlider = slider)}
                                slidesToShow={4}
                                focusOnSelect={true}
                                >
                                {this.renderColorListImage(activeColorName, 'thumb-image', 'md')}
                            </Slider>
                        </div>
                        <div className="prod-desc col-lg-4">
                            <div className="color-wrapper">
                                <div className="color-list">
                                    <p className="color-title">COLOR:
                                        <span className="active-color">{colorName}</span>
                                    </p>
                                    {this.renderColorList(shoeColors, activeColorName)}
                                </div>
                            </div>
                            <div className="size-wrapper">
                                <div className="size-title">
                                    SIZE:
                                    <span className="size-value">{selectedSize ? selectedSize : 'select a size'}</span>
                                    <span className="remained-prod">{  totalProd && `${totalProd} products` }</span>
                                </div>
                                <div className="size-list">
                                    <ShoeSize
                                        shoeColors={shoeColors}
                                        activeColorName={activeColorName}
                                        onChangeShoeSizes={this.onChangeShoeSizes}
                                    />
                                </div>
                                <div className="show-error">{errorMessage}</div>
                            </div>
                            <div className="blk-add-cart">
                                <div className="prod-qty">
                                    <Select
                                        name='prod-qty'
                                        value={quantity}
                                        onChange={this.handleChangeProdQty}
                                        clearable={false}
                                        searchable={false}
                                        options={this.renderProductQty()}
                                    />
                                </div>
                                <button type="button" className="btn-addtocart" onClick={this.onSubmitCart}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}

	render() {
		return (
			<div className="detail__wrapper">
                <div className="container">
                    {this.renderDetailView()}
                </div>
            </div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
        name: state.prodDetail.data.name,
        price: state.prodDetail.data.price,
        isLoading: state.prodDetail.data.isLoading,
        shoeColors: state.prodDetail.data.shoeColors,
        endpoints: state.initHome.data.endpoints,
        cartAdded: state.cart.data,
        shoeColorSizeId: state.cart.shoeColorSizeId,
        remainedProd: state.cart.remainedProd
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProdDetail: (name) => dispatch(fetchProdDetail(name)),
        addToCart: (apiUrl, queries, shoeColorSizeId) => dispatch(addToCart(apiUrl, queries, shoeColorSizeId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView)
