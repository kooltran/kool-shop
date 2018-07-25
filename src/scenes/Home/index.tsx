import * as React from 'react';
import Text from '../../components/Text';
import { connect } from 'react-redux';
import Agent from '../../services/agent';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import * as get from 'lodash.get';
import cateService from '../../services/cateService';

import * as HomeBannerImg from '../../assets/images/home_banner.jpg'

import LoadingSpinner from '../../components/Loading';

const sliderSettings = {
	slidesToShow: 4,
	slidesToScroll: 4,
	dots: true,
	arrows: false,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		}
	]
}

class Home extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
	}

	renderProductItem(section) {
		return section.items.map((item, index) => {
			const itemImage = get(item, 'shoeColors[0].images[0].md', 'image-not-found');
			return (
				<div key={index} className="home__features--item">
					<Link to={`/details/${item.slug}/${item.shoeColors[0].slug}`} className="prod-wrapper">
						<img className="prod-image" src={itemImage} alt={item.name} />
						<span className="prod-name">{item.name}</span>
						<span className="prod-price">{item.price}$</span>
					</Link>
				</div>
			)
		})
	}

	renderSectionHomepage(sections) {
		if (sections) {
			return sections.map((section, index) => {
				return (
					<div key={index} className="home__features">
						<h2 className="home__features--title">{section.name}</h2>
						<Slider {...sliderSettings}>
							{this.renderProductItem(section)}
						</Slider>
					</div>
				)
			})
		}
	}

	render() {
		const { sections, isLoading } = this.props;
		return (
			<div className="home__wrapper">
				<div className="container">
					<div className="home__banner">
						<h1 className="home__banner--slogan">WELCOME TO K-SHOP</h1>
						<div className="home__banner--img">
							<img src={HomeBannerImg}  alt="home banner image"/>
						</div>
					</div>
					{ isLoading ? <LoadingSpinner/> : this.renderSectionHomepage(sections) }
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		sections: state.initHome.data.sections,
		isLoading: state.initHome.isLoading
	}
}

export default connect(mapStateToProps)(Home);
