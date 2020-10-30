<template>
    <div class="select-disk">
        <select size="1" v-model="selected">
            <option disabled selected>Выберете диск</option>
            <option v-for="volume in disks" :key="volume.id" :value="volume"> 
                {{ volume }} 
            </option> 
        </select>
    </div>
</template>

<script>
export default {
    name: 'WorkingWindowSelectDisk',
    data: function () {
        return {
            disks: [],
            selected: 'Выберете диск'
        }
    },
    methods: {  
        openDisk: function(selected){
            this.$emit('openDisk', selected);
        },
        async getDisks() {
            const res = await window.api.getDiskList();
            
            if (res.errorCode != null) {
                console.log('Ошибка - ', res); 
            } else {
                this.disks = res.result;
            }  
        }
    },
    created: function () {
        this.getDisks(); //вызываем функцию отображения дисков после загрузки страницы
    },
    watch: {
        selected(newValue){ 
            this.openDisk(newValue) //открываем директорию выбранного диска при клику на него
        }
    }
}
</script>

<style scoped>
.select-disk{
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    width: 100%;
    height: 25px;
    border-style: solid; 
    border-width: 1px; 
    border-radius: 5px; 
    border-color: #9e9cad;
}
</style>