<template>
    <div class="working-window">
        <WorkingWindowSelectDisk @openDisk="changeDirect($event)"/>
        <WorkingWindowCurrentPath :pathCurrent = "pathCurrent" :pastWay = "pastWay" @changeDirrect="changeDirect($event)"/>

            <div class="table-window">
                <table class="table">
                    <tr class="row">
                        <th  class="cell-icon"></th>
                        <th  class="cell-name_">Имя</th>
                        <th  class="cell-type">Тип</th>
                        <th  class="cell-size">Размер</th>
                        <th  class="cell-date">Дата</th>
                    </tr>
                    <tr v-for="item in result" :key="item.id" class="row" v-on:click="catchClick( item.dataFolder )" v-bind:class="{ 'active': item.dataFolder == activeFolder }">
                        <td class="cell-icon"><img width="20px" height="20px" :src = " '/assets' + item.icon "> </td> 
                        <td class="cell-name">{{ item.name }}</td>
                        <td class="cell-type">{{ item.extension }}</td>
                        <td class="cell-size">{{ item.size}}</td>
                        <td class="cell-date">{{ item.dateOfChange }}</td> 
                    </tr>
                </table>
            </div> 
    </div>
</template>>

<script>
import axios from 'axios'
import WorkingWindowSelectDisk from './WorkingWindowSelectDisk.vue'
import WorkingWindowCurrentPath from './WorkingWindowCurrentPath.vue'

export default {
name: 'WorkingWindow',
    components: {
        WorkingWindowSelectDisk,
        WorkingWindowCurrentPath
    },
    data: function () {
        return {
            result: [],
            activeFolder: '',
            pathCurrent: '',
            resultClick: [],
            delay: 300,
            clicks: 0,
            timer: null,
            file_: [],
            pastWay: [] 
        }
    },
    methods: {
        async changeDirect(nameDirect) {
            const res = await window.api.changeDirectory(nameDirect);
            if (res.errorCode != null) {
                console.log('Ошибка при копировании: ', res); 

                this.$emit('error', { 
                    code: res.errorCode, 
                    message: res.errorText
                });
                this.$parent.$refs.modal.show = true;                

            } else {
                    this.result = res.result;
                    this.pathCurrent = nameDirect;

                    if (this.pastWay[this.pastWay.length-1] != nameDirect){ //Если текущий путь не равен новому
                        this.pastWay.push(nameDirect); ///Складываем в массив текущий путь
                    }
            }         
        },        

        //Метод для определения сколько было сделано кликов по папке или файлу
        catchClick: function(dataFolder){
            this.clicks++ 
            if(this.clicks === 1) {
                this.$emit('setActive'); 
                this.activeFolder = dataFolder; //присвоим переменной значение dataFolder. Если оно совпадет со значением в таблице то строка выделится

                /* 
                * Снимаем выделение строки у неактивного окна 
                */
                if (this.$parent.$options.activeWindow == this.$parent.$refs.left) {
                    this.$parent.$refs.right.activeFolder = '';

                } else if (this.$parent.$options.activeWindow == this.$parent.$refs.right){
                    this.$parent.$refs.left.activeFolder = '';
                }

                const that = this
                this.timer = setTimeout(function() {
                    that.resultClick.push(dataFolder.type);
                    that.clicks = 0
                }, this.delay);
                                               
            } else {
                clearTimeout(this.timer);  
                this.resultClick.push('dblclick');
                this.clicks = 0;
                this.changeDirect(dataFolder);
            }         
        }
    }
}

</script>>

<style scoped>
p {
    display: flex; 
    flex-basis: 100%;  
    flex-flow: wrap; 
    justify-content: center; 
    font-family: COMIC SANS MS; 
    font-size: 0.8em;
}

.center {
    display: flex; 
    align-items: center; 
    justify-content: center;
    height: 100%;
    width: 100%;
    flex-wrap: wrap;
}

.working-window {
    display: flex; 
    flex-direction: row;
    flex-flow: wrap; 
    align-content: flex-start;
    justify-content: center; 
    width: 40%; 
    min-width: 420px;
    max-width: 897px;
    height: 83%;
    min-height: 517px;
    border-style: solid; 
    border-width: 1px; 
    border-radius: 5px; 
    background-color: rgb(235, 235, 235); 
    border-color: #504d69;
    margin-right: 10px;
    padding: 6px;
}

.table-window {
    display: flex;
    width: 100%; 
    max-width: 880px;
    height: 88%; 
    min-height: 450px;
    border: 1px; 
    border-style: solid; 
    border-width: 1px; 
    background-color: #FFF; 
    border-color: #9e9cad;
    margin-top: 5px;
    overflow: auto;
}

.table {
    display: table;  
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse; 
    font-size: 0.8em;
    font-family: Droid Sans Mono,Ubuntu Mono,Consolas;
}

th {
    text-align: left;
}

.row {
    display: table-row;
    width: 100%;
    white-space: nowrap;
    cursor: pointer;
}

.row:hover {
    background-color: rgb(180, 200, 230);
    cursor: pointer;
}

.cell-icon {
    float: left;
    display: table-column;         
    width: 5%;
}

.cell-name_, .cell-name, .cell-type, .cell-size, .cell-date {
    float: left; /* fix for  buggy browsers */      
    overflow: hidden; /* Обрезаем текст если не помещается */
    text-overflow: ellipsis; /* Добавляем многоточие */
    display: table-column;  
}

.cell-name_ {   
    width: 40%;
}

.cell-name {     
    width: 40%;
}

.cell-type {       
    width: 10%;
}  

.cell-size {      
    width: 15%;
} 

.cell-date {       
    width: 25%;
} 

.active {
    background-color: rgb(180, 200, 230);
    cursor: pointer;
}
</style>>