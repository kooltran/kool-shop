import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchProdDetail } from '../../actions/prodDetailAction';
import { addToCart } from '../../actions/cartAction';

import { ShoeColor } from '../../interfaces/shoe-color';
import { Endpoints } from '../../interfaces/endpoints';
import Storage from '../../services/storage';
import ShoeSize from './shoesize';

interface DetailDescProps {
    name: string,
    location?: string,
    match?: {
        params: {
            name: string,
            color: string
        }
    },
    shoeColors: ShoeColor[],
    prodName: {
        name: string,
        color: string
    },
    fetchProdDetail: Function,
    addToCart: Function,
    endpoints: Endpoints
}

interface DetailDescState {
    totalProd: number,
    selectedSize: number,
    errorMessage: string,
    shoeColorSizeId: number,
    quantity: number
}

const cartIdAdded = Storage('cart-id');

class DetailDescription extends React.Component<DetailDescProps, DetailDescState> {
    constructor(props) {
        super(props);

        this.state = {
            totalProd: null,
            selectedSize: null,
            errorMessage: '',
            shoeColorSizeId: null,
            quantity: 1
        }
    }

    renderColorList(shoeColors, activeColor) {
        const { prodName } = this.props;
        if (shoeColors) {
            return shoeColors.map((color, index) => {
                return (
                    <div key={index} className={`color-item ${color.slug === activeColor ? 'selected-color' : ''}`}>
                        <Link className="color-link" to={`/details/${prodName.name}/${color.slug}`}><img src={color.images[0].md}/></Link>
                    </div>
                )
            })
        }
    }

    renderProductQty() {
        // const { cartAdded } = this.props;
        // const { totalProd, shoeColorSizeId, remainedQty, choosenSize } = this.state;
        // let quantityArr = [], remainedProd;
        // if (cartAdded) {
        //     cartAdded.items.map(item => {
        //         if (item.shoeColorSize.id === shoeColorSizeId) {
        //             remainedProd = item.shoeColorSize.quantity - item.quantity;
        //         }
        //     })
        // }
        // if (totalProd) {
        //     if (remainedProd < 6 && remainedProd > 0) {
        //         for (let i = 1; i <= remainedProd; i++) {
        //             quantityArr.push(i)
        //         }
        //         return quantityArr.map(qty => {
        //             return {
        //                 value: qty,
        //                 label: `${qty}`
        //             }
        //         })
        //     } else if (remainedProd === 0) {
        //         return [
        //             {value: 1, label: `${1}`}
        //         ]
        //     } else if (totalProd < 6) {
        //         for (let i = 1; i <= totalProd; i++) {
        //             quantityArr.push(i)
        //         }
        //         return quantityArr.map(qty => {
        //             return {
        //                 value: qty,
        //                 label: `${qty}`
        //             }
        //         })
        //     }
        //     else {
        //         return [
        //             {value: 1, label: '1'},
        //             {value: 2, label: '2'},
        //             {value: 3, label: '3'},
        //             {value: 4, label: '4'},
        //             {value: 5, label: '5'},
        //             {value: 6, label: '6'}
        //         ]
        //     }
        // }
        return [
            {value: 1, label: '1'},
            {value: 2, label: '2'},
            {value: 3, label: '3'},
            {value: 4, label: '4'},
            {value: 5, label: '5'},
            {value: 6, label: '6'}
        ]
    }

    onChangeShoeSizes = (shoeColorSizeId, e) => {
        const { shoeColors, prodName } = this.props;
        const { totalProd } = this.state;
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
            return color.slug === prodName.color
        })
        activeColor.sizes.map(size => {
            if (size.size === parseInt(value) && size.quantity > 0) {
                this.setState({
                    totalProd: size.quantity,
                    selectedSize: size.size,
                    errorMessage: '',
                    shoeColorSizeId: size.id
                })
            }
        })
    }

    handleChangeProdQty = (selectedOption) => {
        const { value } =  selectedOption;
        this.setState({
            quantity: value,
        });
    }

    // onSubmitCart = () => {
    //     const { shoeColorSizeId, quantity, selectedSize } = this.state;
    //     const { endpoints, addToCart } = this.props;
    //     const cart = cartIdAdded.load();
    //     const { url, queries } = endpoints.carts.add;
    //     const cartInfo = {...queries, cart, shoeColorSizeId, quantity};
    //     if (selectedSize) {
    //         this.props.addToCart(url, cartInfo, shoeColorSizeId)
    //     } else {
    //         this.setState({
    //             errorMessage: "Please select a sizse"
    //         })
    //     }
    // }

    handleSubmitCart = () => {
        const { shoeColorSizeId, quantity, selectedSize } = this.state;
        const { endpoints, addToCart } = this.props;
        const cart = cartIdAdded.load();
        const { url, queries } = endpoints.carts.add;
        const cartInfo = {...queries, cart, shoeColorSizeId, quantity};
        this.props.onSubmitCart(selectedSize, url, cartInfo, shoeColorSizeId, addToCart)
    }

    render() {
        const { shoeColors, prodName } = this.props;
        const { selectedSize, totalProd, errorMessage, quantity, shoeColorSizeId } = this.state;
        let colorName;
        if (shoeColors) {
            shoeColors.map(color => {
                if (color.slug === prodName.color) {
                    colorName = color.name
                }
            })
        }
        return (
            <div>
                <div className="color-wrapper">
                    <div className="color-list">
                        <p className="color-title">COLOR:
                            <span className="active-color">{colorName}</span>
                        </p>
                        {this.renderColorList(shoeColors, prodName.color)}
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
                                activeColorName={prodName.color}
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
                        <button type="button" className="btn-addtocart" onClick={this.handleSubmitCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         endpoints: state.initHome.data.endpoints,
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (apiUrl, queries) => dispatch(addToCart(apiUrl, queries)),
    }
}

export default connect(null, mapDispatchToProps)(DetailDescription)