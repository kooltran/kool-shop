import * as React from 'react';
import { Link } from 'react-router-dom';
import {ShoeColor} from '../../interfaces/shoe-color';


interface ColorSizesProps {
    shoeColors:  ShoeColor[],
    onChangeShoeSizes: Function,
    activeColorName: string
}

export default class ShoeSize extends React.Component<ColorSizesProps, {}> {
    constructor(props) {
        super(props)
    }

    handleChangeShoeSizes(shoeColorSizeId, e) {
        this.props.onChangeShoeSizes(shoeColorSizeId, e)
    }

    render() {
        const { shoeColors, activeColorName } = this.props;
        if (shoeColors) {
            return shoeColors.map(color => {
                if (color.slug === activeColorName) {
                    return color.sizes.map((size, index) => {
                        return (
                            <div key={index} className={`size-item-wrapper ${(size.quantity === 0) ? 'disabled-size' : ''}`}>
                                <input type="text" className={`size-item`} value={size.size} onClick={(e) => this.handleChangeShoeSizes(size.id, e)} readOnly/>
                            </div>
                        )
                    })
                }
            })
        }
        return 'shoe size'
    }
}