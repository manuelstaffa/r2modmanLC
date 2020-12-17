import * as path from 'path';
import ManagerSettings from './ManagerSettings';
import FileUtils from '../../utils/FileUtils';

export default class PathResolver {

    private static _APPDATA_DIR: string = '';
    private static _CONFIG_DIR: string = '';
    private static _ROOT: string = '';
    private static _MOD_ROOT: string = '';

    static set APPDATA_DIR(appDataDir: string) {
        PathResolver._APPDATA_DIR = appDataDir;
        PathResolver._CONFIG_DIR = path.join(appDataDir, 'config');
        ManagerSettings.getSingleton()
            .then(settings => {
                settings.load()
                    .then(async () => {
                        PathResolver._ROOT = settings.dataDirectory || appDataDir;
                        await FileUtils.ensureDirectory(PathResolver._ROOT);
                        PathResolver._MOD_ROOT = path.join(PathResolver._ROOT, 'mods');
                    });
            });
    }

    static set APPDATA_DIR_MIGRATION_V1(appDataDir: string) {
        PathResolver._APPDATA_DIR = appDataDir;
        PathResolver._CONFIG_DIR = path.join(appDataDir, 'config');
        ManagerSettings.getSingleton()
            .then(settings => {
                settings.load()
                    .then(async () => {
                        PathResolver._ROOT = settings.dataDirectory || appDataDir;
                        await FileUtils.ensureDirectory(PathResolver._ROOT);
                        PathResolver._MOD_ROOT = path.join(PathResolver._ROOT, 'games', 'Risk of Rain 2');
                    });
            });
    }

    static get ROOT(): string {
        return PathResolver._ROOT;
    }

    static get MOD_ROOT(): string {
        return PathResolver._MOD_ROOT;
    }

    static set MOD_ROOT(path: string) {
        this._MOD_ROOT = path;
    }

    static get APPDATA_DIR(): string {
        return PathResolver._APPDATA_DIR;
    }

    static get CONFIG_DIR(): string {
        return PathResolver._CONFIG_DIR;
    }
}
