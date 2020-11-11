<template>
    <div class="down-panel">
        <input type="button" value="Копировать" class="button copy" @click="copy()">
        <input type="button" value="Переместить" class="button cut" @click="move()">
        <input type="button" value="Удалить" class="button" @click="del()">
    </div> 
</template>

<script>
    export default {
        name: 'TheActionBar',
        methods: {
            async copy() {
                let src;
                let dst;

                if (this.$parent.$options.activeWindow == this.$parent.$refs.left) {
                    src = this.$parent.$refs.left.activeFolder;
                    dst = this.$parent.$refs.right.pathCurrent;
                } else {
                    src = this.$parent.$refs.right.activeFolder;
                    dst = this.$parent.$refs.left.pathCurrent;
                }

                const result = await window.api.copy(src, dst);

                if (result.errorCode != null) {    
                    this.sendError(result);
                } else {
                    this.refreshCatalog();
                }
            },

            async move() {
                let src;
                let dst;

                if (this.$parent.$options.activeWindow == this.$parent.$refs.left) {
                    src = this.$parent.$refs.left.activeFolder;
                    dst = this.$parent.$refs.right.pathCurrent;
                } else {
                    src = this.$parent.$refs.right.activeFolder;
                    dst = this.$parent.$refs.left.pathCurrent;
                }

                const result = await window.api.move(src, dst);

                if (result.errorCode != null) {    
                    this.sendError(result);
                } else {
                    this.refreshCatalog();
                }
            },

            async del() {
                let src;
                if (this.$parent.$options.activeWindow == this.$parent.$refs.left) {
                    src = this.$parent.$refs.left.activeFolder;
                } else {
                    src = this.$parent.$refs.right.activeFolder;
                }

                const result = await window.api.delete(src);

                if (result.errorCode != null) {    
                    this.sendError(result);
                } else {
                    this.refreshCatalog();
                }
            },
            
            async refreshCatalog() {
                await this.$parent.$refs.left.changeDirect(this.$parent.$refs.left.pathCurrent);
                await this.$parent.$refs.right.changeDirect(this.$parent.$refs.right.pathCurrent);
            },

            sendError(error) {
                this.$emit('error', { 
                    code: error.errorCode, 
                    message: error.errorText
                });
                this.$parent.$refs.modal.show = true;
            }
        }
    }
</script>

<style scoped>
.down-panel {
    display: flex;  
    justify-content: center; 
    width: 83%; 
    min-width: 875px;
    max-width: 1840px;
    height: 5%; 
}

.button {
    display: flex; 
    justify-content: center; 
    align-items: center;
    align-self: center;
    flex-basis: 25%; 
    font-size: 0.9em;
    height: 90%;
    max-height: 30px;
    border: 1px;
    border-color: silver;
    border-style: solid;
    border-radius: 3px;
    cursor: pointer;
    background: linear-gradient(to top, #a8a9ad, #ebe7e7);
}

.button:hover {
    background: linear-gradient(to top, #e1e2e6, #fffbfb);
}

.button:active {
    background:  #a1a1a1;
}


.copy {
    margin-right: 10px;
}

.cut {
    margin-right: 10px;
}
</style>>