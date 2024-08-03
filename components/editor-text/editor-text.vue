<template>
	<view class="editor-text flex-1 border radius-10 px-2 py-1">
		<editor id="editor" :placeholder="placeholder" 
			@ready="onEditorReady" @input="onEditorInput" />
	</view>
</template>

<script>
	export default {
		name:"editor-text",
		props:{
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '请输入内容'
			},
		},
		data() {
			return {
				editorCtx:null,
				defaultValue:this.value,
			};
		},
		watch: {
			value(nVal, oVal) {
				this.defaultValue = nVal;
			},
		},
		methods:{
			onEditorInput(e){
				console.log('onEditorInput', e.detail)
				this.$emit('input', e.detail.detail);
			},
			onEditorReady() {
				uni.createSelectorQuery().in(this).select('#editor').context((res) => {
					this.editorCtx = res.context
					this.editorCtx.setContents({html:this.defaultValue})
				}).exec()
			}
		}
	}
</script>

<style scoped lang="scss">
	.editor-text ::v-deep .ql-editor{
		line-height: 1.6 !important;
		&.ql-blank:before{
			font-style: inherit !important;
		}
	}
</style>