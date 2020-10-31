import axios from 'axios'
import { showLoader } from '../load.js'
import { hideLoader } from '../load.js'

export class Api {
    constructor() {
    }
  
    async send(url, value) {
        let resp = {};
        try {
            resp = await axios.post(url, value);
            return resp.data;
        } catch(err) {
            resp.errorCode = 7;
            resp.errorText = err.message;
            console.log('Ошибка при отправке запроса ' + err.message);
            return resp;
        }
      
    }
  
    async copy(source, dist) {
        showLoader();
        const result = await this.send('/copy', {
            file: source, 
            dist: dist
        })
        hideLoader();
        return result;
    }


    async delete(targetFile) {
        showLoader();
        const result = await this.send('/delete', {
            file: targetFile
        })
        hideLoader();
        return result;
    }

    async move(source, dist) {
        showLoader();
        const result = await this.send('/move', {
            file: source, 
            dist: dist
        })
        hideLoader();
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
