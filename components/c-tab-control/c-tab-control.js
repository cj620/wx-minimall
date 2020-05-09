// components/c-tab-control/c-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentindex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(event){
      // console.log(event);
      // console.log(event.currentTarget.dataset.index);
      //设置新的index
      this.setData({
        currentindex:event.currentTarget.dataset.index
      })
      //发出时间
      const data = {index:this.data.currentindex}
      this.triggerEvent('tabclick',data,{})

    }
  }
})
