const express = require("express");
const path = require("path");
const fs_extra = require('fs-extra')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(express.static('src'));

const jsonParser = bodyParser.json();

app.listen(port, () => {
    console.log('Сервер запущен по адресу: http://localhost:' + port);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "../../public/index.html")
});


function getDiskList() {
    //Получаем через дочерний процесс список дисков в системе
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
        exec('%SystemRoot%\\System32\\Wbem\\wmic.exe logicaldisk get caption', (err, stdout, stderr) => {
            if (err) {
                console.error(stderr);
                reject(err);                
            } else {
                resolve(stdout)
            }
        });
    });
}

app.post('/api/disk', jsonParser, async (req, res) => {
    const resp = {};

    try {
        const disks = await getDiskList();
        let str = disks.replace(/Caption/g,"");
        str = str.replace(/\n/g,"");
        str = str.replace(/\r/g,"");
        str = str.replace(/ /g,"");
        str = str.replace(/:/g,":/.");
        let result = str.split('.');
        result.pop();

        resp.result = result;
    } catch(err) {
        resp.errorCode = 6;
        resp.errorText = err.message;
        console.log(err.message);
    }

    res.send(resp);
});

app.post('/api/changeDir', jsonParser, (req, res) => {
    const resp = {};

    try {
        const {dir} = req.body; 
        const result = readDir(dir);
        resp.result = result;
    } catch (err) {
        resp.errorCode = 5;
        resp.errorText = err.message;
        console.log(err.message);
    }
    
    res.send(resp);
});

app.post('/api/copy', jsonParser, (req, res) => {
    const resp = {};

    try {
        const {file, dist} = req.body; 
        
        const fileName = path.basename(file); //Парсим имя директории
        fs_extra.copySync(file, dist + '/' + fileName);
    } catch (err) {
        resp.errorCode = 1;
        resp.errorText = err.message;
        console.error(err.message);
    }  

    res.send(resp);
});

app.post('/api/delete', jsonParser, (req, res) => {
    const resp = {};

    try {
        const {file} = req.body; 

        fs_extra.removeSync(file);
    }   
    catch (err) {
        resp.errorCode = 2;
        resp.errorText = err.message;
        console.log(err.message);
    }  

    res.send(resp);
});

app.post('/api/move', jsonParser, (req, res) => {
    const resp = {};

    try {            
        const {file, dist} = req.body;
        const fileName = path.basename(file); //Парсим имя директории
    
        fs_extra.moveSync(file, dist + '/' + fileName); //без перезаписи если файл существует
    }   
    catch (err) {
        resp.errorCode = 3;
        resp.errorText = err.message;
        console.log(err.message);
    }  

    res.send(resp);
});



const icons = {
    "/movie.ico": [".mkv", ".avi", ".mpeg", ".mp4"],
    "/Photo.ico": [".JPG", ".jpeg", ".jpg", ".png", ".gif", ".ico"],
    "/words.ico": [".txt"],
    "/Music.ico": [".mp3", ".ac3", ".wav"],
    "/exe.ico": [".exe"],
    "/pdf.ico": [".pdf"],
    "/word.ico": [".doc", ".docx"],
    "/excel.ico": [".xls", ".xlsx"],
    "/zip.ico": [".zip", ".rar"]
};

function getIcon(extension) {
    for (const icon in icons) {
        const formats = icons[icon];
        if (formats.includes(extension)){
            return icon;
        }
    }
    return null;
}

function getCorrectSize(folder, file) {
    if (fs_extra.statSync(folder + '/' + file).isFile()) {
        let size = (fs_extra.statSync(folder + '/' + file).size);
        if (size <= 1024) {
            size = (size).toFixed(2) + ' б';
        } else if (size <= 1048576) {
            size = (size / 1024).toFixed(2) + ' Кб';
        } else if (size <= 1073741824) { 
            size = (size / 1048576).toFixed(2) + ' Мб';
        } else {
            size = (size / 1073741824).toFixed(2) + ' Гб';
        }
        return size;
    } else {
        return null;
    }
}

function getCorrectDate(folder, file) {
    const now = (fs_extra.statSync(folder + '/' + file)["mtime"]);

    let day = now.getDate();
    if (day < 10) {
        day = '0' + day;
    }    
    
    let month = now.getMonth()+1 //тк getmonth от 0 до 11;
    if (month < 10) {
        month = '0' + month;   
    }

    let year = now.getFullYear(); 

    let hour = now.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    let seconds = now.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    const dateOfChange = (day + '.' + month + '.' + year + ' ' + hour + ':' + minutes + ':' + seconds)
    return dateOfChange;
}

function readDir(folder) {
    const result = [];
    const files = fs_extra.readdirSync(folder);
    files.forEach(file => {
        try {
            //Форматирем размер
            let size = getCorrectSize(folder, file);

            //Форматируем дату/время
            let dateOfChange = getCorrectDate(folder, file);

            //Форматируем пути к иконкам в соответсвии с расширением
            let icon;
            let ext;
            if (fs_extra.statSync(folder + '/' + file).isDirectory()) { //если папка отправляем соответсвующую ссылку на иконку
                icon = "/Folder.ico";
            } else {
                ext = path.extname(folder + '/' + file); //get extension
                icon = getIcon(ext);
                if (icon == null) {
                    icon = "/Newfile.ico";
                }
            }
        
            result.push({
                icon: icon,
                name: file,
                extension: ext,
                size: size, 
                dateOfChange: dateOfChange, 
                dataFolder: folder + '/' + file
            });
        } catch (err) {
            console.log(err);
        }
    });
    return result;
}

