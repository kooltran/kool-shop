import * as React from 'react';
import './Modal.scss'


interface ModalProps {
    removeCartItem: Function
}

interface ModalState {
    isShowModal: boolean
}

export default class Modal extends React.Component<ModalProps, ModalState> {
    constructor(props) {
        super(props);

        this.state = {
            isShowModal: false
        }

    }

    componentWillReceiveProps(props) {
        const { show } = props;
        if (show) {
            this.setState({ isShowModal: true })
        }
    }

    handleHide = () => {
        this.setState({ isShowModal: false })
    }

    handleClickOutSide = (e: any) => {
        for (let item of e.target.classList) {
            if (item === 'confirm-modal') {
                this.setState({ isShowModal: false })
            }
        }
    }

    handleRemoveCartItem = () => {
        this.props.removeCartItem();
        this.setState({ isShowModal: false })
    }

    render() {
        const { isShowModal } = this.state;
        console.log(isShowModal)
        return (
            <div className={`confirm-modal ${isShowModal ? 'in' : ''}`} onClick={this.handleClickOutSide}>
                <div className="confirm-modal__content">
                    <div className="confirm-modal__title">
                        <span className="close" onClick={this.handleHide}>&times;</span>
                        <p className="title-content">Do you want remove this product</p>
                    </div>
                    <div className="confirm-modal__body">
                        <button className="confirm-modal__button btn-yes" onClick={this.handleRemoveCartItem}>Yes</button>
                        <button className="confirm-modal__button btn-no" onClick={this.handleHide}>No</button>
                    </div>
                </div>
            </div>
        )
    }
}