import axios from 'axios'
import { showLoader } from '../load.js'
import { hideLoader } from '../load.js'

export class Api {
    constructor() {
        this.instance = axios.create({
            baseURL: '/api',
            'Content-Type': 'application/json',
            headers: { 'FileManager-Header': 'api' } 
        });
    }
  
    async send(url, value) {
        showLoader();
        let resp = {};
        try {
            resp = await this.instance.post(url, value);
            hideLoader();
            return resp.data;
        } catch(err) {
            resp.errorCode = 7;
            resp.errorText = err.message;
            console.log('Ошибка при отправке запроса ' + err.message);
            hideLoader();
            return resp;
        }
        
    }
  
    async copy(source, dist) {
        const result = await this.send('/copy', {
            file: source, 
            dist: dist
        })
        return result;
    }


    async delete(targetFile) {
        const result = await this.send('/delete', {
            file: targetFile
        })
        return result;
    }

    async move(source, dist) {
        const result = await this.send('/move', {
            file: source, 
            dist: dist
        })
        return result;
    }
  
    async changeDirectory(dirName) {
        const result = await this.send('/changeDir', {
            dir: dirName
        })
        return result;
    }

    async getDiskList() {
        const result = await this.send('/disk')
        return result;
    }
  
}
