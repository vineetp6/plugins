import './index';
import { Plugin, postLogin, preInitialization, SapphireClient } from '@sapphire/framework';
import { join } from 'path';
import { Utilities } from './lib/Utilities';
import { UtilitiesStore } from './lib/UtilitiesStore';

/**
 * @since 1.0.0
 */
export class UtilitiesPlugin extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [preInitialization](this: SapphireClient): void {
		this.utilities = new Utilities();
		this.stores.register(this.utilities.store);

		this.utilities.store.registerPath(join(__dirname, UtilitiesStore.name));
	}

	/**
	 * @since 1.0.0
	 */
	public static [postLogin](this: SapphireClient): void {
		const pieces = this.utilities.store;

		for (const [name, piece] of pieces.entries()) {
			this.utilities.exposePiece(name, piece);
		}
	}
}

SapphireClient.plugins.registerPreInitializationHook(UtilitiesPlugin[preInitialization], 'UtilitiesStore-PreInitialization');
SapphireClient.plugins.registerPostLoginHook(UtilitiesPlugin[postLogin], 'UtilitiesStore-PostLogin');
