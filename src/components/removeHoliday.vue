<template>
  <form class="border border-white rounded p-3">
     <div class="form-group row">
      <label for="input1" class="col-sm-7 col-lg-3 col-form-label"
        >Description:</label
      >
      <div class="col-lg-6">
        <input type="text" name="description" v-model="description" class="form-control" id="input1" />
      </div>
        <div class="form-group">
        <div class="col-sm-7 col-lg-3">
          <button type="submit" class="btn btn-danger mt-1" @click="RemoveHol">remove</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {removeHoliday} from "@/services/holiday"
export default {
name: "RemoveHoliday",
data(){
  return{
  description:''
  }
},
methods:{
  async RemoveHol(){
    const response = await removeHoliday(this.description);
    console.log(response)
  }
}
}


</script>

<style>

</style>