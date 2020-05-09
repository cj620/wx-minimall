// pages/home/home.js
import {
  getMultiData,
  getGoodsData
}from '../../service/home.js'
const types = ['pop','new','sell']
const TOP_DISTANCE=1000
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]}
    },
    currentType:'pop',
    showBackTop:false,
    isTabFixed:false,
    tabScrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求轮播图和推荐数据
    this._getMultiData()
    //请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  //网络请求的内部函数
  _getMultiData(){
    getMultiData().then(res =>{
      // console.log(res);
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      // console.log(banners, recommends);
      this.setData({
        recommends: recommends,
        banners:banners
      })
    })
  },
  _getGoodsData(type){
    //获取页码
    const page = this.data.goods[type].page + 1
    //发送请求
    getGoodsData(type,page).then( res => {
    //取出数据
    const list = res.data.data.list
    //将数据设置到对应的type的list中
    const oldList = this.data.goods[type].list
    oldList.push(...list)
    //将数据设置到data中的goods中
    const typeKey = `goods.${type}.list`
    const pageKey = `goods.${type}.page`
    this.setData({
      [typeKey]:oldList,
      [pageKey]:page
    })

  })
    
  },

  //处理事件监听
  handleTabClick(event){
    //取出index
    const index = event.detail.index
    //设置currentType
    const type = types[index] //通过index设置相应的type
    this.setData({
      currentType: type
    })
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onReachBottom(){
    //下滑加载更多
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options){
    //获取当前的scrolltop
    const scrollTop = options.scrollTop
    //修改showBsckTop的值
    //不要频繁调用setData
    const flag = scrollTop >= TOP_DISTANCE
    if(flag != this.data.showBackTop){
      this.setData({
        showBackTop:flag
      })
    }

    //修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 !=this.data.isTabFixed){
      this.setData({
        isTabFixed:flag2
      })
    }
  },
  onShow(){
  },
  handleImageLoad(){
     wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect =>{
      this.data.tabScrollTop = rect.top
     }).exec()
  }
})