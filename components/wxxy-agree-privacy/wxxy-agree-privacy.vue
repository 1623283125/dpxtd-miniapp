<template>
	<u-popup v-model="agreePrivacyShow" mode="bottom" :mask-close-able="false" borderRadius="20" @close="closeAgreePrivacy" @open="openAgreePrivacy">
		<view class="py-5 px-4">
			<view class="title x-center">
				<span class="font-weight-bold font-16">{{initTitle}}</span>
			</view>
			<view class="content mt-4 mb-2" style="line-height:1.8;color:#888;">
				在你使用 地平线跳动 服务之前，请仔细阅读<text @click="openPrivacyContract()" style="color:#2196F3">{{ initPrivacyContractName }}</text>，如你同意该指引，请点击“同意”开始使用本小程序。
			</view>

			<view class="row align-center justify-between px-4 pt-3">
				<view @click="disagree()" class="x-center font-16 font-weight-bold radius-10" style="width:250rpx;height:88rpx;background:#F1F1F2;color:#39AD5D;margin-left:28rpx;">拒绝</view>
				<button :id="agreePrivacyId" open-type="agreePrivacyAuthorization"
					@agreeprivacyauthorization="agree" @click="btnAgree"
					class="x-center font-16 font-weight-bold radius-10" style="width:250rpx;height:88rpx;background:#39AD5D;color:#fff">同意</button>
			</view>


			<!-- <view style="padding-top: 10px" class="flex align-center justify-around margin-top">
				<view style="min-width: 100px">
					<button class="button button-default" @click="disagree">拒绝</button>
				</view>
				<view style="min-width: 100px">
					<button class="button button-primary" :id="agreePrivacyId" open-type="agreePrivacyAuthorization"
						@agreeprivacyauthorization="agree">同意</button>
				</view>
			</view> -->
			
		</view>
	</u-popup>
</template>
<script>
	export default {
		name: "wxxy-agree-privacy",
		props: {
			//标题
			title: {
				type: String,
				default: "",
			},
			//副标题
			subTitle: {
				type: String,
				default: "",
			},
			//是否自动设置标题 默认false
			autoTitle: {
				type: Boolean,
				default: false,
			},
			//禁止自动检测隐私
			disableCheckPrivacy: {
				type: Boolean,
				default: false,
			},
			//按钮id 必填项不填写时授权按钮id必须为agree-btn
			agreePrivacyId: {
				type: String,
				default: "agree-btn",
			},
		},
		data() {
			return {
				//初始化的标题
				initTitle: "隐私政策提示",
				//初始化的副标题
				initSubTitle: "",
				//隐私政策
				initPrivacyContractName: "《地平线跳动小程序隐私保护指引》",
				//是否显示该组件
				agreePrivacyShow: false,
			}
		},
		watch:{
			_showWxPrivacy(val){
				console.log('_showWxPrivacy',val)
				if(val===false){
					this.agreePrivacyShow = false
				}
			}
		},
		async mounted() {
			//检测是否授权
			console.log('检测是否授权----')
			this.checkPrivacySetting()
			//监听授权
			console.log('监听授权----')
			wx.onNeedPrivacyAuthorization((resolve, eventInfo) => {
				this.agreePrivacyShow = true
				//回调
				console.log('onNeedPrivacyAuthorization------')
				this.$emit("needPrivacyAuthorization", resolve, eventInfo)
				// 需要用户同意隐私授权时,
				// 弹出开发者自定义的隐私授权弹窗
				// Vue.prototype.$resolvePrivacyAuthorization = resolve
			})
		},
		methods: {
			//检测是否授权
			checkPrivacySetting() {
				wx.getPrivacySetting({
					success: res => {
						console.log('checkPrivacySetting--success----', res)
						//未授权弹框
						if (res.needAuthorization) {
							this.initPrivacyContractName = res.privacyContractName
							//是否禁用 自动检测隐私并弹框
							if (!this.disableCheckPrivacy) {
								// 需要弹出隐私协议
								this.agreePrivacyShow = true
								this.$u.vuex('_showWxPrivacy', true)
							}
						} else {
							// 用户已经同意过隐私协议，所以不需要再弹出隐私协议，也能调用已声明过的隐私接口
							// wx.getUserProfile()
							this.$u.vuex('_showWxPrivacy', false)
						}
					},
					fail: (err) => {
						console.log('checkPrivacySetting--fail----', err)
					},
					complete: (ret) => {
						console.log('checkPrivacySetting--complete----', ret)
					}
				})
			},
			//打开隐私政策
			openPrivacyContract() {
				wx.openPrivacyContract({
					success: () => {}, // 打开成功
					fail: (e) => {
						uni.showToast({
							title: '打开失败:' + e,
							icon: 'none',
							duration: 3000
						})
					}, // 打开失败
				})
			},
			//打开隐私
			openAgreePrivacy() {
				this.agreePrivacyShow = true
			},
			//关闭隐私
			closeAgreePrivacy() {
				this.agreePrivacyShow = false
			},
			btnAgree(){
				this.agreePrivacyShow = false
			},
			//同意
			agree(e) {
				const buttonId = e.target.id || 'agree-btn'
				// this.agreePrivacyShow = false
				this.$emit('agree', buttonId)
				this.$u.vuex('_showWxPrivacy', false)
			},
			//拒绝
			disagree() {
				wx.exitMiniProgram()
				// this.$emit('disagree')
				// this.closeAgreePrivacy()
			}
		}
	}
</script>



<style scoped lang="scss">
	.text-decoration {
		color: #07c160;
		text-decoration: underline
	}
</style>