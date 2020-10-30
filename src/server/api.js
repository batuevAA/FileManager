import axios from 'axios'

import { showLoader } from '../load.js'
import { hideLoader } from '../load.js'

export class Api {
    constructor() {
    }
  
    async send(url, value) {
      try {
        const resp = await axios.post(url, value);

        return resp.data;
      } catch(err) {
        console.log('Ошибка при отправке данных на сервер в функции api/send ' + err);
        throw err;
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
