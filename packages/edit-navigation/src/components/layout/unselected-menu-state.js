/**
 * WordPress dependencies
 */
import { Card, CardBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import AddMenu from '../add-menu';

export default function UnselectedMenuState( { onCreate } ) {
	return (
		<Card className="edit-navigation-empty-state">
			<CardBody>
				<AddMenu onCreate={ onCreate } />
			</CardBody>
		</Card>
	);
}
