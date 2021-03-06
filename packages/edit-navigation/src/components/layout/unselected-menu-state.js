/**
 * WordPress dependencies
 */
import { Card, CardBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import AddMenu from '../add-menu';
import MenuSelector from '../menu-selector';

export default function UnselectedMenuState( {
	onCreate,
	onSelectMenu,
	menus,
} ) {
	return (
		<Card className="edit-navigation-empty-state">
			<CardBody>
				{ menus?.length ? (
					<MenuSelector
						onSelectMenu={ onSelectMenu }
						menus={ menus }
					/>
				) : (
					<AddMenu onCreate={ onCreate } />
				) }
			</CardBody>
		</Card>
	);
}
