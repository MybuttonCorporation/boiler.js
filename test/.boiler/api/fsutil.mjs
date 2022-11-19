import fs from 'fs';
/**
 * @classdesc A file directory or path utility. */ export class BoilerDirectory {
    /** 
     * @param {string} _dir Path to the directory*/ constructor(_dir) { this.path = _dir; };
    /** 
     * @returns {fs.Dirent[]}`string[]: patharray` */ get files() { return fs.readdirSync(this.path, { withFileTypes: true }); };
    
};
/**
 * 
 * @param {string | BoilerDirectory} _path 
 */ export function dirstat(_path) {
    let type = typeof _path;
    if (type == 'string') return fs.fstatSync(_path);
    else if (type == 'function') return fs.statSync(_path.path);
    else throw new TypeError('dirstat param "_path" must have a type of "string" or "BoilerDirectory". recieved ' + type);
 };