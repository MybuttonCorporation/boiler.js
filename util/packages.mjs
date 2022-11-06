import axios from 'axios';
import { readFileSync } from 'fs';
export class packageOptions {
    /**
     * @desc Name of the package.
     * @type {string} `string`
     **/ name;
    /**
     * @desc Version of the package.
     * @type {string} `version_string`
     */ version;
    /**
     * @desc Index file of the package.
     * @type {string} `file_name`
     */ index;
    /**
     * @desc Author of the package.
     * @type {string} `uuid`
     */ author;
    /**
     * @desc Dependencies of the package.
     * @type {Array<string>} `string[]`
     */ dependencies;
};

/**
 * Post a package to the registry.
 * @param {packageOptions} opts 
 */
export async function put(opts) {
    let info = {
        name: opts.name,
        author: opts.author,
        version: opts.version,
        dependencies: opts.dependencies,
        index: readFileSync(`${opts.index}`, { encoding: 'utf-8' })
    }
    return __req("post", "/register_pkg", info);
};
/**
 * Get contents of a package.
 * @param {string} pkg `Package name`.
 * @returns {Promise} `Boiler::FurnacePackageInfo`
 */
export async function ins(pkg) {
    return __req("get", "/get_pkg/" + pkg);
};
/**
 * Make a request.
 * @param {"get" | "post"} type Request type, `GET` or `POST`.
 * @param {string} path Path, after `.../boiler`.
 * @param {any | undefined} body Request body, only for `POST` requests.
 * @returns {Promise}
 */
async function __req(type, path, body) {
    let basepath = 'http://api.mybutton.org/boiler';
    let reqpath = basepath + path;
    return axios[type](reqpath, type == "post" ? body : undefined);  
};