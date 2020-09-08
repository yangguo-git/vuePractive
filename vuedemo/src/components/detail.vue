<template>
  <div>
    <h3>详情</h3>
    <ul>
      <p v-html="newList"></p>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newList: ""
    };
  },
  methods: {},
  mounted() {
    var aid = this.$route.query.aid;
    this.$axios
      .get(
        "http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid=" +
          aid +
          ""
      )
      .then(response => {
        this.newList = response.data.result[0].content;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
</style>