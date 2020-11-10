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
    data() {
        return {
            disks: [],
            selected: 'Выберете диск'
        }
    },
    methods: {  
        openDisk(selected) {
            this.$emit('openDisk', selected);
        },
        async getDisks() {
            const res = await window.api.getDiskList();
            
            if (res.errorCode != null) {
                console.log('Ошибка при получении списка дисков ', res); 
                this.$emit('error', { 
                code_: res.errorCode, 
                message_: res.errorText
            });
            } else {
                this.disks = res.result;
            }  
        }
    },
    created() {
        this.getDisks(); //вызываем функцию отображения дисков после загрузки страницы
    },
    watch: {
        selected(newValue) { 
            this.openDisk(newValue) //открываем директорию выбранного диска при клику на него
        }
    }
}
</script>

<style scoped>
.select-disk {
    display: flex; 
    align-items: center;  
    width: 100%;
    height: 6%;
    max-height: 29px;
}
</style>