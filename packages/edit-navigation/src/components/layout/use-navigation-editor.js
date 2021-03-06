/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { store as editNavigationStore } from '../../store';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';

export default function useNavigationEditor() {
	const [ hasFinishedInitialLoad, setHasFinishedInitialLoad ] = useState(
		false
	);
	const [ selectedMenuId, setSelectedMenuId ] = useState( null );
	const isMenuBeingDeleted = useSelect(
		( select ) =>
			select( 'core' ).isDeletingEntityRecord(
				'root',
				'menu',
				selectedMenuId
			),
		[ selectedMenuId ]
	);

	const { menus, hasLoadedMenus } = useSelect( ( select ) => {
		const selectors = select( 'core' );
		const params = { per_page: -1 };
		return {
			menus: selectors.getMenus( params ),
			hasLoadedMenus: selectors.hasFinishedResolution( 'getMenus', [
				params,
			] ),
		};
	}, [] );

	const [ isMenuSelected, setIsMenuSelected ] = useState( true );
	const { createErrorNotice, createInfoNotice } = useDispatch( noticesStore );

	useEffect( () => {
		if ( hasLoadedMenus ) {
			setHasFinishedInitialLoad( true );
		}
	}, [ hasLoadedMenus ] );

	const navigationPost = useSelect(
		( select ) => {
			if ( ! selectedMenuId ) {
				return;
			}
			return select( editNavigationStore ).getNavigationPostForMenu(
				selectedMenuId
			);
		},
		[ selectedMenuId ]
	);

	const { deleteMenu: _deleteMenu } = useDispatch( 'core' );

	const deleteMenu = async () => {
		const didDeleteMenu = await _deleteMenu( selectedMenuId, {
			force: true,
		} );
		if ( didDeleteMenu ) {
			setSelectedMenuId( null );
			createInfoNotice( __( 'Menu deleted' ), {
				type: 'snackbar',
				isDismissible: true,
			} );
		} else {
			createErrorNotice( __( 'Menu deletion unsuccessful' ) );
		}
	};

	useEffect( () => setIsMenuSelected( selectedMenuId !== null ), [
		selectedMenuId,
	] );
	return {
		menus,
		hasLoadedMenus,
		hasFinishedInitialLoad,
		selectedMenuId,
		navigationPost,
		isMenuBeingDeleted,
		selectMenu: setSelectedMenuId,
		deleteMenu,
		isMenuSelected,
	};
}
