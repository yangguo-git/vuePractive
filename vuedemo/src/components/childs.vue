<template>
    <div>
       <input type="text" v-model="datas.name">{{datas.name}}
       <input type="text" v-model="datas.age">{{datas.age}}
       <button @click="handelSave">点击保存</button>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:''
        }
    },
    props:['datas'],
    methods:{
        handelSave(){
            var objs = {
                 name:this.datas.name,
                 age:this.datas.age,
            };

            console.log(objs);



        }
    },
    mounted(){

        console.log(this);
    }
}
</script>

