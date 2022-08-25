<template>
  <div>You can view the status here </div>
</template>

<script>
import {getLeaves} from "../services/leave"

export default {
name:"LeaveStatus",
methods:{
    async getAllLeaves(){
        const id= this.$store.state.auth.user;
        const response = await getLeaves(id);
        console.log(response.data)
        return response
    }
},
created(){
    this.getAllLeaves();
}
}
</script>

<style>

</style>