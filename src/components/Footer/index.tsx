import * as React    from 'react';
import { Link }      from 'react-router-dom';
import { fetchCategories } from '../../actions/';
import authenService from '../../services/authenService';
import Button        from '../Button';
import Cart          from '../Cart';
import Agent from '../../services/agent';
import './styles.scss'

import * as Logo from '../../assets/images/logo.png'

class Footer extends React.Component {
	constructor(props: object) {
		super(props);
	}

	render() {
		return (
			<div className="footer__wrapper">
				<div className="container">
					<div className="footer__content">
						<div className="footer__content--menu footer__content--item">
							<div className="logo">
								<Link to="/"><img className="nav__logo--img" src={Logo} alt="logo" /></Link>
							</div>
							<div className="menu">
								<ul>
									<li><Link to="">About kool</Link></li>
									<li><Link to="">Careers</Link></li>
									<li><Link to="">Customer care</Link></li>
									<li><Link to="">Warranty policy</Link></li>
								</ul>
							</div>
						</div>
						<div className="footer__content--subscribe footer__content--item">
							<div className="subscribe-wrapper">
								<p className="subscribe-title">Get the freshest K-shop news</p>
								<form>
									<input className="subscribe-input" type="text" placeholder="Your email here" />
									<Button>Subcribe</Button>
								</form>
							</div>
						</div>
					</div>
					<div className="footer__bottom">
						<div className="footer__bottom--menu footer__bottom--item">
							<ul>
								<li><Link to="">Term & Conditions</Link></li>
								<li><Link to="">Privacy Policy</Link></li>
								<li><Link to="">CA Transparency in Supply Chains Act</Link></li>
							</ul>
							<p className="copyright-text">© 2018 K-Shop. All Rights Reserved.</p>
						</div>
						<div className="footer__bottom--social footer__bottom--item">
							<ul>
								<li className="social-icon"><Link className="facebook ico" to=""></Link></li>
								<li className="social-icon"><Link className="instagram ico" to=""></Link></li>
								<li className="social-icon"><Link className="twitter ico" to=""></Link></li>
								<li className="social-icon"><Link className="ggplus ico" to=""></Link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Footer;
