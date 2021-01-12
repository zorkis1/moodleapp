// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injectable } from '@angular/core';

import { CoreLocalNotifications } from '@services/local-notifications';
import { makeSingleton } from '@singletons';
import { CoreSettingsHandler, CoreSettingsHandlerData } from '@features/settings/services/settings-delegate';
import { AddonNotifications } from '../notifications';
import { AddonNotificationsMainMenuHandlerService } from './mainmenu';

/**
 * Notifications settings handler.
 */
@Injectable({ providedIn: 'root' })
export class AddonNotificationsSettingsHandlerService implements CoreSettingsHandler {

    static readonly PAGE_NAME = 'settings';

    name = 'AddonNotifications';
    priority = 500;

    /**
     * Check if the handler is enabled on a site level.
     *
     * @return Whether or not the handler is enabled on a site level.
     */
    async isEnabled(): Promise<boolean> {
        // Preferences or notification sound setting available.
        return CoreLocalNotifications.instance.isAvailable() || AddonNotifications.instance.isNotificationPreferencesEnabled();
    }

    /**
     * Returns the data needed to render the handler.
     *
     * @return Data needed to render the handler.
     */
    getDisplayData(): CoreSettingsHandlerData {
        return {
            icon: 'fas-bell',
            title: 'addon.notifications.notifications',
            page: AddonNotificationsMainMenuHandlerService.PAGE_NAME + '/' + AddonNotificationsSettingsHandlerService.PAGE_NAME,
            class: 'addon-notifications-settings-handler',
        };
    }

}

export class AddonNotificationsSettingsHandler extends makeSingleton(AddonNotificationsSettingsHandlerService) {}
