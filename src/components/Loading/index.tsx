import * as React from 'react';
import './styles.scss';

function LoadingSpinner() {
	return	(
		<div className="loading-spinner">
			<div className="dot-item dot1">
				<div className="dot-winner"></div>
			</div>
			<div className="dot-item dot2">
				<div className="dot-winner"></div>
			</div>
			<div className="dot-item dot3">
				<div className="dot-winner"></div>
			</div>
			<div className="dot-item dot4">
				<div className="dot-winner"></div>
			</div>
			<div className="dot-item dot5">
				<div className="dot-winner"></div>
			</div>
		</div>
	)
}

export default LoadingSpinner;
