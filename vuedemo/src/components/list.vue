<template>
    <div>
        <h3>新闻详情</h3>
        <ul>
            <li v-for="(item,keys) in newList" :key="keys">
               
                 <router-link :to = '{name:"detail",query:{aid:item.aid}}'> {{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
          newList:[]
        }
    },
    methods:{

    },
    mounted(){

        // this.$http.get("http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1").then(function (response) {
        //         //console.log(response.body.result);
        //         this.newList = response.body.result;
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        //http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid=488

            this.$axios.get('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1').then((response)=> {
                console.log(response.data.result);
                // this.newList = response.body.result;
                 this.newList = response.data.result;
            })
            .catch(function (error) {
                console.log(error);
            });

            
    }
}
</script>

<style scoped>

</style>